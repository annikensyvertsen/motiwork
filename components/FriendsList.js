import React, {useEffect, useState} from "react";
import {  View, StyleSheet, Text } from "react-native";
import { Divider } from "react-native-paper";
import { useSelector } from "react-redux";
import { returnMultipleUsersBasedOnIds } from "../help-functions/friends";

export const FriendsLists = () => {

  let {user} = useSelector(state => state.user)
  let friends = returnMultipleUsersBasedOnIds(user.friends)

  return(
    <View>
    {friends.map(
      (friend, i) => 
      (
        <View key={i} style={styles.friendWrapper}>
          <View style={styles.textWrapper}>
            <Text style={styles.nameText} >{friend.name}</Text>
            <Text style={styles.pointText} >{friend.points}p</Text>
          </View>
          <Divider />
        </View>
      )
    )}
    </View>
  )
}

const styles = StyleSheet.create({
  textWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  friendWrapper: {
    margin: 10
  },
  nameText: {
    textTransform: "capitalize"
  },
  pointText: {
    color: "grey"
  }
})

