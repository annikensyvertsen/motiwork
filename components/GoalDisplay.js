import React, { useEffect, useState } from "react";
import { View, StyleSheet , Text} from "react-native";
import AnimatedCircularProgress from 'react-native-animated-circular-progress';
import { Card, Button, Divider } from "react-native-paper";
import { convertHoursToSeconds, convertSecondsToDaysHoursAndMinutes, returnFormattedTime } from "../help-functions/date-and-time";
import { cardStyles, textStyles, yellowColor } from "./styles/sharedStyles";

export const GoalDisplay =  ({goal}) => {

  let today = new Date().getTime() / 1000
  let hoursWorked = goal.workload || 0
  let workloadGoal = (goal.workloadGoal) || 0

  let secondsWorked = convertHoursToSeconds(hoursWorked)
  let convertedTime = convertSecondsToDaysHoursAndMinutes(secondsWorked)
  const [progress, setProgress] = useState()
  const [remainingDays, setRemainingDays] = useState(0)


  const calculateDaysLeft = () => {
    let endDateInSeconds = goal.endDate ? goal.endDate.seconds : 0;
    let timeLeft = endDateInSeconds - today
    let timeLeftInDays = convertSecondsToDaysHoursAndMinutes(timeLeft).days
    setRemainingDays(timeLeftInDays)
  }

  const calculateProgress = () => {
    let workloadGoal = goal.workloadGoal
    let percentageWorked = hoursWorked/workloadGoal
    let degrees = 360*percentageWorked
    setProgress(degrees)
  }

  useEffect(() => {
    calculateDaysLeft() 
    calculateProgress()
  }, [goal])
  
  let remainingDaysText = "dager igjen"
  useEffect(() => {
    if(remainingDays === 1){
      remainingDaysText = "dag igjen"
    }else{
      remainingDaysText = "dager igjen"
    }
  }, [])

  return (
    <View style={styles.wrapper} >
      <Card  style={cardStyles.primaryCard}>
        <View style={styles.cardContent}>
          <View style={styles.textWrapper}>
            <Text style={textStyles.tertiaryHeadingText}>{goal && goal.goalName}</Text>
            <View style={styles.subTextWrapper}>
              <Text style={textStyles.greyTextBold}>{remainingDays}</Text>
              <Text style={textStyles.greyText}> {remainingDaysText}</Text>
            </View>
            <View>
            <Divider />
            <View style={styles.timeLeftText}>
              <Text>Du har jobbet: {convertedTime.hours} t, {convertedTime.minutes} min</Text>
            </View>          
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
                <Text>{Math.floor(hoursWorked)} / {Math.floor(workloadGoal)} t</Text>
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
    marginTop: 8,
    marginBottom: 8,
  },
  timeLeftText: {
    marginTop: 8,
    marginBottom: 8
  }
  
});
