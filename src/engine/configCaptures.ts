// No imports needed for this file

// Capture moves configuration for triangular board
// Format: { from: string, over: string, to: string }
export interface CaptureMove {
  from: string;  // Tiger's starting position
  over: string;  // Goat position (must be captured)
  to: string;    // Tiger's landing position
}

// All valid capture moves for the symmetric board structure
export const captureMoves: CaptureMove[] = [
  // Vertical captures (down and up)
  // From n1 (apex) down
  { from: 'n1', over: 'n2', to: 'n5' },
  { from: 'n1', over: 'n3', to: 'n6' },
  { from: 'n1', over: 'n4', to: 'n7' },
  
  // From tier 2 down
  { from: 'n2', over: 'n5', to: 'n8' },
  { from: 'n3', over: 'n6', to: 'n9' },
  { from: 'n4', over: 'n7', to: 'n10' },
  
  // From tier 3 up
  { from: 'n5', over: 'n2', to: 'n1' },
  { from: 'n6', over: 'n3', to: 'n1' },
  { from: 'n7', over: 'n4', to: 'n1' },
  
  // From tier 4 up
  { from: 'n8', over: 'n5', to: 'n2' },
  { from: 'n9', over: 'n6', to: 'n3' },
  { from: 'n10', over: 'n7', to: 'n4' },
  
  // Horizontal captures (left and right)
  // Tier 2 horizontal
  { from: 'n2', over: 'n3', to: 'n4' },
  { from: 'n4', over: 'n3', to: 'n2' },
  
  // Tier 3 horizontal
  { from: 'n5', over: 'n6', to: 'n7' },
  { from: 'n7', over: 'n6', to: 'n5' },
  
  // Tier 4 horizontal
  { from: 'n8', over: 'n9', to: 'n10' },
  { from: 'n10', over: 'n9', to: 'n8' }
];
