import { Canvas } from "@react-three/fiber";

import { useState, useEffect, useRef } from "react";
import { Html, useProgress } from "@react-three/drei";
import "./App.scss";
import Experience from "./components/Experience";
import Interface from "./components/Interface";
import { Suspense } from "react";
import { useCharacterAnimation } from "./context/CharacterAnimation";
import SpaceIndicator from "./components/SpaceIndicator";
import ScoreBubble from "./components/ScoreBubble";
import Menu from "./components/Menu";
import song from "./assets/song.mp3";
import ScoreBoard from "./components/scoreBoard";

function Loader() {
  const { progress } = useProgress();
  console.log(progress);
  return (
    <Html className='LoadStatus' center>
      {Math.floor(progress)} % loaded
    </Html>
  );
}
function App() {
  const [ballPosition, setBallPosition] = useState(0);
  const [moveResult, setMoveResult] = useState("");
  const [score, setScore] = useState(0);
  const [textColor, setTextColor] = useState("");
  const [game, setGame] = useState(false);
  const [perfCount, setPerfCount] = useState(0);
  const { animations, animationIndex, setAnimationIndex } =
    useCharacterAnimation();
  const [ign, setIgn] = useState("");
  const [scoreBoard, setScoreBoard] = useState({
    miss: 0,
    bad: 0,
    cool: 0,
    great: 0,
    perfect: 0,
    combo: 0,
  });
  let interval = useRef();
  const startGame = (bpm) => {
    setBallPosition(0);
    setScore(0);
    setPerfCount(0);
    setMoveResult("");
    setScoreBoard({ miss: 0, bad: 0, cool: 0, great: 0, perfect: 0, combo: 0 });
    interval.current = setInterval(() => {
      setBallPosition((prev) => prev + bpm / 360); // 233 is accurate number for bpm but we make it slower cause its easier
    }, 1000 / 60);
    setGame(true);
    playSound(song);
    return () => clearInterval(interval.current);
  };

  const playSound = (src) => {
    let sound = new Audio(src);
    sound.volume = 0.25;
    sound.play();
    sound.onended = () => {
      clearInterval(interval.current);
      setBallPosition(-200);
      setAnimationIndex(7);
      setMoveResult("");
    };
  };

  return (
    <>
      <Menu startGame={startGame} game={game} ign={ign} setIgn={setIgn} />
      {ballPosition === -200 ? (
        <ScoreBoard
          scoreBoard={scoreBoard}
          score={score}
          startGame={startGame}
        />
      ) : null}
      <ScoreBubble
        moveResult={moveResult}
        score={score}
        textColor={textColor}
        ign={ign}
      />

      <Interface
        setBallPosition={setBallPosition}
        setTextColor={setTextColor}
        ballPosition={ballPosition}
        setMoveResult={setMoveResult}
        setScore={setScore}
        score={score}
        setScoreBoard={setScoreBoard}
        scoreBoard={scoreBoard}
        moveResult={moveResult}
        perfCount={perfCount}
        setPerfCount={setPerfCount}
      />
      <SpaceIndicator ballPosition={ballPosition} />
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
        <Suspense fallback={<Loader />}>
          <Experience ign={ign} />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
