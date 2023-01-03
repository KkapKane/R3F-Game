

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

useEffect(()=>{

const interval = setInterval(()=>{
setBallPosition(prev => prev + 0.25)
}, 1000/60)

return () => clearInterval(interval);

},[])



  return (
    <>
      <Suspense>
       <ScoreBubble moveResult={moveResult} score={score}/> 
      <Interface  setBallPosition={setBallPosition} ballPosition={ballPosition} setMoveResult={setMoveResult} score={score} moveResult={moveResult}/>
      <SpaceIndicator ballPosition={ballPosition}/>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
        <Experience   />
      </Canvas>
      </Suspense>
    </>
  );
}

export default App;
