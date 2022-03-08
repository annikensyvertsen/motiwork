import { SET_LOADING, SET_ERROR, SET_GOAL} from '../constants/index'
import { db } from "../../firebase"

export const setUserGoal = async (data, uid, dispatch) => {
  
  dispatch({ 
    type: SET_LOADING,
    payload: true
  })
  const {goalName, reward, startDate, workload, endDate, workloadGoal} = data

  await db.collection('usersCollection').doc(uid).update({
    
    currentGoal: {
      goalName: goalName,
      reward: reward,
      startDate: startDate,
      endDate: endDate,
      workloadGoal: workloadGoal,
      isReached: false,
      workload: workload
    }
  })
  .then(result => 
    dispatch({
      type: SET_GOAL,
      payload: result.data()
    })
    )
  .catch(error => 
    dispatch({ 
      type: SET_ERROR,
      payload: true
    })
  
    )
}

