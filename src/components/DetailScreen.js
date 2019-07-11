import React, { useState, useEffect } from "react";

const DetailScreen = props => {
  const questionAPI =
    "https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions/" +
    props.id;

  const [question, setQuestion] = useState([]);

  const fetchQuestionAPI = async () => {
    const response = await fetch(questionAPI);
    return await response.json();
  };

  useEffect(() => {
    fetchQuestionAPI().then(data => {
      setQuestion(data);
    });
  }, [fetchQuestionAPI]);

  return (
    <div>
      <h1>{question.Question}</h1>
    </div>
  );
};

export default DetailScreen;
