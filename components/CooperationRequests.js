import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { DefaultTheme, IconButton, Button, Divider } from "react-native-paper";
import { CooperationRequestItem } from "./CooperationRequestItem";
import { textStyles } from "./styles/sharedStyles";
import { useSelector } from "react-redux";


export const CooperationRequests = () => {
  let {user} = useSelector(state => state.user)

  return(
    <View style={styles.wrapper}>
    <Text style={textStyles.subtitleText}> Forespørsler om samarbeid </Text>
    {user.incomingCooperationRequests.map((r, i) => (
      <CooperationRequestItem key={i} request={r} />
    ))}    
    {user.incomingCooperationRequests.length > 1 && <Divider />}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    borderColor: DefaultTheme.colors.primary
  }
})