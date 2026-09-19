import React from 'react';
import { X, Scale, Copy, Check } from 'lucide-react';
import { LEGAL_IDENTITY } from '../data/servicesData';
import { MENTIONS_SECTIONS, MENTIONS_VERSION } from '../data/mentionsLegalesData';
import { copyToClipboard, getFullDeepLink } from '../utils/deepLink';

interface Props { isOpen: boolean; onClose: () => void }

export const MentionsLegalesModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);
  if (!isOpen) return null;
  const link = getFullDeepLink('mentions-legales');
  const copy = async () => {
    if (await copyToClipboard(link)) { setCopied(true); setTimeout(() => setCopied(false), 1800); }
  };
  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center bg-black/80 backdrop-blur-sm overflow-y-auto p-2 sm:p-6" role="dialog" aria-modal="true" aria-label="Mentions légales">
      <div className="w-full max-w-4xl bg-slate-950 border border-slate-700 rounded-2xl shadow-2xl my-4">
        <div className="flex items-start justify-between gap-4 px-5 py-4 bg-gradient-to-r from-slate-900 to-slate-950 border-b border-slate-800 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-amber-500/15 border border-amber-400/50 flex items-center justify-center text-amber-300">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-amber-400/80 uppercase tracking-wider">Objectio Hub</div>
              <div className="text-lg font-black tracking-wide text-slate-100">MENTIONS LÉGALES & DONNÉES PERSONNELLES</div>
              <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
                {LEGAL_IDENTITY.founderName} · {LEGAL_IDENTITY.matricule} · ICE {LEGAL_IDENTITY.iceNumber} · version {MENTIONS_VERSION}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={copy} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs" title="Copier le lien #mentions-legales">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="font-mono">#mentions-legales</span>
            </button>
            <button onClick={onClose} className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300" aria-label="Fermer">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="px-5 py-5 space-y-5 text-sm text-slate-300 leading-relaxed">
          {MENTIONS_SECTIONS.map((s) => (
            <section key={s.id} id={`mentions-${s.id}`} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h3 className="text-amber-300 font-bold mb-2">{s.titre}</h3>
              <ul className="space-y-1.5 list-disc pl-5">
                {s.lignes.map((l, i) => <li key={i}>{l}</li>)}
              </ul>
            </section>
          ))}
          <p className="text-[11px] text-slate-500 font-mono">
            Bureau des méthodes : il prépare, il ne décide pas. Aucune valeur n’est « certifiée » par le site.
          </p>
        </div>
      </div>
    </div>
  );
};
