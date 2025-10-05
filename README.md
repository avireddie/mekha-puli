# Mekha Puli

A kid-friendly **2-player local pass-and-play** board game built with React + TypeScript (Vite).  
**Horizon 1 goal**: Play a working version locally with your son.

**How to Play**: Player 1 selects their role (Tiger 🐅 or Goats 🐐), Player 2 automatically gets the other role. Take turns on the same device, with the HUD clearly showing whose turn it is!


```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser to play!

### Network Testing
For testing on your phone (same Wi-Fi):
```bash
npm run dev -- --host
```
Then open the network URL shown in terminal (e.g., `http://192.168.x.x:5173`)

## 🎮 Game Rules

### Setup
- **Players**: 2 players on one device (pass-and-play)
- **Role Selection**: Player 1 chooses Tiger 🐅 or Goats 🐐, Player 2 gets the other role
- **Board**: 10-node triangular board (4 tiers)
- **Tiger**: Starts at n1 (apex/top of triangle)
- **Goats**: 5 goats to be placed during the game
- **Turn Order**: Goat player goes first, then Tiger player, alternating throughout
- **Turn Indicator**: HUD clearly shows whose turn it is at all times

### Phase 1: Goat Placement
- **Goat player**: Places one goat per turn on any empty node
- **Tiger player**: Can move to adjacent empty nodes OR capture by jumping over goats
- Phase continues until all 5 goats are placed

### Phase 2: Goat Movement
- **Goat player**: Can move goats to adjacent empty nodes (no jumping)
- **Tiger player**: Continues with same movement options as Phase 1

### Tiger Movement
- **Regular Move**: Move to any adjacent empty node
- **Capture Move**: Jump over a goat to an empty node beyond (goat is removed)

### Victory Conditions
- **Tiger player wins**: Captures 2 goats
- **Goat player wins**: Tiger has no legal moves or captures available

## 🏗️ Architecture

### Game Logic Layer (`/src/engine/`)
- Encapsulates all core rules of Mekha Puli, independent of UI
- Manages board structure (nodes/edges)
- Handles move validation and captures
- Maintains turn state and victory logic
- Exposes functions: `initGame()`, `getLegalActions()`, `applyAction()`, `checkVictory()`

### UI Layer (`/src/ui/`)
- Renders the triangular board (SVG)
- Highlights valid move options per turn
- Displays game stats (goats placed/captured)
- Shows visual feedback and interactions
- **Turn indicator in HUD** clearly shows which player's turn it is

### Interaction Flow
```
Game logic exposes state → UI renders accordingly
User inputs (clicks/taps) → trigger logic updates
```

## 📋 Requirements

### User-Facing Requirements
- **FR2**: Player 1 role selection (Tiger or Goats), Player 2 gets remaining role
- **FR3**: Clear triangular board with all positions visible
- **FR4**: Turn guidance with highlighted legal moves and clear turn indicator
- **FR5**: Status display (goats placed/captured, whose turn it is)
- **FR6**: Win celebration with clear winner announcement (Player 1 or Player 2)
- **FR7**: New game functionality

### Game Mechanics Requirements
- **FR8**: Turn engine & phase transitions (Placement → Movement)
- **FR9**: Move validation along connecting lines
- **FR10**: Tiger capture logic (jump over goat to empty node)
- **FR11**: Victory conditions (Tiger: 2 captures, Goats: Tiger immobile)
- **FR12**: Authoritative game state tracking

## 🎯 Milestones

### ✅ M0: Environment Setup
- React + TypeScript (Vite) project
- Local development server

### ✅ M1: Game Logic Layer
- Created `/src/engine/` with typed stubs
- Defined types: `Role`, `Node`, `Edge`, `GameState`, `Action`
- Board config: `configTriangle10.ts` (10 nodes, 4 tiers)
- Engine functions: `initGame`, `getLegalActions`, `applyAction`, `checkVictory`

### ✅ M2: Display & Role Selection
- **2.1** `RoleSelect.tsx` - Player 1 chooses role (Player 2 gets the other)
- **2.2** `Board.tsx` - SVG board rendering
- **2.3** `HUD.tsx` - Stats + turn indicator + new game button
- **2.4** `App.tsx` - Flow control integration for 2-player pass-and-play
- **2.5** Console logging for tapped node IDs

### 🔄 M3: Turn Guidance & Movement
- **3.1** Implement `getLegalActions` for basic moves
- **3.2** Highlight legal moves in `Board.tsx`
- **3.3** Handle `doAction(action)` in `App.tsx`
- **3.4** Show contextual instructions in HUD

### 📋 M4: Capture & Victory
- **4.1** Extend Action type with capture logic
- **4.2** Add capture logic to `getLegalActions`
- **4.3** Remove goat after capture in `applyAction`
- **4.4** Add `checkVictory` (Tiger: ≥2 captures, Goats: Tiger stuck)
- **4.5** Show win/lose overlay and reset option

### 📋 M5: Game State & Reset
- **5.1** Show goats placed/captured in HUD
- **5.2** Implement 'New Game' reset

## 📁 Repository Structure

```
docs/
  engine-contract.md
  requirements-h1.md
src/
  engine/           # Game logic layer
    types.ts
    configTriangle10.ts
    engine.ts
  ui/              # UI components
    RoleSelect.tsx
    Board.tsx
    HUD.tsx
  assets/          # Game assets
  App.tsx
  main.tsx
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3
- **Game Logic**: Pure TypeScript (UI-agnostic)

## 🎯 Future Horizons

- **Horizon 1**: Local web (Vite + React TS) ✅
- **Horizon 2-3**: Reuse engine in React Native + Expo