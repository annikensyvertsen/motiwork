import React, { useRef, useState, useEffect} from "react";
import { ScrollView, Text, View } from "react-native";
import { Button } from "react-native-paper";
import styles from "./sessions/styles";
import AddGoal from '../components/AddGoal';
import BottomSheetTemplate from "../screens/BottomSheetTemplate";
import { GoalDisplay } from "../components/GoalDisplay";
import { useSelector } from "react-redux";

import { useDispatch} from 'react-redux';
import { ListOfActiveChallenges } from '../components/ListOfActiveChallenges'
import { setCurrentUser } from "../store/actions/userActions";
import { setCooperations } from "../store/actions/cooperationsActions";
import { auth } from "../firebase";
import { setActiveChallenges } from "../store/actions/challengesActions";


const HomeTab = () => {

    //TODO: denne må settes som en state som oppdateres når man ser om det er noe data lagret 
  //activechallenges er i dette tilfelle riktig at er i flertall, siden den skal vise alle de aktive utfordringene du har med venner
  let currentUser = auth.currentUser

  const dispatch = useDispatch()
  let {user} = useSelector(state => state.user)

  let {allActiveChallenges} = useSelector(state => state.cooperations)

  const bottomSheetRef = useRef(null);
  const handlePresentPress = () => bottomSheetRef.current.present()

  const initialSetup = async () => {
    await setCurrentUser(currentUser.uid, dispatch).then().catch(err => console.log(err))
    await setCooperations(currentUser.uid, dispatch).then(async (res) => {
      //console.log("what the fuck", res)
      await setActiveChallenges(res, dispatch) 

    })
  }

  useEffect( () => {
    initialSetup()
    console.log("USER HOMETAB", user)
  }, [])


  //TODO: her, eller et annet sted, må jeg sjekke om målet har gått ut på dato


  return (
    <View style={{flex: 1}}>
    <View style={styles.mainContentContainer}>
      <View style={styles.standardflexColumnContainer}>
        <Text style={styles.headingThree}>Mål</Text>
        {user.currentGoal.goalName ?
        (<View style={styles.textContainer}><GoalDisplay userId={user.uid} goal={user.currentGoal}/></View>)
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
          <Text style={{marginLeft: 5, color: "red"}}>( {allActiveChallenges.length} )</Text>
        </View>
        {allActiveChallenges.length > 0 ?
        (<ListOfActiveChallenges currentUser={user} allActiveChallenges={allActiveChallenges}/>)
          :
        (<View style={styles.textContainer}>
          <Text>Du har ingen aktive utfordringer med venner enda. Legg til venner for å lage utfordringer for å motivere hverandre til å jobbe!</Text>
        </View> )
      }
      </View>
 
      </View>
        <BottomSheetTemplate contentComponent={<AddGoal bottomSheetRef={bottomSheetRef} />} ref={bottomSheetRef} />
    </View>
   
  )
};
export default HomeTab;
