import { useSelector } from "react-redux";
import { returnUserBasedOnId } from "./friends";

export const returnCooperationBasedOnId = (id) => {
  let {cooperations} = useSelector(state => state.cooperations)
  return cooperations.find(c => c.id === id)
}

export const returnFriendsNotInCooperation = (friends, cooperations) => {
  let friendsInCooperation = []
  cooperations && cooperations.forEach(c => {
    let {members} = c
    if(friends.includes(members.receiver)) {
      if (!friendsInCooperation.includes(members.receiver)) friendsInCooperation.push(members.receiver)
    } 
    if(friends.includes(members.sender)){
      if (!friendsInCooperation.includes(members.sender)) friendsInCooperation.push(members.sender)
    } 
  })
  let ids = friends.filter(friend => !friendsInCooperation.includes(friend))
  return ids.map(id => returnUserBasedOnId(id))

}