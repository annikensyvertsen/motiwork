
import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Button, DefaultTheme, Surface,  Portal, Provider } from "react-native-paper";
import { updateUserPoints } from "../hooks/setPointsHook";
import { useStopwatch } from "../hooks/stopWatchHook";
import { auth } from "../firebase";
import { buttonStyles, textStyles, containerStyles } from "./styles/sharedStyles";

export const StopWatch = (props) => {

  const {points, isRunning, elapsedTime, startTimer, stopTimer, resetTimer} = useStopwatch();
  let currentUser = auth.currentUser

  const handleOnStartStopPress = () => {
    if(isRunning){
      stopTimer()
      props.values.activateDialog()
    }else{
      startTimer()
    };
  }

  const handleResetStopwatch = () => {
    updateUserPoints(points, currentUser.uid)
    !isRunning && resetTimer()
  }

  useEffect(() => {
    if(!props.values.visibleDialog){
      if(props.values.isEndSession){  
        handleResetStopwatch()
      }else{
        startTimer()
      }
    }
  }, [props.values.visibleDialog])

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
