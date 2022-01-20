import {  db } from "../firebase";
import React, { useState } from "react";

import firebase from 'firebase/app';

export const setUserGoal = async (data, uid) => {
  console.log("data in hook:", data)
  const {goalName, reward, startDate, endDate, workloadGoal } = data

  await db.collection('usersCollection').doc(uid).collection('goals').doc().set({
    goalName: goalName,
    reward: reward,
    startDate: startDate,
    endDate: endDate,
    goal: workloadGoal,
    isCompleted: false,
    workload: 0
  })
  .then(result => {
    console.log("result",)
  })
  .catch(error => console.log("error", error))  
  
}

export const updateUserGoal = async () => {
  await db.collection().doc().update({
  })
  .then(result => console.log("result", result))
  .catch(error => console.log("error", error))
  
}


export const getUserGoal = async () => {
  await db.collection().doc().update({
  })
  .then(result => console.log("result", result))
  .catch(error => console.log("error", error))
  
}

