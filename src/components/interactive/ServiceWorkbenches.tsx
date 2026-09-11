import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  FileText, 
  Check, 
  Copy, 
  Download, 
  Calculator, 
  QrCode, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Key, 
  Award, 
  DollarSign, 
  Sparkles, 
  Ear, 
  HelpCircle, 
  Sliders, 
  ListOrdered, 
  Send,
  Eye,
  RefreshCw,
  Clock,
  Target,
  PieChart,
  BarChart3,
  Layers,
  Globe2,
  Landmark,
  Calendar,
  ArrowUpRight,
  Activity
} from 'lucide-react';
import { ServiceItem, BusinessPlanMilestone } from '../../types';
import { 
  LEGAL_IDENTITY, 
  INVENTAIRE_REEL_APPORT, 
  OBJ_VALEUR_APPORT_NATURE, 
  RAPPORT_INVENTAIRE_PERIODE,
  BUSINESS_PLAN_PROJECTIONS,
  BUSINESS_PLAN_TRACKING_MILESTONES,
  INTERNATIONAL_INVOICE_DEFAULT,
  BNC_ACCOUNT_DATA
} from '../../data/servicesData';
import { copyToClipboard } from '../../utils/deepLink';

interface WorkbenchProps {
  service: ServiceItem;
}

// S01: PV / Certification
export const PvCertifWorkbench: React.FC = () => {
  const [pvType, setPvType] = useState('AGO (Ordinaire)');
  const [entityName, setEntityName] = useState('Société Écosystème Objectio');
  const [quorum, setQuorum] = useState('87.5');
  const [date, setDate] = useState('2026-09-05');
  const [resolutions, setResolutions] = useState(
    `1. Approbation des comptes et quitus de gestion.\n2. Affectation du résultat d'exploitation.\n3. Ratification de la valeur d'apport issue de l'inventaire réel liée à ${LEGAL_IDENTITY.valeurApportVariable} (${LEGAL_IDENTITY.certifiedContribution}).`
  );
  const [copied, setCopied] = useState(false);

  const hashStamp = `CERT-OBJ-${pvType.slice(0, 3).toUpperCase()}-964R-${Math.abs(
    entityName.length * 7919 + parseInt(quorum || '0') * 13
  ).toString(16).toUpperCase()}`;

  const generatedPvText = `=====================================================
PROCES-VERBAL OFFICIEL • CERTIFICATION PROBATOIRE
ÉCOSYSTÈME OBJECTIO — PORTAIL DE DROIT POSITIF
=====================================================
Titulaire du Registre : ${LEGAL_IDENTITY.founderName} (${LEGAL_IDENTITY.matricule})
ICE : ${LEGAL_IDENTITY.iceNumber} | ${LEGAL_IDENTITY.isocNumber}
Valeur d'apport certifiée de référence : ${LEGAL_IDENTITY.certifiedContribution}

TYPE D'ACTE : ${pvType}
ENTITÉ CONCERNÉE : ${entityName}
DATE DE TENUE : ${date}
QUORUM CONSTATÉ : ${quorum}% des parts sociales

ORDRE DU JOUR & RÉSOLUTIONS :
${resolutions}

MENTION LÉGALE D'INTÉGRITÉ :
Conforme aux dispositions du Droit des Obligations et des Contrats (D.O.C) 
et aux règles de la Loi 53-05 sur l'échange électronique de données juridiques.

EMPREINTE PROBATOIRE : ${hashStamp}
STATUT : CERTIFIÉ & OPPOSABLE AUX TIERS
=====================================================`;

  const handleCopy = async () => {
    await copyToClipboard(generatedPvText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
            Type de Procès-Verbal
          </label>
          <select
            value={pvType}
            onChange={(e) => setPvType(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-slate-200 focus:border-amber-500"
          >
            <option>AGO (Assemblée Générale Ordinaire)</option>
            <option>AGE (Assemblée Générale Extraordinaire)</option>
            <option>Constat d'Accord d'Associés</option>
            <option>PV de Délibération de Gérance</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
            Entité ou Société
          </label>
          <input
            type="text"
            value={entityName}
            onChange={(e) => setEntityName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-slate-200 focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
            Date d'Audience / Assemblée
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-slate-200 focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
            Quorum Requis / Constaté (%)
          </label>
          <input
            type="number"
            value={quorum}
            onChange={(e) => setQuorum(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-slate-200 focus:border-amber-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
          Résolutions & Constatations
        </label>
        <textarea
          rows={3}
          value={resolutions}
          onChange={(e) => setResolutions(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-slate-200 focus:border-amber-500 font-mono text-xs"
        />
      </div>

      <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 font-mono text-xs space-y-2">
        <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
          <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <ShieldCheck className="w-4 h-4" /> Prévisualisation de l'Acte Certifié
          </span>
          <span className="text-[11px] text-emerald-400">Sceau Probatoire : {hashStamp}</span>
        </div>
        <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
          {generatedPvText}
        </pre>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'PV Copié dans le presse-papier' : 'Copier le PV Certifié'}
        </button>
      </div>
    </div>
  );
};

// S02: Rédaction Objectio
export const RedacWorkbench: React.FC = () => {
  const [docType, setDocType] = useState('Pacte d\'Associés');
  const [clauses, setClauses] = useState({
    reservePropriete: true,
    penale: true,
    arbitrage: true,
    confidentialite: true,
    nonConcurrence: false,
  });
  const [copied, setCopied] = useState(false);

  const toggleClause = (key: keyof typeof clauses) => {
    setClauses((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const generatedContract = `CONTRAT TYPE : ${docType.toUpperCase()}
CADRE : DROIT POSITIF DES AFFAIRES MAROCAIN (D.O.C & CODE DE COMMERCE)
AUTHENTIFICATION : OBJECTIO REDAC • ICE ${LEGAL_IDENTITY.iceNumber}

ENTRE LES SOUSSIGNÉS :
1. Mohamed MORCHID (964 R/1970), agissant pour l'Écosystème Objectio (Apport 208 000 MAD).
2. La Partie Contractante signataire.

CLAUSES CONTRACTUELLES RETENUES :
${clauses.confidentialite ? "• ARTICLE 1 - CONFIDENTIALITÉ RENFORCÉE : Les parties s'engagent au secret absolu sur les méthodes, codes et savoir-faire échangés." : ""}
${clauses.reservePropriete ? "• ARTICLE 2 - RÉSERVE DE PROPRIÉTÉ : Tous biens immatériels et licences demeurent la propriété exclusive d'Objectio jusqu'au complet paiement." : ""}
${clauses.penale ? "• ARTICLE 3 - CLAUSE PÉNALE FORFAITAIRE : En cas de manquement caractérisé, une indemnité forfaitaire irréductible de 50 000 MAD sera exigible de plein droit." : ""}
${clauses.arbitrage ? `• ARTICLE 4 - ARBITRAGE & RÈGLEMENT DES DIFFÉRENDS : Tout litige sera soumis à l'arbitrage préalable sous égide des référentiels ISOC (${LEGAL_IDENTITY.isocNumber}).` : ""}
${clauses.nonConcurrence ? "• ARTICLE 5 - NON-CONCURRENCE : Interdiction formelle d'exploitation directe ou indirecte d'un service similaire pendant 24 mois." : ""}

Fait de bonne foi sous le régime du Droit Positif.`;

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          Sélectionner le Modèle d'Acte
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {['Pacte d\'Associés', 'Cession de Droits', 'Convention de Prestation', 'Accord NDA'].map(
            (t) => (
              <button
                key={t}
                onClick={() => setDocType(t)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border text-left transition-all ${
                  docType === t
                    ? 'bg-amber-500/20 border-amber-500/80 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {t}
              </button>
            )
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          Clauses d'Intégrité Juridique à Activer
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            { key: 'confidentialite', label: 'Clause de Confidentialité Stricte' },
            { key: 'reservePropriete', label: 'Clause de Réserve de Propriété' },
            { key: 'penale', label: 'Clause Pénale Forfaitaire (50 000 MAD)' },
            { key: 'arbitrage', label: 'Clause d\'Arbitrage ISOC N° 2374734' },
            { key: 'nonConcurrence', label: 'Clause de Non-Concurrence (24 mois)' },
          ].map((item) => (
            <label
              key={item.key}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer text-xs"
            >
              <input
                type="checkbox"
                checked={clauses[item.key as keyof typeof clauses]}
                onChange={() => toggleClause(item.key as keyof typeof clauses)}
                className="rounded accent-amber-500"
              />
              <span className="text-slate-300">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
        <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed max-h-44 overflow-y-auto">
          {generatedContract}
        </pre>
      </div>

      <div className="flex justify-end">
        <button
          onClick={async () => {
            await copyToClipboard(generatedContract);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Texte d\'Acte Copié !' : 'Copier l\'Acte Rédigé'}
        </button>
      </div>
    </div>
  );
};

// S03: Business Plan & Suivi Opérationnel
export const BusinessPlanWorkbench: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projections' | 'tracking' | 'revenue_model' | 'inventory'>('projections');
  const [selectedYearIndex, setSelectedYearIndex] = useState(0); // 0: An 1, 1: An 2, 2: An 3
  
  // Custom scenario overrides for the selected year
  const initialData = BUSINESS_PLAN_PROJECTIONS[selectedYearIndex];
  const [bailleursTranches, setBailleursTranches] = useState(initialData.caBailleursUSD / 6600);
  const [consultingB2B, setConsultingB2B] = useState(initialData.caConsultingB2BMAD);
  const [licencesMAD, setLicencesMAD] = useState(initialData.caLicencesMAD);
  const [chargesDirectes, setChargesDirectes] = useState(initialData.chargesDirectesMAD);
  const [chargesFixes, setChargesFixes] = useState(initialData.chargesFixesMAD);

  // When year tab changes, update defaults
  const handleYearChange = (idx: number) => {
    setSelectedYearIndex(idx);
    const target = BUSINESS_PLAN_PROJECTIONS[idx];
    setBailleursTranches(target.caBailleursUSD / 6600);
    setConsultingB2B(target.caConsultingB2BMAD);
    setLicencesMAD(target.caLicencesMAD);
    setChargesDirectes(target.chargesDirectesMAD);
    setChargesFixes(target.chargesFixesMAD);
  };

  // Dynamic calculations
  const currentYearData = BUSINESS_PLAN_PROJECTIONS[selectedYearIndex];
  const caBailleursUSD = bailleursTranches * 6600;
  const caBailleursMAD = caBailleursUSD * 10;
  const caTotal = caBailleursMAD + consultingB2B + licencesMAD;
  const margeBrute = caTotal - chargesDirectes;
  const tauxMargeBrute = caTotal > 0 ? Math.round((margeBrute / caTotal) * 100) : 0;
  const resultatExploitation = margeBrute - chargesFixes;
  const tauxMargeNette = caTotal > 0 ? Math.round((resultatExploitation / caTotal) * 100) : 0;
  const caf = resultatExploitation + Math.round(chargesFixes * 0.25); // Amortissements estimés à 25% des charges fixes
  const certifiedApport = OBJ_VALEUR_APPORT_NATURE;
  const rentabiliteApport = certifiedApport > 0 ? Math.round((resultatExploitation / certifiedApport) * 100) : 0;
  
  // Seuil de rentabilité (Point Mort)
  // SR = Charges Fixes / Taux de Marge Brute
  const seuilRentabiliteMAD = tauxMargeBrute > 0 ? Math.round(chargesFixes / (tauxMargeBrute / 100)) : 0;
  const pointMortJours = caTotal > 0 ? Math.round((seuilRentabiliteMAD / caTotal) * 365) : 0;

  // Tracking milestones state
  const [milestones, setMilestones] = useState<BusinessPlanMilestone[]>(BUSINESS_PLAN_TRACKING_MILESTONES);
  const [filterCategory, setFilterCategory] = useState<string>('tous');
  const [copiedSummary, setCopiedSummary] = useState(false);

  const toggleMilestone = (id: string) => {
    setMilestones((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const nextStatus = m.status === 'termine' ? 'en_cours' : m.status === 'en_cours' ? 'planifie' : 'termine';
          const nextPercent = nextStatus === 'termine' ? 100 : nextStatus === 'en_cours' ? 65 : 20;
          return { ...m, status: nextStatus, completionPercent: nextPercent };
        }
        return m;
      })
    );
  };

  const totalMilestonesCount = milestones.length;
  const completedMilestonesCount = milestones.filter((m) => m.status === 'termine').length;
  const globalCompletionRate = Math.round(
    milestones.reduce((acc, curr) => acc + curr.completionPercent, 0) / totalMilestonesCount
  );

  const filteredMilestones = filterCategory === 'tous'
    ? milestones
    : milestones.filter((m) => m.category === filterCategory);

  const handleCopyBusinessPlanSummary = () => {
    const summaryText = `ÉCOSYSTÈME OBJECTIO — SYNTHÈSE DU BUSINESS PLAN & SUIVI D'EXÉCUTION
===================================================================
Fondateur : ${LEGAL_IDENTITY.founderName} (CIN ${LEGAL_IDENTITY.matricule} • État Civil 964 R/1970)
Cabinet de Consulting BMM* • RC 16894 Settat • ICE ${LEGAL_IDENTITY.iceNumber}
Domiciliation Bailleurs : Banque Nationale du Canada (BNC) Compte N° ${BNC_ACCOUNT_DATA.accountNumber}

1. SOCLE D'APPORT EN NATURE AUDITÉ :
- Variable Comptable : ${LEGAL_IDENTITY.valeurApportVariable}
- Valeur Actuelle Certifiée : ${LEGAL_IDENTITY.certifiedContribution}
- Réserve Commissariat aux Apports : Tribunal de Commerce de Settat

2. PROJECTIONS FINANCIÈRES (${currentYearData.label}) :
- CA Bailleurs Internationaux (BNC 11-496-06) : $${caBailleursUSD.toLocaleString()} USD (${caBailleursMAD.toLocaleString()} MAD)
- CA Consulting B2B Méthodes BMM* : ${consultingB2B.toLocaleString()} MAD
- CA Licences & Protocoles Probatoires : ${licencesMAD.toLocaleString()} MAD
- Chiffre d'Affaires Global : ${caTotal.toLocaleString()} MAD ($${Math.round(caTotal / 10).toLocaleString()} USD)
- Charges Directes : ${chargesDirectes.toLocaleString()} MAD | Charges Fixes : ${chargesFixes.toLocaleString()} MAD
- Résultat d'Exploitation (EBITDA) : ${resultatExploitation.toLocaleString()} MAD (Marge : ${tauxMargeNette}%)
- Capacité d'Autofinancement (CAF) : ${caf.toLocaleString()} MAD
- Seuil de Rentabilité : ${seuilRentabiliteMAD.toLocaleString()} MAD (Atteint à J+${pointMortJours})
- Rentabilité sur Apport Certifié : ${rentabiliteApport}% / an

3. SUIVI D'EXÉCUTION DES JALONS D'AFFAIRES :
- Taux de Réalisation Global : ${globalCompletionRate}% (${completedMilestonesCount}/${totalMilestonesCount} jalons terminés)
- Dépense Personnelle Actuelle du Fondateur : 0,00 MAD (Principe de Profusion)
- Infrastructure Cloud IA : 100% couverte en Pay-Per-Request par la BNC
- Note d'Honoraires BMM-INT-2026-001 : $6 600 USD (66 000 MAD) transmise aux bailleurs`;

    copyToClipboard(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  return (
    <div className="space-y-5">
      {/* Top Banner: Legal & Doctrinal Anchor */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold text-[11px] border border-amber-500/40">
              Cabinet BMM* • RC 16894 Settat
            </span>
            <span className="text-slate-300 font-medium">Business Plan Triennal & Suivi d'Exécution</span>
            <code className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700 text-cyan-300 font-mono text-[10px]">
              {LEGAL_IDENTITY.valeurApportVariable} = {LEGAL_IDENTITY.certifiedContribution}
            </code>
          </div>
          <p className="text-[11px] text-slate-400">
            Adossement bancaire international BNC 11-496-06 • Note initiale $6 600 USD • Doctrine 0,00 MAD décaissé
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyBusinessPlanSummary}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
          >
            {copiedSummary ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSummary ? 'Synthèse Copiée !' : 'Copier Synthèse BP'}</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
        <button
          type="button"
          onClick={() => setActiveTab('projections')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'projections'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Projections Pluriannuelles (3 Ans)</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('tracking')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'tracking'
              ? 'bg-cyan-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>Suivi d'Exécution & Jalons ({globalCompletionRate}%)</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('revenue_model')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'revenue_model'
              ? 'bg-emerald-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Structure Tripartite (0,00 MAD)</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('inventory')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'inventory'
              ? 'bg-slate-200 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Landmark className="w-3.5 h-3.5" />
          <span>Inventaire Réel & Commissariat</span>
        </button>
      </div>

      {/* TAB 1: PROJECTIONS PLURIANNUELLES */}
      {activeTab === 'projections' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Year Switcher */}
          <div className="flex items-center justify-between gap-3 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs">
            <span className="text-slate-400 font-semibold flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              Exercice Comptable Sélectionné :
            </span>
            <div className="flex gap-2">
              {BUSINESS_PLAN_PROJECTIONS.map((proj, idx) => (
                <button
                  key={proj.annee}
                  type="button"
                  onClick={() => handleYearChange(idx)}
                  className={`px-3 py-1 rounded-md font-mono text-xs transition-all cursor-pointer ${
                    selectedYearIndex === idx
                      ? 'bg-amber-500/20 border border-amber-500/60 text-amber-300 font-bold'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {proj.annee}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-xs text-slate-300">
            <strong>{currentYearData.label}</strong> : Projections financières élaborées selon le Plan Comptable Général Marocain (CGNC) et la doctrine de profusion.
          </div>

          {/* Sliders & Inputs for Dynamic Simulation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold">Tranches Bailleurs ($6 600 USD)</span>
                <span className="font-mono text-cyan-300 font-bold">{bailleursTranches} tranche{bailleursTranches > 1 ? 's' : ''}</span>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                value={bailleursTranches}
                onChange={(e) => setBailleursTranches(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>=${caBailleursUSD.toLocaleString()} USD</span>
                <span className="text-cyan-400 font-bold">{caBailleursMAD.toLocaleString()} MAD</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold">Consulting B2B Méthodes BMM*</span>
                <span className="font-mono text-amber-300 font-bold">{consultingB2B.toLocaleString()} MAD</span>
              </div>
              <input
                type="range"
                min={50000}
                max={1200000}
                step={25000}
                value={consultingB2B}
                onChange={(e) => setConsultingB2B(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>Chrono-analyse SMED</span>
                <span>Barème MOC/MOC+</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold">Licences & Actes Certifiés</span>
                <span className="font-mono text-emerald-300 font-bold">{licencesMAD.toLocaleString()} MAD</span>
              </div>
              <input
                type="range"
                min={20000}
                max={500000}
                step={10000}
                value={licencesMAD}
                onChange={(e) => setLicencesMAD(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>Clés ISOC 2374734</span>
                <span>Matrices D.O.C</span>
              </div>
            </div>
          </div>

          {/* Charges inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Charges Directes d'Intervention & Cloud (MAD)
              </label>
              <input
                type="number"
                value={chargesDirectes}
                onChange={(e) => setChargesDirectes(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm font-mono text-slate-200 focus:border-amber-500 outline-none"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Pris en charge à 100% par le forfait bailleurs via le compte BNC 11-496-06
              </span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Charges Fixes d'Exploitation & Structure (MAD)
              </label>
              <input
                type="number"
                value={chargesFixes}
                onChange={(e) => setChargesFixes(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm font-mono text-slate-200 focus:border-amber-500 outline-none"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Frais juridiques, télécoms, comptabilité et documentation légale
              </span>
            </div>
          </div>

          {/* Result Cards / KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono">
            <div className="space-y-0.5">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Chiffre d'Affaires</span>
              <strong className="text-base text-slate-100">{caTotal.toLocaleString()} MAD</strong>
              <div className="text-[10px] text-cyan-400">${Math.round(caTotal / 10).toLocaleString()} USD</div>
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Marge Brute</span>
              <strong className="text-base text-slate-100">{margeBrute.toLocaleString()} MAD</strong>
              <div className="text-[10px] text-emerald-400">{tauxMargeBrute}% du CA</div>
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Résultat Exploitation</span>
              <strong className={`text-base ${resultatExploitation >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {resultatExploitation.toLocaleString()} MAD
              </strong>
              <div className="text-[10px] text-slate-400">Marge nette : {tauxMargeNette}%</div>
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Capacité d'Autofinancement</span>
              <strong className="text-base text-amber-300">{caf.toLocaleString()} MAD</strong>
              <div className="text-[10px] text-slate-400">Trésorerie saine</div>
            </div>
          </div>

          {/* Strategic Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-900/50 border border-slate-800/80 rounded-xl text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-slate-500 text-[10px] block">Rendement s/ Apport Certifié</span>
              <span className="text-amber-300 font-bold text-sm">{rentabiliteApport}% / an</span>
              <p className="text-[10px] text-slate-400 mt-0.5">Rapporté à {LEGAL_IDENTITY.valeurApportVariable}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-slate-500 text-[10px] block">Seuil de Rentabilité (Point Mort)</span>
              <span className="text-cyan-300 font-bold text-sm">{seuilRentabiliteMAD.toLocaleString()} MAD</span>
              <p className="text-[10px] text-slate-400 mt-0.5">Atteint dès {pointMortJours} jours d'activité</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-slate-500 text-[10px] block">Délai de Récupération (Payback)</span>
              <span className="text-emerald-300 font-bold text-sm">
                {resultatExploitation > 0 ? (certifiedApport / resultatExploitation).toFixed(1) + ' ans' : 'N/A'}
              </span>
              <p className="text-[10px] text-slate-400 mt-0.5">Amortissement complet de l'apport</p>
            </div>
          </div>

          {/* 3-Year Comparative Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
                Tableau Comparatif Pro Forma Triennal (2024 - 2027) :
              </span>
              <span className="text-[10px] text-slate-500 font-mono">En Dirhams Marocains (MAD)</span>
            </div>
            <div className="overflow-x-auto border border-slate-800 rounded-xl">
              <table className="w-full text-xs font-mono text-left">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[11px]">
                  <tr>
                    <th className="p-2.5">Poste Comptable (CGNC)</th>
                    <th className="p-2.5 text-right">An 1 (2024-2025)</th>
                    <th className="p-2.5 text-right">An 2 (2025-2026)</th>
                    <th className="p-2.5 text-right">An 3 (2026-2027)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                  <tr>
                    <td className="p-2.5 text-slate-300 font-semibold">CA Subventions Bailleurs (BNC)</td>
                    <td className="p-2.5 text-right text-cyan-300">198 000 MAD ($19,8k)</td>
                    <td className="p-2.5 text-right text-cyan-300">396 000 MAD ($39,6k)</td>
                    <td className="p-2.5 text-right text-cyan-300">660 000 MAD ($66,0k)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 text-slate-300">Consulting B2B Méthodes BMM*</td>
                    <td className="p-2.5 text-right text-slate-300">280 000 MAD</td>
                    <td className="p-2.5 text-right text-slate-300">480 000 MAD</td>
                    <td className="p-2.5 text-right text-slate-300">750 000 MAD</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 text-slate-300">Licences & Actes Certifiés</td>
                    <td className="p-2.5 text-right text-slate-300">80 000 MAD</td>
                    <td className="p-2.5 text-right text-slate-300">180 000 MAD</td>
                    <td className="p-2.5 text-right text-slate-300">320 000 MAD</td>
                  </tr>
                  <tr className="bg-slate-950/70 font-bold border-t border-slate-700">
                    <td className="p-2.5 text-amber-300">Total Produits d'Exploitation (CA)</td>
                    <td className="p-2.5 text-right text-amber-300">558 000 MAD</td>
                    <td className="p-2.5 text-right text-amber-300">1 056 000 MAD</td>
                    <td className="p-2.5 text-right text-amber-300">1 730 000 MAD</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 text-slate-400">Charges Directes d'Exploitation</td>
                    <td className="p-2.5 text-right text-red-400">-135 000 MAD</td>
                    <td className="p-2.5 text-right text-red-400">-240 000 MAD</td>
                    <td className="p-2.5 text-right text-red-400">-390 000 MAD</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 text-slate-400">Charges Fixes & Structure</td>
                    <td className="p-2.5 text-right text-red-400">-110 000 MAD</td>
                    <td className="p-2.5 text-right text-red-400">-180 000 MAD</td>
                    <td className="p-2.5 text-right text-red-400">-260 000 MAD</td>
                  </tr>
                  <tr className="bg-emerald-950/30 font-bold text-emerald-300 border-t border-slate-700">
                    <td className="p-2.5">Résultat d'Exploitation (EBITDA)</td>
                    <td className="p-2.5 text-right">313 000 MAD</td>
                    <td className="p-2.5 text-right">636 000 MAD</td>
                    <td className="p-2.5 text-right">1 080 000 MAD</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 text-slate-300 font-semibold">Capacité d'Autofinancement (CAF)</td>
                    <td className="p-2.5 text-right text-emerald-400 font-bold">348 000 MAD</td>
                    <td className="p-2.5 text-right text-emerald-400 font-bold">696 000 MAD</td>
                    <td className="p-2.5 text-right text-emerald-400 font-bold">1 180 000 MAD</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SUIVI D'EXÉCUTION & MONITORING DES JALONS */}
      {activeTab === 'tracking' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Global Progress Bar */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-slate-200">Avancement Global du Business Plan :</span>
                <span className="text-cyan-400 font-bold font-mono text-sm">{globalCompletionRate}%</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {completedMilestonesCount} sur {totalMilestonesCount} jalons stratégiques parachevés
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-amber-400 to-emerald-400 transition-all duration-500"
                style={{ width: `${globalCompletionRate}%` }}
              />
            </div>
          </div>

          {/* 4 Core Tracking KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px] font-semibold">Adossement Bailleurs</span>
                <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="font-mono text-sm font-bold text-cyan-300">$6 600 USD Transmis</div>
              <p className="text-[10px] text-slate-500">
                Note BMM-INT-2026-001 sur compte BNC 11-496-06 (PNUD & Bailleurs)
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px] font-semibold">Dépense Fondateur</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="font-mono text-sm font-bold text-emerald-300">0,00 MAD Décaissé</div>
              <p className="text-[10px] text-slate-500">
                Principe de profusion : Trésorerie personnelle 100% préservée
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px] font-semibold">Audit Ingénierie MOC</span>
                <Clock className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="font-mono text-sm font-bold text-amber-300">33,0h MOC Certifiées</div>
              <p className="text-[10px] text-slate-500">
                14h30 mobile + 18h30 ordi = 1 980 MOC d'efforts vérifiables
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-purple-500/30 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px] font-semibold">Pôles & Actifs en Ligne</span>
                <Layers className="w-3.5 h-3.5 text-purple-400" />
              </div>
              <div className="font-mono text-sm font-bold text-purple-300">8 Pôles • 15 Services</div>
              <p className="text-[10px] text-slate-500">
                morchidit.morchidi.digital + deep linking persistant
              </p>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-300">Filtrer les Jalons de Pilotage :</span>
            <div className="flex gap-1.5 text-xs">
              {[
                { id: 'tous', label: 'Tous' },
                { id: 'financement', label: 'Financement BNC' },
                { id: 'technologie', label: 'Technologie & Cloud' },
                { id: 'legal', label: 'Légal & Commissariat' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setFilterCategory(filter.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                    filterCategory === filter.id
                      ? 'bg-cyan-500/20 border border-cyan-500/60 text-cyan-300'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Milestones List */}
          <div className="space-y-2.5 font-mono text-xs">
            {filteredMilestones.map((milestone) => (
              <div
                key={milestone.id}
                onClick={() => toggleMilestone(milestone.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  milestone.status === 'termine'
                    ? 'bg-emerald-950/20 border-emerald-800/60 text-slate-300'
                    : milestone.status === 'en_cours'
                    ? 'bg-cyan-950/20 border-cyan-800/60 text-slate-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                        milestone.status === 'termine'
                          ? 'bg-emerald-500 text-slate-950'
                          : milestone.status === 'en_cours'
                          ? 'bg-cyan-500 text-slate-950 animate-pulse'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {milestone.status === 'termine' ? '✓' : milestone.status === 'en_cours' ? '⟳' : '○'}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-amber-400">{milestone.code}</span>
                        <strong className="text-slate-200 font-sans text-sm">{milestone.title}</strong>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400">
                          Échéance : {milestone.deadline}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs mt-1 font-sans">{milestone.details}</p>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-1 shrink-0">
                    <span className="text-xs font-bold text-cyan-400">
                      {milestone.completionPercent}%
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold ${
                        milestone.status === 'termine'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : milestone.status === 'en_cours'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {milestone.status === 'termine' ? 'Terminé' : milestone.status === 'en_cours' ? 'En Cours' : 'Planifié'}
                    </span>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                  <span className="truncate">Livrable : {milestone.deliverable}</span>
                  <span className="text-slate-500 text-[10px] shrink-0">Cliquer pour basculer le statut</span>
                </div>
              </div>
            ))}
          </div>

          {/* Operational Log Book */}
          <div className="p-3.5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-2 text-xs">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Journal d'Exécution Récent (Vérifications Multi-Terminaux) :
            </span>
            <div className="space-y-1.5 font-mono text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓ 2026-09-08 :</span>
                <span>Arrêté d'inventaire réel ({RAPPORT_INVENTAIRE_PERIODE.referenceRapport}) scellé.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓ 2026-09-09 :</span>
                <span>Audit multi-terminaux (33h MOC) certifié : 14h30 smartphone + 18h30 ordi.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400">⟳ 2026-09-10 :</span>
                <span>Transmission officielle de la Note d'Honoraires BMM-INT-2026-001 ($6 600 USD) au PNUD et Bailleurs.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400">○ Prochain Jalon :</span>
                <span>Raccordement Google Cloud Billing sur BNC 11-496-06 (Pay-Per-Request sécurisé).</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: STRUCTURE TRIPARTITE (0,00 MAD) */}
      {activeTab === 'revenue_model' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-xs text-emerald-200 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <strong className="text-sm font-semibold text-emerald-100">
                Le Modèle Tripartite & Le Principe d'Auto-Alimentation (0,00 MAD Décaissé)
              </strong>
            </div>
            <p className="text-emerald-300/90 leading-relaxed">
              Le Business Plan du Cabinet Mohamed MORCHID (BMM*) repose sur une séparation hermétique entre la consommation technologique Cloud IA et les finances personnelles. Grâce à l'adossement sur la Banque Nationale du Canada (BNC Compte 11-496-06), l'infrastructure s'autofinance par les subventions internationales tout en offrant la gratuité d'accès universelle aux citoyens marocains.
            </p>
          </div>

          {/* Tripartite Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Pillar 1: Bailleurs */}
            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold text-[10px]">
                  PILIER 1 : MULTILATÉRAL
                </span>
                <Globe2 className="w-4 h-4 text-cyan-400" />
              </div>
              <h4 className="font-semibold text-slate-100 text-sm">PNUD & Bailleurs Internationaux</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Prise en charge directe des notes d'honoraires de consulting BMM* et des forfaits Cloud Run en devises (USD/CAD).
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] space-y-1">
                <div className="text-cyan-300 font-bold">$6 600 USD / tranche</div>
                <div className="text-slate-400">Compte BNC : 11-496-06</div>
                <div className="text-[10px] text-slate-500">Auto-alimente Google Cloud</div>
              </div>
            </div>

            {/* Pillar 2: B2B Industrie */}
            <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">
                  PILIER 2 : INDUSTRIE & BANQUES
                </span>
                <BarChart3 className="w-4 h-4 text-amber-400" />
              </div>
              <h4 className="font-semibold text-slate-100 text-sm">Consulting B2B Méthodes BMM*</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Prestations de chrono-analyse industrielle (SMED), rationalisation des flux et audit de conformité bancaire Loi 31-08.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] space-y-1">
                <div className="text-amber-300 font-bold">280 000 à 750 000 MAD/an</div>
                <div className="text-slate-400">Tarification en MOC / MOC+</div>
                <div className="text-[10px] text-slate-500">RC 16894 Settat (BMM*)</div>
              </div>
            </div>

            {/* Pillar 3: Citoyen */}
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                  PILIER 3 : CITOYENNETÉ
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="font-semibold text-slate-100 text-sm">Académie OBJECTIO & Guichet Citoyen</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Accès libre et inconditionnel aux 15 services de Droit Positif conformément à l'Article 37 de la Constitution du Royaume.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] space-y-1">
                <div className="text-emerald-300 font-bold">0,00 MAD au Guichet</div>
                <div className="text-slate-400">Gratuité totale pour l'usager</div>
                <div className="text-[10px] text-slate-500">Bouclier Anti-Inflation</div>
              </div>
            </div>
          </div>

          {/* Flow Diagram */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Cycle Vertueux du Financement (Doctrine de Profusion) :
            </span>
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center font-mono text-[11px] p-2 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="p-2 bg-slate-950 rounded border border-cyan-500/40 text-cyan-300">
                1. Bailleurs (PNUD/BM)<br />
                <span className="text-[10px] text-slate-400">Subvention en devises ($6 600 USD)</span>
              </div>
              <span className="text-slate-600 font-bold">➔</span>
              <div className="p-2 bg-slate-950 rounded border border-cyan-500/40 text-cyan-300">
                2. Banque Nationale du Canada<br />
                <span className="text-[10px] text-slate-400">Compte BNC 11-496-06</span>
              </div>
              <span className="text-slate-600 font-bold">➔</span>
              <div className="p-2 bg-slate-950 rounded border border-amber-500/40 text-amber-300">
                3. Google Cloud Billing<br />
                <span className="text-[10px] text-slate-400">Pay-Per-Request Cloud Run</span>
              </div>
              <span className="text-slate-600 font-bold">➔</span>
              <div className="p-2 bg-slate-950 rounded border border-emerald-500/40 text-emerald-300">
                4. 0,00 MAD Décaissé<br />
                <span className="text-[10px] text-slate-400">Gratuité totale pour le citoyen</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INVENTAIRE RÉEL & RÉSERVE COMMISSARIAT */}
      {activeTab === 'inventory' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                Inventaire Réel des Actifs d'Apport ({LEGAL_IDENTITY.valeurApportVariable}) :
              </span>
              <span className="text-[10px] text-amber-400">
                Arrêté : {RAPPORT_INVENTAIRE_PERIODE.dateClotureRapport} (Travaux en cours de valorisation)
              </span>
            </div>

            <div className="divide-y divide-slate-800 border border-slate-800/80 rounded-lg overflow-hidden">
              {INVENTAIRE_REEL_APPORT.map((item) => (
                <div key={item.id} className="p-3 bg-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 font-bold">{item.code}</span>
                      <strong className="text-slate-200">{item.projectName}</strong>
                      <span className="text-slate-500 text-[10px]">({item.categoryLabel})</span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5">{item.designation}</p>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Début : {item.dateDebut} • Arrêté : {item.dateSoumissionInventaire} ({item.sourceReference})
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 shrink-0">
                    <span className="text-cyan-400 font-mono text-[10px]">
                      {item.effortHeuresMOC.toLocaleString('fr-FR')} MOC
                    </span>
                    <span className="text-amber-300 font-bold text-sm font-mono">
                      {item.valeurMAD.toLocaleString('fr-FR')} MAD
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center px-3 py-2 bg-slate-900 rounded-lg border border-amber-500/30">
              <span className="text-slate-300 font-semibold text-xs">Total Inventaire Réel ({LEGAL_IDENTITY.valeurApportVariable}) :</span>
              <span className="text-amber-300 font-bold font-mono text-sm">{LEGAL_IDENTITY.certifiedContribution}</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-amber-300">
              <Landmark className="w-3.5 h-3.5" />
              <span>Réserve Solennelle pour le Commissariat aux Apports :</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Conformément aux dispositions de l'article 24 de la Loi 17-95 sur les SA et de l'article 53 de la Loi 5-96 sur les SARL, le présent portefeuille d'actifs incorporels et technologiques, combiné au Business Plan triennal, demeure consigné sous réserve d'instruction pour être soumis au Commissariat aux apports officiel auprès du Tribunal de Commerce de Settat en vue de l'augmentation du capital social du Cabinet Mohamed MORCHID (RC 16894 Settat, ICE {LEGAL_IDENTITY.iceNumber}).
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// S04: Prix de Revient
export const PrixRevientWorkbench: React.FC = () => {
  const [coutDirect, setCoutDirect] = useState(450);
  const [tempsHeures, setTempsHeures] = useState(3);
  const [tauxHoraire, setTauxHoraire] = useState(240);
  const [mocPlusPonderation, setMocPlusPonderation] = useState(1.25);
  const [partFixe, setPartFixe] = useState(200);
  const [margePourcent, setMargePourcent] = useState(35);

  // Unités analytiques MOC & MOC+
  // 1 heure = 60 MOC (Minute d'Occupation Convertible)
  const totalMOC = Math.round(tempsHeures * 60);
  const tauxBaseParMOC = Number((tauxHoraire / 60).toFixed(2));
  const totalMOCPlusPonderees = Math.round(totalMOC * mocPlusPonderation);
  const coutMainOeuvreMOCPlus = Number((totalMOC * (tauxHoraire / 60) * mocPlusPonderation).toFixed(2));

  const prixRevientTotal = Math.round(coutDirect + coutMainOeuvreMOCPlus + partFixe);
  const prixVenteRecommande = Math.round(prixRevientTotal * (1 + margePourcent / 100));
  const margeNetteMAD = prixVenteRecommande - prixRevientTotal;

  return (
    <div className="space-y-5">
      {/* Explication doctrinale MOC & MOC+ */}
      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1.5">
        <div className="flex items-center justify-between text-amber-300 font-semibold font-mono">
          <span className="flex items-center gap-1.5">
            <Calculator className="w-4 h-4 text-amber-400" />
            Méthode Analytique MOC & MOC+ (Droit Positif)
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 text-[11px] border border-amber-500/40">
            Unité d'Œuvre Réglementée
          </span>
        </div>
        <p className="text-slate-300 text-[11px] leading-relaxed">
          <strong className="text-amber-200">MOC (Minute d'Occupation Convertible)</strong> : Unité étalon temporelle (1h = 60 MOC) convertissant le temps d'intervention juridique ou technique en coût unitaire direct.<br />
          <strong className="text-cyan-300">MOC+</strong> : Coefficient de majoration probatoire valorisant la haute technicité, le risque de responsabilité juridique et l'astreinte d'exécution.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
            Charges Directes (MAD)
          </label>
          <input
            type="number"
            value={coutDirect}
            onChange={(e) => setCoutDirect(Number(e.target.value) || 0)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-sm font-mono text-slate-200"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
            Temps Passé (Heures)
          </label>
          <input
            type="number"
            step="0.5"
            value={tempsHeures}
            onChange={(e) => setTempsHeures(Number(e.target.value) || 0)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-sm font-mono text-slate-200"
          />
          <span className="text-[10px] text-amber-400 font-mono mt-0.5 block">
            = {totalMOC} MOC
          </span>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
            Taux Horaire (MAD/h)
          </label>
          <input
            type="number"
            value={tauxHoraire}
            onChange={(e) => setTauxHoraire(Number(e.target.value) || 0)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-sm font-mono text-slate-200"
          />
          <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
            = {tauxBaseParMOC} MAD/MOC
          </span>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-cyan-300 mb-1">
            Indice MOC+ (Pondération)
          </label>
          <select
            value={mocPlusPonderation}
            onChange={(e) => setMocPlusPonderation(Number(e.target.value))}
            className="w-full px-2 py-1.5 rounded-lg bg-slate-950 border border-cyan-800 text-xs font-mono text-cyan-200 focus:border-cyan-400"
          >
            <option value={1.0}>1.00x (MOC Standard)</option>
            <option value={1.25}>1.25x (MOC+ Recherche)</option>
            <option value={1.5}>1.50x (MOC+ Haute Technicité)</option>
            <option value={2.0}>2.00x (MOC+ Contentieux / Urgence)</option>
          </select>
          <span className="text-[10px] text-cyan-400 font-mono mt-0.5 block">
            {totalMOCPlusPonderees} MOC+ équiv.
          </span>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
            Quote-part Fixe (MAD)
          </label>
          <input
            type="number"
            value={partFixe}
            onChange={(e) => setPartFixe(Number(e.target.value) || 0)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-sm font-mono text-slate-200"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
            Marge Cible (%)
          </label>
          <input
            type="number"
            value={margePourcent}
            onChange={(e) => setMargePourcent(Number(e.target.value) || 0)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-sm font-mono text-slate-200"
          />
        </div>
      </div>

      {/* Détail analytique MOC / MOC+ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
        <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 block uppercase">Volume MOC</span>
          <strong className="text-slate-200 text-sm">{totalMOC} MOC</strong>
          <span className="text-[10px] text-slate-500 block mt-0.5">({tempsHeures}h converties)</span>
        </div>

        <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 block uppercase">Taux MOC de Base</span>
          <strong className="text-slate-200 text-sm">{tauxBaseParMOC} MAD / min</strong>
          <span className="text-[10px] text-slate-500 block mt-0.5">(Base 60 min/h)</span>
        </div>

        <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-800/40">
          <span className="text-[10px] text-cyan-400 block uppercase">Pondération MOC+</span>
          <strong className="text-cyan-300 text-sm">x{mocPlusPonderation} ({totalMOCPlusPonderees} MOC+)</strong>
          <span className="text-[10px] text-cyan-500 block mt-0.5">Majoration probatoire</span>
        </div>

        <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-800/40">
          <span className="text-[10px] text-amber-300 block uppercase">Coût Total MOC+</span>
          <strong className="text-amber-300 text-sm">{coutMainOeuvreMOCPlus.toLocaleString()} MAD</strong>
          <span className="text-[10px] text-amber-500 block mt-0.5">Main d'œuvre valorisée</span>
        </div>
      </div>

      {/* Résultat de synthèse */}
      <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-center">
        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 block">Prix de Revient (avec MOC+)</span>
          <strong className="text-base text-slate-200">{prixRevientTotal.toLocaleString()} MAD</strong>
          <span className="text-[10px] text-slate-500 block mt-0.5">Direct + MOC+ + Structure</span>
        </div>
        <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30">
          <span className="text-[11px] text-amber-300 block">Prix de Vente Conseillé</span>
          <strong className="text-lg text-amber-300 font-bold">{prixVenteRecommande.toLocaleString()} MAD</strong>
          <span className="text-[10px] text-amber-400/80 block mt-0.5">Marge {margePourcent}% appliquée</span>
        </div>
        <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40">
          <span className="text-[11px] text-emerald-300 block">Marge Nette Dégagée</span>
          <strong className="text-base text-emerald-400">+{margeNetteMAD.toLocaleString()} MAD</strong>
          <span className="text-[10px] text-emerald-500 block mt-0.5">Excédent net de gestion</span>
        </div>
      </div>
    </div>
  );
};

// S05: Convention d'Entraide
export const ConventionEntraideWorkbench: React.FC = () => {
  const [partnerName, setPartnerName] = useState('Cabinet Partenaire Associé');
  const [coopArea, setCoopArea] = useState('Mutualisation de Veille Juridique & Support IT');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Partenaire Signataire</label>
          <input
            type="text"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-slate-200"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Objet de la Mutualisation</label>
          <input
            type="text"
            value={coopArea}
            onChange={(e) => setCoopArea(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-slate-200"
          />
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
        <div className="text-amber-400 font-semibold">CADRE CONVENTIONNEL D'ENTRAIDE ET DE SOLIDARITÉ</div>
        <p className="text-slate-300 leading-relaxed">
          Le présent accord régit les modalités d'assistance réciproque entre <strong>{LEGAL_IDENTITY.founderName} ({LEGAL_IDENTITY.matricule})</strong> et <strong>{partnerName}</strong>. 
          Les parties agissent en totale indépendance juridique, sans lien de subordination, dans le respect du Droit Positif et de la déontologie ISOC ({LEGAL_IDENTITY.isocNumber}).
        </p>
        <div className="text-emerald-400 pt-2 text-[11px]">
          ✓ Clause de non-concurrence déloyale intégrée • ✓ Clause de confidentialité mutuelle • ✓ Arbitrage amiable
        </div>
      </div>
    </div>
  );
};

// S06: Alerte Sécurité
export const AlerteSecuriteWorkbench: React.FC = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, title: 'Déclaration CNDP Traitement Données', level: 'Conforme', status: 'À jour au 01/2026', badge: 'bg-emerald-950 border-emerald-800 text-emerald-400' },
    { id: 2, title: 'Renouvellement Accréditation ISOC (N° 2374734)', level: 'Actif', status: 'Valide pour le cycle en cours', badge: 'bg-cyan-950 border-cyan-800 text-cyan-400' },
    { id: 3, title: 'Dépôt Annuel des Actes Certifiés au Greffe', level: 'Vigilance', status: 'Échéance légale : sous 45 jours', badge: 'bg-amber-950 border-amber-800 text-amber-400' },
  ]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Radar de Veille & Conformité Légale
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Surveillance Active
        </span>
      </div>

      <div className="space-y-2.5">
        {alerts.map((al) => (
          <div
            key={al.id}
            className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800"
          >
            <div>
              <div className="text-xs font-semibold text-slate-200">{al.title}</div>
              <div className="text-[11px] text-slate-400">{al.status}</div>
            </div>
            <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-semibold border ${al.badge}`}>
              {al.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// S07: Gestion Licences
export const GestionLicencesWorkbench: React.FC = () => {
  // Rectification stricte : concordance exacte avec l'immatriculation d'état civil marocaine [964 R/1970]
  const [licenseKey, setLicenseKey] = useState(`OBJ-LIC-2026-964R1970-ISOC`);
  const [clientName, setClientName] = useState('Partenaire Exploitant');

  const generateNewKey = () => {
    const randomHex = Math.random().toString(16).substring(2, 6).toUpperCase();
    setLicenseKey(`OBJ-LIC-2026-964R1970-${randomHex}`);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Bénéficiaire de la Concession</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-slate-200"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Type d'Actif / Licence</label>
          <select className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-slate-200">
            <option>Licence d'Exploitation Suite Objectio (Commerciale)</option>
            <option>Droit d'Usage Modèles Droit Positif</option>
            <option>Concession Partenaire ISOC N° 2374734</option>
          </select>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs flex items-center justify-between">
        <div>
          <span className="text-slate-500 block text-[10px]">Clé de Licence Cryptographique Scellée :</span>
          <strong className="text-amber-400 text-sm">{licenseKey}</strong>
        </div>
        <button
          onClick={generateNewKey}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" /> Régénérer
        </button>
      </div>
    </div>
  );
};

// S08: Grille Tarifaire
export const GrilleTarifaireWorkbench: React.FC = () => {
  const tariffItems = [
    { id: 'pv', name: 'Certification & Scellement PV (S01)', price: 1500 },
    { id: 'redac', name: 'Rédaction d\'Acte Juridique Normé (S02)', price: 3800 },
    { id: 'bp', name: 'Audit & Modélisation Business Plan (S03)', price: 6500 },
    { id: 'prix', name: 'Étude Analytique Prix de Revient (S04)', price: 1200 },
    { id: 'qr', name: 'Intégration Passerelle QR & Empreinte (S10/S15)', price: 2000 },
  ];

  const [selectedItems, setSelectedItems] = useState<string[]>(['pv', 'redac']);

  const toggleItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const totalHT = tariffItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((acc, curr) => acc + curr.price, 0);

  const tva = Math.round(totalHT * 0.2);
  const totalTTC = totalHT + tva;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {tariffItems.map((item) => (
          <label
            key={item.id}
            className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer text-xs"
          >
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleItem(item.id)}
                className="rounded accent-amber-500"
              />
              <span className="text-slate-200">{item.name}</span>
            </div>
            <span className="font-mono text-amber-300 font-semibold">{item.price.toLocaleString()} MAD</span>
          </label>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40 flex items-center justify-between font-mono">
        <div>
          <span className="text-xs text-slate-400 block">Total Estimatif HT : {totalHT.toLocaleString()} MAD</span>
          <span className="text-[11px] text-slate-500">TVA Légale (20%) : {tva.toLocaleString()} MAD</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-400 block uppercase">Net à Payer (TTC)</span>
          <strong className="text-lg text-amber-300 font-bold">{totalTTC.toLocaleString()} MAD</strong>
        </div>
      </div>
    </div>
  );
};

// S09: Skill Generator
export const SkillGeneratorWorkbench: React.FC = () => {
  const [role, setRole] = useState('Juriste Rédacteur Droit Positif');
  const [skills, setSkills] = useState({
    droitPositif: 95,
    formalismDoc: 90,
    conformiteISOC: 92,
    auditFinancier: 85,
  });

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-1">Rôle / Spécialité Métier</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-slate-200"
        />
      </div>

      <div className="space-y-3 font-mono text-xs">
        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>Maîtrise Droit Positif & D.O.C :</span>
            <span className="text-amber-400">{skills.droitPositif}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="100"
            value={skills.droitPositif}
            onChange={(e) => setSkills({ ...skills, droitPositif: Number(e.target.value) })}
            className="w-full accent-amber-500"
          />
        </div>

        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>Formalisme & Certification d'Actes :</span>
            <span className="text-amber-400">{skills.formalismDoc}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="100"
            value={skills.formalismDoc}
            onChange={(e) => setSkills({ ...skills, formalismDoc: Number(e.target.value) })}
            className="w-full accent-amber-500"
          />
        </div>

        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>Conformité Standards ISOC (N° 2374734) :</span>
            <span className="text-cyan-400">{skills.conformiteISOC}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="100"
            value={skills.conformiteISOC}
            onChange={(e) => setSkills({ ...skills, conformiteISOC: Number(e.target.value) })}
            className="w-full accent-cyan-500"
          />
        </div>
      </div>

      <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-xs text-emerald-300 flex items-center gap-2">
        <Award className="w-4 h-4 text-emerald-400" />
        <span>Fiche de compétence homologuée sous l'identifiant ISOC N° 2374734</span>
      </div>
    </div>
  );
};

// S10: Paiement QR (CIH)
export const PaiementCihWorkbench: React.FC = () => {
  const [montant, setMontant] = useState('2500');
  const [refDossier, setRefDossier] = useState('DOS-OBJ-2026-01');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [paidStatus, setPaidStatus] = useState(false);
  const [copiedRib, setCopiedRib] = useState(false);

  // RIB exact prescrit par le Droit Positif
  const cihRib = LEGAL_IDENTITY.rib;

  useEffect(() => {
    const payload = `CIH:PAY;BENEF=${LEGAL_IDENTITY.founderName};ICE=${LEGAL_IDENTITY.iceNumber};MONTANT=${montant}MAD;REF=${refDossier};RIB=${cihRib}`;
    QRCode.toDataURL(payload, { width: 220, margin: 1, color: { dark: '#020617', light: '#ffffff' } })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error(err));
  }, [montant, refDossier, cihRib]);

  const handleCopyRib = async () => {
    await copyToClipboard(cihRib);
    setCopiedRib(true);
    setTimeout(() => setCopiedRib(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Montant à Régler (MAD)</label>
            <input
              type="number"
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm font-mono text-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Référence Dossier / Acte</label>
            <input
              type="text"
              value={refDossier}
              onChange={(e) => setRefDossier(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm font-mono text-slate-200"
            />
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs space-y-1.5">
            <span className="text-slate-500 block text-[11px]">Bénéficiaire Officiel :</span>
            <strong className="text-slate-200 block text-sm">{LEGAL_IDENTITY.founderName} ({LEGAL_IDENTITY.matricule})</strong>
            
            <div className="pt-1.5 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">RIB Officiel CIH Bank :</span>
                <button
                  type="button"
                  onClick={handleCopyRib}
                  className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-sans cursor-pointer"
                >
                  {copiedRib ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedRib ? 'Copié !' : 'Copier'}
                </button>
              </div>
              <span className="text-amber-400 font-bold block text-sm tracking-wide mt-0.5">{cihRib}</span>
              <span className="text-[10px] text-slate-500 block">Banque CIH (230) • Guichet (610) • Clé (95)</span>
            </div>
          </div>

          <button
            onClick={() => setPaidStatus(!paidStatus)}
            className={`w-full py-2 rounded-lg font-semibold text-xs transition-colors cursor-pointer ${
              paidStatus
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            {paidStatus ? '✓ Virement CIH Validé en Démo' : 'Simuler la Confirmation CIH'}
          </button>
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center p-5 rounded-xl bg-slate-950 border border-amber-500/40 text-center space-y-3">
          <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider font-mono">
            QR Code Bancaire CIH Direct
          </div>
          {qrDataUrl && (
            <div className="p-2 bg-white rounded-xl shadow-lg">
              <img src={qrDataUrl} alt="QR Code CIH" className="w-40 h-40" />
            </div>
          )}
          <span className="text-[11px] text-slate-400 font-mono">
            Scannez via l'application CIH Mobile
          </span>
        </div>
      </div>
    </div>
  );
};

// S11: Traducteur LSF/LSA
export const LsfLsaWorkbench: React.FC = () => {
  const dictionary = [
    { term: 'Droit Positif (القانون الوضعي)', lsf: 'Index vertical pointé vers le sol, suivi des deux paumes ouvertes orientées face au juge.', lsa: 'Mouvement descendant de la main droite paume ouverte (établissement de la règle).' },
    { term: 'Contrat / Pacte (عقد / اتفاقية)', lsf: 'Index et pouces entrelacés en anneau puis serrés fermement devant le buste.', lsa: 'Poignées de mains stylisées avec index repliés symbolisant le lien indéfectible.' },
    { term: 'Procès-Verbal (محضر رسمي)', lsf: 'Mime d\'écriture sur la paume gauche ouverte avec tampon final de l\'index droit.', lsa: 'Main gauche à plat, main droite posant le sceau probatoire sur le document.' },
    { term: 'Valeur d\'Apport (حصة عينية)', lsf: 'Les deux mains reçoivent un objet imaginaire et le déposent solennellement.', lsa: 'Mains ouvertes montant puis stabilisées au niveau du cœur (valeur consacrée).' },
  ];

  const [selectedTermIndex, setSelectedTermIndex] = useState(0);
  const activeTerm = dictionary[selectedTermIndex];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-2">Terminologie Juridique Accessible</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {dictionary.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedTermIndex(idx)}
              className={`p-2 rounded-lg text-xs font-medium border text-left transition-all ${
                selectedTermIndex === idx
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.term.split('(')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
            <Ear className="w-4 h-4" /> LSF (Langue des Signes Française)
          </div>
          <p className="text-slate-300 leading-relaxed">{activeTerm.lsf}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <Ear className="w-4 h-4" /> LSA (Langue des Signes Arabe / لغة الإشارة)
          </div>
          <p className="text-slate-300 leading-relaxed">{activeTerm.lsa}</p>
        </div>
      </div>
    </div>
  );
};

// S12: Carnet de Questions
export const CarnetQuestionsWorkbench: React.FC = () => {
  const [questions, setQuestions] = useState([
    {
      q: 'Quelle est la valeur probatoire des PV sous seing privé au Maroc ?',
      r: 'Sous réserve du respect de la Loi 53-05 et de l\'horodatage certifié, ils font foi entre les parties jusqu\'à preuve littérale contraire.',
      cat: 'Droit des Sociétés',
    },
    {
      q: 'Comment est protégée la valeur d\'apport issue de l\'inventaire réel (OBJ_VALEUR_APPORT_NATURE) ?',
      r: 'Elle est adossée à l\'inventaire réel des actifs incorporels, technologiques et opérationnels (OBJ_VALEUR_APPORT_NATURE), inscrite aux statuts, opposable au Registre du Commerce et consolidée par les actes de certification probatoire d\'Objectio.',
      cat: 'Capital & Finance',
    },
    {
      q: 'Quelle est la portée de l\'accréditation ISOC N° 2374734 ?',
      r: 'Elle certifie l\'adhésion aux standards internationaux de gouvernance numérique et d\'intégrité des données électroniques.',
      cat: 'Standards ISOC',
    },
  ]);

  const [newQ, setNewQ] = useState('');

  const handleAddQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQ.trim()) return;
    setQuestions([
      ...questions,
      {
        q: newQ,
        r: 'Question enregistrée au registre doctrinal Objectio. Examen en cours sous l\'égide du Droit Positif.',
        cat: 'Consultation Récente',
      },
    ]);
    setNewQ('');
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddQ} className="flex gap-2">
        <input
          type="text"
          value={newQ}
          onChange={(e) => setNewQ(e.target.value)}
          placeholder="Poser une question doctrinale ou pratique..."
          className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-slate-200 focus:border-amber-500"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" /> Enregistrer
        </button>
      </form>

      <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
        {questions.map((item, idx) => (
          <div key={idx} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-300 font-sans">{item.q}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                {item.cat}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">{item.r}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// S13: Tri-Projet
export const TriProjetWorkbench: React.FC = () => {
  const [projectName, setProjectName] = useState('Plateforme Facturation Dématérialisée');
  const [juridique, setJuridique] = useState(23);
  const [rentabilite, setRentabilite] = useState(21);
  const [faisabilite, setFaisabilite] = useState(20);
  const [urgence, setUrgence] = useState(18);

  const scoreTotal = juridique + rentabilite + faisabilite + urgence;

  let recommendation = 'PRIORITÉ ABSOLUE (LANCEMENT IMMÉDIAT)';
  let recColor = 'text-emerald-400 border-emerald-800 bg-emerald-950/40';

  if (scoreTotal < 60) {
    recommendation = 'À RESTRUCTURER OU ÉCARTER';
    recColor = 'text-red-400 border-red-800 bg-red-950/40';
  } else if (scoreTotal < 75) {
    recommendation = 'PLANIFICATION NORMALE SOUS CONDITIONS';
    recColor = 'text-amber-400 border-amber-800 bg-amber-950/40';
  }

  return (
    <div className="space-y-4 font-mono text-xs">
      <div>
        <label className="block text-slate-400 mb-1 font-sans">Nom du Projet à Qualifier :</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm font-sans text-slate-200"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>Conformité Juridique (/25) :</span>
            <span className="text-amber-400">{juridique}</span>
          </div>
          <input
            type="range"
            min="0"
            max="25"
            value={juridique}
            onChange={(e) => setJuridique(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>

        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>Rentabilité Financière (/25) :</span>
            <span className="text-amber-400">{rentabilite}</span>
          </div>
          <input
            type="range"
            min="0"
            max="25"
            value={rentabilite}
            onChange={(e) => setRentabilite(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>

        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>Faisabilité Technique (/25) :</span>
            <span className="text-amber-400">{faisabilite}</span>
          </div>
          <input
            type="range"
            min="0"
            max="25"
            value={faisabilite}
            onChange={(e) => setFaisabilite(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>

        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>Urgence Stratégique (/25) :</span>
            <span className="text-amber-400">{urgence}</span>
          </div>
          <input
            type="range"
            min="0"
            max="25"
            value={urgence}
            onChange={(e) => setUrgence(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>
      </div>

      <div className={`p-4 rounded-xl border ${recColor} flex items-center justify-between`}>
        <div>
          <span className="text-[10px] text-slate-400 block uppercase">Arbitrage Objectio Tri-Projet</span>
          <strong className="text-sm font-bold block">{recommendation}</strong>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-amber-300">{scoreTotal}</span>
          <span className="text-slate-400 text-xs">/100</span>
        </div>
      </div>
    </div>
  );
};

// S14: Suivi Séquences
export const SuiviSequencesWorkbench: React.FC = () => {
  const [steps, setSteps] = useState([
    { id: 1, label: 'Rédaction Préliminaire & Formalisation de l\'Acte', done: true, delay: 'J+0' },
    { id: 2, label: 'Certification Probatoire & Scellement d\'Intégrité', done: true, delay: 'J+1' },
    { id: 3, label: 'Émargement Numérique & Vérification d\'Identité (964 R/1970)', done: true, delay: 'J+2' },
    { id: 4, label: 'Enregistrement Fiscal & Droits de Timbre', done: false, delay: 'J+7' },
    { id: 5, label: 'Dépôt au Greffe du Tribunal de Commerce & Parution B.O', done: false, delay: 'J+15' },
  ]);

  const toggleStep = (id: number) => {
    setSteps(steps.map((s) => (s.id === id ? { ...s, done: !s.done } : s)));
  };

  const completedCount = steps.filter((s) => s.done).length;
  const progress = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
        <span>Progression du Processus :</span>
        <strong className="text-amber-400">{progress}% ({completedCount}/{steps.length} jalons validés)</strong>
      </div>

      <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-2 font-mono text-xs">
        {steps.map((s) => (
          <div
            key={s.id}
            onClick={() => toggleStep(s.id)}
            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
              s.done
                ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  s.done ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {s.done ? '✓' : s.id}
              </span>
              <span>{s.label}</span>
            </div>
            <span className="text-[10px] text-slate-500">{s.delay}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// S15: Générateur de QR
export const GenerateurQrWorkbench: React.FC = () => {
  const [content, setContent] = useState(
    `OBJECTIO:ACTE-CERTIFIE;TITULAIRE=${LEGAL_IDENTITY.founderName};MATRICULE=${LEGAL_IDENTITY.matricule};ICE=${LEGAL_IDENTITY.iceNumber};APPORT=${LEGAL_IDENTITY.certifiedContribution};ISOC=2374734`
  );
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    QRCode.toDataURL(content, {
      width: 260,
      margin: 2,
      color: { dark: '#020617', light: '#ffffff' },
    })
      .then((url) => setQrUrl(url))
      .catch((err) => console.error(err));
  }, [content]);

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = qrUrl;
    a.download = `QR-Objectio-Certifie-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Contenu / Empreinte de l'Acte à Sceller
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-slate-200 focus:border-amber-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() =>
                setContent(
                  `https://objectio-hub.ma/#pv-certif?ice=${LEGAL_IDENTITY.iceNumber}&matricule=964R1970`
                )
              }
              className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300"
            >
              Lien Profond S01
            </button>
            <button
              onClick={() =>
                setContent(
                  `ATTESTATION-APPORT:208000MAD;MOHAMED_MORCHID;964R/1970;ICE:003707910000033`
                )
              }
              className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300"
            >
              Données Apport 208K
            </button>
          </div>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Télécharger le QR HD (PNG)
          </button>
        </div>

        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
          {qrUrl && (
            <div className="p-2 bg-white rounded-xl shadow-lg mb-2">
              <img src={qrUrl} alt="QR Code Acte" className="w-44 h-44" />
            </div>
          )}
          <span className="text-[11px] text-slate-400 font-mono">
            Empreinte Haute Résolution • Standard ISO/IEC 18004
          </span>
        </div>
      </div>
    </div>
  );
};

export const ServiceWorkbench: React.FC<WorkbenchProps> = ({ service }) => {
  switch (service.id) {
    case 's01':
      return <PvCertifWorkbench />;
    case 's02':
      return <RedacWorkbench />;
    case 's03':
      return <BusinessPlanWorkbench />;
    case 's04':
      return <PrixRevientWorkbench />;
    case 's05':
      return <ConventionEntraideWorkbench />;
    case 's06':
      return <AlerteSecuriteWorkbench />;
    case 's07':
      return <GestionLicencesWorkbench />;
    case 's08':
      return <GrilleTarifaireWorkbench />;
    case 's09':
      return <SkillGeneratorWorkbench />;
    case 's10':
      return <PaiementCihWorkbench />;
    case 's11':
      return <LsfLsaWorkbench />;
    case 's12':
      return <CarnetQuestionsWorkbench />;
    case 's13':
      return <TriProjetWorkbench />;
    case 's14':
      return <SuiviSequencesWorkbench />;
    case 's15':
      return <GenerateurQrWorkbench />;
    default:
      return null;
  }
};
