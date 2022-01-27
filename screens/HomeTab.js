import React, { useRef, useState, useEffect} from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import styles from "./sessions/styles";
import AddGoal from '../components/AddGoal';
import BottomSheetTemplate from "../screens/BottomSheetTemplate";
import { GoalDisplay } from "../components/GoalDisplay";
import { auth, db } from "../firebase";
import { useSelector } from "react-redux";
import { setCurrentUser } from "../store/actions/userActions";

import { useDispatch} from 'react-redux';

//TODO: denne må settes som en state som oppdateres når man ser om det er noe data lagret 
let activeChallenges = null;
let challengeColor = activeChallenges ? 'green' : 'red';
let currentUser = auth.currentUser;  


const HomeTab = () => {
  let currentUserId = auth.currentUser.uid

  let {user} = useSelector(state => state.user)
  const [goal, setGoal] = useState()

  const bottomSheetModalRef = useRef(null);
  const handlePresentPress = () => bottomSheetModalRef.current.present()

  const dispatch = useDispatch()

  const initialSetup = async () => {
    await setCurrentUser(currentUser.uid, dispatch)
  }

  useEffect( () => {
    initialSetup()
  }, [])


  //TODO: her, eller et annet sted, må jeg sjekke om målet har gått ut på dato
  useEffect(() => {
    user.currentGoal.goalName && setGoal(user.currentGoal)
   }, [user]) 

   useEffect(() => {
    //LISTEN to changes
    const unsubscribe = db.collection('usersCollection').doc(currentUserId)
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          console.log("snapshot", snapshot)
        } else {
          console.log("is empty")
        }
      })
  return () => {
      unsubscribe()
    }
  }, [])

  return (
    <View style={{flex: 1}}>
    <View style={styles.mainContentContainer}>
      <View style={styles.standardflexColumnContainer}>
        <Text style={styles.headingThree}>Mål</Text>
        {goal ?
        (<View style={styles.textContainer}><GoalDisplay goal={goal}/></View>)
          :
        (<View style={styles.textContainer}>
          <Text>Du har ikke satt deg noen mål enda. Sett deg mål for å minne deg selv på å jobbe jevnt med skole!</Text>
          <Button onPress={handlePresentPress } style={{marginTop: 10, marginBottom: 10}} mode="contained">Sett mål</Button>
          </View>)
        }
      </View>
      <View style={styles.standardflexColumnContainer}>
        <View style={{display: "flex", flexDirection: "row"}}> 
          <Text style={styles.headingThree}>Aktive utfordringer med venner</Text>
          <Text style={{marginLeft: 5, color: challengeColor}}>({activeChallenges || 0})</Text>
        </View>
        {activeChallenges ?
        (<Text>Hei</Text>)
          :
        (<View style={styles.textContainer}>
          <Text>Du har ingen aktive utfordringer med venner enda. Legg til venner for å lage utfordringer for å motivere hverandre til å jobbe!</Text>
        </View> )
      }
      </View>
 
      </View>
        <BottomSheetTemplate contentComponent={<AddGoal bottomSheetModalRef={bottomSheetModalRef} />} ref={bottomSheetModalRef} />
    </View>
   
  )
};
export default HomeTab;
