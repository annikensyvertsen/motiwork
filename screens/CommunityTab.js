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
import { textStyles } from "../components/styles/sharedStyles";



const CommunityTab = () => {
  const [bottomSheetContent, setBottomSheetContent] = useState()
  const bottomSheetModalRef = useRef(null);

  const handleBottomSheetRender =  (action) => {
   setBottomSheetContent(action)
   bottomSheetModalRef.current.present()
  }
   return (
    <View style={{flex: 1}}>
    <View style={styles.mainContentContainer}>
      <View style={communityStyles.cooperationContainer}>
        <CooperationsSection handleBottomSheetRender={handleBottomSheetRender} />
      </View>
      <View>
        <FriendsSection handleBottomSheetRender={handleBottomSheetRender} />
      </View>
      </View>
      <BottomSheetTemplate contentComponent={
        bottomSheetContent === "add-friends" ?
        <AddFriends bottomSheetModalRef={bottomSheetModalRef}/>
        :
        <AddCooperation bottomSheetModalRef={bottomSheetModalRef} />
      } 
      ref={bottomSheetModalRef} />

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