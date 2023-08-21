import React from 'react';

const Comet = ({ type, time, changeTime, direction }) => {
  return (
    <div className={direction === 'left' ? 'comet' : 'comet flip'}>
      <div className={'ball'}>
        <h3>{type}</h3>
        <div className='controls'>
          <button onClick={() => changeTime(-60, type)}>-</button>
          <span>{time / 60}</span>
          <button onClick={() => changeTime(60, type)}>+</button>
        </div>
      </div>
    </div>
  );
};

export default Comet;
