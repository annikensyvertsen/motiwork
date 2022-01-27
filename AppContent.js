import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { auth, db } from "./firebase";
import SessionTab from "./screens/SessionTab";
import HomeTab from "./screens/HomeTab";

import CommunityTab from "./screens/CommunityTab";
import ProfileTab from "./screens/ProfileTab";
import { useDispatch} from 'react-redux';
import { setCurrentUser } from "./store/actions/userActions";

import { FontAwesome } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { setAllUsers } from "./store/actions/allUsersActions";


export const AppContent = () => {
  const Tab = createBottomTabNavigator();
  let currentUser = auth.currentUser
  const dispatch = useDispatch()

  
  useEffect(() => {
    setCurrentUser(currentUser.uid, dispatch)
    setAllUsers(dispatch)
  }, [currentUser])

  useEffect(() => {
    console.log("currenuser id", currentUser.uid)
    let doc = db.collection('usersCollection').doc(currentUser.uid)
    let unsubscribe = doc.onSnapshot(snapshot => {
        setCurrentUser(currentUser.uid, dispatch)
    })
    return () => {
      unsubscribe()
    }
  }, [])

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
