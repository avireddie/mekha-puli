import type { Node } from './types';

// Ten-node symmetric board (4 tiers: 1-3-3-3 structure)
// Symmetric vertical structure with clear columns
export const configTriangle10: Node[] = [
  // Tier 1: Apex
  { id: 'n1', tier: 1, connectedTo: ['n2', 'n3', 'n4'] },
  
  // Tier 2: Three nodes
  { id: 'n2', tier: 2, connectedTo: ['n1', 'n3', 'n5'] },
  { id: 'n3', tier: 2, connectedTo: ['n1', 'n2', 'n4', 'n6'] },
  { id: 'n4', tier: 2, connectedTo: ['n1', 'n3', 'n7'] },
  
  // Tier 3: Three nodes
  { id: 'n5', tier: 3, connectedTo: ['n2', 'n6', 'n8'] },
  { id: 'n6', tier: 3, connectedTo: ['n3', 'n5', 'n7', 'n9'] },
  { id: 'n7', tier: 3, connectedTo: ['n4', 'n6', 'n10'] },
  
  // Tier 4: Three nodes (base)
  { id: 'n8', tier: 4, connectedTo: ['n5', 'n9'] },
  { id: 'n9', tier: 4, connectedTo: ['n6', 'n8', 'n10'] },
  { id: 'n10', tier: 4, connectedTo: ['n7', 'n9'] }
];