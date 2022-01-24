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
const EDIT = "EDIT";

export default function Appointment(props) {
  console.log(props)

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  /**
   * save the new interview
   */
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview, transition);
  }


  /**
   * Delete the interview 
   * */
  const confirmDelete = () => {
    transition(CONFIRM);
    // transition(DELETING);
    // props.cancelInterview(props.id, transition);
  }
  const confirm = () => {
    transition(DELETING);
    props.cancelInterview(props.id, transition);
  }

  /**
   * Edit the interview
   */
  const edit = () => {
    transition(EDIT);
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={confirmDelete}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === SAVING && <Status message={`Saving`} />}
      {mode === DELETING && <Status message={`Deleting`} />}
      {mode === CONFIRM && <Confirm onConfirm={confirm} onCancel={back} message={`Are you sure you would like to delete?`} />}
      {mode === EDIT && (<Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}

    </article>
  );
}