import { db } from "../../firebase";
import firebase from 'firebase/app';
import { SET_COOPERATIONS } from "../constants";
import { useSelector } from "react-redux";


//legg til en cooperation:
// steg 1 : legg til cooperation i cooperationsCollection
// steg 2: legg til referanse til cooperation hos bruker
export const addCooperation = async (members, name, dispatch) => {
  let docId = ""
  await db.collection("cooperationsCollection").add({
    name: name,
    members: members,
    activeChallenge: {},
    archivedChallenges: [],
  }).then(doc => {
    docId = doc.id
  }).catch(error => {
    console.log(error)
  })
  return docId
}

export const findExpiredChallenges = async () => {
  let todayInSeconds = (new Date().getTime() / 1000)
  await db.collection("cooperationsCollection").get()
  .then((querySnapshot) => {
    querySnapshot.forEach(async(doc) => {
      const {activeChallenge} = doc.data()
      if(Object.keys(activeChallenge).length > 0){
        if(activeChallenge.endDate.seconds < todayInSeconds){
          await archiveChallenge(activeChallenge, doc.id)
            .then()
            .catch(err => console.log(err))
        }
      }
    })
  })
}

export const setCooperations = async (userId, dispatch) => {
  let cooperations = []
  await findExpiredChallenges().catch(err => console.log(err))
  await db.collection("cooperationsCollection").get()
    .then((querySnapshot) => {
      querySnapshot.forEach(async(doc) => {
        const {members} = doc.data()
        const cooperation = {
          ...doc.data(),
          id: doc.id
        }
        if(members.receiver === userId || members.sender === userId){
          cooperations.push(cooperation)
        }
    });
    })
    .catch(err => {
      console.log(err)
    });
    dispatch({ type: SET_COOPERATIONS, payload: cooperations})
    return cooperations
}

export const sendCooperationRequest = async (request, dispatch) => {
  let {members} = request

  await db.collection('usersCollection').doc(members.sender).update({
    outgoingCooperationRequests: firebase.firestore.FieldValue.arrayUnion(request)
  }).catch(err => console.log(err))
  await db.collection('usersCollection').doc(members.receiver).update({
    incomingCooperationRequests: firebase.firestore.FieldValue.arrayUnion(request)
  }).catch(err => console.log(err))
}

export const acceptCooperationRequest = async (request, dispatch) => {
  let cooperationId;
  let {members, name} = request
  await addCooperation(members, name, dispatch)
    .then(res => cooperationId = res)
    .catch(err => console.log(err))
  await db.collection('usersCollection').doc(members.sender).update({
    cooperations: firebase.firestore.FieldValue.arrayUnion(cooperationId),
    outgoingCooperationRequests: firebase.firestore.FieldValue.arrayRemove(request),
  }).catch(err => console.log(err))
  await db.collection('usersCollection').doc(members.receiver).update({
    cooperations: firebase.firestore.FieldValue.arrayUnion(cooperationId),
    incomingCooperationRequests: firebase.firestore.FieldValue.arrayRemove(request)
  }).catch(err => console.log(err))

}

export const declineCooperationRequest = async (request) => {
  let {members} = request
  console.log("request", request, "members", members)

  await db.collection('usersCollection').doc(members.receiver).update({
    incomingCooperationRequests: firebase.firestore.FieldValue.arrayRemove(request)
  })
  await db.collection('usersCollection').doc(members.sender).update({
    outgoingCooperationRequests: firebase.firestore.FieldValue.arrayRemove(request),
  })
  .then(res=> console.log("res", res))
  .catch(err => console.log(err))
  
}

//challenge:

export const createChallenge = async (members, formData, cooperationId, dispatch) => {
  let workloadObj = {}
  workloadObj[members.sender] = 0
  workloadObj[members.receiver] = 0
  let challenge = {
    ...formData,
    workload: workloadObj
  }
  await db.collection('cooperationsCollection').doc(cooperationId).update({
    activeChallenge: challenge
  }).then(
    setCooperations(members.sender, dispatch)
  ).catch(err => console.log(err))

}

export const archiveChallenge = async (challenge, cooperationId) => {
  await db.collection('cooperationsCollection').doc(cooperationId).update({
    archivedChallenges: firebase.firestore.FieldValue.arrayUnion(challenge),
    activeChallenge: {},
  }).catch(err => console.log(err))

}