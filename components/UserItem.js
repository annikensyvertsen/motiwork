import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet  } from "react-native";
import { Button, Divider } from "react-native-paper";
import { useDispatch } from "react-redux";
import {sendFriendRequest} from '../store/actions/socialActions';
import { buttonStyles } from "./styles/sharedStyles";

export const UserItem = ({currentUser, user}) => {

  let currentUserId = currentUser.uid
  const [isRequestSent, setIsRequestSent] = useState(false)
  const onPress = () => {
    sendFriendRequest(currentUserId, user.id)
  }

  useEffect(() => {
    if(currentUser.outgoingFriendRequests.length > 0){
      if(currentUser.outgoingFriendRequests.includes(user.id)){
        setIsRequestSent(true)
      }else{
        setIsRequestSent(false)
      }
    }else{
      setIsRequestSent(false)
    }
  }, [onPress])

  return(
    <View>
      <View style={styles.wrapper}>
        <Text style={styles.textStyle}>{user.name}</Text>
        {
          isRequestSent ? 
          (<Text style={{color: "grey"}}>Forespørsel sendt</Text>)
          :
          (<Button style={buttonStyles.primaryButtonSmall} onPress={onPress} >Legg til</Button>)
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
