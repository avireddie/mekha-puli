import type { GameState, Action, Role } from './types';
import { configTriangle10 } from './configTriangle10';
import { captureMoves } from './configCaptures';

export function initGame(): GameState {
  return {
    nodes: configTriangle10,
    currentTurn: 'Player',
    actions: [],
    tigerAt: 'n1',
    goatsAt: [],
    goatsPlaced: 0,
    goatsCaptured: 0,
    phase: 'placement'
  };
}

export function getLegalActions(state: GameState): Action[] {
  const actions: Action[] = [];
  
  if (state.phase === 'placement' && state.currentTurn === 'Player') {
    // Goats can place on any empty node
    const emptyNodes = state.nodes
      .filter(node => !state.goatsAt.includes(node.id) && node.id !== state.tigerAt)
      .map(node => ({
        actorId: 'player',
        targetId: node.id,
        type: 'placeGoat' as const
      }));
    actions.push(...emptyNodes);
  } else if (state.currentTurn === 'Enemy') {
    // Tiger can move to adjacent empty nodes or capture
    const tigerNode = state.nodes.find(n => n.id === state.tigerAt);
    if (tigerNode) {
      // Regular moves to adjacent empty nodes
      tigerNode.connectedTo.forEach(connectedId => {
        if (!state.goatsAt.includes(connectedId) && connectedId !== state.tigerAt) {
          actions.push({
            actorId: 'tiger',
            from: state.tigerAt,
            to: connectedId,
            type: 'moveTiger'
          });
        }
      });
      
      // Capture moves using pre-defined capture configuration
      captureMoves.forEach(capture => {
        if (capture.from === state.tigerAt && 
            state.goatsAt.includes(capture.over) && 
            !state.goatsAt.includes(capture.to)) {
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
  } else if (state.phase === 'movement' && state.currentTurn === 'Player') {
    // Goats can move to adjacent empty nodes
    state.goatsAt.forEach(goatId => {
      const goatNode = state.nodes.find(n => n.id === goatId);
      if (goatNode) {
        goatNode.connectedTo.forEach(connectedId => {
          if (!state.goatsAt.includes(connectedId) && connectedId !== state.tigerAt) {
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
        if (newState.goatsPlaced >= 5) {
          newState.phase = 'movement';
        }
      }
      break;
      
    case 'moveGoat':
      if (action.from && action.to) {
        newState.goatsAt = state.goatsAt.map(goatId => 
          goatId === action.from ? action.to! : goatId
        );
      }
      break;
      
    case 'moveTiger':
      if (action.to) {
        newState.tigerAt = action.to;
      }
      break;
      
    case 'captureTiger':
      if (action.to && action.capturedGoat) {
        newState.tigerAt = action.to;
        newState.goatsAt = state.goatsAt.filter(goatId => goatId !== action.capturedGoat);
        newState.goatsCaptured = state.goatsCaptured + 1;
      }
      break;
  }
  
  // Switch turns
  newState.currentTurn = state.currentTurn === 'Player' ? 'Enemy' : 'Player';
  
  return newState;
}

export function checkVictory(state: GameState): Role | undefined {
  // Tiger wins with 2 captures
  if (state.goatsCaptured >= 2) {
    return 'Enemy';
  }
  
  // Check if Tiger has no legal moves (Goats win)
  const tigerActions = getLegalActions({ ...state, currentTurn: 'Enemy' });
  if (tigerActions.length === 0) {
    return 'Player';
  }
  
  return undefined;
}
