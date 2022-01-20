import React, {useState, useEffect} from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { auth, db } from "../firebase";

const ProfileTab = () => {
  let currentUser = auth.currentUser;  
  const [userData, setUserData] = useState({uid: currentUser.uid, points: 0 })

  const getUserInformation = async () => {
    await db.collection('usersCollection')
    .doc(currentUser.uid).get().then(doc => {
      if(doc.exists){
        setUserData(doc.data())
      }
      else {
        console.log("no user with that id")
      }
    }).catch(error =>{
      console.log("Error getting document; ", error)
    })
  }
  useEffect(() => {
    getUserInformation()
  }, [])
  return (
    <View>
      <Text>Profile</Text>
      <Text>Email: {currentUser.email}</Text>
      <Text>Username: {currentUser.displayName}</Text>
      <Text>Points: {userData.points}</Text>
      <Button onPress={() => auth.signOut()}>Logg ut</Button>
    </View>
  );
};
export default ProfileTab;
