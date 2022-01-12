
import React, {useState, useRef} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Modal, Portal, Provider } from "react-native-paper";
import {TimePicker} from 'react-native-simple-time-picker';



export const ChooseTime = () => {
  console.log("renders")
 

  const [selectedItem, setSelectedItem] = useState("")
  const itemList = ['10', '20', '30', '40', '50', '60']

  const onPickerSelect = (i) => {setSelectedItem(itemList[i])}

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const handleChange = (value) => {
    setHours(value.hours);
    setMinutes(value.minutes);
    console.log("value: ", value)
  };

  return (

    <View>
  
      <Text> Choose: </Text>
      <TimePicker hoursUnit="timer" minutesUnit="min" value={{hours, minutes}} onChange={handleChange} />
     
    
    </View>
  )
}
