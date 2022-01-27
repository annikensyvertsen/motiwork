import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { DefaultTheme, IconButton, Divider } from "react-native-paper";
import { textStyles } from "./styles/sharedStyles";
import { useSelector } from "react-redux";

export const CooperationsSection = () => {

  let {user} = useSelector(state => state.user)

  const onPress = () => {
    console.log("click")
    
  }
  return(
    <View>
      <View style={styles.header}>
        <Text style={textStyles.secondaryHeadingText}>Samarbeid</Text>
        <IconButton onPress={onPress} color={DefaultTheme.colors.primary} icon="plus-circle-outline"></IconButton>

      </View>
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