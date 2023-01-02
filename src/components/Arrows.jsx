import arrow from "../assets/arrow.png";
import { useEffect } from "react";


const Arrows = ({move, setArrows, arrows}) => {
// useEffect(() => {
//     if(arrows.length == 6){
//         setArrows([]);
//     }
//     setArrows((oldArray) => [...oldArray, move.direction]);
  
// }, [move]);

  return (
    <img
      src={arrow}
      alt=''
      className='Arrow'
      style={{
        transform: `rotate(${move.direction}deg)`,
        left: move.position ,
      }}
    />
  );
};

export default Arrows;
