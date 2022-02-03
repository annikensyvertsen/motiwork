
import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { ChallengeForm } from "../Cooperation/ChallengeForm";
import SubmittedMessage from "../SubmittedMessage";

export const StartChallenge = ({bottomSheetModalRef, cooperationId, members}) => {
  const [submitted, setSubmitted] = useState(false)
  const [steps, setSteps] = useState(1)

  useEffect(() => {
    if(submitted){
      setSteps(steps + 1)
    }
  }, [submitted])

 
  return(
    <View style={{flex: 1}}>
      <Text style={styles.header}>Start en utfordring</Text>
      {steps === 1 ? 
      (<ChallengeForm cooperationId={cooperationId} members={members} submitted={submitted} setSubmitted={setSubmitted} />)
      :
      (<SubmittedMessage message={"Utfordring lagt til!"} bottomSheetModalRef={bottomSheetModalRef} />)
    }
    </View>
  )
}

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
