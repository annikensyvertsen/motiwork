import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { useSelector } from "react-redux";
import { returnFormattedDate } from "../../help-functions/date-and-time";
import { returnUserBasedOnId } from "../../help-functions/friends";
import { textStyles } from "../styles/sharedStyles";

export const UnsettledChallenge = ({challenge, members}) => {
  const {user} = useSelector(state => state.user)
  let winnerUser = challenge.winner ? returnUserBasedOnId(challenge.winner) : null

  const findLoser = () => {
    if(members){
      if(winnerUser){
        return winnerUser === members.sender ? returnUserBasedOnId(members.receiver) : returnUserBasedOnId(members.sender)
      } else return null
    }else return null
  }
  
  let loserUser = findLoser()
  let currentUserIsWinner = user.uid === winnerUser
  return(
    <View style={styles.wrapper}>
      <Card style={styles.card}>
        <Text styles={textStyles.tertiaryHeadingText}>{challenge.goalName}</Text>
        <Text styles={textStyles.greyText}>Utfordringen ble ferdig {returnFormattedDate(challenge.endDate.seconds)}</Text>
        <View>
        {winnerUser ? (
          <View>
          <Text>{winnerUser.firstname} vant</Text>
          {challenge.reward && (
            currentUserIsWinner ?
            <View style={styles.textWrapper}>
              <Text>Du vant!</Text>
              <Text>{loserUser.firstname} skylder deg {challenge.reward}</Text>
            </View>
            :
            <View style={styles.textWrapper}>
              <Text>{winnerUser.firstname} vant!</Text>
              <Text>Du skylder {winnerUser.firstname} {challenge.reward}.</Text>
          </View>
          )}
          </View>
        ): (
          <Text>Ingen vant</Text>
        )}
        
        </View>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  card: {
    padding: 10,
    borderRadius: 10,
  },
  textWrapper: {
    display: "flex",
    flexDirection: "column"
  }
})
