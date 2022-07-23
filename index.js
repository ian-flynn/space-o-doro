
function App(){
    const [displayTime, setDisplayTime] = React.useState(25*60);
    const [breakTime, setBreakTime] = React.useState(5*60);
    const [sessionTime, setSessionTime] = React.useState(25*60);
    const [timerOn, setTimerOn] = React.useState(false);
    const [onBreak, setOnBreak] = React.useState(false);
    const [intervalId, setIntervalId] = React.useState(null);
    const breakAudio = React.useRef(null);

    React.useEffect(() => {
        setDisplayTime(sessionTime);
      }, [sessionTime]);

    React.useEffect(()=>{
        if (displayTime == 0){
            breakAudio.current.currentTime = 0;
            breakAudio.current.play();
            setOnBreak(!onBreak);
            if(!onBreak){
                setDisplayTime(breakTime);
            } else if(onBreak){
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
        let minutes = Math.floor(time/60);
        let seconds = time % 60;
        return (minutes < 10 ? '0' + minutes: minutes) + ':' + (seconds < 10 ? '0' + seconds: seconds)
    };

    const changeTime = (amount, type) => {
        if(timerOn){
            return;
        }
        if(type == 'break'){
            //keep timers at 1 minute or higher
            if(breakTime <= 60 && amount < 0 ){
                return;
            }
            if(breakTime >= 3600 && amount > 0){
              return
          }
            setBreakTime((prev)=> prev + amount)
        }
        if(type == 'session'){
            //keep timers at 1 minute or higher
            if(sessionTime <= 60 && amount < 0){
                return;
            }
            if(sessionTime >= 3600 && amount > 0){
                return
            }
            setSessionTime((prev)=> prev + amount);
            if(!timerOn){
                setDisplayTime(sessionTime + amount);
            }

        }
    }
//new 
    const timerControl = ()=>{
        if(intervalId === null){
            const interval = setInterval(()=>{
                setDisplayTime((prev) => prev - 1)
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
        setDisplayTime(25*60);
        setBreakTime(5*60);
        setSessionTime(25*60);
        setOnBreak(false);
        setTimerOn(false);
    };

    return(
        <div className="timer background">
            <h1>Pomodoro Clock</h1>
            {/* <button onClick={playBreakSound}>Play</button> */}
            <div className="contents">
                <div id='break-box' className="stripe">
                    <div className="orb left">
                        <h3 id='break-label'>Break Length</h3>
                        <button onClick={() => changeTime(-60, 'break')} id='break-decrement'><i className="fa-solid fa-arrow-down"></i></button>
                        <span id='break-length'>{breakTime/60}</span>
                        <button onClick={() => changeTime(60, 'break')} id='break-increment'><i className="fa-solid fa-arrow-up"></i></button>
                    </div>
                </div>
                <div id='session-box' className="stripe">
                    <div className="orb right">
                        <h3 id='session-label'>Session Length</h3>
                        <button onClick={() => changeTime(-60, 'session')} id='session-decrement'><i className="fa-solid fa-arrow-down"></i></button>
                        <span id='session-length'>{sessionTime/60}</span>
                        <button onClick={() => changeTime(60, 'session')} id='session-increment'><i className="fa-solid fa-arrow-up"></i></button>
                    </div>
                </div>
                <div id='timer-box'>
                    <h3 id='timer-label'>{onBreak ? 'Break' : 'Session'}</h3>
                    <h1 id='time-left'>{formatTime(displayTime)}</h1>
                    <div id="button-box">
                        <button id='start_stop' onClick={timerControl}>{timerOn ? <i className="fa-solid fa-pause"></i>:<i className="fa-solid fa-play"></i>}</button>
                        <button id='reset' onClick={resetTime}><i className="fa-solid fa-arrows-rotate"></i></button>
                    </div>
                    <audio
                        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                        id="beep"
                        ref={breakAudio}>
                    </audio>
                </div>
            </div> 
        </div>
    )   
}
ReactDOM.render(<App />, document.getElementById('root'));