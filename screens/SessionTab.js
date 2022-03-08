import React, {useState, useRef, useEffect, useCallback} from "react";
import { Text, View, StyleSheet, AppState } from "react-native";
import {  Button, DefaultTheme, Provider, Portal } from "react-native-paper";
import { ChooseTime } from "../components/ChooseTime";
import {StopWatch} from "../components/StopWatch"
import {Timer} from "../components/Timer"
import BottomSheetTemplate from "../screens/BottomSheetTemplate";
import ComponentDialog from '../components/Dialog'
import { useSelector } from "react-redux";
import SessionCompleteDialog from "../components/Dialogs/SessionCompleteDialog";

const SessionTab = () => {

  const [isTimer, setIsTimer] = useState(false)
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(45);
  const [seconds, setSeconds] = useState(0);
  const [isEndSession, setIsEndSession] = useState(false);
  const [timerKey, setTimerKey] = useState(false)
  const [stopStopWatch, setStopStopWatch] = useState(false)
  
  const [currentPoints,setCurrentPoints ] = useState(0)

  const [visibleDialog, setVisibleDialog] = useState(false);
  const [isSessionComplete, setIsSessionComplete] = useState(false)


  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false)

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current)


  const bottomSheetRef = useRef(null);

  //let {appState} = useSelector(state => state.appState)

  //let s = useSelector(state.state.appState)

  const handlePresentPress = () => bottomSheetRef.current.present()
  
  const resetTimer = () => {
    setTimerKey(!timerKey)
  }

  const activateDialog = () => {
    setVisibleDialog(true)
  }

  const closeDialogAndContinueSession = () => {
    setVisibleDialog(false)
    setIsEndSession(false)
    if(isTimer){
      setIsTimerRunning(true)
    }else {
      setStopStopWatch(!stopStopWatch)
    }
  }

  const closeDialogAndStopSession = () => {
    setVisibleDialog(false)
    setIsEndSession(true)
    if(isTimer){
      setIsSessionComplete(true)
      resetTimer()
    }else{
      setStopStopWatch(!stopStopWatch)
    }
  }

  const onPress = (timer) => {
    setIsTimer(timer)
  }

  // useEffect(() => {
  //   console.log("sssssss---_", s)
  //   console.log("this is the current appState. I hope. ", appState, typeof appState, appState === "background")
  //   if(appState === 'background' || appState === "inactive"){
  //     console.log("in ce b  ackground")
  //     activateDialog()
  //   }
  //   //når denne blir inaktiv
  //   //send push notification og paus session/send den dialogen

  // }, [appState])

  //TODO: fikse dette
  // useEffect(() => {
  //   const subscription = AppState.addEventListener("change", nextAppState => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === "active"
  //     ) {
  //       //console.log("App has come to the foreground!");

  //     }
  //     if(appState.current === 'background'|| appState.current === 'inactive'){
  //       console.log("isStopwatchRunning", isStopwatchRunning, "isTimer", isTimerRunning)
  //       if(isStopwatchRunning || isTimerRunning){
  //         activateDialog()
  //       }
  //     }

  //     appState.current = nextAppState;
  //     setAppStateVisible(appState.current);
  //     //dispatch({ type: SET_APP_STATE, payload: appState.current})

  //    console.log("AppState", appState.current);
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);


  useEffect(() => {
    console.log("only --- isStopwatchRunning", isStopwatchRunning)
    console.log("is end session", isEndSession)
  }, [isStopwatchRunning])

  return (
    <Provider>
    <Portal>
    {visibleDialog && <ComponentDialog isTimer={isTimer} closeDialogAndStopSession={closeDialogAndStopSession} closeDialogAndContinueSession={closeDialogAndContinueSession}currentPoints={currentPoints} visibleDialog={visibleDialog}/>}
    {isSessionComplete && <SessionCompleteDialog isSessionComplete={isSessionComplete} currentPoints={currentPoints} setIsSessionComplete={setIsSessionComplete} />}
    </Portal>
    
    <View style={styles.sessionWrapper}>
     <View style={styles.container}>
        <View style={styles.toggleButtonsContainer}>
          <View >
            <Button disabled={isTimerRunning || isStopwatchRunning} onPress={() => onPress(false)} style={styles.timerButton} color={isTimer ? 'white' : DefaultTheme.colors.primary} mode="contained">Stopwatch</Button>
          </View>
          <View>
            <Button disabled={isTimerRunning || isStopwatchRunning} onPress={() => onPress(true)} style={styles.stopWatchButton} color={!isTimer ? 'white' : DefaultTheme.colors.primary} mode="contained">Timer</Button>
          </View>
        </View>
     </View>

     <View style={styles.flexBoxWithMarginTop}>
      {isTimer ? 
        <Timer key={timerKey} setIsSessionComplete={setIsSessionComplete} isTimerRunning={isTimerRunning} resetTimer={resetTimer} setIsTimerRunning={setIsTimerRunning} setCurrentPoints={setCurrentPoints} currentPoints={currentPoints} values={{activateDialog, hours, minutes, setHours, setMinutes, visibleDialog, isEndSession}} handlePresentPress={handlePresentPress} /> 
        : 
        <StopWatch values={{stopStopWatch, activateDialog,visibleDialog, setCurrentPoints, isEndSession, isStopwatchRunning, setIsStopwatchRunning}}/>}
     </View>

     <BottomSheetTemplate contentComponent={<ChooseTime values={{hours, minutes, seconds, setSeconds, setHours, setMinutes, bottomSheetRef}} />} ref={bottomSheetRef} />
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