import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { useSelector } from "react-redux";
import { textStyles } from "./styles/sharedStyles";
import { UserItem } from "./UserItem";
import { returnAllUsersExceptFriendsAndRequests } from "../help-functions/friends";

export const AddFriends = () => {
  let {user} = useSelector(state => state.user)
  let usersThatAreNotFriends = returnAllUsersExceptFriendsAndRequests(user.friends, user.uid)

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={textStyles.secondaryHeadingText}>Legg til venn</Text>
        <IconButton icon="close"></IconButton>
      </View>
      <View>
      {usersThatAreNotFriends.map((u, i) => 
        (
          <UserItem currentUser={user} key={i} user={u}/>
        )
      )}
      </View>
    </View>
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
    justifyContent: "space-between"
  },

})
