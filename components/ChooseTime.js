
import React, {useState, useRef} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Subheading } from "react-native-paper";
import {TimePicker} from 'react-native-simple-time-picker';



export const ChooseTime = ({values}) => {

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const handleChange = (value) => {
    setHours(value.hours);
    setMinutes(value.minutes);
  };

  const onButtonPress = () => {
    values.setHours(hours)
    values.setMinutes(minutes)
  }

  return (

    <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Subheading> Hvor lenge ønsker du å arbeide? </Subheading>
      <TimePicker hoursUnit="timer" minutesUnit="min" value={{hours, minutes}} onChange={handleChange} />
      <Button onPress={onButtonPress} style={{width: 100}} mode="contained"> Velg</Button>
    </View>
  )
}
