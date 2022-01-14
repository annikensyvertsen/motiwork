import React, {useState, useEffect, useRef} from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Button, DefaultTheme } from "react-native-paper";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { buttonStyles, textStyles, containerStyles } from "./styles/sharedStyles";


//todo: denne funksjonen skal forenkles
const formatTime = (t) => {
  let hours = Math.floor(t/3600)
  let minutes = 0
  let seconds = 0
  let formatted = ""
  
  let formattedsec = ""
  let formattedmin = ""
  let formattedhour = ""

  if(hours > 0){
    minutes = Math.floor(t % 3600 / 60)
    seconds = Math.floor(t % 3600 % 60)
    formattedhour = hours.toString()
    formattedmin = minutes.toString()
    formattedsec = seconds.toString()
    if(hours < 10){
      formattedhour = "0" + hours
    }
    if(minutes < 10){
      formattedmin = "0" + minutes
    }
    if(seconds < 10){
      formattedsec = "0" + seconds
    }
    formatted = formattedhour + " : " + formattedmin + " : " + formattedsec
  }else{
    minutes = Math.floor(t / 60);
    seconds = Math.floor(t - minutes * 60)
    formattedmin = minutes.toString()
    formattedsec = seconds.toString()
    if(minutes < 10){
      formattedmin = "0" + minutes
    }
    if(seconds < 10){
      formattedsec = "0" + seconds
    }
    formatted =  formattedmin + " :  " + formattedsec
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
    if(isRunning){
      props.values.resetComponent()
    }
  }

  const onTimePress = () => {
    setIsChangeTime(!isChangeTime)
    props.handlePresentPress()
  }

  useEffect(() => {
    setFormattedTime(formatTime(remainingTime))
  }, [remainingTime])

  useEffect(() => {
    let totalSeconds = convertToSeconds(hours, minutes)
    setFormattedTime(formatTime(totalSeconds))
    setCountDownTime(totalSeconds)
  }, [props.values?.hours,  props.values?.minutes, ])


  const updateTimer = (e) => {
    setRemainingTime(e)
    setFormattedTime(formatTime(e))
  }

  return (

    <View style={styles.wrapper}>
      <CountdownCircleTimer
        isPlaying={isRunning}
        duration={countDownTime}
        colors={[DefaultTheme.colors.primary, '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
        onUpdate={updateTimer}
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


