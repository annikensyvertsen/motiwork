export const checkWhoLeads = (currentUserProgress, friendProgress, currentUserId, friendId) => {
  if(currentUserProgress > friendProgress) return currentUserId
  else return friendId
}