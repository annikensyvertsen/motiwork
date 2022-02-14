import { db } from "../../firebase";
import firebase from 'firebase/app';


// Friend requests

export const sendFriendRequest = async (currentUserId, userToAddId) => {
  await db.collection('usersCollection').doc(currentUserId).update({
    outgoingFriendRequests: firebase.firestore.FieldValue.arrayUnion(userToAddId)
  })
  await db.collection('usersCollection').doc(userToAddId).update({
    incomingFriendRequests: firebase.firestore.FieldValue.arrayUnion(currentUserId)
  })
}

export const acceptFriendRequest = async (currentUserId, userToAddId) => {
  await db.collection('usersCollection').doc(currentUserId).update({
    friends: firebase.firestore.FieldValue.arrayUnion(userToAddId),
    incomingFriendRequests: firebase.firestore.FieldValue.arrayRemove(userToAddId),
  })
  await db.collection('usersCollection').doc(userToAddId).update({
    friends: firebase.firestore.FieldValue.arrayUnion(currentUserId),
    outgoingFriendRequests: firebase.firestore.FieldValue.arrayRemove(currentUserId)
  })
}

export const declineFriendRequest = async (currentUserId, userToAddId ) => {
  await db.collection('usersCollection').doc(userToAddId).update({
    outgoingFriendRequests: firebase.firestore.FieldValue.arrayRemove(currentUserId)
  })
  await db.collection('usersCollection').doc(currentUserId).update({
    incomingFriendRequests: firebase.firestore.FieldValue.arrayRemove(userToAddId),
  })
}




// export const sendCooperationRequest = async (currentUserId, userToAddId) => {
//   await db.collection('usersCollection').doc(currentUserId).update({
//     outgoingCooperationRequests: firebase.firestore.FieldValue.arrayUnion(userToAddId)
//   })
//   await db.collection('usersCollection').doc(userToAddId).update({
//     incomingCooperationRequests: firebase.firestore.FieldValue.arrayUnion(currentUserId)
//   })
// }
// export const acceptCooperationRequest = async (currentUserId, userToAddId) => {
//   await db.collection('usersCollection').doc(currentUserId).update({
//     //cooperations: firebase.firestore.FieldValue.arrayUnion(userToAddId),
//     incomingCooperationRequests: firebase.firestore.FieldValue.arrayRemove(userToAddId),
//   })
//   await db.collection('usersCollection').doc(userToAddId).update({
//     //cooperations: friends: firebase.firestore.FieldValue.arrayUnion(currentUserId),
//     outgoingCooperationRequests: firebase.firestore.FieldValue.arrayRemove(currentUserId)
//   })
// }

// export const declineCooperationRequest = async (currentUserId, userToAddId ) => {
//   await db.collection('usersCollection').doc(userToAddId).update({
//     outgoingCooperationRequests: firebase.firestore.FieldValue.arrayRemove(currentUserId)
//   })
//   await db.collection('usersCollection').doc(currentUserId).update({
//     incomingCooperationRequests: firebase.firestore.FieldValue.arrayRemove(userToAddId),
//   })
// }
