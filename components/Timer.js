import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Modal, Portal, Provider } from "react-native-paper";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import {ChooseTime} from "./ChooseTime"


const formatTime = (t) => {
  console.log("in format time", t)
  let minutes = Math.floor(t / 60);
  let seconds = Math.floor(t - minutes * 60)
  return minutes + "m : " + seconds + " s"
}

export const Timer = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [countDownTime, setCountDownTime] = useState(600)

  const [isModalVisible, setIsModalVisible] = useState(false)

  const [formattedTime, setFormattedTime] = useState(formatTime(countDownTime))
  const [remainingTime, setRemainingTime] = useState(0)

  const [isSetTimer, setIsSetTimer] = useState(false)

  useEffect(() => {
    setFormattedTime(formatTime(remainingTime))

  }, [remainingTime])

  useEffect(() => {
    console.log("is set timer?", isSetTimer)

  }, [isSetTimer])

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);
  const onPress = () => { setIsRunning(!isRunning)}
  const containerStyle = {backgroundColor: 'white', padding: 40};


  const onTimePress = () => {
    showModal();
    setIsSetTimer(!isSetTimer)
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

// <Portal>
//       <Modal visible={isModalVisible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
//         <Text>Modal</Text>
//       </Modal>
//     </Portal>