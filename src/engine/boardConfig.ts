import type { Node, CaptureMove } from './types';

export interface BoardConfig {
  id: string;
  name: string;
  nodes: Node[];
  initialTigers: string[];  // node IDs where tigers start
  totalGoats: number;
  tigersWinAt: number;  // captures needed
  captureMoves: CaptureMove[];
}
