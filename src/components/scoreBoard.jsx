
import {useState, useEffect}  from  'react';

export default function ScoreBoard({scoreBoard, ballPosition,score}){

    const [showBoard, setShowBoard] = useState(false)
useEffect(()=>{
if(ballPosition == -200){
    setShowBoard(true)
}
},[ballPosition])

    return (
      <div className='scoreBoardScreen'>
        <div className='endGameScoreBoard'>
          <h1 style={{ color: "white" }}>{score} pts</h1>
          <div className='scoreContainer'>
            <p>Combo: {scoreBoard.combo}</p>
            <p>Perfect: {scoreBoard.perfect}</p>
            <p>Great: {scoreBoard.great}</p>
            <p>Cool: {scoreBoard.cool}</p>
            <p>Bad: {scoreBoard.bad}</p>
            <p>Miss: {scoreBoard.miss}</p>
          </div>
        </div>
      </div>
    );
}