import {  db } from "../firebase";
import firebase from 'firebase/app';

export const getUser = async (uid) => {
  let userData = {}
  await db.collection('usersCollection')
  .doc(uid).get().then(doc => {
    if(doc.exists){
      userData = doc.data()
    }
    else {
      console.log("no user with that id")
    }
  }).catch(error =>{
    console.log("Error getting document; ", error)
  })
  return userData
  
}