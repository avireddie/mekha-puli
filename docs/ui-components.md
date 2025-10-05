# UI Components Documentation

Documentation for UI components in the Mekha Puli 2-player game.

## Component Overview

The UI is built with three main components that work together to provide a seamless 2-player experience:

1. **RoleSelect** - Player 1 selects role, Player 2 gets the other
2. **Board** - Visual game board with turn-based interactions
3. **HUD** - Turn indicator, stats, and game controls

---

## RoleSelect Component

**File**: `/src/ui/RoleSelect.tsx`

### Purpose
Allows Player 1 to select their role (Tiger or Goats). Player 2 automatically gets the remaining role.

### Props
```typescript
interface RoleSelectProps {
  onRoleSelect: (role: Role) => void;
}
```

### Features
- **Visual role cards** with icons and descriptions
- **Hover effects** for better UX
- **Clear descriptions** of each role's objective
- Automatically determines Player 2's role

### Usage
```typescript
<RoleSelect onRoleSelect={handleRoleSelect} />
```

### Player Experience
1. Player 1 sees two role options
2. Clicks preferred role
3. Game starts with roles assigned
4. Players know who controls what

---

## Board Component

**File**: `/src/ui/Board.tsx`

### Purpose
Renders the triangular game board and handles player interactions during their turns.

### Props
```typescript
interface BoardProps {
  nodes: Node[];              // Board configuration
  tigerAt: string;            // Tiger's current position
  goatsAt: string[];          // Array of goat positions
  currentTurn: Role;          // Whose turn it is
  onNodeClick: (nodeId: string) => void;  // Click handler
  legalMoves?: string[];      // Highlighted legal moves
}
```

### Features
- **SVG-based rendering** - Scalable triangular board
- **Visual piece representation** - 🐅 for Tiger, 🐐 for Goats
- **Legal move highlighting** - Yellow circles show valid moves
- **Click handling** - Only allows clicks during player's turn
- **Node connections** - Lines show movement paths
- **Console logging** - Logs all node clicks for debugging

### Turn-Based Behavior
- **Current player's turn**: Legal moves highlighted, nodes clickable
- **Other player's turn**: Nodes not clickable, no highlights
- **Empty nodes**: Clickable for placement (Phase 1)
- **Piece selection**: Click goat to see its legal moves (Phase 2)

### Visual States
- **Empty node**: Light gray (#f0f0f0)
- **Tiger node**: Orange (#ff6b35)
- **Goat node**: Teal (#4ecdc4)
- **Legal move**: Yellow (#ffd93d) with bold border

---

## HUD Component

**File**: `/src/ui/HUD.tsx`

### Purpose
Displays game state, turn indicator, and controls. **Critical for 2-player pass-and-play**.

### Props
```typescript
interface HUDProps {
  currentTurn: Role;          // Whose turn (Player/Enemy)
  phase: 'placement' | 'movement';  // Current game phase
  goatsPlaced: number;        // How many goats placed (0-5)
  goatsCaptured: number;      // How many goats captured (0-2)
  playerRole: Role;           // This device user's role
  onNewGame: () => void;      // New game handler
}
```

### Features

#### 1. Turn Indicator
Shows whose turn it is:
- **"Your Turn"** with green background when it's your turn
- **"Waiting..."** with gray background when it's opponent's turn
- Always visible at top of HUD

#### 2. Contextual Instructions
Displays what the current player should do:
- **Phase 1 (Goats)**: "Place a goat (X/5 placed)"
- **Phase 1 (Tiger)**: "Your turn - move tiger or capture"
- **Phase 2 (Goats)**: "Move a goat"
- **Phase 2 (Tiger)**: "Your turn - move tiger or capture"
- **Waiting**: "[Role]'s turn - waiting..."

#### 3. Game Statistics
Live display of:
- **Goats Placed**: X/5 (progress toward Phase 2)
- **Goats Captured**: X/2 (progress toward Tiger victory)
- **Phase**: "Placement" or "Movement"

#### 4. New Game Button
- Always accessible
- Resets game completely
- Returns to role selection

### Turn Indicator Logic

The HUD uses `currentTurn` and `playerRole` to determine display:

```typescript
const isPlayerTurn = currentTurn === playerRole;

// Turn indicator
{isPlayerTurn ? 'Your Turn' : 'Waiting...'}

// Contextual message
if (isGoatPlayer && isPlayerTurn) {
  return "Place a goat" or "Move a goat"
} else if (isGoatPlayer && !isPlayerTurn) {
  return "Tiger's turn - waiting..."
} // etc...
```

### 2-Player UX Considerations
- **Clear turn indication** prevents confusion about whose turn
- **Contextual instructions** guide players on what to do
- **Live stats** keep both players informed of game state
- **Always-available New Game** allows quick restarts

---

## App Component Integration

**File**: `/src/App.tsx`

### Flow Control for 2-Player Game

```typescript
// 1. No role selected - show RoleSelect
if (!playerRole) {
  return <RoleSelect onRoleSelect={handleRoleSelect} />
}

// 2. Role selected - show game
return (
  <>
    <HUD {...hudProps} />      // Turn indicator + stats
    <Board {...boardProps} />  // Game board
  </>
)
```

### Turn Management
```typescript
const handleNodeClick = (nodeId: string) => {
  // Check if it's this player's turn
  const isPlayerTurn = gameState.currentTurn === playerRole;
  if (!isPlayerTurn) {
    console.log('Not your turn');
    return;  // Prevent action
  }
  
  // Apply action and switch turns
  const newState = applyAction(gameState, action);
  // Now it's the other player's turn
}
```

### Role Mapping
- **Player 1** selects role → stores as `playerRole`
- **Engine** uses `Role.Player` (Goats) and `Role.Enemy` (Tiger)
- **UI** displays "Your Turn" based on `currentTurn === playerRole`
- **Victory** maps `Role` back to "Player 1" or "Player 2"

---

## Styling

**File**: `/src/App.css`

### Key Styles for 2-Player UX

#### Turn Indicator Colors
```css
.turn-indicator.active {
  background: #28a745;  /* Green - your turn */
  color: white;
}

.turn-indicator.waiting {
  background: #e9ecef;  /* Gray - waiting */
  color: #666;
}
```

#### Board Interaction
```css
circle {
  cursor: pointer;  /* Only during player's turn */
}

.legal-move {
  stroke: #ff6b35;
  stroke-width: 3;
}
```

---

## Component Communication Flow

```
User clicks node → Board.onNodeClick(nodeId)
                 ↓
         App.handleNodeClick(nodeId)
                 ↓
         Check: Is it player's turn?
                 ↓
         Apply action via engine
                 ↓
         Update state (switches turn)
                 ↓
         HUD updates turn indicator
         Board re-renders with new state
```

---

## Best Practices for 2-Player Components

1. **Always check turn** before allowing actions
2. **Clear visual feedback** on whose turn it is
3. **Disable interactions** when not player's turn
4. **Log actions** for debugging turn flow
5. **Handle edge cases** (game over, invalid moves)

---

## Future Enhancements

Potential improvements for 2-player experience:
- Player names instead of "Player 1" and "Player 2"
- Turn timer (optional)
- Move history/undo
- Colorblind-friendly indicators
- Sound effects for turn changes
- Animated turn transitions
