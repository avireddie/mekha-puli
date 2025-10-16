import type { BoardConfig } from '../boardConfig';
import type { Node } from '../types';
import { traditionalCaptureMoves } from './traditionalCaptures';

// Traditional Board: 23 nodes (1-6-6-6-4 structure)
const traditionalNodes: Node[] = [
  // Tier 1: 1 node
  { id: 'n1', tier: 1, connectedTo: ['n3', 'n4', 'n5', 'n6'] },
  
  // Tier 2: 6 nodes
  { id: 'n2', tier: 2, connectedTo: ['n3', 'n8'] },
  { id: 'n3', tier: 2, connectedTo: ['n1', 'n2', 'n4', 'n9'] },
  { id: 'n4', tier: 2, connectedTo: ['n1', 'n3', 'n5', 'n10'] },
  { id: 'n5', tier: 2, connectedTo: ['n1', 'n4', 'n6', 'n11'] },
  { id: 'n6', tier: 2, connectedTo: ['n1', 'n5', 'n7', 'n12'] },
  { id: 'n7', tier: 2, connectedTo: ['n6', 'n13'] },
  
  // Tier 3: 6 nodes
  { id: 'n8', tier: 3, connectedTo: ['n2', 'n9', 'n14'] },
  { id: 'n9', tier: 3, connectedTo: ['n3', 'n8', 'n10', 'n15'] },
  { id: 'n10', tier: 3, connectedTo: ['n4', 'n9', 'n11', 'n16'] },
  { id: 'n11', tier: 3, connectedTo: ['n5', 'n10', 'n12', 'n17'] },
  { id: 'n12', tier: 3, connectedTo: ['n6', 'n11', 'n13', 'n18'] },
  { id: 'n13', tier: 3, connectedTo: ['n7', 'n12', 'n19'] },
  
  // Tier 4: 6 nodes
  { id: 'n14', tier: 4, connectedTo: ['n8', 'n15'] },
  { id: 'n15', tier: 4, connectedTo: ['n9', 'n14', 'n16', 'n20'] },
  { id: 'n16', tier: 4, connectedTo: ['n10', 'n15', 'n17', 'n21'] },
  { id: 'n17', tier: 4, connectedTo: ['n11', 'n16', 'n18', 'n22'] },
  { id: 'n18', tier: 4, connectedTo: ['n12', 'n17', 'n19', 'n23'] },
  { id: 'n19', tier: 4, connectedTo: ['n13', 'n18'] },
  
  // Tier 5: 4 nodes (bottom)
  { id: 'n20', tier: 5, connectedTo: ['n15', 'n21'] },
  { id: 'n21', tier: 5, connectedTo: ['n16', 'n20', 'n22'] },
  { id: 'n22', tier: 5, connectedTo: ['n17', 'n21', 'n23'] },
  { id: 'n23', tier: 5, connectedTo: ['n18', 'n22'] }
];

export const traditionalBoardConfig: BoardConfig = {
  id: 'traditional',
  name: 'Traditional Board',
  nodes: traditionalNodes,
  initialTigers: ['n1', 'n4', 'n5'],
  totalGoats: 15,
  tigersWinAt: 5,
  captureMoves: traditionalCaptureMoves
};
