export const convertSecondsToDaysHoursAndMinutes = (s) => {
  let seconds = Number(s);
  let d = Math.floor(seconds / (3600*24));
  let h = Math.floor(seconds % (3600*24) / 3600);
  let m = Math.floor(seconds % 3600 / 60);
  return {
    days: d,
    hours: h,
    minutes: m
  }
}

export const convertHoursToSeconds = (h) => {
  return  h * 60 * 60
}

export const returnFormattedTime = (time) => {
 return time.days + " dager, " + time.hours + " timer, " + time.minutes + " minutter"
}