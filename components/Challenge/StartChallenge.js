
import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { ChallengeForm } from "../Cooperation/ChallengeForm";
import SubmittedMessage from "../SubmittedMessage";

export const StartChallenge = ({bottomSheetModalRef}) => {

  const onPress = () => {
    console.log("click")
    bottomSheetModalRef.current.dismiss()
  }

  const onSubmitChallenge = () => {
    setSteps(steps + 1)
  }

  const [submitted, setSubmitted] = useState(false)
  const [steps, setSteps] = useState(1)
  return(
    <View style={{flex: 1}}>
      <Text style={styles.header}>Start en utfordring</Text>
      {steps === 1 ? 
      (<ChallengeForm submitted={submitted} onSubmitChallenge={onSubmitChallenge} setSubmitted={setSubmitted} />)
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
