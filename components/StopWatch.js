
import React, {useRef, useEffect} from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Button, DefaultTheme, Surface } from "react-native-paper";
import { updateUserPoints } from "../help-functions/goal";
import { useStopwatch } from "../hooks/stopWatchHook";
import { useSelector } from "react-redux";
import { auth } from "../firebase";
import { buttonStyles, textStyles, containerStyles } from "./styles/sharedStyles";

export const StopWatch = ({values}) => {

  const {points, isRunning, elapsedTime, startTimer, stopTimer, resetTimer} = useStopwatch();
  //didmountref = reference used to see if it is initial render or not, maybe not the best way but works for now
  const didMountRef = useRef(false);

  let {user} = useSelector(state => state.user)
  let {cooperations} = useSelector(state => state.cooperations)

  const handleOnStartStopPress = () => {
    if(isRunning){
      stopTimer()
      values.setCurrentPoints(points)
      values.activateDialog()
    }else{
      startTimer()
    };
  }
  useEffect(() => {
    values.setIsStopwatchRunning(isRunning)
  }, [isRunning])


  const handleResetStopwatch = () => {
    let elapsedTimeInHours = (elapsedTime/60)/60
    updateUserPoints(elapsedTimeInHours, points, user, cooperations)
    !isRunning && resetTimer()
  }

  const stopOrContinueSession = () => {
    console.log("values stopstopwatch", values.stopStopWatch, "isEnd", values.isEndSession)
      if(values.isEndSession){
        handleResetStopwatch()
      }else{
        startTimer()
    }
  }

  // useEffect(() => {
  //   stopOrContinueSession()
  // }, [values.stopStopWatch])

  useEffect(() => {
    if(didMountRef.current){
      if(!values.visibleDialog ){
        if(values.isEndSession){  
          handleResetStopwatch()
        }else{
          startTimer()
        }
      }
    }else {
      didMountRef.current = true
    }
    
  }, [values.stopStopWatch])

  const formatTime = () => {
    let minutes = Math.floor(elapsedTime / 60);
    let seconds = Math.floor(elapsedTime - minutes * 60)
    let formatmin = minutes.toString()
    let formatsecs = seconds.toString()
    if(minutes < 10){
      formatmin = "0" + minutes
    }
    if(seconds < 10){
      formatsecs = "0" + seconds

    }
    return formatmin + " : " + formatsecs
  }


  return(
    <View style={styles.wrapper}>
      <View style={containerStyles.flexBoxWithMarginTop}>
        <Text>Start en økt for å få poeng!</Text>
        <Text>Hold det gående i minst ti minutter for å få poeng.</Text>
      </View>
      <View style={containerStyles.flexBoxWithMarginTop}>
        <Surface style={styles.circle}>
        <Text style={styles.pointText}> {points}p</Text>
          <Text style={styles.timerText}> {formatTime()} </Text>
        </Surface>
      </View>
      <View style={styles.flexBoxWithMarginTop}>
        <Button labelStyle={textStyles.secondaryButtonText} mode="contained" style={buttonStyles.secondaryButton} onPress={handleOnStartStopPress} status={isRunning ? "running" : "stopped"}>
            {isRunning ? "Stop" : "Start"}
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },  
  flexBoxWithMarginTop: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
  },
  circle: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').width * 0.8,
    backgroundColor: DefaultTheme.colors.primary,
    justifyContent: 'center',
    alignItems: "center",
  },
  timerText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white"
  },
  pointText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white"
  },

})
