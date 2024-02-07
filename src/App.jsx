import { useState } from "react";

import GameBoard from "./Components/GameBoard";
import Player from "./Components/Player";
import Logs from "./Components/Logs";
import WININGS_COMBINATION from "./winning-combinations";
import GameOver from "./Components/GameOver";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurns) {
  let activePlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    activePlayer = 'O';
  }
  return activePlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for(const turn of gameTurns){
    const {square, player} = turn;
    const {row, col} = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for(const combination of WININGS_COMBINATION){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];
    if(
        firstSquareSymbol && 
        firstSquareSymbol === secondSquareSymbol && 
        firstSquareSymbol === thirdSquareSymbol){
          winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [ players, setPlayers ] = useState(PLAYERS);
  const [ gameTurns, setGameTurns ] = useState([]);
  
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);
  
  const isDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currPlayer }, ...prevTurns];
      return updatedTurns;
    });
  }

  function handlePlayerNameChange(symbol, playerName){
    setPlayers(prevPlayers => ({
      ...prevPlayers,
      [symbol]: playerName
    }));
  }

  function handleRestart(){
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={players.X} symbol="X" isActive={activePlayer === 'X'} onPlayerNameChange={handlePlayerNameChange} />
          <Player name={players.O} symbol="O" isActive={activePlayer === 'O'} onPlayerNameChange={handlePlayerNameChange} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
      </div>
      <Logs turns={gameTurns}/>
      {(winner || isDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
    </main>
  )
}

export default App
