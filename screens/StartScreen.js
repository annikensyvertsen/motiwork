import React from 'react'
import { View, Text, Image, Button } from 'react-native';

import styles from './startScreenStyle';


const StartScreen = () => {
  
  return (
    <View style={styles.standardPage}>
      <Image source={require('../../assets/placeholderimg.svg')}/>
      <Text style={styles.heading2}>Registrer emnene dine</Text>
      <Text style={styles.heading2}>Sett deg mål</Text>
      <Text style={styles.heading2}>Jobb mot målene dine</Text>
      <Button style={styles.button1}>Logg inn</Button>
      <Button style={styles.button2}>Registrer deg</Button>
    </View>
  )
};
export default StartScreen;

