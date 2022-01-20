import React, { useRef, useState, useEffect} from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import styles from "./sessions/styles";
import AddGoal from '../components/AddGoal';
import BottomSheetTemplate from "../screens/BottomSheetTemplate";
import { GoalDisplay } from "../components/GoalDisplay";
import { getUserGoal } from "../hooks/goalHook";
import { auth, db } from "../firebase";


//TODO: denne må settes som en state som oppdateres når man ser om det er noe data lagret 
let activeChallenges = null;
let challengeColor = activeChallenges ? 'green' : 'red';
let currentUser = auth.currentUser;  


const HomeTab = () => {

  const [goal, setGoal] = useState()

  const bottomSheetModalRef = useRef(null);

  const handlePresentPress = () => bottomSheetModalRef.current.present()

  const fetchGoals = async () => {
    await getUserGoal(currentUser.uid).then(g => {
      setGoal(g)
    });
  }
  
  useEffect( () => {
    console.log("goal", goal)
    fetchGoals()
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
