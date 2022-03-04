import { SET_ALL_CHALLENGES } from "../constants"

export const setActiveChallenges = async (cooperations, dispatch) => {
  let activeChallenges = []
  console.log("hvor mange ganger kalles denne")
  let activeChallengeWithMembers = {}
  //hvorfor setter den uendelig mange her?
  Object.keys(cooperations).length > 0 && cooperations.forEach(cooperation => 
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
              console.log("c", c.cooperationId, activeChallengeWithMembers.cooperationId)
              //if the cooperation id on activechallengeis not the same as cooperation id
             if(c.cooperationId !== activeChallengeWithMembers.cooperationId){
               activeChallenges.push(activeChallengeWithMembers)
             }
           })
          }else {
            console.log("In here")
            activeChallenges.push(activeChallengeWithMembers)
          } 
        }
      }
    ) 
  await dispatch({type: SET_ALL_CHALLENGES, payload: activeChallenges})
}