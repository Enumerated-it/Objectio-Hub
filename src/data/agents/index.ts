import type { AgentDefinition } from './types.js';
import { AGENT_S12 } from './s12.js';
import { AGENT_SOURCES } from './sources.js';

export const AGENTS: Record<string, AgentDefinition> = {
  [AGENT_S12.id]: AGENT_S12,
  [AGENT_SOURCES.id]: AGENT_SOURCES,
};

export const getAgent = (id: string): AgentDefinition | undefined => AGENTS[id];
export type { AgentDefinition, ChatMessage } from './types.js';
