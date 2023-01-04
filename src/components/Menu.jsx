

const Menu =({startGame, game, setIgn}) =>{



    return (
      <div className="Menu" style={game ? {display: 'none'} : {}}>
        <input type="text" placeholder="NickName" onChange={(e)=> setIgn(e.target.value)} />
        <button onClick={() => startGame(120)} className="startButton">START</button>
      </div>
    );
}

export default Menu;