import React, {useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Switch } from "react-native-paper";
import {StopWatch} from "../components/StopWatch"
import {Timer} from "../components/Timer"

const SessionTab = () => {

  const [isTimer, setIsTimer] = useState(false)

  const onToggleSwitch = () => setIsTimer(!isTimer)
  return (
    <View>

     <Text style={styles.header1}>Session</Text>
     <View style={styles.container}>
      <Text>Timer</Text>
       <Switch color="purple" value={isTimer} onValueChange={onToggleSwitch} />
      <Text>Stopwatch</Text>
     </View>
     {isTimer ? <Timer /> : <StopWatch />}
    </View>
  );
};
export default SessionTab;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row"
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  header1: {
    fontSize: 18,
  }
});
