import React from 'react';

const Comet = ({ type, time, changeTime }) => {
  return (
    <div className={type + '-stripe'}>
      <div className={'orb ball'}>
        <h3>{type[0].toUpperCase() + type.slice(1)}</h3>
        <div className='time-controls'>
          <button onClick={() => changeTime(-60, type)}>-</button>
          <span>{time / 60}</span>
          <button onClick={() => changeTime(60, type)}>+</button>
        </div>
      </div>
    </div>
  );
};

export default Comet;
