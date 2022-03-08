
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

export const updateUserPoints = async(hours, points, user, cooperations) => {
  //console.log("in update user points", hours, "points", points, "user", user, "cooperations", cooperations)
  //todo: sjekk om brukeren har noen aktive mål
  console.log("updateuserpoints", user.uid, points)
  await db.collection('usersCollection').doc(user.uid).update({
    points: firebase.firestore.FieldValue.increment(points),
    totalWorkload: firebase.firestore.FieldValue.increment(hours),
  })
  .then(result => console.log("result", result))
  .catch(error => console.log("error", error))
  //sjekk om brukeren har et aktivt mål
  if(user.currentGoal && user.currentGoal.startDate){
    if(checkIfGoalOrChallengeHasStarted(user.currentGoal.startDate) && !checkIfGoalOrChallengeHasEnded(user.currentGoal.endDate)){
      await db.collection('usersCollection').doc(user.uid).update({
        [`currentGoal.workload`]: firebase.firestore.FieldValue.increment(hours),
      })
    }
  }
  Object.keys(cooperations).length > 0 &&  cooperations.forEach(async cooperation => {
    //foreløpig er det tiltenkt at det bare skal være en aktiv utfordring i hvert samarbeid. Kan vurdere å gjøre dette om til et objekt isteden
    if(Object.keys(cooperation.activeChallenge).length ){
       let activeChallenge = cooperation.activeChallenge
        if(checkIfGoalOrChallengeHasStarted(activeChallenge.startDate) && !checkIfGoalOrChallengeHasEnded(activeChallenge.endDate)){
          console.log("it has")
          await db.collection('cooperationsCollection').doc(cooperation.id).update({
            [`activeChallenge.workload.` + user.uid]: firebase.firestore.FieldValue.increment(hours),
          })
        }
    }
   


  })

  //sjekk om brukeren er med i noen aktive utfordringer
}