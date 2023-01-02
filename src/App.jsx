

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics, useBox, usePlane } from "@react-three/cannon";
import { useState} from 'react';

import './App.css'
import Experience from "./components/Experience";
import Interface from "./components/Interface";
import { Suspense } from "react";
import { TrackballControls } from "@react-three/drei";
import SpaceIndicator from "./components/SpaceIndicator";

function App() {

 

  return (
    <>
      <Suspense>
        
      <Interface />
      <SpaceIndicator />
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
        <Experience   />
      </Canvas>
      </Suspense>
    </>
  );
}

export default App;
