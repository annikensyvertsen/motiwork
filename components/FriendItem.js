import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet  } from "react-native";
import { Button, Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {sendFriendRequest} from '../store/actions/socialActions';
import { buttonStyles } from "./styles/sharedStyles";

export const FriendItem = ({setChosenFriend, startCooperationStep, setStartCooperationStep, friend}) => {

  let {user} = useSelector(state => state.user)
  const [isRequestSent, setIsRequestSent] = useState(false)
  const [friendHasSentRequest, setFriendHasSentRequest] = useState(false)

  const onPress = () => {
    setStartCooperationStep(startCooperationStep + 1)
    setChosenFriend(friend)
  }

  useEffect(() => {
    if(user.outgoingCooperationRequests.length > 0){
      user.outgoingCooperationRequests.forEach(request => {
        let {members} = request
        if(members.receiver === friend.uid) setIsRequestSent(true)
        else setIsRequestSent(false)
      })
    }else{
      setIsRequestSent(false)
    }
    if(user.incomingCooperationRequests.length > 0){
      user.incomingCooperationRequests.forEach(request => {
        let {members} = request
        if(members.sender === friend.uid) setFriendHasSentRequest(true)
        else setFriendHasSentRequest(false)
      })
    }else{
      setFriendHasSentRequest(false)
    }
    
  }, [onPress])


  return(
    <View>
      <View style={styles.wrapper}>
        <Text style={styles.textStyle}>{friend.name}</Text>
        {
          isRequestSent ? 
          (<Text style={{color: "grey"}}>Forespørsel sendt</Text>)
          :
          friendHasSentRequest ?
          (<Text style={{color: "grey"}}>Forespørsel mottatt</Text>)
          : 
          (<Button style={buttonStyles.primaryButtonSmall} onPress={onPress}>Velg</Button>)
        }
      </View> 
      <Divider />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 10,
    alignItems: "center",

  },
  textStyle: {
    fontSize: 18,
    textTransform: "capitalize"
  }
})
