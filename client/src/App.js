import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winningLine, setWinningLine] = useState([]); // State to store the winning line
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return; // Ignore if the square is already filled or if the game is won
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext); // Switch turns

    // Calculate the winner after updating the board
    const winningInfo = calculateWinner(newBoard);
    if (winningInfo) {
      setWinningLine(winningInfo.line); // Set the winning line if there's a winner
    } else {
      setWinningLine([]); // Clear winning line if no winner
    }
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true); // Reset to player X's turn
    setWinningLine([]); // Reset winning line
  };

  const renderSquare = (index) => {
    return (
      <button className={`square ${board[index]} ${winningLine.includes(index) ? 'winner' : ''}`} onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  return (
    <div className="game-container">
      <h1 className="title">Tic Tac Toe</h1>
      <div className="result">
        {winner ? `Winner: ${winner.player}` : `Next Player: ${isXNext ? 'X' : 'O'}`}
      </div>
      <div className="board">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={handleRestart}>Restart Game</button>
    </div>
  );
};

// Refactored calculateWinner function to return both winner and winning line
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6]             // diagonal
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line }; // Return winner and the winning line
    }
  }
  return null; // No winner
};

export default App;