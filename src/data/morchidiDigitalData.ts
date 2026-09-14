// =============================================================================
//  MORCHIDI DIGITAL — Tableau de bord unifié (AGENT_SYNC)
//  Recyclage du tableau de bord autonome index.html (30/07/2026, 1 323 lignes)
//  en module du Hub. Source unique : LEGAL_IDENTITY + INVENTAIRE_REEL_APPORT.
//  Vocabulaire : aucun « certifié » — « Déclaré » (par le fondateur) ou
//  « Analysé par le Bureau des méthodes Objectio ».
// =============================================================================

export const BUREAU_DES_METHODES_LABEL =
  'Analysé par le Bureau des méthodes Objectio — valeur soumise à l’appréciation du commissaire aux apports';

export const rapportHeader = (metier: string) =>
  `Étudié par le Bureau des méthodes Objectio — rapport soumis à l’appréciation ${metier}`;

export type DeclaredStatus = 'declare' | 'en_cours' | 'planifie';

export const STATUS_LABEL: Record<DeclaredStatus, string> = {
  declare: 'DÉCLARÉ',
  en_cours: 'EN COURS',
  planifie: 'PLANIFIÉ',
};

// ---- Agents Orchestra (9) ----------------------------------------------------
export interface MdAgent {
  code: string;
  arabic: string;
  name: string;
  desc: string;
  status: DeclaredStatus;
}

export const MD_AGENTS: MdAgent[] = [
  { code: 'AGENT_SEC', arabic: 'الأمن', name: 'Sécurité', desc: 'Validation ISOC — App Lock — ntag — Privacy Policy — Non contournable', status: 'declare' },
  { code: 'AGENT_CONTR', arabic: 'كتابة العقود', name: 'Contrats', desc: 'Invitation équipe — Collaboration — Backlog — Bugs — Stakeholders', status: 'declare' },
  { code: 'AGENT_EVAL', arabic: 'احتساب الضرر', name: 'Évaluation', desc: 'Backlog — Bugs — Quantification — Statut — Feedback gratuit', status: 'declare' },
  { code: 'AGENT_FINANC', arabic: 'البحث عن التمويل', name: 'Financement', desc: 'Budget — Sponsors — ROI déclaré — Subscribe', status: 'declare' },
  { code: 'AGENT_BANQUE', arabic: 'المصرف', name: 'Banque', desc: 'Transactions — États financiers — Budget exécuté — CIH', status: 'declare' },
  { code: 'AGENT_REPAR', arabic: 'جبر الضرر', name: 'Réparation', desc: 'Livraison — Compensation — Support — Feedback final', status: 'declare' },
  { code: 'AGENT_NSAVE', arabic: 'التَّحْوِيلِ الْمَصْرِفِي', name: 'Encaissement NSAVE', desc: 'Passerelle — 4.2 % USD — Protection IAP — Automatisé', status: 'declare' },
  { code: 'AGENT_TRIBANK', arabic: 'الثَّلَاثَةِ الْمَصَارِفِ', name: 'Tri-Bank', desc: '4 comptes — CIH — NSAVE — SIMPLE — PAYPAL — Budget optimal', status: 'declare' },
  { code: 'AGENT_SYNC', arabic: 'فَرِيقُ الْمُزَامَنَةِ', name: 'Synchronisation', desc: 'Ordinateur ↔ Smartphone — Institutional Only — Automatisé', status: 'declare' },
];

// ---- Flux AGENT_SYNC (11 nœuds) ---------------------------------------------
export interface MdSyncNode {
  icon: string;
  title: string;
  detail: string;
  badge: string;
}

export const MD_SYNC_NODES: MdSyncNode[] = [
  { icon: '💻', title: 'ORDINATEUR INSTITUTIONNEL', detail: 'Azure DevOps — Agent Orchestra — Smart Tri-Rôles', badge: 'ACTIF' },
  { icon: '🔄', title: 'AGENT_SYNC — فَرِيقُ الْمُزَامَنَةِ', detail: 'Synchronisation — IAP — Institutional Only — Automatisé', badge: 'SYNC' },
  { icon: '🔐', title: 'VALIDATION INSTITUTIONNELLE', detail: 'AGENT_SEC — ISOC — App Lock — ntag — Privacy Policy', badge: 'VALIDÉ' },
  { icon: '📄', title: 'SYNCHRONISATION DOCUMENTS', detail: '9 fichiers .md — Agent Orchestra — Tri-Bank — Library — PNUD', badge: 'SYNC' },
  { icon: '📖', title: 'SYNCHRONISATION GUIDES', detail: 'Guide Fondateur — Développeur — Utilisateur', badge: 'SYNC' },
  { icon: '🏦', title: 'SYNCHRONISATION BUDGET / TRI-BANK', detail: '4 comptes — ROI déclaré — Passerelle NSAVE — IAP', badge: 'SYNC' },
  { icon: '🏛️', title: 'SYNCHRONISATION LIBRARY / MUSEUM', detail: 'Physique + Numérique — Membres ISOC — PNUD', badge: 'SYNC' },
  { icon: '🌍', title: 'SYNCHRONISATION PNUD', detail: 'Template A/B/C/D — Impact — Développement durable', badge: 'SYNC' },
  { icon: '✅', title: 'VALIDATION PERSONNELLE', detail: 'AGENT_SEC — App Lock — ntag — CA_IAP 1,5 — Automatisé', badge: 'VALIDÉ' },
  { icon: '📱', title: 'SYNCHRONISATION SMARTPHONE', detail: 'NSAVE — USD/GBP — 4.2 % — App Lock ON — Déclaré', badge: 'SYNC' },
  { icon: '📱', title: 'SMARTPHONE PERSONNEL', detail: 'NSAVE — Passerelle — IAP — Déclaré — Non exposé', badge: 'ACTIF' },
];

export interface MdSyncComponent {
  nom: string;
  ordi: string;
  phone: string;
}

export const MD_SYNC_COMPONENTS: MdSyncComponent[] = [
  { nom: 'Agent Orchestra', ordi: 'Déclaré — Non contournable', phone: 'App Lock — ntag' },
  { nom: 'Smart Tri-Rôles', ordi: 'Contrôle total — Override', phone: 'Observation — Feedback' },
  { nom: 'Tri-Bank (4 comptes)', ordi: 'Optimisation — Budget', phone: 'NSAVE — Encaissement' },
  { nom: 'Library / Museum', ordi: 'Musée — Consultation', phone: 'Bibliothèque — Observation' },
  { nom: 'PNUD Template', ordi: 'Formulaire A/B/C/D', phone: 'Template — Business Plan' },
  { nom: 'Passerelle NSAVE', ordi: '4.2 % USD — Meilleur prix', phone: 'App Lock — Encaissement' },
  { nom: 'Privacy IAP', ordi: 'AGENT_SEC — Non contournable', phone: 'App Lock — ntag — Policy' },
];

// ---- Tri-Bank (4 comptes) — aucun numéro, aucun solde -----------------------
export interface MdBankAccount {
  id: 'cih' | 'nsave' | 'simple' | 'paypal';
  name: string;
  kind: string;
  currency: string;
  note: string;
  gradient: string;
}

export const MD_BANKS: MdBankAccount[] = [
  { id: 'cih', name: 'CIH Bank', kind: 'Institutionnel — Maroc', currency: 'MAD', note: 'Budget optimisé — Déclaré — Coordonnées non exposées', gradient: 'from-indigo-900 to-indigo-700' },
  { id: 'nsave', name: 'NSAVE', kind: 'Personnel — Pro Plan', currency: 'USD + GBP', note: 'App Lock ON — ntag actif — Passerelle principale (4.2 % USD)', gradient: 'from-emerald-800 to-emerald-600' },
  { id: 'simple', name: 'SIMPLE', kind: 'Européen', currency: 'EUR', note: 'Compte européen — RIB non exposé', gradient: 'from-fuchsia-900 to-fuchsia-700' },
  { id: 'paypal', name: 'PayPal', kind: 'Freelance — Variable', currency: 'Variable', note: 'Source entrante — Freelance + Ventes', gradient: 'from-sky-800 to-sky-600' },
];

export const MD_BUDGET = {
  budgetOptimalUSD: 2444.14,
  roiPct: 306.99,
  statut: 'Déclaré par le fondateur — non audité',
};

// ---- Smart Tri-Rôles ----------------------------------------------------------
export interface MdRole {
  icon: string;
  name: string;
  pct: number;
  holder: string;
  items: string[];
}

export const MD_ROLES: MdRole[] = [
  { icon: '👑', name: 'Fondateur', pct: 40, holder: 'M. Mohamed MORCHID', items: ['Contrôle total · Override', 'Activation NSAVE', 'Validation TRIBANK', 'ISOC · Conseiller Référent', 'Non contournable · AGENT_SEC'] },
  { icon: '💻', name: 'Développeur', pct: 30, holder: 'Collaboration', items: ['Backlog · Bugs · Feedback', 'Support technique', 'Observation budget', 'Pas de décision finale', 'Déclaré · Institutional Only'] },
  { icon: '⭐', name: 'Utilisateur', pct: 20, holder: 'Bénéficiaire', items: ['Observation · Feedback', 'Support · Ressources', 'Aucune responsabilité', 'Invitation · Gratuit', 'AGENT_CONTR · Déclaré'] },
];

// ---- Les 18 Bureaux — « Bureau des méthodes — au service de … » -------------
export interface MdBureau {
  code: string;
  emoji: string;
  ancien: string; // libellé d'origine (30/07/2026), conservé pour traçabilité
  metier: string; // « au service de … »
  appreciation: string; // destinataire du rapport
}

export const MD_BUREAUX: MdBureau[] = [
  { code: 'BIA', emoji: '🏛️', ancien: 'Institutionnel A', metier: 'des institutions (fondamentaux)', appreciation: 'de l’autorité institutionnelle saisie' },
  { code: 'BIN', emoji: '💻', ancien: 'Infrastructure Numérique', metier: 'de l’infrastructure numérique', appreciation: 'du responsable des systèmes d’information' },
  { code: 'BIA2', emoji: '⚖️', ancien: 'Institutionnel Avancé', metier: 'des institutions (dossiers avancés)', appreciation: 'de l’autorité institutionnelle saisie' },
  { code: 'BIAV', emoji: '🎥', ancien: 'Audiovisuel', metier: 'de l’audiovisuel', appreciation: 'du producteur ou du diffuseur' },
  { code: 'BIH', emoji: '💎', ancien: 'H+ Monnaie', metier: 'de l’unité de compte H+', appreciation: 'de l’expert-comptable' },
  { code: 'ACA', emoji: '📜', ancien: 'Certification', metier: 'de l’attestation préparatoire', appreciation: 'du commissaire aux apports' },
  { code: 'CAP', emoji: '📊', ancien: 'Centre Appel', metier: 'de la relation à distance', appreciation: 'du responsable de la relation client' },
  { code: 'ATB', emoji: '🔧', ancien: 'Atelier Technique', metier: 'de l’atelier technique', appreciation: 'de l’ingénieur référent' },
  { code: 'ABM', emoji: '🏦', ancien: 'Banque & Mutuelle', metier: 'de la banque et de la mutuelle', appreciation: 'du chargé d’affaires bancaire' },
  { code: 'BRP', emoji: '📋', ancien: 'Relations Publiques', metier: 'des relations publiques', appreciation: 'du responsable de la communication' },
  { code: 'BTW', emoji: '🌐', ancien: 'Technique Web', metier: 'de la technique web', appreciation: 'de l’architecte web' },
  { code: 'BMAT', emoji: '⚖️', ancien: 'Médiation Travail', metier: 'de la médiation du travail', appreciation: 'du médiateur ou de l’inspecteur du travail' },
  { code: 'ALW', emoji: '🌱', ancien: 'Alwafra Coopérative', metier: 'de la coopérative Alwafra', appreciation: 'de l’assemblée générale de la coopérative' },
  { code: 'BCSM', emoji: '🔒', ancien: 'Conformité Souveraineté', metier: 'de la conformité et de la souveraineté', appreciation: 'du délégué à la protection des données' },
  { code: 'BAV', emoji: '📈', ancien: 'Audit Valorisation', metier: 'de la valorisation préparatoire', appreciation: 'du commissaire aux apports' },
  { code: 'BCRP', emoji: '🤝', ancien: 'Compensations', metier: 'des compensations', appreciation: 'de l’arbitre ou du médiateur' },
  { code: 'BGL', emoji: '📒', ancien: 'Grand Livre H+', metier: 'du grand livre H+', appreciation: 'de l’expert-comptable' },
  { code: 'BCH', emoji: '🏠', ancien: 'Convention H+', metier: 'des conventions H+', appreciation: 'du juge ou de l’arbitre saisi' },
];

// ---- PNUD — Template A/B/C/D --------------------------------------------------
export const MD_PNUD_SECTIONS: { title: string; items: string[] }[] = [
  { title: 'Section A — Identification', items: ['Projet : Morchidi Digital', 'Organisation : ISOC', 'Fondateur : M. Mohamed MORCHID', 'Conseiller Référent : déclaré', 'Pays : Maroc', 'Statut : déclaré — en cours d’instruction'] },
  { title: 'Section B — Description', items: ['Agent Orchestra : 9 agents', 'Smart Tri-Rôles : 3 rôles', 'Tri-Bank : 4 comptes', 'Library / Museum : physique + numérique', 'ROI déclaré : 306,99 %', 'Impact : développement durable'] },
  { title: 'Section C — Budget', items: ['Budget optimal : 2 444,14 USD', 'Financement : recherché (non acquis)', 'Passerelle : NSAVE 4.2 %', 'Dividendes : H+ Système', 'CTI : à instruire'] },
  { title: 'Section D — Impact', items: ['Développement durable', 'Communauté ISOC', 'Coopérative Alwafra', 'Library / Museum local', 'Formation numérique', 'Conseiller Référent déclaré'] },
];

// ---- Azure ----------------------------------------------------------------------
export const MD_AZURE = {
  account: 'Compte du Cabinet (identifiant non exposé)',
  creditsUSD: 200,
  expiry: '23 août 2026',
  services: [
    { name: 'App Service', sub: 'Gratuit F1' },
    { name: 'Cosmos DB', sub: 'Serverless' },
    { name: 'Functions', sub: '1M gratuit/mois' },
    { name: 'DevOps', sub: 'Pipeline CI/CD' },
    { name: 'Storage', sub: 'Fichiers statiques' },
    { name: 'AI Foundry', sub: 'Agent Orchestra' },
  ],
  plan: [
    { step: 'Créer App Service Web statique', detail: 'portal.azure.com → Créer ressource → App Service → morchidi-digital', tag: 'Gratuit F1' },
    { step: 'Créer Cosmos DB', detail: 'Serverless → morchidi-db → France Central', tag: 'Serverless' },
    { step: 'Configurer DevOps', detail: 'Pipeline CI/CD → dépôt GitHub Enumerated-it', tag: 'CI/CD' },
    { step: 'Déployer', detail: 'Hébergement actuel : Vercel (0 MAD) — Azure en réserve', tag: 'Réserve' },
  ],
};

// ---- Sécurité — 6 couches -------------------------------------------------------
export const MD_SECURITY_LAYERS: { name: string; detail: string }[] = [
  { name: 'AGENT_SEC', detail: 'Non contournable — Validation institutionnelle' },
  { name: 'ISOC', detail: 'Information Security Operations Center' },
  { name: 'App Lock', detail: 'Verrouillage application — ON' },
  { name: 'ntag NFC', detail: 'Contrôle physique — identifiant non exposé' },
  { name: 'IAP — CA_IAP 1,5', detail: 'Interaction Attention Pénible — Automatisé' },
  { name: 'Privacy Policy', detail: 'Institutional Only — Aucune donnée personnelle exposée' },
];

export const MD_PROTECTED_DATA: string[] = [
  'E-mail personnel', 'Téléphone', 'Date de naissance', 'Adresse', 'N° de compte CIH', 'RIB SIMPLE', 'Soldes exacts', 'Montants encaissés',
];

export const MD_PROGRESS: { label: string; pct: number }[] = [
  { label: 'Agent Orchestra', pct: 100 },
  { label: 'Tri-Bank configuré', pct: 75 },
  { label: 'PNUD Template', pct: 60 },
  { label: 'Library / Museum', pct: 40 },
  { label: 'Déploiement Azure', pct: 20 },
];

export const MD_ORIGIN = {
  fichier: 'index.html (tableau de bord autonome, poste du fondateur)',
  dateCreation: '30/07/2026',
  lignes: 1323,
  recycleLe: '13/09/2026',
  note: 'Fichier autonome (HTML/CSS/JS, sans CDN) recyclé en module React du Hub. Vocabulaire assaini : « certifié » → « déclaré » ; bureaux renommés « Bureau des méthodes — au service de … ».',
};
