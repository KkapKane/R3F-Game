import { useEffect, useState } from "react";
import { useCharacterAnimation } from "../context/CharacterAnimation";

const Interface = () =>{
    const { animations, animationIndex, setAnimationIndex} = useCharacterAnimation();
    const [arrows , setArrows] = useState([])
    const [correct,setCorrect] =useState(false)
    
    function generateRandomInteger(min, max) {
      return Math.floor(min + Math.random() * (max - min + 1));
    }
if(arrows){
    console.log(arrows)
}
    
    let temp = []
    const detectKeyDown = (e) =>{
        temp.push(e.key)
        if(temp.length  === 6){
            setArrows([temp])
            console.log(arrows)
            temp = []
        }
     
        if(e.key == ' ' && correct == true){
        setAnimationIndex(generateRandomInteger(1,14))
        
    }
    else if(e.key == ' ' && correct == false){
        setAnimationIndex(9)
    }
   }

useEffect(()=>{
    document.addEventListener('keydown', detectKeyDown, true)
},[])

    return (
        <div>
            
            {animations.map((animation, index)=>{
                return (
                    
                    <button  key={animation} style={index === animationIndex ? {backgroundColor: 'grey'} : {} }
                    onClick={()=> setAnimationIndex(index)}
                    >{animation}</button>
                )
            })}
        </div>
    )
}

export default Interface;