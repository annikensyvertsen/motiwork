
import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useStopwatch } from "../hooks/stopWatchHook";

export const StopWatch = () => {
  const {isRunning, elapsedTime, startTimer, stopTimer, resetTimer} = useStopwatch();
  const handleStartStop = () => {
    isRunning ? stopTimer() : startTimer();
  }
  const handleReset = () => {
    !isRunning && resetTimer()
  }

  const formatTime = () => {
    let minutes = Math.floor(elapsedTime / 60);
    let seconds = Math.floor(elapsedTime - minutes * 60)
    return minutes + "m : " + seconds + " s"
  }

  return(
    <View>
      <Text> {formatTime()} </Text>
      <Button onPress={handleReset}>reset</Button>
      <Button onPress={handleStartStop} status={isRunning ? "running" : "stopped"}>
        {isRunning ? "Stop" : "Start"}
      </Button>
    </View>
  )
}