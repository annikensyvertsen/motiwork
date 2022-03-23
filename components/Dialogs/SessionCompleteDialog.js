import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { Button, Paragraph, Dialog, List } from 'react-native-paper';


const SessionCompleteDialog = ({currentPoints, isSessionComplete, setIsSessionComplete, closeSessionCompleteDialog}) => {

  const onPress = () => {
    setIsSessionComplete(false)
    closeSessionCompleteDialog()
  
  }

  useEffect(() => {
    console.log("current points in session complete", currentPoints)
  }, [])

  return(
    <Dialog visible={isSessionComplete}>
      <Dialog.Content>   
        <View style={styles.dialogContent}>
        <View style={styles.textWrapper}>
        <View style={styles.iconsWrapper}>
          <List.Icon style={{padding: 0, margin: 0}} color="#FFB61D" icon="star-circle-outline"></List.Icon>
          <List.Icon style={{padding: 0, margin: 0}} color="#FFB61D" icon="star-circle-outline"></List.Icon>
          <List.Icon style={{padding: 0, margin: 0}} color="#FFB61D" icon="star-circle-outline"></List.Icon>

          </View>

            <Text style={styles.pointsText}> + {currentPoints} poeng</Text>
          </View>
        </View>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onPress}> Lukk</Button>
      </Dialog.Actions>
    </Dialog>
  )
}

export default SessionCompleteDialog;

export const styles = StyleSheet.create({
  dialogContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center'
  },
  textWrapper: {
    display: 'flex',
    flexDirection: "column",
    alignItems: "center"
  },
  iconsWrapper: {
    display: 'flex',
    flexDirection: "row"
  },
  pointsText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: "#FFB61D"
  },
  alertText: {
    width: '80%',
  }
})