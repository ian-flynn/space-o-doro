import React from 'react';

import fccBeepSound from '../assets/fccBeepSound.wav';
const Planet = ({
  onBreak,
  timerControl,
  timerOn,
  resetTime,
  formatTime,
  displayTime,
  breakAudio,
}) => {
  return (
    <div id='planet' className='ball'>
      <h1>{onBreak ? 'Break' : 'Session'}</h1>
      <div id='button-box'>
        <button id='start_stop' onClick={timerControl}>
          {timerOn ? 'Pause' : 'Play'}
        </button>
        <button id='reset' onClick={resetTime}>
          Reset
        </button>
      </div>
      <p>{formatTime(displayTime)}</p>
      <audio src={fccBeepSound} id='beep' ref={breakAudio}></audio>
    </div>
  );
};

export default Planet;
