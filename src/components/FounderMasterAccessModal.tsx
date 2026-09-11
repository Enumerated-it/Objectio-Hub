import React, { useState } from 'react';
import { 
  X, 
  KeyRound, 
  ShieldCheck, 
  Award, 
  ExternalLink, 
  Layers, 
  Search, 
  Sparkles, 
  DollarSign, 
  Globe, 
  Bot, 
  Tv, 
  Check, 
  Copy, 
  FileText, 
  Building2, 
  ChevronRight, 
  Sliders, 
  ArrowRight, 
  Lock, 
  Unlock, 
  Printer, 
  Share2,
  CheckCircle2,
  Cpu,
  Scale,
  Hash,
  FileCheck,
  Zap,
  ArrowUpRight,
  Database
} from 'lucide-react';
import { 
  LEGAL_IDENTITY, 
  SERVICES_LIST, 
  BNC_ACCOUNT_DATA, 
  OBJ_VALEUR_APPORT_NATURE_FORMATTED
} from '../data/servicesData';
import { ServiceItem, ServiceCategory } from '../types';
import { copyToClipboard, getFullDeepLink } from '../utils/deepLink';
import { ServiceWorkbench } from './interactive/ServiceWorkbenches';

interface FounderMasterAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (service: ServiceItem) => void;
  onOpenInternationalBilling: () => void;
  onOpenArganeSekyat: () => void;
  onOpenLogueVideo: () => void;
  onOpenAttestation: () => void;
  onOpenGlobalInventory: () => void;
  onOpenShareModal: () => void;
}

export const FounderMasterAccessModal: React.FC<FounderMasterAccessModalProps> = ({
  isOpen,
  onClose,
  onSelectService,
  onOpenInternationalBilling,
  onOpenArganeSekyat,
  onOpenLogueVideo,
  onOpenAttestation,
  onOpenGlobalInventory,
  onOpenShareModal,
}) => {
  const [activeTab, setActiveTab] = useState<'services' | 'plateformes' | 'dossier_fondateur' | 'synthese'>('services');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [activeInlineWorkbenchService, setActiveInlineWorkbenchService] = useState<ServiceItem | null>(null);

  if (!isOpen) return null;

  const handleCopyLink = async (anchor: string, id: string) => {
    const fullLink = getFullDeepLink(anchor);
    const success = await copyToClipboard(fullLink);
    if (success) {
      setCopiedLink(id);
      setTimeout(() => setCopiedLink(null), 2500);
    }
  };

  const filteredServices = SERVICES_LIST.filter((service) => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = 
      searchQuery.trim() === '' ||
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.anchor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories: { key: string; label: string }[] = [
    { key: 'all', label: `Tous les Services (${SERVICES_LIST.length})` },
    { key: 'juridique', label: 'Droit & Actes' },
    { key: 'finance', label: 'Finance & Stratégie' },
    { key: 'securite', label: 'Sécurité & Risques' },
    { key: 'tech', label: 'Propriété & Tech' },
  ];

  const handleOpenDirectService = (service: ServiceItem) => {
    onClose();
    onSelectService(service);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-slate-900 border-2 border-amber-500/80 rounded-2xl shadow-2xl shadow-amber-950/40 overflow-hidden text-slate-100 my-4 flex flex-col max-h-[92vh]">
        
        {/* EN-TÊTE OFFICIEL DU GRAND COMMANDEMENT FONDATEUR */}
        <div className="px-5 sm:px-6 py-4 border-b border-amber-500/40 bg-gradient-to-r from-amber-950 via-slate-950 to-slate-900 shrink-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 shrink-0">
              <KeyRound className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  ACCÈS RÉSERVÉ : FONDATEUR & SECRÉTAIRE GÉNÉRAL
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold flex items-center gap-1">
                  <Unlock className="w-3 h-3 text-emerald-400" />
                  Plein Pouvoir sur l'Écosystème (15/15 Services)
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-bold text-white mt-1 font-['Cinzel',serif] tracking-wide flex items-center gap-2">
                <span>Console Maître : Mohamed MORCHID</span>
                <span className="text-xs font-mono font-normal text-amber-300/80 bg-slate-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                  {LEGAL_IDENTITY.cin} • État civil {LEGAL_IDENTITY.matricule}
                </span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => handleCopyLink('espace-fondateur', 'master-link')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 transition-colors cursor-pointer"
              title="Copier le lien direct vers la console fondateur"
            >
              {copiedLink === 'master-link' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-slate-400" />}
              <span className="font-mono">{copiedLink === 'master-link' ? 'Lien copié' : '#espace-fondateur'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950/80 hover:text-rose-300 border border-slate-700 text-slate-400 hover:border-rose-500/50 transition-colors cursor-pointer"
              title="Fermer la console fondateur"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* BARRE D'ONGLETS MAÎTRE */}
        <div className="px-5 sm:px-6 py-2.5 bg-slate-950/95 border-b border-slate-800 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none font-mono text-xs">
          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'services'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Tous les 15 Services & Workbenches ({SERVICES_LIST.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('plateformes')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'plateformes'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Pôles Satellites (Argane, Logue Vidéo, BNC...)</span>
          </button>

          <button
            onClick={() => setActiveTab('dossier_fondateur')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'dossier_fondateur'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Identité & Actes Probatoires BMM*</span>
          </button>

          <button
            onClick={() => setActiveTab('synthese')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'synthese'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Rapport d'Audit Global</span>
          </button>
        </div>

        {/* CORPS PRINCIPAL DE LA CONSOLE */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* ONGLET 1 : ACCÈS DIRECT À TOUS LES 15 SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              {/* Message d'introduction et statut des pleins pouvoirs */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Accès Centralisé Immédiat aux 15 Modules Opérationnels
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      En qualité de <strong>Fondateur & Secrétaire Général</strong>, vous disposez d'une vision unifiée et de l'exécution directe de l'ensemble des modules d'ingénierie juridique, financière et technologique.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
                  <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-amber-300">
                    Apport : {OBJ_VALEUR_APPORT_NATURE_FORMATTED}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 font-bold">
                    15/15 Opérationnels
                  </span>
                </div>
              </div>

              {/* Barre de recherche et filtres pour les 15 services */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filtrer par nom de service, code (S01..S15), ancre ou mots-clés..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Filtres de catégorie */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
                  {categories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all cursor-pointer ${
                        selectedCategory === cat.key
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Si un workbench inline est activé dans la console */}
              {activeInlineWorkbenchService && (
                <div className="p-4 rounded-xl bg-slate-950 border-2 border-amber-500/80 shadow-2xl animate-in fade-in duration-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                        {activeInlineWorkbenchService.code}
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        Simulateur Fondateur : {activeInlineWorkbenchService.title}
                      </h4>
                      <span className="text-xs text-slate-400 font-mono">
                        (#{activeInlineWorkbenchService.anchor})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenDirectService(activeInlineWorkbenchService)}
                        className="text-xs text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800"
                      >
                        <span>Ouvrir en plein écran</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setActiveInlineWorkbenchService(null)}
                        className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-800"
                      >
                        Fermer le simulateur ✕
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <ServiceWorkbench service={activeInlineWorkbenchService} />
                  </div>
                </div>
              )}

              {/* Grille des 15 Services avec boutons d'actions directes */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/60 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/40 text-amber-300">
                          {service.code}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          #{service.anchor}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors mb-1">
                        {service.title}
                      </h4>

                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                        {service.tagline}
                      </p>

                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 py-1.5 px-2 rounded bg-slate-900 border border-slate-800/80 mb-3">
                        <span className="truncate">{service.primaryMetric.label} :</span>
                        <strong className="text-amber-400 font-bold shrink-0 ml-1">
                          {service.primaryMetric.value}
                        </strong>
                      </div>
                    </div>

                    {/* Boutons d'accès direct réservé au fondateur */}
                    <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
                      <button
                        onClick={() => handleOpenDirectService(service)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs shadow-sm transition-all cursor-pointer"
                        title="Ouvrir la fiche complète et les actes certifiés"
                      >
                        <span>Fiche & Actes</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          if (activeInlineWorkbenchService?.id === service.id) {
                            setActiveInlineWorkbenchService(null);
                          } else {
                            setActiveInlineWorkbenchService(service);
                          }
                        }}
                        className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                          activeInlineWorkbenchService?.id === service.id
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                        title="Tester le simulateur / workbench directement"
                      >
                        <Sliders className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleCopyLink(service.anchor, service.id)}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white text-xs transition-colors cursor-pointer"
                        title="Copier le lien direct #ancre"
                      >
                        {copiedLink === service.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ONGLET 2 : PÔLES SATELLITES & GRANDES PLATES-FORMES */}
          {activeTab === 'plateformes' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  Plates-formes Transverses & Pôles Opérationnels Connectés
                </h3>
                <p className="text-xs text-slate-300">
                  Accédez en un clic à l'ensemble des modules périphériques, passerelles de paiement, studios télévisuels et consoles IA de l'écosystème.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Argane-Sekyat V2 */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-950/70 via-slate-900 to-slate-950 border border-purple-500/50 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-mono font-bold">
                        INTELLIGENCE ARTIFICIELLE
                      </span>
                      <Bot className="w-4 h-4 text-purple-400" />
                    </div>
                    <h4 className="text-base font-bold text-white">
                      Argane-Sekyat V2 (Chat-To-Chat)
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1">
                      Console de débat doctrinal multi-agents entre Argane (Spécialiste Droit Positif) et Sekyat (Analyste Financier & Risques), intégrant les flux Discord et DeepSeek.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenArganeSekyat();
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <span>Ouvrir Console Argane-Sekyat</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 2. Logue Vidéo (beIN SPORTS 2026) */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-rose-950/70 via-slate-900 to-slate-950 border border-rose-500/50 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-mono font-bold">
                        DIFFUSION BROADCAST & KOKISES
                      </span>
                      <Tv className="w-4 h-4 text-rose-400" />
                    </div>
                    <h4 className="text-base font-bold text-white">
                      Logue Vidéo • Cadrage TV World Cup 2026
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1">
                      Système de cadrage en L style beIN SPORTS activé lors des arrêts de match, défilement des kokises CNDP et régie publicitaire (propre & publication pour autrui).
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenLogueVideo();
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <span>Lancer le Studio Logue Vidéo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 3. Facilité BNC & PNUD ($6 600 USD) */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-950 border border-emerald-500/50 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold">
                        FINANCE INTERNATIONALE
                      </span>
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                    </div>
                    <h4 className="text-base font-bold text-white">
                      Facturation BNC & Prise en Charge PNUD ($6 600)
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1">
                      Note d'honoraires officielle BMM* adossée au compte Banque Nationale du Canada (Compte 11-496-06), générateur de lettres de transmission aux bailleurs (0,00 MAD débours).
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenInternationalBilling();
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <span>Générateur de Factures & Lettres BNC</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 4. Actifs d'Apport (942 550 MAD) & Inventaire MOC */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/70 via-slate-900 to-slate-950 border border-amber-500/50 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold">
                        ACTIF JURIDIQUE CERTIFIÉ
                      </span>
                      <Award className="w-4 h-4 text-amber-400" />
                    </div>
                    <h4 className="text-base font-bold text-white">
                      Attestation d'Apport & Inventaire MOC
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1">
                      Rapport consolidé des 7 actifs certifiés opposables (Lois 17-95 et 5-96) d'une valeur réelle de {OBJ_VALEUR_APPORT_NATURE_FORMATTED} et valorisation analytique MOC/MOC+.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenAttestation();
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <span>Attestation BMM*</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenGlobalInventory();
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all cursor-pointer"
                    >
                      <span>Inventaire MOC</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Passerelle Réseau 8 Pôles & Cloudflare DNS */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/40">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      Réseau Central des 8 Pôles & Configuration DNS (morchidit.morchidi.digital)
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Routage multi-domaines Cloudflare, zone apex et passerelles d'hébergement.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onOpenShareModal();
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-colors cursor-pointer shrink-0"
                >
                  Inspecter les 8 Pôles DNS
                </button>
              </div>
            </div>
          )}

          {/* ONGLET 3 : DOSSIER JURIDIQUE DU FONDATEUR */}
          {activeTab === 'dossier_fondateur' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Identité Civile, Immatriculation & État Probatoire du Titulaire
                </h3>
                <p className="text-xs text-slate-300">
                  Éléments d'identification opposables aux tiers, autorités judiciaires, banques et institutions internationales.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                {/* Bloc 1 : Identité & Immatriculation Commerciale */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-1.5 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    <span>Identité Civile & Registre de Commerce</span>
                  </h4>
                  <div className="space-y-1.5 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Nom & Prénom :</span>
                      <strong className="text-white">{LEGAL_IDENTITY.founderName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Qualité Fondatrice :</span>
                      <strong className="text-emerald-400">Fondateur & Secrétaire Général</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">CIN Nationale :</span>
                      <strong className="text-amber-300">{LEGAL_IDENTITY.cin}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Matricule État Civil :</span>
                      <strong className="text-slate-200">{LEGAL_IDENTITY.matricule}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Registre du Commerce :</span>
                      <strong className="text-white">RC {LEGAL_IDENTITY.rcNumber}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Identifiant Commun (ICE) :</span>
                      <strong className="text-white">ICE {LEGAL_IDENTITY.iceNumber}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Numéro ISOC International :</span>
                      <strong className="text-cyan-400">{LEGAL_IDENTITY.isocNumber}</strong>
                    </div>
                  </div>
                </div>

                {/* Bloc 2 : Coordonnées Bancaires Nationales & Internationales */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider border-b border-slate-800 pb-1.5 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Canaux de Règlement Bancaire Certifiés</span>
                  </h4>
                  <div className="space-y-2 text-slate-300">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-emerald-400 font-bold uppercase">Passerelle Nationale CIH Bank :</div>
                      <div className="text-slate-200 mt-0.5">CIH Bank Settat (Royaume du Maroc)</div>
                      <div className="text-[11px] text-amber-300 select-all font-bold">RIB {LEGAL_IDENTITY.rib}</div>
                    </div>

                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-cyan-400 font-bold uppercase">Banque Nationale du Canada (International) :</div>
                      <div className="text-slate-200 mt-0.5">{BNC_ACCOUNT_DATA.bankName} (Montréal / Ottawa)</div>
                      <div className="text-[11px] text-cyan-300 select-all font-bold">Compte N° {BNC_ACCOUNT_DATA.accountNumber}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Auto-alimentation des serveurs Cloud (0,00 MAD débours)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Texte Doctrinal de Fondateur */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans space-y-2">
                <p>
                  <strong>Déclaration Solennelle d'Exercice :</strong> L'ensemble des 15 services de la plateforme Objectio Hub ont été élaborés et formalisés sous la direction doctrinale de <strong>Mohamed MORCHID</strong>. Les apports incorporels, logiciels, matrices de chrono-analyse MOC et marques constituent un actif net légalement déclaré au bilan d'ouverture d'une valeur attestée de <strong>{OBJ_VALEUR_APPORT_NATURE_FORMATTED}</strong>.
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Opposabilité : D.O.C marocain • Code de Commerce • Lois 17-95 et 5-96 sur les Sociétés Commerciales • Traité de l'OHADA & Standards CNUDCI.
                </p>
              </div>
            </div>
          )}

          {/* ONGLET 4 : RAPPORT D'AUDIT GLOBAL ET SYNTHÈSE */}
          {activeTab === 'synthese' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">
                    Synthèse d'Ingénierie & Matrice de Consolidation
                  </h3>
                  <p className="text-xs text-slate-300">
                    Document officiel récapitulant les 15 services, leurs fondements légaux et les valeurs d'apport.
                  </p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimer le Rapport</span>
                </button>
              </div>

              {/* Table récapitulative des 15 services */}
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">Code</th>
                      <th className="py-2.5 px-3">Intitulé du Service</th>
                      <th className="py-2.5 px-3">Catégorie</th>
                      <th className="py-2.5 px-3">Base Légale Opposable</th>
                      <th className="py-2.5 px-3 text-right">Métrique / Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {SERVICES_LIST.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-900/40">
                        <td className="py-2.5 px-3 font-bold text-amber-400">{s.code}</td>
                        <td className="py-2.5 px-3 font-semibold text-white">
                          <button
                            onClick={() => handleOpenDirectService(s)}
                            className="hover:underline hover:text-amber-300 text-left cursor-pointer"
                          >
                            {s.title}
                          </button>
                        </td>
                        <td className="py-2.5 px-3 text-slate-400">{s.categoryLabel}</td>
                        <td className="py-2.5 px-3 text-slate-400 truncate max-w-[280px]">{s.legalBasis}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-emerald-400">
                          {s.primaryMetric.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pied du rapport */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
                <span>Réf Rapport : BMM-AUDIT-MAÎTRE-2026</span>
                <span className="text-emerald-400 font-bold">15 Services Opposables • BMM* Settat</span>
                <span>Titulaire : Mohamed MORCHID (964 R/1970)</span>
              </div>
            </div>
          )}

        </div>

        {/* PIED DE PAGE FIXE AVEC RACCOURCIS RAPIDES */}
        <div className="px-5 sm:px-6 py-3 border-t border-slate-800 bg-slate-950 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3 text-slate-400">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Console Active</span>
            </span>
            <span>•</span>
            <span>RC 16894 Settat</span>
            <span>•</span>
            <span className="text-slate-300">BNC 11-496-06</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors cursor-pointer"
            >
              Quitter la Console
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
