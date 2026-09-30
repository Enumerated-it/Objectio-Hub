import React from 'react';
import { X, Globe2, ShieldCheck } from 'lucide-react';

interface Props { isOpen: boolean; onClose: () => void; }
export const InternationalBillingModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-4" role="dialog" aria-modal="true" aria-label="Initiative Canada">
    <div className="w-full max-w-2xl rounded-2xl border border-sky-500/30 bg-slate-900 p-5 shadow-2xl">
      <div className="flex items-start justify-between gap-4"><div className="flex gap-3"><Globe2 className="h-6 w-6 text-sky-400"/><div><h2 className="font-bold text-white">Initiative Canada — en cours de reconstruction</h2><p className="mt-1 text-xs text-slate-400">État public vérifié</p></div></div><button onClick={onClose} aria-label="Fermer" className="text-slate-400 hover:text-white"><X/></button></div>
      <div className="mt-5 space-y-3 text-sm leading-relaxed text-slate-300">
        <p>Cette initiative s’appuie sur une expérience bancaire personnelle historique documentée au Canada.</p>
        <p>Le statut actuel de cette relation doit être vérifié directement auprès de l’établissement concerné. Aucun compte professionnel actif, partenariat, financement, affiliation institutionnelle ou prise en charge de frais n’est annoncé comme acquis.</p>
        <div className="flex gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3 text-xs"><ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400"/><span>Les relevés, numéros de compte, soldes, projections et projets de correspondance restent dans le dossier privé.</span></div>
      </div>
    </div>
  </div>;
};
