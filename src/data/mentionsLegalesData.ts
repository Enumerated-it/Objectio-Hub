// Mentions légales — Objectio Hub (morchidit.morchidi.digital)
// Source unique, relue par le fondateur. Aucune donnée personnelle non professionnelle ici.
export const MENTIONS_VERSION = '1.0 — 19 septembre 2026';

export interface Section { id: string; titre: string; lignes: string[] }

export const MENTIONS_SECTIONS: Section[] = [
  {
    id: 'editeur',
    titre: '1. Éditeur du site',
    lignes: [
      'Mohamed MORCHID — personne physique immatriculée au Registre du commerce de Settat sous le n° 16894 (activité : bureau de consulting), exerçant sous la marque d’usage « Objectio — Bureau des méthodes ».',
      'ICE 003707910000033 · IF 14412126 · Siège : Settat, Royaume du Maroc (adresse complète communiquée sur demande écrite).',
      'Directeur de la publication : Mohamed MORCHID, fondateur.',
      'Contact : contact@morchidi.digital',
    ],
  },
  {
    id: 'hebergement',
    titre: '2. Hébergement et prestataires techniques',
    lignes: [
      'Hébergement de l’application : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis (vercel.com).',
      'Résolution de noms et protection du domaine : Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, États-Unis.',
      'Messagerie du domaine : Namecheap, Inc. (Private Email), 4600 East Washington Street, Phoenix, AZ 85034, États-Unis.',
      'Code source public : github.com/Enumerated-it/Objectio-Hub.',
    ],
  },
  {
    id: 'donnees',
    titre: '3. Données personnelles (loi n° 09-08)',
    lignes: [
      'Le site ne comporte ni compte utilisateur, ni base de données, ni formulaire enregistrant des données : les documents (PV, conventions, questionnaires) sont générés dans votre navigateur et ne quittent votre appareil que si vous décidez de les envoyer par e-mail.',
      'Agents conversationnels : lorsqu’ils sont activés, vos messages sont transmis par une fonction serveur au fournisseur de modèle (Google LLC — API Gemini) le temps de produire la réponse ; ils ne sont ni journalisés ni conservés par l’éditeur. Tant que la mention « mode hors ligne » est affichée, aucun message n’est transmis à personne.',
      'Limitation d’usage : l’adresse IP est utilisée en mémoire, quelques minutes au plus, pour limiter le nombre de requêtes ; elle n’est pas enregistrée.',
      'Consigne : ne saisissez jamais de numéro de CIN, de RIB, de données de santé ou de tiers dans un agent. Un avertissement s’affiche si un tel motif est détecté.',
      'Journaux techniques : l’hébergeur conserve des journaux d’accès (adresse IP, horodatage, page) selon ses propres conditions ; l’éditeur n’y ajoute aucun traceur.',
      'Cookies : aucun cookie publicitaire ni de mesure d’audience. Seul le stockage local du navigateur peut mémoriser vos préférences d’affichage ; il reste sur votre appareil.',
      'Droits (art. 7 à 9 de la loi 09-08) : accès, rectification, opposition — par écrit à contact@morchidi.digital. Autorité de contrôle : Commission nationale de contrôle de la protection des données à caractère personnel (CNDP), Rabat — cndp.ma.',
      'Formalités : en l’absence de collecte et de conservation, aucun traitement n’est déclaré à ce jour ; toute évolution du site impliquant une collecte (compte, formulaire enregistré) sera précédée des formalités prévues par la loi 09-08.',
    ],
  },
  {
    id: 'services',
    titre: '4. Nature des services et responsabilité',
    lignes: [
      'Objectio est un bureau des méthodes : il prépare des documents et structure des démarches. Il ne rend ni conseil juridique réglementé, ni décision ; la décision appartient toujours à l’autorité, à la juridiction ou au professionnel compétent (avocat, notaire, expert-comptable, commissaire aux apports…).',
      'Les contenus sont fournis à titre d’information et de préparation. Aucune valeur, aucun montant et aucun document du site n’est « certifié » : les valeurs d’apport sont soumises à l’appréciation du commissaire aux apports.',
      'Conventions d’assistance (loi 31-08 relative à la protection du consommateur) : lorsqu’une prestation payante est proposée, le prix, le contenu et le droit de rétractation de 7 jours sont indiqués avant tout engagement ; la convention est lue, cochée puis signée par le demandeur.',
      'Liens externes : les guichets publics et organismes cités (CMMB, Médiateur du Royaume, OFPPT, ANAPEC, INDH, Tamwilcom, UNGM, PNUD…) sont indépendants de l’éditeur ; aucune affiliation n’est revendiquée.',
    ],
  },
  {
    id: 'propriete',
    titre: '5. Propriété intellectuelle',
    lignes: [
      'Les textes, méthodes, structures de documents et le nom « Objectio — Bureau des méthodes » sont la propriété de Mohamed MORCHID (loi n° 2-00 relative aux droits d’auteur et droits voisins). Le code source est publié sous les conditions indiquées dans le dépôt GitHub.',
      'Les documents que vous générez vous appartiennent ; l’éditeur n’en conserve aucune copie.',
    ],
  },
  {
    id: 'droit',
    titre: '6. Droit applicable',
    lignes: [
      'Droit marocain. En cas de litige et à défaut de règlement amiable (contact@morchidi.digital, puis médiation), les juridictions de Settat sont compétentes.',
      `Version ${MENTIONS_VERSION}. Les modifications sont datées et publiées sur cette page.`,
    ],
  },
];
