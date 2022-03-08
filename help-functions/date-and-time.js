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
export const convertSecondsToHoursAndMinutes = (s) => {
  let seconds = Number(s);
  let h = Math.floor(seconds / 3600);
  let m = Math.floor(seconds % 3600 / 60);
  return {
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

export const formatTimeToClock = (t) => {
  let hours = Math.floor(t/3600)
  let minutes = 0
  let seconds = 0
  let formatted = ""

  if(hours > 0){
    minutes = Math.floor(t % 3600 / 60).toString()
    seconds = Math.floor(t % 3600 % 60).toString()
    
  }else{
    minutes = Math.floor(t / 60);
    seconds = Math.floor(t - minutes * 60)
  }
  if(hours < 10){
    hours = "0" + hours
  }
  if(minutes < 10){
    minutes = "0" + minutes
  }
  if(seconds < 10){
   seconds = "0" + seconds
  }
  formatted = hours + " : " + minutes + " : " + seconds
  return formatted
}

export const convertHousAndMinutesToSeconds = (h, m) => {
  let seconds = (m + (60* h))*60
  return seconds
}

export const calculateDaysLeft = (deadline) => {
  let deadlineInSeconds = deadline
  let todayInSeconds = new Date().getTime()/1000

  let timeLeft = deadlineInSeconds-todayInSeconds
  return convertSecondsToDaysHoursAndMinutes(timeLeft).days

  // let daysLeft = new Date(timeLeft)
}

export const returnFormattedDate = (seconds) => {
  let options = { year: 'numeric', month: 'long', day: 'numeric' };
  let date = new Date(seconds*1000) 
  return new Intl.DateTimeFormat('no', options).format(date)
} 