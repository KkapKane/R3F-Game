

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
const [currentScore, setCurrentScore] = useState('')

function moveBall() {
  if (ballPosition > 100) {

    setBallPosition(0);
  }
  setBallPosition((prev) => prev + 0.5);
  
  requestAnimationFrame(moveBall);
}

window.requestAnimationFrame(moveBall);


  return (
    <>
      <Suspense>
       <ScoreBubble currentScore={currentScore}/> 
      <Interface ballPosition={ballPosition} setCurrentScore={setCurrentScore}/>
      <SpaceIndicator ballPosition={ballPosition}/>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
        <Experience   />
      </Canvas>
      </Suspense>
    </>
  );
}

export default App;
