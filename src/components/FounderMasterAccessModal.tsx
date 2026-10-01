import React from 'react';
import { LockKeyhole, X } from 'lucide-react';
import { ServiceItem } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectService?: (service: ServiceItem) => void;
  onOpenInternationalBilling?: () => void;
  onOpenArganeSekyat?: () => void;
  onOpenLogueVideo?: () => void;
  onOpenAttestation?: () => void;
  onOpenGlobalInventory?: () => void;
  onOpenShareModal?: () => void;
}

export const FounderMasterAccessModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="private-title">
      <div className="w-full max-w-lg rounded-2xl border border-amber-500/30 bg-slate-900 p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <span className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2 text-amber-300"><LockKeyhole className="h-5 w-5" /></span>
            <div>
              <h2 id="private-title" className="font-bold text-white">Espace de travail privé</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">Les dossiers du fondateur, coordonnées, preuves, inventaires détaillés et outils de travail ne sont pas distribués dans l’interface publique.</p>
              <p className="mt-3 text-xs text-slate-400">L’accès professionnel fera l’objet d’une validation manuelle et d’une convention préalable. Aucun document privé n’est communiqué depuis cette page.</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Fermer" className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"><X className="h-4 w-4" /></button>
        </div>
        <button onClick={onClose} className="mt-6 w-full rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-400">Fermer</button>
      </div>
    </div>
  );
};
