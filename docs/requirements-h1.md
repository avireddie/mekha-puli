# Requirements - Horizon 1

User-facing requirements for Mekha Puli 2-player local pass-and-play game.

## User Stories

### Role Selection

**US-1**: As **Player 1**, I want to choose whether I play as Tiger or Goats, so that I can select my preferred play style.
- **Acceptance Criteria**:
  - Clear role selection screen on game start
  - Visual representation of each role (Tiger 🐅 / Goats 🐐)
  - Role descriptions explain objectives
  - Selection is simple (one click/tap)

**US-2**: As **Player 2**, I want to know which role I got after Player 1 selects, so I understand what pieces I control.
- **Acceptance Criteria**:
  - System automatically assigns remaining role to Player 2
  - Clear indication of which player has which role
  - No ambiguity about assignments

### Turn Management

**US-3**: As **a player**, I want to clearly see when it's my turn, so I know when to make my move.
- **Acceptance Criteria**:
  - Prominent turn indicator in HUD
  - Visual distinction between "Your Turn" and "Waiting"
  - Turn indicator updates immediately after moves
  - No confusion about whose turn it is

**US-4**: As **a player**, I want to see what actions I can take on my turn, so I don't make illegal moves.
- **Acceptance Criteria**:
  - Legal moves highlighted on the board
  - Contextual instructions in HUD (e.g., "Place a goat")
  - Illegal moves are prevented/blocked
  - Clear visual feedback for clickable nodes

**US-5**: As **a player**, I want the game to prevent me from moving during my opponent's turn, so the game is fair.
- **Acceptance Criteria**:
  - Nodes are not clickable during opponent's turn
  - Attempting to click shows "Not your turn" (or is ignored)
  - Clear "Waiting..." indicator when not my turn
  - No way to cheat or skip opponent's turn

### Gameplay

**US-6**: As **the Goat player**, I want to place my goats one at a time during Phase 1, so I can strategically position them.
- **Acceptance Criteria**:
  - Can only place one goat per turn
  - Can place on any empty node
  - Counter shows "X/5 goats placed"
  - Automatically moves to Phase 2 when all 5 placed

**US-7**: As **the Tiger player**, I want to move or capture on every turn, so I can work toward winning.
- **Acceptance Criteria**:
  - Can move to adjacent empty nodes
  - Can capture by jumping over goats
  - Legal moves clearly highlighted
  - Different visual for capture moves vs regular moves

**US-8**: As **the Goat player in Phase 2**, I want to move my goats to trap the tiger, so I can win.
- **Acceptance Criteria**:
  - Can select any goat I control
  - Can move to adjacent empty nodes only (no jumping)
  - Legal moves shown after selecting goat
  - Cannot move to occupied nodes

### Game State Visibility

**US-9**: As **a player**, I want to see the current game statistics at all times, so I know the game progress.
- **Acceptance Criteria**:
  - Goats Placed counter (X/5)
  - Goats Captured counter (X/2)
  - Current phase (Placement / Movement)
  - Always visible in HUD

**US-10**: As **a player**, I want to see all pieces on the board clearly, so I can plan my strategy.
- **Acceptance Criteria**:
  - Tiger clearly marked (🐅 + orange)
  - Goats clearly marked (🐐 + teal)
  - Empty nodes distinguishable
  - Board structure clear (nodes and connections)

### Victory & Game End

**US-11**: As **the Tiger player**, I want to know immediately when I capture 2 goats and win, so I can celebrate.
- **Acceptance Criteria**:
  - Game ends when 2nd goat captured
  - Clear "You win!" message for Tiger player
  - Clear "Opponent wins" for Goat player
  - Option to start new game

**US-12**: As **the Goat player**, I want to know immediately when the Tiger has no moves and I win, so I can celebrate.
- **Acceptance Criteria**:
  - Game ends when Tiger has no legal moves
  - Clear "You win!" message for Goat player
  - Clear "Opponent wins" for Tiger player
  - Option to start new game

**US-13**: As **any player**, I want to start a new game at any time, so we can play again or reset mistakes.
- **Acceptance Criteria**:
  - "New Game" button always accessible
  - Returns to role selection screen
  - Clears all game state
  - Confirmation not required (quick restart)

### Pass-and-Play UX

**US-14**: As **a player**, I want clear instructions on what to do, so I don't get confused during my first game.
- **Acceptance Criteria**:
  - Contextual help text in HUD
  - Instructions match current turn and phase
  - Simple, clear language
  - No need to read manual to play

**US-15**: As **Player 2**, I want to know when Player 1 is done with their turn, so I know when to take the device.
- **Acceptance Criteria**:
  - Turn indicator changes immediately after move
  - Visual/color change is obvious
  - "Your Turn" appears for new player
  - No ambiguity in turn transitions

## Functional Requirements

### FR1: 2-Player Mode
- **Must support exactly 2 players** on one device
- Pass-and-play turn-taking
- No AI opponent in Horizon 1

### FR2: Role Selection
- Player 1 selects Tiger or Goats
- Player 2 automatically gets remaining role
- Roles persist throughout game

### FR3: Board Rendering
- 10-node triangular board (4 tiers)
- Clear visual representation of all nodes
- Lines showing connections
- SVG-based for scalability

### FR4: Turn Guidance
- **Turn indicator** showing whose turn it is
- Legal moves highlighted on board
- Contextual instructions in HUD
- Illegal moves prevented

### FR5: Status Display
- Goats Placed (X/5)
- Goats Captured (X/2)
- Current Phase (Placement/Movement)
- Whose turn it is (Your Turn / Waiting)

### FR6: Win Celebration
- Detect Tiger win (2 captures)
- Detect Goat win (Tiger immobile)
- Clear winner announcement
- Map Role to Player 1 or Player 2 for display

### FR7: New Game
- New Game button in HUD
- Returns to role selection
- Resets all state
- Quick restart for multiple games

### FR8: Turn Engine & Phases
- Goat player goes first (always)
- Alternating turns
- Phase 1: Goat placement (5 turns for goats)
- Phase 2: Both players move
- Turn switches after every action

### FR9: Move Validation
- Only one-step moves along connections
- Cannot move to occupied nodes
- Tiger can jump over goats to capture
- Goats cannot jump

### FR10: Capture Logic (Tiger)
- Adjacent goat + empty landing node = valid capture
- Remove captured goat
- Increment capture counter
- Check for victory after capture

### FR11: Victory Conditions
- Tiger wins: goatsCaptured >= 2
- Goats win: Tiger has no legal moves
- Game ends immediately upon victory

### FR12: Internal State Tracking
- Board occupancy (tigerAt, goatsAt)
- Turn tracking (currentTurn)
- Phase tracking (placement / movement)
- Counters (goatsPlaced, goatsCaptured)
- Action history (for debugging)

## Non-Functional Requirements

### NFR1: Performance
- Game responds to clicks/taps instantly (< 100ms)
- No lag in UI updates
- Smooth on mobile and desktop

### NFR2: Usability
- No learning curve - playable immediately
- Clear visual hierarchy
- Large touch targets for mobile
- Accessible text and colors

### NFR3: Reliability
- No crashes or freezes
- Handles all edge cases gracefully
- Console logging for debugging
- Consistent game state

### NFR4: Compatibility
- Works on modern browsers (Chrome, Safari, Firefox)
- Responsive on mobile and desktop
- No installation required
- Can play over local network (--host flag)

## Out of Scope (Future Horizons)

- AI opponent
- Online multiplayer
- Player profiles / accounts
- Move undo / redo
- Game history / replay
- Animations
- Sound effects
- Multiple board sizes
- Tournament mode
- Spectator mode
