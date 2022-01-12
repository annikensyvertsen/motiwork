import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import {StopWatch} from "../components/StopWatch"

const SessionTab = () => {

  return (
    <View>
     <Text>Session</Text>
     <StopWatch />
    </View>
  );
};
export default SessionTab;
