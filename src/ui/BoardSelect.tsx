import React from 'react';

interface BoardSelectProps {
  onBoardSelect: (boardId: 'simple' | 'traditional') => void;
}

export const BoardSelect: React.FC<BoardSelectProps> = ({ onBoardSelect }) => {
  return (
    <div className="board-select">
      <h2>Choose Board Type</h2>
      <p>Select the board configuration for your game:</p>
      
      <div className="board-cards">
        <div className="board-card" onClick={() => onBoardSelect('simple')}>
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

        <div className="board-card" onClick={() => onBoardSelect('traditional')}>
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
};
