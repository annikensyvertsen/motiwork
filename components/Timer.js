import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const formatTime = (t) => {
  console.log("in format time", t)
  let minutes = Math.floor(t / 60);
  let seconds = Math.floor(t - minutes * 60)
  return minutes + "m : " + seconds + " s"
}

export const Timer = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [countDownTime, setCountDownTime] = useState(600)

  const [formattedTime, setFormattedTime] = useState(formatTime(countDownTime))
  const [remainingTime, setRemainingTime] = useState(0)

  useEffect(() => {
    setFormattedTime(formatTime(remainingTime))

  }, [remainingTime])


  const onPress = () => { setIsRunning(!isRunning)}
  return (
    <View>
          <CountdownCircleTimer
          isPlaying={isRunning}
          duration={countDownTime}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[7, 5, 2, 0]}
          onUpdate={(setRemainingTime)}
        >
        {() => <Text>{formattedTime}</Text>}
      </CountdownCircleTimer>
      <Button onPress={onPress}>{isRunning ? "Stop" : "Start"}</Button>
    </View>
  )
}

