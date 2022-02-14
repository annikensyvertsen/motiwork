
import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { ChallengeForm } from "../Cooperation/ChallengeForm";
import SubmittedMessage from "../SubmittedMessage";

export const StartChallenge = ({bottomSheetRef, activeChallenge, cooperationId, members}) => {
  const [submitted, setSubmitted] = useState(false)
  const [steps, setSteps] = useState(1)

  return(
    <View style={styles.wrapper}>

        <View>
        <Text style={styles.header}>Start en utfordring</Text>

        {steps === 1 ? 
          (<ChallengeForm setSteps={setSteps} steps={steps} cooperationId={cooperationId} members={members} submitted={submitted} setSubmitted={setSubmitted} />)
          :
          (<SubmittedMessage message={"Utfordring lagt til!"} bottomSheetRef={bottomSheetRef} />)
        }
      </View>
      
     
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
