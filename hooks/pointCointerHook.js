import { useState, useEffect } from "react";

export const countPoints = (minutes) => {
  let points = (minutes - (minutes%10))
  return{
     points
  }
}