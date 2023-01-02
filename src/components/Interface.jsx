import { useEffect, useState } from "react";
import { useCharacterAnimation } from "../context/CharacterAnimation";

import "../app.css";
import Arrows from "./Arrows";

const Interface = () => {
  const { animations, animationIndex, setAnimationIndex } =
    useCharacterAnimation();
  const [arrows, setArrows] = useState([]);
  const [correct, setCorrect] = useState(false);
  const [moves, setMoves] = useState([]);
  const [playerMove, setPlayerMove] = useState([]);

  useEffect(() => {
    setAnimationIndex(7)
    document.addEventListener("keydown", detectKeyDown, true);
  }, []);

  function generateMoves(num) {
    let possibleMoves = [0, 90, 180, 270];

    let currentMove = [];
    for (let i = 0; i < num; i++) {
      currentMove.push({
        position: `${44 + 4 * i}%`,
        direction:
          possibleMoves[Math.floor(Math.random() * possibleMoves.length)],
      });
    }

    setMoves(currentMove);
  }
  useEffect(() => {
    generateMoves(6);

    console.log(moves);
  }, [animationIndex]);

  useEffect(() => {
    playerMove.map((pm, i) => {
      if (pm !== arrows[i]) {
        setAnimationIndex(9);
        console.log("fail");
        setPlayerMove([]);
      }
    });
    if (playerMove.length === 6) {
      console.log(playerMove);
      console.log(arrows.length);
      arrows.map((arrow, i) => {
        if (arrow !== playerMove[i]) {
          setAnimationIndex(9);
          console.log("wrong");
          setPlayerMove([]);
          return false;
        }
        setAnimationIndex(generateRandomInteger(0, 14));
        console.log("correct");
      });
      setPlayerMove([]);
    }
  }, [playerMove]);

  useEffect(() => {
    if (arrows.length == 6) {
      setArrows([]);
    }
    moves.map((move) => {
      setArrows((oldArray) => [...oldArray, move.direction]);
    });
  }, [moves]);

  function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  const myMap = new Map([
    ["ArrowUp", 0],
    ["ArrowRight", 90],
    ["ArrowDown", 180],
    ["ArrowLeft", 270],
  ]);

  const detectKeyDown = (e) => {
    if (myMap.has(e.key)) {
      setPlayerMove((oldPlayerMove) => [...oldPlayerMove, myMap.get(e.key)]);
    }
  };

  return (
    <div>
      {moves.map((move, index) => {
        return (
          <Arrows
            move={move}
            index={index}
            setArrows={setArrows}
            arrows={arrows}
          />
        );
      })}
      {animations.map((animation, index) => {
        return (
          <button
            key={animation}
            style={index === animationIndex ? { backgroundColor: "grey" } : {}}
            onClick={() => setAnimationIndex(index)}
          >
            {animation}
          </button>
        );
      })}
    </div>
  );
};

export default Interface;
