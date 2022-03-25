import React, { useRef } from "react";
import { View, ScrollView, Text, Image, StyleSheet, TextInput } from "react-native";
import { DefaultTheme, IconButton } from "react-native-paper";

const WelcomeScreen = ({ navigation }) => {

  const onNextPress = () => {
    navigation.navigate("info")
  }
  return(

    <View style={styles.container}>
      <Text style={styles.header}>Unngå prokastinering og skippertak!</Text>
      <Image
      source={require("../../assets/doinghomework.png")}
      style={styles.image}
    />
      <Text style={styles.mainText}>Sett deg mål alene eller med venner og bli motivert til å jobbe jevnt gjennom hele semesteret.</Text>
      <IconButton onPress={onNextPress} icon="arrow-right-circle" size={50} color={DefaultTheme.colors.primary} />
    </View>
  )
}

export default WelcomeScreen;
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
    fontSize: 20,
    textAlign: "center"
  }
})