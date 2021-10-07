import React from "react";
import { View, Text, Image, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { auth } from "../firebase";

const ProfileTab = () => {
  let currentUser = auth.currentUser;
  console.log("xu", currentUser);
  return (
    <View>
      <Text>Profile</Text>
      <Text>Email: {currentUser.email}</Text>
      <Text>Username: {currentUser.displayName}</Text>

      <Button onPress={() => auth.signOut()}>Logg ut</Button>
    </View>
  );
};
export default ProfileTab;
