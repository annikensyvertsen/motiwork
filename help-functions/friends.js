import { useSelector } from "react-redux";

export const returnUserBasedOnId = (id) => {
  let {allUsers} = useSelector(state => state.user)
  return allUsers.find(user => user.uid === id)
}

export const returnMultipleUsersBasedOnIds = (ids) => {
  let {allUsers} = useSelector(state => state.user)
  return allUsers.filter(user => ids.includes(user.id) )
}

export const returnAllUsersExceptFriends = (friends, currentUserId) => {
  let {allUsers} = useSelector(state => state.user)
  let usersNotIncludingCurrentUser = allUsers.filter(u => u.uid != currentUserId) 
  return usersNotIncludingCurrentUser.filter(u => !friends.includes(u.id))

}