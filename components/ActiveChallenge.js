import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Avatar, Button, Card, List, ProgressBar } from "react-native-paper";

export const ActiveChallenge = ({activeChallenge}) => {
  console.log("active challenges in active challenges component", activeChallenge)
  let isLeading = true;
  return(
    <View style={styles.wrapper}>
    <Card style={isLeading? styles.winningCardStyle : styles.losingCardStyle}>
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={textStyles.tertiaryHeadingText}>{goalName}</Text>
          <Text>{remainingDays} {remainingDaysText}</Text>
        </View>
        <View style={styles.progress}>
        <View style={styles.progressAndText}>
          <Text style={styles.progressName}>{friend.name}</Text>
          <ProgressBar style={styles.progressBar} progress={friendProgress} color={returnColor(friend.uid)}/>
        </View>
        <View style={styles.progressAndText}>
          <Text style={styles.progressName}>{currentUser.name} (deg)</Text>
          <ProgressBar style={styles.progressBar} progress={currentUserProgress} color={returnColor(currentUser.uid)}/>
        </View>
        </View>
        <View style={styles.reward}>
          <List.Icon color="" icon="medal"></List.Icon>
          <Text style={textStyles.subtitleText}>{reward}</Text>
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
              <Text style={styles.footerText}>{friend.name} leder </Text>
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
  loosingFooter: {
    backgroundColor: "#BF212F",
    minHeight: 50,
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
    minHeight: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    //  litt hacky å sette denne manuelt men blir sånn enn så lenge
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
})