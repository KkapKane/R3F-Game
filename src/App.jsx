

import { Canvas } from "@react-three/fiber";

import { useState, useEffect} from 'react';

import './App.css'
import Experience from "./components/Experience";
import Interface from "./components/Interface";
import { Suspense } from "react";

import SpaceIndicator from "./components/SpaceIndicator";
import ScoreBubble from "./components/ScoreBubble";

function App() {

 
const [ballPosition, setBallPosition] = useState(0);
const [moveResult, setMoveResult] = useState('')
const [score, setScore] = useState(0)
const [textColor, setTextColor] = useState('')

// useEffect(()=>{

// const interval = setInterval(()=>{
// setBallPosition(prev => prev + 0.25)
// }, 1000/60)

// return () => clearInterval(interval);

// },[])

const startGame =(bpm)=>{
  const interval = setInterval(() => {
    setBallPosition((prev) => prev + bpm / 300);
  }, 1000 / 60);

  return () => clearInterval(interval);
}



  return (
    <>
    <button onClick={()=> startGame(120)}>START</button>
      <Suspense>
       <ScoreBubble moveResult={moveResult} score={score} textColor={textColor}/> 
      <Interface  setBallPosition={setBallPosition} setTextColor={setTextColor} ballPosition={ballPosition} setMoveResult={setMoveResult} setScore={setScore} score={score} moveResult={moveResult}/>
      <SpaceIndicator ballPosition={ballPosition}/>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
        <Experience   />
      </Canvas>
      </Suspense>
    </>
  );
}

export default App;
