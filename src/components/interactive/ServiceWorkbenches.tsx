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

// S01: PV / Analyse probatoire
export const PvCertifWorkbench: React.FC = () => {
  const [pvType, setPvType] = useState('AGO (Ordinaire)');
  const [entityName, setEntityName] = useState('Société Écosystème Objectio');
  const [quorum, setQuorum] = useState('87.5');
  const [date, setDate] = useState('2026-09-05');
  const [resolutions, setResolutions] = useState(
    `1. Approbation des comptes et quitus de gestion.\n2. Affectation du résultat d'exploitation.\n3. Ratification de la valeur d'apport issue de l'inventaire réel liée à ${LEGAL_IDENTITY.valeurApportVariable} (${LEGAL_IDENTITY.certifiedContribution}).`
  );
  const [copied, setCopied] = useState(false);

  const hashStamp = `CERT-OBJ-${pvType.slice(0, 3).toUpperCase()}-RC16894-${Math.abs(
    entityName.length * 7919 + parseInt(quorum || '0') * 13
  ).toString(16).toUpperCase()}`;

  const generatedPvText = `=====================================================
PROCES-VERBAL OFFICIEL • ANALYSE PROBATOIRE
ÉCOSYSTÈME OBJECTIO — PORTAIL DE DROIT POSITIF
=====================================================
Titulaire du Registre : ${LEGAL_IDENTITY.founderName} (${LEGAL_IDENTITY.matricule})
ICE : ${LEGAL_IDENTITY.iceNumber} | ${LEGAL_IDENTITY.isocNumber}
Valeur d'apport de référence : ${LEGAL_IDENTITY.certifiedContribution}
${LEGAL_IDENTITY.statutValeurApport}

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
STATUT : ÉTABLI PAR LE BUREAU DES MÉTHODES — SOUMIS À L'APPRÉCIATION DU COMMISSAIRE AUX APPORTS
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
            <ShieldCheck className="w-4 h-4" /> Prévisualisation de l'Acte
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
          {copied ? 'PV Copié dans le presse-papier' : 'Copier le PV'}
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
1. Mohamed MORCHID (Fondateur visionnaire, Conseiller Référent et Secrétaire Général), agissant pour l'Écosystème Objectio (${LEGAL_IDENTITY.certifiedContribution}).
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
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-4">
        <h3 className="text-sm font-bold text-white">S03 — Aide à la structuration d’un Business Plan</h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-300">
          Cet outil aide à organiser des hypothèses de recettes, charges, besoins de financement et jalons.
          Il ne certifie aucune valeur et ne remplace ni un expert-comptable, ni un conseil juridique, ni la décision d’un financeur.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          ['Hypothèses', 'Décrire leur source, leur date et leur niveau de confiance.'],
          ['Scénarios', 'Distinguer prudent, central et favorable sans présenter une projection comme acquise.'],
          ['Financement', 'Identifier les besoins sans annoncer de bailleur, banque ou prise en charge non confirmés.'],
          ['Confidentialité', 'Conserver montants réels, preuves bancaires et situation fiscale dans le dossier privé.'],
        ].map(([title, text]) => (
          <div key={title} className="rounded-lg border border-slate-700 bg-slate-900/60 p-3">
            <div className="text-xs font-semibold text-amber-300">{title}</div>
            <p className="mt-1 text-xs text-slate-400">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

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
    { id: 3, title: 'Dépôt Annuel des Actes au Greffe', level: 'Vigilance', status: 'Échéance légale : sous 45 jours', badge: 'bg-amber-950 border-amber-800 text-amber-400' },
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
  const [licenseKey, setLicenseKey] = useState(`OBJ-LIC-2026-RC16894-ISOC`);
  const [clientName, setClientName] = useState('Partenaire Exploitant');

  const generateNewKey = () => {
    const randomHex = Math.random().toString(16).substring(2, 6).toUpperCase();
    setLicenseKey(`OBJ-LIC-2026-RC16894-${randomHex}`);
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
    { id: 'pv', name: 'Analyse probatoire & Scellement PV (S01)', price: 1500 },
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
            <span>Formalisme & Analyse d'Actes :</span>
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
      r: 'Sous réserve du respect de la Loi 53-05 et de l\'horodatage fiable, ils font foi entre les parties jusqu\'à preuve littérale contraire.',
      cat: 'Droit des Sociétés',
    },
    {
      q: 'Comment est protégée la valeur d\'apport issue de l\'inventaire réel (OBJ_VALEUR_APPORT_NATURE) ?',
      r: 'Elle est adossée à l\'inventaire réel des actifs incorporels, technologiques et opérationnels (OBJ_VALEUR_APPORT_NATURE), inscrite aux statuts, opposable au Registre du Commerce et consolidée par les actes d\'analyse probatoire d\'Objectio — Analysé par le Bureau des méthodes Objectio — valeur soumise à l\'appréciation du commissaire aux apports.',
      cat: 'Capital & Finance',
    },
    {
      q: 'Quelle est la portée de l\'accréditation ISOC N° 2374734 ?',
      r: 'Elle atteste l\'adhésion aux standards internationaux de gouvernance numérique et d\'intégrité des données électroniques.',
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
    { id: 2, label: 'Analyse Probatoire & Scellement d\'Intégrité', done: true, delay: 'J+1' },
    { id: 3, label: 'Émargement Numérique & Vérification d\'Identité Fondateur', done: true, delay: 'J+2' },
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
    `OBJECTIO:ACTE-ANALYSE-BM;TITULAIRE=${LEGAL_IDENTITY.founderName};MATRICULE=${LEGAL_IDENTITY.matricule};ICE=${LEGAL_IDENTITY.iceNumber};APPORT=${LEGAL_IDENTITY.certifiedContribution};ISOC=2374734`
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
    a.download = `QR-Objectio-${Date.now()}.png`;
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
                  `https://objectio-hub.ma/#pv-certif?ice=${LEGAL_IDENTITY.iceNumber}&matricule=RC16894`
                )
              }
              className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300"
            >
              Lien Profond S01
            </button>
            <button
              onClick={() =>
                setContent(
                  `ATTESTATION-APPORT:${OBJ_VALEUR_APPORT_NATURE}MAD-EN-COURS-INVENTAIRE;MOHAMED_MORCHID;RC16894;ICE:003707910000033`
                )
              }
              className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300"
            >
              Données Apport (inventaire)
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
