import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
const styles = StyleSheet.create({
  standardPage: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },  
  button1: {
    margin: 10,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#421EB7',
    borderRadius: 20,
    width: "70%",
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  button2: {
    margin: 10,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    width: "70%",
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  }
 
});
export default styles;