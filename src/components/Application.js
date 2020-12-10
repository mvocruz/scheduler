import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";


export default function Application(props) {
  
  
  const [state, setState] = useState({
    day: [],
    days: [],
    appointments: {}
  });

  const setDay = (day) => {
    setState({ ...state, day });
  };  
  // const setDays = (days) => {
  //   setState(prev => ({ ...prev, days }));
  // };

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

  const dailyAppointments = getAppointmentsForDay(state, state.day)

  const listAppointments = dailyAppointments.map(appointment => {
    return (
      <Appointment
        key={appointment.id} 
        time={appointment.time} 
        interview={appointment.interview ? appointment.interview : null}  
      />
    );
  }); 
  
  

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
      <DayList
        days={state.days}
        day={state.day}
        setDay={setDay}
      /> 
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {listAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
