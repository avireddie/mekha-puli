import { Node } from './types';

// Ten-node triangular board (4 tiers)
export const configTriangle10: Node[] = [
  { id: 'n1', tier: 1, connectedTo: ['n2', 'n3'] },
  { id: 'n2', tier: 2, connectedTo: ['n1', 'n4', 'n5'] },
  { id: 'n3', tier: 2, connectedTo: ['n1', 'n5', 'n6'] },
  // ...continue pattern until n10
];
