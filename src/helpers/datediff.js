import { differenceInCalendarDays, differenceInHours, differenceInMinutes } from "date-fns";

const dateDiff = (date) => {
  const now = new Date()

  const actDate = new Date(date)
  const daysDiff =  differenceInCalendarDays(now, actDate)
  const hoursDiff = differenceInHours(now, actDate)
  const minutesDiff = differenceInMinutes(now, actDate)

  if(daysDiff !== 0){
      return daysDiff + " days ago "
  } else if(hoursDiff !== 0){
      return differenceInHours(now, actDate) + " hours ago "
  } else if(minutesDiff !== 0){
    return differenceInMinutes(now, actDate) + " mins ago "
  }else{
    return "Now"
  }
}

export default dateDiff
