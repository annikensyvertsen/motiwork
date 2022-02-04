import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { ActiveChallenge } from "./ActiveChallenge";


export const ListOfActiveChallenges = ({allActiveChallenges, currentUser}) => {
  return(
    <View>
    {allActiveChallenges.length > 0 ?
      allActiveChallenges.map((activeChallenge, i) => (
        <ActiveChallenge key={i} currentUser={currentUser} activeChallenge={activeChallenge} />
      ))
    :
    (<View style={styles.textContainer}>
      <Text>Du har ingen aktive utfordringer med venner enda. Legg til venner for å lage utfordringer for å motivere hverandre til å jobbe!</Text>
    </View> )
  }
    </View>
  )
}

const styles = StyleSheet.create({
})
