import arrow from "../assets/arrow.png";

const Arrows = ({ move }) => {
  return (
    <img
      src={arrow}
      alt=''
      className='Arrow'
      style={
        move.pressed === true
          ? {
              transform: `rotate(${move.direction}deg) scale(.9)`,
              left: move.position,
              backgroundColor: "lightgreen",
              top: "69.8%",
            }
          : { transform: `rotate(${move.direction}deg)`, left: move.position }
      }
    />
  );
};

export default Arrows;
