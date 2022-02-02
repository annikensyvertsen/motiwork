import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export const ChallengesEmptyState = ({handlePresentPress}) => {

  const onPress = () => {
    console.log("click")
    handlePresentPress()
  }
  return(
    <View>
      <Text>Dere har ingen aktive utfordringer. Start en utfordring for å motivere hverandre til å jobbe mer!</Text>
      <Button onPress={onPress}>Start en utfordring</Button>
    </View>
  )
}