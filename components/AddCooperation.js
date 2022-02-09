import React, {useState, useRef, useCallback, useEffect} from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native"
import { textStyles } from "./styles/sharedStyles";
import { useSelector } from "react-redux";
import { returnMultipleUsersBasedOnIds } from "../help-functions/friends";

import { Avatar, Button, IconButton, TextInput } from "react-native-paper";
import { FriendItem } from "./FriendItem";
import SubmittedMessage from './SubmittedMessage';
import { useDispatch} from 'react-redux';
import { sendCooperationRequest } from "../store/actions/cooperationsActions";
import { db } from "../firebase";
import { returnFriendsNotInCooperation } from "../help-functions/cooperations";


export const AddCooperation = ({bottomSheetRef}) => {
  let {user} = useSelector(state => state.user)
  let {cooperations} = useSelector(state => state.cooperations)

  //const [friendsNotInCooperation, setFriendsNotInCooperation] = useState([])

  const [startCooperationStep, setStartCooperationStep] = useState(1)
  const [nameOfCooperation, setNameOfCooperation] = useState("")
  const [chosenFriend, setChosenFriend] = useState({})

  let friendsNotInCooperation = returnFriendsNotInCooperation(user.friends, cooperations);
  const onPress = async () => {
    let request = {
      members: {
        sender:  user.uid,
        receiver: chosenFriend.uid
      },
      name: nameOfCooperation
    }
    await sendCooperationRequest(request).then(() => setStartCooperationStep(startCooperationStep + 1))
  }
  // useEffect(() => {
  //   setStartCooperationStep(startCooperationStep + 1)
  // }, [])

  const closeBottomSheet = () => {
    bottomSheetRef.current.dismiss()
  }

  // const returnFriends = ( ) => {
  //   setFriendsNotInCooperation(returnFriendsNotInCooperation(user.friends, cooperations))
  // }

  // useEffect(() => {
  //   returnFriends()
  // }, [])

  return (
    <ScrollView style={styles.container}>
      <View >
        <View style={styles.header}>
          <Text style={textStyles.secondaryHeadingText}>Start et samarbeid med en venn</Text>
          <IconButton onPress={closeBottomSheet} icon="close"></IconButton>
        </View>
       { startCooperationStep === 1 && (
          <View>
          {friendsNotInCooperation.length > 0 ?
            (
              friendsNotInCooperation.map((friend, i) =>(
                <View key={i}>
                  <FriendItem setChosenFriend={setChosenFriend} startCooperationStep={startCooperationStep} setStartCooperationStep={setStartCooperationStep} friend={friend} />
                </View>
              ))

          )
          :
          (
            <View style={styles.emptyStateText}>
              <Text>Du har ingen venner å starte et samarbeid med, eller du har startet et samarbeid med alle vennene dine.</Text>
            </View>
          )
        }
        {}
        </View>)}
        {startCooperationStep === 2 &&
      (
        <View style={styles.stepTwoContent}>
          <View style={styles.friendNameWrapper}>
            <Avatar.Icon size={24} icon="account" ></Avatar.Icon>
            <Text style={styles.friendName}>{chosenFriend.firstname}</Text>
          </View>
          <Text style={textStyles.tertiaryHeadingText}>Navn på samarbeid:</Text>
          <TextInput mode="outlined" value={nameOfCooperation} onChangeText={setNameOfCooperation} />
          <Button onPress={onPress}>Send forespørsel</Button>
        </View>
      )}
      {startCooperationStep === 3 &&
      (
        <SubmittedMessage message={"Forespørsel om samarbeid er sendt!"} bottomSheetRef={bottomSheetRef} />

      )}


      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: '90%',
  },
  friendNameWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8
  },
  friendName: {
    textTransform: 'capitalize',
    fontSize: 18,
    marginLeft: 8
  },
  stepTwoContent: {
    display: 'flex',
    flexDirection: "column",
    marginTop: 10
  },
  emptyStateText: {
    marginTop: 10,
  }

})