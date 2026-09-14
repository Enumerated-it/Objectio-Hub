import React, { useState, useEffect } from 'react';
import { 
  Tv, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Sparkles, 
  Cookie, 
  Megaphone, 
  Share2, 
  Layers, 
  Check, 
  ShieldCheck, 
  Award, 
  RefreshCw, 
  ExternalLink,
  Info,
  Clock,
  Radio,
  FileCheck,
  PlusCircle,
  Eye,
  Sliders,
  DollarSign
} from 'lucide-react';
import { LEGAL_IDENTITY } from '../data/servicesData';
import { copyToClipboard, getFullDeepLink } from '../utils/deepLink';

export interface AdSpot {
  id: string;
  type: 'propre' | 'autrui';
  sponsorName: string;
  category: string;
  tagline: string;
  callToAction: string;
  badge: string;
  bgColor: string;
  accentColor: string;
  targetLink: string;
  legalNotice: string;
  ratePerMatchMAD?: number;
}

export const INITIAL_AD_SPOTS: AdSpot[] = [
  // 1. Régie Propre (Écosystème Objectio)
  {
    id: 'ad-objectio-01',
    type: 'propre',
    sponsorName: 'OBJECTIO DROIT POSITIF',
    category: 'Régie Propre • Actif déclaré',
    tagline: 'Inventaire d\'Apport en Nature & Actes Opposables aux Tiers',
    callToAction: 'Consulter l\'Inventaire d\'Apport Analysé',
    badge: 'OFFICIEL BMM*',
    bgColor: 'from-amber-950/90 via-slate-900 to-amber-900/60',
    accentColor: 'text-amber-400 border-amber-500/60',
    targetLink: '#global-inventory',
    legalNotice: 'RC 16894 Settat • ICE 003707910000033 • Titulaire Mohamed MORCHID',
    ratePerMatchMAD: 0
  },
  {
    id: 'ad-cih-qr',
    type: 'propre',
    sponsorName: 'PASSERELLE PAIEMENT CIH',
    category: 'Régie Propre • Finance & QR',
    tagline: 'Règlement Instantané Sécurisé par QR Code Bancaire National',
    callToAction: 'Passerelle CIH Bank',
    badge: 'SCAN & PAY',
    bgColor: 'from-blue-950/90 via-slate-900 to-cyan-950/60',
    accentColor: 'text-cyan-400 border-cyan-500/60',
    targetLink: '#paiement-cih',
    legalNotice: 'Conforme réglementation Bank Al-Maghrib sur virements instantanés',
    ratePerMatchMAD: 0
  },
  // 2. Publication pour Autrui (Annonceurs Tiers & Partenaires)
  {
    id: 'ad-coo-drive',
    type: 'autrui',
    sponsorName: 'COO-DRIVE-IT MOBILITÉ',
    category: 'Publication pour Autrui • Flotte Partagée',
    tagline: 'Gestion Coopérative de Flottes, Taxis & Billetterie Touristique',
    callToAction: 'Réserver un Véhicule Vérifié',
    badge: 'ANNONCEUR DÉCLARÉ',
    bgColor: 'from-emerald-950/90 via-slate-900 to-teal-950/60',
    accentColor: 'text-emerald-400 border-emerald-500/60',
    targetLink: '#transport',
    legalNotice: 'Régie publicitaire Objectio • Contrat de diffusion N° REG-2026-08',
    ratePerMatchMAD: 1500
  },
  {
    id: 'ad-fiduciaire',
    type: 'autrui',
    sponsorName: 'FIDUCIAIRES MORCHID PARTENAIRES',
    category: 'Publication pour Autrui • Fiscalité SIMPL',
    tagline: 'Audit Comptable Art. 145 CGI & Télédéclarations Fiscale Garanti',
    callToAction: 'Déposer une Déclaration Fiscale',
    badge: 'ORDRE DES EXPERTS',
    bgColor: 'from-purple-950/90 via-slate-900 to-indigo-950/60',
    accentColor: 'text-purple-400 border-purple-500/60',
    targetLink: '#Fiduciaires',
    legalNotice: 'Campagne sponsorisée autorisée • Réf d\'accréditation ISOC N° 2374734',
    ratePerMatchMAD: 2200
  }
];

export const VideoLogueWorldCupStudio: React.FC = () => {
  // États de simulation Match TV beIN SPORTS Coupe du Monde 2026
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [matchTime, setMatchTime] = useState(67); // 67e minute
  const [matchStatus, setMatchStatus] = useState<'live_action' | 'arret_jeu' | 'var_check' | 'mi_temps'>('arret_jeu');
  const [activeAdIndex, setActiveAdIndex] = useState(0);
  const [splitScreenMode, setSplitScreenMode] = useState<'l_shape' | 'pip' | 'split_50_50'>('l_shape');
  const [cookieConsentStatus, setCookieConsentStatus] = useState<'pending' | 'accepted' | 'customized'>('accepted');
  const [showCookieDetails, setShowCookieDetails] = useState(false);
  const [activeAdFilter, setActiveAdFilter] = useState<'all' | 'propre' | 'autrui'>('all');
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Nouveau spot annonceur pour autrui (formulaire de publication)
  const [isNewAdFormOpen, setIsNewAdFormOpen] = useState(false);
  const [newSponsorName, setNewSponsorName] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newCta, setNewCta] = useState('');
  const [newBudget, setNewBudget] = useState('1800');

  const [adSpots, setAdSpots] = useState<AdSpot[]>(INITIAL_AD_SPOTS);

  // Rotation automatique des spots publicitaires toutes les 6 secondes en cas d'arrêt de jeu
  useEffect(() => {
    if (matchStatus !== 'live_action') {
      const interval = setInterval(() => {
        setActiveAdIndex((prev) => (prev + 1) % adSpots.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [matchStatus, adSpots.length]);

  // Incrémentation automatique du chrono de match
  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setMatchTime((prev) => (prev >= 90 ? 45 : prev + 1));
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [isPlaying]);

  const currentAd = adSpots[activeAdIndex] || adSpots[0];

  const handleCreateAdForThirdParty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSponsorName.trim() || !newTagline.trim()) return;

    const newSpot: AdSpot = {
      id: `ad-autrui-${Date.now()}`,
      type: 'autrui',
      sponsorName: newSponsorName.toUpperCase(),
      category: 'Publication pour Autrui • Contrat Partenaire',
      tagline: newTagline,
      callToAction: newCta || 'En savoir plus',
      badge: 'DIFFUSION ACTIVE',
      bgColor: 'from-amber-950/90 via-slate-900 to-rose-950/60',
      accentColor: 'text-rose-400 border-rose-500/60',
      targetLink: '#contact',
      legalNotice: `Facture de régie émise sous BMM* • Dépôt au compte BNC International • Montant: ${newBudget} MAD`,
      ratePerMatchMAD: parseInt(newBudget) || 1800
    };

    setAdSpots([newSpot, ...adSpots]);
    setActiveAdIndex(0);
    setNewSponsorName('');
    setNewTagline('');
    setNewCta('');
    setIsNewAdFormOpen(false);
  };

  const handleCopyDirectLink = async () => {
    const link = getFullDeepLink('logue-video');
    const success = await copyToClipboard(link);
    if (success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const filteredSpots = adSpots.filter((s) => {
    if (activeAdFilter === 'all') return true;
    return s.type === activeAdFilter;
  });

  return (
    <div id="logue-video-studio" className="rounded-2xl bg-slate-900 border-2 border-slate-700/80 shadow-2xl overflow-hidden text-slate-100">
      {/* En-tête officiel du Studio Logue Vidéo & Cadrage TV */}
      <div className="px-5 sm:px-6 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-inner">
            <Tv className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                LOGUE VIDÉO • CADRAGE TV BROADCAST
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Inspiration beIN SPORTS • World Cup 2026 USA
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
              Cadrage Subdivisé lors des Arrêts de Jeu : Kokises & Régie Publique (Propre & Autrui)
            </h2>
          </div>
        </div>

        {/* Boutons d'actions rapides */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleCopyDirectLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 transition-colors cursor-pointer"
            title="Copier le lien direct vers le studio vidéo"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-slate-400" />}
            <span className="font-mono">{copiedLink ? 'Lien copié' : '#logue-video'}</span>
          </button>

          <button
            onClick={() => setIsNewAdFormOpen(!isNewAdFormOpen)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Publier pour Autrui</span>
          </button>
        </div>
      </div>

      {/* Barre de pilotage de la simulation Télévision */}
      <div className="px-5 py-2.5 bg-slate-950/90 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        {/* Statut du match simulé */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">
            <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <span className="text-slate-300 font-bold">FIFA WORLD CUP 2026 USA</span>
            <span className="text-amber-400 font-bold">USA 1 - 1 MAR</span>
            <span className="text-slate-400">({matchTime}')</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Phase du direct :</span>
            {(['arret_jeu', 'live_action', 'var_check', 'mi_temps'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setMatchStatus(status)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                  matchStatus === status
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                {status === 'arret_jeu' && '⏱️ Arrêt de Jeu (Pubs on)'}
                {status === 'live_action' && '⚽ Plein Jeu'}
                {status === 'var_check' && '🖥️ Check VAR'}
                {status === 'mi_temps' && '⏸️ Mi-Temps'}
              </button>
            ))}
          </div>
        </div>

        {/* Sélection du gabarit de cadrage (L-Shape style beIN SPORTS) */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Format Cadrage :</span>
          <button
            onClick={() => setSplitScreenMode('l_shape')}
            className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer ${
              splitScreenMode === 'l_shape'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/60'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Format Cadre en L beIN Sports : Terrain réduit + Volet Pub latéral + Bandeau Bas Kokises"
          >
            Cadre en L (beIN 2026)
          </button>
          <button
            onClick={() => setSplitScreenMode('pip')}
            className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer ${
              splitScreenMode === 'pip'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/60'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Image dans l'image (Picture-in-Picture)"
          >
            Incrustation PiP
          </button>
          <button
            onClick={() => setSplitScreenMode('split_50_50')}
            className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer ${
              splitScreenMode === 'split_50_50'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/60'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Écran scindé 50/50"
          >
            Split 50/50
          </button>
        </div>
      </div>

      {/* FORMULAIRE D'OUVERTURE : PUBLICATION POUR AUTRUI */}
      {isNewAdFormOpen && (
        <div className="p-5 bg-gradient-to-r from-purple-950/80 via-slate-900 to-slate-950 border-b border-purple-500/50 animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white">
                Régie Publicitaire : Déposer une Publication Commerciale pour Autrui
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-700">
                Facturation BMM* adossée BNC
              </span>
            </div>
            <button
              onClick={() => setIsNewAdFormOpen(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Fermer
            </button>
          </div>

          <form onSubmit={handleCreateAdForThirdParty} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Nom de l'Annonceur / Marque</label>
              <input
                type="text"
                required
                placeholder="Ex: AGENCE ATLAS VOYAGES"
                value={newSponsorName}
                onChange={(e) => setNewSponsorName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:border-purple-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-400 mb-1 font-semibold">Message / Slogan Publicitaire (Bandeau)</label>
              <input
                type="text"
                required
                placeholder="Ex: Réservez votre vol direct Casablanca - New York pour les 8es de finale !"
                value={newTagline}
                onChange={(e) => setNewTagline(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Forfait Diffusion MAD</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-amber-300 font-mono font-bold"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold whitespace-nowrap cursor-pointer"
                >
                  Diffuser
                </button>
              </div>
            </div>
          </form>
          <p className="text-[11px] text-slate-400 font-mono mt-2">
            ℹ️ Les publications pour autrui font l'objet d'un contrat de régie publicitaire conforme au D.O.C et sont intégrées dans le cadre subdivisé avec mention d'identification légale.
          </p>
        </div>
      )}

      {/* ÉCRAN DE DIFFUSION VIDÉO PRINCIPAL (AVEC LE CADRAGE SUBDIVISÉ beIN SPORTS 2026) */}
      <div className="relative bg-black min-h-[460px] lg:min-h-[520px] p-3 sm:p-5 flex flex-col justify-between overflow-hidden select-none">
        {/* Watermark / Enseigne Broadcast beIN SPORTS 2026 HD */}
        <div className="absolute top-4 left-4 z-30 flex items-center gap-2 pointer-events-none">
          <div className="px-2.5 py-1 rounded bg-purple-950/90 border border-purple-500/80 text-white font-black font-mono tracking-tighter text-xs shadow-lg flex items-center gap-1.5">
            <span className="text-purple-400">beIN</span>
            <span className="text-amber-400">SPORTS</span>
            <span className="text-[9px] bg-red-600 px-1 rounded text-white font-bold">1 HD</span>
          </div>
          <div className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-slate-800 text-[10px] font-mono text-slate-300">
            FIFA WORLD CUP USA 2026 • METLIFE STADIUM (NJ/NY)
          </div>
        </div>

        {/* CADRAGE SUBDIVISÉ DYNAMIQUE SELON LE MODE ET L'ARRÊT DE JEU */}
        <div className="relative w-full h-full my-auto flex-1 flex flex-col lg:flex-row gap-3 pt-8 pb-2">
          {/* FENÊTRE 1 : FLUX VIDÉO DU MATCH (RÉDUIT EN LORS D'UN ARRÊT DE JEU) */}
          <div 
            className={`relative rounded-xl overflow-hidden border transition-all duration-500 flex flex-col justify-between bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-900 shadow-2xl ${
              matchStatus === 'live_action'
                ? 'w-full h-full min-h-[380px] border-slate-700'
                : splitScreenMode === 'l_shape'
                ? 'w-full lg:w-[68%] min-h-[320px] border-amber-500/40'
                : splitScreenMode === 'split_50_50'
                ? 'w-full lg:w-1/2 min-h-[320px] border-sky-500/40'
                : 'w-full h-full min-h-[380px] border-slate-700'
            }`}
          >
            {/* Simulation de terrain et action sportive */}
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            {/* Overlay Graphique de Score Coupe du Monde */}
            <div className="relative z-10 p-3 flex items-start justify-between">
              <div className="bg-slate-950/85 backdrop-blur-md border border-slate-800 rounded-lg p-2 font-mono text-xs flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="font-bold text-white">LIVE</span>
                </div>
                <div className="h-3 w-px bg-slate-700"></div>
                <div className="font-bold text-slate-200">MAR 1 - 1 USA</div>
                <div className="text-amber-400 font-bold">{matchTime}:24</div>
              </div>

              {matchStatus !== 'live_action' && (
                <div className="px-3 py-1 rounded-full bg-rose-600/90 text-white text-[11px] font-mono font-bold shadow-lg flex items-center gap-1.5 animate-pulse">
                  <Clock className="w-3.5 h-3.5" />
                  <span>ARRÊT DE JEU EN COURS • CADRAGE MULTI-ÉCRAN ACTIF</span>
                </div>
              )}
            </div>

            {/* Scène simulée du match avec joueur et ballon */}
            <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center my-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <Radio className="w-8 h-8 text-emerald-400 animate-pulse" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white tracking-wide">
                {matchStatus === 'arret_jeu' && 'Touche / Soins Médicaux sur le terrain'}
                {matchStatus === 'live_action' && 'Attaque Placée • Phase de Jeu Rapide'}
                {matchStatus === 'var_check' && 'Arbitrage Vidéo : Contrôle Hors-Jeu'}
                {matchStatus === 'mi_temps' && 'Fin de Première Période • Vestiaires'}
              </h4>
              <p className="text-xs text-slate-300 max-w-md mt-1">
                {matchStatus !== 'live_action' 
                  ? 'Le diffuseur beIN SPORTS active le gabarit subdivisé : la caméra continue le direct tandis que le cadre publicitaire s\'ouvre.'
                  : 'Plein écran direct. Cliquez sur "Arrêt de Jeu" pour simuler l\'activation de la régie publicitaire.'}
              </p>
            </div>

            {/* Barre de contrôle du lecteur vidéo */}
            <div className="relative z-10 p-3 bg-slate-950/80 backdrop-blur-md border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                  title={isMuted ? 'Activer le son' : 'Couper le son'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="font-mono text-[11px] hidden sm:inline">Flux 1080p60 • Ultra-Faible Latence</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  RÉGIE SUBDIVISÉE ACTIVE
                </span>
              </div>
            </div>
          </div>

          {/* FENÊTRE 2 : LE CADRAGE SUBDIVISÉ POUR LES PUBLICITÉS (STYLE beIN SPORTS 2026) */}
          {matchStatus !== 'live_action' && (
            <div 
              className={`rounded-xl overflow-hidden border flex flex-col justify-between transition-all duration-500 shadow-2xl bg-gradient-to-b ${currentAd.bgColor} ${
                splitScreenMode === 'l_shape'
                  ? 'w-full lg:w-[32%] border-amber-500/60'
                  : splitScreenMode === 'split_50_50'
                  ? 'w-full lg:w-1/2 border-sky-500/60'
                  : 'w-full lg:w-[35%] border-purple-500/60'
              }`}
            >
              {/* En-tête du volet Publicité Broadcast */}
              <div className="p-3.5 border-b border-slate-800/80 bg-slate-950/70 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${currentAd.accentColor}`}>
                    {currentAd.badge}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-300 truncate">
                    {currentAd.type === 'propre' ? '📢 Régie Propre' : '🤝 Pour Autrui'}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                  <span>Spot {activeAdIndex + 1}/{adSpots.length}</span>
                </span>
              </div>

              {/* Contenu de l'Annonce (Propre ou pour Autrui) */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center space-y-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                    {currentAd.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-white font-['Cinzel',serif] leading-tight">
                    {currentAd.sponsorName}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans font-medium">
                  « {currentAd.tagline} »
                </p>

                <div className="pt-2">
                  <a
                    href={currentAd.targetLink}
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs shadow-lg transition-all cursor-pointer"
                  >
                    <span>{currentAd.callToAction}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Cadre légal et mention probatoire */}
                <div className="pt-2 border-t border-slate-800/80">
                  <div className="text-[10px] font-mono text-slate-400 leading-tight">
                    ⚖️ {currentAd.legalNotice}
                  </div>
                  {currentAd.type === 'autrui' && currentAd.ratePerMatchMAD && currentAd.ratePerMatchMAD > 0 && (
                    <div className="mt-1 flex items-center justify-between text-[10px] font-mono text-emerald-400">
                      <span>Rémunération Régie Réglementée :</span>
                      <strong className="text-emerald-300">{currentAd.ratePerMatchMAD} MAD / match</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation manuelle entre les spots publicitaires */}
              <div className="p-2.5 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <div className="flex gap-1">
                  {adSpots.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveAdIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                        idx === activeAdIndex ? 'bg-amber-400 scale-125' : 'bg-slate-700 hover:bg-slate-500'
                      }`}
                      title={`Spot N° ${idx + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setActiveAdIndex((prev) => (prev + 1) % adSpots.length)}
                  className="flex items-center gap-1 text-slate-300 hover:text-amber-400 cursor-pointer"
                >
                  <span>Suivant</span>
                  <RefreshCw className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* BANDEAU INFÉRIEUR (FOOTER BROADCAST) : DÉFILEMENT DES KOKISES & MENTIONS LÉGALES */}
        <div className="relative z-20 mt-2 p-2.5 rounded-xl bg-slate-950/95 border border-slate-800 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs font-mono">
          {/* Défileur Ticker Style beIN SPORTS */}
          <div className="flex items-center gap-2 overflow-hidden flex-1 w-full">
            <div className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold shrink-0 flex items-center gap-1">
              <Cookie className="w-3 h-3 text-amber-400" />
              <span>KOKISES & CONFORMITÉ CNDP</span>
            </div>

            <div className="overflow-hidden whitespace-nowrap text-[11px] text-slate-300 flex-1">
              <span className="inline-block animate-marquee">
                🍪 <strong>Kokises d'audience & personnalisation d'annonces :</strong> Respect strict de la Loi 09-08 (CNDP) • Aucune revente de données sans consentement • 
                Régie Publicitaire Objectio Hub agréée BMM* • Titulaire légal : Mohamed MORCHID (Cabinet de Conseil Social) • Publication pour compte de tiers active • 
                Facturation internationale adossée à la Banque Nationale du Canada (Compte BNC).
              </span>
            </div>
          </div>

          {/* Boutons d'interaction Kokises & Consentement */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <button
              onClick={() => setShowCookieDetails(!showCookieDetails)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] transition-colors cursor-pointer flex items-center gap-1"
            >
              <Info className="w-3 h-3 text-cyan-400" />
              <span>Détail Kokises</span>
            </button>

            <button
              onClick={() => setCookieConsentStatus(cookieConsentStatus === 'accepted' ? 'customized' : 'accepted')}
              className={`px-3 py-1 rounded text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                cookieConsentStatus === 'accepted'
                  ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                  : 'bg-amber-600 text-white hover:bg-amber-500'
              }`}
            >
              <Check className="w-3 h-3" />
              <span>{cookieConsentStatus === 'accepted' ? 'Kokises Acceptés' : 'Personnaliser'}</span>
            </button>
          </div>
        </div>

        {/* Panneau dépliable d'explication des Kokises */}
        {showCookieDetails && (
          <div className="relative z-20 mt-2 p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-sans text-slate-200 animate-in fade-in duration-200 space-y-2">
            <div className="flex items-center justify-between font-mono font-bold text-amber-300 text-xs">
              <span className="flex items-center gap-1.5">
                <Cookie className="w-4 h-4 text-amber-400" />
                Politique Kokises & Régie Publicitaire (Art. 09-08 CNDP & D.O.C)
              </span>
              <button onClick={() => setShowCookieDetails(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Le cadrage subdivisé télévisé intègre la traçabilité des <strong>« kokises » techniques et publicitaires</strong> pour permettre la diffusion équilibrée entre les annonces en <em>Régie Propre</em> (services Objectio, inventaire d'apport analysé, QR CIH) et les <em>Publications pour Autrui</em> (entreprises partenaires, sponsors agrées).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-[10px]">
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-amber-400 font-bold block">1. Kokises Essentiels</span>
                <span className="text-slate-400">Deep linking persistant (#anchors) et navigation des 15 services.</span>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-emerald-400 font-bold block">2. Kokises de Mesure Régie</span>
                <span className="text-slate-400">Comptabilisation des impressions lors des arrêts de jeu pour autrui.</span>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-cyan-400 font-bold block">3. Kokises de Sécurité</span>
                <span className="text-slate-400">Garantie d'intégrité probatoire des actes et reçus de paiement QR.</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CATALOGUE DES ANNONCES & GESTION DE LA RÉGIE POUR AUTRUI */}
      <div className="p-5 bg-slate-950 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              Gestionnaire de la Régie Publicitaire : Annonces Propres & Mandats pour Autrui
            </h3>
            <p className="text-xs text-slate-400">
              Pilotez les spots qui s'affichent automatiquement dans le cadre subdivisé lors des arrêts du match.
            </p>
          </div>

          {/* Filtres de la régie */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveAdFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                activeAdFilter === 'all'
                  ? 'bg-slate-700 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              Tous ({adSpots.length})
            </button>
            <button
              onClick={() => setActiveAdFilter('propre')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                activeAdFilter === 'propre'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              Régie Propre ({adSpots.filter((s) => s.type === 'propre').length})
            </button>
            <button
              onClick={() => setActiveAdFilter('autrui')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                activeAdFilter === 'autrui'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              Pour Autrui ({adSpots.filter((s) => s.type === 'autrui').length})
            </button>
          </div>
        </div>

        {/* Grille des cartes publicitaires */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredSpots.map((spot, idx) => (
            <div
              key={spot.id}
              onClick={() => setActiveAdIndex(adSpots.findIndex((s) => s.id === spot.id))}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                adSpots[activeAdIndex]?.id === spot.id
                  ? 'bg-slate-900 border-amber-400 shadow-md ring-1 ring-amber-400/40'
                  : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                  <span className={`px-2 py-0.5 rounded uppercase font-bold border ${spot.accentColor}`}>
                    {spot.badge}
                  </span>
                  <span className="text-slate-500">
                    {spot.type === 'propre' ? 'Régie Propre' : 'Pour Autrui'}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white truncate mb-1">
                  {spot.sponsorName}
                </h4>
                <p className="text-[11px] text-slate-300 line-clamp-2 leading-snug">
                  {spot.tagline}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                <span className="text-amber-400 font-semibold truncate">
                  {spot.callToAction}
                </span>
                <span className="text-slate-400">
                  {spot.ratePerMatchMAD ? `${spot.ratePerMatchMAD} MAD` : 'Interne'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Synthèse Doctrinale & Réglementaire */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-slate-300">
              <strong className="text-white">Cadre Légal d'Exploitation :</strong> L'exercice de la fonction « Publication pour Autrui » et la régie propre respectent les règles de transparence commerciale du D.O.C, de la Loi 31-08 (protection du consommateur) et l'article 37 de la Constitution marocaine.
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 font-mono text-[11px] text-slate-400">
            <span>Régie BMM*</span>
            <span>•</span>
            <span className="text-amber-400">RC 16894 Settat</span>
          </div>
        </div>
      </div>
    </div>
  );
};
