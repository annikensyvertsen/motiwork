import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native'
import { Button, Paragraph, Dialog, List } from 'react-native-paper';

const ComponentDialog = ({closeDialogAndStopSession, closeDialogAndContinueSession, currentPoints,isTimer, visibleDialog}) => {

  const [secondsLeft, setSecondsLeft] = useState(5)
  
  useEffect(() => {
    setSecondsLeft(10)
    let interval = setInterval(() => {
        setSecondsLeft(prevCount => prevCount - 1)
    }, 1000)
    let timeout = setTimeout(()=> {
      closeDialogAndStopSession()
    }, 10000)
    
    return () =>{
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <Dialog visible={visibleDialog} dismissable={false}>
      <Dialog.Title>Avslutt økt</Dialog.Title>
      <Dialog.Content>
      {isTimer ?  
        (
          <View>
            <Paragraph>Er du sikker på at du vil avslutte økten? </Paragraph>
            <View style={styles.iconAndText}>
              <List.Icon size={15} icon="alert"/>
              <Paragraph style={styles.alertText}>Obs!! Du mister alle poengene for denne økten med mindre du fullfører.</Paragraph>
            </View>
          </View>
        )
        :   
        <Paragraph>Er du sikker på at du vil avslutte økten? Du får {currentPoints} poeng</Paragraph>    }
        <Paragraph>Økten avsluttes automatisk om {secondsLeft} sekunder</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={() => closeDialogAndContinueSession()}>Avbryt</Button>
        <Button onPress={() => closeDialogAndStopSession()}>Ja</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default ComponentDialog;
export const styles = StyleSheet.create({
  iconAndText: {
    display: "flex",
    flexDirection: "row"
  },
  alertText: {
    width: '80%',
  }
})