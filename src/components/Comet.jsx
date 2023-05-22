import React from 'react';

const Comet = ({ type, time, changeTime, floatDirection }) => {
  return (
    <div>
      <figure className={type + '-stripe'}>
        <div className={'orb orb-contents ' + floatDirection}>
          <h3 id={type + '-label'}>{type[0].toUpperCase() + type.slice(1)}</h3>
          <div>
            <button onClick={() => changeTime(-60, type)}>-</button>
            <span id={type + '-length'}> {time / 60} </span>
            <button onClick={() => changeTime(60, type)}>+</button>
          </div>
        </div>
      </figure>
    </div>
  );
};

export default Comet;
