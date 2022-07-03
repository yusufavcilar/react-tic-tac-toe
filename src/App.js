/* import { useState , useEffect } from 'react'; */
import { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button";

const INITIAL_BOARD = [    // Oyun ekranımızın alanı
  {
    value: "",
    status: false,
  },
  {
    value: "",
    status: false,
  },
  {
    value: "",
    status: false,
  },
  {
    value: "",
    status: false,
  },
  {
    value: "",
    status: false,
  },
  {
    value: "",
    status: false,
  },
  {
    value: "",
    status: false,
  },
  {
    value: "",
    status: false,
  },
  {
    value: "",
    status: false,
  },
];
const PLAYERS = {
  p1: "X",
  p2: "O",
};

function App() {
  const [gameBoard, setGameBoard] = useState([...INITIAL_BOARD]); //Oyundaki butonların datasını tutan
  const [gameStatus, setGameStatus] = useState()

  const buttonOnClick = (index) => {  // buttonOnClick fonksiyonumuz ile oyun ekranımızdaki kutuların içine değişiyoruz.
    const item = { ...gameBoard[index] };

    if (!gameStatus) {
      setGameStatus(true);
    } else if (gameBoard[index].value === "") { // tıkladığımız kutunun içi boşsa
      item.value = PLAYERS.p1;     // "X" yapıcak.
    } else if (item.value === PLAYERS.p1) { // tıkladığımız kutu "X" ise
      item.value = PLAYERS.p2;     // "O" yapıcak. 
    } else if (item.value === PLAYERS.p2) {  // tıkladığımız kutu "O" ise
      item.value = "";  // kutumuzu boş haline çeviricek. 
    }
    gameBoard[index] = item;
    setGameBoard([...gameBoard]);
  };

  const isGameOver = () => { // Oyunumuzun bittiği ihtimallerine bakıyoruz
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];

      if (
        gameBoard[a].value === (gameBoard[b].value && gameBoard[c].value) &&
        gameBoard[a].value !== ""
      ) {
        const itemA = { ...gameBoard[a] };
        const itemB = { ...gameBoard[b] };
        const itemC = { ...gameBoard[c] };

        itemA.status = true;
        itemB.status = true;
        itemC.status = true;
        gameBoard[a] = itemA;
        gameBoard[b] = itemB;
        gameBoard[c] = itemC;

        setGameBoard([...gameBoard]);
        setGameStatus(false);
      }
    }
  };

  useEffect(() => {
    if (gameStatus) {
      isGameOver();
    }
  }, [gameBoard]);

  useEffect(() => {
    if (gameStatus) {
      setGameBoard([...INITIAL_BOARD]);
    }
  }, [gameStatus]);

  return (
    <>
      <div className="game">
        <div className="content">
          <h1>GAME TIME</h1>

          <div className="buttons">
            {gameBoard.map((btn, i) => (
              <Button
                className={`player-${gameBoard[i].value.toLowerCase()}
                  ${
                    gameBoard[i].status
                      ? `player-${gameBoard[i].value.toLowerCase()}-win`
                      : ""
                  }
                  `}
                key={i}
                onClick={() => buttonOnClick(i)}
              >
                {btn.value}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
