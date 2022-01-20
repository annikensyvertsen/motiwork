import {  db } from "../firebase";
import React, { useState } from "react";

import firebase from 'firebase/app';

export const setUserGoal = async (data, uid) => {
  console.log("data in hook:", data)
  const {goalName, reward, startDate, endDate, workloadGoal } = data

  await db.collection('usersCollection').doc(uid).update({
    currentGoal: {
      goalName: goalName,
      reward: reward,
      startDate: startDate,
      endDate: endDate,
      workloadGoal: workloadGoal,
      isCompleted: false,
      workload: 0
    }
  })
  .then(result => {
    console.log("result",)
  })
  .catch(error => console.log("error", error))

  // await db.collection('usersCollection').doc(uid).collection('goals').doc().set({
  //   goalName: goalName,
  //   reward: reward,
  //   startDate: startDate,
  //   endDate: endDate,
  //   goal: workloadGoal,
  //   isCompleted: false,
  //   workload: 0
  // })

}

export const updateUserGoal = async () => {
  await db.collection().doc().update({
  })
  .then(result => console.log("result", result))
  .catch(error => console.log("error", error))

}


export const getUserGoal = async (uid) => {
  let goal = {}

  await db.collection("usersCollection").doc(uid).get()
  .then(function(doc) {
    if (doc.exists) {
      goal = doc.data().currentGoal
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  })
  // await db.collection("usersCollection").doc(uid).collection('goals').get()
  // .then( querySnapshot => {
  //   querySnapshot.forEach((doc) => {
  //     goals.push(doc.data())
  // });
  // })

  return goal
}



 /* await db.collection("usersCollection").doc(uid).collection('goals').get()
 .then( querySnapshot => {

 })
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      let goals  = doc.data()
      console.log(doc.id);
  });
});*/




// await db.collection('usersCollection').doc(uid).collection('goals').get()
// .then(result => console.log("result", result))
// .catch(error => console.log("error", error))
