import React, {useState, useRef, useEffect} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, List } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { returnCooperationBasedOnId } from "../help-functions/cooperations";
import { Challenge } from "../components/Cooperation/Challenge";
import { ChallengesEmptyState } from "../components/Cooperation/ChallengesEmptyState";
import BottomSheetTemplate from "../screens/BottomSheetTemplate";
import { StartChallenge } from "../components/Challenge/StartChallenge";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setCooperations } from "../store/actions/cooperationsActions";
import { returnUserBasedOnId } from "../help-functions/friends";
import { UnsettledChallenges } from "../components/Challenge/UnsettledChallenges";

const CooperationTab = () => {
  const navigation = useNavigation();
  const route = useRoute();
  let {user} = useSelector(state => state.user)
  const dispatch = useDispatch()


  let cooperationId = route.params.cooperationId
  let cooperation = returnCooperationBasedOnId(cooperationId)
  const {activeChallenge, archivedChallenges, id, members, name} = cooperation

  const bottomSheetModalRef = useRef(null);
  const handlePresentPress = () => bottomSheetModalRef.current.present()

  
  const onPress = () => {
    //navigation.goBack()
    navigation.navigate("community")
  }

  console.log("renders")
  
   useEffect(() => {
    let userDoc = db.collection('cooperationsCollection').doc(cooperationId)
     let unsubscribe = userDoc.onSnapshot(snapshot => {
        setCooperations(user.uid, dispatch)
     })
 
    return () => {
      unsubscribe()
     }
   }, [])

  let friendUserId = members.receiver === user.uid ? members.sender : members.receiver 
  let friend = returnUserBasedOnId(friendUserId)

  return(
    <View style={styles.container}>
      <View>
      <View style={styles.header}>
        <Button style={styles.backButton} onPress={onPress}>Back</Button>
        <Text style={styles.heading}>{name}</Text>
      </View>
      <View style={styles.members}>
        <List.Icon icon="account"/>
        <Text style={styles.name}>{friend.firstname} {friend.surname}</Text>
        <List.Icon icon="account"/>
        <Text style={styles.name}>{user.firstname} {user.surname}</Text>
      </View>
      {activeChallenge && Object.keys(activeChallenge).length > 0 ?
      (<Challenge currentUser={user} activeChallenge={activeChallenge} members={members} />)
      :
      (<ChallengesEmptyState handlePresentPress={handlePresentPress}/>)
      }
      </View>
      {cooperation.archivedChallenges.length > 0 &&
        (
          <View>
            <UnsettledChallenges archivedChallenges={cooperation.archivedChallenges} />
        </View>
        )
      }
      
      <BottomSheetTemplate contentComponent={<StartChallenge members={members} activeChallenge={activeChallenge} cooperationId={cooperationId} bottomSheetModalRef={bottomSheetModalRef} />} ref={bottomSheetModalRef} />
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
  },
  members: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center"
  },
  name: {
    textTransform: "capitalize"
  }
})