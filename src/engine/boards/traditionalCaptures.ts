import type { CaptureMove } from '../types';

// Traditional Board Capture Moves (23 nodes)
// All valid straight-line jumps for the traditional board
export const traditionalCaptureMoves: CaptureMove[] = [
  // Vertical captures (down and up)
  { from: 'n1', over: 'n3', to: 'n9' },
  { from: 'n1', over: 'n4', to: 'n10' },
  { from: 'n1', over: 'n5', to: 'n11' },
  { from: 'n1', over: 'n6', to: 'n12' },
  
  { from: 'n2', over: 'n3', to: 'n4' },
  { from: 'n2', over: 'n8', to: 'n14' },
  
  { from: 'n3', over: 'n4', to: 'n5' },
  { from: 'n3', over: 'n9', to: 'n15' },
  
  { from: 'n4', over: 'n3', to: 'n2' },
  { from: 'n4', over: 'n5', to: 'n6' },
  { from: 'n4', over: 'n10', to: 'n16' },
  
  { from: 'n5', over: 'n4', to: 'n3' },
  { from: 'n5', over: 'n6', to: 'n7' },
  { from: 'n5', over: 'n11', to: 'n17' },
  
  { from: 'n6', over: 'n5', to: 'n4' },
  { from: 'n6', over: 'n12', to: 'n18' },
  
  { from: 'n7', over: 'n6', to: 'n5' },
  { from: 'n7', over: 'n13', to: 'n19' },
  
  // Tier 3 captures
  { from: 'n8', over: 'n9', to: 'n10' },
  
  { from: 'n9', over: 'n3', to: 'n1' },
  { from: 'n9', over: 'n10', to: 'n11' },
  { from: 'n9', over: 'n15', to: 'n20' },
  
  { from: 'n10', over: 'n4', to: 'n1' },
  { from: 'n10', over: 'n9', to: 'n8' },
  { from: 'n10', over: 'n11', to: 'n12' },
  { from: 'n10', over: 'n16', to: 'n21' },
  
  { from: 'n11', over: 'n5', to: 'n1' },
  { from: 'n11', over: 'n10', to: 'n9' },
  { from: 'n11', over: 'n12', to: 'n13' },
  { from: 'n11', over: 'n17', to: 'n22' },
  
  { from: 'n12', over: 'n6', to: 'n1' },
  { from: 'n12', over: 'n11', to: 'n10' },
  { from: 'n12', over: 'n18', to: 'n23' }, 
  
  { from: 'n13', over: 'n12', to: 'n11' },

  
  // Tier 4 captures
  { from: 'n14', over: 'n8', to: 'n2' },
  { from: 'n14', over: 'n15', to: 'n16' },
  
  { from: 'n15', over: 'n9', to: 'n3' },
  { from: 'n15', over: 'n16', to: 'n17' },

  
  { from: 'n16', over: 'n10', to: 'n4' },
  { from: 'n16', over: 'n15', to: 'n14' },
  { from: 'n16', over: 'n17', to: 'n18' },

  
  { from: 'n17', over: 'n11', to: 'n5' },
  { from: 'n17', over: 'n16', to: 'n15' },
  { from: 'n17', over: 'n18', to: 'n19' },
  
  { from: 'n18', over: 'n12', to: 'n6' },
  { from: 'n18', over: 'n17', to: 'n16' },
  
  
  { from: 'n19', over: 'n13', to: 'n7' },
  { from: 'n19', over: 'n18', to: 'n17' },
  
  // Tier 5 captures (bottom row)
  { from: 'n20', over: 'n15', to: 'n9' },
  { from: 'n20', over: 'n21', to: 'n22' },
  
  { from: 'n21', over: 'n16', to: 'n10' },
  { from: 'n21', over: 'n22', to: 'n23' },
  
  { from: 'n22', over: 'n17', to: 'n11' },
  { from: 'n22', over: 'n21', to: 'n20' },
  
  { from: 'n23', over: 'n18', to: 'n12' },
  { from: 'n23', over: 'n22', to: 'n21' }
].filter(capture => {
  // Filter out invalid captures (nodes that don't exist)
  const validNodes = ['n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8', 'n9', 'n10', 
                     'n11', 'n12', 'n13', 'n14', 'n15', 'n16', 'n17', 'n18', 'n19', 
                     'n20', 'n21', 'n22', 'n23'];
  return validNodes.includes(capture.to);
});
