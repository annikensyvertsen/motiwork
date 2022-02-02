import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { returnUserBasedOnId } from "../help-functions/friends";
import { acceptCooperationRequest, declineCooperationRequest } from "../store/actions/cooperationsActions";


export const CooperationRequestItem = ({request}) => {

  let requestSender = returnUserBasedOnId(request.members.sender)
  const onPress = (action) => {
    if(action === "accept"){
      acceptCooperationRequest(request)
    }else{
      declineCooperationRequest(request)
    }
  }

  return(
    <View style={styles.wrapper}>
      <Text style={styles.textStyle}>{requestSender.name}</Text>
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
