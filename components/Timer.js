import React, {useState, useEffect, useRef} from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Button, DefaultTheme } from "react-native-paper";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { buttonStyles, textStyles, containerStyles } from "./styles/sharedStyles";
import { auth } from "../firebase";
import { updateUserPoints } from "../help-functions/goal";


//todo: denne funksjonen kan forenkles
const formatTime = (t) => {
  let hours = Math.floor(t/3600)
  let minutes = 0
  let seconds = 0
  let formatted = ""

  if(hours > 0){
    minutes = Math.floor(t % 3600 / 60).toString()
    seconds = Math.floor(t % 3600 % 60).toString()
    
  }else{
    minutes = Math.floor(t / 60);
    seconds = Math.floor(t - minutes * 60)
  }
  if(hours < 10){
    hours = "0" + hours
  }
  if(minutes < 10){
    minutes = "0" + minutes
  }
  if(seconds < 10){
   seconds = "0" + seconds
  }
  formatted = hours + " : " + minutes + " : " + seconds
  return formatted
}

const convertToSeconds = (h, m) => {
  let seconds = (m + (60* h))*60
  return seconds
}

export const Timer = (props) => {

  let currentUser = auth.currentUser;

  let sizeOfTimer = Dimensions.get('window').width * 0.8;
  let hours = props.values?.hours;
  let minutes = props.values?.minutes;
  let totalInitialTime = (hours*60*60) + (minutes*60)

  const [isRunning, setIsRunning] = useState(false)
  const [countDownTime, setCountDownTime] = useState(totalInitialTime)

  const [formattedTime, setFormattedTime] = useState(formatTime(countDownTime))
  const [remainingTime, setRemainingTime] = useState(0)

  const [isChangeTime, setIsChangeTime] = useState(false)

  const [currentPoints, setCurrentPoints] = useState(0)
  const didMountRef = useRef(false);

  const handleOnStartStoppPress = () => { 
    setIsRunning(!isRunning)
    if(isRunning){
      props.values.activateDialog()
    }
  }

  const handleResetStopwatch = () => {
    props.values.resetComponent()
  }

  useEffect(() => {
    //if renders for the firsttime
    if(didMountRef.current){
      if(!props.values.visibleDialog){
        if(props.values.isEndSession){  
          handleResetStopwatch()
        }else{
          setIsRunning(!isRunning)
        }
      }
    }else {
      didMountRef.current = true
    }
  }, [props.values.visibleDialog])

  const onTimePress = () => {
    setIsChangeTime(!isChangeTime)
    props.handlePresentPress()
  }

  const onCountdownComplete = async () => {
    let totalMinutes = countDownTime/60
    if(totalMinutes >= 10){
      let points = Math.floor(totalMinutes/10)
      updateUserPoints(hours, points, currentUser.uid)
    }
    handleOnStartStoppPress()
  }


  const updateTimer = (e) => {
    setRemainingTime(e)
    setFormattedTime(formatTime(e))
    calculateCurrentPoints(e)
  }

  const calculateCurrentPoints = (t) => {
    let totalTime = (hours * 60 * 60) + (minutes * 60)
    let timeElapsed = totalTime - t
    let totalMinutes = timeElapsed/60
    if(totalMinutes >= 10){
      let points = Math.floor(totalMinutes/10)
      setCurrentPoints(points)
    }
  }

  useEffect(() => {
    setFormattedTime(formatTime(remainingTime))

  }, [remainingTime])

  useEffect(() => {
    let totalSeconds = convertToSeconds(hours, minutes)
    setFormattedTime(formatTime(totalSeconds))
    setCountDownTime(totalSeconds)
  }, [props.values?.hours,  props.values?.minutes, ])


  return (

    <View style={styles.wrapper}>
      <View style={containerStyles.flexBoxWithMarginTop}>
       <Text>Start en økt for å få poeng!</Text>
       <Text>Hold ut helt til økten er ferdig for å få poeng &#128131; </Text>
      </View>

      <View style={containerStyles.flexBoxWithMarginTop}>
        <CountdownCircleTimer
          isPlaying={isRunning}
          duration={countDownTime}
          colors={[DefaultTheme.colors.primary, '#F7B801', '#A30000', '#A30000']}
          colorsTime={[7, 5, 2, 0]}
          onUpdate={updateTimer}
          size={sizeOfTimer}
          strokeWidth={20}
          onComplete={onCountdownComplete}
        >
          {() =>
            <View style={styles.timerContent}>
              <Text style={styles.pointText}>{currentPoints}p</Text>
              <Button onPress={onTimePress}>
                <Text style={styles.timeText}>{formattedTime}</Text>
              </Button>
            </View>
           }
        </CountdownCircleTimer>
      </View>

      <View style={containerStyles.flexBoxWithMarginTop}>      
        <Button labelStyle={textStyles.secondaryButtonText} mode="contained" style={buttonStyles.secondaryButton} onPress={handleOnStartStoppPress}>
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
  timerContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  timeText: {
    fontSize: 30,
    fontWeight: "bold"
  },
  pointText: {
    fontSize: 24,
    fontWeight: "bold",
    color: DefaultTheme.colors.primary
  }
})


