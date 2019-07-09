import React from "react";

const QuestionDetails = ({ question }) => {
  //   debugger;
  return (
    <div className="question-item">
      <div className="box-info">
        <div className="box-info--content">
          <div className="description">
            <img src={question.thumb_url} alt={question.id} />
            <h1>{question.question}</h1>
            <p>{question.description}</p>
          </div>
        </div>
        <div className="box-info--footer" />
      </div>
    </div>
  );
};

export default QuestionDetails;
