import { useSelector } from "react-redux";

export const returnCooperationBasedOnId = (id) => {
  let {cooperations} = useSelector(state => state.cooperations)
  return cooperations.find(c => c.id === id)
}

