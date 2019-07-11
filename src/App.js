import React, { useState, useEffect } from "react";
import QuestionList from "./containers/QuestionList.js";
import ServerDown from "./components/ServerDown";
import DetailScreen from "./components/DetailScreen";
import Share from "./components/Share";
import { Route, Switch } from "react-router-dom";
import "./App.css";

const questionsAPI =
  "https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions";

const statusAPI =
  "https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/health";

const numOfQuestionsPerPage = 10;

const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [status, setStatus] = useState("");
  const [questionIndex, setQuestionIndex] = useState({
    indexOfFirstQuestion: 0,
    indexOfLastQuestion: 10
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const fetchQuestionsAPI = async () => {
    const response = await fetch(questionsAPI);
    return await response.json();
  };

  const fetchStatusAPI = async () => {
    const response = await fetch(statusAPI);
    return await response.json();
  };

  useEffect(() => {
    fetchStatusAPI().then(data => {
      if (data.status === "OK") {
        setStatus(data.status);
      }
      setStatus(data.status);
    });
  }, []);

  useEffect(() => {
    if (status === "OK") {
      fetchQuestionsAPI().then(data => setQuestions(data));
    }
  }, [status]);

  const filterQuestions = () => {
    const chosenQuestions = [];
    questions.forEach(item => {
      if (searchTerm.length > 0) {
        if (item.question.toLowerCase().includes(searchTerm.toLowerCase())) {
          return chosenQuestions.push(item);
        }
      } else {
        return chosenQuestions.push(item);
      }
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

  const handleSelectedId = id => {
    setSelectedId(id);
  };

  return (
    <div className="flex-container">
      <Switch>
        {status !== "OK" ? (
          <Route exact path="/serverdown" component={ServerDown} />
        ) : (
          <Route
            path="/"
            render={routerProps => (
              <QuestionList
                {...routerProps}
                questions={showQuestions()}
                numOfQuestions={numQuestionsInChosenQuestions()}
                nextQuestions={nextQuestions}
                previousQuestions={previousQuestions}
                handleClick={handlePaginateClick}
                handleChange={handleChange}
                activePage={activePage}
                selectedId={handleSelectedId}
              />
            )}
          />
        )}
        <Route
          path="/:id"
          render={routerProps => (
            <DetailScreen {...routerProps} questionId={selectedId} />
          )}
        />
      </Switch>
      <Share />
    </div>
  );
};

export default Question;
