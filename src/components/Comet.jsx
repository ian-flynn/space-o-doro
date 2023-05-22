import React from 'react';

const Comet = ({ type, time, changeTime, floatDirection }) => {
  return (
    <div id={type + '-box'}>
      <figure className={type + '-stripe'}>
        <div className={'orb orb-contents ' + floatDirection}>
          <h3 id={type + '-label'}>
            {type[0].toUpperCase() + type.slice(1)}
            <br />
            Length
          </h3>
          <div>
            <button
              onClick={() => changeTime(-60, type)}
              id={type + '-decrement'}
            >
              <i className='fa-solid fa-arrow-down fa-xl'>-</i>
            </button>
            <span id={type + '-length'}> {time / 60} </span>
            <button
              onClick={() => changeTime(60, type)}
              id={type + '-increment'}
            >
              <i className='fa-solid fa-arrow-up fa-xl'>+</i>
            </button>
          </div>
        </div>
      </figure>
    </div>
  );
};

export default Comet;
