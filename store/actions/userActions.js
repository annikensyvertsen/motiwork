import React, { useRef } from "react";
import {SET_USER, SET_UNAUTHENTICATED, LOADING_UI, SET_AUTHENTICATED, SET_LOADING, SET_ERROR} from '../constants/index'
import {useSelector, useDispatch} from 'react-redux'
import { auth, db } from "../../firebase";
import firebase from 'firebase/app';


// when user logs in, we sign her in via firebase,
// and then we set the result in the store to keep track of the logged in user and her data

export const loginUser =  async (userData, dispatch) => {
  const { email, password } = userData;

   await auth.signInWithEmailAndPassword(email.trim().toLowerCase(), password)
  .then(async (res) => {
    let uid = res.user.uid
    await db.collection('usersCollection').doc(uid).get()
    .then(doc => {
      if(doc.exists){
        return async (dispatch) => {
          dispatch({ type: SET_USER, payload: doc.data()})
        }
      }
      else {
        console.log("no user with that id")
      }
    }).catch(error =>{
      dispatch({ type: SET_ERROR, payload: error })
    })
  })
  .catch(err => console.log(err));
}

export const checkIfGoalIsDue = (goal) => {
  let todayInSeconds = (new Date().getTime() / 1000)
  return goal.endDate.seconds < todayInSeconds
}

export const updateActiveChallenge = async (uid) => {
  const userCollectionRef = db.collection('usersCollection').doc(uid)
  let doc = await userCollectionRef.get()
  let user = doc.data()

  if(Object.keys(user.currentGoal).length > 0){
    if(checkIfGoalIsDue(user.currentGoal)){
      await db.collection('usersCollection').doc(uid).update(
      {
        archivedGoals: firebase.firestore.FieldValue.arrayUnion(user.currentGoal),
        currentGoal: {}
      }
      ).then(res => console.log(res)).catch(err => console.log(err))
    }
  }
}

export const setCurrentUser = async (uid, dispatch) => {  
  const userCollectionRef = db.collection('usersCollection').doc(uid)
  await userCollectionRef.get()
  .then(async doc => {
    if(doc.exists){
      let userData = doc.data()
      updateActiveChallenge(uid)

      dispatch({ type: SET_USER, payload: userData})
    }
    else {
      console.log("There exists absolutley no document with that id")
    }
  })
  .catch(error =>
    dispatch({ type: SET_ERROR, payload: error })
  )
}

export const registerUser = (userData, dispatch) => {

  dispatch({ 
    type: SET_LOADING,
    payload: true
  })

  const { email, password, firstname, surname } = userData;
    auth
      .createUserWithEmailAndPassword(email.trim().toLowerCase(), password)
      .then( async (result) => {  
        await db.collection('usersCollection').doc(result.user.uid).set({
          uid: result.user.uid,
          points: 0,
          totalWorkload: 0,
          currentGoal: {},
          friends: [],
          cooperations: [],
          incomingFriendRequests: [],
          outgoingFriendRequests: [],
          incomingCooperationRequests: [],
          outgoingCooperationRequests: [],
          archivedGoals: [],
          firstname: firstname,
          surname: surname,
        })      
       .then((result) => {
         console.log("result data", result.data())
          dispatch({ type: SET_USER, payload: result.data()})
        })
        .catch((error) => {
          console.log(error)
          dispatch({ type: SET_ERROR, payload: error })
        })
        return result.user.updateProfile({
          displayName: firstname,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: SET_ERROR, payload: error })
      });
}