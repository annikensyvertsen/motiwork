
import { db } from "../firebase"
import firebase from 'firebase/app';

export const checkIfGoalOrChallengeHasStarted = (startDate) => {
  let todayInSeconds = new Date().getTime()/1000
  if(startDate.seconds > todayInSeconds) return false
  else return true
}

export const checkIfGoalOrChallengeHasEnded = (endDate) => {
  let todayInSeconds = new Date().getTime()/1000
  if(endDate.seconds <= todayInSeconds) return true
  else return false
}

export const checkIfGoalisReached = (workload, workloadGoal) => {
  return workload >= workloadGoal
}

export const updateCooperations = async (cooperations, user, hours) => {
  Object.keys(cooperations).length > 0 &&  
  cooperations.forEach(async cooperation => {
    if(cooperation.activeChallenge && Object.keys(cooperation.activeChallenge).length ){
       let activeChallenge = cooperation.activeChallenge
        if(checkIfGoalOrChallengeHasStarted(activeChallenge.startDate) && !checkIfGoalOrChallengeHasEnded(activeChallenge.endDate)){
          await db.collection('cooperationsCollection').doc(cooperation.id).update({
            [`activeChallenge.workload.` + user.uid]: firebase.firestore.FieldValue.increment(hours),
          })
        }
    }
  })
}

export const updateUserGoal = async (user, hours) => {
  if(user.currentGoal && user.currentGoal.startDate){
    if(checkIfGoalOrChallengeHasStarted(user.currentGoal.startDate) && !checkIfGoalOrChallengeHasEnded(user.currentGoal.endDate)){
      await db.collection('usersCollection').doc(user.uid).update({
        [`currentGoal.workload`]: firebase.firestore.FieldValue.increment(hours),
      })
    }
  }
}

export const updateUserPoints = async(hours, points, user, cooperations) => {
  await db.collection('usersCollection').doc(user.uid).update({
    points: firebase.firestore.FieldValue.increment(points),
    totalWorkload: firebase.firestore.FieldValue.increment(hours),
  })
  .then(result => console.log("result", result))
  .catch(error => console.log("error", error))
  
  updateUserGoal(user, hours)
  updateCooperations(cooperations, user, hours)

}

export const archiveGoal = async(uid) => {
  const userCollectionRef = db.collection('usersCollection').doc(uid)
  let doc = await userCollectionRef.get()
  let user = doc.data()

  let currentGoal = user && user.currentGoal
  console.log("currentgoal", currentGoal)

  if(checkIfGoalisReached(currentGoal.workload, currentGoal.workloadGoal)){
    console.log("here we will archive goal")
    // await db.collection('usersCollection').doc(uid).update(
    //   {
    //     archivedGoals: firebase.firestore.FieldValue.arrayUnion(user.currentGoal),
    //     currentGoal: {}
    //   }
    //   ).then(res => console.log(res)).catch(err => console.log(err))
  }

}