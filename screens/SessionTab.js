import React, {useState, useRef, useEffect} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Switch, Button, DefaultTheme } from "react-native-paper";
import { ChooseTime } from "../components/ChooseTime";
import {StopWatch} from "../components/StopWatch"
import {Timer} from "../components/Timer"
import BottomSheetTemplate from "../screens/BottomSheetTemplate";


const SessionTab = () => {

  const [isTimer, setIsTimer] = useState(false)
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(45);
  const [seconds, setSeconds] = useState(0);


  const onToggleSwitch = () => setIsTimer(!isTimer)
        //TODO: use togglebutton instead

  const bottomSheetModalRef = useRef(null);
  const handlePresentPress = () => bottomSheetModalRef.current.present()
  
  return (
    <View style={styles.sessionWrapper}>
     <View style={styles.container}>
        <View style={styles.toggleButtonsContainer}>
          <View >
            <Button onPress={onToggleSwitch} style={styles.timerButton} color={isTimer ? 'white' : DefaultTheme.colors.primary} mode="contained">Stopwatch</Button>
          </View>
          <View>
            <Button onPress={onToggleSwitch} style={styles.stopWatchButton} color={!isTimer ? 'white' : DefaultTheme.colors.primary} mode="contained">Timer</Button>
          </View>
        </View>
     </View>

     <View style={styles.flexBoxWithMarginTop}>
        <Text>Start en økt for å få poeng!</Text>
        <Text>Hold det gående i minst ti minutter for å få poeng.</Text>
     </View>

     <View style={styles.flexBoxWithMarginTop}>
      {isTimer ? <Timer values={{hours, minutes, setHours, setMinutes}} handlePresentPress={handlePresentPress} /> : <StopWatch/>}
     </View>

     <BottomSheetTemplate contentComponent={<ChooseTime values={{hours, minutes, seconds, setSeconds, setHours, setMinutes, bottomSheetModalRef}} />} ref={bottomSheetModalRef} />
    </View>
  );
};
export default SessionTab;



const styles = StyleSheet.create({
  sessionWrapper: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
  flexBoxWithMarginTop: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
  },
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
  },
  toggleButtonsContainer: {
    display: "flex",
    flexDirection: "row"
  },
  stopWatchButton: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 8,
    borderWidth: 2,
    borderColor: DefaultTheme.colors.primary
  },

  timerButton: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 0,
    borderWidth: 2,
    borderColor: DefaultTheme.colors.primary
  }
});


// <ToggleButton.Group
//         onValueChange={value => onToggleSwitch}
//         value={isTimer}>
//         <ToggleButton icon="format-align-left" status={isTimer} value="left" />
//         <ToggleButton icon="format-align-right" status={!isTimer} value="right" />
//       </ToggleButton.Group>