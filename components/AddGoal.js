import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import GoalForm from './GoalForm';

const AddGoal = () => {

  return(
    <ScrollView style={styles.wrapper}>
      <Text style={styles.header}>Legg til et nytt mål</Text>
      <GoalForm />
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
