import React, { useEffect, useState } from "react";
import { View, StyleSheet , Text} from "react-native";
import AnimatedCircularProgress from 'react-native-animated-circular-progress';
import { Card, Button, Divider, IconButton } from "react-native-paper";
import { convertHoursToSeconds, convertSecondsToDaysHoursAndMinutes, convertSecondsToHoursAndMinutes, returnFormattedTime } from "../help-functions/date-and-time";
import { cardStyles, textStyles, yellowColor } from "./styles/sharedStyles";

export const GoalDisplay =  ({goal, handleEditGoalPress}) => {
  let today = new Date().getTime() / 1000
  let hoursWorked = goal.workload || 0
  let workloadGoal = (goal.workloadGoal) || 0

  let secondsWorked = convertHoursToSeconds(hoursWorked)
  let convertedTime = convertSecondsToHoursAndMinutes(secondsWorked)
  const [progress, setProgress] = useState()
  const [remainingTimeLeft, setRemainingTimeLeft] = useState({})

  const calculateDaysLeft = () => {
    let endDateInSeconds = goal.endDate ? goal.endDate.seconds : 0;
    let timeLeft = endDateInSeconds - today

    let daysHoursAndMinutes = convertSecondsToDaysHoursAndMinutes(timeLeft)
    setRemainingTimeLeft(daysHoursAndMinutes)
  }

  const calculateProgress = () => {
    let workloadGoal = goal.workloadGoal
    let percentageWorked = hoursWorked/workloadGoal
    let degrees = 360*percentageWorked
    if(degrees>360) degrees = 360 
    setProgress(degrees)
  }

  const onEditPress = () => {
    console.log("edit")
    handleEditGoalPress()
  }

  useEffect(() => {
    calculateDaysLeft() 
    calculateProgress()
  }, [goal])
  
 

  return (
    <View style={styles.wrapper} >
      <Card style={cardStyles.primaryCard}>
        <View style={styles.cardContent}>
            <View style={styles.textWrapper}>
              <Text style={textStyles.tertiaryHeadingText}>{goal && goal.goalName}</Text>

              <View style={styles.subTextWrapper}>
                <Text style={textStyles.greyTextBold}>{remainingTimeLeft.days}</Text>
                <Text style={textStyles.greyText}> d </Text>
                <Text style={textStyles.greyTextBold}>{remainingTimeLeft.hours}</Text>
                <Text style={textStyles.greyText}> t </Text>
                <Text style={textStyles.greyTextBold}>{remainingTimeLeft.minutes}</Text>
                <Text style={textStyles.greyText}> min til fristen</Text>
              </View>
              <View>
              <Divider />
              <View style={styles.timeLeftText}>
                <Text>Du har jobbet: {convertedTime.hours} t, {convertedTime.minutes} min</Text>
              </View>          
              </View>
            </View>

            <View style={styles.progressCircleContainer}>
              <View style={styles.iconWrapper}>
                <IconButton style={{margin: 0}} icon="pencil-box-outline" color="grey" size={22} onPress={onEditPress} />
              </View>

              <View style={styles.progressCircle} >
                <AnimatedCircularProgress
                  color={yellowColor}
                  startDeg={45}
                  endDeg={progress}
                  radius={44}
                  innerRadius={34}
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
    marginLeft: 5,
    marginRight: 5,
  },
  textAndCircle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconWrapper: {
    display: "flex",
    alignItems: "flex-end",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressCircleContainer: {
    backgroundColor: 'white',
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  progressCircle: {
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
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
