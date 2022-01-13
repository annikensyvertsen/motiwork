
import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Button, DefaultTheme, Surface } from "react-native-paper";
import { useStopwatch } from "../hooks/stopWatchHook";
//import styles from "../screens/sessions/styles";
import { buttonStyles, textStyles } from "./styles/sharedStyles";

export const StopWatch = () => {
  const {points, isRunning, elapsedTime, startTimer, stopTimer, resetTimer} = useStopwatch();
  const handleStartStop = () => {
    isRunning ? stopTimer() : startTimer();
  }
  const handleReset = () => {
    !isRunning && resetTimer()
  }

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
      <Surface style={styles.circle}>
      <Text style={styles.pointText}> {points}p</Text>
        <Text style={styles.timerText}> {formatTime()} </Text>
      </Surface>
      <View style={styles.flexBoxWithMarginTop}>
        <Button labelStyle={textStyles.secondaryButtonText} mode="contained" style={buttonStyles.secondaryButton} onPress={handleStartStop} status={isRunning ? "running" : "stopped"}>
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

//      // <Button onPress={handleReset}>reset</Button>
