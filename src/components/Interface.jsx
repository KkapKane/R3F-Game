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
  const [pressState, setPressState] = useState([])
  const [spacePressed, setSpacePressed] = useState(false)

  useEffect(() => {
    //start model off standing idle
    setAnimationIndex(7);
    
    document.addEventListener("keydown", detectKeyDown, true);
  }, []);

  //creates an arrow object with a random direction picked from possible moves array
  function generateMoves(num) {
    
    let possibleMoves = [0, 90, 180, 270];
    let currentMove = [];
    for (let i = 0; i < num; i++) {
      currentMove.push({
        position: `${40 + 4 * i}%`,
        direction:
          possibleMoves[Math.floor(Math.random() * possibleMoves.length)],
          pressed: false
      });
    }

    setMoves(currentMove);
    setPressState(currentMove);
  }

  useEffect(() => {
    
    setTimeout(() => {
      generateMoves(6);
       setSpacePressed(false);
    }, 500);

  }, [animationIndex]);

  //here we check for if the key has been pressed and if it also matches the arrows_array(correct moves)
const updatePress = () =>{
const newState = moves.map((move, i) => {
    if (arrows[i] == playerMove[i]) {
      return { ...move, pressed: true };
    } else {
      return move;
    }
  })
  setPressState(newState)

}



  useEffect(() => {
    
      updatePress();

      playerMove.map((playermove, i) => {
        //if wrong arrow is pressed  we just set player arrow press progress to zero
          if (playermove !== arrows[i]) {
              setAnimationIndex(9);
              
              setPlayerMove([]);
            }
    });

    
   
  }, [playerMove]);

  useEffect(() => {
    if (arrows.length == 6) {
      setArrows([]);
    }
    moves.map((move) => {
      setArrows((oldArray) => [...oldArray, move.direction]);
    });

    
  }, [moves]);


  useEffect(()=>{
if (playerMove.length === 6 && spacePressed == true) {
  arrows.map((arrow, i) => {
    if (arrow !== playerMove[i]) {
      //set animation to the miss animation
      setAnimationIndex(9);
   
      setPlayerMove([]);
      return false;
    }

    setAnimationIndex(getRandomValidDanceMove());

    setPressState([])
  });
  //once player press 6 moves we just reset it down to 0
  setPlayerMove([]);
}
  },[spacePressed])


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
    else if(e.key == ' '){
      setSpacePressed(true)
    }
  };

  function getRandomValidDanceMove() {
    let validMove = [0, 1, 2, 3, 4, 5, 6, 8, 10, 11, 12, 13, 14];
    return validMove[Math.floor(Math.random() * validMove.length)];
  }

  return (
    <div>
      {pressState.map((move, index) => {
        return (
         <>
            {!spacePressed ? <Arrows move={move}index={index}setArrows={setArrows}arrows={arrows} key={index}/> : null}
         </>
           
       
                
            

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
