// Vercel Function — POST /api/agent (GET = diagnostic sans secret)
// La clé GEMINI_API_KEY vit UNIQUEMENT dans Vercel → Settings → Environment Variables.
// Sans clé : réponse "offline" (texte fixe de l'agent). Aucun contenu n'est journalisé.
import { getAgent } from '../src/data/agents/index.js';

type Role = 'user' | 'agent';
interface Msg { role: Role; content: string }

// Modèles : GEMINI_MODEL (Vercel) en premier, puis replis si le modèle est retiré (404) ou saturé (429/503).
// gemini-2.0-flash est arrêté depuis le 01/06/2026 ; gemini-2.5-flash annoncé jusqu'au 16/10/2026.
const MODELS: string[] = Array.from(new Set(
  [process.env.GEMINI_MODEL, 'gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-flash-latest']
    .map((m) => (m || '').trim()).filter(Boolean),
));
const API = 'https://generativelanguage.googleapis.com/v1beta/models';
const MAX_MESSAGES = 12;        // profondeur de contexte envoyée au modèle
const MAX_CHARS = 4000;         // par message utilisateur
const WINDOW_MS = 60_000;       // fenêtre de limitation
const MAX_PER_WINDOW = 10;      // requêtes par IP et par fenêtre

// Limitation de débit en mémoire (suffisante au démarrage ; se réinitialise à chaque instance)
const hits = new Map<string, number[]>();
const allowed = (ip: string): boolean => {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= MAX_PER_WINDOW) return false;
  arr.push(now);
  hits.set(ip, arr);
  return true;
};

const PII = /\b\d{4}\s?\d{3}\s?\d{16}\b|\b[A-Z]{1,2}\d{5,6}\b/; // RIB 24 chiffres, CIN

export default async function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') {
    // Diagnostic public sans secret : présence de la clé (jamais sa valeur), format, modèles configurés.
    const k = (process.env.GEMINI_API_KEY || '').trim();
    res.status(200).json({
      ok: true,
      keyPresent: k.length > 0,
      keyFormat: k.startsWith('AIza') ? 'AIza' : k.startsWith('AQ.') ? 'AQ.' : k ? 'autre' : 'absente',
      keyLength: k.length,
      models: MODELS,
      auth: 'x-goog-api-key',
      version: 'OH3d',
    });
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'POST only' });
    return;
  }
  const ip = (req.headers['x-forwarded-for'] || '').toString().split(',')[0].trim() || 'anon';
  if (!allowed(ip)) {
    res.status(429).json({ error: 'Trop de requêtes. Réessayez dans une minute.' });
    return;
  }

  let body: any = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const agentId = String(body?.agentId || '');
  const agent = getAgent(agentId);
  if (!agent) { res.status(400).json({ error: 'Agent inconnu' }); return; }

  const messages: Msg[] = Array.isArray(body?.messages) ? body.messages.slice(-MAX_MESSAGES) : [];
  const last = messages[messages.length - 1];
  if (!last || last.role !== 'user' || !last.content?.trim()) {
    res.status(400).json({ error: 'Message vide' }); return;
  }
  if (last.content.length > MAX_CHARS) { res.status(413).json({ error: 'Message trop long' }); return; }

  const sessionId = `OBJ-${agentId.toUpperCase()}-${Date.now().toString(36)}`;
  const key = (process.env.GEMINI_API_KEY || '').trim();
  if (!key) {
    res.status(200).json({ mode: 'offline', sessionId, reply: agent.offlineReply });
    return;
  }

  const warn = PII.test(last.content)
    ? '\n\n⚠ Votre message semble contenir un identifiant personnel (CIN ou RIB). Il n’est pas conservé ; évitez de le transmettre ici.'
    : '';

  const contents = messages.map((m) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
  }));
  const body_ = JSON.stringify({
    systemInstruction: { parts: [{ text: agent.systemPrompt }] },
    contents,
    generationConfig: { temperature: 0.3, maxOutputTokens: 1500 },
  });

  // Clé transmise dans l'en-tête x-goog-api-key (obligatoire pour les clés au format AQ., recommandé pour AIza),
  // jamais dans l'URL. Repli sur le modèle suivant si 404 (modèle retiré) / 429 / 503.
  const erreurs: string[] = [];
  for (const model of MODELS) {
    try {
      const r = await fetch(`${API}/${model}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
        body: body_,
      });
      if (r.ok) {
        const data: any = await r.json();
        const text: string = data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join('') || 'Réponse vide.';
        res.status(200).json({ mode: 'live', sessionId, model, reply: text + warn });
        return;
      }
      let detail = '';
      try { const e: any = await r.json(); detail = String(e?.error?.status || '') + ' ' + String(e?.error?.message || ''); } catch { /* corps non JSON */ }
      erreurs.push(`${model} → HTTP ${r.status} ${detail.trim()}`.slice(0, 220));
      if (![404, 429, 503].includes(r.status)) break; // 400/401/403 : inutile d'essayer un autre modèle
    } catch (e: any) {
      erreurs.push(`${model} → réseau : ${String(e?.message || e).slice(0, 120)}`);
    }
  }
  res.status(200).json({
    mode: 'error',
    sessionId,
    reply: 'Le service de réponse est momentanément indisponible. Votre question n’a pas été enregistrée.',
    detail: erreurs, // diagnostic technique (statut et message du fournisseur), sans aucun secret
  });
}
