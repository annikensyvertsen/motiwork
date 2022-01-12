import React, {useState, useEffect, useRef} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import {ChooseTime} from "./ChooseTime"


const formatTime = (t) => {
  let minutes = Math.floor(t / 60);
  let seconds = Math.floor(t - minutes * 60)
  return minutes + "m : " + seconds + " s"
}

export const Timer = (props) => {
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
    console.log("????")
  }

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
            
      {isSetTimer && <ChooseTime /> }


      </View>

  )
}


