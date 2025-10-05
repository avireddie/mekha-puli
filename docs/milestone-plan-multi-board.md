# Multi-Board Game System - Implementation Plan

**Status:** Planning Complete - Ready for Implementation  
**Created:** October 5, 2025  
**Estimated Time:** 3-4 hours of focused work

---

## Overview

This plan outlines the implementation of a multi-board system for Mekha Puli, adding a Traditional board (23 nodes, 3 tigers, 15 goats) alongside the existing Simple board (10 nodes, 1 tiger, 5 goats).

---

## Board Specifications

### Simple Board (Current)
- **Nodes:** 10 (1-3-3-3 structure)
- **Tigers:** 1 (starts at n1)
- **Goats:** 5
- **Victory:** Tiger wins at 2 captures, Goats win when tiger immobilized

### Traditional Board (New)
- **Nodes:** 23 (1-6-6-6-4 structure)
- **Tigers:** 3 (start at n1, n4, n5)
- **Goats:** 15
- **Victory:** Tiger wins at 5 captures, Goats win when all 3 tigers immobilized
- **Movement:** Same rules as simple board
- **Interaction:** Two-step selection for both tigers and goats

### Traditional Board Node Connections

#### Tier 1:
- **n1:** n3, n4, n5, n6

#### Tier 2:
- **n2:** n3, n8
- **n3:** n1, n2, n4, n9
- **n4:** n1, n3, n5, n10
- **n5:** n1, n4, n6, n11
- **n6:** n1, n5, n7, n12
- **n7:** n6, n13

#### Tier 3:
- **n8:** n2, n9, n14
- **n9:** n3, n8, n10, n15
- **n10:** n4, n9, n11, n16
- **n11:** n5, n10, n12, n17
- **n12:** n6, n11, n13, n18
- **n13:** n7, n12, n19

#### Tier 4:
- **n14:** n8, n15
- **n15:** n9, n14, n16, n20
- **n16:** n10, n15, n17, n21
- **n17:** n11, n16, n18, n22
- **n18:** n12, n17, n19, n23
- **n19:** n13, n18

#### Tier 5 (bottom):
- **n20:** n15, n21
- **n21:** n16, n20, n22
- **n22:** n17, n21, n23
- **n23:** n18, n22

---

## Game Flow

1. **Select board type** (Simple or Traditional)
2. **Player 1 enters name**
3. **Player 2 enters name**
4. **Player 1 selects role** (Tiger or Goats)
5. **Game starts**

---

## Milestone 1: Refactor Core Architecture for Multi-Board Support

**Goal:** Restructure the codebase to support multiple board configurations without breaking existing functionality.

### What You'll See Working:
- Simple board (current game) works exactly as before
- Code is now organized to support multiple board types
- No visible changes to gameplay yet

### Files to Create:
1. **`src/engine/boardConfig.ts`** - Board configuration interface
   ```typescript
   export interface BoardConfig {
     id: string;
     name: string;
     nodes: Node[];
     initialTigers: string[];  // node IDs where tigers start
     totalGoats: number;
     tigersWinAt: number;  // captures needed
     captureMoves: CaptureMove[];
   }
   ```

2. **`src/engine/boards/simpleBoard.ts`** - Move current 10-node config here
3. **`src/engine/boards/simpleCaptures.ts`** - Move current capture config here
4. **`src/engine/boards/traditionalBoard.ts`** - Stub for now (complete in M3)

### Files to Update:
1. **`src/engine/types.ts`**
   - Add `boardConfig: BoardConfig` to GameState
   - Change `tigerAt: string` to `tigerAt: string[]` (array for multiple tigers)
   - Add `selectedPiece?: string` for two-step selection

2. **`src/engine/engine.ts`**
   - Update `initGame(boardConfig: BoardConfig)` to accept board config
   - Update `getLegalActions` to handle multiple tigers
   - Update `applyAction` to work with tiger arrays
   - Update `checkVictory` to use board config rules

3. **`src/App.tsx`**
   - Add `boardConfig` state
   - Pass board config to `initGame`
   - Update state management for tiger arrays

### Testing Checklist:
- [ ] Play a complete game on simple board
- [ ] All features work: names, sounds, victory, captures
- [ ] No regressions from current version
- [ ] Console shows no errors

### Git Checkpoint:
```bash
git add .
git commit -m "Milestone 1: Refactor architecture for multi-board support"
git tag -a v2-m1-architecture -m "Architecture refactored for multiple boards"
git push origin main
git push origin v2-m1-architecture
```

---

## Milestone 2: Add Board Selection UI

**Goal:** Add board type selection screen at the start.

### What You'll See Working:
- New first screen: "Choose Board Type"
- Two cards: Simple Board vs Traditional Board
- Flow: Board Select → Name 1 → Name 2 → Role → Game
- Simple board still fully playable

### Files to Create:
1. **`src/ui/BoardSelect.tsx`** - New component
   ```typescript
   interface BoardSelectProps {
     onBoardSelect: (boardId: 'simple' | 'traditional') => void;
   }
   ```
   
   Display two cards with:
   - Board name
   - Preview info (nodes, tigers, goats)
   - Description
   - Select button

### Files to Update:
1. **`src/ui/RoleSelect.tsx`**
   - Integrate board selection as step 0
   - Update flow: Board → Name 1 → Name 2 → Role

2. **`src/App.tsx`**
   - Add `boardType` state
   - Load appropriate board config based on selection
   - Pass board config through game initialization

3. **`src/App.css`**
   - Style board selection cards
   - Hover effects
   - Consistent with existing UI

### Testing Checklist:
- [ ] Can select "Simple Board" and play complete game
- [ ] Board selection shows correct info for both boards
- [ ] Flow works smoothly: Board → Names → Role → Game
- [ ] "New Game" returns to board selection
- [ ] Back buttons work correctly

### Git Checkpoint:
```bash
git add .
git commit -m "Milestone 2: Add board selection UI"
git tag -a v2-m2-board-selection -m "Board selection UI complete"
git push origin main
git push origin v2-m2-board-selection
```

---

## Milestone 3: Implement Traditional Board Configuration

**Goal:** Create the 23-node traditional board with all connections.

### What You'll See Working:
- Can select "Traditional Board" from board selection
- Traditional board displays with all 23 nodes correctly positioned
- 3 tigers appear at n1, n4, n5
- All connections visible
- Board is scaled appropriately (larger than simple board)

### Files to Create:
1. **`src/engine/boards/traditionalBoard.ts`**
   - Define all 23 nodes with connections (see specifications above)
   - Set initial tigers: ['n1', 'n4', 'n5']
   - Set totalGoats: 15
   - Set tigersWinAt: 5

2. **`src/engine/boards/traditionalCaptures.ts`**
   - Pre-define all valid capture moves for 23-node board
   - Map out straight-line jumps for all positions
   - Format: `{ from: 'n1', over: 'n3', to: 'n9' }`

### Files to Update:
1. **`src/ui/Board.tsx`**
   - Create new `getNodePositionTraditional()` function
   - Position nodes for 5-tier layout (1-6-6-6-4)
   - Adjust SVG dimensions for larger board
   - Scale spacing appropriately

2. **`src/App.css`**
   - Add styling for traditional board
   - Larger dimensions
   - Adjust node spacing

### Testing Checklist:
- [ ] Traditional board displays correctly
- [ ] All 23 nodes visible and properly spaced
- [ ] 3 tigers at correct starting positions (n1, n4, n5)
- [ ] All connections drawn correctly
- [ ] Board forms proper 5-tier triangular structure
- [ ] Simple board still works perfectly

### Git Checkpoint:
```bash
git add .
git commit -m "Milestone 3: Implement traditional board configuration"
git tag -a v2-m3-traditional-board -m "Traditional board (23 nodes) configured"
git push origin main
git push origin v2-m3-traditional-board
```

---

## Milestone 4: Implement Multi-Tiger Game Logic

**Goal:** Enable full gameplay with 3 tigers using two-step selection.

### What You'll See Working:
- Can play traditional board with 3 tigers
- Two-step selection: Click tiger → Click destination
- Can switch between tigers before moving
- Legal moves show only for selected tiger
- Goats can be placed and moved
- Tigers can move and capture goats

### Files to Update:
1. **`src/engine/engine.ts`**
   - Update `getLegalActions` to generate moves for all tigers
   - Track which tiger is selected
   - Generate legal moves only for selected tiger
   - Handle multiple tiger positions in state

2. **`src/App.tsx`**
   - Implement two-step tiger selection:
     - Step 1: Click a tiger (highlight it, store in state)
     - Step 2: Click destination (move tiger, clear selection)
   - Allow switching between tigers before moving
   - Prevent selecting opponent pieces
   - Update `handleNodeClick` for multi-tiger logic

3. **`src/ui/Board.tsx`**
   - Highlight selected tiger differently (e.g., pulsing border)
   - Show legal moves only for selected tiger
   - Visual feedback for selection state
   - Handle rendering multiple tigers

4. **`src/ui/HUD.tsx`**
   - Show "Goats Placed: X/15" for traditional board
   - Show "Goats Captured: X/5" for traditional board
   - Dynamic labels based on board config
   - Use `boardConfig.totalGoats` and `boardConfig.tigersWinAt`

### Testing Checklist:
- [ ] Can select any of 3 tigers
- [ ] Can switch tiger selection before committing move
- [ ] Legal moves show correctly for selected tiger
- [ ] Tigers move to adjacent nodes
- [ ] Tigers capture goats correctly
- [ ] Captured goats are removed from board
- [ ] Goats place during phase 1 (15 goats)
- [ ] Phase transitions to movement after 15 goats placed
- [ ] Goats move during phase 2
- [ ] Cannot select opponent's pieces
- [ ] HUD shows correct stats for traditional board

### Git Checkpoint:
```bash
git add .
git commit -m "Milestone 4: Implement multi-tiger game logic"
git tag -a v2-m4-multi-tiger -m "Multi-tiger gameplay with two-step selection"
git push origin main
git push origin v2-m4-multi-tiger
```

---

## Milestone 5: Complete Traditional Board Victory Conditions

**Goal:** Implement correct win detection for traditional board.

### What You'll See Working:
- Tiger wins when 5 goats captured
- Goats win when all 3 tigers are immobilized
- Victory modal shows correct player name
- Victory sounds play
- HUD shows "Goats Captured: X/5"

### Files to Update:
1. **`src/engine/engine.ts`**
   - Update `checkVictory` function:
     - Check if `goatsCaptured >= boardConfig.tigersWinAt`
     - Check if ALL tigers have zero legal moves (not just one)
     - Loop through all tiger positions to verify immobilization
   - Return appropriate winner based on board config

2. **`src/ui/HUD.tsx`**
   - Ensure labels use board config values
   - Display "Goats Captured: X/5" for traditional
   - Display "Goats Captured: X/2" for simple

3. **`src/App.tsx`**
   - Verify victory modal uses board config
   - Ensure victory sounds play for both boards

### Testing Checklist:
- [ ] Play complete game on traditional board
- [ ] Tiger victory at exactly 5 captures
- [ ] Goat victory when all 3 tigers trapped
- [ ] Victory modal shows correct player name
- [ ] Victory sounds play correctly
- [ ] HUD shows correct capture count
- [ ] Simple board victory conditions still work (2 captures)
- [ ] No premature victory detection

### Git Checkpoint:
```bash
git add .
git commit -m "Milestone 5: Complete traditional board victory conditions"
git tag -a v2-m5-victory -m "Victory conditions for both boards"
git push origin main
git push origin v2-m5-victory
```

---

## Milestone 6: Polish and Comprehensive Testing

**Goal:** Ensure both boards work flawlessly with polished UI.

### What You'll See Working:
- Smooth experience on both boards
- Intuitive board selection
- Clear visual feedback
- No bugs or edge cases
- Professional, polished UI

### Tasks:

#### Cross-Board Testing:
- [ ] Play 3+ complete games on simple board
- [ ] Play 3+ complete games on traditional board
- [ ] Switch between boards multiple times
- [ ] Test "New Game" button from various states
- [ ] Verify board selection resets correctly

#### UI Polish:
- [ ] Board selection is intuitive and attractive
- [ ] All text labels are correct for each board
- [ ] Spacing and layout work on both boards
- [ ] Colors for legal moves work on both boards
- [ ] Selected piece highlighting is clear
- [ ] Hover effects work smoothly
- [ ] Responsive design (if applicable)

#### Code Cleanup:
- [ ] Remove any unused code
- [ ] Add comments for complex logic
- [ ] Ensure consistent naming conventions
- [ ] Remove console.logs (or make them conditional)
- [ ] Check for any TODOs in code

#### Edge Case Testing:
- [ ] Click "New Game" mid-game
- [ ] Try to place goat on tiger
- [ ] Try to select opponent's piece
- [ ] All tigers blocked but can still capture
- [ ] Capture move removes correct goat
- [ ] Phase transition happens at correct time
- [ ] Victory detection with edge cases

#### Documentation:
- [ ] Update README.md with new board info
- [ ] Update docs/gameplay-guide.md for traditional board
- [ ] Update docs/requirements-h1.md if needed

### Testing Checklist:
- [ ] Complete end-to-end games on both boards
- [ ] All interactions work smoothly
- [ ] No console errors
- [ ] Victory conditions accurate
- [ ] Sound effects work
- [ ] Player names display correctly
- [ ] Board selection intuitive
- [ ] Visual polish complete

### Git Checkpoint:
```bash
git add .
git commit -m "Milestone 6: Polish and comprehensive testing complete"
git tag -a v2-m6-complete -m "Multi-board system complete and polished"
git push origin main
git push origin v2-m6-complete
```

---

## Final File Structure

```
src/
├── engine/
│   ├── types.ts (updated with BoardConfig)
│   ├── boardConfig.ts (new - interface)
│   ├── engine.ts (updated for multi-board)
│   ├── boards/
│   │   ├── simpleBoard.ts (10 nodes)
│   │   ├── traditionalBoard.ts (23 nodes)
│   │   ├── simpleCaptures.ts (moved from configCaptures.ts)
│   │   └── traditionalCaptures.ts (new)
│   └── [remove old config files]
├── ui/
│   ├── BoardSelect.tsx (new)
│   ├── RoleSelect.tsx (updated)
│   ├── Board.tsx (updated for multi-board)
│   └── HUD.tsx (updated for dynamic stats)
├── assets/
│   └── audio/
│       ├── goat-win.mp3
│       └── tiger-win.mp3
└── App.tsx (updated for board selection)

docs/
├── milestone-plan-multi-board.md (this file)
├── gameplay-guide.md (update for traditional board)
├── requirements-h1.md (update if needed)
└── [other docs]
```

---

## Key Design Principles

1. **Board Config as Single Source of Truth:** All board-specific rules come from BoardConfig
2. **Scalability:** Easy to add new board types in the future
3. **Testability:** Each milestone produces a working, testable game
4. **No Breaking Changes:** Simple board continues to work throughout refactor
5. **Clean Separation:** UI layer doesn't know board-specific logic
6. **Git Safety:** Tag after each milestone for easy rollback

---

## Rollback Strategy

If any milestone breaks the game:

```bash
# See all tags
git tag -l

# Go back to previous milestone
git reset --hard v2-m[X]-[name]

# Force push (careful!)
git push origin main --force
```

---

## Notes for Implementation

- **Start Fresh:** Begin each milestone with a clear mind
- **Test Frequently:** Don't wait until the end to test
- **Commit Often:** Small commits are easier to debug
- **One Thing at a Time:** Don't mix milestone tasks
- **Ask Questions:** If something is unclear, clarify before coding
- **Take Breaks:** 3-4 hours is a lot - break it into sessions

---

## Success Criteria

✅ Both boards work flawlessly  
✅ Smooth board selection experience  
✅ Correct victory conditions for each board  
✅ Professional, polished UI  
✅ No console errors  
✅ All sounds work  
✅ Player names display correctly  
✅ Code is clean and maintainable  
✅ Easy to add more boards in the future  

---

**Ready to implement when you have time!** 🚀
