import React from "react";
import DayListItem from './DayListItem';

export default function DayList(props) {

  const listDays = props.days.map((day, index) => {
    const propObj = {
      ...day,
      selected: day.name === props.day,
      setDay: props.setDay
    }
    return <DayListItem key={day.id} {...propObj} />
  })
  
  return (
    <ul>
      {listDays}
    </ul>
  );
}