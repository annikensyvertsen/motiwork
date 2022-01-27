import React, { useEffect, useState } from "react";
import { View, StyleSheet , Text} from "react-native";
import AnimatedCircularProgress from 'react-native-animated-circular-progress';
import { Card, Button } from "react-native-paper";
import { cardStyles, textStyles, yellowColor } from "./styles/sharedStyles";

export const GoalDisplay =  ({goal}) => {

  let today = Math.floor(new Date().getTime() / 1000)
  let hoursWorked = Math.floor(goal.workload/60)
  let workloadGoal = Math.floor(goal.workloadGoal / 60)

  const [progress, setProgress] = useState()
  const [remainingDays, setRemainingDays] = useState(0)


  const secondsToDhms = (s) => {
    let seconds = Number(s);
    let d = Math.floor(seconds / (3600*24));
    let h = Math.floor(seconds % (3600*24) / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    return {
      days: d,
      hours: h,
      minutes: m
    }
  }

  const calculateTimeLeft = () => {
    let timeLeftInSeconds = goal.endDate ? goal.endDate.seconds : 0;
    let timeLeft = timeLeftInSeconds - today
    let timeLeftInDays = secondsToDhms(timeLeft).days
    setRemainingDays(timeLeftInDays)
  }

  const calculateProgress = () => {

    let workloadGoal = goal.workloadGoal / 60
    let percentageWorked = hoursWorked/workloadGoal
    let degrees = 360*percentageWorked
    setProgress(degrees)

  }

  useEffect(() => {
    calculateTimeLeft() 
    calculateProgress()
  }, [goal])
  

  return (
    <View style={styles.wrapper} >
      <Card  style={cardStyles.primaryCard}>
        <View style={styles.cardContent}>
          <View style={styles.textWrapper}>
            <Text style={textStyles.tertiaryHeadingText}>{goal && goal.goalName}</Text>
            <View style={styles.subTextWrapper}>
              <Text style={textStyles.greyTextBold}>{remainingDays}</Text>
              <Text style={textStyles.greyText}> dager igjen</Text>
            </View>
          </View>
          <View style={styles.progressCircle} >
            <AnimatedCircularProgress
              color={yellowColor}
              startDeg={45}
              endDeg={progress}
              radius={40}
              innerRadius={28}
              innerBackgroundColor={"white"}
              duration={1000}
              style={styles.childrenStyle}
            >
              <View style={styles.circleText}>
                <Text>{hoursWorked} / {workloadGoal}</Text>
              </View>
            </AnimatedCircularProgress>
          </View>
        </View>
      </Card>
    </View>
  )
}


const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    marginBottom: 20
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 5,
    marginRight: 5,
  },
  progressCircleContainer: {
    backgroundColor: 'white'
  },
  progressCircle: {
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  circleText: {
    alignSelf: "center",
    flex: 1,
    justifyContent: "center"
  },
  childrenStyle: {
    display: "flex",
    justifyContent: "center",
  },
  textWrapper: {
    width: '70%'
  },
  subTextWrapper: {
    display: "flex",
    flexDirection: "row",
    marginTop: 4
  }
  
});
