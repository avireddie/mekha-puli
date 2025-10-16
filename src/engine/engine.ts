import type { GameState, Action, Role, BoardConfig } from './types';
import { simpleBoardConfig } from './boards/simpleBoard';

export function initGame(boardConfig: BoardConfig = simpleBoardConfig): GameState {
  return {
    boardConfig,
    currentTurn: 'Player',
    actions: [],
    tigerAt: [...boardConfig.initialTigers],
    goatsAt: [],
    goatsPlaced: 0,
    goatsCaptured: 0,
    phase: 'placement',
    currentPlayer: 'Player',
    selectedPiece: undefined
  };
}

export function getLegalActions(state: GameState): Action[] {
  const actions: Action[] = [];
  
  if (state.currentPlayer === 'Player') {
    // Goat player logic
    if (state.phase === 'placement') {
      // Find empty nodes
      const emptyNodes = state.boardConfig.nodes
        .map(n => n.id)
        .filter(id => !state.tigerAt.includes(id) && !state.goatsAt.includes(id));
      
      emptyNodes.forEach(nodeId => {
        actions.push({
          actorId: 'player',
          targetId: nodeId,
          type: 'placeGoat'
        });
      });
    } else {
      // Movement phase - find moves for all goats
      state.goatsAt.forEach(goatId => {
        const node = state.boardConfig.nodes.find(n => n.id === goatId);
        if (node) {
          node.connectedTo.forEach(connectedId => {
            if (!state.tigerAt.includes(connectedId) && !state.goatsAt.includes(connectedId)) {
              actions.push({
                actorId: 'player',
                from: goatId,
                to: connectedId,
                type: 'moveGoat'
              });
            }
          });
        }
      });
    }
  } else {
    // Tiger player logic - handle multiple tigers
    state.tigerAt.forEach(tigerId => {
      const node = state.boardConfig.nodes.find(n => n.id === tigerId);
      if (node) {
        // Regular moves
        node.connectedTo.forEach(connectedId => {
          if (!state.tigerAt.includes(connectedId) && !state.goatsAt.includes(connectedId)) {
            actions.push({
              actorId: 'tiger',
              from: tigerId,
              to: connectedId,
              type: 'moveTiger'
            });
          }
        });
        
        // Capture moves
        state.boardConfig.captureMoves.forEach(capture => {
          if (capture.from === tigerId && 
              state.goatsAt.includes(capture.over) && 
              !state.goatsAt.includes(capture.to) &&
              !state.tigerAt.includes(capture.to)) {
            actions.push({
              actorId: 'tiger',
              from: capture.from,
              to: capture.to,
              type: 'captureTiger',
              capturedGoat: capture.over
            });
          }
        });
      }
    });
  }
  
  return actions;
}

export function applyAction(state: GameState, action: Action): GameState {
  const newState = { ...state };
  newState.actions = [...state.actions, action];
  
  switch (action.type) {
    case 'placeGoat':
      if (action.targetId) {
        newState.goatsAt = [...state.goatsAt, action.targetId];
        newState.goatsPlaced = state.goatsPlaced + 1;
        
        // Switch to movement phase when all goats are placed
        if (newState.goatsPlaced >= state.boardConfig.totalGoats) {
          newState.phase = 'movement';
        }
        newState.currentPlayer = 'Enemy';
      }
      break;
      
    case 'moveGoat':
      if (action.from && action.to) {
        newState.goatsAt = state.goatsAt.map(goatId => 
          goatId === action.from ? action.to! : goatId
        );
        newState.currentPlayer = 'Enemy';
      }
      break;
      
    case 'moveTiger':
      if (action.from && action.to) {
        newState.tigerAt = state.tigerAt.map(id => 
          id === action.from ? action.to! : id
        );
        newState.currentPlayer = 'Player';
      }
      break;
      
    case 'captureTiger':
      if (action.from && action.to && action.capturedGoat) {
        newState.tigerAt = state.tigerAt.map(id => 
          id === action.from ? action.to! : id
        );
        newState.goatsAt = state.goatsAt.filter(goatId => goatId !== action.capturedGoat);
        newState.goatsCaptured = state.goatsCaptured + 1;
        newState.currentPlayer = 'Player';
      }
      break;
  }
  
  return newState;
}

export function checkVictory(state: GameState): Role | undefined {
  // Tiger wins by capturing enough goats
  if (state.goatsCaptured >= state.boardConfig.tigersWinAt) {
    return 'Enemy';
  }
  
  // Goats win by immobilizing all tigers
  // We need to check if tigers have any legal moves, regardless of current player
  const tigerActions: Action[] = [];
  
  state.tigerAt.forEach(tigerId => {
    const node = state.boardConfig.nodes.find(n => n.id === tigerId);
    if (node) {
      // Regular moves
      node.connectedTo.forEach(connectedId => {
        if (!state.tigerAt.includes(connectedId) && !state.goatsAt.includes(connectedId)) {
          tigerActions.push({
            actorId: 'tiger',
            from: tigerId,
            to: connectedId,
            type: 'moveTiger'
          });
        }
      });
      
      // Capture moves
      state.boardConfig.captureMoves.forEach(capture => {
        if (capture.from === tigerId && 
            state.goatsAt.includes(capture.over) && 
            !state.goatsAt.includes(capture.to) &&
            !state.tigerAt.includes(capture.to)) {
          tigerActions.push({
            actorId: 'tiger',
            from: capture.from,
            to: capture.to,
            type: 'captureTiger',
            capturedGoat: capture.over
          });
        }
      });
    }
  });
  
  if (tigerActions.length === 0) {
    return 'Player';
  }
  
  return undefined;
}
