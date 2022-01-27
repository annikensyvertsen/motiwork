import {  db } from "../firebase";
import firebase from 'firebase/app';

export const sendFriendRequest = async (currentUserId, userToAddId) => {
  //finn brukeren du skal legge til i databasen basert på id
  //legg til currentUserId i userToAdd sin 'requests'-liste
  //legg til userToAddId i currentUser sin utgående requests liste
  console.log("add friend---, currentUiserId", currentUserId, "user to add", userToAddId),
  await db.collection('usersCollection').doc(currentUserId).update({
    outgoingFriendRequests: firebase.firestore.FieldValue.arrayUnion(userToAddId)
  })
  await db.collection('usersCollection').doc(userToAddId).update({
    incomingFriendRequests: firebase.firestore.FieldValue.arrayUnion(currentUserId)
  })
}

export const checkIfRequestIsPending = async (currentUserId, userToAddId) => {
  let outgoingFriendRequests;
  let isPending = false
  await db.collection("usersCollection").doc(currentUserId).get()
  .then(doc => {
    if (doc.exists) {
      outgoingFriendRequests = doc.data().outgoingFriendRequests
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  })
  if(outgoingFriendRequests.includes(userToAddId)){
    isPending = true
  }
  console.log("outgoing: ", outgoingFriendRequests)
  return isPending

}

export const getIncomingFriendRequests = async (currentUserId) => {
  let friendRequests;
  await db.collection("usersCollection").doc(currentUserId).get()
  .then((doc) => {
    if (doc.exists) {
      friendRequests = doc.data().incomingFriendRequests
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  })
  return friendRequests
}

export const getAllUsers = async (currentUserId) => {
  //må returnere alle brukere untatt seg selv
  let users = []
  await db.collection("usersCollection").get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      users.push(doc.data())
  });
});
  return users
}

export const getAllUsersExceptFriends = async (currentUserId) => {
  //må returnere alle brukere untatt seg selv
  let users = []
  let friends;
  await db.collection("usersCollection").doc(currentUserId).get()
  .then((doc) => {
    if(doc.exists){
      friends = doc.data().friends
    }else{
      console.log("no such document")
    }
  });

  await db.collection("usersCollection").get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log("in here?")
      if(doc.data().uid != currentUserId){
        let userAlreadyAFriend = false;
        userAlreadyAFriend = friends.some(f => f == doc.data().uid)
        //friends.forEach(friend => users.find(user => user.id === friend.id && console.log("user : ", user, "annd friend: ", friend)))
        //console.log("useralreadyafriend after", userAlreadyAFriend)
        if(!userAlreadyAFriend){
          users.push(doc.data())
        }
      }
  });
});
  return users
}

export const acceptFriendRequest = async (currentUserId, userToAddId) => {
  await db.collection('usersCollection').doc(currentUserId).update({
    friends: firebase.firestore.FieldValue.arrayUnion(userToAddId)
  })
  await db.collection('usersCollection').doc(userToAddId).update({
    friends: firebase.firestore.FieldValue.arrayUnion(currentUserId)
  })
  await db.collection('usersCollection').doc(userToAddId).update({
    outgoingFriendRequests: firebase.firestore.FieldValue.arrayRemove(currentUserId)
  })
  await db.collection('usersCollection').doc(currentUserId).update({
    incomingFriendRequests: firebase.firestore.FieldValue.arrayRemove(userToAddId),
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