import React, { useRef } from "react";
import { View, ScrollView, Text, Image, StyleSheet, TextInput } from "react-native";
import { Button, DefaultTheme, IconButton } from "react-native-paper";

const OnboardingScreen = ({ navigation }) => {

  const onPress = () => {
    navigation.navigate("signIn")
  }
  return(

    <View style={styles.container}>
      <Text style={styles.header}>Unngå prokastinering og skippertak!</Text>
      <Image
      source={require("../../assets/doinghomework.png")}
      style={styles.image}
    />
    <View style={styles.steps}>
      <Text style={styles.mainText}>1. Registrer profil i appen</Text>
      <Text style={styles.mainText}>2. Legg til venner og start et samarbeid</Text>
      <Text style={styles.mainText}>3. Sett dere et mål og bestem hva taperen skal gi til vinneren</Text>
      <Text style={styles.mainText}>4. Start timeren for å tracke når dere jobber!</Text>
    </View>

      <Button mode="contained" onPress={onPress}>Kom i gang!</Button>
    </View>
  )
}

export default OnboardingScreen;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: 'space-between',
    marginTop: '30%',
    marginBottom: '30%',
    padding: 40,
  },
  image: {
   padding: 0, 
   width: 185, 
   height: 150, 
   alignSelf: "center",
  },
  header: {
    fontSize: 35,
    textAlign: "center",
    fontWeight: "bold"
  },
  mainText: {
    fontSize: 18,
    marginBottom: 15,
  },
  steps: {
    display: "flex",
    flexDirection: "column"
  }
})