import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from 'prop-types';

export default function InterviewerList(props){

  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };

  const interviewerList = props.interviewers.map(interviewer => {
  
    return (
      <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name} 
        avatar={interviewer.avatar}
        selected={props.interviewer && (interviewer.id === props.interviewer.id)}
        setInterviewer={event => props.setInterviewer(interviewer)}
      />
    );
  });

    return (
      <>
      <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">
          {interviewerList}
        </ul>
      </section>
      </>
    );
}
