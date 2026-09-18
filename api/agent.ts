// Vercel Function — POST /api/agent
// La clé GEMINI_API_KEY vit UNIQUEMENT dans Vercel → Settings → Environment Variables.
// Sans clé : réponse "offline" (texte fixe de l'agent). Aucun contenu n'est journalisé.
import { getAgent } from '../src/data/agents/index';

type Role = 'user' | 'agent';
interface Msg { role: Role; content: string }

const MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
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
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    res.status(200).json({ mode: 'offline', sessionId, reply: agent.offlineReply });
    return;
  }

  const warn = PII.test(last.content)
    ? '\n\n⚠ Votre message semble contenir un identifiant personnel (CIN ou RIB). Il n’est pas conservé ; évitez de le transmettre ici.'
    : '';

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`;
    const contents = messages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: agent.systemPrompt }] },
        contents,
        generationConfig: { temperature: 0.3, maxOutputTokens: 1500 },
      }),
    });
    if (!r.ok) {
      res.status(200).json({ mode: 'error', sessionId, reply: `Le service de réponse est momentanément indisponible (code ${r.status}). Votre question n’a pas été enregistrée.` });
      return;
    }
    const data: any = await r.json();
    const text: string = data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join('') || 'Réponse vide.';
    res.status(200).json({ mode: 'live', sessionId, reply: text + warn });
  } catch {
    res.status(200).json({ mode: 'error', sessionId, reply: 'Le service de réponse est momentanément indisponible. Votre question n’a pas été enregistrée.' });
  }
}
