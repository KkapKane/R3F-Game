
import {useState, useEffect}  from  'react';


function ScoreBoard({scoreBoard, ballPosition,score, startGame, setSpeed}){
    const [showBoard, setShowBoard] = useState(false)
    const [selects,setSelects] = useState ();

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
          <div className='buttonContainer'>
           {/* <div>Mode:{selects}</div> */}
           <select value={selects} onChange={(e)=> setSpeed(e.target.value)} className="select">
            <option value={600}>Super Slow</option>
            <option value={360}>Tutorial</option>
            <option value={300}>Easy</option>
            <option value={233}>Normal</option>
            <option value={150}>Hard</option>

           </select>
            <button onClick={() => startGame(140)}>retry</button>
          </div>
        </div>
      </div>
    );
}

export default ScoreBoard;