import React from "react";

import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import { useVisualMode } from "../../hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  // console.log(props)

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview, transition);
  }


  //delete the interview
  const cancel = () => {
    transition(CONFIRM);
    // transition(DELETING);
    // props.cancelInterview(props.id, transition);
  }
  const onConfirm = () => {
    transition(DELETING);
    props.cancelInterview(props.id, transition);
  }
  const onCancel = () => {
    back();
  }
  


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={cancel}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status message={`Saving`}/>}
      {mode === DELETING && <Status message={`Deleting`}/>}
      {mode === CONFIRM && <Confirm onConfirm={onConfirm} onCancel={onCancel} message={`Are you sure you would like to delete?`}/>}

    </article>
  );
}