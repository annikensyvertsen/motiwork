import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';


import SubmittedMessage from '../SubmittedMessage';
import EditGoalForm from './EditGoalForm';

const EditGoal = ({bottomSheetRef, goal, setIsOpenEditGoalForm}) => {
  const [submitted, setSubmitted] = useState(false)

  console.log("Object.keys(goal).length ", Object.keys(goal).length )
  return(
    <ScrollView style={styles.wrapper}>
      <Text style={styles.header}>Rediger mål</Text>
      {submitted ? 
        <SubmittedMessage setIsOpenEditGoalForm={setIsOpenEditGoalForm} message={"Mål endret!"} bottomSheetRef={bottomSheetRef} />        
        : Object.keys(goal).length ?
      
        <EditGoalForm goal={goal} submitted={submitted} setSubmitted={setSubmitted} />
        :<View></View>
      }
    </ScrollView>
  )

}

export default EditGoal;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "uppercase",
    marginTop: 10,

  
  },
});
