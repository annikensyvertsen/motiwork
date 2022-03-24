import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Card, List } from 'react-native-paper';
import { returnFormattedDate } from '../help-functions/date-and-time';
import { textStyles } from './styles/sharedStyles';
import { ArchivedGoal } from './Goals/ArchivedGoal'

export const ArchivedGoals = ({archivedGoals}) => {

  const scrollViewRef = useRef()
  return(
    <View>
    <Text style={textStyles.greyText}>Arkiverte mål</Text>
    {archivedGoals.length > 0 ? (
      <ScrollView 
      ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})}
      style={styles.archivedGoals}
      > 
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
   container: {
   },
   content: {
    margin: 10,
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
  horizontalHeaderText: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
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
  loosingFooter: {
    backgroundColor: "#BF212F",
    minHeight: 30,
    maxHeight: 30,
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
    //  litt hacky å sette denne   manuelt men blir sånn enn så lenge
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  footerText: {
    color: "white",
  }

})