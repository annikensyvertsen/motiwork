import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Button, List } from "react-native-paper";
import { auth } from "../firebase";
import { useSelector } from "react-redux";
import { convertSecondsToDaysHoursAndMinutes, convertHoursToSeconds, returnFormattedTime } from "../help-functions/date-and-time";


const ProfileTab = () => {
  const [initials, setInitials] = useState("")
  let currentUser = auth.currentUser; 
  let {user} = useSelector(state => state.user)
  let workloadInSeconds = convertHoursToSeconds(user.totalWorkload)
  let workloadInDHM = convertSecondsToDaysHoursAndMinutes(workloadInSeconds)
  
  useEffect(() => {
    setInitials((user.firstname[0] + user.surname[0]).toUpperCase())
  }, [user])
  return (
      <View style={styles.wrapper}>
      <View>
        <View style={styles.authenticationInfo}>
          <Avatar.Text size={70} label={initials} />
          <Text style={styles.nameText}>{user.firstname} {user.surname}</Text>
          <Text>{currentUser.email}</Text>
        </View>
        <View style={styles.progress}>
          <View style={styles.iconAndText}>
            <List.Icon icon="clock-outline" />
           <Text>{returnFormattedTime(workloadInDHM)}</Text>
          </View>
          <View style={styles.iconAndText}>
            <List.Icon icon="star-circle-outline"/>
            <Text>{user.points} poeng</Text>
          </View>

        </View>
      </View>
      <Button onPress={() => auth.signOut()}>Logg ut</Button>
    </View>
  );
};
export default ProfileTab;

const styles = StyleSheet.create({
  wrapper: {
    height: '80%',
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  authenticationInfo: {
    display: "flex",
    alignItems: "center",
    margin: 40
  },
  iconAndText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  nameText: {
    textTransform: "capitalize",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 5
  },
  progress: {
    display: "flex",
    flexDirection: "column",
  }
})