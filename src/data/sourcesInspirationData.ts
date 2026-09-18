// Rubrique « Accès réservé : Aux sources d'inspiration » (#sources-inspiration)
// Principe : chaque situation reçue inspire la méthode ; en retour, le Bureau des méthodes
// oriente le demandeur vers le guichet RÉEL qui peut porter sa démarche, sans frais quand le droit le permet.
// Aucune promesse de financement individuel. Aucune donnée personnelle collectée ici.

export const SOURCES_LABEL =
  'Étudié par le Bureau des méthodes Objectio — dossier soumis à l’appréciation du guichet compétent';

export const SOURCES_PRINCIPE = [
  'Une source d’inspiration est une situation vécue, décrite sans identité, qui fait progresser la méthode Objectio (nouvelle question, nouvelle pièce, nouveau délai à connaître).',
  'En contrepartie, le Bureau des méthodes prépare pour son auteur le dossier destiné au guichet compétent : réclamation, requête, demande d’assistance judiciaire, candidature de formation ou de projet.',
  'Objectio prépare, il ne plaide pas et ne décide pas : la plaidoirie appartient à l’avocat (souvent commis au titre de l’assistance judiciaire), la décision au guichet saisi.',
  'Aucun bailleur international (PNUD, UE, banques de développement) ne finance de dossier individuel : ces programmes financent des structures. La rubrique n’en promet donc aucun ; elle indique les guichets ouverts aux personnes.',
];

export interface Guichet {
  id: string;
  situation: string;
  guichet: string;
  cout: string;
  base: string;
  prepare: string;   // ce qu'Objectio prépare
  etape: string;     // première étape concrète
}

export const GUICHETS: Guichet[] = [
  {
    id: 'banque',
    situation: 'Litige bancaire : prélèvement contesté, frais, refus de clôture, incident de paiement',
    guichet: 'Réclamation écrite à la banque, puis Centre Marocain de Médiation Bancaire (CMMB)',
    cout: 'Gratuit (médiation institutionnelle, sous plafond de litige)',
    base: 'Loi 103-12 (établissements de crédit) • Directives Bank Al-Maghrib sur le traitement des réclamations • Loi 31-08 (consommateur)',
    prepare: 'La réclamation datée avec pièces (relevés, SMS, échanges), puis le formulaire de saisine du médiateur',
    etape: 'Écrire à l’agence et au service réclamations (courrier ou e-mail), conserver l’accusé ; délai de réponse de la banque avant saisine du médiateur',
  },
  {
    id: 'administration',
    situation: 'Litige avec une administration, un établissement public ou une collectivité',
    guichet: 'Médiateur du Royaume (Al Wassit)',
    cout: 'Gratuit',
    base: 'Dahir 1-11-25 du 17 mars 2011 (Institution du Médiateur) • Loi 14-16 (2019)',
    prepare: 'La requête motivée : faits, démarches déjà faites, texte invoqué, demande précise',
    etape: 'Vérifier qu’un recours a été tenté auprès de l’administration ; déposer en ligne ou dans une délégation régionale',
  },
  {
    id: 'justice',
    situation: 'Procès à engager ou à subir sans moyens (civil, social, pénal, commercial)',
    guichet: 'Assistance judiciaire — bureau d’assistance judiciaire du tribunal',
    cout: 'Gratuit : dispense des frais de justice, avocat désigné, huissier, expertise',
    base: 'Dahir du 1er novembre 1966 relatif à l’assistance judiciaire • Code de procédure civile',
    prepare: 'La demande motivée + l’attestation d’indigence (annexe administrative) + la description du litige et des preuves',
    etape: 'Obtenir l’attestation d’indigence auprès de l’autorité locale ; déposer la demande au greffe ; le bâtonnier désigne un avocat',
  },
  {
    id: 'travail',
    situation: 'Conflit du travail : salaire, congés, licenciement, accident',
    guichet: 'Inspection du travail (tentative de conciliation), puis tribunal social',
    cout: 'Gratuit (inspection) ; assistance judiciaire possible au tribunal',
    base: 'Loi 65-99 (Code du travail), art. 532 et s. (inspection), art. 41 (conciliation préalable)',
    prepare: 'La plainte à l’inspection : contrat, bulletins, attestations, calcul des sommes dues',
    etape: 'Saisir l’inspection du travail du lieu de travail ; garder le PV de conciliation ou de non-conciliation',
  },
  {
    id: 'consommation',
    situation: 'Achat, abonnement, garantie, publicité trompeuse, clause abusive',
    guichet: 'Association de protection du consommateur reconnue d’utilité publique ; guichet du ministère (khidmat-almostahlik)',
    cout: 'Gratuit',
    base: 'Loi 31-08 édictant des mesures de protection du consommateur (art. 152 et s. : action des associations)',
    prepare: 'La mise en demeure au professionnel, puis la fiche de saisine de l’association',
    etape: 'Mise en demeure écrite avec délai ; en l’absence de réponse, saisine de l’association ou du portail national',
  },
  {
    id: 'formation',
    situation: 'Reprendre des études, se qualifier, se reconvertir',
    guichet: 'OFPPT (formation initiale et continue, cours du soir), ANAPEC (Idmaj, Tahfiz, Taehil), universités (formation continue), bourses',
    cout: 'Gratuit ou pris en charge selon programme',
    base: 'Loi 60-17 (formation continue) • Programmes ANAPEC en vigueur',
    prepare: 'Le dossier de candidature : parcours, projet, pièces, lettre de motivation',
    etape: 'Choisir la filière sur le catalogue OFPPT/ANAPEC ; s’inscrire à la session en cours ; préparer les justificatifs',
  },
  {
    id: 'projet',
    situation: 'Lancer ou financer une activité, seul ou à plusieurs',
    guichet: 'INDH (activités génératrices de revenus), Intelaka (prêt bonifié, garantie Tamwilcom), Forsa, coopératives (ODCO)',
    cout: 'Accompagnement gratuit ; prêts à taux réduit ; subventions selon programme',
    base: 'Loi 112-12 (coopératives) • Conventions INDH • Programme Intelaka (Fonds Mohammed VI / Tamwilcom)',
    prepare: 'Le business plan (service S03), le prix de revient (S04), les statuts de coopérative, la fiche projet INDH',
    etape: 'Déposer la fiche projet auprès de la Division de l’action sociale de la préfecture (INDH) ou de la banque partenaire (Intelaka)',
  },
  {
    id: 'associations',
    situation: 'Porter collectivement un service d’accès aux droits (pour répondre, un jour, aux appels à propositions)',
    guichet: 'Association (dahir 1-58-376) ou coopérative (loi 112-12) — la structure porteuse, seule éligible aux financements de programmes (PNUD, UE, INDH, fondations)',
    cout: 'Constitution peu coûteuse ; financements sur appel à propositions',
    base: 'Dahir 1-58-376 (associations) • Loi 112-12 • Règles des bailleurs (appels à propositions)',
    prepare: 'Les statuts, le budget par dossier (méthode MOC 200 / MOC+ 660 MAD/h), les indicateurs de résultat',
    etape: 'Réunir les membres fondateurs ; déposer les statuts ; ouvrir le compte ; s’inscrire aux plateformes d’appels (UNGM pour l’ONU)',
  },
];

export const SOURCES_DEPOT_CHAMPS = [
  { id: 'situation', label: 'Situation (sans nom, sans numéro d’identité, sans RIB)', placeholder: 'Ex. : prélèvement de 450 MAD non autorisé le 3 du mois, banque saisie par téléphone, pas de réponse écrite…' },
  { id: 'demarches', label: 'Démarches déjà faites', placeholder: 'Ex. : appel au centre de relation client, visite à l’agence, aucune trace écrite' },
  { id: 'attendu', label: 'Ce que vous attendez', placeholder: 'Ex. : remboursement, explication écrite, orientation vers le bon guichet' },
];

export const SOURCES_MAIL_SUBJECT = 'Source d’inspiration — situation soumise au Bureau des méthodes';
