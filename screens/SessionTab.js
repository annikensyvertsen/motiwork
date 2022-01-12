import React, {useState, useRef} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Switch } from "react-native-paper";
import { ChooseTime } from "../components/ChooseTime";
import {StopWatch} from "../components/StopWatch"
import {Timer} from "../components/Timer"
import BottomSheetTemplate from "../screens/BottomSheetTemplate";


const SessionTab = () => {

  const [isTimer, setIsTimer] = useState(false)

  const onToggleSwitch = () => setIsTimer(!isTimer)
        //TODO: use togglebutton instead

   
  const bottomSheetModalRef = useRef(null);
  const handlePresentPress = () => bottomSheetModalRef.current.present()
      

  return (
    <View style={{flex: 1}}>
     <Text style={styles.header1}>Session</Text>
     <View style={styles.container}>
      <Text>Timer</Text>
       <Switch color="purple" value={isTimer} onValueChange={onToggleSwitch} />
      <Text>Stopwatch</Text>
     </View>
     {isTimer ? <Timer handlePresentPress={handlePresentPress} /> : <StopWatch />}
     <BottomSheetTemplate timeComponent={<ChooseTime />} ref={bottomSheetModalRef}>
     </BottomSheetTemplate>

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
