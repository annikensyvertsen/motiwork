import React, {useState, useRef} from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import styles from "./sessions/styles";
import BottomSheet from "./BottomSheet";


let goals = null;
let activeChallenges = null;
let challengeColor = activeChallenges ? 'green' : 'red';


const HomeTab = () => {

  const bottomSheetModalRef = useRef(null);

  const handlePresentPress = () => bottomSheetModalRef.current.present()


  return (
    <View style={{flex: 1}}>
    <View style={styles.mainContentContainer}>
      <View style={styles.standardflexColumnContainer}>
        <Text style={styles.headingThree}>Mål</Text>
        {goals ?
        (<Text>mål</Text>)
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
        <BottomSheet ref={bottomSheetModalRef} />
    </View>
   
  )
};
export default HomeTab;



// <Modal
// animationType="slide"
// transparent={true}
// visible={modalVisible}
// onRequestClose={() => {
//   Alert.alert("Modal has been closed.");
//   setModalVisible(!modalVisible);
// }}
// >
// <View style={styles.modalView}>
// <Text>mOdal</Text>
// <Button onPress={() => setModalVisible(!modalVisible)}>Close</Button>

// </View>
// </Modal>