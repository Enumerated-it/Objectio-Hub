/**
 * Données, personas et scénarios pour le module Argane-Sekyat V2
 * Développé sur la base de la modélisation cognitive DeepSeek & passerelle Discord
 * Cabinet de Consulting BMM* - Mohamed MORCHID (Fondateur)
 */

export interface AgentPersona {
  id: 'argane' | 'sekyat';
  name: string;
  role: string;
  badge: string;
  avatarColor: string;
  systemPrompt: string;
  accentColor: string;
  expertise: string[];
}

export const AGENT_ARGANE: AgentPersona = {
  id: 'argane',
  name: 'Argane',
  role: 'Expert Juridique & Sentinelle Droit Positif',
  badge: 'Lois 17-95, 5-96 & D.O.C',
  avatarColor: 'from-emerald-500 to-teal-700',
  accentColor: 'text-emerald-400',
  expertise: [
    'Droit des Sociétés (Lois 17-95 & 5-96)',
    'Article 37 Constitution (Accès gratuit aux droits)',
    'Validation probatoire d’actifs incorporels',
    'Procès-Verbaux d’Assemblées & D.O.C',
    'Conformité CNDP & Loi 31-08'
  ],
  systemPrompt: `Tu es Argane, sentinelle juridique et expert en Droit Positif marocain au sein de l'écosystème Objectio Hub.
Ton rôle est de veiller à la stricte légalité, à l'opposabilité juridique, à la protection des droits de l'usager et des associés, et à l'application du principe de gratuité citoyenne (0,00 MAD usager, Art. 37 de la Constitution).
Tu t'appuies sur le Code de Commerce, les lois sur les sociétés (17-95 et 5-96), la loi 53-05 sur l'échange électronique des données juridiques et le Droit des Obligations et des Contrats (D.O.C).`
};

export const AGENT_SEKYAT: AgentPersona = {
  id: 'sekyat',
  name: 'Sekyat',
  role: 'Ingénieur Méthodes BMM* & Économiste Industriel',
  badge: 'Chrono-Analyse SMED & MOC',
  avatarColor: 'from-amber-500 to-orange-700',
  accentColor: 'text-amber-400',
  expertise: [
    'Chrono-analyse industrielle & postes de travail',
    'Méthode SMED (Single-Minute Exchange of Die)',
    'Minute d’Occupation Convertible (MOC / MOC+)',
    'Équilibre financier international (Domiciliation BNC)',
    'Élimination des gaspillages & R.O.I anti-inflation'
  ],
  systemPrompt: `Tu es Sekyat, ingénieur méthodes industrielles certifié sous le sigle BMM* (Bureau Méthodes Magazine) et analyste d'efficience économique.
Ton rôle est d'analyser la faisabilité opérationnelle, le temps d'exécution (mesuré en MOC - Minute d'Occupation Convertible), l'élimination des goulots d'étranglement par la chrono-analyse SMED, et la rentabilité financière des actifs incorporels.
Tu garantis que les engagements juridiques reposent sur un équilibre économique soutenable, adossé à l'auto-alimentation des flux bancaires (BNC Canada Domiciliation).`
};

export interface ChatMessage {
  id: string;
  sender: 'user' | 'argane' | 'sekyat' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  isLegalNotice?: boolean;
  metrics?: {
    mocPonderee?: number;
    loiReference?: string;
  };
}

export interface DebateScenario {
  id: string;
  title: string;
  category: string;
  description: string;
  initialQuestion: string;
  steps: {
    speaker: 'argane' | 'sekyat';
    text: string;
    metrics?: {
      mocPonderee?: number;
      loiReference?: string;
    };
  }[];
  consensus: string;
}

export const DEBATE_SCENARIOS: DebateScenario[] = [
  {
    id: 'scen-01',
    title: 'Valorisation & Conversion des Apports Immatériels en Capital',
    category: 'Finance & Droit des Sociétés',
    description: 'Confrontation entre la rigueur d’évaluation du Commissaire aux Apports et l’effort réel de R&D mesuré en MOC.',
    initialQuestion: 'Comment convertir 42 000 MOC d’efforts intellectuels de R&D en capital social opposable selon les Lois 17-95 et 5-96 sans léser la trésorerie ?',
    steps: [
      {
        speaker: 'argane',
        text: `D'un point de vue juridique strict (Lois 17-95 et 5-96), tout apport en nature ou incorporel doit faire l'objet d'un rapport probatoire décrivant chaque composante avec précision. L'immatriculation au Registre du Commerce (RC 16894 Settat) et l'antériorité de conception sous le D.O.C créent la présomption de propriété. Cependant, la loi exige un arrêté d'inventaire contradictoire avant toute incorporation statutaire.`,
        metrics: { loiReference: 'Loi 17-95 Art. 24 / Loi 5-96 Art. 53' }
      },
      {
        speaker: 'sekyat',
        text: `Précisément Argane. C’est là que la méthodologie BMM* intervient : plutôt qu’une estimation forfaitaire vulnérable, nous utilisons la Minute d’Occupation Convertible (MOC). 42 000 MOC correspondent à 700 heures de travail d’ingénierie certifié, pondéré par le coefficient MOC+ (complexité algorithmique et absence d'API publique). Sur le plan bilantiel, cela consolide 92 000 MAD d'actifs incorporels amortissables, sans sortir 1 seul dirham de trésorerie opérationnelle.`,
        metrics: { mocPonderee: 42000 }
      },
      {
        speaker: 'argane',
        text: `Cette quantification mathématique est juridiquement recevable devant le tribunal de commerce car elle écarte l'aléa spéculatif. De plus, la clause d'agrément et la certification de non-subordination salariale protègent le fondateur (Mohamed MORCHID, Fondateur) contre toute requalification intempestive. L'apport est donc opposable aux tiers et aux créanciers.`,
        metrics: { loiReference: 'D.O.C Art. 230 & Loi 53-05' }
      },
      {
        speaker: 'sekyat',
        text: `Conclusion d'atelier : En combinant le scellement juridique d'Argane et le chrono-métrage MOC de Sekyat, l'entreprise augmente ses fonds propres, améliore son ratio de solvabilité bancaire auprès de la Banque Nationale du Canada (BNC), et sécurise son droit à subvention auprès des bailleurs (PNUD / UE).`,
        metrics: { mocPonderee: 42000, loiReference: 'Bilan Actif Incorporel BMM*' }
      }
    ],
    consensus: 'Consensus Certifié : L’incorporation au capital est valide dès lors que l’inventaire MOC BMM* est annexé au PV d’assemblée générale extraordinaire et scellé électroniquement.'
  },
  {
    id: 'scen-02',
    title: 'Chrono-Analyse SMED & Dématérialisation Industrielle d’Atelier',
    category: 'Productivité Industrielle BMM*',
    description: 'Arbitrage entre la cadence de production, la réduction des temps de changement d’outils et la conformité au Code du Travail.',
    initialQuestion: 'Comment diviser par 3 les temps de changement de série (SMED) tout en garantissant la sécurité des opérateurs et l’enregistrement probatoire des cadences ?',
    steps: [
      {
        speaker: 'sekyat',
        text: `Dans un atelier de confection ou de mécanique industrielle, le temps de transition moyen entre deux séries est de 45 minutes. En appliquant la méthode SMED BMM*, nous séparons les opérations internes (machine à l'arrêt) des opérations externes (pré-réglages en temps masqué). Le chrono-analyseur identifie 28 minutes gaspillées en déplacements d'outillage. Gain direct : 17 minutes par rotation.`,
        metrics: { mocPonderee: 1620 }
      },
      {
        speaker: 'argane',
        text: `Attention Sekyat : l'accélération des cadences ne doit en aucun cas enfreindre les prescriptions d'hygiène et de sécurité de la Loi 65-99 (Code du Travail marocain). Tout aménagement de poste doit être consigné dans le registre des comités d'hygiène et de sécurité (CHS) et les fiches de poste doivent être mises à jour pour éviter tout risque de faute inexcusable en cas d'accident.`,
        metrics: { loiReference: 'Loi 65-99 (Hygiène & Sécurité Ateliers)' }
      },
      {
        speaker: 'sekyat',
        text: `C'est exactement l'intérêt du couplage ! Les 17 minutes gagnées ne sont pas imposées comme une cadence forcenée, mais résultent d'un rangement standardisé (5S) et de chariots ergonomiques pré-équipés. L'opérateur réduit ses gestes répétitifs de 40 %, ce qui fait chuter les micro-traumatismes tout en augmentant le taux de rendement synthétique (TRS) de 14 points.`,
        metrics: { mocPonderee: 1020 }
      },
      {
        speaker: 'argane',
        text: `Parfait. Si le protocole SMED est ainsi documenté avec l'ergonomie validée, le PV de chrono-analyse BMM* devient une preuve positive d'organisation diligente qui désarme tout contentieux inspection du travail et bonifie les audits RSE internationaux.`,
        metrics: { loiReference: 'Norme RSE ISO 45001 & Code du Travail' }
      }
    ],
    consensus: 'Consensus Certifié : Le gain SMED est pérennisé sans risque juridique, générant un R.O.I immédiat tout en satisfaisant aux obligations de bien-être au poste de travail.'
  },
  {
    id: 'scen-03',
    title: 'Mécanisme « 0,00 MAD Décaissé » & Infrastructure Cloud IA',
    category: 'Architecture Numérique & Financement International',
    description: 'Démonstration du bouclage financier BNC Canada et Google Cloud sans débours pour le citoyen usager.',
    initialQuestion: 'Comment maintenir le portail Objectio Hub et ses 15 services 100% gratuits pour les citoyens (0 MAD) tout en absorbant les coûts Cloud IA ?',
    steps: [
      {
        speaker: 'argane',
        text: `L'article 37 de la Constitution marocaine et l'article 31 imposent la démocratisation de l'accès à l'information juridique et administrative. Si nous facturions les usagers modestes, nous détruirions la vocation inclusive du guichet unique. Le modèle économique doit impérativement respecter la gratuité au point d'usage.`,
        metrics: { loiReference: 'Constitution Art. 31 & 37' }
      },
      {
        speaker: 'sekyat',
        text: `Pour financer les serveurs Cloud Run et les requêtes IA sans prélever 1 centime sur le citoyen, nous activons la Note d'Honoraires BMM* ($6 600 USD / 66 000 MAD) adressée aux bailleurs multilatéraux (PNUD, Banque Mondiale, Union Européenne, Canada). Les fonds sont directement adossés sur le compte Banque Nationale du Canada (Compte BNC International), créant un réservoir en devises dédié aux factures technologiques.`,
        metrics: { mocPonderee: 6600 }
      },
      {
        speaker: 'argane',
        text: `Juridiquement, cette convention triangulaire est irréprochable : le bailleur honore la prise en charge dans le cadre de ses programmes d'inclusion numérique (ODD 1, 8, 9, 10, 16), la BNC encaisse en toute transparence sans transfert de change prohibitif, et le citoyen accède à un service souverain à 0,00 MAD.`,
        metrics: { loiReference: 'Convention Internationale Partenariat ODD' }
      },
      {
        speaker: 'sekyat',
        text: `L'équation financière et humaine est ainsi bouclée : l'intelligence artificielle Argane-Sekyat sert le bien commun, financée par la coopération internationale, garantie sous l'expertise BMM* de Mohamed MORCHID.`,
        metrics: { mocPonderee: 6600, loiReference: 'Liaison Domiciliation BNC' }
      }
    ],
    consensus: 'Consensus Certifié : Modèle pérenne d’auto-financement par tiers bailleur multilatéral avec domiciliation BNC, assurant la gratuité citoyenne perpétuelle.'
  }
];

export const PRECONFIGURED_USER_PROMPTS: { title: string; category: string; prompt: string }[] = [
  {
    title: 'Conversion Apport en Nature',
    category: 'Juridique',
    prompt: 'Quelle est la procédure exacte pour enregistrer mes travaux immatériels au Registre de Commerce de Settat en vertu des lois 17-95 et 5-96 ?'
  },
  {
    title: 'Chrono-Analyse SMED d’Atelier',
    category: 'Méthodes BMM*',
    prompt: 'Comment formaliser une fiche de chrono-analyse SMED selon la méthode BMM* pour réduire les temps de réglage machine ?'
  },
  {
    title: 'Preuve IA Sans API Publique',
    category: 'Propriété Intellectuelle',
    prompt: 'Comment prouver l’antériorité de mes recherches développées sur DeepSeek sans API publique selon le protocole de scellement probatoire ?'
  },
  {
    title: 'Liaison BNC 0,00 MAD Débours',
    category: 'Finance',
    prompt: 'Expliquez comment fonctionne la prise en charge de la note d’honoraires de $6 600 USD avec le compte BNC International.'
  }
];
