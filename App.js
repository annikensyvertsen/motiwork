import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, SafeAreaView, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { auth } from "./firebase";
import LoginScreen from "./screens/sessions/LoginScreen";
import RegisterScreen from "./screens/sessions/RegisterScreen";
import SessionTab from "./screens/SessionTab";
import HomeTab from "./screens/HomeTab";

import CommunityTab from "./screens/CommunityTab";
import ProfileTab from "./screens/ProfileTab";

import { FontAwesome } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useFonts } from "expo-font";

const Stack = createStackNavigator();

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const Tab = createBottomTabNavigator();

  const [loaded] = useFonts({
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "roboto-italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-black": require("./assets/fonts/Roboto-Black.ttf"),
    "roboto-thin": require("./assets/fonts/Roboto-Thin.ttf"),
  });

  auth.onAuthStateChanged((user) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });
  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer theme={DefaultTheme}>
      {signedIn ? (
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
      ) : (
        <View style={{flex: 1}}>
          <StatusBar style="light" />
          <Stack.Navigator presentation="card">
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
  );
}
