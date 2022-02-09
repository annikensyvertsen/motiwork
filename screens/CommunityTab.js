import React, {useState, useRef, useEffect} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Headline } from "react-native-paper";
import styles from "./sessions/styles";
import BottomSheetTemplate from "../screens/BottomSheetTemplate";
import { AddFriends } from "../components/AddFriends";
import { AddCooperation } from "../components/AddCooperation";
import { FriendsSection } from "../components/FriendsSection";
import {  db, fire, auth } from "../firebase";
import { useSelector } from "react-redux";
import { CooperationsSection } from "../components/CooperationsSection";



const CommunityTab = () => {
  const addFriendsBottomSheetRef = useRef(null);
  const addCooperationBottomSheetRef = useRef(null);

   return (
    <View style={{flex: 1}}>
    <View style={styles.mainContentContainer}>
      <View style={communityStyles.cooperationContainer}>
        <CooperationsSection bottomSheetRef={addCooperationBottomSheetRef}/>
      </View>
      <View>
        <FriendsSection bottomSheetRef={addFriendsBottomSheetRef} />
      </View>
      </View>
      <BottomSheetTemplate contentComponent={<AddFriends bottomSheetRef={addFriendsBottomSheetRef}/>} ref={addFriendsBottomSheetRef} />
      <BottomSheetTemplate contentComponent={<AddCooperation bottomSheetRef={addCooperationBottomSheetRef}/>} ref={addCooperationBottomSheetRef} />
      
    </View>
  )
};
export default CommunityTab;

const communityStyles = StyleSheet.create({
  cooperationContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: 200,
  },
})