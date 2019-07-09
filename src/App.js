import React, { useState, useEffect } from "react";

import QuestionList from "./containers/QuestionList.js";
import "./App.css";

const API =
  "https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions?question_filter=FILTER";
const numOfQuestionsPerPage = 10;

const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [questionIndex, setQuestionIndex] = useState({
    indexOfFirstQuestion: 0,
    indexOfLastQuestion: 10
  });
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAPI = async () => {
    const response = await fetch(API);
    return await response.json();
  };

  useEffect(() => {
    fetchAPI().then(data => setQuestions(data));
  }, []);

  const filterQuestions = () => {
    const chosenQuestions = [];
    questions.forEach(question => {
      if (searchTerm.length > 0) {
        if (question.question.toLowerCase().includes(searchTerm.toLowerCase()))
          chosenQuestions.push(question);
      }
      chosenQuestions.push(question);
    });
    return chosenQuestions;
  };

  const showQuestions = () => {
    return filterQuestions().slice(
      questionIndex.indexOfFirstQuestion,
      questionIndex.indexOfLastQuestion
    );
  };

  const numQuestionsInChosenQuestions = () => {
    const numOfQuestions = filterQuestions();
    return numOfQuestions.length;
  };

  const nextQuestions = () => {
    const numOfQuestions2 = numQuestionsInChosenQuestions();
    if (numOfQuestions2 <= questionIndex.indexOfLastQuestion) {
      return null;
    }
    setActivePage(activePage + 1);
    setQuestionIndex({
      indexOfFirstQuestion:
        questionIndex.indexOfFirstQuestion + numOfQuestionsPerPage,
      indexOfLastQuestion:
        questionIndex.indexOfLastQuestion + numOfQuestionsPerPage
    });
  };

  const previousQuestions = () => {
    if (questionIndex.indexOfFirstQuestion === 0) {
      return null;
    }
    setActivePage(activePage - 1);
    setQuestionIndex({
      indexOfFirstQuestion:
        questionIndex.indexOfFirstQuestion - numOfQuestionsPerPage,
      indexOfLastQuestion:
        questionIndex.indexOfLastQuestion - numOfQuestionsPerPage
    });
  };

  const handlePaginateClick = page => {
    const newIndexOfLastQuestion = page * numOfQuestionsPerPage;
    const newIndexOfFirstQuestion =
      newIndexOfLastQuestion - numOfQuestionsPerPage;
    setActivePage(page);
    setQuestionIndex({
      indexOfFirstQuestion: newIndexOfFirstQuestion,
      indexOfLastQuestion: newIndexOfLastQuestion
    });
  };

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex-container">
      <QuestionList
        questions={showQuestions()}
        numOfQuestions={numQuestionsInChosenQuestions()}
        nextQuestions={nextQuestions}
        previousQuestions={previousQuestions}
        handleClick={handlePaginateClick}
        handleChange={handleChange}
        activePage={activePage}
      />
    </div>
  );
};

export default Question;
