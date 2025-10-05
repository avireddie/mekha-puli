import React from 'react';
import type { Node, Role } from '../engine/types';

interface BoardProps {
  nodes: Node[];
  tigerAt: string;
  goatsAt: string[];
  currentTurn: Role;
  onNodeClick: (nodeId: string) => void;
  legalMoves?: string[];
}

export const Board: React.FC<BoardProps> = ({ 
  nodes, 
  tigerAt, 
  goatsAt, 
  currentTurn, 
  onNodeClick,
  legalMoves = []
}) => {
  // Calculate positions for each tier (triangle-shaped: narrow at top, wide at base)
  const getNodePosition = (nodeId: string): { x: number; y: number } => {
    const baseX = 500;  // Center X
    const baseY = 100;  // Top Y
    const tierHeight = 150;  // Vertical space between tiers

    switch (nodeId) {
      case 'n1': return { x: baseX, y: baseY };
      
      // Tier 2: Narrow spacing (80px)
      case 'n2': return { x: baseX - 80, y: baseY + tierHeight };
      case 'n3': return { x: baseX, y: baseY + tierHeight };
      case 'n4': return { x: baseX + 80, y: baseY + tierHeight };
      
      // Tier 3: Medium spacing (160px)
      case 'n5': return { x: baseX - 160, y: baseY + tierHeight * 2 };
      case 'n6': return { x: baseX, y: baseY + tierHeight * 2 };
      case 'n7': return { x: baseX + 160, y: baseY + tierHeight * 2 };
      
      // Tier 4: Wide spacing (240px) - BASE
      case 'n8': return { x: baseX - 240, y: baseY + tierHeight * 3 };
      case 'n9': return { x: baseX, y: baseY + tierHeight * 3 };
      case 'n10': return { x: baseX + 240, y: baseY + tierHeight * 3 };
      
      default: return { x: 0, y: 0 };
    }
  };

  const renderConnections = () => {
    const connections: JSX.Element[] = [];
    
    nodes.forEach(node => {
      node.connectedTo.forEach(connectedId => {
        const fromPos = getNodePosition(node.id);
        const toPos = getNodePosition(connectedId);
        
        connections.push(
          <line
            key={`${node.id}-${connectedId}`}
            x1={fromPos.x}
            y1={fromPos.y}
            x2={toPos.x}
            y2={toPos.y}
            stroke="#333"
            strokeWidth="2"
          />
        );
      });
    });
    
    return connections;
  };

  const renderNode = (node: Node) => {
    const position = getNodePosition(node.id);
    const isTiger = tigerAt === node.id;
    const isGoat = goatsAt.includes(node.id);
    const isLegalMove = legalMoves.includes(node.id);
    const isClickable = isLegalMove || (!isTiger && !isGoat && currentTurn === 'Player');

    let nodeColor = '#f0f0f0'; // Default empty
    if (isTiger) nodeColor = '#ff6b35'; // Orange for tiger
    if (isGoat) nodeColor = '#4ecdc4'; // Teal for goat
    if (isLegalMove) {
      // Different colors for different players' legal moves
      if (currentTurn === 'Player') {
        nodeColor = '#90EE90'; // Light green for goat player's legal moves
      } else {
        nodeColor = '#ffd93d'; // Yellow for tiger player's legal moves
      }
    }

    return (
      <g key={node.id}>
        <circle
          cx={position.x}
          cy={position.y}
          r="20"
          fill={nodeColor}
          stroke={isLegalMove ? (currentTurn === 'Player' ? '#228B22' : '#ff6b35') : '#333'}
          strokeWidth={isLegalMove ? '3' : '2'}
          onClick={() => {
            console.log(`Clicked node: ${node.id}`);
            onNodeClick(node.id);
          }}
          style={{ 
            cursor: isClickable ? 'pointer' : 'default',
            filter: isClickable ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none'
          }}
        />
        <text
          x={position.x}
          y={position.y + 7}
          textAnchor="middle"
          fontSize="16"
          fill="#333"
          pointerEvents="none"
        >
          {node.id}
        </text>
        {isTiger && (
          <text
            x={position.x}
            y={position.y - 35}
            textAnchor="middle"
            fontSize="24"
            pointerEvents="none"
          >
            🐅
          </text>
        )}
        {isGoat && (
          <text
            x={position.x}
            y={position.y - 35}
            textAnchor="middle"
            fontSize="24"
            pointerEvents="none"
          >
            🐐
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="board-container">
      <svg width="1000" height="800" viewBox="0 0 1000 800">
        {renderConnections()}
        {nodes.map(renderNode)}
      </svg>
    </div>
  );
};
