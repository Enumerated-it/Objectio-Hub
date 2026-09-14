export type ServiceCategory = 'juridique' | 'finance' | 'securite' | 'tech';

export interface ServiceItem {
  id: string; // 's01', 's02', etc.
  code: string; // 'S01', 'S02', etc.
  title: string;
  anchor: string; // 'pv-certif', 'redac', 'lsf-lsa', etc.
  category: ServiceCategory;
  categoryLabel: string;
  tagline: string;
  shortDesc: string;
  legalBasis: string;
  features: string[];
  primaryMetric: {
    label: string;
    value: string;
  };
  sampleData?: Record<string, any>;
}

export interface InventoryItem {
  id: string;
  code: string;
  projectName: string; // 'Objectio Hub', 'JurisProtocole', 'Matrice MOC/MOC+', 'IA Positive & Modèles Doctrīnaux', etc.
  projectCategory: 'droit_positif' | 'technologie' | 'recherche_ia' | 'socio_inclusif';
  category: 'incorporel' | 'technologique' | 'operationnel';
  categoryLabel: string;
  designation: string;
  effortHeuresMOC: number; // Effort mesuré en MOC (Minute d'Occupation Convertible)
  dateDebut: string; // Date de commencement de l'effort intellectuel / technique
  dateSoumissionInventaire: string; // Date d'arrêté de l'inventaire (non définitive : travaux en cours)
  statutDeveloppement: 'en_cours_developpement' | 'actif_operationnel' | 'recherche_continue';
  sourceType: 'dossier_local' | 'aistudio_google' | 'github_repo' | 'vercel' | 'deepseek_ai' | 'plateforme_sans_api' | 'autre';
  sourceReference: string; // Chemin de projet, dépôt distant, ou référence probatoire
  hasNoPublicApi?: boolean; // Signal probatoire : plateforme fermée sans API, protocole d'empreinte probatoire
  legalJustification: string;
  valeurMAD: number;
}

export interface InventoryReportPeriod {
  dateOuverture: string; // Date début de la campagne d'inventaire
  dateClotureRapport: string; // Date de dressement du rapport de consolidation
  referenceRapport: string;
  statutGlobal: 'travaux_en_cours_developpement_continu' | 'cloture_provisoire';
}

export interface MarketTarget {
  id: string;
  title: string;
  profilAcheteur: string;
  besoinFondamental: string;
  beneficeROI: string;
  couvertureAntiInflation: string;
  modaliteAcquisition: string;
}

export interface LegalIdentity {
  founderName: string;
  matricule: string;
  cin: string;
  birthInfo: string;
  rcNumber: string;
  ifNumber: string;
  officialDomain: string;
  cloudRunUrl: string;
  valeurApportVariable: string;
  valeurApportMontant: number;
  certifiedContribution: string; // libellé du montant en cours d’inventaire (nom historique conservé)
  statutValeurApport: string;    // « Analysé par le Bureau des méthodes Objectio — … »
  iceNumber: string;
  isocNumber: string;
  officialEmail?: string;
  rib: string;
  portalDesignation: string;
  jurisdiction: string;
  doctrinalNotice: {
    title: string;
    conceptIAP: string;
    description: string;
  };
}

export interface EcosystemSite {
  id: string;
  siteNumber: string; // e.g. "Site 0", "Site 6"
  name: string;
  nameAr?: string;
  hash: string; // e.g. "#entraide", "#academie"
  tagline: string;
  desc: string;
  category: string;
  iconName: 'HeartHandshake' | 'Scale' | 'ShieldAlert' | 'Car' | 'BookOpen' | 'PenTool' | 'Building2' | 'GraduationCap';
  url: string;
  status: 'deploye' | 'en_cours_dns' | 'operationnel';
}

export interface DnsRecordConfig {
  type: 'CNAME' | 'A' | 'TXT' | 'NS';
  name: string;
  target: string;
  ttl: string;
  proxyStatus?: 'Proxied (Cloudflare)' | 'DNS only' | 'Auto';
  purpose: string;
}

export interface BncAccountConfig {
  bankName: string; // Banque Nationale du Canada (National Bank of Canada)
  accountNumber: string; // Domiciliation BNC
  accountHolder: string; // Mohamed MORCHID
  currencySupported: string[]; // CAD, USD, EUR
  sigleCertification: string; // BMM* (Bureau Méthodes Magazine / Mohamed MORCHID)
  status: 'actif_recouvrement' | 'reactivation_flux_internationaux';
  purpose: string;
}

export interface InternationalInvoiceLine {
  id: string;
  description: string;
  effortHeures: number;
  tauxHoraireUSD: number;
  montantUSD: number;
  equivalentMAD: number;
  poleReference: string;
}

export interface InternationalInvoiceData {
  invoiceNumber: string;
  dateEmission: string;
  beneficiairePrincipal: string; // Cabinet de Consulting Mohamed MORCHID / BMM*
  ice: string;
  rcSettat: string;
  destinataireOrganisation: string; // ex: PNUD (Programme des Nations Unies pour le Développement) / Bailleurs
  destinataireAdresse: string;
  objetMission: string;
  bncAccountNumber: string;
  lines: InternationalInvoiceLine[];
  totalUSD: number;
  tauxChangeUSD_MAD: number;
  totalMAD: number;
  mentionStrategie: string; // "Ne payez que lorsque vous gagnez"
}

export interface MultiDeviceBuildEffort {
  lastBuildDurationSeconds: number; // e.g. 315s (5.25 min machine)
  smartphoneEffortHeures: number; // 14.5h (saisie, revue mobile, validation terrain Settat)
  computerEffortHeures: number; // 18.5h (architecture TypeScript, configuration DNS, compilation)
  totalEffortHeures: number; // 33.0h
  totalEffortMOC: number; // 1980 MOC
  tauxHoraireExpertiseMAD: number; // 650 MAD/h
  valeurSessionMAD: number; // 21 450 MAD
  mentionReserveCommissariat: string;
  statutApprobation: 'declare_fondateur' | 'en_reserve_commissariat';
}

export interface BusinessPlanYearProjection {
  annee: string;
  label: string;
  caBailleursUSD: number;
  caBailleursMAD: number;
  caConsultingB2BMAD: number;
  caLicencesMAD: number;
  caTotalMAD: number;
  chargesDirectesMAD: number;
  chargesFixesMAD: number;
  resultatExploitationMAD: number;
  cafMAD: number;
  bfrMAD: number;
  tresorerieFinExerciceMAD: number;
}

export interface BusinessPlanMilestone {
  id: string;
  code: string;
  title: string;
  category: 'financement' | 'technologie' | 'legal' | 'deploiement';
  deadline: string;
  status: 'termine' | 'en_cours' | 'planifie';
  completionPercent: number;
  deliverable: string;
  details: string;
}

