
import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { ChallengeForm } from "../Cooperation/ChallengeForm";
import SubmittedMessage from "../SubmittedMessage";

export const StartChallenge = ({bottomSheetModalRef, activeChallenge, cooperationId, members}) => {
  const [submitted, setSubmitted] = useState(false)
  const [steps, setSteps] = useState(1)

  let cooperationHasActiveChallenge = activeChallenge && Object.keys(activeChallenge).length > 0 

  useEffect(() => {
    console.log("steps", steps)
  }, [steps])
  return(
    <View style={styles.wrapper}>

        <View>
        <Text style={styles.header}>Start en utfordring</Text>

        {steps === 1 ? 
          (<ChallengeForm setSteps={setSteps} steps={steps} cooperationId={cooperationId} members={members} submitted={submitted} setSubmitted={setSubmitted} />)
          :
          (<SubmittedMessage message={"Utfordring lagt til!"} bottomSheetModalRef={bottomSheetModalRef} />)
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
