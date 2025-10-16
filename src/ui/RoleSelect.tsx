import React, { useState } from 'react';
import type { Role } from '../engine/types';

interface RoleSelectProps {
  onRoleSelect: (role: Role, player1Name: string, player2Name: string, boardType: 'simple' | 'traditional') => void;
}

export const RoleSelect: React.FC<RoleSelectProps> = ({ onRoleSelect }) => {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [boardType, setBoardType] = useState<'simple' | 'traditional' | null>(null);
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');

  const handleBoardSelect = (board: 'simple' | 'traditional') => {
    setBoardType(board);
    setStep(1);
  };

  const handlePlayer1Next = () => {
    if (player1Name.trim()) {
      setStep(2);
    }
  };

  const handlePlayer2Next = () => {
    if (player2Name.trim()) {
      setStep(3);
    }
  };

  const handleRoleSelection = (role: Role) => {
    if (boardType) {
      onRoleSelect(role, player1Name.trim(), player2Name.trim(), boardType);
    }
  };

  // Step 0: Board selection
  if (step === 0) {
    return (
      <div className="role-select">
        <h2>Choose Board Type</h2>
        <p>Select the board configuration for your game:</p>
        
        <div className="board-cards">
          <div className="board-card" onClick={() => handleBoardSelect('simple')}>
            <div className="board-card-header">
              <h3>Simple Board</h3>
              <span className="board-emoji">🔺</span>
            </div>
            <div className="board-card-content">
              <div className="board-stats">
                <div className="stat">
                  <span className="stat-label">Nodes:</span>
                  <span className="stat-value">10</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Tigers:</span>
                  <span className="stat-value">1</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Goats:</span>
                  <span className="stat-value">5</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Tiger Wins At:</span>
                  <span className="stat-value">2 captures</span>
                </div>
              </div>
              <p className="board-description">
                Classic 10-node triangular board. Perfect for quick games and learning the rules.
              </p>
              <button className="select-board-btn">Select Simple Board</button>
            </div>
          </div>

          <div className="board-card" onClick={() => handleBoardSelect('traditional')}>
            <div className="board-card-header">
              <h3>Traditional Board</h3>
              <span className="board-emoji">🔺🔺🔺</span>
            </div>
            <div className="board-card-content">
              <div className="board-stats">
                <div className="stat">
                  <span className="stat-label">Nodes:</span>
                  <span className="stat-value">23</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Tigers:</span>
                  <span className="stat-value">3</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Goats:</span>
                  <span className="stat-value">15</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Tiger Wins At:</span>
                  <span className="stat-value">5 captures</span>
                </div>
              </div>
              <p className="board-description">
                Full traditional 23-node board with 3 tigers. More strategic and challenging gameplay.
              </p>
              <button className="select-board-btn">Select Traditional Board</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 1: Player 1 enters name
  if (step === 1) {
    return (
      <div className="role-select">
        <h2>Welcome to Mekha Puli!</h2>
        <div className="name-input-container">
          <p className="name-prompt">Player 1, enter your name:</p>
          <input
            type="text"
            className="name-input"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handlePlayer1Next()}
            placeholder="Enter your name"
            autoFocus
            maxLength={20}
          />
          <button 
            className="next-button"
            onClick={handlePlayer1Next}
            disabled={!player1Name.trim()}
          >
            Next →
          </button>
        </div>
      </div>
    );
  }

  // Step 2: Player 2 enters name
  if (step === 2) {
    return (
      <div className="role-select">
        <h2>Welcome to Mekha Puli!</h2>
        <div className="name-input-container">
          <p className="name-prompt">Player 2, enter your name:</p>
          <input
            type="text"
            className="name-input"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handlePlayer2Next()}
            placeholder="Enter your name"
            autoFocus
            maxLength={20}
          />
          <div className="button-group">
            <button 
              className="back-button"
              onClick={() => setStep(0)}
            >
              ← Back
            </button>
            <button 
              className="next-button"
              onClick={handlePlayer2Next}
              disabled={!player2Name.trim()}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Player 1 selects role
  return (
    <div className="role-select">
      <h2>{player1Name}, Choose Your Role</h2>
      <p className="player-info">{player2Name} will play the other role</p>
      <div className="role-options">
        <button 
          className="role-button goat-button"
          onClick={() => handleRoleSelection('Player')}
        >
          <div className="role-icon">🐐</div>
          <div className="role-title">Play as Goats</div>
          <div className="role-description">
            Place and move 5 goats to block the Tiger
          </div>
        </button>
        
        <button 
          className="role-button tiger-button"
          onClick={() => handleRoleSelection('Enemy')}
        >
          <div className="role-icon">🐅</div>
          <div className="role-title">Play as Tiger</div>
          <div className="role-description">
            Move and capture goats to win
          </div>
        </button>
      </div>
      <button 
        className="back-button-small"
        onClick={() => setStep(2)}
      >
        ← Back
      </button>
    </div>
  );
};
