import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Statusbar } from "react-native";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { useColorScheme} from 'react-native-paper'
import { createStackNavigator } from "@react-navigation/stack";
import { auth } from "./firebase";
import thunk from 'redux-thunk'

import LoginScreen from "./screens/sessions/LoginScreen";
import RegisterScreen from "./screens/sessions/RegisterScreen";
import WelcomeScreen from "./screens/sessions/WelcomeScreen";

import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux'

import { useFonts } from "expo-font";
import { userReducer } from "./store/reducers/userReducer";
import { cooperationsReducer } from "./store/reducers/cooperationsReducer";
import { appStateReducer } from "./store/reducers/appStateReducer";

import {AppContent} from "./AppContent";
import OnboardingScreen from "./screens/sessions/OnboardingScreen";
// import firebase from "./firebase";
// import PushNotification from 'react-native-push-notification';


const Stack = createStackNavigator();

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  
  const [loaded] = useFonts({
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "roboto-italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-black": require("./assets/fonts/Roboto-Black.ttf"),
    "roboto-thin": require("./assets/fonts/Roboto-Thin.ttf"),
  });

  const rootReducer = combineReducers({user: userReducer, cooperations: cooperationsReducer, appState: appStateReducer})

  const store = createStore(rootReducer, applyMiddleware(thunk))

  auth.onAuthStateChanged((user) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  })

  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
    <NavigationContainer theme={useColorScheme === 'dark'? DarkTheme: DefaultTheme}>
      {signedIn ? (
        <AppContent />
      ) : (
        <View style={{flex: 1}}>
          <StatusBar style="light" />
          <Stack.Navigator presentation="card">
            <Stack.Screen 
            options={{headerShown: false}}
            name="welcome" 
            component={WelcomeScreen} 
            />
            <Stack.Screen 
            options={{headerShown: false}}
            name="info" 
            component={OnboardingScreen} 
            />
            <Stack.Screen
              name="signIn"
              component={LoginScreen}
              options={{
                title: "Sign in",
              }}
            />
            <Stack.Screen
              name="register"
              component={RegisterScreen}
              options={{ title: "Register" }}
            />
          </Stack.Navigator>
        </View>
      )}
    </NavigationContainer>
    </Provider>
  );
}
