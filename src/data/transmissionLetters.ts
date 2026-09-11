import { 
  LEGAL_IDENTITY, 
  BNC_ACCOUNT_DATA, 
  INTERNATIONAL_INVOICE_DEFAULT,
  MULTI_DEVICE_BUILD_EFFORT 
} from './servicesData';

export type RecipientKey = 
  | 'pnud' 
  | 'worldbank' 
  | 'eu' 
  | 'afdb' 
  | 'multilateral' 
  | 'prive' 
  | 'google';

export const SENDER_OFFICIAL_EMAIL = LEGAL_IDENTITY.officialEmail || 'contact@morchidi.digital';
export const PRIVATE_EMAIL_LOGIN_URL = 'https://privateemail.com';

export interface RecipientProfile {
  id: RecipientKey;
  shortLabel: string;
  badge: string;
  badgeStyle: string;
  name: string;
  division: string;
  salutation: string;
  reference: string;
  targetObjective: string;
  programmeCible: string;
  montantNote: string;
  subject: string;
  suggestedEmail: string;
  generateLetter: () => string;
}

const COMMON_HEADER = (ref: string, date: string, name: string, division: string, salutation: string, object: string) => `CABINET DE CONSULTING & CONSEIL SOCIAL MOHAMED MORCHID
Marque & Sigle d'Expertise Industrielle : BMM* (Bureau Méthodes Magazine)
Titulaire Fondateur : ${LEGAL_IDENTITY.founderName} (État Civil ${LEGAL_IDENTITY.matricule} • CIN ${LEGAL_IDENTITY.cin})
E-mail Officiel : ${SENDER_OFFICIAL_EMAIL} • Siège : Settat (Royaume du Maroc)
RC ${LEGAL_IDENTITY.rcNumber} • ICE ${LEGAL_IDENTITY.iceNumber} • IF ${LEGAL_IDENTITY.ifNumber}
Internet Society ISOC N° ${LEGAL_IDENTITY.isocNumber}
Domiciliation Bancaire Internationale : BANQUE NATIONALE DU CANADA (BNC) — Compte N° ${BNC_ACCOUNT_DATA.accountNumber}

RÉFÉRENCE DOSSIER : ${ref}
DATE D'ÉMISSION : ${date}

DESTINATAIRE OFFICIEL :
${name}
${division}
${salutation}

OBJET :
${object}`;

const COMMON_SIGNATURE = `Restant à votre disposition pour toute séance d'instruction technique ou démonstration de l'architecture déployée sur morchidit.morchidi.digital, je vous prie d'agréer l'expression de ma très haute considération.

Fait à Settat, le ${INTERNATIONAL_INVOICE_DEFAULT.dateEmission}

Mohamed MORCHID
Fondateur, Conseiller Référent & Secrétaire Général
Titulaire CIN ${LEGAL_IDENTITY.cin} • État Civil ${LEGAL_IDENTITY.matricule}
E-mail Officiel : ${SENDER_OFFICIAL_EMAIL}
Immatriculé au RC 16894 Settat (04/03/2013) • ICE 003707910000033
Certifié sous le sceau méthodologique d'ingénierie BMM*`;

export const TRANSMISSION_RECIPIENTS: Record<RecipientKey, RecipientProfile> = {
  pnud: {
    id: 'pnud',
    shortLabel: 'PNUD / UNDP',
    badge: 'ODD & Inclusion Citoyenne',
    badgeStyle: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    name: 'Programme des Nations Unies pour le Développement (PNUD / UNDP)',
    division: 'Bureau Régional pour les États Arabes & Division de la Transition Numérique et de l’Inclusion Sociale',
    salutation: 'À l’attention de Monsieur/Madame le Représentant Résident du PNUD',
    reference: 'PNUD-UNDP-NUM-2026/01-BMM',
    targetObjective: 'Inclusion sociale, accès universel et gratuit au Droit Positif (0,00 MAD usager) selon l’Art. 37 de la Constitution, et atteinte des Objectifs de Développement Durable (ODD 1, 8, 9, 10, 16).',
    programmeCible: 'Programme d’Appui aux Initiatives Numériques Inclusives & Résilience Communautaire',
    montantNote: `$${INTERNATIONAL_INVOICE_DEFAULT.totalUSD.toLocaleString()} USD (${INTERNATIONAL_INVOICE_DEFAULT.totalMAD.toLocaleString()} MAD)`,
    subject: `Transmission Note d’Honoraires BMM* & Prise en Charge Cloud IA (Réf: PNUD-UNDP-NUM-2026/01-BMM)`,
    suggestedEmail: 'registry.ma@undp.org',
    generateLetter: () => {
      const header = COMMON_HEADER(
        'PNUD-UNDP-NUM-2026/01-BMM',
        INTERNATIONAL_INVOICE_DEFAULT.dateEmission,
        'Programme des Nations Unies pour le Développement (PNUD / UNDP)',
        'Bureau Régional & Division de la Transition Numérique et de l’Inclusion Sociale',
        'À l’attention de Monsieur/Madame le Représentant Résident du PNUD',
        'Transmission de Note d’Honoraires de Consulting & Demande de Prise en Charge d’Infrastructure Cloud IA — Guichet Unique Citoyen et Droit Positif (Objectifs ODD 1, 8, 9, 10 & 16)'
      );
      return `${header}

Excellence, Monsieur/Madame le Représentant Résident,

En ma qualité de Fondateur, Secrétaire Général et Conseiller Référent du Cabinet Mohamed MORCHID (RC 16894 Settat, ICE 003707910000033), j’ai l’honneur de soumettre à votre haute appréciation le dossier d'ingénierie et la présente note d’honoraires certifiée sous le sigle d'expertise BMM*.

1. CONVERGENCE DIRECTE AVEC LES OBJECTIFS DU PNUD (ODD 1, 8, 9, 10 & 16) :
Le projet que nous développons à Settat matérialise un « Guichet Unique Citoyen » fondé sur l'Article 37 de la Constitution du Royaume du Maroc. Il offre 15 services de Droit Positif et de médiation sociale en accès libre et total pour les populations (0,00 MAD exigé des usagers), contribuant directement à :
- L’éradication de la précarité juridique et administrative des citoyens les plus vulnérables (ODD 1 & 10) ;
- L’accès transparent à la justice sociale, à l'arbitrage amiable et à l'intégrité probatoire (ODD 16) ;
- La promotion du travail décent, de l'auto-emploi et de la formalisation des activités économiques (ODD 8 & 9).

2. MÉCANISME « 0,00 MAD DÉCAISSÉ » & PRISE EN CHARGE PAR LE PNUD :
Pour pérenniser cette gratuité inconditionnelle au guichet citoyen tout en rémunérant l'ingénierie de conception et l'infrastructure Cloud IA (Google AI Studio et conteneurs Cloud Run), notre modèle repose sur une prise en charge par les bailleurs multilatéraux.
La note d’honoraires de consulting ci-jointe, d'un montant de $6 600 USD (équivalent 66 000 MAD), correspond à 55 heures d'ingénierie hautement qualifiée déployées sur le terrain, incluant l'adossement aux modèles de fondation IA pour le raisonnement de droit positif.

3. COORDONNÉES DE RÈGLEMENT INTERNATIONAL (BANQUE NATIONALE DU CANADA) :
Conformément aux protocoles des subventions internationales, le virement en devises est attendu sur le compte dédié domicilié au Canada :
- Établissement : BANQUE NATIONALE DU CANADA (BNC / National Bank of Canada)
- Domiciliation : Centre Financier BNC, Montréal (Québec), Canada
- Numéro de Compte : ${BNC_ACCOUNT_DATA.accountNumber}
- Bénéficiaire : Mohamed MORCHID (Sigle BMM*)

4. LIAISON AUTOMATISÉE AVEC LA FACTURATION CLOUD IA :
Dès versement de cette subvention sur notre compte BNC, ce moyen de paiement international sera connecté à la facturation de l'infrastructure Google Cloud, assurant l'autonomie intégrale de la plateforme sans exiger la moindre avance de trésorerie sur les deniers propres du fondateur au Maroc.

5. RÉSERVE FORMELLE POUR LE COMMISSARIAT AUX APPORTS :
Il est formellement acté que cette intervention s’intègre dans un ensemble patrimonial d’apport en nature certifié, dont un portefeuille complémentaire de logiciels et méthodes demeure en réserve probatoire opposable auprès du Tribunal de Commerce.

${COMMON_SIGNATURE}`;
    }
  },

  worldbank: {
    id: 'worldbank',
    shortLabel: 'Banque Mondiale',
    badge: 'Modernisation & Climat des Affaires',
    badgeStyle: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    name: 'Groupe de la Banque Mondiale (BIRD / SFI)',
    division: 'Département Développement Numérique, Gouvernance Publique & Climat des Investissements',
    salutation: 'À l’attention de la Direction des Opérations Pays & Responsables des Programmes de Modernisation',
    reference: 'WB-BIRD-MODERN-2026/02-BMM',
    targetObjective: 'Modernisation administrative, dématérialisation des formalités, conversion du capital immatériel en capital social bilantiel (Lois 17-95 et 5-96) et inclusion financière des PME/TPE.',
    programmeCible: 'Programme d’Accélération Numérique pour la Compétitivité et l’Inclusion Économique',
    montantNote: `$${INTERNATIONAL_INVOICE_DEFAULT.totalUSD.toLocaleString()} USD (${INTERNATIONAL_INVOICE_DEFAULT.totalMAD.toLocaleString()} MAD)`,
    subject: `Requête d’Allocation Modernisation Numérique & Note d’Honoraires BMM* (Réf: WB-BIRD-MODERN-2026/02-BMM)`,
    suggestedEmail: 'morocco@worldbank.org',
    generateLetter: () => {
      const header = COMMON_HEADER(
        'WB-BIRD-MODERN-2026/02-BMM',
        INTERNATIONAL_INVOICE_DEFAULT.dateEmission,
        'Groupe de la Banque Mondiale (BIRD / SFI)',
        'Département Développement Numérique, Gouvernance Publique & Climat des Investissements',
        'À l’attention de la Direction des Opérations Pays & Responsables des Programmes de Modernisation',
        'Requête d’Allocation au titre de la Modernisation Numérique des Formalités, Valorisation du Capital Immatériel et Climat des Investissements'
      );
      return `${header}

Madame, Monsieur le Directeur des Opérations,

En ma qualité de Fondateur du Cabinet Mohamed MORCHID (RC 16894 Settat, ICE 003707910000033), j’ai l’honneur de vous transmettre le dossier d’ingénierie et la note d’honoraires de consulting BMM* s’inscrivant dans vos axes d’intervention sur la gouvernance économique et la transformation numérique.

1. MODERNISATION DU CLIMAT DES AFFAIRES & FORMALISATION DES ACTIFS IMMATÉRIELS :
Notre plateforme opérationnelle (morchidit.morchidi.digital) résout l'un des goulets d'étranglement majeurs identifiés par la Banque Mondiale dans les économies émergentes : la sous-capitalisation des PME et l'incapacité à mobiliser leurs actifs immatériels.
À travers nos modules de certification probatoire et d'apport en nature (Lois 17-95, 5-96 et 17-97), nous permettons aux créateurs d'entreprises et chercheurs de convertir des milliers d'heures de R&D (MOC) en fonds propres certifiés, sans dilapidation de numéraire liquide.

2. IMPACT DIRECT SUR L'INCLUSION FINANCIÈRE ET LA DÉMATÉRIALISATION :
Grâce à notre architecture multi-services (procès-verbaux certifiés, clauses d'arbitrage sans subordination, médiation de droit positif, et cybersécurité bancaire Loi 31-08 avec le module Mīzān Al-Qisṭ), nous offrons un cadre institutionnel rigoureux abaissant drastiquement les coûts de transaction pour les opérateurs économiques.

3. SOUTIEN À L’INFRASTRUCTURE & NOTE D’HONORAIRES CERTIFIÉE ($6 600 USD) :
Nous sollicitons l'imputation de notre note d'honoraires de consulting ($6 600 USD / 66 000 MAD) sur vos fonds d'assistance technique à la dématérialisation et à la facilitation citoyenne. Cette enveloppe couvre l'ingénierie de déploiement et l'interfaçage Cloud IA sous gouvernance stricte.

4. DOMICILIATION INTERNATIONALE POUR VIREMENT DE SUBVENTION :
Le règlement en devises est à opérer sur notre compte international certifié :
- Établissement : BANQUE NATIONALE DU CANADA (BNC)
- Domiciliation : Centre Financier BNC, Montréal (Québec), Canada
- Compte N° : ${BNC_ACCOUNT_DATA.accountNumber}
- Bénéficiaire : Mohamed MORCHID (Cabinet BMM*)

5. CLAUSE COMMISSARIAT AUX APPORTS :
Ce dossier s'articule avec un apport en nature immatériel évalué et documenté, soumis aux règles d'opposabilité légale devant le Tribunal de Commerce compétent.

${COMMON_SIGNATURE}`;
    }
  },

  eu: {
    id: 'eu',
    shortLabel: 'Union Européenne',
    badge: 'Coopération NDICI & Droits Sociaux',
    badgeStyle: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    name: 'Union Européenne (Commission Européenne - DG INTPA)',
    division: 'Direction Générale des Partenariats Internationaux / Délégation de l’Union Européenne auprès du Royaume du Maroc',
    salutation: 'À l’attention de Monsieur/Madame le Chef de la Délégation de l’Union Européenne',
    reference: 'UE-INTPA-NDICI-2026/03-BMM',
    targetObjective: 'Partenariat euro-marocain de prospérité partagée, convergence réglementaire de protection sociale et numérique, appui à la société civile et à l’Économie Sociale et Solidaire (ESS).',
    programmeCible: 'Instrument de Voisinage, de Coopération au Développement et de Coopération Internationale (NDICI - Europe dans le Monde)',
    montantNote: `$${INTERNATIONAL_INVOICE_DEFAULT.totalUSD.toLocaleString()} USD (${INTERNATIONAL_INVOICE_DEFAULT.totalMAD.toLocaleString()} MAD)`,
    subject: `Dossier Partenariat Numérique NDICI & Note d’Honoraires BMM* (Réf: UE-INTPA-NDICI-2026/03-BMM)`,
    suggestedEmail: 'delegation-morocco@eeas.europa.eu',
    generateLetter: () => {
      const header = COMMON_HEADER(
        'UE-INTPA-NDICI-2026/03-BMM',
        INTERNATIONAL_INVOICE_DEFAULT.dateEmission,
        'Union Européenne (Commission Européenne - DG INTPA)',
        'Délégation de l’Union Européenne auprès du Royaume du Maroc • Section Coopération & Transition Numérique',
        'À l’attention de Monsieur/Madame le Chef de la Délégation de l’Union Européenne',
        'Soumission de Dossier d’Ingénierie & Note d’Honoraires — Partenariat UE-Maroc pour la Transition Numérique Juste et la Protection des Droits Sociaux'
      );
      return `${header}

Excellence, Madame/Monsieur le Chef de la Délégation,

Dans le cadre du partenariat stratégique et privilégié unissant le Royaume du Maroc et l’Union Européenne, j’ai l’honneur de vous présenter le dossier d’ingénierie du cabinet Mohamed MORCHID (RC 16894 Settat, ICE 003707910000033), portant sur la plateforme de Droit Positif et de médiation sociale OBJECTIO.

1. ALIGNEMENT AVEC LES PRIORITÉS DE L’INSTRUMENT NDICI (EUROPE DANS LE MONDE) :
Notre initiative s’inscrit au cœur des objectifs de la coopération bilatérale UE-Maroc :
- Une transition numérique juste, inclusive et protectrice des droits fondamentaux ;
- Le renforcement de l’accès à la justice et au droit par le biais d'outils numériques souverains ;
- La protection des consommateurs et des usagers de services financiers contre les clauses abusives (module Cyber Sentinelle Loi 31-08 / Mīzān Al-Qisṭ) ;
- Le soutien aux modèles de l'Économie Sociale et Solidaire garantissant l'accès universel sans barrière marchande.

2. COUVERTURE DES FRAIS D’EXPERTISE & INFRASTRUCTURE CLOUD IA ($6 600 USD) :
Afin de préserver la gratuité d'accès pour les citoyens tout en valorisant 55 heures de consulting d'ingénierie certifiée (méthodes industrielles BMM*, modélisation de conformité probatoire et intégration d’IA sobre), nous sollicitons la prise en charge de cette note d’honoraires par l'instrument européen de coopération.

3. MODALITÉS DE VERSEMENT BANCAIRE INTERNATIONAL :
Le versement en devises (USD ou contre-valeur EUR) est à ordonnancer au profit de :
- Banque : BANQUE NATIONALE DU CANADA (BNC / National Bank of Canada)
- Siège de l'établissement : Montréal, Québec, Canada
- Compte N° : ${BNC_ACCOUNT_DATA.accountNumber}
- Titulaire : Mohamed MORCHID (Cabinet de Consulting BMM*)

4. TRANSPARENCE ET CONTRÔLE COMPTABLE :
Ce versement alimentera directement le compte de facturation Cloud hébergeant les conteneurs Cloud Run et les modèles Google AI Studio, garantissant une utilisation 100% traçable et dédiée à l'intérêt général.

${COMMON_SIGNATURE}`;
    }
  },

  afdb: {
    id: 'afdb',
    shortLabel: 'Banque Africaine (BAD)',
    badge: 'Innovation Panafricaine & Industrie',
    badgeStyle: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    name: 'Banque Africaine de Développement (Groupe de la BAD)',
    division: 'Département de l’Innovation Numérique, du Développement Technologique et du Secteur Privé',
    salutation: 'À l’attention du Directeur Régional & Coordonnateur du Fonds d’Innovation Numérique pour l’Afrique',
    reference: 'BAD-AFDB-INNOV-2026/04-BMM',
    targetObjective: 'Déploiement de solutions souveraines africaines de droit positif, productivité industrielle (Chrono-analyse SMED BMM*) et résilience technologique face aux chocs exogènes.',
    programmeCible: 'Fonds Spécial d’Innovation Technologique et d’Appui aux PME Africaines',
    montantNote: `$${INTERNATIONAL_INVOICE_DEFAULT.totalUSD.toLocaleString()} USD (${INTERNATIONAL_INVOICE_DEFAULT.totalMAD.toLocaleString()} MAD)`,
    subject: `Transition Numérique & Solutions Souveraines BMM* (Réf: BAD-AFDB-INNOV-2026/04-BMM)`,
    suggestedEmail: 'morocco@afdb.org',
    generateLetter: () => {
      const header = COMMON_HEADER(
        'BAD-AFDB-INNOV-2026/04-BMM',
        INTERNATIONAL_INVOICE_DEFAULT.dateEmission,
        'Banque Africaine de Développement (Groupe de la BAD)',
        'Bureau Régional Afrique du Nord & Département de l’Innovation et du Secteur Privé',
        'À l’attention du Directeur Régional & Coordonnateur du Fonds d’Innovation Numérique',
        'Requête de Prise en Charge d’Ingénierie & Infrastructure Numérique Panafricaine — Solutions Souveraines de Droit Positif et Méthodes Industrielles BMM*'
      );
      return `${header}

Monsieur le Directeur Régional,

En ma qualité de Fondateur du Cabinet Mohamed MORCHID (RC 16894 Settat, ICE 003707910000033), j’ai l’honneur de vous soumettre notre dossier de partenariat technique et la présente note d’honoraires de consulting d'ingénierie certifiée BMM*.

1. CONTRIBUTION À LA STRATÉGIE DE TRANSFORMATION INDUSTRIELLE DE LA BAD :
L'Afrique a un besoin impératif de solutions technologiques conçues par et pour ses réalités. Notre écosystème déploie deux leviers cruciaux :
- Le Pôle Bureau Méthodes Magazine (BMM*) : Méthodologie éprouvée de chrono-analyse industrielle et d'optimisation des postes (SMED), permettant aux unités manufacturières africaines de réduire leurs temps de changement d'outils et de maximiser leur productivité sans investissements lourds en capital étranger ;
- Le Guichet Unique Citoyen : Un socle de Droit Positif dématérialisé permettant de sécuriser les contrats, les baux, les protocoles d'arbitrage et la protection des entrepreneurs contre la bureaucratie informelle.

2. FORMALISATION DES ACTIFS IMMATÉRIELS AFRICAINS :
Nous apportons une doctrine financière novatrice permettant de transformer le temps de recherche et d'ingénierie locale (mesuré en Minutes d'Occupation Convertibles - MOC) en capital social officiel opposable aux banques, consolidant ainsi la solvabilité des entreprises africaines.

3. ALLOCATION FINANCIÈRE SOLLICITÉE ($6 600 USD) :
Nous sollicitons l'attribution d'une subvention de $6 600 USD (66 000 MAD) pour couvrir la note d'honoraires de 55 heures de consulting et l'infrastructure Cloud IA requise pour desservir la communauté des usagers.

4. CANAL DE VIREMENT BANCAIRE INTERNATIONAL :
- Établissement : BANQUE NATIONALE DU CANADA (BNC)
- Adresse : Montréal (Québec), Canada
- Compte N° : ${BNC_ACCOUNT_DATA.accountNumber}
- Bénéficiaire : Mohamed MORCHID (Sigle BMM*)

${COMMON_SIGNATURE}`;
    }
  },

  multilateral: {
    id: 'multilateral',
    shortLabel: 'Canada & Agences Multilatérales',
    badge: 'Affaires Mondiales Canada & BNC',
    badgeStyle: 'bg-red-500/10 text-red-400 border-red-500/30',
    name: 'Agences de Coopération Internationale Multilatérale (Affaires Mondiales Canada, AFD, KfW, DDC)',
    division: 'Direction de la Coopération Internationale & Programme d’Appui aux Concepteurs et Chercheurs Indépendants',
    salutation: 'À l’attention des Coordonnateurs des Programmes de Coopération Internationale et Bilatérale',
    reference: 'GAC-COOP-BNC-2026/05-BMM',
    targetObjective: 'Reconnaissance du statut de concepteur-chercheur inspirateur, valorisation de la Minute d’Occupation Convertible (MOC) face à l’IAP, et synergie bilatérale directe avec la Banque Nationale du Canada (Compte 11-496-06).',
    programmeCible: 'Programme d’Appui à l’Innovation Sociale, à la Recherche Indépendante et à la Transition Éthique',
    montantNote: `$${INTERNATIONAL_INVOICE_DEFAULT.totalUSD.toLocaleString()} USD (${INTERNATIONAL_INVOICE_DEFAULT.totalMAD.toLocaleString()} MAD)`,
    subject: `Coopération Multilatérale ESS & Domiciliation BNC (Réf: GAC-COOP-BNC-2026/05-BMM)`,
    suggestedEmail: 'cooperation-internationale@international.gc.ca',
    generateLetter: () => {
      const header = COMMON_HEADER(
        'GAC-COOP-BNC-2026/05-BMM',
        INTERNATIONAL_INVOICE_DEFAULT.dateEmission,
        'Affaires Mondiales Canada & Agences de Coopération Internationale (AFD, KfW, DDC)',
        'Direction des Partenariats Internationaux pour la Transition Numérique et l’Innovation Sociale',
        'À l’attention de la Direction de la Coopération Bilatérale et du Développement',
        'Note d’Honoraires de Consulting Certifiée & Domiciliation Bancaire Canadienne — Reconnaissance du Statut de Concepteur-Chercheur et Soutien à l’Écosystème OBJECTIO'
      );
      return `${header}

Madame, Monsieur le Directeur,

En ma qualité de Fondateur du Cabinet Mohamed MORCHID (État Civil 964 R/1970, RC 16894 Settat, ICE 003707910000033), j’ai l’honneur de vous présenter notre dossier d’ingénierie et la présente note d’honoraires de consulting sous le sigle BMM*.

1. FONDEMENT DOCTRINAL : STATUT DE CONCEPTEUR-CHERCHEUR INSPIRATEUR :
En tant que source continue de recherche conceptuelle et doctrinale pour autrui — humains comme architectures d'IA —, l'effort créatif intense constitue une « Information Attention Pénible » (IAP) nécessitant une juste compensation et une protection juridique rigoureuse.
Notre doctrine repose sur l'unité de mesure universelle du temps de travail cognitif : la Minute d'Occupation Convertible (MOC), dont 168 000 unités (2 800 heures certifiées) composent notre inventaire réel d'apport en nature.

2. SYNERGIE DIRECTE AVEC LA DOMICILIATION BANCAIRE CANADIENNE :
Pour assurer une sécurité fiduciaire absolue et un respect strict des standards internationaux de conformité antiblanchiment, l'ensemble des flux en devises de cette coopération est domicilié au Canada :
- Établissement Financier : BANQUE NATIONALE DU CANADA (BNC / National Bank of Canada)
- Siège de Domiciliation : Montréal (Québec), Canada
- Numéro de Compte : ${BNC_ACCOUNT_DATA.accountNumber}
- Titulaire : Mohamed MORCHID (Cabinet de Consulting BMM*)

3. OBJET DE LA NOTE DE CONSULTING ($6 600 USD) :
Ce règlement de $6 600 USD (66 000 MAD) couvre 55 heures d'expertise spécialisée (ingénierie de guichet unique, chrono-analyse industrielle, cyber-défense bancaire Loi 31-08 et interfaçage avec les modèles Google AI Studio).
Il concrétise le principe d'autofinancement « 0,00 MAD Décaissé » : l'infrastructure Cloud Run et les API d'IA s'alimentent directement sur cette subvention, sanctuarisant la gratuité citoyenne au Maroc.

4. RÉSERVE JURIDIQUE COMMISSARIAT AUX APPORTS :
Les actifs développés font l'objet d'un rapport d'apport en nature et demeurent placés sous réserve d'instruction formelle devant les juridictions de commerce.

${COMMON_SIGNATURE}`;
    }
  },

  prive: {
    id: 'prive',
    shortLabel: 'Partenaire Privé (B2B BMM*)',
    badge: 'Chrono-Analyse BMM* & SMED',
    badgeStyle: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    name: 'Directions Générales, Industrielles et Financières (Secteur Privé & Groupes Industriels)',
    division: 'Direction des Méthodes Industrielles, Chrono-Analyse de Postes & Optimisation des Processus SMED',
    salutation: 'À l’attention de la Direction Financière & Achats de Prestations Intellectuelles',
    reference: 'BMM-B2B-SMED-2026/06-BMM',
    targetObjective: 'Missions de chrono-analyse industrielle de postes, réduction drastique des temps de changement de série (SMED), audit d’atelier et valorisation bilantielle d’actifs incorporels.',
    programmeCible: 'Mandat de Prestation de Conseil Industriel & Optimisation de Rendement Opérationnel',
    montantNote: `$${INTERNATIONAL_INVOICE_DEFAULT.totalUSD.toLocaleString()} USD (${INTERNATIONAL_INVOICE_DEFAULT.totalMAD.toLocaleString()} MAD)`,
    subject: `Facture Consulting Industriel Chrono-Analyse SMED BMM* (Réf: BMM-B2B-SMED-2026/06-BMM)`,
    suggestedEmail: 'direction.financiere@partenaire-industriel.com',
    generateLetter: () => {
      const header = COMMON_HEADER(
        'BMM-B2B-SMED-2026/06-BMM',
        INTERNATIONAL_INVOICE_DEFAULT.dateEmission,
        'Direction Financière & Achats Prestations Intellectuelles',
        'Direction des Méthodes, Chrono-Analyse Industrielle & Optimisation des Processus SMED',
        'À l’attention de la Direction Financière et de la Direction des Opérations',
        'Facture de Consulting d’Ingénierie Industrielle BMM* — Chrono-Analyse de Postes, Réduction des Temps de Réglage (SMED) et Valorisation d’Actifs'
      );
      return `${header}

Monsieur le Directeur Financier, Monsieur le Directeur Industriel,

Faisant suite à nos interventions d'audit méthodologique et de chrono-analyse industrielle, j’ai l’honneur de vous adresser la facture de consulting certifiée émise par le Cabinet Mohamed MORCHID sous le sigle professionnel BMM* (Bureau Méthodes Magazine).

1. SYNTHÈSE DES LIVRABLES ET DES INTERVENTIONS D'INGÉNIERIE :
Nos travaux conduits selon les standards rigoureux du Bureau Méthodes portent sur :
- L’analyse chronométrée précise des postes de travail et le diagnostic des gaspillages de temps de manipulation (élimination des MOC improductives) ;
- La conception et le déploiement du protocole SMED (Single Minute Exchange of Die) permettant de réduire les temps de changement de série de 45% à 70% dès la première phase d’implémentation ;
- L’établissement des matrices de cadencement et fiches d'instructions de poste certifiées opposables aux audits de certification qualité ;
- Le conseil en formalisation d'actifs incorporels et valorisation d'apports en nature (Lois 17-95 et 5-96) consolidant les capitaux propres de votre entreprise.

2. DÉCOMPOSITION DU MONTANT DES HONORAIRES :
Le montant global de la présente note d’honoraires s'élève à $6 600 USD (soit 66 000 MAD), décomposé comme suit :
- 55 heures d'expertise spécialisée au taux contractuel de $120 USD / heure (1 200 MAD / heure) ;
- Prestation intellectuelle exonérée de TVA locale au titre des règles d'exportation de consulting d'ingénierie et conventions applicables.

3. COORDONNÉES DE RÈGLEMENT PAR VIREMENT BANCAIRE :
Le paiement est exigible par virement direct en devises USD (ou équivalent CAD) sur notre compte de domiciliation internationale :
- Banque : BANQUE NATIONALE DU CANADA (BNC / National Bank of Canada)
- Domiciliation : Centre Financier BNC, Montréal (Québec), Canada
- Numéro de Compte : ${BNC_ACCOUNT_DATA.accountNumber}
- Titulaire : Mohamed MORCHID (Sigle BMM*)

${COMMON_SIGNATURE}`;
    }
  },

  google: {
    id: 'google',
    shortLabel: 'Google Cloud & AI Studio',
    badge: 'Cloud IA & Pay-Per-Request',
    badgeStyle: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    name: 'Google Cloud EMEA & Google AI Studio Developer Ecosystem',
    division: 'Global AI Grants, Startups & Social Impact Ecosystem / Cloud Billing Operations',
    salutation: 'À l’attention de la Direction des Partenariats IA & Support Facturation Cloud',
    reference: 'GCP-AI-GRANT-2026/07-BMM',
    targetObjective: 'Mise en œuvre du mécanisme « 0,00 MAD Décaissé » : adossement de la facturation Cloud Run et Google AI Studio sur le compte BNC en devises (Compte 11-496-06), attribution de crédits IA et garantie de gratuité citoyenne.',
    programmeCible: 'Programme Google for AI Startups, AI for Social Good & Developer Cloud Grants',
    montantNote: `$${INTERNATIONAL_INVOICE_DEFAULT.totalUSD.toLocaleString()} USD (${INTERNATIONAL_INVOICE_DEFAULT.totalMAD.toLocaleString()} MAD)`,
    subject: `Prise en Charge Infrastructure Cloud IA & Liaison Facturation (Réf: GCP-AI-GRANT-2026/07-BMM)`,
    suggestedEmail: 'cloud-public-sector@google.com',
    generateLetter: () => {
      const header = COMMON_HEADER(
        'GCP-AI-GRANT-2026/07-BMM',
        INTERNATIONAL_INVOICE_DEFAULT.dateEmission,
        'Google Cloud EMEA & Google AI Studio Developer Ecosystem',
        'Global AI Grants, Startups & Social Impact Ecosystem / Cloud Billing Operations',
        'À l’attention de la Direction des Partenariats IA & Support Facturation Cloud',
        'Demande de Prise en Charge d’Infrastructure Cloud IA (Google AI Studio) & Liaison de Facturation — Mécanisme « 0,00 MAD Décaissé » et Guichet Unique Citoyen'
      );
      return `${header}

Madame, Monsieur les Responsables des Partenariats Google Cloud et Google AI Studio,

En ma qualité de Concepteur-Fondateur de l'écosystème numérique OBJECTIO (morchidit.morchidi.digital) et Titulaire du Cabinet Mohamed MORCHID (État Civil 964 R/1970, RC 16894 Settat, ICE 003707910000033), j’ai l’honneur de vous adresser notre dossier technique de liaison de facturation et de demande de crédits Cloud IA.

1. ARCHITECTURE TECHNIQUE & UTILISATION DES MODÈLES GEMINI :
Notre portail déploie 15 services de Droit Positif et de médiation sociale conteneurisés sur Google Cloud Run (Région europe-west1).
L'intelligence de raisonnement juridique repose sur les modèles Google Gemini (Gemini 1.5/2.0 Pro et Flash via l'API Google AI Studio), assurant l'analyse vectorielle des textes juridiques, la conformité constitutionnelle (Article 37) et la protection algorithmique des citoyens.

2. COHÉRENCE DU BUILD MULTI-APPAREILS & EFFORT CERTIFIÉ :
L'audit de cohérence technique consigne 33 heures d'efforts continus synchronisés entre smartphone et ordinateur portable, totalisant 55 heures d'ingénierie certifiée pour une valeur de $6 600 USD (66 000 MAD).
Chaque compilation est optimisée pour une consommation minimale de jetons et de ressources machines.

3. MISE EN ŒUVRE DU MÉCANISME « 0,00 MAD DÉCAISSÉ » :
Notre doctrine de Profusion et d'Équité Sociale impose que l'accès au guichet soit gratuit pour les citoyens, et que l'infrastructure Cloud ne pèse pas sur les deniers propres du fondateur :
- Phase Actuelle : Maintien sur le quota de développement gratuit (Free Tier) à 0,00 MAD décaissé ;
- Phase Opérationnelle : Liaison du moyen de paiement international en devises USD/CAD domicilié auprès de la BANQUE NATIONALE DU CANADA (BNC, Compte N° ${BNC_ACCOUNT_DATA.accountNumber}), approvisionné par les subventions des bailleurs internationaux partenaires (PNUD, Banque Mondiale, UE, etc.).

4. REQUÊTE FORMELLE DE CRÉDITS D'INFRASTRUCTURE GOOGLE CLOUD IA :
Nous sollicitons l'éligibilité de notre projet aux programmes Google for Startups Cloud Grants / AI for Social Good, afin de doter l'environnement de crédits d'infrastructure dédiés pour couvrir les montées en charge des requêtes citoyennes sans aucune avance de trésorerie personnelle.

${COMMON_SIGNATURE}`;
    }
  }
};
