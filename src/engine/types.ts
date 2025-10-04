export type Role = 'Player' | 'Enemy';

export interface Node {
  id: string;
  tier: number;
  connectedTo: string[];
}

export interface Edge {
  from: string;
  to: string;
}

export interface Action {
  actorId: string;
  targetId?: string;
  type: 'move' | 'attack' | 'defend';
}

export interface GameState {
  nodes: Node[];
  currentTurn: Role;
  actions: Action[];
  winner?: Role;
}
