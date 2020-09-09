import React from 'react';
import './App.css';

function App() {
  
  const [breakLength, setBreakLength] = React.useState(5)
  const [sessionLength, setSessionLength] = React.useState(25)
  const [timeLeft, setTimeLeft] = React.useState(25*60)
  const [running, setRunning] = React.useState(false)
  const [session, setSession] = React.useState(true)
  
  React.useEffect(() => { const clockTask = setTimeout(() => {
    if (running === true && (timeLeft > 0))
        setTimeLeft(timeLeft - 1)
    if (timeLeft === 1) {
      document.getElementById("beep").play()
      setSession(!session)
    }
    if (timeLeft === 0) {
      if (!session)
        setTimeLeft(sessionLength * 60)
      else
        setTimeLeft(breakLength * 60)
    }
  },1000)
  return () => { clearTimeout(clockTask) }
},[timeLeft,running])
  
  
  function handleClick(event) {
    event.preventDefault()
    switch (event.target.id) {
      case "reset":
        setBreakLength(5)
        setSessionLength(25)
        setTimeLeft(25*60)
        setRunning(false)
        setSession(true)
        document.getElementById("beep").load()
        break
      case "break-decrement":
        setBreakLength(Math.max(breakLength - 1,1))
        break
      case "break-increment":
        setBreakLength(Math.min(breakLength + 1,60))
        break
      case "session-decrement":
        setSessionLength(Math.max(sessionLength - 1,1))
        if (running === false)
          setTimeLeft((sessionLength-1)*60)
        break
      case "session-increment":
        setSessionLength(Math.min(sessionLength + 1,60))
        if (running === false)
          setTimeLeft((sessionLength+1)*60)
        break
      case "start_stop":
        setRunning(running ? false : true)
        break
      default:
        break
    }
  }
  
  return (
    <div id="clock">
      <label id="break-label">
        Break Length: {breakLength}
      </label>
      <br/>
        <button id="break-decrement" onClick={handleClick}>-</button>
        <button id="break-increment" onClick={handleClick}>+</button>
      <br/>
      <label id="session-label">
        Session Length: {sessionLength}
      </label>
      <br/>
        <button id="session-decrement" onClick={handleClick}>-</button>
        <button id="session-increment" onClick={handleClick}>+</button>
      
      <br/>
      
      <label id="timer-label">{session ? "Session:" : "Break:"} {(""+Math.floor(timeLeft/60)).padStart(2,"0")+":"+(""+(timeLeft % 60)).padStart(2,"0")}
      </label>
      <br/>
      <button id="start_stop" onClick={handleClick}>
        {running ? "Stop" : "Start"}
      </button>
      <button id="reset" onClick={handleClick}>
        Reset
      </button>
      <audio src="http://www.mikeshecket.com/beep.mp3" id="beep"></audio>
    </div>
    )
}

export default App