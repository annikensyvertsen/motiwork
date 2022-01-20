import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import GoalForm from './GoalForm';

import SubmittedMessage from './SubmittedMessage';

const AddGoal = ({bottomSheetModalRef}) => {
  const [submitted, setSubmitted] = useState(false)

  return(
    <ScrollView style={styles.wrapper}>
      <Text style={styles.header}>Legg til et nytt mål</Text>
      {submitted ? 
        <SubmittedMessage bottomSheetModalRef={bottomSheetModalRef} />        
        : 
        <GoalForm submitted={submitted} setSubmitted={setSubmitted} />
      }
    </ScrollView>
  )

}

export default AddGoal;

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
