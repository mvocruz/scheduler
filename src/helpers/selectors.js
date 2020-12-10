export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  let selectedDay = state.days.filter(eachDay => eachDay.name === day);
  
  if (selectedDay.length === 0) {
    return [];
  }
  let appointmentsIds = selectedDay[0].appointments;
  
  let selectedAppointments = []; 
  
  for (let id of appointmentsIds) {
   if (state.appointments[id])
    {
    selectedAppointments.push(state.appointments[id]);
    }
 }
  return selectedAppointments;
};

