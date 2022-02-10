import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { textStyles } from "../styles/sharedStyles";

export const UnsettledChallenges = ({archivedChallenges}) => {

  console.log("archived ----->", archivedChallenges)
  //const {endDate, goalName, reward} = archivedChallenges

  //let dateOfEndedChallenge = new Date(endDate.seconds * 1000)
  const dateOfEndedChallenge = (d) => {
    return new Date(d * 1000)
  }
  return(
    <View style={styles.wrapper}>
      <Text style={textStyles.greyText}>Uoppgjort</Text>
      {archivedChallenges.map((challenge, i) => (
        <View key={(i)}>
          <Card>
          <Text> hello</Text>

          </Card>
        </View>
      )
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 20,
  }
})