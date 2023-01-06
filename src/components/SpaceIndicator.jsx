import '../App.scss'

const SpaceIndicator =({ballPosition, game})=> {





    return (
      <div className='SPACE' style={game ? {display: 'flex'} : {}}>
        <div
          className='perfZone'
          style={game ? { display: "inline-block" } : {}}
        ></div>
        <div
          style={
            game
              ? {
                  display: "inline-block",
                  position: "absolute",
                  left: `${ballPosition}%`,
                }
              : {}
          }
          className='ball'
        ></div>
      </div>
    );
}

export default SpaceIndicator;