import React from 'react';
import Star from './Star.jsx';
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
    <div id='planet'>
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
      {/* <Star positionClass={'star0'} />
      <Star positionClass={'star1'} />
      <Star positionClass={'star2'} />
      <Star positionClass={'star3'} /> */}
    </div>
  );
};

export default Planet;
