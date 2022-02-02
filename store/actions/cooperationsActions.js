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
    activeChallenges: [],
    archivedChallenges: [],
  }).then(doc => {
    docId = doc.id
  }).catch(error => {
    console.log(error)
  })
  return docId
}

export const setCooperations = async (userId, dispatch) => {
  let cooperations = []
  await db.collection("cooperationsCollection").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc ) => {
        const {members} = doc.data()
        const cooperation = {
          ...doc.data(),
          id: doc.id
        }
        if(members.receiver === userId || members.sender === userId){
          cooperations.push(cooperation)
        }
    });
    dispatch({ type: SET_COOPERATIONS, payload: cooperations})
    })
    .catch(err => {
      console.log(err)
    });

}

export const sendCooperationRequest = async (request, dispatch) => {
  let {members} = request

  await db.collection('usersCollection').doc(members.sender).update({
    outgoingCooperationRequests: firebase.firestore.FieldValue.arrayUnion(request)
  })
  await db.collection('usersCollection').doc(members.receiver).update({
    incomingCooperationRequests: firebase.firestore.FieldValue.arrayUnion(request)
  })
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
  })
  await db.collection('usersCollection').doc(members.receiver).update({
    cooperations: firebase.firestore.FieldValue.arrayUnion(cooperationId),
    incomingCooperationRequests: firebase.firestore.FieldValue.arrayRemove(request)
  })

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