import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { DefaultTheme, IconButton, Divider } from "react-native-paper";
import { FriendsLists } from "./FriendsList";
import { textStyles } from "./styles/sharedStyles";
import { RequestItem } from "./RequestItem";
import { useSelector } from "react-redux";

export const FriendsSection = ({bottomSheetRef}) => {
  let {user} = useSelector(state => state.user)

  let incomingFriendRequests = user.incomingFriendRequests;

  const onPress = () => { 
    //bottomSheetModalRef.current.present()
    bottomSheetRef.current.present()
  }


  return(
    <View>
      <View style={styles.header}>
        <Text style={textStyles.secondaryHeadingText}>Venner</Text>
        <IconButton onPress={onPress} color={DefaultTheme.colors.primary} icon="plus-circle-outline"></IconButton>
      </View>
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
        {user.friends.length > 0 && (
          <View>
            <FriendsLists currentUser={user} />
          </View>
        )}
     
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
})
