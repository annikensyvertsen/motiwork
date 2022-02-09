import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { acceptFriendRequest, declineFriendRequest } from "../store/actions/socialActions";
import { returnUserBasedOnId } from "../help-functions/friends";


export const RequestItem = ({currentUserId, requestId}) => {
  let user = returnUserBasedOnId(requestId)

  const onPress = (action) => {
    if(action === "accept"){
      acceptFriendRequest(currentUserId, requestId)
    }else{
      declineFriendRequest(currentUserId, requestId)
    }
  }

  return(
    <View style={styles.wrapper}>
      <Text style={styles.textStyle}>{user && (user.firstname + " " + user.surname)}</Text>
      <View style={styles.buttonWrapper}>
        <Button onPress={() => onPress("accept")}>Godta</Button>
        <Button onPress={() => onPress("decline")}>Avslå</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    textTransform: "capitalize",
    fontSize: 18
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row"
  }
})
