import { useSelector } from "react-redux";

export const returnCooperationBasedOnId = (id) => {
  let {user} = useSelector(state => state.user)
  return
}

export const returnMultipleCooperationBasedOnIds = (ids) => {
  //let {user} = useSelector(state => state.user)
  //let {cooperations} = useSelector(state => state.cooperations)
  //console.log("cooperations", cooperations)
  //TODO: id her??
  //return cooperations.filter(c => ids.includes(c))
}
