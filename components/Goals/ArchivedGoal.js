import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import AnimatedCircularProgress from 'react-native-animated-circular-progress';
import { Card, List } from 'react-native-paper';
import { returnFormattedDate } from '../../help-functions/date-and-time';
import { textStyles, greenColor, redColor } from '../styles/sharedStyles';

export const ArchivedGoal = ({goal}) => {
  const [progress, setProgress] = useState(45)
  const [hoursWorked, setHoursWorked] = useState(goal.workload || 0)
  const [workloadGoal, setWorkloadGoal] = useState(goal.workloadGoal || 0)

  const calculateProgress = () => {
    let percentageWorked = hoursWorked/workloadGoal
    let degrees = 360*percentageWorked
    if(degrees>360) degrees = 360 
    setProgress(degrees)
  }
  useEffect(() => {
    setHoursWorked(goal.workload)
    setWorkloadGoal(goal.workloadGoal)
    calculateProgress()

  }, [goal])


  return(
    <Card style={styles.card}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
          <View style={styles.textAndCircle}>
            <View>
              <View style={styles.horizontalHeaderText}>
                <Text style={textStyles.tertiaryHeadingText}>{goal.goalName}</Text>
              </View>
              <View style={styles.horizontalText}>
                <Text style={textStyles.greyText}>Gikk ut {returnFormattedDate(goal.endDate.seconds)}</Text>
                {(goal && goal.isReached && goal.reward) && 
                  (<View style={{marginTop: 5}}>
                    <Text style={textStyles.greyText}>🏆 {goal.reward}</Text>
                  </View>)
                }
                  
              </View>
            </View>

              <View style={styles.progressCircle}>
                <AnimatedCircularProgress
                  color={(goal && goal.isReached )? greenColor: redColor}
                  startDeg={45}
                  endDeg={progress}
                  radius={34}
                  innerRadius={24}
                  innerBackgroundColor={"white"}
                  duration={1000}
                  style={styles.childrenStyle}
                >
                    <View style={styles.circleText}>
                      <Text style={{fontSize: 10}}>{Math.floor(hoursWorked)} / {Math.floor(workloadGoal)} t</Text>
                    </View>
                  </AnimatedCircularProgress>
                </View>
            
                </View>
                </View>
                
                </View>
                </View>
                
                {goal.isReached ? 
                (
                  <View style={styles.winningFooter}>
                  <Text style={styles.footerText}>Du nådde målet! Bra jobbet! </Text>
                  </View>
                ) 
                : 
                (
                    <View style={styles.loosingFooter}>
                      <List.Icon color="#FFB61D" icon="alert"></List.Icon>
                      <Text style={styles.footerText}>Du nådde ikke målet. </Text>
                      <List.Icon color="#FFB61D" icon="alert"></List.Icon>
                  </View>
                )
              }
    </Card>
  )
}
export const styles = StyleSheet.create({
  content: {
    margin: 10,
   },
   card: {
    marginBottom: 10,
   },
   horizontalHeaderText: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  horizontalText: {
    display: "flex",
    flexDirection: "column",
    marginTop: 8,
    marginBottom: 5,
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
  childrenStyle: {
    display: "flex",
    justifyContent: "center",
  },
  circleText: {
    alignSelf: "center",
    flex: 1,
    justifyContent: "center"
  },
  loosingFooter: {
    backgroundColor: "#BF212F",
    minHeight: 30,
    maxHeight: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
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
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  footerText: {
    color: "white",
  },
  textAndCircle: {
    display: "flex",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
 

})