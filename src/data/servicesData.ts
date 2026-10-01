import { 
  LegalIdentity, 
  ServiceItem, 
  InventoryItem, 
  InventoryReportPeriod, 
  MarketTarget, 
  EcosystemSite, 
  DnsRecordConfig,
  BncAccountConfig,
  InternationalInvoiceData,
  MultiDeviceBuildEffort,
  BusinessPlanYearProjection,
  BusinessPlanMilestone
} from '../types';

export const RAPPORT_INVENTAIRE_PERIODE: InventoryReportPeriod = {
  dateOuverture: '2026-09-01',
  dateClotureRapport: '2026-09-08',
  referenceRapport: 'RAP-INV-2026-RC16894-01',
  statutGlobal: 'travaux_en_cours_developpement_continu',
};

export const INVENTAIRE_REEL_APPORT: InventoryItem[] = [
  {
    id: 'inv-01',
    code: 'PROJ-OBJ-HUB',
    projectName: 'Objectio Hub (Portail Central 15 Services)',
    projectCategory: 'droit_positif',
    category: 'incorporel',
    categoryLabel: 'Actifs Immatériels & Propriété Intellectuelle',
    designation: 'Architecture logicielle centrale, suite des 15 services de Droit Positif, matrices de PV, protocoles contractuels et deep linking persistant.',
    effortHeuresMOC: 0, // Mesure détaillée conservée hors du bundle public
    dateDebut: '2024-03-10',
    dateSoumissionInventaire: '2026-09-08', // Arrêté d'inventaire - travaux en cours
    statutDeveloppement: 'en_cours_developpement',
    sourceType: 'dossier_local',
    sourceReference: 'Référence conservée dans le dossier privé d’inventaire',
    hasNoPublicApi: false,
    legalJustification: 'Loi 17-97 relative à la protection de la propriété industrielle et Droit des Obligations et des Contrats (D.O.C)',
    valeurMAD: 0,
  },
  {
    id: 'inv-02',
    code: 'PROJ-JURIS-DOC',
    projectName: 'JurisProtocole & Modèles Doctrīnaux',
    projectCategory: 'droit_positif',
    category: 'incorporel',
    categoryLabel: 'Fonds Doctrinal & Référentiels d’Actes',
    designation: 'Corpus d’actes juridiques analysés par le Bureau des méthodes, clauses d’arbitrage, conventions d’entraide sans subordination et référentiels de Droit Positif marocain.',
    effortHeuresMOC: 0, // Mesure détaillée conservée hors du bundle public
    dateDebut: '2024-06-01',
    dateSoumissionInventaire: '2026-09-08',
    statutDeveloppement: 'en_cours_developpement',
    sourceType: 'dossier_local',
    sourceReference: 'Référence conservée dans le dossier privé d’inventaire',
    hasNoPublicApi: false,
    legalJustification: 'Loi 53-05 sur l’échange électronique de données juridiques et articles 230+ du D.O.C',
    valeurMAD: 0,
  },
  {
    id: 'inv-03',
    code: 'PROJ-MOC-ANALYTICS',
    projectName: 'Système MOC / MOC+ (Minute d’Occupation Convertible)',
    projectCategory: 'technologie',
    category: 'technologique',
    categoryLabel: 'Méthodologie & Unité de Mesure Analytique',
    designation: 'Modèle mathématique et algorithmique de conversion du temps d’intervention (1h = 60 MOC) et pondération de complexité/risque MOC+.',
    effortHeuresMOC: 0, // Mesure détaillée conservée hors du bundle public
    dateDebut: '2024-11-15',
    dateSoumissionInventaire: '2026-09-08',
    statutDeveloppement: 'actif_operationnel',
    sourceType: 'aistudio_google',
    sourceReference: 'Référence conservée dans le dossier privé d’inventaire',
    hasNoPublicApi: false,
    legalJustification: 'Comptabilité analytique de gestion et règles d’évaluation de la valeur ajoutée intellectuelle',
    valeurMAD: 0,
  },
  {
    id: 'inv-04',
    code: 'PROJ-INCLUSION-LSF',
    projectName: 'Passerelle Inclusive LSF / LSA',
    projectCategory: 'socio_inclusif',
    category: 'technologique',
    categoryLabel: 'Technologie Inclusive & Accessibilité Juridique',
    designation: 'Lexique bilingue et moteur de vulgarisation du Droit en Langue des Signes Française (LSF) et Langue des Signes Arabe (LSA).',
    effortHeuresMOC: 0, // Mesure détaillée conservée hors du bundle public
    dateDebut: '2025-02-01',
    dateSoumissionInventaire: '2026-09-08',
    statutDeveloppement: 'en_cours_developpement',
    sourceType: 'github_repo',
    sourceReference: 'Référence conservée dans le dossier privé d’inventaire',
    hasNoPublicApi: false,
    legalJustification: 'Constitution marocaine (accès universel aux droits) et standard d’inclusion numérique W3C/WAI',
    valeurMAD: 0,
  },
  {
    id: 'inv-05',
    code: 'PROJ-ISOC-RESEAU',
    projectName: 'Infrastructure ISOC & Passerelle Bancaire CIH',
    projectCategory: 'technologie',
    category: 'operationnel',
    categoryLabel: 'Accréditation & Intégration Bancaire Sécurisée',
    designation: 'Accréditation internationale ISOC N° 2374734, générateur de clés de licences cryptographiques et passerelle sécurisée de règlement CIH Bank.',
    effortHeuresMOC: 0, // Mesure détaillée conservée hors du bundle public
    dateDebut: '2025-05-10',
    dateSoumissionInventaire: '2026-09-08',
    statutDeveloppement: 'actif_operationnel',
    sourceType: 'autre',
    sourceReference: 'Référence conservée dans le dossier privé d’inventaire',
    hasNoPublicApi: false,
    legalJustification: 'Référentiel ISOC (Internet Society) et réglementation Bank Al-Maghrib sur les paiements instantanés',
    valeurMAD: 0,
  },
  {
    id: 'inv-06',
    code: 'PROJ-AI-INSPIRATION',
    projectName: 'Recherche IA & Modélisation Cognitive (IAP)',
    projectCategory: 'recherche_ia',
    category: 'incorporel',
    categoryLabel: 'Patrimoine Cognitif & Source d’Inspiration',
    designation: 'Travaux de conceptualisation doctrinale alimentant la réflexion humaine et les modèles d’intelligence artificielle, formalisant le constat d’« Information Attention Pénible » (IAP). Développé sur plateformes IA (DeepSeek, AI Studio) sans dépendance d’API obligatoire.',
    effortHeuresMOC: 0, // Mesure détaillée conservée hors du bundle public
    dateDebut: '2024-01-10',
    dateSoumissionInventaire: '2026-09-08',
    statutDeveloppement: 'recherche_continue',
    sourceType: 'deepseek_ai',
    sourceReference: 'Référence conservée dans le dossier privé d’inventaire',
    hasNoPublicApi: true, // Plateforme fermée sans API : formalisation par protocole probatoire
    legalJustification: 'Protection des œuvres de l’esprit, droits moraux inaliénables de l’auteur et propriété intellectuelle pré-normative',
    valeurMAD: 0,
  },
  {
    id: 'inv-07',
    code: 'PROJ-07',
    projectName: 'Écosystème OBJECTIO & Plateforme Multimodale (Dossier d’Investissement)',
    projectCategory: 'droit_positif',
    category: 'incorporel',
    categoryLabel: 'Actifs Immatériels & Propriété Intellectuelle',
    designation: 'DOSSIER TECHNIQUE & JURIDIQUE D’INVESTISSEMENT — Rapport d’évaluation et d’inventaire des apports en nature (Lois 17-95, 5-96, 17-97). Comprend 4 actifs majeurs scellés SHA-256 : Moteur Algorithmique Mīzān Al-Qisṭ & Sentinelle Cyber Loi 31-08, Plateforme Coopérative COO-DRIVE-IT Flotte & Billetterie, Méthodologie Industrielle BMM Chrono-Analyse, Système Fiduciaire MORCHID Modèles d’Actes D.O.C et ingénierie R&D multi-appareils. Déployé sur morchidit.morchidi.digital et Cloud Run.',
    effortHeuresMOC: 0, // Mesure détaillée conservée hors du bundle public
    dateDebut: '2026-08-15',
    dateSoumissionInventaire: '2026-09-08',
    statutDeveloppement: 'en_cours_developpement',
    sourceType: 'plateforme_sans_api',
    sourceReference: 'Référence conservée dans le dossier privé d’inventaire',
    hasNoPublicApi: true,
    legalJustification: 'Lois 17-95 et 5-96 (Sociétés commerciales), Loi 17-97 (Propriété industrielle), Articles 230+ du D.O.C et Loi 31-08',
    valeurMAD: 0,
  },
];

export const CIBLES_MARCHE_ROI: MarketTarget[] = [
  {
    id: 'target-1',
    title: 'Fondateurs de Startups & Porteurs de Projets Innovants',
    profilAcheteur: 'Créateurs d’entreprises (SARL, SAS, Auto-entrepreneurs) cherchant à consolider leurs fonds propres.',
    besoinFondamental: 'Augmenter le capital social de l’entreprise sans avoir à mobiliser du numéraire liquide.',
    beneficeROI: 'Bénéfice à évaluer : documenter les travaux et préparer leur examen par les professionnels compétents.',
    couvertureAntiInflation: 'La valeur éventuelle des actifs dépend d’une évaluation indépendante et des conditions du marché.',
    modaliteAcquisition: 'Souscription au pack d’inventaire réel & PV d’assemblée générale analysé par le Bureau des méthodes (Service S01 & S03).',
  },
  {
    id: 'target-2',
    title: 'Consultants, Concepteurs IA & Chercheurs Indépendants',
    profilAcheteur: 'Experts et intellectuels sources d’inspiration pour des tiers ou des systèmes d’IA (Victimes de l’« Information Attention Pénible » - IAP).',
    besoinFondamental: 'Prouver l’antériorité de leurs travaux et valoriser leur temps de recherche (MOC) face aux donneurs d’ordre.',
    beneficeROI: 'Aide à la documentation du temps et des coûts ; aucun prix ni droit à rémunération n’est garanti.',
    couvertureAntiInflation: 'La Minute d’Occupation Convertible (MOC) s’indexe sur la rareté du temps et de l’expertise humaine face à l’automatisation brute.',
    modaliteAcquisition: 'Licence d’exploitation de la méthodologie MOC & inventaire probatoire analysé par le Bureau des méthodes (S04 & S07).',
  },
  {
    id: 'target-3',
    title: 'PME & Sociétés Établies en Restructuration ou Transmission',
    profilAcheteur: 'Entreprises marocaines et internationales souhaitant valoriser leurs actifs immatériels cachés.',
    besoinFondamental: 'Améliorer les ratios de solvabilité bancaire (accès au crédit d’investissement, subventions Tamwilcom / Maroc PME).',
    beneficeROI: 'Levier financier : Les banques exigent des garanties et des fonds propres élevés ; l’apport en nature incorporel audité renforce la surface financière de 200k à 1M+ MAD.',
    couvertureAntiInflation: 'Préservation de la trésorerie active : Les liquidités de trésorerie restent disponibles pour l’exploitation pendant que le capital se consolide par l’immatériel.',
    modaliteAcquisition: 'Audit complet d’apport en nature avec rapport de consolidation et scellement d’état civil (S01, S03, S10).',
  },
  {
    id: 'target-4',
    title: 'Commissaires aux Apports, Experts-Comptables & Notaires',
    profilAcheteur: 'Professionnels du chiffre et du droit chargés d’attester la valeur des apports en nature devant le Tribunal de Commerce.',
    besoinFondamental: 'Disposer d’un référentiel mathématique probatoire, transparent et vérifiable pour motiver leur rapport officiel.',
    beneficeROI: 'Traçabilité préparatoire à examiner par les professionnels compétents ; aucune décharge de responsabilité n’est délivrée.',
    couvertureAntiInflation: 'Standardisation des barèmes d’évaluation des actifs technologiques à l’abri des fluctuations boursières ou monétaires.',
    modaliteAcquisition: 'Convention d’utilisation du portail de vérification et des matrices d’actes analysées par le Bureau des méthodes (S01 & S02).',
  },
];

// Variable légale de valeur d'apport liée dynamiquement à l'inventaire réel
export const OBJ_VALEUR_APPORT_NATURE: number = INVENTAIRE_REEL_APPORT.reduce(
  (total, item) => total + item.valeurMAD,
  0
);

// Total de l'effort cumulé en MOC
export const OBJ_TOTAL_EFFORT_MOC: number = INVENTAIRE_REEL_APPORT.reduce(
  (total, item) => total + item.effortHeuresMOC,
  0
);

export const OBJ_TOTAL_EFFORT_HEURES: number = Math.round(OBJ_TOTAL_EFFORT_MOC / 60);

export const OBJ_VALEUR_APPORT_NATURE_FORMATTED = `${OBJ_VALEUR_APPORT_NATURE.toLocaleString('fr-FR')} MAD`;

// Statut unique de toute valeur d'apport affichée (aucune valeur n'est « certifiée » avant le rapport du commissaire)
export const OBJ_STATUT_VALEUR_APPORT = 'Analysé par le Bureau des méthodes Objectio — valeur soumise à l’appréciation du commissaire aux apports';

export const LEGAL_IDENTITY: LegalIdentity = {
  founderName: 'Mohamed MORCHID',
  matricule: 'RC 16894 Settat',
  cin: 'Cabinet Mohamed MORCHID',
  birthInfo: 'Fondateur & Concepteur',
  rcNumber: '16894 Settat (en date du 04/03/2013)',
  ifNumber: '14412126',
  officialDomain: 'morchidit.morchidi.digital',
  cloudRunUrl: 'https://ais-pre-lwfoyx2sqftdrybjuojn4u-72607106913.europe-west1.run.app',
  valeurApportVariable: 'OBJ_VALEUR_APPORT_NATURE',
  valeurApportMontant: 0,
  certifiedContribution: 'En cours d’inventaire et d’évaluation — aucune valeur arrêtée',
  statutValeurApport: OBJ_STATUT_VALEUR_APPORT,
  iceNumber: '003707910000033',
  isocNumber: 'ISOC N° 2374734',
  officialEmail: 'contact@morchidi.digital',
  rib: '230 610 •••• •••• •••• •••• 95',
  portalDesignation: 'Portail de Droit Positif',
  jurisdiction: 'Royaume du Maroc • Registre d’Apport & Droit Positif',
  doctrinalNotice: {
    title: 'Doctrine Fondatrice & Statut de Concepteur Inspirateur',
    conceptIAP: 'Information Attention Pénible (IAP)',
    description:
      'Constat doctrinal dressé par Mohamed MORCHID (Fondateur) : En tant que créateur et source d’inspiration intellectuelle continue pour autrui — êtres humains comme modèles d’Intelligence Artificielle —, la sur-sollicitation cognitive et l’effort créatif soutenu constituent une « Information Attention Pénible » qui justifie la formalisation probatoire rigoureuse, la valorisation du temps en MOC/MOC+ et la protection inaliénable de l’ensemble de ses projets et actifs immatériels.',
  },
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 's01',
    code: 'S01',
    title: 'PV / Analyse probatoire',
    anchor: 'pv-certif',
    category: 'juridique',
    categoryLabel: 'Droit & Actes',
    tagline: 'Procès-Verbaux probatoires et analyse d’intégrité juridique',
    shortDesc: 'Établissement, horodatage et analyse probatoire des procès-verbaux d’assemblée, constats et déclarations sous seing privé.',
    legalBasis: 'Droit des Obligations et des Contrats (D.O.C) • Loi 53-05 relative à l’échange électronique de données juridiques.',
    features: [
      'Génération automatisée de PV d’Assemblée Générale Ordinaire et Extraordinaire',
      'Empreinte de conformité probatoire avec horodatage scellé',
      'Registre d’émargement analysé avec vérification d’identité',
      'Exportation destinée à la préparation et à la vérification par les parties compétentes'
    ],
    primaryMetric: {
      label: 'Valeur Probatoire',
      value: 'Portée à apprécier'
    }
  },
  {
    id: 's02',
    code: 'S02',
    title: 'Rédaction Objectio',
    anchor: 'redac',
    category: 'juridique',
    categoryLabel: 'Droit & Actes',
    tagline: 'Formalisme contractuel normé et rédaction d’actes de Droit Positif',
    shortDesc: 'Suite rédactionnelle analysée par le Bureau des méthodes pour contrats commerciaux, pactes d’associés, protocoles de cession et conventions spécifiques.',
    legalBasis: 'Code de Commerce marocain • Principes généraux du Droit Positif des affaires.',
    features: [
      'Bibliothèque de clauses pénales, de réserve de propriété et de confidentialité',
      'Assistant de cohérence textuelle et de conformité légale',
      'Gestion des annexes, avenants et conditions suspensives',
      'Vérification automatisée des mentions obligatoires'
    ],
    primaryMetric: {
      label: 'Actes Types',
      value: '48 Modèles'
    }
  },
  {
    id: 's03',
    code: 'S03',
    title: 'Business Plan & Suivi Opérationnel',
    anchor: 'business-plan',
    category: 'finance',
    categoryLabel: 'Finance & Stratégie',
    tagline: 'Structuration prudente des hypothèses, charges, recettes et jalons',
    shortDesc: 'Outil méthodologique de préparation d’un Business Plan. Aucun montant, financement ou résultat n’est présenté comme acquis.',
    legalBasis: 'Outil d’aide à la décision — validation comptable, fiscale et juridique externe selon le projet.',
    features: [
      'Hypothèses sourcées et datées',
      'Scénarios prudent, central et favorable',
      'Besoins de financement non présentés comme acquis',
      'Données réelles conservées dans le dossier privé'
    ],
    primaryMetric: {
      label: 'Statut public',
      value: 'Aucune valeur arrêtée'
    },
    sampleData: { statut: 'en_cours_inventaire_evaluation' }
  },
  {
    id: 's04',
    code: 'S04',
    title: 'Prix de Revient',
    anchor: 'prix-revient',
    category: 'finance',
    categoryLabel: 'Finance & Stratégie',
    tagline: 'Calcul analytique en MOC (Minute d\'Occupation Convertible) & MOC+',
    shortDesc: 'Décomposition analytique unitaire : valorisation du temps en MOC (Minute d\'Occupation Convertible), pondération MOC+ (complexité et risque juridique), charges directes et point mort en MAD.',
    legalBasis: 'Comptabilité analytique de gestion • Unité de mesure MOC/MOC+ • Règles fiscales sur les prix de transfert et marges réputées normales.',
    features: [
      'Unité analytique MOC (Minute d\'Occupation Convertible) : 1h = 60 MOC',
      'Facteur de pondération MOC+ : majoration pour haute technicité juridique et astreinte',
      'Ventilation dynamique charges directes, coût valorisé MOC+ et quote-part fixe',
      'Calcul instantané du seuil de rentabilité et du prix de vente conseillé en MAD'
    ],
    primaryMetric: {
      label: 'Unité Analytique',
      value: 'MOC & MOC+'
    },
    sampleData: {
      standardUnit: 'MOC (Minute d\'Occupation Convertible)',
      weightedUnit: 'MOC+ (Minute Majorée)',
      baseHourlyRateMAD: 250,
      baseMocRateMAD: 4.17
    }
  },
  {
    id: 's05',
    code: 'S05',
    title: "Convention d'Entraide",
    anchor: 'convention-entraide',
    category: 'juridique',
    categoryLabel: 'Droit & Actes',
    tagline: 'Protocoles de solidarité, coopération et mutualisation inter-entreprises',
    shortDesc: 'Cadre juridique sécurisé pour la mise en commun de moyens, assistance technique réciproque et partenariats stratégiques.',
    legalBasis: 'Articles 723 et suivants du D.O.C • Régime juridique des groupements d’intérêt et conventions d’assistance.',
    features: [
      'Encadrement de la non-subordination et indépendance juridique',
      'Clause de répartition équitable des charges mutualisées',
      'Mécanisme d’arbitrage amiable et résolution de différends',
      'Attestation de conformité déontologique'
    ],
    primaryMetric: {
      label: 'Sécurité Juridique',
      value: 'Cadre Bilatéral'
    }
  },
  {
    id: 's06',
    code: 'S06',
    title: 'Alerte Sécurité',
    anchor: 'alerte-securite',
    category: 'securite',
    categoryLabel: 'Sécurité & Risques',
    tagline: 'Veille réglementaire proactive et prévention des risques d’exploitation',
    shortDesc: 'Surveillance continue des obligations légales, délais de forclusion, échéances de conformité CNDP et alertes de vulnérabilité.',
    legalBasis: 'Loi 09-08 relative à la protection des données personnelles • Réglementation sur la conformité d’entreprise.',
    features: [
      'Niveaux de criticité gradués (Informatif, Vigilance, Critique)',
      'Décompte des délais légaux et calendrier des déclarations',
      'Check-lists de remédiation immédiate',
      'Journal d’audit horodaté pour démonstration de diligence raisonnable'
    ],
    primaryMetric: {
      label: 'Statut de Veille',
      value: 'Temps Réel'
    }
  },
  {
    id: 's07',
    code: 'S07',
    title: 'Gestion Licences',
    anchor: 'gestion-licences',
    category: 'tech',
    categoryLabel: 'Propriété & Tech',
    tagline: 'Administration des droits d’exploitation, brevets et actifs immatériels',
    shortDesc: 'Traçabilité des concessions de licences, périmètres territoriaux, redevances (royalties) et conformité des marques déposées.',
    legalBasis: 'Loi 17-97 relative à la protection de la propriété industrielle • Accords OMPI / OMPIC.',
    features: [
      'Registre centralisé des licences actives de l’écosystème Objectio',
      'Génération de certificats de concession d’usage exclusif / non-exclusif',
      'Suivi des redevances et contrôles d’intégrité logicielle',
      'Archivage cryptographique des contrats de licence'
    ],
    primaryMetric: {
      label: 'Actifs Immatériels',
      value: 'Protégés OMPIC'
    }
  },
  {
    id: 's08',
    code: 'S08',
    title: 'Grille Tarifaire',
    anchor: 'grille-tarifaire',
    category: 'finance',
    categoryLabel: 'Finance & Stratégie',
    tagline: 'Barème transparent des prestations et forfaits d’actes',
    shortDesc: 'Consultez la grille tarifaire officielle en Dirhams (MAD) : rédaction d’actes, audits de conformité, forfaits annuels et analyses probatoires.',
    legalBasis: 'Transparence tarifaire et information précontractuelle • Pratiques commerciales loyales.',
    features: [
      'Barème détaillé par typologie de prestation juridique et technique',
      'Simulateur de devis immédiat avec ventilation HT / TVA',
      'Conditions de règlement et modalités d’échelonnement',
      'Engagement de prix ferme avec attestation d’honoraires'
    ],
    primaryMetric: {
      label: 'Transparence',
      value: 'Devis Immédiat'
    }
  },
  {
    id: 's09',
    code: 'S09',
    title: 'Skill Generator',
    anchor: 'skill-generator',
    category: 'tech',
    categoryLabel: 'Propriété & Tech',
    tagline: 'Cartographie des compétences juridiques et référentiels de qualification',
    shortDesc: 'Outil de formalisation des compétences opérationnelles, matrices d’évaluation et fiches d’habilitation conformes aux standards ISOC.',
    legalBasis: 'Référentiels internationaux ISOC (Internet Society) • Normes de qualification professionnelle.',
    features: [
      'Générateur de matrices de compétences pondérées',
      'Évaluation d’aptitude réglementaire et juridique',
      'Attestation de qualification avec identifiant ISOC N° 2374734',
      'Cartographie dynamique des expertises métiers'
    ],
    primaryMetric: {
      label: 'Accréditation',
      value: 'ISOC N° 2374734'
    }
  },
  {
    id: 's10',
    code: 'S10',
    title: 'Paiement QR (CIH)',
    anchor: 'paiement-cih',
    category: 'finance',
    categoryLabel: 'Finance & Stratégie',
    tagline: 'Règlement instantané et sécurisé par QR Code bancaire CIH Bank',
    shortDesc: 'Générez ou scannez un QR Code bancaire pour virement instantané CIH Bank (RIB officiel transmis sur facture).',
    legalBasis: 'Réglementation Bank Al-Maghrib sur les paiements électroniques et virements instantanés.',
    features: [
      'Génération dynamique du code QR avec montant en MAD et numéro de dossier',
      'Passerelle sécurisée CIH Bank (Bénéficiaire : Cabinet Mohamed MORCHID)',
      'Génération de reçu d’opération probatoire avec hash de transaction scellé',
      'Compatible avec toutes les applications bancaires marocaines supportant le QR'
    ],
    primaryMetric: {
      label: 'Passerelle CIH Bank',
      value: '230 610 •••• 95'
    },
    sampleData: {
      ribExact: '230 610 •••• •••• •••• •••• 95',
      banque: 'CIH Bank',
      titulaire: 'Cabinet Mohamed MORCHID'
    }
  },
  {
    id: 's11',
    code: 'S11',
    title: 'Traducteur LSF/LSA',
    anchor: 'lsf-lsa',
    category: 'juridique',
    categoryLabel: 'Droit & Actes',
    tagline: 'Accessibilité juridique inclusive en Langue des Signes (LSF / LSA)',
    shortDesc: 'Transposition terminologique des concepts de Droit Positif en Langue des Signes Française (LSF) et Langue des Signes Arabe (LSA).',
    legalBasis: 'Convention ONU relative aux droits des personnes handicapées • Principes constitutionnels d’accès universel au Droit.',
    features: [
      'Lexique juridique bilingue spécialisé (Français / Arabe / Signes)',
      'Fiches illustrées de décomposition gestuelle pour concepts clés',
      'Transcription simplifiée pour justiciables sourds et malentendants',
      'Module d’assistance pour entretiens et signatures d’actes'
    ],
    primaryMetric: {
      label: 'Accessibilité',
      value: 'LSF & LSA Inclus'
    }
  },
  {
    id: 's12',
    code: 'S12',
    title: 'Carnet de Questions',
    anchor: 'carnet-questions',
    category: 'juridique',
    categoryLabel: 'Droit & Actes',
    tagline: 'Audit interrogatif, FAQ doctrinale et recueil des diligences',
    shortDesc: 'Base structurée d’interrogations juridiques, points de doctrine appliqués, formalités obligatoires et réponses argumentées en Droit Positif.',
    legalBasis: 'Doctrine juridique marocaine • Jurisprudence de la Cour de Cassation • Principes de sécurité juridique.',
    features: [
      'Recherche thématique ciblée (Sociétés, Fiscalité, Contrats, Responsabilité)',
      'Fiches de synthèse décisionnelle avec citations de textes légaux',
      'Formulaire de soumission de nouvelle question d’arbitrage',
      'Historique des consultations et conclusions probatoires'
    ],
    primaryMetric: {
      label: 'Base Doctrinale',
      value: 'Audit Structuré'
    }
  },
  {
    id: 's13',
    code: 'S13',
    title: 'Tri-Projet',
    anchor: 'tri-projet',
    category: 'tech',
    categoryLabel: 'Propriété & Tech',
    tagline: 'Matrice de décision multicritère, arbitrage et sélection stratégique',
    shortDesc: 'Modèle algorithmique de qualification de projets : alignement juridique, rentabilité prévisionnelle, risque réglementaire et faisabilité.',
    legalBasis: 'Gouvernance d’entreprise • Méthodes d’aide à la décision multicritère (AHP/ELECTRE) adaptées au Droit.',
    features: [
      'Scoring pondéré sur 4 axes (Juridique, Économique, Complexité, Urgence)',
      'Recommandation automatisée : Valider, Réviser, Ajourner ou Écarter',
      'Rapport d’arbitrage motivé pour assemblées ou investisseurs',
      'Matrice visuelle de positionnement stratégique'
    ],
    primaryMetric: {
      label: 'Algorithme',
      value: 'Scoring sur 100'
    }
  },
  {
    id: 's14',
    code: 'S14',
    title: 'Suivi Séquences',
    anchor: 'suivi-sequences',
    category: 'securite',
    categoryLabel: 'Sécurité & Risques',
    tagline: 'Chronogramme procédural, jalons légaux et échéanciers d’exécution',
    shortDesc: 'Traçabilité séquentielle des actes : rédaction, signature, enregistrement fiscal, dépôt au greffe, publication au Bulletin Officiel.',
    legalBasis: 'Procédures du Tribunal de Commerce • Délais légaux de publication et d’immatriculation.',
    features: [
      'Timeline dynamique par étapes clés de constitution ou modification',
      'Détection automatique des dépassements de délais réglementaires',
      'Rappels proactifs des formalités subséquentes',
      'Exportation du rapport séquentiel analysé par le Bureau des méthodes'
    ],
    primaryMetric: {
      label: 'Contrôle Procédural',
      value: '5 Jalons Clés'
    }
  },
  {
    id: 's15',
    code: 'S15',
    title: 'Générateur de QR',
    anchor: 'generateur-qr',
    category: 'tech',
    categoryLabel: 'Propriété & Tech',
    tagline: 'Empreintes QR haute définition pour actes, analyses probatoires et traçabilité',
    shortDesc: 'Générez des codes QR sécurisés contenant les signatures d’actes, métadonnées légales, liens profonds d’intégrité et attestations préparatoires Objectio.',
    legalBasis: 'Standard ISO/IEC 18004 • Norme de traçabilité documentaire et signature électronique.',
    features: [
      'Génération instantanée en direct avec prévisualisation et correction d’erreur',
      'Intégration automatique des métadonnées légales (ICE, ISOC, R/1970)',
      'Téléchargement haute résolution PNG ou vecteur SVG',
      'Test de lecture et validation de conformité du contenu'
    ],
    primaryMetric: {
      label: 'Résolution',
      value: 'Vectoriel & HD'
    }
  }
];

export const ECOSYSTEM_SITES_LIST: EcosystemSite[] = [
  {
    id: 'site-0',
    siteNumber: 'Site 0',
    name: 'Pôle Accompagnement & Entraide',
    nameAr: 'قطب المواكبة والتآزر',
    hash: '#entraide',
    tagline: 'Écoute, orientation et soutien des porteurs de projets',
    desc: 'Accompagnement solidaire des entrepreneurs, auto-entrepreneurs et citoyens dans la formalisation de leurs activités sans lien de subordination juridique.',
    category: 'Socio-Économique & Solidaire',
    iconName: 'HeartHandshake',
    url: 'https://ais-pre-lwfoyx2sqftdrybjuojn4u-72607106913.europe-west1.run.app/#entraide',
    status: 'operationnel',
  },
  {
    id: 'site-objectio',
    siteNumber: 'Site •',
    name: 'Écosystème OBJECTIO (Apport en Nature)',
    nameAr: 'منظومة أوبجيكتيو (الحصص العينية)',
    hash: '#objectio',
    tagline: 'Inventaire d’apport en nature & Scellement d’actifs immatériels — Analysé par le Bureau des méthodes Objectio — valeur soumise à l’appréciation du commissaire aux apports',
    desc: 'Plateforme centrale d’évaluation d’apport en nature (Lois 17-95, 5-96, 17-97), inventaire probatoire des efforts R&D et valorisation MOC / MOC+.',
    category: 'Ingénierie Juridique & Financière',
    iconName: 'Scale',
    url: 'https://ais-pre-lwfoyx2sqftdrybjuojn4u-72607106913.europe-west1.run.app/#objectio',
    status: 'operationnel',
  },
  {
    id: 'site-1',
    siteNumber: 'Site 1',
    name: 'Cyber-Défense Bancaire (Loi 31-08)',
    nameAr: 'الدفاع السيبراني البنكي وحماية المستهلك',
    hash: '#cyber',
    tagline: 'Moteur Mīzān Al-Qisṭ & Détection anti-phishing SMS bancaire',
    desc: 'Audit de vélocité transactionnelle, scanner d’usurpation bancaire (CIH, Attijariwafa) et génération de réquisitions légales selon la Loi 31-08.',
    category: 'Cyber-Sécurité & Droit Bancaire',
    iconName: 'ShieldAlert',
    url: 'https://ais-pre-lwfoyx2sqftdrybjuojn4u-72607106913.europe-west1.run.app/#cyber',
    status: 'operationnel',
  },
  {
    id: 'site-2',
    siteNumber: 'Site 2',
    name: 'Mobilité & Gestion de Flotte (COO-DRIVE-IT)',
    nameAr: 'كراء السيارات وإدارة الأساطيل التعاونية',
    hash: '#transport',
    tagline: 'Plateforme coopérative de flotte, billetterie et transport',
    desc: 'Gestion mutualisée de flottes pour agences de location, transport touristique, taxis et fret avec intégration de la pré-comptabilité Art. 145 CGI.',
    category: 'Transport & Mobilité Coopérative',
    iconName: 'Car',
    url: 'https://ais-pre-lwfoyx2sqftdrybjuojn4u-72607106913.europe-west1.run.app/#transport',
    status: 'operationnel',
  },
  {
    id: 'site-3',
    siteNumber: 'Site 3',
    name: 'Bureau Méthodes Magazine (BMM)',
    nameAr: 'مجلة مكتب المناهج والصناعة',
    hash: '#BMM',
    tagline: 'Chrono-analyse industrielle, SMED, MTM & Standards 5S',
    desc: 'Corpus méthodologique pour l’industrialisation textile et mécanique, calcul de temps de gamme opératoire et réduction des gaspillages de fabrication.',
    category: 'Ingénierie Industrielle & Méthodes',
    iconName: 'BookOpen',
    url: 'https://ais-pre-lwfoyx2sqftdrybjuojn4u-72607106913.europe-west1.run.app/#BMM',
    status: 'operationnel',
  },
  {
    id: 'site-4',
    siteNumber: 'Site 4',
    name: 'Rédacteur Public & Requêtes',
    nameAr: 'الكاتب العمومي والعرائض القانونية',
    hash: '#Rédacteur',
    tagline: 'Rédaction d’actes sous seing privé et requêtes administratives',
    desc: 'Cabinet numérique de rédaction juridique : baux commerciaux, protocoles transactionnels, correspondances officielles et actes sous seing privé conformes au D.O.C.',
    category: 'Rédaction d’Actes & Justice de Proximité',
    iconName: 'PenTool',
    url: 'https://ais-pre-lwfoyx2sqftdrybjuojn4u-72607106913.europe-west1.run.app/#Rédacteur',
    status: 'operationnel',
  },
  {
    id: 'site-5',
    siteNumber: 'Site 5',
    name: 'Fiduciaires MORCHID',
    nameAr: 'إئتمانية مرشد (المحاسبة والجبايات)',
    hash: '#Fiduciaires',
    tagline: 'Comptabilité Art. 145 CGI, Fiscalité SIMPL & Gestion Sociale',
    desc: 'Accompagnement fiduciaire complet : déclarations fiscales automatisées, conformité aux exigences de l’Administration Fiscale et audit de régularité des comptes.',
    category: 'Expertise Fiduciaire & Fiscale',
    iconName: 'Building2',
    url: 'https://ais-pre-lwfoyx2sqftdrybjuojn4u-72607106913.europe-west1.run.app/#Fiduciaires',
    status: 'operationnel',
  },
  {
    id: 'site-6',
    siteNumber: 'Site 6',
    name: 'Académie OBJECTIO (Guichet Unique)',
    nameAr: 'أكاديمية أوبجيكتيو (التكوين وشباك المواطن)',
    hash: '#academie',
    tagline: 'Formation Continue (Art. 37 Constitution) & Guichet Unique Citoyen',
    desc: 'Pôle de formation professionnelle et continue fondé sur l’Article 37 de la Constitution marocaine. Émancipation par la transmission des savoirs juridiques, techniques et numériques.',
    category: 'Formation Continue & Citoyenneté',
    iconName: 'GraduationCap',
    url: 'https://ais-pre-lwfoyx2sqftdrybjuojn4u-72607106913.europe-west1.run.app/#academie',
    status: 'en_cours_dns',
  },
];

export const DNS_CONFIGURATION_RECORDS: DnsRecordConfig[] = [
  {
    type: 'CNAME',
    name: 'morchidit',
    target: 'ghs.googlehosted.com.',
    ttl: 'Auto / 300s',
    proxyStatus: 'Proxied (Cloudflare)',
    purpose: 'Routage officiel du sous-domaine morchidit.morchidi.digital vers le cluster Google Cloud Run.',
  },
  {
    type: 'CNAME',
    name: 'morchidit (Alternative directe Cloudflare)',
    target: 'ais-pre-lwfoyx2sqftdrybjuojn4u-72607106913.europe-west1.run.app',
    ttl: 'Auto',
    proxyStatus: 'Proxied (Cloudflare)',
    purpose: 'Cible de secours en proxy Cloudflare pour acheminement direct sans délai de validation de domaine Google.',
  },
  {
    type: 'NS',
    name: 'morchidi.digital (Nameservers Namecheap)',
    target: 'elsa.ns.cloudflare.com / jim.ns.cloudflare.com (selon assignation Cloudflare)',
    ttl: 'Auto',
    proxyStatus: 'DNS only',
    purpose: 'Délégation de zone Namecheap vers Cloudflare pour protection DDoS, CDN mondial et SSL automatique.',
  },
  {
    type: 'TXT',
    name: 'morchidit.morchidi.digital',
    target: 'google-site-verification=XXXXXXXXXXXXXXXXXXXXX',
    ttl: 'Auto',
    proxyStatus: 'DNS only',
    purpose: 'Validation de propriété de domaine requise par Google Cloud Run Custom Domains.',
  },
];

export const BNC_ACCOUNT_DATA: BncAccountConfig = {
  bankName: 'Expérience bancaire personnelle historique au Canada',
  accountNumber: 'Donnée privée non publiée',
  accountHolder: 'Mohamed MORCHID',
  currencySupported: [],
  sigleCertification: 'Aucune certification bancaire revendiquée',
  status: 'historique_a_verifier',
  purpose: 'Initiative Canada en cours de réexamen juridique et opérationnel. Aucun partenariat ni compte professionnel actif n’est annoncé.'
};

export const MULTI_DEVICE_BUILD_EFFORT: MultiDeviceBuildEffort = {
  lastBuildDurationSeconds: 315, // 5.25 minutes de calcul et synthèse AI Studio
  smartphoneEffortHeures: 14.5, // 14h30 : cadrage doctrinal mobile, révision responsive, vérification terrain Settat
  computerEffortHeures: 18.5, // 18h30 : architecture Vite/TypeScript, protocoles D.O.C, DNS Cloudflare/Namecheap
  totalEffortHeures: 33.0, // 33 heures d'ingénierie collaborative
  totalEffortMOC: 1980, // 33h x 60 = 1 980 MOC
  tauxHoraireExpertiseMAD: 650, // Barème légal de consultation d'ingénierie sociale & technologique
  valeurSessionMAD: 21450, // 33h * 650 MAD
  mentionReserveCommissariat: "INVENTAIRE EN COURS : les éléments et preuves sont conservés dans le dossier privé. Aucune valeur ni opération sur capital n’est arrêtée.",
  statutApprobation: 'declare_fondateur'
};

export const INTERNATIONAL_INVOICE_DEFAULT: InternationalInvoiceData = {
  invoiceNumber: 'NON-EMISE', dateEmission: '', beneficiairePrincipal: '', ice: '', rcSettat: '',
  destinataireOrganisation: 'Aucun destinataire acquis', destinataireAdresse: '',
  objetMission: 'Projet préparatoire privé — aucune facture transmise', bncAccountNumber: 'Donnée privée non publiée',
  lines: [], totalUSD: 0, tauxChangeUSD_MAD: 0, totalMAD: 0,
  mentionStrategie: 'Aucun financement, partenariat ou règlement n’est présenté comme acquis.'
};

export const BUSINESS_PLAN_PROJECTIONS: BusinessPlanYearProjection[] = [];
export const BUSINESS_PLAN_TRACKING_MILESTONES: BusinessPlanMilestone[] = [];
