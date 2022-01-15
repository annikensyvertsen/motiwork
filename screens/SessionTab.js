import React, {useState, useRef, useEffect, useCallback} from "react";
import { Text, View, StyleSheet } from "react-native";
import {  Button, DefaultTheme, Provider, Portal } from "react-native-paper";
import { ChooseTime } from "../components/ChooseTime";
import {StopWatch} from "../components/StopWatch"
import {Timer} from "../components/Timer"
import BottomSheetTemplate from "../screens/BottomSheetTemplate";
import ComponentDialog from '../components/Dialog'


const SessionTab = () => {

  const [isTimer, setIsTimer] = useState(false)
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(45);
  const [seconds, setSeconds] = useState(0);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [isEndSession, setIsEndSession] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  const onToggleSwitch = () => setIsTimer(!isTimer)

  const bottomSheetModalRef = useRef(null);
  const handlePresentPress = () => bottomSheetModalRef.current.present()
  
  const resetComponent = () => {
    setIsTimerRunning(!isTimerRunning)
  }

  const activateDialog = () => {
    setVisibleDialog(!visibleDialog)
  }

  const stopDialog = (endSession) => {
    setVisibleDialog(!visibleDialog)
    setIsEndSession(endSession)
  }

  return (
    <Provider>
    <Portal>
      <ComponentDialog stopDialog={stopDialog} visibleDialog={visibleDialog}/>
    </Portal>

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
      {isTimer ? 
        <Timer key={isTimerRunning} values={{activateDialog, hours, minutes, resetComponent, setHours, setMinutes, isEndSession}} handlePresentPress={handlePresentPress} /> 
        : 
        <StopWatch values={{activateDialog,visibleDialog, isEndSession}}/>}
     </View>

     <BottomSheetTemplate contentComponent={<ChooseTime values={{hours, minutes, seconds, setSeconds, setHours, setMinutes, bottomSheetModalRef}} />} ref={bottomSheetModalRef} />
    </View>
    </Provider>
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