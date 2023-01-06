import arrowkeys from "../assets/Keys.jpg";
import bar from "../assets/bar.jpg";
const Menu = ({ startGame, game, loading }) => {
  return (
    <div className='Menu' style={game ? { display: "none" } : {}}>
      <div className='instructions'>
        <ol>
          How to play
          <li>Press All of the arrow keys using the keyboard arrows.</li>
          <img src={arrowkeys} alt='' />
          <img
            src='https://cdn.allthings.how/wp-content/uploads/2022/03/allthings.how-how-to-fix-arrow-keys-not-working-problem-in-excel-keyboard-arrow-keys-759x427.png'
            alt=''
          />
          <li>
            Press the Space bar on your keyboard once the white ball reaches the
            green zone.
          </li>
          <img src={bar} alt='' />
        </ol>
      </div>
      {loading ?  null : <button onClick={() => startGame(140)} className='startButton'>
        START
      </button>}
    </div>
  );
};

export default Menu;
