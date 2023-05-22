import React, { useEffect, useRef, useState } from 'react';

const App = () => {
  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const breakAudio = useRef(null);

  useEffect(() => {
    setDisplayTime(sessionTime);
  }, [sessionTime]);

  useEffect(() => {
    if (displayTime == 0) {
      breakAudio.current.currentTime = 0;
      breakAudio.current.play();
      setOnBreak(!onBreak);
      if (!onBreak) {
        setDisplayTime(breakTime);
      } else if (onBreak) {
        setDisplayTime(sessionTime);
      }
    }
  }, [displayTime, onBreak, breakTime, sessionTime]);

  //     const playBreakSound = () => {
  //         breakAudio.currentTime = 1;
  //         breakAudio.play();
  //         setTimeout(()=>{
  //             breakAudio.pause();
  //             breakAudio.currentTime = 0;
  //         }, 1300);
  //     }

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? '0' + minutes : minutes) +
      ':' +
      (seconds < 10 ? '0' + seconds : seconds)
    );
  };

  const changeTime = (amount, type) => {
    if (timerOn) {
      return;
    }
    if (type == 'break') {
      //keep timers at 1 minute or higher
      if (breakTime <= 60 && amount < 0) {
        return;
      }
      if (breakTime >= 3600 && amount > 0) {
        return;
      }
      setBreakTime((prev) => prev + amount);
    }
    if (type == 'session') {
      //keep timers at 1 minute or higher
      if (sessionTime <= 60 && amount < 0) {
        return;
      }
      if (sessionTime >= 3600 && amount > 0) {
        return;
      }
      setSessionTime((prev) => prev + amount);
      if (!timerOn) {
        setDisplayTime(sessionTime + amount);
      }
    }
  };
  //new
  const timerControl = () => {
    if (intervalId === null) {
      const interval = setInterval(() => {
        setDisplayTime((prev) => prev - 1);
      }, 1000);
      setIntervalId(interval);
    } else {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setTimerOn(!timerOn);
  };

  const resetTime = () => {
    breakAudio.current.pause();
    breakAudio.current.currentTime = 0;
    clearInterval(intervalId);
    setIntervalId(null);
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
    setOnBreak(false);
    setTimerOn(false);
  };

  return (
    <div className='timer'>
      <h1 className='title'>Pomodoro Timer</h1>
      <div className='contents'>
        <div className='boxes'>
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
                    <i className='fa-solid fa-arrow-down fa-xl'></i>
                  </button>
                  <span id='break-length'> {breakTime / 60} </span>
                  <button
                    onClick={() => changeTime(60, 'break')}
                    id='break-increment'
                  >
                    <i className='fa-solid fa-arrow-up fa-xl'></i>
                  </button>
                </div>
              </div>
            </figure>
          </div>
          <div id='session-box'>
            <figure className='bottom-stripe'>
              <div className='orb right orb-contents'>
                <h3 id='session-label'>
                  Session
                  <br />
                  Length
                </h3>
                <div>
                  <button
                    onClick={() => changeTime(-60, 'session')}
                    id='session-decrement'
                  >
                    <i className='fa-solid fa-arrow-down fa-xl'></i>
                  </button>
                  <span id='session-length'> {sessionTime / 60} </span>
                  <button
                    onClick={() => changeTime(60, 'session')}
                    id='session-increment'
                  >
                    <i className='fa-solid fa-arrow-up fa-xl'></i>
                  </button>
                </div>
              </div>
            </figure>
          </div>
        </div>
        <div className='timer-ball timer-ball-stuff'>
          <div id='button-box'>
            <h3 id='timer-label'>{onBreak ? 'Break' : 'Session'}</h3>
            <button id='start_stop' onClick={timerControl}>
              {timerOn ? (
                <i className='fa-solid fa-pause fa-xl'></i>
              ) : (
                <i className='fa-solid fa-play fa-xl'></i>
              )}
            </button>
            <button id='reset' onClick={resetTime}>
              <i className='fa-solid fa-arrows-rotate fa-xl'></i>
            </button>
          </div>
          <h1 id='time-left'>{formatTime(displayTime)}</h1>

          <audio
            src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
            id='beep'
            ref={breakAudio}
          ></audio>
        </div>
      </div>
      <span class='four-point-star star0'></span>
      <span class='four-point-star star1'></span>
      <span class='four-point-star star2'></span>
      <span class='four-point-star star3'></span>
    </div>
  );
};
// ReactDOM.render(<App />, document.getElementById('root'));
export default App;
