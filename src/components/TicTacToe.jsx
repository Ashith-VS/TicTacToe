import React, { useEffect, useState } from "react";

const TicTacToe = () => {
  const [tile, setTile] = useState(Array(9).fill(""));
  const [playerTurn, setPlayerTurn] = useState("X");
  const [winner, setWinner] = useState("");

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleCheckWinner = (tile) => {
    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (tile[a] && tile[a] === tile[b] && tile[b] === tile[c]) {
        return tile[a];
      }
    }
    if (tile.every((value) => value !== "")) {
      return "draw";
    }
  };

  const findBestMove = (tile, playerTurn) => {
    let bestScore = -1;
    let bestMove = null;

    for (let i = 0; i < 9; i++) {
      if (tile[i] === "") {
        const newBoard = [...tile];
        newBoard[i] = playerTurn;
        const result = minimax(newBoard, playerTurn, false);
        if (result > bestScore) {
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  const minimax = (board, player, maximizingPlayer) => {
    const result = handleCheckWinner(board);
    if (result) {
      return result === "X" ? -1 : result === "O" ? 1 : 0;
    }

    let bestScore = maximizingPlayer ? -1 : 1;
    const currentPlayer = maximizingPlayer? player: player === "X"? "O": "X";
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        const newBoard = [...board];
        newBoard[i] = currentPlayer;
        const score = minimax(newBoard, player, !maximizingPlayer);
        bestScore = maximizingPlayer? Math.max(bestScore, score): Math.min(bestScore, score);
      }
    }
    return bestScore;
  };

  const handleTileClick = (i) => {
    if (!winner && tile[i] === "") {
      const newTile = [...tile];
      newTile[i] = playerTurn;
      setTile(newTile);
      setPlayerTurn(playerTurn === "X" ? "O" : "X");
    }
  };

  useEffect(() => {
    const gameResult = handleCheckWinner(tile);
    if (gameResult) {
      setWinner(gameResult);
      return;
    }
    if (playerTurn === "O") {
      const bestMove = findBestMove(tile, playerTurn);
      handleTileClick(bestMove);
      console.log(bestMove);
    }
  }, [tile, playerTurn]);

  const HandleResetGame = () => {
    setTile(Array(9).fill(""));
    setPlayerTurn("X");
    setWinner("");
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {tile.map((value, index) => (
          <div
            key={index}
            onClick={() => handleTileClick(index)}
            className={`borderbox tile ${
              value === "" ? (playerTurn === "X" ? "x-hover" : "o-hover") : ""
            }`}
          >
            {value}
          </div>
        ))}
      </div>

      <div className="winningmessage">
        {winner && (
          <h1>
            {winner !== "draw" && "Winner:"}
            {winner === "draw" ? "X-O / Draw" : winner}
          </h1>
        )}
        <button onClick={HandleResetGame} className="reset-button">
          Play Again
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
