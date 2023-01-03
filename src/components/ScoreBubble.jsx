import {useState,useEffect} from 'react';

const ScoreBubble =({moveResult})=>{
    const [play, setPlay] = useState(true)
    useEffect(()=>{
    setPlay(true)
    if (moveResult == "Miss.") {
        setPlay(false)
    }
    },[moveResult])
    return (
      <div
        className='ScoreBubble'>
        
        {moveResult}
      </div>
    );
}

export default ScoreBubble;