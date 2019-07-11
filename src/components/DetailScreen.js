import React, { useState, useEffect } from "react";

const questionAPI =
  "https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions/";

const DetailScreen = ({ questionId }) => {
  const [selectedQuestion, setSelectedQuestion] = useState({});

  useEffect(() => {
    fetch(questionAPI + questionId).then(data => setSelectedQuestion(data));
  }, [questionId, selectedQuestion]);

  return (
    <div>
      <img src={selectedQuestion.image_url} alt={selectedQuestion.id} />
      <h1>{selectedQuestion.question}</h1>
    </div>
  );
};

export default DetailScreen;
