import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export const ChallengesEmptyState = ({handlePresentPress}) => {

  const onPress = () => {
    handlePresentPress()
  }
  return(
    <View style={styles.wrapper}>
      <Text style={{textAlign: "center"}}>Dere har ingen aktive utfordringer. Start en utfordring for å motivere hverandre til å jobbe mer!</Text>
      <Button style={styles.button} mode="contained" onPress={onPress}>Start en utfordring</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  },
  button: {
    width: '80%',
    margin: 10,
  }
})
