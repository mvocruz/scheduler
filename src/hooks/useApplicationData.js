import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData(initial) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day }); 

  useEffect(() => {
    const days = 'http://localhost:8001/api/days';
    const appointments = 'http://localhost:8001/api/appointments';
    const interviewers = 'http://localhost:8001/api/interviewers';

    Promise.all([
      axios.get(days),
      axios.get(appointments),
      axios.get(interviewers)
    ])
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  },[]);

  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = [
      ...state.days
    ]

    state.days.forEach((day, index) => {
      const appointmentsToCount = day.appointments;
      let spots = 0;
      for (let i of appointmentsToCount){
        if (!appointments[i].interview) {
          spots ++;
        }
      }
      days[index].spots = spots;  

    });

    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(() => {
      setState({
        ...state,
        appointments
      });
    })
  }

  function cancelInterview(id) {
    
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments, [id]: appointment
    };

    const days = [
      ...state.days
    ]

    state.days.forEach((day, index) => {
      const appointmentsToCount = day.appointments;
      let spots = 0;
      for (let i of appointmentsToCount){
        if (!appointments[i].interview) {
          spots ++;
        }
      }
      days[index].spots = spots;  

    }) 

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {
      console.log("deleted")
      setState({
        ...state, appointments  
      });
    })
  }

  
  
  return { state, setState, setDay, bookInterview, cancelInterview };
};