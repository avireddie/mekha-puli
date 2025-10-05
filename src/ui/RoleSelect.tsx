import React, { useState } from 'react';
import type { Role } from '../engine/types';

interface RoleSelectProps {
  onRoleSelect: (role: Role, player1Name: string, player2Name: string) => void;
}

export const RoleSelect: React.FC<RoleSelectProps> = ({ onRoleSelect }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');

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
    onRoleSelect(role, player1Name.trim(), player2Name.trim());
  };

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
              onClick={() => setStep(1)}
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
