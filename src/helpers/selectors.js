export function getAppointmentsForDay(state, day) {
  //find the day(return like ["Monday"])
  const filteredDay = state.days.filter(item => item.name === day);
  
  const result = [];
  /**
   * if day is not found then return empty array
   * otherwise return an array of the appointments info object
   * */
  if (filteredDay.length !== 0) {
    filteredDay[0].appointments.map(num => {
      return result.push(state.appointments[num]);
    })
  }

  return result;
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null
  }
  return {
    "student": interview.student,
    "interviewer": state.interviewers[interview.interviewer]
  }
}


export function getInterviewersForDay(state, day) {
  //find the day(return the object)
  const filteredDay = state.days.find(item => item.name === day);
  const result = [];

  if (filteredDay) {
    filteredDay.interviewers.map(num => {
      return result.push(state.interviewers[num]);
    })
  }

  return result;
}
