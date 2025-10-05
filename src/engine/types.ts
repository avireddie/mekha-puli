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
  type: 'placeGoat' | 'moveGoat' | 'moveTiger' | 'captureTiger';
  from?: string;
  to?: string;
  capturedGoat?: string; // For captureTiger actions
}

export interface GameState {
  nodes: Node[];
  currentTurn: Role;
  actions: Action[];
  winner?: Role;
  // Game state tracking
  tigerAt: string;
  goatsAt: string[];
  goatsPlaced: number;
  goatsCaptured: number;
  phase: 'placement' | 'movement';
}
