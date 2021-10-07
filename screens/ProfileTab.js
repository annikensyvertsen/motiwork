import React from "react";
import { View, Text, Image, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { auth } from "../firebase";

const ProfileTab = () => {
  return (
    <View>
      <Text>Profile</Text>
      <Button mode="outlined" compact onPress={() => auth.signOut()}>
        Logg ut
      </Button>
    </View>
  );
};
export default ProfileTab;
