import React, {useEffect, useState} from "react";
import {  View, StyleSheet, Text } from "react-native";
import { Avatar, Divider } from "react-native-paper";
import { useSelector } from "react-redux";
import { returnMultipleUsersBasedOnIds } from "../help-functions/friends";

export const FriendsLists = () => {

  let {user} = useSelector(state => state.user)
  let friends = returnMultipleUsersBasedOnIds(user.friends)

  const findInitials = (friend) => {
    return (friend.firstname[0] + friend.surname[0]).toUpperCase()
  }

  return(
    <View>
    {friends.map(
      (friend, i) => 
      (
        <View key={i} style={styles.friendWrapper}>
          <View style={styles.textWrapper}>
            <View style={styles.nameAndAvatar}>
              <Avatar.Text size={24} label={findInitials(friend)}/>
              <Text style={styles.nameText} >{friend.firstname} {friend.surname}</Text>
            </View>
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
  nameAndAvatar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  nameText: {
    textTransform: "capitalize",
    marginLeft: 10
  },
  pointText: {
    color: "grey"
  }
})

