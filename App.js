import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, SafeAreaView } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { auth } from "./firebase";
import LoginScreen from "./screens/sessions/LoginScreen";
import RegisterScreen from "./screens/sessions/RegisterScreen";
import CoursesTab from "./screens/CoursesTab";
import CompetitionTab from "./screens/CompetitionTab";
import ProfileTab from "./screens/ProfileTab";
import RegisterCourses from "./screens/RegisterCourses";

import { FontAwesome } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useFonts } from "expo-font";
import { profile } from "console";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="courses" component={CoursesTab} />
      <Stack.Screen name="registerCourses" component={RegisterCourses} />
    </Stack.Navigator>
  );
};

const CompetitionStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="courses" component={CoursesTab} />
      <Stack.Screen name="competition" component={CompetitionTab} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="profile" component={profile} />
    </Stack.Navigator>
  );
};

const SignInStackNavigator = () => {
  return (
    <Stack.Navigator presentation="card" screenOptions={{}}>
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
      <Stack.Screen
        name="registerCourses"
        component={RegisterCourses}
        options={{ title: "Registrer emner" }}
      />
    </Stack.Navigator>
  );
};

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
                if (route.name === "courses") {
                  return (
                    <FontAwesome name="list-ul" size={size} color={color} />
                  );
                }
                if (route.name === "competition") {
                  return (
                    <FontAwesome name="trophy" size={size} color={color} />
                  );
                }
                if (route.name === "profile") {
                  return <FontAwesome name="user" size={size} color={color} />;
                }
              },
            })}
            tabBarOptions={{
              activeTintColor: "green",
              inactiveTintColor: "#819ca9",
              style: {
                backgroundColor: "#29434e",
              },
            }}
          >
            <Tab.Screen
              name="courses"
              component={CoursesTab}
              options={{
                title: "Emner",
              }}
            />
            <Tab.Screen
              name="competition"
              component={CompetitionTab}
              options={{
                title: "Konkurranse",
              }}
            />
            <Tab.Screen
              name="profile"
              component={ProfileTab}
              options={{
                title: "Profil",
              }}
            />
          </Tab.Navigator>
        </SafeAreaView>
      ) : (
        <>
          <StatusBar style="light" />
          <Stack.Navigator presentation="card" screenOptions={{}}>
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
            <Stack.Screen
              name="registerCourses"
              component={RegisterCourses}
              options={{ title: "Registrer emner" }}
            />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}
