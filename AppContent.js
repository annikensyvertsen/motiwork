import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { auth, db } from "./firebase";
import SessionTab from "./screens/SessionTab";
import HomeTab from "./screens/HomeTab";

import CommunityTab from "./screens/CommunityTab";
import ProfileTab from "./screens/ProfileTab";
import { useDispatch, useSelector} from 'react-redux';
import { setCurrentUser } from "./store/actions/userActions";

import { FontAwesome } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { setAllUsers } from "./store/actions/allUsersActions";
import { setCooperations } from "./store/actions/cooperationsActions";


export const AppContent = () => {
  const Tab = createBottomTabNavigator();
  let currentUser = auth.currentUser
  const dispatch = useDispatch()

  let {cooperations} = useSelector(state => state.cooperations)
  let {user} = useSelector(state => state.user)


  useEffect(() => {
    setCurrentUser(currentUser.uid, dispatch)
    setAllUsers(dispatch)
  }, [currentUser])

  //hør etter når user endrer seg, altså at cooperations feltet f.eks. endrer seg
  useEffect(() => {
    setCooperations(currentUser.uid, dispatch)
  }, [user])

  useEffect(() => {
    let userDoc = db.collection('usersCollection').doc(currentUser.uid)
    let unsubscribe = userDoc.onSnapshot(snapshot => {
        setCurrentUser(currentUser.uid, dispatch)
        setCooperations(currentUser.uid, dispatch)
    })
    //TODO: her -> lage en lytter som hører på når samarbeid til denne brukeren endrer seg
    //let cooperationsDoc = db.collection('cooperations').doc()
    return () => {
      unsubscribe()
    }
  }, [])

  // useEffect(() => {
  //   let doc = db.collection('cooperationsCollection').doc(currentUser.uid)
  //   let unsubscribe = doc.onSnapshot(snapshot => {
  //       setCurrentUser(currentUser.uid, dispatch)
  //   })
  //   return () => {
  //     unsubscribe()
  //   }
  // }, [])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#29434e" }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            if (route.name === "Hjem") {
              return (
                <FontAwesome name="home" size={size} color={color} />
              );
            }
            if (route.name === "Fellesskap") {
              return (
                <FontAwesome name="trophy" size={size} color={color} />
              );
            }
            if (route.name === "Økt") {
              //should be changed to stopwatch or similar
              return <FontAwesome name="play" size={size} color={color} />;
            }
            if (route.name === "Profil") {
              return <FontAwesome name="user" size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "#819ca9",
          style: {
            backgroundColor: "#29434e",
          },
        })}
      >
        <Tab.Screen name="Hjem" component={HomeTab} />
        <Tab.Screen
          name="Fellesskap"
          component={CommunityTab}
        />
        <Tab.Screen
          name="Økt"
          component={SessionTab}
        />
        <Tab.Screen name="Profil" component={ProfileTab} />
      </Tab.Navigator>
    </SafeAreaView>
  )
}
