import { useState, useEffect } from "react";
import BackgroundTimer from "react-native-background-timer"

export const useTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [points, setPoints] = useState(0)

  const countPoints = (minutes) => {
    return (minutes - (minutes%10))
  }

  useEffect(() => {
    let interval;
      console.log("hei")
      if(isRunning){
          BackgroundTimer.start()
          interval = BackgroundTimer.setInterval(() => {
              setElapsedTime((prevElapsedTime) => prevElapsedTime + 1)
              console.log("elapsed time", elapsedTime)
          }, 1000)
          BackgroundTimer.stop()

      }
      return () => {
          BackgroundTimer.clearInterval(interval)
      }
  }, [isRunning])

  useEffect(() => {
    let min = elapsedTime/60
    if((min>=10)){
      setPoints(countPoints(elapsedTime/60))
    }
  }, [elapsedTime])

  return {
    isRunning,
    setIsRunning,
    elapsedTime,
    setElapsedTime,
    points,
    setPoints,
  }
}

export const useStopwatch = () => {
  const { isRunning, setIsRunning, elapsedTime, setElapsedTime, points, setPoints} = useTimer()
  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setPoints(0);
  }
  return {
    elapsedTime: elapsedTime.toFixed(1), 
    resetTimer: () => handleReset(),
    startTimer: () => setIsRunning(true),
    stopTimer: () => setIsRunning(false),
    isRunning,
    points
  }
}
