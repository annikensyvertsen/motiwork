import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import AnimatedCircularProgress from 'react-native-animated-circular-progress';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, List } from 'react-native-paper';
import { returnFormattedDate } from '../help-functions/date-and-time';
import { ArchivedGoal } from './Goals/ArchivedGoal';
import { greenColor, textStyles } from './styles/sharedStyles';

export const ArchivedGoals = ({archivedGoals}) => {

  return(
    <View>
    <Text style={textStyles.greyText}>Arkiverte mål</Text>
    {archivedGoals.length > 0 ? (
      <ScrollView style={styles.archivedGoals}> 
      {archivedGoals.map((goal, i) => (
        <ArchivedGoal key={i} goal={goal} />
        ))}
        </ScrollView>
    ) 
  : (<View><Text>Du har ingen arkiverte mål enda.</Text></View>)
  }
    
    </View>

  )

}

export const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    width: '100%',
    flex: 1,
    marginTop: 5,
    marginBottom: 5
   },
   
   archivedGoals: {
    marginTop: 10,
   },
  winningCardStyle: {
    borderRadius: 10,
    width: '100%',
    alignSelf: "center",
    borderWidth: 2,
    borderColor:  "#006F3C",
    marginTop: 20,
  },
  losingCardStyle: {
    borderRadius: 10,
    width: '100%',
    alignSelf: "center",
    borderWidth: 2,
    borderColor:  "#BF212F",
    marginTop: 20,
  },
  
  cooperationNameText: {
    fontStyle: "italic",
    color: "grey",
  },


})