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
  totalGoats: number;
  tigersWinAt: number;
}

export const HUD: React.FC<HUDProps> = ({
  currentTurn,
  phase,
  goatsPlaced,
  goatsCaptured,
  playerRole,
  onNewGame,
  currentPlayerName = 'Current Player',
  currentPlayerType = 'Player',
  totalGoats,
  tigersWinAt
}) => {
  const isGoatPlayer = playerRole === 'Player';
  
  const getStatusMessage = () => {
    if (phase === 'placement') {
      if (currentTurn === 'Player') {
        return `Place a goat (${goatsPlaced}/${totalGoats} placed)`;
      } else {
        return `Tiger's turn - select a tiger to move`;
      }
    } else {
      if (currentTurn === 'Player') {
        return `Move a goat`;
      } else {
        return `Tiger's turn - select a tiger to move`;
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
          <div className="stat-value">{goatsPlaced}/{totalGoats}</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-label">Goats Captured</div>
          <div className="stat-value">{goatsCaptured}/{tigersWinAt}</div>
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