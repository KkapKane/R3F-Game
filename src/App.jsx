

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics, useBox, usePlane } from "@react-three/cannon";
import { useState} from 'react';

import './App.css'
import Experience from "./components/Experience";
import Interface from "./components/Interface";



function App() {

 

  return (
    <>
    
      <Interface />
      <Canvas camera={{ position: [1, 1.5, 2.5], fov: 50 }} shadows>
        <Experience   />
      </Canvas>
    </>
  );
}

export default App;
