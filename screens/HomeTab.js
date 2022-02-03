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
import { setCooperations } from "../store/actions/cooperationsActions";
import { ListOfActiveChallenges } from '../components/ListOfActiveChallenges'


const HomeTab = () => {

    //TODO: denne må settes som en state som oppdateres når man ser om det er noe data lagret 
  //activechallenges er i dette tilfelle riktig at er i flertall, siden den skal vise alle de aktive utfordringene du har med venner
  
  const dispatch = useDispatch()
  let {user} = useSelector(state => state.user)
  let {cooperations} = useSelector(state => state.cooperations)
  const [activeChallenges, setActiveChallenges] = useState([])

  let currentUser = auth.currentUser;  
  const bottomSheetModalRef = useRef(null);
  const handlePresentPress = () => bottomSheetModalRef.current.present()

  const initialSetup = async () => {
    await setCurrentUser(currentUser.uid, dispatch)
    await setCooperations(currentUser.uid, dispatch)
  }

  console.log("cooperations", cooperations)

  const findActiveChallenges = () => {
    cooperations.forEach(cooperation => 
      {
        if(Object.keys(cooperation.activeChallenge).length > 0){}
        setActiveChallenges(state => [...state, cooperation.activeChallenge])
      }
    )     
  }

  useEffect( () => {
    initialSetup()
    findActiveChallenges()
  }, [])

  //TODO: her, eller et annet sted, må jeg sjekke om målet har gått ut på dato


  return (
    <View style={{flex: 1}}>
    <View style={styles.mainContentContainer}>
      <View style={styles.standardflexColumnContainer}>
        <Text style={styles.headingThree}>Mål</Text>
        {user.currentGoal.goalName ?
        (<View style={styles.textContainer}><GoalDisplay goal={user.currentGoal}/></View>)
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
          <Text style={{marginLeft: 5, color: "red"}}>()</Text>
        </View>
        {activeChallenges.length > 0 ?
        (<ListOfActiveChallenges activeChallenges={activeChallenges} />)
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
