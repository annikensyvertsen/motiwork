import { SET_ALL_CHALLENGES } from "../constants"

export const setActiveChallenges = async (cooperations, dispatch) => {
  let activeChallenges = []
  let activeChallengeWithMembers = {}
    cooperations && cooperations.forEach(cooperation => 
      {
        if(Object.keys(cooperation.activeChallenge).length > 0){
          activeChallengeWithMembers = {
            challenge: cooperation.activeChallenge,
            members: cooperation.members,
            cooperationId: cooperation.id,
            cooperationName: cooperation.name,
          }
          if(activeChallenges.length > 0){
            activeChallenges.forEach(c => {
             if(c.cooperationId !== activeChallengeWithMembers.cooperationId){
               activeChallenges.push(activeChallengeWithMembers)
             }
           })
          }else {
            activeChallenges.push(activeChallengeWithMembers)
          } 
        }
      }
    )     
  await dispatch({type: SET_ALL_CHALLENGES, payload: activeChallenges})
}