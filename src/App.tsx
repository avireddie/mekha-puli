import { useState, useEffect } from 'react'
import { RoleSelect } from './ui/RoleSelect'
import { Board } from './ui/Board'
import { HUD } from './ui/HUD'
import { initGame, getLegalActions, applyAction, checkVictory } from './engine/engine'
import type { Role, GameState, Action } from './engine/types'
import { configTriangle10 } from './engine/configTriangle10'
import goatWinSound from './assets/audio/goat-win.mp3'
import tigerWinSound from './assets/audio/tiger-win.mp3'
import './App.css'

function App() {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [player1Role, setPlayer1Role] = useState<Role | null>(null)
  const [player1Name, setPlayer1Name] = useState<string>('')
  const [player2Name, setPlayer2Name] = useState<string>('')
  const [legalMoves, setLegalMoves] = useState<string[]>([])
  const [selectedGoat, setSelectedGoat] = useState<string | null>(null)
  const [victoryModal, setVictoryModal] = useState<{show: boolean, winner: string, emoji: string}>({show: false, winner: '', emoji: ''})

  // Update legal moves when selectedGoat changes
  useEffect(() => {
    if (gameState) {
      updateLegalMoves(gameState)
    }
  }, [selectedGoat])

  const handleRoleSelect = (role: Role, p1Name: string, p2Name: string) => {
    console.log(`${p1Name} selected role: ${role}`)
    setPlayer1Name(p1Name)
    setPlayer2Name(p2Name)
    setPlayer1Role(role)
    const newGameState = initGame()
    setGameState(newGameState)
    updateLegalMoves(newGameState)
  }

  const handleNewGame = () => {
    console.log('Starting new game')
    setGameState(null)
    setPlayer1Role(null)
    setPlayer1Name('')
    setPlayer2Name('')
    setLegalMoves([])
    setSelectedGoat(null)
    setVictoryModal({show: false, winner: '', emoji: ''})
  }

  const closeVictoryModal = () => {
    setVictoryModal({show: false, winner: '', emoji: ''})
  }

  const updateLegalMoves = (state: GameState) => {
    if (state.currentTurn === 'Player' && state.phase === 'movement') {
      if (selectedGoat) {
        // For goat movement phase with selected goat, show only that goat's moves
        const goatNode = state.nodes.find(n => n.id === selectedGoat)
        if (goatNode) {
          const goatMoves = goatNode.connectedTo.filter(connectedId => 
            !state.goatsAt.includes(connectedId) && connectedId !== state.tigerAt
          )
          setLegalMoves(goatMoves)
          console.log(`Legal moves for selected goat ${selectedGoat}:`, goatMoves)
        }
      } else {
        // No goat selected - show all goats as selectable
        setLegalMoves(state.goatsAt)
        console.log('No goat selected - showing all goats as selectable:', state.goatsAt)
      }
    } else {
      // For all other cases, use the engine's legal actions
      const actions = getLegalActions(state)
      const moveTargets = actions.map(action => action.targetId || action.to || '').filter(Boolean)
      setLegalMoves(moveTargets)
      console.log('Legal moves:', moveTargets)
    }
  }

  const handleNodeClick = (nodeId: string) => {
    if (!gameState || !player1Role) return

    console.log(`Node clicked: ${nodeId}`)
    
    // In 2-player pass-and-play, both players can act during their turn
    // The turn is determined by gameState.currentTurn
    const currentPlayerRole = gameState.currentTurn
    console.log(`Current turn: ${currentPlayerRole} (${currentPlayerRole === 'Player' ? 'Goat' : 'Tiger'} player)`)
    
    // Create action based on current turn (not the selected role)
    let action: Action | null = null
    
    if (currentPlayerRole === 'Player') {
      if (gameState.phase === 'placement') {
        // Goat placement phase - check if move is legal
        if (!legalMoves.includes(nodeId)) {
          console.log('Illegal move')
          return
        }
        action = {
          actorId: 'player',
          targetId: nodeId,
          type: 'placeGoat'
        }
      } else if (gameState.phase === 'movement') {
        // Goat movement phase - two-step process
        
        // Reject clicks on Tiger during Goat player's turn
        if (nodeId === gameState.tigerAt) {
          console.log('Cannot select Tiger during Goat player\'s turn')
          return
        }
        
        // Check if clicking on a goat to select it
        if (gameState.goatsAt.includes(nodeId)) {
          setSelectedGoat(nodeId)
          console.log(`Selected goat: ${nodeId}`)
          return // Don't create action yet, just update selection
        }
        
        // Check if clicking on a destination for selected goat
        if (selectedGoat && legalMoves.includes(nodeId)) {
          action = {
            actorId: 'player',
            from: selectedGoat,
            to: nodeId,
            type: 'moveGoat'
          }
          setSelectedGoat(null) // Clear selection after move
        } else {
          console.log('No goat selected or invalid destination')
          return
        }
      }
    } else {
      // Tiger movement - use legal actions to determine if it's a capture
      
      // Reject clicks on Goats during Tiger player's turn
      if (gameState.goatsAt.includes(nodeId)) {
        console.log('Cannot select Goat during Tiger player\'s turn')
        return
      }
      
      const legalActions = getLegalActions(gameState)
      const matchingAction = legalActions.find(action => 
        action.from === gameState.tigerAt && action.to === nodeId
      )
      
      if (matchingAction) {
        action = matchingAction
      } else {
        console.log('Invalid Tiger move: Not in legal actions')
        return
      }
    }

    if (!action) {
      console.log('No valid action could be created')
      return
    }

    console.log('Applying action:', action)
    
    // Apply the action
    const newGameState = applyAction(gameState, action)
    setGameState(newGameState)
    
    // Check for victory
    const winner = checkVictory(newGameState)
    if (winner) {
      const winnerRole = winner === 'Player' ? 'Goat' : 'Tiger'
      const winnerPlayer = winner === player1Role ? player1Name : player2Name
      
      // Play victory sound immediately
      if (winner === 'Player') {
        new Audio(goatWinSound).play().catch(err => console.log('Audio playback failed:', err))
      } else {
        new Audio(tigerWinSound).play().catch(err => console.log('Audio playback failed:', err))
      }
      
      console.log(`Game over! ${winnerPlayer} (${winnerRole} player) wins!`)
      
      // Show victory modal after sound starts playing
      setTimeout(() => {
        const emoji = winner === 'Player' ? '🐐' : '🐅'
        setVictoryModal({
          show: true,
          winner: `${winnerPlayer} (${winnerRole} player)`,
          emoji: emoji
        })
      }, 100) // Small delay to ensure sound starts first
    }
    
    // Update legal moves for next turn
    updateLegalMoves(newGameState)
  }

  if (!player1Role) {
    return (
      <div className="app">
        <h1>Mekha Puli</h1>
        <RoleSelect onRoleSelect={handleRoleSelect} />
      </div>
    )
  }

  if (!gameState) {
    return (
      <div className="app">
        <h1>Mekha Puli</h1>
        <div>Loading game...</div>
      </div>
    )
  }

  // Determine which player's turn it is
  const currentPlayerRole = gameState.currentTurn
  const isPlayer1Turn = currentPlayerRole === player1Role
  const currentPlayerName = isPlayer1Turn ? player1Name : player2Name
  const currentPlayerType = currentPlayerRole === 'Player' ? 'Goat' : 'Tiger'

  return (
    <div className="app">
      <h1>Mekha Puli</h1>
      
      <HUD
        currentTurn={gameState.currentTurn}
        phase={gameState.phase}
        goatsPlaced={gameState.goatsPlaced}
        goatsCaptured={gameState.goatsCaptured}
        playerRole={player1Role}
        onNewGame={handleNewGame}
        currentPlayerName={currentPlayerName}
        currentPlayerType={currentPlayerType}
      />
      
      <Board
        nodes={configTriangle10}
        tigerAt={gameState.tigerAt}
        goatsAt={gameState.goatsAt}
        currentTurn={gameState.currentTurn}
        onNodeClick={handleNodeClick}
        legalMoves={legalMoves}
      />

      {/* Victory Modal */}
      {victoryModal.show && (
        <div className="victory-modal-overlay">
          <div className="victory-modal">
            <div className="victory-content">
              <div className="victory-emoji">{victoryModal.emoji}</div>
              <h2 className="victory-title">Victory!</h2>
              <p className="victory-winner">{victoryModal.winner} wins!</p>
              <div className="victory-emoji">{victoryModal.emoji}</div>
            </div>
            <div className="victory-buttons">
              <button className="victory-button new-game-btn" onClick={handleNewGame}>
                New Game
              </button>
              <button className="victory-button close-btn" onClick={closeVictoryModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App