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

  const handleCheckWinner = () => {
    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (tile[a] && tile[a] === tile[b] && tile[b] === tile[c]) {
        setWinner(tile[a]);
        console.log(tile[a]);
      }
    }
    if (tile.every((value) => value !== "")) {
      setWinner("draw");
    }
  };

  useEffect(() => {
    handleCheckWinner();
  }, [tile]);

  useEffect(() => {
    console.log(playerTurn)
    if (playerTurn === "O") {
      const emptyTiles = tile.reduce((acc, val, index) => {      
        if (val === "") {  
          acc.push(index)
        };
        return acc;
      },[] );
      console.log(emptyTiles.length,"emptyTiles")
      const randomIndex = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]; 
      const newTile = [...tile];
      newTile[randomIndex] = "O";
      setTile(newTile);
      setPlayerTurn("X");
    }
  }, [playerTurn, tile]);

  
  const handleTileClick = (i) => {
    if (!winner && tile[i] === "") {
      const newTile = [...tile];
      newTile[i] = playerTurn;
      setTile(newTile);
      setPlayerTurn(playerTurn === "X" ? "O" : "X");
    }
  };

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
