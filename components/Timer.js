import React, {useState, useEffect, useRef} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const formatTime = (t) => {
  let minutes = Math.floor(t / 60);
  let seconds = Math.floor(t - minutes * 60)
  return minutes + "m : " + seconds + " s"
}

const convertToSeconds = (h, m) => {
  let seconds = (m + (60* h))*60
  return seconds
}

export const Timer = (props) => {

  let hours = props.values?.hours;
  let minutes = props.values?.minutes;

  const [isRunning, setIsRunning] = useState(false)
  const [countDownTime, setCountDownTime] = useState(600)


  const [formattedTime, setFormattedTime] = useState(formatTime(countDownTime))
  const [remainingTime, setRemainingTime] = useState(0)

  const [isSetTimer, setIsSetTimer] = useState(false)

  useEffect(() => {
    setFormattedTime(formatTime(remainingTime))

  }, [remainingTime])

  const onPress = () => { setIsRunning(!isRunning)}

  const onTimePress = () => {
    setIsSetTimer(!isSetTimer)
    props.handlePresentPress()
  }
  useEffect(() => {
    console.log("stopwatch listens", convertToSeconds(hours, minutes))
    let totalMinutes = convertToSeconds(hours, minutes)
    console.log("total minutes", totalMinutes, formatTime(totalMinutes))
    setFormattedTime(formatTime(totalMinutes))
    console.log("formatted time?", formattedTime)
  }, [hours, minutes])


  return (

    <View>
      <CountdownCircleTimer
        isPlaying={isRunning}
        duration={countDownTime}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
        onUpdate={(setRemainingTime)}
      >
        {() =><Button onPress={onTimePress}><Text>{formattedTime}</Text></Button>}
      </CountdownCircleTimer>
      <Button onPress={onPress}>{isRunning ? "Stop" : "Start"}</Button>            
      </View>

  )
}


