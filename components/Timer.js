import React, {useState, useEffect, useRef} from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Button, DefaultTheme } from "react-native-paper";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { buttonStyles, textStyles, containerStyles } from "./styles/sharedStyles";


const formatTime = (t) => {
  let hours = Math.floor(t/3600)
  let minutes = 0
  let seconds = 0
  let formatted = ""
  
  if(hours > 0){
    minutes = Math.floor(t % 3600 / 60)
    seconds = Math.floor(t % 3600 % 60)
    formatted = hours + " : " + minutes + " : " + seconds
  }else{
    minutes = Math.floor(t / 60);
    seconds = Math.floor(t - minutes * 60)
    formatted =  minutes + " :  " + seconds
  }
  return formatted
}

const convertToSeconds = (h, m) => {
  let seconds = (m + (60* h))*60
  return seconds
}

export const Timer = (props) => {

  let sizeOfTimer = Dimensions.get('window').width * 0.8;
  let hours = props.values?.hours;
  let minutes = props.values?.minutes;

  const [isRunning, setIsRunning] = useState(false)
  const [countDownTime, setCountDownTime] = useState(600)


  const [formattedTime, setFormattedTime] = useState(formatTime(countDownTime))
  const [remainingTime, setRemainingTime] = useState(0)

  const [isChangeTime, setIsChangeTime] = useState(false)


  const onStartOrStopPress = () => { 
    setIsRunning(!isRunning)
  }

  const onTimePress = () => {
    setIsChangeTime(!isChangeTime)
    props.handlePresentPress()
  }

  //change the time-text every time remaining time changes
  useEffect(() => {
    setFormattedTime(formatTime(remainingTime))
  }, [remainingTime])

  //update the time when the hours and minutes are changed manually in bottom sheet
  useEffect(() => {
    let totalSeconds = convertToSeconds(hours, minutes)
    setFormattedTime(formatTime(totalSeconds))
    setCountDownTime(totalSeconds)
  }, [hours, minutes])


  return (

    <View style={styles.wrapper}>
      <CountdownCircleTimer
        isPlaying={isRunning}
        duration={countDownTime}
        colors={[DefaultTheme.colors.primary, '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
        onUpdate={(setRemainingTime)}
        size={sizeOfTimer}
        strokeWidth={20}
      >
        {() =>
          <Button onPress={onTimePress}>
            <Text style={styles.timeText}>{formattedTime}</Text>
          </Button>}
      </CountdownCircleTimer>

      <View style={containerStyles.flexBoxWithMarginTop}>      
        <Button labelStyle={textStyles.secondaryButtonText} mode="contained" style={buttonStyles.secondaryButton} onPress={onStartOrStopPress}>
          {isRunning ? "Stop" : "Start"}
        </Button>            
      </View>

    </View>
  )
}


export const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  timeText:{
    fontSize: 30,
    fontWeight: "bold"
  }
})


