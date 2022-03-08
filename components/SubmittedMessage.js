import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { DefaultTheme, Button } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { textStyles } from './styles/sharedStyles';


const SubmittedMessage = ({bottomSheetRef, message, setIsOpenEditGoalForm}) => {

  const onPress = () => {
    bottomSheetRef.current.dismiss()
    setIsOpenEditGoalForm(false)
  }
  return(
    <View style={styles.wrapper}>
      <View style={{padding: 10}}>
        <Avatar.Icon size={54} icon="check-decagram" ></Avatar.Icon>
      </View>
      <Text style={textStyles.secondaryHeadingText}>{message}</Text>
      <Button style={{marginTop: 30}} onPress={onPress} mode="contained">Ferdig</Button>
    </View>
  )
}

export default SubmittedMessage;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: "flex",
    alignItems: 'center',
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
  },
  
});
