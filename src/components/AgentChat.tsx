import React, { useEffect, useRef, useState } from 'react';
import { Bot, Send, ShieldCheck, WifiOff, Copy, Trash2 } from 'lucide-react';
import { getAgent, type ChatMessage } from '../data/agents';

type Mode = 'unknown' | 'live' | 'offline' | 'error';

interface Props { agentId: string }

export const AgentChat: React.FC<Props> = ({ agentId }) => {
  const agent = getAgent(agentId);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<Mode>('unknown');
  const [sessionId, setSessionId] = useState<string>('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, busy]);

  if (!agent) return null;

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    const next: ChatMessage[] = [...messages, { role: 'user', content: q }];
    setMessages(next);
    setInput('');
    setBusy(true);
    try {
      const r = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId, messages: next }),
      });
      const ct = r.headers.get('content-type') || '';
      if (!r.ok || !ct.includes('application/json')) throw new Error(String(r.status));
      const data = await r.json();
      setMode((data.mode as Mode) || 'error');
      if (data.sessionId) setSessionId(data.sessionId);
      setMessages([...next, { role: 'agent', content: data.reply || data.error || '…' }]);
    } catch {
      // Pas de serveur (aperçu local) ou réponse non JSON → mode hors ligne, texte fixe
      setMode('offline');
      setMessages([...next, { role: 'agent', content: agent.offlineReply }]);
    } finally {
      setBusy(false);
    }
  };

  const copyAll = () => {
    const txt = [
      `Objectio Hub — ${agent.rubrique} — session ${sessionId || 'locale'} — ${new Date().toLocaleString('fr-MA')}`,
      ...messages.map((m) => `${m.role === 'user' ? 'Demandeur' : 'Bureau des méthodes'} : ${m.content}`),
      `Étudié par le Bureau des méthodes Objectio — soumis à l'appréciation de ${agent.decideur}.`,
    ].join('\n\n');
    navigator.clipboard?.writeText(txt).catch(() => {});
  };

  return (
    <div className="mt-4 rounded-2xl border border-amber-500/30 bg-slate-950/80 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-900/60">
        <div className="flex items-center gap-2 text-amber-300 text-xs font-mono uppercase tracking-wider">
          <Bot className="w-4 h-4" /> Agent — {agent.rubrique}
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono">
          {mode === 'live' && <span className="px-2 py-0.5 rounded bg-emerald-900/50 text-emerald-300">en ligne</span>}
          {(mode === 'offline' || mode === 'error') && (
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 flex items-center gap-1"><WifiOff className="w-3 h-3" /> hors ligne</span>
          )}
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> rien n’est enregistré</span>
        </div>
      </div>

      <div className="px-4 py-3 space-y-3 max-h-72 overflow-y-auto">
        <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 rounded-lg p-3 border border-slate-800">{agent.intro}</div>
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2">
            {agent.suggestions.map((s) => (
              <button key={s} onClick={() => send(s)} className="text-[11px] px-2.5 py-1 rounded-full border border-slate-700 text-slate-300 hover:border-amber-400 hover:text-amber-200 cursor-pointer">{s}</button>
            ))}
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`text-xs leading-relaxed rounded-lg p-3 border whitespace-pre-wrap ${m.role === 'user' ? 'bg-amber-500/10 border-amber-500/30 text-amber-100 ml-8' : 'bg-slate-900/60 border-slate-800 text-slate-200 mr-8'}`}>
            {m.content}
          </div>
        ))}
        {busy && <div className="text-[11px] text-slate-500 font-mono animate-pulse">Le Bureau des méthodes rédige…</div>}
        <div ref={endRef} />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 p-3 border-t border-slate-800">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Votre question (sans CIN, sans RIB, sans mot de passe)…"
          maxLength={4000}
          className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-slate-200 focus:border-amber-500"
        />
        <button type="submit" disabled={busy || !input.trim()} className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-semibold text-xs flex items-center gap-1.5 cursor-pointer">
          <Send className="w-3.5 h-3.5" /> Envoyer
        </button>
      </form>

      <div className="flex items-center justify-between px-4 py-2 border-t border-slate-800 text-[10px] text-slate-500 font-mono">
        <span>Décision : {agent.decideur}</span>
        <div className="flex gap-3">
          <button onClick={copyAll} disabled={!messages.length} className="flex items-center gap-1 hover:text-amber-300 disabled:opacity-40 cursor-pointer"><Copy className="w-3 h-3" /> copier la synthèse</button>
          <button onClick={() => { setMessages([]); setSessionId(''); }} disabled={!messages.length} className="flex items-center gap-1 hover:text-amber-300 disabled:opacity-40 cursor-pointer"><Trash2 className="w-3 h-3" /> effacer</button>
        </div>
      </div>
    </div>
  );
};
