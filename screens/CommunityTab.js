import React, {useState, useRef, useCallback, useMemo} from "react";
import { Text, View, Modal, StyleSheet } from "react-native";
import { Button, Headline } from "react-native-paper";
import styles from "./sessions/styles";

const CommunityTab = () => {

  const [cooperations, setCooperations] = useState([])
  const [friends, setFriends] = useState([])

   return (
    <View style={{flex: 1}}>
    <View style={styles.mainContentContainer}>
      <View style={communityStyles.cooperationContainer}>
        <Headline>Samarbeid</Headline>
        {cooperations.length > 0 ? (
          <Text>Samarbeid</Text>
        ): (
          <View>
            <Text>Du har ingen aktive samarbeid. Start et samarbeid med en venn for å motivere hverandre til å jobbe mer.</Text>
            <View style={{marginTop: 10}}>
            {friends.length > 0 ? ( 
                <Button style={{marginTop: 10, marginBottom: 10}} mode="contained" onPress={() => console.log('Pressed')}>Start et samarbeid</Button>
            ) : (
              <Text>Du har ingen venner å starte et samarbeid med. Legg til en venn først.</Text>
            )}
             </View>
          </View>
        )}
      </View>
      <View style={styles.standardflexColumnContainer}>
        <View> 
          <Headline>Venner</Headline>
          {friends.length > 0 ? (
          <Text>Samarbeid</Text>
        ): (
          <View>
            <Text>Du har ingen venner.</Text>
            <Button style={{marginTop: 10, marginBottom: 10}} mode="contained" onPress={() => console.log('Pressed')}>Legg til venner</Button>
          </View>
        )}
        </View>
      </View>
      </View>
    </View>
  )
};
export default CommunityTab;

const communityStyles = StyleSheet.create({
  cooperationContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: 200,
  },
})