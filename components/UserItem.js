import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet  } from "react-native";
import { Button, Divider } from "react-native-paper";
import { useDispatch } from "react-redux";
import {sendFriendRequest} from '../store/actions/socialActions';
import { buttonStyles } from "./styles/sharedStyles";

export const UserItem = ({currentUser, user}) => {
  const [isRequestSent, setIsRequestSent] = useState(false)
  const [friendHasSentRequest, setFriendHasSentRequest] = useState(false)

  const onPress = () => {
    sendFriendRequest(currentUser.uid, user.uid)
  }

  useEffect(() => {
    if(currentUser.outgoingFriendRequests.length > 0){
      if(currentUser.outgoingFriendRequests.includes(user.uid)) setIsRequestSent(true)
      else setIsRequestSent(false)
    }else{
      setIsRequestSent(false)
    }
    if(currentUser.incomingFriendRequests.length > 0){
      if(currentUser.incomingFriendRequests.includes(user.uid)) setFriendHasSentRequest(true)
      else setFriendHasSentRequest(false)
    }else{
      setFriendHasSentRequest(false)
    }
    
  }, [onPress])

  return(
    <View>
      <View style={styles.wrapper}>
        <Text style={styles.textStyle}>{user.firstname} {user.surname}</Text>
        {
          isRequestSent ? 
          (<Text style={{color: "grey"}}>Forespørsel sendt</Text>)
          :
          friendHasSentRequest ?
          (<Text style={{color: "grey"}}>Forespørsel mottatt</Text>)
          : 
          (<Button style={buttonStyles.primaryButtonSmall} onPress={onPress}>Legg til</Button>)
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
