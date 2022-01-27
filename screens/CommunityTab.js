import React, {useState, useRef, useCallback, useMemo, useEffect} from "react";
import { Text, View, Modal, StyleSheet } from "react-native";
import { Button, Headline } from "react-native-paper";
import styles from "./sessions/styles";
import BottomSheetTemplate from "../screens/BottomSheetTemplate";
import { AddFriends } from "../components/AddFriends";
import { FriendsSection } from "../components/FriendsSection";
import {  db, fire, auth } from "../firebase";
import { useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";



const CommunityTab = () => {

  let {user} = useSelector(state => state.user)
  let currentUserId = auth.currentUser.uid

  console.log("currentuserid", currentUserId)
  const [cooperations, setCooperations] = useState([])
  const [friends, setFriends] = useState([])

  const bottomSheetModalRef = useRef(null);
  const handlePresentPress = () => bottomSheetModalRef.current.present()

  useEffect(() => {
    //LISTEN to changes
    const unsubscribe = db.collection('usersCollection').doc(currentUserId)
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          //console.log("snapshot", snapshot)
          //console.log("user", user)
          setFriends(user.friends)
        } else {
          console.log("is empty")
        }
      })
  return () => {
      unsubscribe()
    }
  }, [])

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
      <View>
        <FriendsSection bottomSheetModalRef={bottomSheetModalRef} />
      </View>
      </View>
      <BottomSheetTemplate contentComponent={<AddFriends bottomSheetModalRef={bottomSheetModalRef}/>} ref={bottomSheetModalRef} />

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