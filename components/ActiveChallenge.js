import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Avatar, Button, Card, List, ProgressBar } from "react-native-paper";
import { calculateDaysLeft } from "../help-functions/date-and-time";
import { returnUserBasedOnId } from "../help-functions/friends";
import { textStyles } from "./styles/sharedStyles";

export const ActiveChallenge = ({activeChallenge, currentUser}) => {
  const {members, cooperationName} = activeChallenge
  const {endDate, goalName, workload, workloadGoal} = activeChallenge.challenge
  let isLeading = true;
  const [leader, setLeader] = useState(currentUser)

  let remainingDays = calculateDaysLeft(endDate.seconds)

  const calculateProgress = (amountWorked) => {
    if(amountWorked === 0){
      return 0
    }
    return amountWorked/workloadGoal
  }

  let remainingDaysText = "dager igjen"

  let friendUserId = members.receiver === currentUser.uid ? members.sender : members.receiver 
  let friend = returnUserBasedOnId(friendUserId)
  let currentUserProgress = calculateProgress(workload[currentUser.uid])
  let friendProgress = calculateProgress(workload[friendUserId])

  const checkLeader = () => {
    if(currentUserProgress > friendProgress) setLeader(currentUser)
    else setLeader(friend)
  }

  useEffect(() => {
    if(remainingDays === 1){
      remainingDaysText = "dag igjen"
    }else{
      remainingDaysText = "dager igjen"
    }
  }, [])

  
  useEffect(() => {
    checkLeader()
  }, [])
  return(
    <View style={styles.wrapper}>
    <Card style={isLeading? styles.winningCardStyle : styles.losingCardStyle}>
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.horizontalHeaderText}>
            <Text style={textStyles.tertiaryHeadingText}>{goalName}</Text>
            <Text style={styles.cooperationNameText} >{cooperationName}</Text>
          </View>
          <View style={styles.horizontalText}>
            <Text style={textStyles.greyTextBold}>{remainingDays}</Text>
            <Text style={textStyles.greyText}> {remainingDaysText}</Text>
          </View>
        </View>
      </View>
      {leader.uid === currentUser.uid ? 
        (
          <View style={styles.winningFooter}>
          <Text style={styles.footerText}>{"Du"} leder! </Text>
          </View>
        ) 
        : 
        (
            <View style={styles.loosingFooter}>
              <List.Icon color="#FFB61D" icon="alert"></List.Icon>
              <Text style={styles.footerText}>{friend.nanme} leder </Text>
              <List.Icon color="#FFB61D" icon="alert"></List.Icon>
          </View>
        )
      }
    </View>
    </Card>
  </View>
  )
}


const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    width: '100%',
    flex: 1,
    marginTop: 5,
    marginBottom: 5
   },
   container: {
   },
   content: {
    margin: 10,
   },
  winningCardStyle: {
    borderRadius: 10,
    width: '100%',
    alignSelf: "center",
    borderWidth: 2,
    borderColor:  "#006F3C",
    marginTop: 20,
  },
  horizontalHeaderText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cooperationNameText: {
    fontStyle: "italic",
    color: "grey",
  },
  horizontalText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 5,
  },
  reward: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row"
  },
  losingCardStyle: {
    borderRadius: 10,
    width: '80%',
    minHeight: 300,
    alignSelf: "center",
    borderWidth: 2,
    borderColor:  "#BF212F",
    marginTop: 20,
  },
  loosingFooter: {
    backgroundColor: "#BF212F",
    minHeight: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    //  litt hacky å sette denne manuelt men blir sånn enn så lenge
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  winningFooter: {
    backgroundColor: "#006F3C",
    minHeight: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    //  litt hacky å sette denne manuelt men blir sånn enn så lenge
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  footerText: {
    color: "white",
  }
})