
import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { EditChallengeForm } from "../Cooperation/EditChallengeForm";
import SubmittedMessage from "../SubmittedMessage";

export const EditChallenge = ({bottomSheetRef, setEditChallenge, activeChallenge, cooperationId, members}) => {
  const [submitted, setSubmitted] = useState(false)
  const [steps, setSteps] = useState(1)

  return(
    <View style={styles.wrapper}>

        <View>
        <Text style={styles.header}>Rediger utfordring</Text>

        {steps === 1 ? 
          (<EditChallengeForm activeChallenge={activeChallenge} setSteps={setSteps} steps={steps} cooperationId={cooperationId} members={members} submitted={submitted} setSubmitted={setSubmitted} />)
          :
          (<SubmittedMessage setIsOpenEditGoalForm={setEditChallenge} message={"Utfordring lagt til!"} bottomSheetRef={bottomSheetRef} />)
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
