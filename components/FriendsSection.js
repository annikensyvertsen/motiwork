import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { DefaultTheme, IconButton, Divider } from "react-native-paper";
import {FlatList} from 'react-native-gesture-handler'
import { FriendsLists } from "./FriendsList";
import { textStyles } from "./styles/sharedStyles";
import { RequestItem } from "./RequestItem";
import { useSelector } from "react-redux";

export const FriendsSection = ({bottomSheetRef}) => {
  let {user} = useSelector(state => state.user)

  let incomingFriendRequests = user.incomingFriendRequests;

  const onPress = () => { 
    bottomSheetRef.current.present()
  }

  //console.log("user", user)
  


  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={textStyles.secondaryHeadingText}>Venner</Text>
        <IconButton onPress={onPress} color={DefaultTheme.colors.primary} icon="plus-circle-outline"></IconButton>
      </View>
      <ScrollView>
      {incomingFriendRequests.length > 0 &&
        (
        <View>
          <Text>Venneforespørsler:</Text>
          <View>
            {incomingFriendRequests.map((request, i) => (
              <RequestItem key={i} currentUserId={user.uid} requestId={request} />
            ))}
            <Divider />
          </View>
        </View>
      )}
        {user.friends.length > 0 ? (
          <View style={styles.friendsWrapper}>
            <FriendsLists currentUser={user} />
          </View>
        ):
      (<View>
        <Text>Du har ingen venner enda. Trykk på pluss-knappen for å legge til venner!</Text>
      </View>)}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  friendsWrapper:{
    
  }
})
