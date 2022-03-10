import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card, IconButton, List, ProgressBar, Button } from "react-native-paper";
import { calculateDaysLeft } from "../../help-functions/date-and-time";
import { returnUserBasedOnId } from "../../help-functions/friends";
import { archiveChallenge } from "../../store/actions/cooperationsActions";
import { textStyles } from "../styles/sharedStyles";

export const Challenge = ({activeChallenge, handlePresentPress, cooperationId, handleEditPress, members, currentUser}) => {

  const {goalName, endDate, reward, workload, workloadGoal} = activeChallenge

  let remainingDays = calculateDaysLeft(endDate.seconds)

  const [leader, setLeader] = useState(null)

  const calculateProgress = (amountWorked) => {
    if(amountWorked === 0) return 0
    return amountWorked/workloadGoal
  }
  let friendUserId = members.receiver === currentUser.uid ? members.sender : members.receiver 
  let friend = returnUserBasedOnId(friendUserId)
  
  let currentUserProgress = calculateProgress(workload[currentUser.uid])
  let friendProgress = calculateProgress(workload[friendUserId])

  const checkLeader = () => {
    if(currentUserProgress > friendProgress) setLeader(currentUser)
    else if(currentUserProgress < friendProgress) setLeader(friend)
    else setLeader(null)
  }

  let winner = activeChallenge.winner && returnUserBasedOnId(activeChallenge.winner) || null
 
  const winningColor = "#006F3C"
  const losingColor = "#BF212F"
  let remainingDaysText = "dager igjen"

  useEffect(() => {
    if(remainingDays === 1){
      remainingDaysText = "dag igjen"
    }else{
      remainingDaysText = "dager igjen"
    }
  }, [])

  useEffect(() => {
    checkLeader()
  }, [currentUser])

  const onEditPress = () => {
    handleEditPress()
  }

  const returnColor = (id) => {
    if(leader === null) return losingColor
    else if(leader.uid === id) return winningColor
    else return losingColor
  }
  
  const returnCardStyle = () => {
    if(leader === null) return styles.losingCardStyle
    else if(leader.uid === currentUser.uid) return styles.winningCardStyle
    else return styles.losingCardStyle
  }

  const onArchiveChallengePress = async() => {
    await archiveChallenge(activeChallenge, cooperationId).then(res => {
      handlePresentPress()
    })
  }

  return(
    <View style={styles.wrapper}>
      <Card style={returnCardStyle()}>
      <View style={styles.container}>
        <View style={styles.content}>

          <View style={styles.headerWrapper}>
            <View style={{width: 22}}></View>
            <View style={styles.header}>
              <Text style={textStyles.tertiaryHeadingText}>{goalName}</Text>
              <Text>{remainingDays} {remainingDaysText}</Text>
            </View>
            <IconButton style={{margin: 0}} icon="pencil-box-outline" color="grey" size={22} onPress={onEditPress} />
          </View>

          <View style={styles.progress}>
          <View style={styles.progressAndText}>
            <Text style={styles.progressName}>{friend && friend.firstname} - <Text style={{color: 'grey', textTransform: 'lowercase'}}>{workload[friendUserId]} timer</Text></Text>
            <ProgressBar style={styles.progressBar} progress={friendProgress} color={friend && returnColor(friend.uid)}/>
          </View>
          <View style={styles.progressAndText}>
            <Text style={styles.progressName}>{currentUser && currentUser.firstname} (deg) - <Text style={{color: 'grey', textTransform: 'lowercase'}}>{workload[currentUser.uid]} timer</Text> </Text>
            <ProgressBar style={styles.progressBar} progress={currentUserProgress} color={currentUser && returnColor(currentUser.uid)}/>
          </View>
          </View>
          <View style={styles.reward}>
            <Text style={textStyles.subtitleText}>✨ {reward} ✨</Text>
          </View>
          {winner && (
            <Text>{winner.uid === currentUser.uid? 'Du' : winner.firstname} vant!</Text>
          )}
          {activeChallenge.completed && !activeChallenge.winner && (
            <View style={{marginBottom: 10}}>
              <Text>Det ble uavgjort 🤷</Text>
            </View>
          )}
        </View>
        {(!activeChallenge.completed && !activeChallenge.winner) && (
           leader === null ?
          (
             <View style={styles.loosingFooter}>
                <List.Icon color="#FFB61D" icon="alert"></List.Icon>
                <Text style={styles.footerText}>Det er likt! </Text>
                <List.Icon color="#FFB61D" icon="alert"></List.Icon>
            </View>
          )
          :
          leader.uid === currentUser.uid ? 
          (
            <View style={styles.winningFooter}>
            <Text style={styles.footerText}>{"Du"} leder! </Text>
            </View>
          ) 
          : 
          (
              <View style={styles.loosingFooter}>
                <List.Icon color="#FFB61D" icon="alert"></List.Icon>
                <Text style={styles.footerText}>{friend.firstname} leder </Text>
                <List.Icon color="#FFB61D" icon="alert"></List.Icon>
            </View>
          )
        
        )}

       
      </View>
      </Card>
      {(winner || activeChallenge.completed)  && (
        <Button style={{marginTop: 20, marginBottom: 10, width: '80%', alignSelf: "center"}} onPress={onArchiveChallengePress} mode="contained">Start en ny utfordring!</Button>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    width: '100%',
   },
  winningCardStyle: {
    borderRadius: 10,
    width: '80%',
    minHeight: 300,
    alignSelf: "center",
    borderWidth: 2,
    borderColor:  "#006F3C",
    marginTop: 20,
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
  headerWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%'
  },
  header: {
    display: "flex",
    alignSelf: "center",
    alignItems: "center"
    },
  content: {
    margin: 10,
    flex: 1,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between"

  },
  container: {
    display: "flex",
    flex:1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  progress: {

  },
  progressBar: {
    width: 200, 
    height: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 3,
    margin: 10,
    },
    progressName: {
      textTransform: "capitalize",
    },

  reward: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  loosingFooter: {
    backgroundColor: "#BF212F",
    minHeight: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  winningFooter: {
    backgroundColor: "#006F3C",
    minHeight: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  footerText: {
    color: "white",
  }
})
