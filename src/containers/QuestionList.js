import React from "react";
import QuestionDetails from "../components/QuestionDetails";
import Paginate from "../components/Paginate";

const QuestionList = ({
  questions,
  numOfQuestions,
  nextQuestions,
  previousQuestions,
  handleClick,
  handleChange,
  activePage,
  selectedId
}) => {
  return (
    <div>
      <section className="questions-list">
        <header>
          <input
            type="text"
            placeholder="Search by Question"
            onChange={handleChange}
          />
        </header>
      </section>
      <ul>
        {questions.map(question => {
          return (
            <li key={question.id}>
              <QuestionDetails question={question} selectedId={selectedId} />
            </li>
          );
        })}
      </ul>
      <Paginate
        nextQuestions={nextQuestions}
        previousQuestions={previousQuestions}
        handleClick={handleClick}
        numOfQuestions={numOfQuestions}
        activePage={activePage}
      />
    </div>
  );
};

export default QuestionList;
