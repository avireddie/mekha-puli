import type { BoardConfig } from '../boardConfig';
import { configTriangle10 } from '../configTriangle10';
import { captureMoves } from '../configCaptures';

export const simpleBoardConfig: BoardConfig = {
  id: 'simple',
  name: 'Simple Board',
  nodes: configTriangle10,
  initialTigers: ['n1'],
  totalGoats: 5,
  tigersWinAt: 2,
  captureMoves: captureMoves
};
