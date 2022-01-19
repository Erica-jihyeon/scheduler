import React from "react";
import InterviewerListItem from './InterviewerListItem';
import "components/InterviewerList.scss";

export default function DayList(props) {

  const listInterviewers = props.interviewers.map((interviewer) => {
    const propObj = {
      ...interviewer,
      selected: interviewer.id === props.interviewer,
      setInterviewer: props.setInterviewer
    };
    return <InterviewerListItem key={interviewer.id} {...propObj}/>
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {listInterviewers}
      </ul>
    </section>
  );
}