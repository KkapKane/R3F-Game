import {useState,useEffect} from 'react';

const ScoreBubble =({moveResult,score, textColor, ign})=>{
    const [play, setPlay] = useState(true)
    useEffect(()=>{
    setPlay(true)
    setTimeout(()=> {
        setPlay(false)
    }, 1000 )
    console.log(textColor)
    },[moveResult])
    return (
      <>
      <div className="scoreBoard"> {ign}'s Score: {score}</div>
        <div className={play ? 'ScoreBubble' : 'textexpand'} style={{color: textColor}}>{moveResult}</div>
      </>
    );
}

export default ScoreBubble;