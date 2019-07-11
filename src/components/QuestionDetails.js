import React from "react";

const questionAPI =
  "https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions/";

const QuestionDetails = ({ question }) => {
  const handleClick = id => {
    fetch(questionAPI + id);
  };

  return (
    <div className="question-item">
      <div className="box-info" onClick={handleClick(question.id)}>
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
