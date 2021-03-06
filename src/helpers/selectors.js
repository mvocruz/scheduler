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

export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  let selectedDay = state.days.filter(eachDay => eachDay.name === day);
  
  if (selectedDay.length === 0) {
    return [];
  }
  let interviewersIds = selectedDay[0].interviewers;
  
  let selectedInterviewers = []; 
  
  for (let id of interviewersIds) {
   if (state.interviewers[id])
    {
    selectedInterviewers.push(state.interviewers[id]);
    }
 }
  return selectedInterviewers;
};

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }  
  let selectedInterview = {}; 
  let student = interview['student'];
  let targetInterviewer = interview.interviewer;
  
  for (let id in state.interviewers) {
    if (state.interviewers[id].id === targetInterviewer) {
      let interviewer = state.interviewers[id];
      let newInterview = { student, interviewer }; 
      Object.assign(selectedInterview, newInterview);
    } 
  }
  return selectedInterview;
};