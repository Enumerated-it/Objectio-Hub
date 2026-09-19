import React from 'react';
import { ShieldCheck, Hash, Award, ArrowUp, FileText, Layers, KeyRound, Bot, Tv } from 'lucide-react';
import { LEGAL_IDENTITY, SERVICES_LIST } from '../data/servicesData';
import { ServiceItem } from '../types';

interface FooterProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenAttestation: () => void;
  onOpenGlobalInventory: () => void;
  onOpenShareModal: () => void;
  onOpenInternationalBilling: () => void;
  onOpenArganeSekyat: () => void;
  onOpenLogueVideo?: () => void;
  onOpenFounderMasterAccess?: () => void;
  onOpenMentionsLegales?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onSelectService, 
  onOpenAttestation,
  onOpenGlobalInventory,
  onOpenShareModal,
  onOpenInternationalBilling,
  onOpenArganeSekyat,
  onOpenLogueVideo,
  onOpenFounderMasterAccess,
  onOpenMentionsLegales
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
      {/* Deep Link Directory Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-slate-900">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-amber-400" />
            <span className="font-mono font-semibold uppercase tracking-wider text-slate-300 text-xs">
              Index des 15 Ancres de Deep Linking (Navigation Directe)
            </span>
          </div>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Haut de page</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 font-mono text-[11px]">
          {SERVICES_LIST.map((srv) => (
            <a
              key={srv.id}
              href={`#${srv.anchor}`}
              onClick={(e) => {
                e.preventDefault();
                onSelectService(srv);
              }}
              className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-amber-500/40 text-slate-400 hover:text-amber-300 transition-all group"
            >
              <span className="truncate group-hover:text-slate-200">
                <strong className="text-amber-400/90 mr-1.5">{srv.code}</strong>
                {srv.title.split('/')[0].trim()}
              </span>
              <span className="text-[10px] text-slate-600 group-hover:text-amber-400/80 shrink-0 ml-1">
                #{srv.anchor}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Official Legal Identification & Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-slate-200 font-['Cinzel',serif] text-sm font-bold">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>OBJECTIO HUB — PORTAIL DE DROIT POSITIF</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed max-w-xl">
            Propriété exclusive de <strong>{LEGAL_IDENTITY.founderName}</strong>. 
            Écosystème structuré avec un portefeuille technologique de <span className="text-amber-300 font-mono font-semibold">{LEGAL_IDENTITY.certifiedContribution}</span> — {LEGAL_IDENTITY.statutValeurApport}.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-[11px] font-mono text-slate-500">
            <span>Structure : {LEGAL_IDENTITY.cin}</span>
            <span>•</span>
            <span>RC : {LEGAL_IDENTITY.rcNumber}</span>
            <span>•</span>
            <span>IF : {LEGAL_IDENTITY.ifNumber}</span>
            <span>•</span>
            <span>ICE : {LEGAL_IDENTITY.iceNumber}</span>
            <span>•</span>
            <span className="text-cyan-400">{LEGAL_IDENTITY.isocNumber}</span>
            <span>•</span>
            <span className="text-amber-400">{LEGAL_IDENTITY.officialDomain}</span>
            {onOpenMentionsLegales && (
              <>
                <span>•</span>
                <a
                  href="#mentions-legales"
                  id="lnk-footer-mentions-legales"
                  onClick={(e) => { e.preventDefault(); onOpenMentionsLegales(); }}
                  className="text-slate-300 underline decoration-dotted hover:text-amber-300"
                  title="Mentions légales et données personnelles (loi 09-08)"
                >
                  Mentions légales · Données personnelles (loi 09-08)
                </a>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 flex-wrap justify-center md:justify-end">
          {onOpenLogueVideo && (
            <button
              id="btn-footer-logue-video"
              onClick={onOpenLogueVideo}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-rose-950/80 hover:bg-rose-900 border-2 border-rose-500/70 text-rose-200 text-xs font-bold transition-all cursor-pointer shadow-md"
              title="Accéder au Studio Logue Vidéo (Cadrage subdivisé beIN SPORTS 2026, Kokises & Publication)"
            >
              <Tv className="w-3.5 h-3.5 text-rose-400" />
              <span>Logue Vidéo (beIN 2026)</span>
            </button>
          )}

          <button
            id="btn-footer-argane-sekyat"
            onClick={onOpenArganeSekyat}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-purple-950/80 hover:bg-purple-900 border-2 border-purple-500/70 text-purple-200 text-xs font-bold transition-all cursor-pointer shadow-md"
            title="Ouvrir la Console Argane-Sekyat V2 (Chat To Chat Multi-Agents & Consultation Droit Positif)"
          >
            <Bot className="w-3.5 h-3.5 text-purple-400" />
            <span>Argane-Sekyat V2 (Chat-To-Chat)</span>
          </button>

          <button
            id="btn-footer-acces-reserve"
            onClick={onOpenFounderMasterAccess || onOpenInternationalBilling}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-amber-950 via-slate-900 to-amber-900/70 hover:from-amber-900 hover:to-amber-800 border-2 border-amber-400 text-amber-200 text-xs font-bold transition-all cursor-pointer shadow-md"
            title="Accès officiel réservé : Console Maître Fondateur sur l'ENSEMBLE des 15 Services, Pôles et Actes BMM*"
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span>Accès Réservé : Fondateur & Secrétaire Général</span>
          </button>

          <button
            onClick={onOpenInternationalBilling}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-950/70 hover:bg-emerald-900/90 border border-emerald-500/50 text-emerald-300 text-xs font-semibold transition-colors cursor-pointer"
            title="Consulter la facilité d'envoi de factures BNC et prise en charge PNUD (0,00 MAD débours)"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Facilité BNC & PNUD ($6 600)</span>
          </button>

          <button
            onClick={onOpenShareModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-950/60 hover:bg-sky-900/80 border border-sky-600/50 text-sky-200 text-xs font-semibold transition-colors cursor-pointer"
            title="Consulter les 8 pôles et la configuration DNS morchidit.morchidi.digital"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>8 Pôles Déployés & DNS</span>
          </button>

          <button
            onClick={onOpenGlobalInventory}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Inventaire Global & Efforts (MOC)</span>
          </button>

          <button
            onClick={onOpenAttestation}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Attestation d'Apport ({LEGAL_IDENTITY.certifiedContribution})</span>
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-900 bg-slate-950/80 py-3 text-center text-[11px] text-slate-600 font-mono">
        © {new Date().getFullYear()} Objectio Hub • Mohamed MORCHID • Conformité D.O.C & Droit Positif
      </div>
    </footer>
  );
};
