import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { DefaultTheme, IconButton, Button } from "react-native-paper";
import { textStyles } from "./styles/sharedStyles";
import { useDispatch, useSelector } from "react-redux";
import { CooperationRequests } from "./CooperationRequests";
import { CooperationItem } from "./CooperationItem";
import {  db } from "../firebase";
import { setCurrentUser } from "../store/actions/userActions";
import { ScrollView } from "react-native-gesture-handler";
import { setCooperations } from "../store/actions/cooperationsActions";

export const CooperationsSection = ({ bottomSheetRef}) => {
  let {user} = useSelector(state => state.user)
  let {cooperations} = useSelector(state => state.cooperations)


  const dispatch = useDispatch()
  const onPress = () => {
    bottomSheetRef.current.present()
  }

  useEffect(() => {
    let userDoc = db.collection('usersCollection').doc(user.uid)
    let unsubscribe = userDoc.onSnapshot(snapshot => {
        setCurrentUser(user.uid, dispatch)
        setCooperations(user.uid, dispatch)
    })
 
    return () => {
      unsubscribe()
    }
  }, [])

  return(
    <ScrollView>
      <View style={styles.header}>
        <Text style={textStyles.secondaryHeadingText}>Samarbeid</Text>
        <IconButton onPress={onPress} color={DefaultTheme.colors.primary} icon="plus-circle-outline"></IconButton>
      </View>
      {user.incomingCooperationRequests && user.incomingCooperationRequests.length > 0 && (
        <CooperationRequests />
      )}
      <View>
      {cooperations.length > 0 ? (cooperations.map((cooperation, i) => (
        <CooperationItem cooperation={cooperation} key={i}/>
        )
      )):
        (
          <View>
            <Text>Du har ingen aktive samarbeid. Start et samarbeid med en venn for å motivere hverandre til å jobbe mer.</Text>
            <View style={{marginTop: 10}}>
            {user.friends.length > 0 ? ( 
                <Button style={{marginTop: 10, marginBottom: 10}} mode="contained"  onPress={onPress}>Start et samarbeid</Button>
            ) : (
              <Text>Du har ingen venner å starte et samarbeid med. Legg til en venn først.</Text>
            )}
             </View>
          </View>
        )
    }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
})