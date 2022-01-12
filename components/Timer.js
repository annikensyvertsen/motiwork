import React, {useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const StopWatch = () => {

  let padToTwo = (number) => (number <= 9 ? `0${number}`: number);

  const [time, setTime] = useState({
    min: 0,
    sec: 0,
    msec: 0
  })

  const [points, setPoints] = useState(0)

  return (
    <View style={styles.container}>
     <View>
      <Text>{points} p</Text>
      <Text>Remaining time. </Text>
      <Text>{padToTwo(time.min) + ' : '}</Text>
      <Text>{padToTwo(time.sec) + ' : '}</Text>
     </View>
    </View>
  );
};
export default StopWatch;


const communityStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: 200,
  },
})