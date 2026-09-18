export interface AgentDefinition {
  id: string;            // identique à service.id (s01…s15) ou à un alias de modale (apport, md-bia…)
  rubrique: string;      // libellé affiché
  anchor: string;        // ancre du Hub (#…)
  decideur: string;      // à qui la décision appartient
  intro: string;         // premier message de l'agent
  suggestions: string[]; // questions proposées
  offlineReply: string;  // réponse fixe tant que la clé serveur n'est pas posée
  systemPrompt: string;  // règles de conduite, utilisées côté serveur uniquement
}

export interface ChatMessage {
  role: 'user' | 'agent';
  content: string;
}
