import '../App.css'
import {useEffect, useState} from 'react'
const SpaceIndicator =({ballPosition})=> {





    return (
        <div className="SPACE">
            <div className="perfZone"></div>
           <div style={{position: "absolute", left:`${ballPosition}%`}} className="ball">[]</div>
        </div>
    )
}

export default SpaceIndicator;