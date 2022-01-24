import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from './DayList';
import Appointment from './Appointment';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from 'helpers/selectors';
import { resolvePlugin } from '@babel/core';




export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // console.log(state);
  
  /**
   * Import helper functions
   * */
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const setDay = day => setState({...state, day});


  /**
   * Bring the data from database at first
   * render only one time -> dependency is empty array */
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      const [days, appointments, interviewers] = all.map(res => res.data);
      setState(prev => ({...prev, days, appointments, interviewers}));
    }).catch(err => console.log(err.message));
  }, []);


  /**
   * Functions to pass to the <Appointment />
   */
  const bookInterview = (id, interview, cb) => {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // setState(prev => ({...prev, appointments}));
    // setState({...state, appointments});
    axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        console.log('saved');
        setState(prev => ({...prev, appointments}));
        cb('SHOW');
      })
      .catch(err => console.log(err.message));
  };



  const cancelInterview = (id, cb) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    axios.delete(`api/appointments/${id}`)
      .then(() => {
        console.log("deleted");
        setState(prev => ({...prev, appointments}));
        cb('EMPTY')
      })
      .catch(err => console.log(err.message));
  };



  //Mapping <Appointment />, show all appointments of each day
  const scheduleList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (<Appointment key={appointment.id} {...appointment} interview={interview} day={state.day} interviewers={dailyInterviewers} bookInterview={bookInterview} cancelInterview={cancelInterview}/>)
  })



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
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {scheduleList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}