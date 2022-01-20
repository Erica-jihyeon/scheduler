export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(item => item.name === day);
  
  const result = [];
  if (filteredDay.length !== 0) {
    filteredDay[0].appointments.map(num => {
      result.push(state.appointments[num]);
    })
  }
  return result;
}
