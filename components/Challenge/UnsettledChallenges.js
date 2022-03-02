import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import { textStyles } from "../styles/sharedStyles";
import { UnsettledChallenge } from "./UnsettledChallenge";

export const UnsettledChallenges = ({archivedChallenges, members}) => {

  //const {endDate, goalName, reward} = archivedChallenges

  console.log("archivedchallenges", archivedChallenges)
  //let dateOfEndedChallenge = new Date(endDate.seconds * 1000)
  const dateOfEndedChallenge = (d) => {
    return new Date(d * 1000)
  }
  return(
    <View style={styles.wrapper}>
      <Text style={textStyles.greyText}>Uoppgjort</Text>
      <ScrollView style={styles.container}>
        {archivedChallenges.map((challenge, i) => (
          !challenge.settled && (
          <UnsettledChallenge members={members} challenge={challenge} key={i}/>
          )
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 20,
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 10
  }
})