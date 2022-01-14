import React, {useState, useEffect, useRef} from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Button, DefaultTheme } from "react-native-paper";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { buttonStyles, textStyles, containerStyles } from "./styles/sharedStyles";
import { auth, db } from "../firebase";
import firebase from 'firebase/app';


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

  const [isRunning, setIsRunning] = useState(false)
  const [countDownTime, setCountDownTime] = useState(600)

  const [formattedTime, setFormattedTime] = useState(formatTime(countDownTime))
  const [remainingTime, setRemainingTime] = useState(0)

  const [isChangeTime, setIsChangeTime] = useState(false)

  //const [points, setPoints] = useState(2)

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

  const onCountdownComplete = async () => {
    let totalMinutes = countDownTime/60
    if(totalMinutes >= 10){
      let totalPoints = Math.floor(totalMinutes/10)
      db.collection('usersCollection').doc(currentUser.uid).update({
        points: firebase.firestore.FieldValue.increment(totalPoints)
      })
      .then(result => console.log("result??", result))
      .catch(error => console.log("error", error))
      
    }
    onStartOrStopPress()

  }

  const updateTimer = (e) => {
    setRemainingTime(e)
    setFormattedTime(formatTime(e))
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


