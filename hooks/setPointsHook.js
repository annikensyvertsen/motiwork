import {  db } from "../firebase";
import firebase from 'firebase/app';

export const updateUserPoints = async (points, userId) => {
  console.log("points", points, "userId", userId)
  await db.collection('usersCollection').doc(userId).update({
    points: firebase.firestore.FieldValue.increment(points)
  })
  .then(result => console.log("result", result))
  .catch(error => console.log("error", error))
  
}
