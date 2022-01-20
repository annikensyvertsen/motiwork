import React, { useState } from "react";
import { View, StyleSheet , Text} from "react-native";
import AnimatedCircularProgress from 'react-native-animated-circular-progress';
import { Card, DefaultTheme } from "react-native-paper";
import { cardStyles, textStyles, yellowColor } from "./styles/sharedStyles";

export const GoalDisplay = () => {

  return (
    <View style={styles.wrapper} >
      <Card elevation={4} style={cardStyles.primaryCard}>
        <View style={styles.cardContent}>
          <View>
            <Text style={textStyles.tertiaryHeadingText}>Arbeide mål navn</Text>
            <Text>Arbeide subtitle</Text>
          </View>
          <View style={styles.progressCircle} >
            <AnimatedCircularProgress
              color={yellowColor}
              startDeg={45}
              endDeg={180}
              radius={40}
              innerRadius={28}
              innerBackgroundColor={"white"}
              duration={1000}
            >
                <Text>40%</Text>
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
    justifyContent: "space-between"
  },
  progressCircleContainer: {
    backgroundColor: 'white'
  },
  progressCircle: {
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  }
  
});
