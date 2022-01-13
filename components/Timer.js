import React, {useState, useEffect, useRef} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const formatTime = (t) => {
  let hours = Math.floor(t/3600)
  let minutes = 0
  let seconds = 0
  let formatted = ""
  if(hours > 0){
    minutes = Math.floor(t % 3600 / 60)
    seconds = Math.floor(t % 3600 % 60)
    formatted = hours + "h : " + minutes + " m : " + seconds + " s"
  }else{
    minutes = Math.floor(t / 60);
    seconds = Math.floor(t - minutes * 60)
    formatted =  minutes + "m : " + seconds + " s"
  }
  return (hours > 0 && hours + "h : " ) + minutes + " m : " + seconds + " s"
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
    let totalSeconds = convertToSeconds(hours, minutes)
    setFormattedTime(formatTime(totalSeconds))
    setCountDownTime(totalSeconds)
  }, [hours, minutes])


  return (

    <View style={{flex: 1}}>
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


