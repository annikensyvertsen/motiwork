import React, {useEffect, useState} from "react";
import {  View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import { returnMultipleUsersBasedOnIds } from "../help-functions/friends";

export const FriendsLists = () => {

  let {user} = useSelector(state => state.user)
  console.log("user", user)

  let friends = returnMultipleUsersBasedOnIds(user.friends)
  console.log("friends", friends)

  // useEffect(() => {
  //   if(user.friends.length > 0){
  //     setFriends(returnMultipleUsersBasedOnIds(user.friends))
  //   }
  // }, [user])
  return(
    <View>
    {friends.map(
      (friend, i) => 
      (
        <Text key={i}>{friend.name}</Text>
      )
    )}
    </View>
  )
}

const styles = StyleSheet.create({

})

