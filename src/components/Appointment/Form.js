import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    return props.onCancel();
  }


  /**
   * Form validation
   */
  const validation = () => {
    if (student === "") {
      setError2("");
      setError1("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError1("");
      setError2("Please select the interviewer");
      return;
    }
    setError1("");
    setError2("");
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error1}</section>
        <InterviewerList
          interviewers={props.interviewers}
          onChange={setInterviewer}
          value={interviewer}
        />
        <section className="appointment__validation">{error2}</section>
      </section>
      
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validation}>Save</Button>
        </section>
      </section>
    </main>
  );
}