export type Role = 'Player' | 'Enemy';

export interface BoardConfig {
  id: string;
  name: string;
  nodes: Node[];
  initialTigers: string[];
  totalGoats: number;
  tigersWinAt: number;
  captureMoves: CaptureMove[];
}

export interface CaptureMove {
  from: string;
  over: string;
  to: string;
}

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
  type: 'placeGoat' | 'moveGoat' | 'moveTiger' | 'captureTiger' | 'selectTiger';
  from?: string;
  to?: string;
  capturedGoat?: string; // For captureTiger actions
}

export interface GameState {
  boardConfig: BoardConfig;
  currentTurn: Role;
  actions: Action[];
  winner?: Role;
  // Game state tracking
  tigerAt: string[];
  goatsAt: string[];
  goatsPlaced: number;
  goatsCaptured: number;
  phase: 'placement' | 'movement';
  selectedPiece?: string;
}
