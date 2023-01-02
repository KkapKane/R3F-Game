import {useState,useEffect} from 'react';

const ScoreBubble =({currentScore})=>{
    const [play, setPlay] = useState(true)
    useEffect(()=>{
    setPlay(true)
    if (currentScore == "Miss.") {
        setPlay(false)
    }
    },[currentScore])
    return (
      <div
        className='ScoreBubble'
        
      >
        {currentScore}
      </div>
    );
}

export default ScoreBubble;