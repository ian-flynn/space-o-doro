import React from 'react';

const BreakComet = ({ breakTime, changeTime }) => {
  return (
    <div id='break-box'>
      <figure className='top-stripe'>
        <div className='orb orb-contents'>
          <h3 id='break-label'>
            Break
            <br />
            Length
          </h3>
          <div>
            <button
              onClick={() => changeTime(-60, 'break')}
              id='break-decrement'
            >
              <i className='fa-solid fa-arrow-down fa-xl'>d</i>
            </button>
            <span id='break-length'> {breakTime / 60} </span>
            <button
              onClick={() => changeTime(60, 'break')}
              id='break-increment'
            >
              <i className='fa-solid fa-arrow-up fa-xl'>u</i>
            </button>
          </div>
        </div>
      </figure>
    </div>
  );
};

export default BreakComet;
