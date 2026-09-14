// =============================================================================
//  DOSSIER D'APPORT — État d'avancement (onglet public #apport)
//  Règles : aucun nom de fichier, aucune clé, aucun montant non attesté.
//  Seules la structure de la démarche et son avancement sont publiés.
//  Chaque jalon renvoie à une pièce datée conservée hors ligne (dossier de travail
//  du fondateur, non versionné) et présentée au commissaire aux apports.
// =============================================================================

export const APPORT_LABEL =
  'Analysé par le Bureau des méthodes Objectio — valeur soumise à l’appréciation du commissaire aux apports';

export const APPORT_BASE_LEGALE =
  'Loi 5-96 (SARL) art. 53 et loi 17-95 (SA) art. 24 : l’évaluation des apports en nature relève d’un commissaire aux apports désigné ; le présent inventaire prépare son rapport, il ne s’y substitue pas.';

export type JalonType = 'origine' | 'travaux' | 'administratif' | 'mise_en_ligne' | 'inventaire';

export interface JalonApport {
  date: string;        // ISO ou AAAA-MM
  titre: string;
  detail: string;
  type: JalonType;
  preuve: 'S1' | 'S2' | 'S3';
}

export const JALON_TYPE_LABEL: Record<JalonType, string> = {
  origine: 'Origine',
  travaux: 'Travaux',
  administratif: 'Administratif',
  mise_en_ligne: 'Mise en ligne',
  inventaire: 'Inventaire',
};

// Chronologie établie à partir des dates portées par les pièces elles-mêmes
// (horodatage des fichiers, journaux git, documents contractuels).
export const CHRONOLOGIE_APPORT: JalonApport[] = [
  { date: '2007-05', titre: 'Plus ancienne trace de travail conservée', detail: 'Archive personnelle horodatée — point de départ de la continuité documentaire.', type: 'origine', preuve: 'S2' },
  { date: '2013-03-04', titre: 'Immatriculation au Registre du Commerce', detail: 'RC 16894 Settat — personne physique immatriculée (non auto-entrepreneur).', type: 'administratif', preuve: 'S1' },
  { date: '2025-01', titre: 'Naissance de la méthode MOC / MOC+', detail: 'Minute d’Occupation Convertible : premiers écrits de méthode (janvier–avril 2025).', type: 'travaux', preuve: 'S2' },
  { date: '2025-05-27', titre: 'Premières sessions de recherche assistée (auto-moc)', detail: 'Trois sessions datées avec un modèle de recherche — origine du chantier Alwafra.', type: 'travaux', preuve: 'S2' },
  { date: '2026-01', titre: 'alwafra-web3', detail: 'Dépôt de code horodaté (journal git : 247 minutes de sessions prouvées).', type: 'travaux', preuve: 'S1' },
  { date: '2026-03-02', titre: 'Cloud-Alwafra — plateforme multi-agents', detail: 'Sept documents de cadrage produits avec assistance IA (synthèse, PV technique, sources, plan 60 jours).', type: 'travaux', preuve: 'S2' },
  { date: '2026-03-09', titre: 'Domiciliation bancaire professionnelle', detail: 'Compte professionnel ouvert au nom du titulaire du RC (coordonnées non publiées).', type: 'administratif', preuve: 'S1' },
  { date: '2026-04-10', titre: 'Acquisition du domaine morchidi.digital', detail: 'Contrat d’enregistrement au nom de MORCHID Mohamed.', type: 'administratif', preuve: 'S1' },
  { date: '2026-04-28', titre: 'Bibliothèque H+ — Grand Livre des échanges', detail: 'Constitution du fonds documentaire et de ses conditions d’accès (travail inachevé, conservé).', type: 'travaux', preuve: 'S2' },
  { date: '2026-05-04', titre: 'Travaux Alwafra avec un second modèle de recherche', detail: 'Session de conception datée — chantier conservé pour reprise.', type: 'travaux', preuve: 'S2' },
  { date: '2026-09-03', titre: 'Spire-Stable — Hub Objectio (15 services)', detail: 'Journal git : 357 minutes de sessions prouvées (3–6 septembre 2026).', type: 'travaux', preuve: 'S1' },
  { date: '2026-09-11', titre: 'Mise en ligne de morchidit.morchidi.digital', detail: 'Portail public HTTPS, 0 MAD usager, sans donnée personnelle ni bancaire dans le code publié.', type: 'mise_en_ligne', preuve: 'S1' },
  { date: '2026-09-13', titre: 'Inventaire du poste de travail et PV de réception', detail: '77 dossiers recensés, 5 dépôts git, 199 journées d’écriture distinctes sur le volume principal.', type: 'inventaire', preuve: 'S1' },
  { date: '2026-09-14', titre: 'Regroupement des pièces pour le commissaire', detail: '62 pièces uniques classées (accès, travaux avec IA, pièces bancaires, factures et contrats) ; originaux intacts.', type: 'inventaire', preuve: 'S2' },
];

export interface CompteurApport {
  valeur: string;
  libelle: string;
  precision: string;
}

// Compteurs publiés : des dénombrements, jamais des montants.
export const COMPTEURS_APPORT: CompteurApport[] = [
  { valeur: '44 / 150', libelle: 'Dossiers inventoriés', precision: 'Fiches ouvertes / objectif de l’inventaire' },
  { valeur: '62', libelle: 'Pièces regroupées', precision: 'Datées, dédoublonnées, hors ligne' },
  { valeur: '9', libelle: 'Assistants IA mobilisés', precision: 'Gemini · Grok · DeepSeek · Copilot · Claude · ChatGPT · Twin · Mistral · Antigravity' },
  { valeur: '0', libelle: 'Montant attesté publié', precision: 'Aucune valeur n’est « certifiée » avant le rapport du commissaire' },
];

export interface StrateApport {
  code: 'S1' | 'S2' | 'S3';
  nom: string;
  definition: string;
  exemple: string;
}

export const STRATES_PREUVE: StrateApport[] = [
  { code: 'S1', nom: 'Prouvé par un tiers', definition: 'Durée ou fait établi par un système indépendant du déclarant.', exemple: 'Journaux git horodatés, contrats de fournisseurs, avis bancaires.' },
  { code: 'S2', nom: 'Déclaré avec pièce', definition: 'Durée déclarée par le fondateur, appuyée sur un document daté.', exemple: 'Fichiers de travail horodatés, transcriptions de sessions IA, documents produits.' },
  { code: 'S3', nom: 'Attention et recherche déclarées', definition: 'Temps de réflexion, de lecture et de recherche sans trace machine.', exemple: 'Déclaration sur l’honneur, questionnaire dossier par dossier.' },
];

export const TAUX_DECLARES = {
  mocMADh: 200,
  mocPlusMADh: 660,
  note: 'Taux horaires déclarés par le fondateur pour le calcul préparatoire (MOC : exécution ; MOC+ : conception). Ils ne lient pas le commissaire aux apports.',
};

export const ETAPES_DOSSIER = [
  { n: 1, titre: 'Inventaire des travaux', etat: 'en_cours' as const, detail: '44 fiches ouvertes sur 150 ; enrichissement à partir du regroupement du 14/09/2026.' },
  { n: 2, titre: 'Pièces datées rassemblées', etat: 'fait' as const, detail: '62 pièces uniques, classées par nature, originaux conservés.' },
  { n: 3, titre: 'Minutes déclarées dossier par dossier', etat: 'a_faire' as const, detail: 'Questionnaire des trois strates, horodatage de chaque réponse.' },
  { n: 4, titre: 'Déclaration sur l’honneur (FR / AR)', etat: 'pret' as const, detail: 'Modèles prêts pour légalisation ; renseignés à l’issue de l’étape 3.' },
  { n: 5, titre: 'Note de méthode MOC / MOC+', etat: 'en_cours' as const, detail: 'Remise au commissaire aux apports avec l’inventaire et les pièces.' },
];

export const ETAT_LABEL: Record<'fait' | 'en_cours' | 'pret' | 'a_faire', string> = {
  fait: 'FAIT',
  en_cours: 'EN COURS',
  pret: 'PRÊT',
  a_faire: 'À FAIRE',
};

export const APPORT_MAIL_SUBJECT = 'Demande — dossier d’apport en nature (morchidit.morchidi.digital)';
