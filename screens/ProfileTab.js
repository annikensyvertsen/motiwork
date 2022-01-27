import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { auth } from "../firebase";
import { useSelector } from "react-redux";
import { convertSecondsToDaysHoursAndMinutes, convertHoursToSeconds, returnFormattedTime } from "../help-functions/date-and-time";


const ProfileTab = () => {
  let currentUser = auth.currentUser; 
  let {user} = useSelector(state => state.user)
  let workloadInSeconds = convertHoursToSeconds(user.totalWorkload)
  let workloadInDHM = convertSecondsToDaysHoursAndMinutes(workloadInSeconds)

  return (
    <View>
      <Text>Profile</Text>
      <Text>Email: {currentUser.email}</Text>
      <Text>Username: {currentUser.displayName}</Text>
      <Text>Points: {user.points}</Text>
      <Text>Total workload: {returnFormattedTime(workloadInDHM)}</Text>

      <Button onPress={() => auth.signOut()}>Logg ut</Button>
    </View>
  );
};
export default ProfileTab;
