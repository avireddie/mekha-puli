import React from 'react';
import type { Role } from '../engine/types';

interface HUDProps {
  currentTurn: Role;
  phase: 'placement' | 'movement';
  goatsPlaced: number;
  goatsCaptured: number;
  playerRole: Role;
  onNewGame: () => void;
  currentPlayerName?: string;
  currentPlayerType?: string;
}

export const HUD: React.FC<HUDProps> = ({
  currentTurn,
  phase,
  goatsPlaced,
  goatsCaptured,
  playerRole,
  onNewGame,
  currentPlayerName = 'Current Player',
  currentPlayerType = 'Player'
}) => {
  const isGoatPlayer = playerRole === 'Player';
  
  const getStatusMessage = () => {
    if (phase === 'placement') {
      if (currentTurn === 'Player') {
        return `Place a goat (${goatsPlaced}/5 placed)`;
      } else {
        return `Tiger's turn - move tiger or capture`;
      }
    } else {
      if (currentTurn === 'Player') {
        return `Move a goat`;
      } else {
        return `Tiger's turn - move tiger or capture`;
      }
    }
  };

  return (
    <div className="hud">
      <div className="hud-top">
        <div className="game-status">
          <div className="current-turn">
            <span className="turn-indicator active">
              {currentPlayerName}'s Turn ({currentPlayerType})
            </span>
          </div>
          <div className="status-message">
            {getStatusMessage()}
          </div>
        </div>
        
        <button className="new-game-button" onClick={onNewGame}>
          New Game
        </button>
      </div>
      
      <div className="hud-stats">
        <div className="stat-item">
          <div className="stat-label">Goats Placed</div>
          <div className="stat-value">{goatsPlaced}/5</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-label">Goats Captured</div>
          <div className="stat-value">{goatsCaptured}/2</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-label">Phase</div>
          <div className="stat-value">
            {phase === 'placement' ? 'Placement' : 'Movement'}
          </div>
        </div>
      </div>
    </div>
  );
};