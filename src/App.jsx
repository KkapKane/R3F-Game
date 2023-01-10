import { Html, useProgress } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";

import { useCharacterAnimation } from "./context/CharacterAnimation";
import SpaceIndicator from "./components/SpaceIndicator";
import ScoreBubble from "./components/ScoreBubble";
import Experience from "./components/Experience";
import ScoreBoard from "./components/ScoreBoard";
import Interface from "./components/Interface";
import Menu from "./components/Menu";
import song from "./assets/song.mp3";
import { Suspense } from "react";
import "./App.scss";

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
  const [loading, setLoading] = useState(true);
  const [speed, setSpeed] = useState(360);

  const [scoreBoard, setScoreBoard] = useState({
    miss: 0,
    bad: 0,
    cool: 0,
    great: 0,
    perfect: 0,
    combo: 0,
  });

  function Loader() {
    const { progress } = useProgress();
    if (progress > 99) {
      setLoading(false);
    }
    return (
      <Html
        as='div'
        className='LoadStatus'
        style={{ position: "absolute", top: "0%", left: "0%" }}
        center
      >
        {Math.floor(progress)} % loaded
      </Html>
    );
  }

  let interval = useRef();
  const startGame = (bpm) => {
    setBallPosition(0);
    setScore(0);
    setPerfCount(0);
    setMoveResult("");
    setScoreBoard({ miss: 0, bad: 0, cool: 0, great: 0, perfect: 0, combo: 0 });
    interval.current = setInterval(() => {
      setBallPosition((prev) => prev + bpm / speed); // 146 is accurate number for bpm but we make it slower cause its easier
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
      setGame(false);
      setMoveResult("");
    };
  };

  return (
    <>
      {!game ? (
        <Menu
          startGame={startGame}
          game={game}
          ign={ign}
          setIgn={setIgn}
          loading={loading}
        />
      ) : null}
      {ballPosition === -200 ? (
        <ScoreBoard
          scoreBoard={scoreBoard}
          score={score}
          startGame={startGame}
          setSpeed={setSpeed}
          speed={speed}
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
      <SpaceIndicator ballPosition={ballPosition} game={game} />
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
        <Suspense fallback={<Loader />}>
          <Experience ign={ign} />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
