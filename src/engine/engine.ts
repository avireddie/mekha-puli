import { GameState, Action, Role } from './types';
import { configTriangle10 } from './configTriangle10';

export function initGame(): GameState {
  return {
    nodes: configTriangle10,
    currentTurn: 'Player',
    actions: [],
  };
}

export function getLegalActions(state: GameState): Action[] {
  // TODO: derive allowed actions from state
  return [];
}

export function applyAction(state: GameState, action: Action): GameState {
  // TODO: update nodes, actions, and currentTurn
  return state;
}

export function checkVictory(state: GameState): Role | undefined {
  // TODO: compute win condition
  return undefined;
}
