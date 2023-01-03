import { useEffect, useState } from "react";
import { useCharacterAnimation } from "../context/CharacterAnimation";
import miss from '../assets/effect_m.wav'
import bad from '../assets/effect_b.wav'
import cool from '../assets/effect_c.wav'
import great from '../assets/effect_g.wav'
import perfect from '../assets/effect_p1.wav'
import perfectx2 from '../assets/effect_p2.wav'
import perfectx3 from '../assets/effect_p3.wav'




import "../app.css";
import Arrows from "./Arrows";

const Interface = ({ballPosition,setBallPosition,setMoveResult , setScore}) => {
  const { animations, animationIndex, setAnimationIndex } =
    useCharacterAnimation();
    
  const [arrows, setArrows] = useState([]);

  const [moves, setMoves] = useState([]);
  const [playerMove, setPlayerMove] = useState([]);
  const [pressState, setPressState] = useState([])
  const [spacePressed, setSpacePressed] = useState(false)
  const [perfCount, setPerfCount] = useState(0)

  

  const playSound = (src) =>{
    new Audio(src).play()
  }
  
  


  useEffect(() => {
    //start model off standing idle
    setAnimationIndex(7);
  
    document.addEventListener("keydown", detectKeyDown, true);


    return () => document.removeEventListener("keydown", detectKeyDown);
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
  
  // useEffect(() => {
    
  //   // setTimeout(() => {
  //   //   generateMoves(6);
      
      
  //   // }, 800);
  //   setTimeout(() => {
      
      
  //     setSpacePressed(false);
  //   }, 1500);
    
   
    
  // }, [animationIndex]);

useEffect(() => {
  if (ballPosition > 100) {
   

      generateMoves(6);
      setSpacePressed(false);
  
    setBallPosition(0);
  }
}, [ballPosition]);

  
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
             
              
              setPlayerMove([]);
            }
    });

    
   
  }, [playerMove]);

  useEffect(() => {
    
    if (arrows.length >= 6) {
      setArrows([]);
    }
    moves.map((move) => {
      setArrows((oldArray) => [...oldArray, move.direction]);
    });

    
  }, [moves]);


  function spaceScore(ballPosition){
   
    if(ballPosition > 80 && ballPosition < 90){
      setPerfCount(prev => prev + 1)
      if(perfCount === 0){
        playSound(perfect)
        setMoveResult('Perfect!')
        setScore(prev => prev + 1000)
      }
      if(perfCount === 1){
        playSound(perfectx2)
        setMoveResult(`Perfect x${perfCount}!`)
        setScore(prev => prev + 3000)
      }
      if(perfCount >= 2){
        playSound(perfectx3)
        setMoveResult(`Perfect x${perfCount}!`)
        setScore(prev => prev + (3000 * perfCount))
      }
      return 'Perfect'
    }
  
    else if(ballPosition > 70 && ballPosition < 79){
      setPerfCount(0);
      playSound(great);
      setMoveResult('Great!')
      setScore((prev) => prev + 800);
      return 'Great';
    }

    else if(ballPosition > 60 && ballPosition < 69){
      setPerfCount(0);
      playSound(cool);
      setMoveResult('Cool')
      setScore((prev) => prev + 500);
      return 'Cool';
    }
        
    else if(ballPosition > 50 && ballPosition < 59){
      setPerfCount(0);
      playSound(bad);
      setMoveResult('Bad...')
      setScore((prev) => prev + 300);
      return 'Bad';
    }
     
    else if(ballPosition  < 49){
      setPerfCount(0);
      playSound(miss);
      setMoveResult('Miss.')
      setAnimationIndex(9)
      return 'Miss';
    
    }
      

    }


  

  useEffect(()=>{
    if(playerMove.length !== 6 && spacePressed == true){
      //player didnt press all arrows before pressing space means they miss
  
      
      setAnimationIndex(9)
      setPlayerMove([])
      setPressState([])
     
      
    }
    //player pressed all keys and then pressed space
    if (playerMove.length === 6 && spacePressed == true) {
      arrows.map((arrow, i) => {
        if (arrow !== playerMove[i]) {
          //set animation to the miss animation
       
          setAnimationIndex(9);
   
      setPlayerMove([]);
    
    }
    //successful move generates a random dance move
    setAnimationIndex(getRandomValidDanceMove());
    setPressState([])
  });
  spaceScore(ballPosition);
  //once player press 6 moves we just reset it down to 0
  setPlayerMove([]);
}
console.log(ballPosition)
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
