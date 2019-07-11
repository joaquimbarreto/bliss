import React from "react";

const QuestionDetails = ({ question, selectedId }) => {
  return (
    <div className="question-item">
      <div className="box-info" onClick={selectedId(question.id)}>
        <div className="box-info--content">
          <div className="description">
            <img src={question.thumb_url} alt={question.id} />
            <h1>{question.question}</h1>
          </div>
        </div>
        <div className="box-info--footer" />
      </div>
    </div>
  );
};

export default QuestionDetails;
