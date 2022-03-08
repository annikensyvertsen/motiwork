import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, AppState } from "react-native";
import { auth, db } from "./firebase";
import SessionTab from "./screens/SessionTab";
import HomeTab from "./screens/HomeTab";

import CommunityTab from "./screens/CommunityTab";
import CooperationTab from "./screens/CooperationTab";
import ProfileTab from "./screens/ProfileTab";
import { useDispatch, useSelector, shallowEqual} from 'react-redux';
import { setCurrentUser } from "./store/actions/userActions";

import { FontAwesome } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';

import { setAllUsers } from "./store/actions/allUsersActions";
import { SET_APP_STATE } from "./store/constants";


export const AppContent = () => {
  const Tab = createBottomTabNavigator();
  let currentUser = auth.currentUser
  const dispatch = useDispatch()

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current)


  const initialSetup = async () => {
    await setAllUsers(dispatch)
  }
  //hør etter når user endrer seg, altså at cooperations feltet f.eks. endrer seg
  useEffect(() => {
    initialSetup()
  }, [])




  useEffect(() => {
    let userDoc = db.collection('usersCollection').doc(currentUser.uid)
    let unsubscribe = userDoc.onSnapshot(snapshot => {
        setCurrentUser(currentUser.uid, dispatch)
    })
 
    return () => {
      unsubscribe()
    }
  }, [])

  const Stack = createStackNavigator();

  const CommunityScreenNavigator = () => {
    return(
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="community">
        <Stack.Screen name="community" component={CommunityTab} />
        <Stack.Screen name="cooperation" component={CooperationTab} />
      </Stack.Navigator>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#29434e" }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
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
          component={CommunityScreenNavigator}
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
