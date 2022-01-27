/**
 * custom hook for <Application />
 */

import { useState, useEffect } from 'react';
import axios from "axios";

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      const [days, appointments, interviewers] = all.map(res => res.data);
      setState(prev => ({ ...prev, days, appointments, interviewers }));
    }).catch(err => console.log(err.message));
  }, []);


  /**
   * Functions to pass to the <Appointment />
   */
  const bookInterview = (id, interview, mode) => {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const updateSpots = () => {
      const index = state.days.findIndex(e => e.name === state.day);
      const days = [...state.days];
      --days[index].spots;
      setState({ ...state, appointments, days });
    }

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        //CREATE -> --spot, EDIT -> no change spot
        if (mode === "CREATE") {
          updateSpots();
        } else {
          setState({ ...state, appointments });
        }
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
    };
    const updateSpots = () => {
      const index = state.days.findIndex(e => e.name === state.day);
      const days = [...state.days];
      ++days[index].spots;
      setState({ ...state, appointments, days });
    };

    return axios.delete(`api/appointments/${id}`)
      .then(() => {
        updateSpots();
      })
  };

  return { state, setDay, bookInterview, cancelInterview };
}