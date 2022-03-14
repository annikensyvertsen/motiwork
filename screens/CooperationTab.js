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
import { EditChallenge } from "../components/Challenge/EditChallenge";

const CooperationTab = () => {
  const navigation = useNavigation();
  const route = useRoute();
  let {user} = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [editChallenge, setEditChallenge] = useState(false)

  let cooperationId = route.params.cooperationId
  let cooperation = returnCooperationBasedOnId(cooperationId)
  const {activeChallenge, archivedChallenges, id, members, name} = cooperation

  const bottomSheetRef = useRef(null);
  const handlePresentPress = () => bottomSheetRef.current.present()

  
  const onPress = () => {
    navigation.navigate("community")
  }
  
  const handleEditPress = () => {
    setEditChallenge(true)
    bottomSheetRef.current.present()
  }

   useEffect(() => {
    if(cooperationId){
    let userDoc = db.collection('cooperationsCollection').doc(cooperationId)
     let unsubscribe = userDoc.onSnapshot(snapshot => {
        setCooperations(user.uid, dispatch)
     })
 
    return () => {
      unsubscribe()
     }
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
        <Text style={styles.name}>{friend && friend.firstname} {friend && friend.surname}</Text>
        <List.Icon icon="account"/>
        <Text style={styles.name}>{user && user.firstname} {user && user.surname}</Text>
      </View>
      {activeChallenge && Object.keys(activeChallenge).length > 0 ?
      (<Challenge cooperationId={cooperationId} handlePresentPress={handlePresentPress} handleEditPress={handleEditPress} currentUser={user} activeChallenge={activeChallenge} members={members} />)
      :
      (<ChallengesEmptyState handlePresentPress={handlePresentPress}/>)
      }
      </View>
      {cooperation.archivedChallenges.length > 0 &&
        (
          <View style={{flex: 1}}>
            <UnsettledChallenges members={members} archivedChallenges={archivedChallenges} />
        </View>
        )
      }
      
      <BottomSheetTemplate contentComponent={editChallenge ? <EditChallenge setEditChallenge={setEditChallenge} members={members} activeChallenge={activeChallenge} cooperationId={cooperationId} bottomSheetRef={bottomSheetRef}  /> : <StartChallenge members={members} activeChallenge={activeChallenge} cooperationId={cooperationId} bottomSheetRef={bottomSheetRef} />} ref={bottomSheetRef} />
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