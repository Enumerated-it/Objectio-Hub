import React, { useState, useEffect, useMemo } from 'react';
import { SERVICES_LIST, LEGAL_IDENTITY, ECOSYSTEM_SITES_LIST } from './data/servicesData';
import { ServiceItem, EcosystemSite } from './types';
import { Header } from './components/Header';
import { ServiceCard } from './components/ServiceCard';
import { ServiceModal } from './components/ServiceModal';
import { AttestationModal } from './components/AttestationModal';
import { GlobalInventoryModal } from './components/GlobalInventoryModal';
import { ShareAppModal } from './components/ShareAppModal';
import { InternationalBillingModal } from './components/InternationalBillingModal';
import { ArganeSekyatModal } from './components/ArganeSekyatModal';
import { FounderMasterAccessModal } from './components/FounderMasterAccessModal';
import { VideoLogueWorldCupStudio } from './components/VideoLogueWorldCupStudio';
import { MorchidiDigitalModal } from './components/MorchidiDigitalModal';
import { DossierApportModal } from './components/DossierApportModal';
import { SourcesInspirationModal } from './components/SourcesInspirationModal';
import { Footer } from './components/Footer';
import { MentionsLegalesModal } from './components/MentionsLegalesModal';
import { getAnchorFromUrl, setAnchorInUrl, copyToClipboard, getFullDeepLink } from './utils/deepLink';
import { 
  ShieldCheck, 
  Award, 
  Hash, 
  ExternalLink, 
  Layers, 
  Sparkles,
  Search,
  CheckCircle2,
  FileText,
  Globe,
  Share2,
  GraduationCap,
  Building2,
  PenTool,
  BookOpen,
  Car,
  ShieldAlert,
  Scale,
  HeartHandshake,
  Check,
  Copy,
  DollarSign,
  Clock,
  Send,
  KeyRound,
  Bot,
  Tv,
  FolderCheck, Lightbulb } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const [isAttestationOpen, setIsAttestationOpen] = useState(false);
  const [isGlobalInventoryOpen, setIsGlobalInventoryOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isInternationalBillingOpen, setIsInternationalBillingOpen] = useState(false);
  const [isArganeSekyatOpen, setIsArganeSekyatOpen] = useState(false);
  const [isLogueVideoOpen, setIsLogueVideoOpen] = useState(false);
  const [isMorchidiDigitalOpen, setIsMorchidiDigitalOpen] = useState(false);
  const [isDossierApportOpen, setIsDossierApportOpen] = useState(false);
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);
  const [isMentionsOpen, setIsMentionsOpen] = useState(false);
  const [isFounderMasterAccessOpen, setIsFounderMasterAccessOpen] = useState(false);
  const [activeSiteId, setActiveSiteId] = useState('site-0');
  const [copiedSiteId, setCopiedSiteId] = useState<string | null>(null);
  const [copiedHub, setCopiedHub] = useState(false);

  // Sync state with URL hash (Deep Linking requirement for 15 services & 8 ecosystem sites)
  useEffect(() => {
    const handleHashChange = () => {
      const anchor = getAnchorFromUrl();
      if (anchor) {
        const lower = anchor.toLowerCase();
        
        // Check for Founder Master Access deep link (Accès Réservé Fondateur & Secrétaire Général)
        if (
          lower === 'fondateur' || 
          lower === 'master-access' || 
          lower === 'espace-fondateur' || 
          lower === 'acces-reserve' || 
          lower === 'secretaire-general'
        ) {
          setIsFounderMasterAccessOpen(true);
          return;
        }

        // Check for Logue Vidéo & beIN Sports studio deep link
        if (lower === 'logue-video' || lower === 'video' || lower === 'beinsport' || lower === 'cadrage-tv' || lower === 'pub') {
          setIsLogueVideoOpen(true);
          const el = document.getElementById('logue-video-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          return;
        }

        // Check for Morchidi Digital dashboard deep link (18 Bureaux des méthodes, AGENT_SYNC)
        if (lower === 'morchidi-digital' || lower === 'morchidi' || lower === 'bureaux' || lower === 'agent-sync') {
          setIsMorchidiDigitalOpen(true);
          return;
        }

        // Check for Dossier d'apport deep link (état d'avancement, commissaire aux apports)
        if (lower === 'apport' || lower === 'dossier-apport' || lower === 'commissaire') {
          setIsDossierApportOpen(true);
          return;
        }

        // Mentions légales & données personnelles (loi 09-08) — prérequis des agents en ligne
        if (lower === 'mentions-legales' || lower === 'mentions' || lower === 'legal' || lower === 'donnees-personnelles') {
          setIsMentionsOpen(true);
          return;
        }

        // Check for « Aux sources d'inspiration » deep link (orientation vers les guichets réels)
        if (lower === 'sources-inspiration' || lower === 'sources' || lower === 'guichet' || lower === 'inspiration') {
          setIsSourcesOpen(true);
          return;
        }

        // Check for Argane-Sekyat console deep link
        if (lower === 'argane-sekyat' || lower === 'argane' || lower === 'chat-to-chat' || lower === 'sekyat') {
          setIsArganeSekyatOpen(true);
          return;
        }

        // 1. Check services list
        const foundService = SERVICES_LIST.find(
          (s) => s.anchor.toLowerCase() === lower
        );
        if (foundService) {
          setActiveService(foundService);
          const el = document.getElementById(foundService.anchor);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          return;
        }

        // 2. Check ecosystem sites list (e.g. #academie, #entraide, #cyber, etc.)
        const foundSite = ECOSYSTEM_SITES_LIST.find(
          (s) => s.hash.replace('#', '').toLowerCase() === lower || s.id.toLowerCase() === lower
        );
        if (foundSite) {
          setActiveSiteId(foundSite.id);
          const el = document.getElementById(foundSite.id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          return;
        }
      } else {
        setActiveService(null);
      }
    };

    // Initial check on page load
    handleHashChange();

    // Listen for hash changes (browser back/forward, direct link clicks)
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleCopySiteLink = async (siteHash: string, id: string) => {
    const directUrl = `${window.location.origin}${window.location.pathname}${siteHash}`;
    const success = await copyToClipboard(directUrl);
    if (success) {
      setCopiedSiteId(id);
      setTimeout(() => setCopiedSiteId(null), 2500);
    }
  };

  const getSiteIconComponent = (iconName: EcosystemSite['iconName']) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-4 h-4 text-emerald-400" />;
      case 'Scale':
        return <Scale className="w-4 h-4 text-amber-400" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-4 h-4 text-red-400" />;
      case 'Car':
        return <Car className="w-4 h-4 text-blue-400" />;
      case 'BookOpen':
        return <BookOpen className="w-4 h-4 text-orange-400" />;
      case 'PenTool':
        return <PenTool className="w-4 h-4 text-purple-400" />;
      case 'Building2':
        return <Building2 className="w-4 h-4 text-amber-400" />;
      case 'GraduationCap':
        return <GraduationCap className="w-4 h-4 text-sky-400" />;
      default:
        return <Globe className="w-4 h-4 text-cyan-400" />;
    }
  };

  const handleSelectService = (service: ServiceItem) => {
    setAnchorInUrl(service.anchor);
    setActiveService(service);
  };

  const handleCloseServiceModal = () => {
    setActiveService(null);
    setAnchorInUrl('');
  };

  const handleNavigateService = (direction: 'prev' | 'next') => {
    if (!activeService) return;
    const currentIndex = SERVICES_LIST.findIndex((s) => s.id === activeService.id);
    if (currentIndex === -1) return;

    let targetIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex >= 0 && targetIndex < SERVICES_LIST.length) {
      const nextService = SERVICES_LIST[targetIndex];
      handleSelectService(nextService);
    }
  };

  const activeServiceIndex = useMemo(() => {
    if (!activeService) return -1;
    return SERVICES_LIST.findIndex((s) => s.id === activeService.id);
  }, [activeService]);

  // Filter services by search and category
  const filteredServices = useMemo(() => {
    return SERVICES_LIST.filter((service) => {
      const matchesCategory =
        selectedCategory === 'all' || service.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const isFounderQuery = 
        q.includes('fondateur') || 
        q.includes('secretaire') || 
        q.includes('secrétaire') || 
        q.includes('general') || 
        q.includes('général') || 
        q.includes('reserve') || 
        q.includes('réservé');

      const matchesSearch =
        !q ||
        service.title.toLowerCase().includes(q) ||
        service.code.toLowerCase().includes(q) ||
        service.anchor.toLowerCase().includes(q) ||
        service.shortDesc.toLowerCase().includes(q) ||
        service.tagline.toLowerCase().includes(q) ||
        service.legalBasis.toLowerCase().includes(q) ||
        // Si l'utilisateur cherche le fondateur / secrétaire général, faire ressortir les services clés associés (S01, S03, S08, S10)
        (isFounderQuery && (service.id === 's01' || service.id === 's03' || service.id === 's08' || service.id === 's10'));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopyHubUrl = async () => {
    const fullUrl = window.location.origin + window.location.pathname;
    const success = await copyToClipboard(fullUrl);
    if (success) {
      setCopiedHub(true);
      setTimeout(() => setCopiedHub(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-amber-500/20 selection:text-amber-300">
      {/* Header with full identity and search bar */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onOpenAttestation={() => setIsAttestationOpen(true)}
        onOpenGlobalInventory={() => setIsGlobalInventoryOpen(true)}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        onOpenInternationalBilling={() => setIsInternationalBillingOpen(true)}
        onOpenArganeSekyat={() => setIsArganeSekyatOpen(true)}
        onOpenLogueVideo={() => {
          setIsLogueVideoOpen(true);
          const el = document.getElementById('logue-video-section');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
        onOpenFounderMasterAccess={() => setIsFounderMasterAccessOpen(true)}
        onCopyHubUrl={handleCopyHubUrl}
        copiedHub={copiedHub}
        totalServicesCount={SERVICES_LIST.length}
        filteredCount={filteredServices.length}
      />

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Quick Deep Link Anchor Strip */}
        <section aria-label="Ancres de deep linking" className="overflow-hidden">
          <div className="flex items-center gap-2 mb-2.5 text-xs text-slate-400 font-mono">
            <Hash className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold uppercase tracking-wider">
              Ancres Deep Linking Directes (15 Services & Console IA) :
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {/* Quick button to launch Founder Master Access Console */}
            <button
              onClick={() => setIsFounderMasterAccessOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold whitespace-nowrap bg-gradient-to-r from-amber-950 via-slate-900 to-amber-900/80 hover:from-amber-900 hover:to-amber-800 border-2 border-amber-400/90 text-amber-200 shadow-md transition-all cursor-pointer mr-1 animate-pulse hover:animate-none"
              title="Ouvrir la Console Maître Fondateur : Accès Plein Pouvoir sur l'ENSEMBLE des 15 Services & Workbenches"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>#espace-fondateur (15 Services)</span>
            </button>

            {/* Quick button to launch Logue Vidéo (beIN Sports 2026 Cadrage) */}
            <button
              onClick={() => {
                setIsLogueVideoOpen(true);
                const el = document.getElementById('logue-video-section');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold whitespace-nowrap bg-rose-950/90 hover:bg-rose-900 border border-rose-500/80 text-rose-200 shadow-sm transition-all cursor-pointer mr-1"
              title="Accéder au Studio Logue Vidéo : Cadrage TV beIN SPORTS 2026, Kokises & Publications"
            >
              <Tv className="w-3.5 h-3.5 text-rose-400" />
              <span>#logue-video (beIN 2026)</span>
            </button>

            {/* Quick button to open Morchidi Digital (18 Bureaux des méthodes) */}
            <button
              onClick={() => { setIsMorchidiDigitalOpen(true); setAnchorInUrl('morchidi-digital'); }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold whitespace-nowrap bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-500/70 text-emerald-200 shadow-sm transition-all cursor-pointer mr-1"
              title="Ouvrir Morchidi Digital : tableau de bord unifié, 18 Bureaux des méthodes, AGENT_SYNC"
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>#morchidi-digital (18 Bureaux)</span>
            </button>

            {/* Quick button to open Dossier d'apport (état d'avancement) */}
            <button
              onClick={() => { setIsDossierApportOpen(true); setAnchorInUrl('apport'); }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold whitespace-nowrap bg-amber-950/90 hover:bg-amber-900 border border-amber-500/70 text-amber-200 shadow-sm transition-all cursor-pointer mr-1"
              title="Dossier d'apport en nature : état d'avancement, chronologie, méthode, demande du dossier"
            >
              <FolderCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>#apport (Dossier commissaire)</span>
            </button>

            {/* Quick button to open « Aux sources d'inspiration » */}
            <button
              onClick={() => { setIsSourcesOpen(true); setAnchorInUrl('sources-inspiration'); }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold whitespace-nowrap bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-500/70 text-emerald-200 shadow-sm transition-all cursor-pointer mr-1"
              title="Accès réservé : Aux sources d'inspiration — orientation vers le guichet compétent, dépôt de situation, agent"
            >
              <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
              <span>#sources-inspiration</span>
            </button>

            {/* Quick button to launch Argane-Sekyat V2 */}
            <button
              onClick={() => setIsArganeSekyatOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold whitespace-nowrap bg-purple-950/90 hover:bg-purple-900 border border-purple-500/70 text-purple-200 shadow-sm transition-all cursor-pointer mr-1"
              title="Ouvrir la Console Argane-Sekyat V2 (Chat-To-Chat & Consultation)"
            >
              <Bot className="w-3.5 h-3.5 text-purple-400" />
              <span>#argane-sekyat (Chat-To-Chat V2)</span>
            </button>

            {SERVICES_LIST.map((s) => {
              const isCurrent = activeService?.id === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.anchor}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelectService(s);
                  }}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition-all border ${
                    isCurrent
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-sm'
                      : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="text-amber-400/90 font-bold">{s.code}</span>
                  <span>#{s.anchor}</span>
                </a>
              );
            })}
          </div>
        </section>

        {/* Legal Ecosystem Overview Cards */}
        <section aria-label="Piliers du portail" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3.5">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Valeur d'Apport Probatoire</span>
              <strong className="text-base text-amber-300 font-mono font-bold">
                {LEGAL_IDENTITY.certifiedContribution}
              </strong>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {LEGAL_IDENTITY.statutValeurApport}.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Immatriculation Fiscale & Légale</span>
              <strong className="text-base text-slate-200 font-mono font-bold">
                ICE {LEGAL_IDENTITY.iceNumber}
              </strong>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Conformité stricte au Droit Positif et au D.O.C marocain.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Gouvernance & Internet Society</span>
              <strong className="text-base text-cyan-300 font-mono font-bold">
                {LEGAL_IDENTITY.isocNumber}
              </strong>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Accréditation professionnelle • Standards d'intégrité numérique.
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* ÉCOSYSTÈME DÉPLOYÉ : LES 8 PÔLES & SITES (morchidit.morchidi.digital) */}
        {/* ==================================================================== */}
        <section id="ecosysteme-poles" aria-label="Les 8 Pôles Déployés et Configuration DNS" className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-amber-500/30 shadow-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Globe className="w-4 h-4 text-sky-400" />
                <h2 className="text-base sm:text-lg font-bold text-white font-['Cinzel',serif] tracking-wide">
                  Écosystème Déployé : Les 8 Pôles & Services Réunis
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-800">
                  morchidit.morchidi.digital
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Google Cloud Run
                </span>
              </div>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Chaque pôle possède son ancre de deep linking et son service dédié. Tous les sites sont destinés à être servis sur le domaine officiel en cours de configuration DNS sur <strong>Namecheap</strong> et <strong>Cloudflare</strong>.
              </p>
            </div>

            {/* Quick Mobile & Tablet Select Dropdown & DNS Guide Button */}
            <div className="flex items-center gap-2 self-start md:self-center shrink-0 w-full sm:w-auto">
              <div className="xl:hidden flex-1 sm:flex-initial">
                <select
                  aria-label="Sélection rapide de pôle ou site"
                  value={activeSiteId}
                  onChange={(e) => {
                    const found = ECOSYSTEM_SITES_LIST.find((s) => s.id === e.target.value);
                    if (found) {
                      setActiveSiteId(found.id);
                      setAnchorInUrl(found.hash.replace('#', ''));
                      const el = document.getElementById(found.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  className="w-full sm:w-auto bg-slate-900 text-amber-300 font-bold text-xs py-2 px-3 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  {ECOSYSTEM_SITES_LIST.map((site) => (
                    <option key={site.id} value={site.id}>
                      {site.siteNumber} {site.name} {site.nameAr && `(${site.nameAr})`}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setIsShareModalOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all shrink-0 cursor-pointer"
                title="Consulter le guide DNS pas-à-pas (Namecheap + Cloudflare) et les liens directs"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Guide DNS & Pôles</span>
              </button>
            </div>
          </div>

          {/* Horizontal Tabs Showcase for all 8 sites */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {ECOSYSTEM_SITES_LIST.map((site) => {
              const isSelected = activeSiteId === site.id;
              const isAcademie = site.id === 'site-6';
              return (
                <button
                  key={site.id}
                  onClick={() => {
                    setActiveSiteId(site.id);
                    setAnchorInUrl(site.hash.replace('#', ''));
                    const el = document.getElementById(site.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md ring-1 ring-amber-400/30'
                      : isAcademie
                      ? 'bg-sky-950/40 hover:bg-sky-900/60 border-sky-700/60 text-sky-200'
                      : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {getSiteIconComponent(site.iconName)}
                  <span>{site.name}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-950 text-slate-400">
                    {site.hash}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 8 Sites Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {ECOSYSTEM_SITES_LIST.map((site) => {
              const isCopied = copiedSiteId === site.id;
              const isHighlighted = activeSiteId === site.id;
              const isAcademie = site.id === 'site-6';
              return (
                <div
                  key={site.id}
                  id={site.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                    isHighlighted
                      ? 'bg-slate-900 border-amber-400 shadow-lg shadow-amber-950/30 ring-1 ring-amber-400/40'
                      : isAcademie
                      ? 'bg-gradient-to-b from-sky-950/40 via-slate-900/90 to-slate-900 border-sky-500/60 shadow-md'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
                          {getSiteIconComponent(site.iconName)}
                        </div>
                        <div className="truncate">
                          <span className="text-[10px] font-mono text-amber-400 font-bold block">
                            {site.siteNumber}
                          </span>
                          <h3 className="font-bold text-xs sm:text-sm text-white truncate">
                            {site.name}
                          </h3>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-emerald-400 border border-emerald-800/40 font-bold shrink-0">
                        {site.hash}
                      </span>
                    </div>

                    {site.nameAr && (
                      <p className="text-[11px] text-amber-200/80 font-mono mb-1 text-right">
                        {site.nameAr}
                      </p>
                    )}

                    <p className="text-[11px] font-semibold text-amber-300/90 mb-1 leading-snug">
                      {site.tagline}
                    </p>
                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                      {site.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-1.5 text-xs">
                    <button
                      onClick={() => handleCopySiteLink(site.hash, site.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[11px] cursor-pointer"
                      title="Copier le lien direct avec ancre sur ce serveur actif"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? 'Copié' : 'Lien'}</span>
                    </button>

                    <a
                      href={site.hash}
                      onClick={() => {
                        setActiveSiteId(site.id);
                        setAnchorInUrl(site.hash.replace('#', ''));
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-semibold cursor-pointer"
                      title="Naviguer vers ce pôle sur l'application active"
                    >
                      <span>Consulter</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==================================================================== */}
        {/* STRATÉGIE DE FACILITATION : "NE PAYEZ QUE LORSQUE VOUS GAGNEZ" (BNC) */}
        {/* ==================================================================== */}
        <section 
          id="facilite-bnc-pnud" 
          aria-label="Facilité Internationale BNC & Prise en Charge PNUD" 
          className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/40 shadow-xl space-y-4"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <DollarSign className="w-4 h-4" />
                </span>
                <h2 className="text-base sm:text-lg font-bold text-white font-['Cinzel',serif] tracking-wide">
                  Facilitation Internationale : « Ne Payez Que Lorsque Vous Gagnez »
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700 font-bold">
                  Domiciliation BNC (Canada)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-800">
                  Subventions PNUD & Bailleurs
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Passerelle de temporisation et de compensation : Pendant la phase de conception, le quota gratuit Google AI Studio maintient vos débours à <strong>0,00 MAD</strong>. Dès émission et règlement des factures de consulting <strong>BMM*</strong> par les bailleurs sur votre compte à la <strong>Banque Nationale du Canada</strong>, ce compte prend en charge l'infrastructure Cloud en mode <em>Pay-Per-Request</em>, appliquant strictement le <strong>Principe de Profusion</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
              <button
                onClick={() => setIsInternationalBillingOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Ouvrir la Facilité BNC / PNUD</span>
              </button>

              <button
                onClick={() => setIsGlobalInventoryOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all cursor-pointer"
                title="Consulter l'inventaire réel et la réserve pour le Commissariat aux apports"
              >
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Audit Build & Réserve (33h MOC)</span>
              </button>
            </div>
          </div>

          {/* Quick Pillars of Facilitation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <span className="text-[10px] text-slate-400 block uppercase">1. Forfait Développement</span>
              <strong className="text-emerald-400 text-sm">0,00 MAD Débours</strong>
              <p className="text-[11px] text-slate-500 font-sans mt-0.5">Quota gratuit Free Tier préservé</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <span className="text-[10px] text-slate-400 block uppercase">2. Facture Consulting BMM*</span>
              <strong className="text-white text-sm">$6 600 USD (66 000 MAD)</strong>
              <p className="text-[11px] text-slate-500 font-sans mt-0.5">Couverture PNUD & bailleurs</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <span className="text-[10px] text-slate-400 block uppercase">3. Domiciliation Devises</span>
              <strong className="text-sky-300 text-sm">BNC International</strong>
              <p className="text-[11px] text-slate-500 font-sans mt-0.5">Banque Nationale du Canada</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-amber-500/30">
              <span className="text-[10px] text-amber-400 block uppercase">4. Réserve Commissariat</span>
              <strong className="text-amber-300 text-sm">Lois 17-95 & 5-96</strong>
              <p className="text-[11px] text-slate-500 font-sans mt-0.5">Projets additionnels en instance</p>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* STUDIO LOGUE VIDÉO & CADRAGE SUBDIVISÉ beIN SPORTS (WORLD CUP 2026) */}
        {/* ==================================================================== */}
        <section id="logue-video-section" aria-label="Studio Logue Vidéo & Cadrage TV beIN SPORTS">
          <VideoLogueWorldCupStudio />
        </section>

        {/* 15 Services Grid */}
        <section aria-label="Grille des 15 services">
          {/* Bannière d'orientation rapide si recherche sur Fondateur / Secrétaire Général */}
          {searchQuery && (searchQuery.toLowerCase().includes('fondat') || searchQuery.toLowerCase().includes('secrét') || searchQuery.toLowerCase().includes('secre')) && (
            <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-amber-900/40 border-2 border-amber-400/80 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    Accès Réservé : Fondateur & Secrétaire Général (Mohamed MORCHID)
                  </h3>
                  <p className="text-xs text-amber-200/80 mt-0.5">
                    Console Maître Fondateur : Accédez à l'ensemble des 15 services, workbenches, note d'honoraires BMM* ($6 600 USD) et prise en charge Cloud :
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsFounderMasterAccessOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap self-stretch sm:self-auto justify-center"
              >
                <span>Ouvrir la Console Maître (15 Services)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white font-['Cinzel',serif] tracking-wide">
                Grille des 15 Services d'Ingénierie Juridique
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {filteredServices.length} {filteredServices.length > 1 ? 'services affichés' : 'service affiché'}
            </span>
          </div>

          {filteredServices.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
              <p className="text-sm text-slate-400">
                Aucun service ne correspond à votre recherche ou filtre actuel.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
              >
                Réinitialiser la recherche
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  isActiveAnchor={activeService?.id === service.id}
                  onOpenService={handleSelectService}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Interactive Service Detail & Workbench Modal */}
      <ServiceModal
        service={activeService}
        onClose={handleCloseServiceModal}
        onNavigateService={handleNavigateService}
        hasPrev={activeServiceIndex > 0}
        hasNext={activeServiceIndex >= 0 && activeServiceIndex < SERVICES_LIST.length - 1}
      />

      {/* Dossier d'Évaluation d'Apport en Nature (Bureau des méthodes Objectio) */}
      <AttestationModal
        isOpen={isAttestationOpen}
        onClose={() => setIsAttestationOpen(false)}
      />

      {/* Global Real Inventory & Creator Effort Modal (Multi-Project + MOC) */}
      <GlobalInventoryModal
        isOpen={isGlobalInventoryOpen}
        onClose={() => setIsGlobalInventoryOpen(false)}
      />

      {/* Multimodal 8 Poles & DNS Configuration Modal (Namecheap + Cloudflare) */}
      <ShareAppModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Morchidi Digital — Tableau de bord unifié (recyclage du tableau de bord autonome) */}
      <MorchidiDigitalModal
        isOpen={isMorchidiDigitalOpen}
        onClose={() => { setIsMorchidiDigitalOpen(false); setAnchorInUrl(''); }}
      />

      {/* Dossier d'apport — état d'avancement (#apport) */}
      <DossierApportModal
        isOpen={isDossierApportOpen}
        onClose={() => { setIsDossierApportOpen(false); setAnchorInUrl(''); }}
      />

      {/* Accès réservé : Aux sources d'inspiration (#sources-inspiration) */}
      <SourcesInspirationModal
        isOpen={isSourcesOpen}
        onClose={() => { setIsSourcesOpen(false); setAnchorInUrl(''); }}
      />

      {/* Mentions légales & données personnelles (#mentions-legales) */}
      <MentionsLegalesModal
        isOpen={isMentionsOpen}
        onClose={() => { setIsMentionsOpen(false); setAnchorInUrl(''); }}
      />

      {/* International Billing & BNC / PNUD Facilitation Modal */}
      <InternationalBillingModal
        isOpen={isInternationalBillingOpen}
        onClose={() => setIsInternationalBillingOpen(false)}
      />

      {/* Argane-Sekyat V2 Multi-Agents & Direct Consultation Modal */}
      <ArganeSekyatModal
        isOpen={isArganeSekyatOpen}
        onClose={() => setIsArganeSekyatOpen(false)}
      />

      {/* Console Maître Fondateur & Secrétaire Général : Plein Accès à TOUS les 15 Services */}
      <FounderMasterAccessModal
        isOpen={isFounderMasterAccessOpen}
        onClose={() => setIsFounderMasterAccessOpen(false)}
        onSelectService={(service) => {
          setActiveService(service);
        }}
        onOpenInternationalBilling={() => setIsInternationalBillingOpen(true)}
        onOpenArganeSekyat={() => setIsArganeSekyatOpen(true)}
        onOpenLogueVideo={() => {
          setIsLogueVideoOpen(true);
          const el = document.getElementById('logue-video-section');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
        onOpenAttestation={() => setIsAttestationOpen(true)}
        onOpenGlobalInventory={() => setIsGlobalInventoryOpen(true)}
        onOpenShareModal={() => setIsShareModalOpen(true)}
      />

      {/* Complete Legal Footer */}
      <Footer
        onOpenMentionsLegales={() => { setIsMentionsOpen(true); setAnchorInUrl('mentions-legales'); }}
        onSelectService={handleSelectService}
        onOpenAttestation={() => setIsAttestationOpen(true)}
        onOpenGlobalInventory={() => setIsGlobalInventoryOpen(true)}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        onOpenInternationalBilling={() => setIsInternationalBillingOpen(true)}
        onOpenArganeSekyat={() => setIsArganeSekyatOpen(true)}
        onOpenLogueVideo={() => {
          setIsLogueVideoOpen(true);
          const el = document.getElementById('logue-video-section');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
        onOpenFounderMasterAccess={() => setIsFounderMasterAccessOpen(true)}
      />
    </div>
  );
}
