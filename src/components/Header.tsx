import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  FileText, 
  Share2, 
  Search, 
  Sparkles,
  CheckCircle,
  ExternalLink,
  Award,
  Layers,
  Brain,
  UserCheck,
  KeyRound,
  Bot,
  Tv
} from 'lucide-react';
import { LEGAL_IDENTITY } from '../data/servicesData';
import { ServiceCategory } from '../types';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onOpenAttestation: () => void;
  onOpenGlobalInventory: () => void;
  onOpenShareModal: () => void;
  onOpenInternationalBilling: () => void;
  onOpenArganeSekyat: () => void;
  onOpenLogueVideo?: () => void;
  onOpenFounderMasterAccess?: () => void;
  onCopyHubUrl: () => void;
  copiedHub: boolean;
  totalServicesCount: number;
  filteredCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onOpenAttestation,
  onOpenGlobalInventory,
  onOpenShareModal,
  onOpenInternationalBilling,
  onOpenArganeSekyat,
  onOpenLogueVideo,
  onOpenFounderMasterAccess,
  onCopyHubUrl,
  copiedHub,
  totalServicesCount,
  filteredCount,
}) => {
  const categories: { id: string; label: string; countSuffix?: string }[] = [
    { id: 'all', label: 'Tous les services' },
    { id: 'juridique', label: 'Droit & Actes' },
    { id: 'finance', label: 'Finance & Stratégie' },
    { id: 'securite', label: 'Sécurité & Risques' },
    { id: 'tech', label: 'Propriété & Tech' },
  ];

  return (
    <header className="relative border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-slate-100 overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-24 right-10 w-[400px] h-[250px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Official Legal Top Ribbon */}
      <div className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-4 py-2 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-emerald-400 font-medium text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {LEGAL_IDENTITY.portalDesignation} • Actif
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-300 font-mono tracking-wide">
              {LEGAL_IDENTITY.jurisdiction}
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] flex-wrap">
            <button
              onClick={onOpenArganeSekyat}
              className="text-purple-300 hover:text-white bg-purple-950/80 hover:bg-purple-900 px-2 py-0.5 rounded border border-purple-600/70 flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
              title="Ouvrir la Console Argane-Sekyat V2 (Chat To Chat Multi-Agents & Consultation Droit Positif)"
            >
              <Bot className="w-3 h-3 text-purple-400" />
              <span className="font-semibold">Argane-Sekyat V2 (Chat-To-Chat)</span>
            </button>
            <span className="text-slate-500">|</span>
            <button
              onClick={onOpenInternationalBilling}
              className="text-emerald-300 hover:text-white bg-emerald-950/70 hover:bg-emerald-900/90 px-2 py-0.5 rounded border border-emerald-600/60 flex items-center gap-1 cursor-pointer transition-colors"
              title="Consulter la facilité d'envoi de factures BNC et la prise en charge PNUD (0,00 MAD débours)"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>BNC International (Auto-Alimentation Cloud 0 MAD)</span>
            </button>
            <span className="text-slate-500">|</span>
            <button
              onClick={onOpenShareModal}
              className="text-sky-300 hover:text-white bg-sky-950/60 hover:bg-sky-900/80 px-2 py-0.5 rounded border border-sky-700/60 flex items-center gap-1 cursor-pointer transition-colors"
              title="Consulter la configuration DNS (Namecheap + Cloudflare) pour morchidit.morchidi.digital"
            >
              <ExternalLink className="w-3 h-3 text-sky-400" />
              <span>{LEGAL_IDENTITY.officialDomain} (DNS Cloudflare)</span>
            </button>
            <span className="text-slate-500">|</span>
            <span className="text-amber-400/90 font-semibold flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> Apport : {LEGAL_IDENTITY.certifiedContribution}
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">RC : {LEGAL_IDENTITY.rcNumber}</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">ICE : {LEGAL_IDENTITY.iceNumber}</span>
          </div>
        </div>
      </div>

      {/* Main Identity Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-7">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Identity Left */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Écosystème Certifié de Droit Positif
            </div>

            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-['Cinzel',serif]">
                Objectio Hub
              </h1>
              <span className="text-sm sm:text-base font-semibold text-slate-400 font-['Plus_Jakarta_Sans',sans-serif]">
                par <span className="text-amber-200 underline decoration-amber-500/40 underline-offset-4">{LEGAL_IDENTITY.founderName}</span>{' '}
                <span className="text-slate-400 text-xs sm:text-sm font-mono bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                  ({LEGAL_IDENTITY.cin} • {LEGAL_IDENTITY.matricule})
                </span>
              </span>
            </div>

            <p className="text-slate-300 max-w-3xl text-sm sm:text-base leading-relaxed">
              Architecture centrale et portail de Droit Positif fédérant 15 services d’ingénierie juridique, financière et technologique, adossée à un{' '}
              <strong className="text-amber-300 font-semibold">patrimoine applicatif évalué à {LEGAL_IDENTITY.certifiedContribution}</strong>.
            </p>

            {/* Official Badges Pills */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={onOpenGlobalInventory}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-amber-500/40 shadow-sm text-xs text-slate-200 transition-all cursor-pointer group"
                title="Consulter l'inventaire complet de tous les projets et efforts"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] group-hover:scale-125 transition-transform"></span>
                <span className="text-slate-400">Inventaire Réel :</span>
                <strong className="text-amber-300 font-mono font-bold">{LEGAL_IDENTITY.certifiedContribution}</strong>
                <Layers className="w-3.5 h-3.5 text-amber-400 ml-1 opacity-70 group-hover:opacity-100" />
              </button>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs text-slate-200">
                <span className="text-slate-400">ICE :</span>
                <strong className="text-slate-200 font-mono font-medium">{LEGAL_IDENTITY.iceNumber}</strong>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-cyan-800/60 text-xs text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <strong className="font-mono">{LEGAL_IDENTITY.isocNumber}</strong>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-xs text-slate-300 font-mono">
                <span>15 Services Connectés</span>
              </div>

              <button
                type="button"
                onClick={onOpenShareModal}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-950/60 hover:bg-sky-900/80 border border-sky-600/50 shadow-sm text-xs text-sky-200 transition-all cursor-pointer group"
                title="Consulter les 8 sites et la configuration DNS (Namecheap + Cloudflare) de morchidit.morchidi.digital"
              >
                <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] group-hover:scale-125 transition-transform"></span>
                <span className="text-slate-300">8 Pôles & DNS :</span>
                <strong className="text-sky-300 font-mono font-bold">morchidit</strong>
                <ExternalLink className="w-3 h-3 text-sky-400 ml-0.5" />
              </button>
            </div>
          </div>

          {/* Identity Right Actions */}
          <div className="flex flex-row sm:flex-col items-stretch sm:items-end justify-start gap-2 shrink-0">
            {/* Bouton Logue Vidéo - Cadrage Broadcast beIN Sports 2026 */}
            {onOpenLogueVideo && (
              <button
                id="btn-logue-video-header"
                onClick={onOpenLogueVideo}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-rose-950 via-slate-900 to-amber-950/80 hover:from-rose-900 hover:to-slate-800 border-2 border-rose-500/80 text-rose-200 font-bold text-xs shadow-lg shadow-rose-950/50 transition-all active:scale-[0.98] cursor-pointer ring-2 ring-rose-500/25"
                title="Accéder au Studio Logue Vidéo : Cadrage subdivisé beIN SPORTS 2026 (Arrêts de match, Kokises, Publication Propre & Autrui)"
              >
                <Tv className="w-4 h-4 text-rose-400 shrink-0" />
                <div className="text-left">
                  <span className="block leading-tight text-white font-semibold flex items-center gap-1.5">
                    <span>Logue Vidéo TV</span>
                    <span className="px-1.5 py-0.2 rounded bg-rose-500/30 text-rose-300 text-[9px] font-mono">beIN 2026</span>
                  </span>
                  <span className="block text-[10px] font-normal text-amber-300/90 font-mono">
                    Cadre Subdivisé • Pubs & Kokises
                  </span>
                </div>
              </button>
            )}

            {/* Bouton Argane-Sekyat V2 Chat-To-Chat */}
            <button
              id="btn-argane-sekyat-v2-main"
              onClick={onOpenArganeSekyat}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 hover:from-purple-900 hover:to-indigo-900 border-2 border-purple-500 text-purple-200 font-bold text-xs shadow-lg shadow-purple-950/60 transition-all active:scale-[0.98] cursor-pointer ring-2 ring-purple-500/25"
              title="Ouvrir la Console Argane-Sekyat V2 : Débat Multi-Agents Chat-to-Chat et Consultation Droit Positif"
            >
              <Bot className="w-4 h-4 text-purple-400 shrink-0" />
              <div className="text-left">
                <span className="block leading-tight text-white font-semibold flex items-center gap-1.5">
                  <span>Argane-Sekyat V2</span>
                  <span className="px-1.5 py-0.2 rounded bg-purple-500/30 text-purple-300 text-[9px] font-mono">Chat-To-Chat</span>
                </span>
                <span className="block text-[10px] font-normal text-purple-300/90 font-mono">
                  Duo Doctrinal 🤖🧠 • Discord & DeepSeek
                </span>
              </div>
            </button>

            {/* Bouton Exprès : Accès Réservé Fondateur & Secrétaire Général */}
            <button
              id="btn-acces-reserve-fondateur"
              onClick={onOpenFounderMasterAccess || onOpenInternationalBilling}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-amber-950 via-slate-900 to-amber-900/60 hover:from-amber-900 hover:to-amber-800 border-2 border-amber-400 text-amber-200 font-bold text-xs shadow-lg shadow-amber-950/50 transition-all active:scale-[0.98] cursor-pointer ring-2 ring-amber-500/30 animate-pulse hover:animate-none"
              title="Accès officiel réservé : Console Maître sur l'ENSEMBLE des 15 Services, Workbenches, Pôles et Actes BMM*"
            >
              <KeyRound className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="text-left">
                <span className="block leading-tight text-white font-semibold">
                  Accès Réservé : Fondateur & Secrétaire Général
                </span>
                <span className="block text-[10px] font-normal text-amber-300/90 font-mono">
                  Plein Pouvoir (15 Services) • BMM* • Domiciliation BNC
                </span>
              </div>
            </button>

            <button
              onClick={onOpenInternationalBilling}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/60 text-emerald-300 font-bold text-xs shadow-md transition-all active:scale-[0.98] cursor-pointer"
              title="Ouvrir la facilité d'envoi de factures BNC et prise en charge PNUD (0,00 MAD débours)"
            >
              <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-left">
                <span className="block leading-tight text-white">Facilité BNC & PNUD ($6 600)</span>
                <span className="block text-[10px] font-normal text-emerald-400">Prise en charge Bailleurs • 0 MAD Débours</span>
              </div>
            </button>

            <button
              onClick={onOpenShareModal}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-sky-500/50 text-sky-300 font-bold text-xs shadow-md transition-all active:scale-[0.98] cursor-pointer"
              title="Ouvrir le portail des 8 sites et le dossier technique DNS Namecheap & Cloudflare"
            >
              <Share2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <div className="text-left">
                <span className="block leading-tight">8 Pôles & DNS</span>
                <span className="block text-[10px] font-normal text-sky-400/80">morchidit.morchidi.digital</span>
              </div>
            </button>

            <button
              onClick={onOpenGlobalInventory}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-amber-500/50 text-amber-300 font-bold text-xs shadow-md transition-all active:scale-[0.98] cursor-pointer"
              title="Consulter l'inventaire réel multi-projets, les dates d'arrêté d'efforts MOC et l'étude de R.O.I anti-inflation"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <div className="text-left">
                <span className="block leading-tight">Inventaire MOC</span>
                <span className="block text-[10px] font-normal text-amber-400/80">Travaux en cours • Réserve</span>
              </div>
            </button>

            <button
              onClick={onOpenAttestation}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-950/40 transition-all active:scale-[0.98] cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Attestation ({LEGAL_IDENTITY.certifiedContribution})</span>
            </button>
          </div>
        </div>

        {/* Search & Deep Link Navigation Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par service, ancre (ex: #pv-certif, #redac)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/50 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
              >
                Effacer
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/20 border border-amber-500/60 text-amber-300 shadow-sm'
                      : 'bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active filtering indicator */}
        {(searchQuery || selectedCategory !== 'all') && (
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span>
              Affichage de <strong className="text-slate-200 font-mono">{filteredCount}</strong> sur <strong className="text-slate-200 font-mono">{totalServicesCount}</strong> services
            </span>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-amber-400 hover:underline cursor-pointer"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
