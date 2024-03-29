import React from "react";

import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import { useVisualMode } from "../../hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

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
    
    props.bookInterview(props.id, interview, mode)
      .then(() => {
        transition('SHOW');
      })
      .catch(err => {
        transition('ERROR_SAVE', true);
      });
  }


  /**
   * Delete the interview 
   * */
  const confirmDelete = () => {
    transition(CONFIRM);
  }
  const destroy = () => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(err => {
        console.log(err.message);
        transition('ERROR_DELETE', true);
      });
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
      {mode === CONFIRM && <Confirm onConfirm={destroy} onCancel={back} message={`Are you sure you would like to delete?`} />}
      {mode === EDIT && (<Form
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />
      )}
      {(mode === ERROR_SAVE) && <Error message={`Could not save the appointment`} onClose={back} />}
      {(mode === ERROR_DELETE) && <Error message={`Could not cancel the appointment`} onClose={back} />}

    </article>
  );
}