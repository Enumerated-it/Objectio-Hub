import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  Share2,
  BookOpen,
  CheckCircle2,
  Hash
} from 'lucide-react';
import { ServiceItem } from '../types';
import { ServiceWorkbench } from './interactive/ServiceWorkbenches';
import { copyToClipboard, getFullDeepLink } from '../utils/deepLink';
import { LEGAL_IDENTITY } from '../data/servicesData';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onNavigateService: (direction: 'prev' | 'next') => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onNavigateService,
  hasPrev,
  hasNext,
}) => {
  if (!service) return null;

  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = async () => {
    const fullLink = getFullDeepLink(service.anchor);
    const success = await copyToClipboard(fullLink);
    if (success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-slate-950 overflow-hidden text-slate-100 my-4 flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-950/90 shrink-0">
          {/* Left: Code, Title, Anchor */}
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/40 text-amber-300">
              {service.code}
            </span>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-white truncate">
                {service.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span className="text-amber-400/90">/#{service.anchor}</span>
                <span>•</span>
                <span className="text-slate-500 truncate">{service.categoryLabel}</span>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Prev/Next nav buttons */}
            <div className="flex items-center bg-slate-800/80 rounded-lg p-0.5 border border-slate-700">
              <button
                onClick={() => onNavigateService('prev')}
                disabled={!hasPrev}
                className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 cursor-pointer"
                title="Service précédent"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-mono text-slate-500 px-1">
                {service.code}
              </span>
              <button
                onClick={() => onNavigateService('next')}
                disabled={!hasNext}
                className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 cursor-pointer"
                title="Service suivant"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Deep link copy */}
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 transition-colors cursor-pointer"
              title="Copier le lien direct vers ce service"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline text-emerald-400">Lien copié !</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Copier le Deep Link</span>
                </>
              )}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* Deep link indicator & Tagline */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-slate-300 font-medium">{service.tagline}</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 shrink-0">
              <span className="text-slate-500">Ancre :</span>
              <strong className="text-amber-300">#{service.anchor}</strong>
            </div>
          </div>

          {/* Legal Basis Notice */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/20 via-slate-950 to-slate-950 border border-amber-500/30 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-300 font-semibold uppercase tracking-wider font-mono text-[11px]">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              Fondement Juridique & Cadre de Droit Positif
            </div>
            <p className="text-slate-300 leading-relaxed">
              {service.legalBasis}
            </p>
            <div className="text-[11px] text-slate-500 font-mono pt-1">
              Réf. Registre : {LEGAL_IDENTITY.founderName} ({LEGAL_IDENTITY.matricule}) • ICE {LEGAL_IDENTITY.iceNumber} • {LEGAL_IDENTITY.isocNumber}
            </div>
          </div>

          {/* Interactive Workbench Container */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                Espace de Travail & Outil Interactif Dédié
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">
                Interactif • Temps Réel
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-inner">
              <ServiceWorkbench service={service} />
            </div>
          </div>

          {/* Features / Capabilities */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Périmètre Fonctionnel & Garanties
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-950/40 border border-slate-800/80 text-xs text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
          <div className="text-slate-500 font-mono text-[11px]">
            Valeur d'apport certifiée : <strong className="text-amber-400">{LEGAL_IDENTITY.certifiedContribution}</strong>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
          >
            Fermer l'Espace de Travail
          </button>
        </div>
      </div>
    </div>
  );
};
