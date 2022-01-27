import {  db } from "../firebase";
import firebase from 'firebase/app';

export const updateUserPoints = async (hours, points, userId) => {
  await db.collection('usersCollection').doc(userId).update({
    points: firebase.firestore.FieldValue.increment(points),
    totalWorkload: firebase.firestore.FieldValue.increment(hours),
    [`currentGoal.workload`]: firebase.firestore.FieldValue.increment(hours),

  })
  .then(result => console.log("result", result))
  .catch(error => console.log("error", error))
  
}
