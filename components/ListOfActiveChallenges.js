import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { ActiveChallenge } from "./ActiveChallenge";


export const ListOfActiveChallenges = ({allActiveChallenges, currentUser}) => {
  //console.log("allactivechallenges", allActiveChallenges)
  return(
    <ScrollView>
    {allActiveChallenges.length > 0 ?
      allActiveChallenges.map((activeChallenge, i) => (
        <ActiveChallenge key={i} currentUser={currentUser} activeChallenge={activeChallenge} />
      ))
    :
    (<View style={styles.textContainer}>
      <Text>Du har ingen aktive utfordringer med venner enda. Legg til venner for å lage utfordringer for å motivere hverandre til å jobbe!</Text>
    </View> )
  }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
})
