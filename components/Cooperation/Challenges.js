import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export const Challenges = ({activeChallenges}) => {

  console.log("activeChallenges", activeChallenges)
  const onPress = () => {
    console.log("click")
  }
  return(
    <View style={{flex:1}}>
      <Text>Her skal alle de vakre utfordringene vises!</Text>
    </View>
  )
}