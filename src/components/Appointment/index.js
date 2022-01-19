import React, { useState } from "react";

import "components/Appointment/styles.scss";


export default function Appointment(props) {
  
  return (
    <article className="appointment">{!props.time ? "no appointments" : `Appointment at ${props.time}`}</article>
  );
}