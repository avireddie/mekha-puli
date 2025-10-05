# Engine Contract

Complete API documentation for the Mekha Puli game engine.

## 2-Player Game Context

This engine is designed for **local 2-player pass-and-play**:
- **Role Mapping**: 
  - `Role.Player` = Goat player (whichever player selected Goats)
  - `Role.Enemy` = Tiger player (whichever player selected Tiger)
- **Turn Management**: 
  - `currentTurn` indicates which role's turn it is
  - UI layer is responsible for mapping roles to "Player 1" or "Player 2" and displaying whose turn it is
- **Game Flow**:
  - Player 1 selects a role (Tiger or Goats)
  - Player 2 automatically gets the remaining role
  - Players take turns on the same device

## Type Definitions

```typescript
export type Role = 'Player' | 'Enemy';

export interface Node {
  id: string;
  tier: number;
  connectedTo: string[];
}

export interface Edge {
  from: string;
  to: string;
}

export interface Action {
  actorId: string;
  targetId?: string;
  type: 'placeGoat' | 'moveGoat' | 'moveTiger' | 'captureTiger';
  from?: string;
  to?: string;
  capturedGoat?: string; // For captureTiger actions
}

export interface GameState {
  nodes: Node[];
  currentTurn: Role;
  actions: Action[];
  winner?: Role;
  // Game state tracking
  tigerAt: string;
  goatsAt: string[];
  goatsPlaced: number;
  goatsCaptured: number;
  phase: 'placement' | 'movement';
}
```

## Function Signatures

```typescript
export function initGame(): GameState
export function getLegalActions(state: GameState): Action[]
export function applyAction(state: GameState, action: Action): GameState
export function checkVictory(state: GameState): Role | undefined
```

## Function Behavior

### `initGame(): GameState`
- Creates initial game state with Tiger at n1 (apex)
- Sets up 10-node triangular board configuration
- Initializes with 0 goats placed, 0 captured
- Sets phase to 'placement', currentTurn to 'Player' (Goat player goes first)

### `getLegalActions(state: GameState): Action[]`
Returns all valid actions for the current player:

**Phase 1 (Placement):**
- If currentTurn is 'Player' (Goat player): Returns `placeGoat` actions for all empty nodes
- If currentTurn is 'Enemy' (Tiger player): Returns `moveTiger` and `captureTiger` actions

**Phase 2 (Movement):**
- If currentTurn is 'Player' (Goat player): Returns `moveGoat` actions for adjacent empty nodes
- If currentTurn is 'Enemy' (Tiger player): Returns `moveTiger` and `captureTiger` actions

### `applyAction(state: GameState, action: Action): GameState`
Applies the action and returns new game state:

- **placeGoat**: Places goat on target node, increments goatsPlaced
- **moveGoat**: Moves goat from current position to target node
- **moveTiger**: Moves tiger from current position to target node
- **captureTiger**: Moves tiger and removes captured goat, increments goatsCaptured
- Switches currentTurn after each action
- Transitions to 'movement' phase when all 5 goats are placed

### `checkVictory(state: GameState): Role | undefined`
Checks win conditions:
- Returns 'Enemy' (Tiger player wins) if goatsCaptured >= 2
- Returns 'Player' (Goat player wins) if Tiger has no legal moves
- Returns undefined if game continues

**Note**: The UI layer should map the returned Role to the actual player (Player 1 or Player 2) for display.

## Example Usage Flow

```typescript
// Initialize game
let gameState = initGame();

// Get legal actions for current player (Goats)
let actions = getLegalActions(gameState);
// Returns: [{ type: 'placeGoat', targetId: 'n2' }, { type: 'placeGoat', targetId: 'n3' }, ...]

// Place a goat
gameState = applyAction(gameState, { type: 'placeGoat', targetId: 'n2' });

// Check if game is over
let winner = checkVictory(gameState);
if (winner) {
  console.log(`Game over! ${winner} wins!`);
}
```

## Board Configuration

The game uses a 10-node triangular board with 4 tiers:
- **Tier 1**: n1 (apex)
- **Tier 2**: n2, n3
- **Tier 3**: n4, n5, n6
- **Tier 4**: n7, n8, n9, n10

Each node connects to its neighbors along the triangular lattice lines.