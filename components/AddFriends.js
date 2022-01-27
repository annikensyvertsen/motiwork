import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { useSelector } from "react-redux";
import { textStyles } from "./styles/sharedStyles";
import { UserItem } from "./UserItem";
import { returnAllUsersExceptFriends } from "../help-functions/friends";
import { auth, db } from "../firebase";

export const AddFriends = () => {
  let {user} = useSelector(state => state.user)
  //const [usersThatAreNotFriends, setUsersThatAreNotfriends] = useState([])
  //setUsersThatAreNotfriends(returnAllUsersExceptFriends(user.friends, user.uid))
  let usersThatAreNotFriends = returnAllUsersExceptFriends(user.friends, user.uid)
  useEffect(() => {
    //LISTEN to changes
    const unsubscribe = db.collection('usersCollection').doc(user.uid)
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          console.log("snapshot", snapshot)
        } else {
          console.log("is empty")
        }
      })
  return () => {
      unsubscribe()
    }
  }, [])

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={textStyles.secondaryHeadingText}>Legg til venn</Text>
        <IconButton icon="close"></IconButton>
      </View>
      <View style={styles.searchField}>
      </View>
      <View style={styles.usersList}>
      {usersThatAreNotFriends.map((u, i) => 
        (
          <UserItem currentUser={user} key={i} userId={u.uid} userName={u.name} />
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
  searchField: {

  },
  usersList: {

  }

})
