import React, { useEffect, useRef, useState } from 'react';
import Star from './components/Star.jsx';
import Comet from './components/Comet.jsx';
import Planet from './components/Planet.jsx';

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
    <div className='contents'>
      <Planet
        onBreak={onBreak}
        timerControl={timerControl}
        timerOn={timerOn}
        resetTime={resetTime}
        formatTime={formatTime}
        displayTime={displayTime}
        breakAudio={breakAudio}
      />
      <div id='comets-box'>
        <Comet type={'break'} time={breakTime} changeTime={changeTime} />
        <Comet type={'session'} time={sessionTime} changeTime={changeTime} />
      </div>
      <div id='stars-box'>
        <Star star={'star0'} />
        <Star star={'star1'} />
        <Star star={'star2'} />
        <Star star={'star3'} />
      </div>
    </div>
  );
};
// ReactDOM.render(<App />, document.getElementById('root'));
export default App;
