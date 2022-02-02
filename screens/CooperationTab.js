import React, {useState, useRef, useEffect} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { returnCooperationBasedOnId } from "../help-functions/cooperations";
import { Challenges } from "../components/Cooperation/Challenges";
import { ChallengesEmptyState } from "../components/Cooperation/ChallengesEmptyState";
import BottomSheetTemplate from "../screens/BottomSheetTemplate";
import { StartChallenge } from "../components/Challenge/StartChallenge";


const CooperationTab = () => {
  const navigation = useNavigation();
  const route = useRoute();

  let cooperationId = route.params.cooperationId
  let cooperation = returnCooperationBasedOnId(cooperationId)
  const {activeChallenges, archivedChallenges, id, members, name} = cooperation

  
  const bottomSheetModalRef = useRef(null);
  const handlePresentPress = () => bottomSheetModalRef.current.present()
  


  const onPress = () => {
    navigation.goBack()
  }
  return(
    <View style={styles.container}>
      <View>
      <View style={styles.header}>
        <Button style={styles.backButton} onPress={onPress}>Back</Button>
        <Text style={styles.heading}>{name}</Text>
      </View>
      {activeChallenges && activeChallenges.length > 0 ?
      (<Challenges activeChallenges={activeChallenges} />)
      :
      (<ChallengesEmptyState handlePresentPress={handlePresentPress}/>)
      }
      </View>
      <BottomSheetTemplate contentComponent={<StartChallenge bottomSheetModalRef={bottomSheetModalRef} />} ref={bottomSheetModalRef} />
    </View>
  )
}

export default CooperationTab;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  header: {

  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  backButton: {
    alignSelf: "flex-start"
  }
})