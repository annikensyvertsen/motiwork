import React, { useRef } from "react";
import {SET_USER, SET_UNAUTHENTICATED, LOADING_UI, SET_AUTHENTICATED, SET_LOADING, SET_ERROR, SET_GOAL} from '../constants/index'
import {useSelector, useDispatch} from 'react-redux'
import { auth, db } from "../../firebase";


export const setUserGoal = async (data, uid, dispatch) => {
  
  dispatch({ 
    type: SET_LOADING,
    payload: true
  })

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
  .then(result => 
    dispatch({
      type: SET_GOAL,
      payload: result.data()
    })
    )
  .catch(error => 
    dispatch({ 
      type: SET_ERROR,
      payload: true
    })
  
    )
}

export const updateUserPoints = async(hours, points, userId, dispatch) => {
  await db.collection('usersCollection').doc(userId).update({
    points: firebase.firestore.FieldValue.increment(points),
    totalWorkload: firebase.firestore.FieldValue.increment(hours),
    [`currentGoal.workload`]: firebase.firestore.FieldValue.increment(hours),

  })
  .then(result => console.log("result", result))
  .catch(error => console.log("error", error))
}