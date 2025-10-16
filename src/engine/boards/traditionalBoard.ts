import type { BoardConfig } from '../boardConfig';

export const traditionalBoardConfig: BoardConfig = {
  id: 'traditional',
  name: 'Traditional Board',
  nodes: [], // Will be implemented in Milestone 3
  initialTigers: ['n1', 'n4', 'n5'],
  totalGoats: 15,
  tigersWinAt: 5,
  captureMoves: [] // Will be implemented in Milestone 3
};
