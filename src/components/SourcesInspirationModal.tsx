import React, { useState } from 'react';
import { X, Lightbulb, Landmark, ShieldCheck, Mail, Copy, Check, Compass, FileText } from 'lucide-react';
import { LEGAL_IDENTITY } from '../data/servicesData';
import {
  SOURCES_LABEL, SOURCES_PRINCIPE, GUICHETS, SOURCES_DEPOT_CHAMPS, SOURCES_MAIL_SUBJECT,
} from '../data/sourcesInspirationData';
import { copyToClipboard, getFullDeepLink } from '../utils/deepLink';
import { AgentChat } from './AgentChat';

type Tab = 'principe' | 'guichets' | 'depot' | 'agent';

interface Props { isOpen: boolean; onClose: () => void }

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'principe', label: 'Principe', icon: <Lightbulb className="w-4 h-4" /> },
  { id: 'guichets', label: 'Guichets réels', icon: <Landmark className="w-4 h-4" /> },
  { id: 'depot', label: 'Déposer une situation', icon: <FileText className="w-4 h-4" /> },
  { id: 'agent', label: 'Agent d’orientation', icon: <Compass className="w-4 h-4" /> },
];

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`rounded-xl border border-slate-800 bg-slate-900/70 p-4 ${className}`}>{children}</div>
);

export const SourcesInspirationModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<Tab>('principe');
  const [copied, setCopied] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [guichetChoisi, setGuichetChoisi] = useState<string>('');

  if (!isOpen) return null;

  const copy = async (text: string, id: string) => {
    if (await copyToClipboard(text)) { setCopied(id); setTimeout(() => setCopied(null), 1800); }
  };

  const g = GUICHETS.find(x => x.id === guichetChoisi);
  const mailBody = `Bonjour,\n\nJe soumets une situation au Bureau des méthodes, sans identité ni numéro personnel.\n\nGuichet pressenti : ${g ? g.guichet : '(à déterminer)'}\n\nSituation :\n${form.situation || ''}\n\nDémarches déjà faites :\n${form.demarches || ''}\n\nCe que j'attends :\n${form.attendu || ''}\n\nJe comprends qu'Objectio prépare le dossier et que la décision appartient au guichet saisi.\n\nCordialement,`;
  const mailto = `mailto:${LEGAL_IDENTITY.officialEmail}?subject=${encodeURIComponent(SOURCES_MAIL_SUBJECT)}&body=${encodeURIComponent(mailBody)}`;

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center bg-black/80 backdrop-blur-sm overflow-y-auto p-2 sm:p-6" role="dialog" aria-modal="true" aria-label="Accès réservé : Aux sources d’inspiration">
      <div className="w-full max-w-5xl bg-slate-950 border border-emerald-700/50 rounded-2xl shadow-2xl my-4">
        <div className="flex items-start justify-between gap-4 px-5 py-4 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border-b border-emerald-700/40 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-emerald-500/20 border border-emerald-400/60 flex items-center justify-center text-emerald-300">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-emerald-400/80 uppercase tracking-wider">Accès réservé</div>
              <div className="text-lg font-black tracking-wide text-emerald-300">AUX SOURCES D’INSPIRATION</div>
              <div className="text-[11px] text-slate-300 mt-1">
                Chaque situation reçue inspire la méthode · en retour, le Bureau des méthodes oriente vers le guichet qui peut porter la démarche
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
                {LEGAL_IDENTITY.founderName} · {LEGAL_IDENTITY.matricule} · ICE {LEGAL_IDENTITY.iceNumber} · {LEGAL_IDENTITY.officialEmail}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => copy(getFullDeepLink('sources-inspiration'), 'link')} className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-mono border border-slate-700 text-slate-300 hover:border-emerald-400">
              {copied === 'link' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} #sources-inspiration
            </button>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-800 text-slate-300" aria-label="Fermer"><X className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 px-4 py-2 bg-slate-900/80 border-b border-slate-800">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${tab === t.id ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50' : 'text-slate-300 hover:bg-slate-800'}`}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        <div className="p-4 sm:p-6 space-y-5 text-slate-200">
          <div className="text-[11px] font-mono text-emerald-200/90 bg-emerald-950/40 border border-emerald-500/30 rounded-lg px-3 py-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" /> {SOURCES_LABEL}
          </div>

          {tab === 'principe' && (
            <div className="space-y-3">
              {SOURCES_PRINCIPE.map((p, i) => (
                <Card key={i} className="flex gap-3 text-sm leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-emerald-900/60 border border-emerald-600/50 text-[11px] font-mono flex items-center justify-center shrink-0 text-emerald-200">{i + 1}</span>
                  <span>{p}</span>
                </Card>
              ))}
              <Card className="text-xs text-slate-400 leading-relaxed">
                Compensation des efforts : lorsque le demandeur ne peut pas régler la prestation, le Bureau des méthodes la comptabilise (méthode MOC/MOC+) au titre des travaux préparatoires d’une <b className="text-slate-200">structure porteuse</b> (association ou coopérative) qui, seule, pourra répondre aux appels à propositions des bailleurs. Rien n’est facturé au demandeur ; rien n’est promis en son nom.
              </Card>
            </div>
          )}

          {tab === 'guichets' && (
            <div className="space-y-3">
              {GUICHETS.map(x => (
                <Card key={x.id}>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="text-sm font-bold text-emerald-200">{x.situation}</div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-900/50 text-emerald-300 border border-emerald-700/50">{x.cout}</span>
                  </div>
                  <div className="mt-2 grid md:grid-cols-2 gap-2 text-xs leading-relaxed">
                    <div><span className="text-slate-500 font-mono">Guichet · </span><span className="text-slate-200">{x.guichet}</span></div>
                    <div><span className="text-slate-500 font-mono">Base · </span><span className="text-slate-300">{x.base}</span></div>
                    <div><span className="text-slate-500 font-mono">Objectio prépare · </span><span className="text-slate-200">{x.prepare}</span></div>
                    <div><span className="text-slate-500 font-mono">Première étape · </span><span className="text-slate-300">{x.etape}</span></div>
                  </div>
                  <div className="mt-2 text-[10px] font-mono text-slate-500">Étudié par le Bureau des méthodes Objectio — dossier soumis à l’appréciation de : {x.guichet.split(',')[0]}</div>
                </Card>
              ))}
            </div>
          )}

          {tab === 'depot' && (
            <div className="space-y-4">
              <Card className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Ce formulaire ne transmet rien tout seul : il prépare un e-mail que <b>vous</b> envoyez depuis votre messagerie. N’indiquez ni nom, ni CIN, ni RIB, ni numéro de dossier bancaire.</span>
              </Card>
              <div>
                <label className="text-xs font-semibold text-slate-400">Guichet pressenti (facultatif)</label>
                <select value={guichetChoisi} onChange={e => setGuichetChoisi(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-slate-200">
                  <option value="">— je ne sais pas encore —</option>
                  {GUICHETS.map(x => <option key={x.id} value={x.id}>{x.situation}</option>)}
                </select>
              </div>
              {SOURCES_DEPOT_CHAMPS.map(c => (
                <div key={c.id}>
                  <label className="text-xs font-semibold text-slate-400">{c.label}</label>
                  <textarea rows={3} value={form[c.id] || ''} onChange={e => setForm({ ...form, [c.id]: e.target.value })} placeholder={c.placeholder}
                    className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-slate-200 focus:border-emerald-500" />
                </div>
              ))}
              <div className="flex flex-wrap gap-2">
                <a href={mailto} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs">
                  <Mail className="w-3.5 h-3.5" /> Ouvrir l’e-mail préparé
                </a>
                <button onClick={() => copy(mailBody, 'body')} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:border-emerald-400 text-xs cursor-pointer">
                  {copied === 'body' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} Copier le texte
                </button>
              </div>
            </div>
          )}

          {tab === 'agent' && <AgentChat agentId="sources" />}
        </div>
      </div>
    </div>
  );
};
