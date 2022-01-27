import React, {useEffect, useState} from "react";
import {  View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { returnMultipleUsersBasedOnIds } from "../help-functions/friends";

export const FriendsLists = () => {

  let {user} = useSelector(state => state.user)
  const [friends, setFriends] = useState([])

  useEffect(() => {
    if(user.friends.length > 0){
      setFriends(returnMultipleUsersBasedOnIds(user.friends))
    }
  }, [user])
  return(
    <View>
    {friends.map(
      friend => 
      (
        <Text>{friend.name}</Text>
      )
    )}
    </View>
  )
}

const styles = StyleSheet.create({

})

