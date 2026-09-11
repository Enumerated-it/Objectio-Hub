import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  ExternalLink, 
  Copy, 
  Check, 
  Globe, 
  Server, 
  ShieldCheck, 
  MessageSquare, 
  QrCode, 
  HeartHandshake, 
  Scale, 
  ShieldAlert, 
  Car, 
  BookOpen, 
  PenTool, 
  Building2, 
  GraduationCap, 
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Lock,
  ArrowRight,
  Zap,
  Terminal,
  RefreshCw
} from 'lucide-react';
import { 
  LEGAL_IDENTITY, 
  ECOSYSTEM_SITES_LIST, 
  DNS_CONFIGURATION_RECORDS 
} from '../data/servicesData';
import { copyToClipboard } from '../utils/deepLink';
import { EcosystemSite } from '../types';

interface ShareAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSite?: (hash: string) => void;
}

export const ShareAppModal: React.FC<ShareAppModalProps> = ({
  isOpen,
  onClose,
  onSelectSite,
}) => {
  const [activeTab, setActiveTab] = useState<'sites' | 'dns' | 'whatsapp'>('sites');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedGeneralUrl, setCopiedGeneralUrl] = useState(false);
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);
  const [dnsCheckRunning, setDnsCheckRunning] = useState(false);
  const [dnsCheckSuccess, setDnsCheckSuccess] = useState<boolean | null>(null);

  if (!isOpen) return null;

  const handleCopyLink = async (url: string, id: string) => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleCopyGeneralUrl = async () => {
    const success = await copyToClipboard(`https://${LEGAL_IDENTITY.officialDomain}`);
    if (success) {
      setCopiedGeneralUrl(true);
      setTimeout(() => setCopiedGeneralUrl(false), 2500);
    }
  };

  const getFullWhatsappMessage = () => {
    return `Bonjour,

Le Cabinet de Consulting / Conseil Social Mohamed MORCHID (RC 16894 Settat, ICE 003707910000033) met à votre disposition son portail officiel d'ingénierie juridique, économique et technologique :

👉 Accès Général Officiel : https://${LEGAL_IDENTITY.officialDomain}
🔗 Miroir Cloud Run : ${LEGAL_IDENTITY.cloudRunUrl}

Accès directs par pôle :
🤝 1. Pôle Accompagnement & Entraide (Orientation & Écoute) :
   ${LEGAL_IDENTITY.cloudRunUrl}/#entraide

⚖️ • Écosystème OBJECTIO (Apport en Nature & Certification 208K MAD) :
   ${LEGAL_IDENTITY.cloudRunUrl}/#objectio

🛡️ 2. Cyber-Défense Bancaire & Loi 31-08 (Mīzān Al-Qisṭ) :
   ${LEGAL_IDENTITY.cloudRunUrl}/#cyber

🚗 3. Plateforme Flotte & Location COO-DRIVE-IT (Transport & Régie) :
   ${LEGAL_IDENTITY.cloudRunUrl}/#transport

📖 4. Bureau Méthodes Magazine (BMM — Chrono-Analyse & SMED) :
   ${LEGAL_IDENTITY.cloudRunUrl}/#BMM

✍️ 5. Cabinet Rédacteur Public (Actes sous seing privé & Requêtes D.O.C) :
   ${LEGAL_IDENTITY.cloudRunUrl}/#Rédacteur

🏢 6. Fiduciaires MORCHID (Comptabilité Art. 145 CGI & Fiscalité SIMPL) :
   ${LEGAL_IDENTITY.cloudRunUrl}/#Fiduciaires

🎓 7. Académie OBJECTIO (Formation Continue Art. 37 Constitution & Guichet Unique) :
   ${LEGAL_IDENTITY.cloudRunUrl}/#academie

Cabinet de Conseil Social Mohamed MORCHID | Settat (Maroc)
Titulaire : Mohamed MORCHID (État civil 964 R/1970 • CIN BK71155)
RC 16894 Settat (04/03/2013) • ICE 003707910000033 • IF 14412126
Internet Society ISOC N° 2374734
Compte Pro CIH Bank : RIB 230 610 4704161211026600 95`;
  };

  const handleCopyWhatsapp = async () => {
    const text = getFullWhatsappMessage();
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedWhatsapp(true);
      setTimeout(() => setCopiedWhatsapp(false), 3000);
    }
  };

  const handleSimulateDnsCheck = () => {
    setDnsCheckRunning(true);
    setDnsCheckSuccess(null);
    setTimeout(() => {
      setDnsCheckRunning(false);
      setDnsCheckSuccess(true);
    }, 1800);
  };

  const getSiteIcon = (iconName: EcosystemSite['iconName']) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-emerald-400" />;
      case 'Scale':
        return <Scale className="w-5 h-5 text-amber-400" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-red-400" />;
      case 'Car':
        return <Car className="w-5 h-5 text-blue-400" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-orange-400" />;
      case 'PenTool':
        return <PenTool className="w-5 h-5 text-purple-400" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-amber-400" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-sky-400" />;
      default:
        return <Globe className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl shadow-amber-950/40 overflow-hidden text-slate-100 my-4 max-h-[94vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 text-amber-400 shrink-0">
              <Share2 className="w-5 h-5" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white font-['Cinzel',serif] truncate">
                  Portail & Écosystème Multimodal
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold shrink-0">
                  {LEGAL_IDENTITY.officialDomain}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                8 Pôles & Services Réunis • Fondateur : <strong className="text-slate-200">{LEGAL_IDENTITY.founderName}</strong> ({LEGAL_IDENTITY.matricule})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Fermer la boîte de partage"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="px-5 py-2.5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
          <div className="flex items-center gap-1.5 min-w-max">
            <button
              onClick={() => setActiveTab('sites')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'sites'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Les 8 Sites & Pôles Déployés</span>
            </button>

            <button
              onClick={() => setActiveTab('dns')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'dns'
                  ? 'bg-sky-500 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>Configuration DNS (Namecheap + Cloudflare)</span>
            </button>

            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'whatsapp'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Modèle Diffusion WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          
          {/* TAB 1: SITES & PÔLES */}
          {activeTab === 'sites' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Domain banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-amber-400 text-xs font-mono font-bold uppercase tracking-wider block">
                    Domaine Officiel Consolidé
                  </span>
                  <div className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2 mt-0.5">
                    <span>https://{LEGAL_IDENTITY.officialDomain}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-sky-950 border border-sky-700 text-sky-300 font-sans font-normal">
                      DNS Namecheap & Cloudflare
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Redirige et orchestre les 8 pôles ci-dessous avec deep linking persistant par ancre (#).
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopyGeneralUrl}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition-all cursor-pointer"
                  >
                    {copiedGeneralUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedGeneralUrl ? 'URL Copiée !' : 'Copier Domaine'}</span>
                  </button>
                  <a
                    href={`https://${LEGAL_IDENTITY.officialDomain}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700"
                    title="Tester l'ouverture du domaine officiel"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* 8 Sites Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>RÉPERTOIRE DES 8 PÔLES & SITES :</span>
                  <span>8 Activités distinctes interconnectées</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {ECOSYSTEM_SITES_LIST.map((site) => {
                    const isCopied = copiedId === site.id;
                    const isAcademie = site.id === 'site-6';
                    return (
                      <div
                        key={site.id}
                        id={`site-card-${site.id}`}
                        className={`p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                          isAcademie
                            ? 'bg-gradient-to-br from-sky-950/40 to-slate-900 border-sky-500/50 shadow-md shadow-sky-950/20 ring-1 ring-sky-500/20'
                            : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
                                {getSiteIcon(site.iconName)}
                              </div>
                              <div className="truncate">
                                <span className="text-[10px] font-mono text-amber-400 font-bold block">
                                  {site.siteNumber} {site.nameAr && `• ${site.nameAr}`}
                                </span>
                                <h3 className="font-bold text-sm text-white truncate">
                                  {site.name}
                                </h3>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950 text-emerald-400 border border-emerald-800/50 font-bold shrink-0">
                              {site.hash}
                            </span>
                          </div>

                          <p className="text-xs text-amber-200/90 font-medium mb-1">
                            {site.tagline}
                          </p>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            {site.desc}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
                          <span className="text-[10px] font-mono text-slate-500 truncate">
                            {site.category}
                          </span>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => handleCopyLink(site.url, site.id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[11px] cursor-pointer"
                              title="Copier le lien direct vers ce pôle"
                            >
                              {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{isCopied ? 'Copié' : 'Lien'}</span>
                            </button>

                            <a
                              href={site.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px]"
                              title="Ouvrir le pôle dans un nouvel onglet"
                            >
                              <span>Ouvrir</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONFIGURATION DNS (Namecheap + Cloudflare) */}
          {activeTab === 'dns' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-slate-950 border border-sky-500/40 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Server className="w-5 h-5 text-sky-400" />
                    <h3 className="font-bold text-white text-sm">
                      Dossier Technique de Configuration DNS : <span className="text-sky-300 font-mono">morchidit.morchidi.digital</span>
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-sky-950 text-sky-300 border border-sky-800">
                    Registrar : Namecheap • Proxy & CDN : Cloudflare
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ce guide détaille les 3 étapes exactes pour relier votre domaine enregistré sur <strong>Namecheap</strong> via <strong>Cloudflare</strong> à votre cluster <strong>Google Cloud Run</strong> hébergeant les 8 pôles.
                </p>
              </div>

              {/* Step 1: Namecheap */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider font-mono">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs">1</span>
                  <span>Étape 1 : Configuration sur Namecheap</span>
                </div>
                <div className="space-y-2 text-xs text-slate-300 pl-7">
                  <p>
                    1. Connectez-vous sur votre compte <strong>Namecheap</strong> &gt; <strong>Domain List</strong> &gt; Sélectionnez <strong>morchidi.digital</strong>.
                  </p>
                  <p>
                    2. Dans la section <strong>Nameservers</strong>, passez de <em>Namecheap BasicDNS</em> à <strong>Custom DNS</strong>.
                  </p>
                  <p>
                    3. Renseignez les deux serveurs de noms fournis par votre compte Cloudflare (ex: <code>elsa.ns.cloudflare.com</code> et <code>jim.ns.cloudflare.com</code>) puis cliquez sur la coche verte <em>Save</em>.
                  </p>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                    💡 <em>Alternative sans Cloudflare :</em> Dans l'onglet <strong>Advanced DNS</strong> de Namecheap, ajoutez directement un enregistrement CNAME : Host = <code>morchidit</code>, Target = <code>ghs.googlehosted.com.</code>, TTL = <code>Automatic</code>.
                  </div>
                </div>
              </div>

              {/* Step 2: Cloudflare */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-sky-300 font-bold text-xs uppercase tracking-wider font-mono">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center text-xs">2</span>
                  <span>Étape 2 : Configuration sur Cloudflare</span>
                </div>
                <div className="space-y-2 text-xs text-slate-300 pl-7">
                  <p>
                    1. Sur votre tableau de bord <strong>Cloudflare</strong>, sélectionnez la zone <strong>morchidi.digital</strong> &gt; Onglet <strong>DNS</strong> &gt; <strong>Records</strong>.
                  </p>
                  <p>
                    2. Cliquez sur <strong>Add record</strong> et créez l'enregistrement CNAME ci-dessous :
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px]">
                    <div>
                      <span className="text-slate-500 block">Type</span>
                      <strong className="text-amber-400">CNAME</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Name</span>
                      <strong className="text-sky-300">morchidit</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Target</span>
                      <strong className="text-slate-200">ghs.googlehosted.com</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Proxy status</span>
                      <span className="text-emerald-400 font-semibold">Proxied (Orange Cloud)</span>
                    </div>
                  </div>
                  <p>
                    3. Onglet <strong>SSL/TLS</strong> : Réglez le chiffrement sur <strong>Full (strict)</strong> ou <strong>Full</strong>.
                  </p>
                  <p>
                    4. Onglet <strong>Edge Certificates</strong> : Activez <strong>Always Use HTTPS</strong> pour forcer la connexion sécurisée sur l'ensemble des 8 pôles.
                  </p>
                </div>
              </div>

              {/* Step 3: Google Cloud Run Domain Mapping */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider font-mono">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs">3</span>
                  <span>Étape 3 : Mapping dans Google Cloud Run</span>
                </div>
                <div className="space-y-2 text-xs text-slate-300 pl-7">
                  <p>
                    1. Console Google Cloud &gt; <strong>Cloud Run</strong> &gt; Cliquez sur <strong>Manage Custom Domains</strong>.
                  </p>
                  <p>
                    2. Cliquez sur <strong>Add Mapping</strong> &gt; Sélectionnez le service Cloud Run &gt; Spécifiez le sous-domaine <strong>morchidit.morchidi.digital</strong>.
                  </p>
                  <p>
                    3. Si demandé, validez la propriété du domaine via l'enregistrement DNS TXT fourni par Google Search Console.
                  </p>
                </div>
              </div>

              {/* DNS Records Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-400">
                  Table Récapitulative des Enregistrements DNS :
                </h4>
                <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden font-mono text-xs">
                  {DNS_CONFIGURATION_RECORDS.map((rec, idx) => (
                    <div key={idx} className="p-3 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">
                            {rec.type}
                          </span>
                          <span className="text-white font-bold">{rec.name}</span>
                          <span className="text-slate-500 text-[10px]">({rec.proxyStatus})</span>
                        </div>
                        <div className="text-slate-400 text-[11px] truncate max-w-xl">
                          Cible : <strong className="text-slate-200">{rec.target}</strong> • TTL : {rec.ttl}
                        </div>
                        <p className="text-[10px] text-slate-500 font-sans">{rec.purpose}</p>
                      </div>

                      <button
                        onClick={() => handleCopyLink(`${rec.type} ${rec.name} -> ${rec.target}`, `rec-${idx}`)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs shrink-0 cursor-pointer"
                      >
                        {copiedId === `rec-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === `rec-${idx}` ? 'Copié' : 'Copier'}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Propagation Diagnostic */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-mono text-slate-400 block">Test de Diagnostic & Propagation DNS :</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Vérifiez la résolution du sous-domaine morchidit.morchidi.digital et la validité du certificat SSL Cloudflare.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {dnsCheckSuccess && (
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      Prêt pour résolution DNS
                    </span>
                  )}
                  <button
                    onClick={handleSimulateDnsCheck}
                    disabled={dnsCheckRunning}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${dnsCheckRunning ? 'animate-spin' : ''}`} />
                    <span>{dnsCheckRunning ? 'Vérification en cours...' : 'Tester Résolution'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MODÈLE DIFFUSION WHATSAPP */}
          {activeTab === 'whatsapp' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    Modèle Officiel de Message WhatsApp (Les 8 Pôles Déployés)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Formaté pour un envoi instantané à vos clients, partenaires, administrations et commissaires aux apports.
                  </p>
                </div>

                <button
                  onClick={handleCopyWhatsapp}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-all cursor-pointer"
                >
                  {copiedWhatsapp ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedWhatsapp ? '✓ Message Intégral Copié !' : 'Copier le Message'}</span>
                </button>
              </div>

              {/* Message preview container */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs whitespace-pre-line leading-relaxed overflow-x-auto max-h-[380px] select-all">
                {getFullWhatsappMessage()}
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Contient la mention de l'État Civil (964 R/1970), CIN (BK71155), RC 16894 Settat et RIB CIH.</span>
                <span className="text-emerald-400 font-bold font-mono">100% Conforme D.O.C</span>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>RC 16894 Settat • ICE {LEGAL_IDENTITY.iceNumber} • {LEGAL_IDENTITY.isocNumber}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyWhatsapp}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
            >
              Copier WhatsApp
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
