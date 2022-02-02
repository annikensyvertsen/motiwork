import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card, Avatar } from "react-native-paper";
import { textStyles } from "./styles/sharedStyles";
import { useNavigation } from '@react-navigation/native';


export const CooperationItem = ({cooperation}) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("cooperation", {cooperationId: cooperation.id})
  }
  return(
    <Card onPress={onPress} style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.cooperationName}>{cooperation.name}</Text>
        <Avatar.Icon size={24} icon="account-multiple" ></Avatar.Icon>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cooperationName: {
    fontSize: 18
  }
})