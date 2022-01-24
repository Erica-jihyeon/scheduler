import { useState, useEffect } from 'react';
import axios from "axios";

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({...state, day});

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
  const bookInterview = (id, interview) => {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({...state, appointments});
      })
  };



  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`api/appointments/${id}`)
      .then(() => {
        console.log("deleted");
        setState(prev => ({...prev, appointments}));
      })
  };

  return { state, setDay, bookInterview, cancelInterview };
}