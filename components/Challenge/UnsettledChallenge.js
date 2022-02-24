import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card, Checkbox } from "react-native-paper";
import { useSelector } from "react-redux";
import { returnFormattedDate } from "../../help-functions/date-and-time";
import { returnUserBasedOnId } from "../../help-functions/friends";
import { textStyles } from "../styles/sharedStyles";

export const UnsettledChallenge = ({challenge, members}) => {
  const {user} = useSelector(state => state.user)
  let winnerUser = challenge.winner ? returnUserBasedOnId(challenge.winner) : null

  const [checked, setChecked] = useState(challenge.settled)
  const findLoser = () => {
    if(members){
      if(winnerUser){
        return winnerUser === members.sender ? returnUserBasedOnId(members.receiver) : returnUserBasedOnId(members.sender)
      } else return null
    }else return null
  }

  // const settleChallenge = () => {
    
  // }
  
  let loserUser = findLoser()
  let currentUserIsWinner = user.uid === winnerUser
  return(
    <View style={styles.wrapper}>
      <Card style={styles.card}>
        <Text style={textStyles.tertiaryHeadingText}>Utfordring: "{challenge.goalName}"</Text>
        <Text style={textStyles.greyItalicText}>Avsluttet {returnFormattedDate(challenge.endDate.seconds)}</Text>
        <View>
        {winnerUser ? (
          <View>
          {challenge.reward ? (
            currentUserIsWinner ?
            <View style={styles.textWrapper}>
              <Text>Du vant!</Text>
              <Text>{loserUser.firstname} skylder deg {challenge.reward}</Text>
            </View>
            :
            <View style={styles.textWrapper}>
            <View style={{display: 'flex', flexDirection: "row"}}>
              <Text style={{textTransform: 'capitalize'}}>{winnerUser.firstname}</Text><Text> vant!</Text>
            </View>
            <View>
              <Text>Du skylder {winnerUser.firstname} "{challenge.reward}""</Text>
            </View>
          </View>
          ):
        (
          currentUserIsWinner ?
            <View style={styles.textWrapper}>
              <Text>Du vant!</Text>
            </View>
            :
            <View style={styles.textWrapper}>
            <View style={{display: 'flex', flexDirection: "row"}}>
              <Text style={{textTransform: 'capitalize'}}>{winnerUser.firstname}</Text><Text> vant!</Text>
            </View>
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
    flexDirection: "column",
    marginTop: 10,
  }
})
