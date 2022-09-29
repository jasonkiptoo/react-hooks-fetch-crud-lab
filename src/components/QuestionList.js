import React from "react";
import QuestionItem from "./QuestionItem";
import { useEffect, useState } from "react";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((questions) => {
        setQuestions(questions);
      });
  });

  function deleteQuestion(questionId) {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        const updatedQ = questions.filter((quiz) => {
          return quiz.id !== questionId;
        });
        setQuestions(updatedQ);
      });
  }

  function updatedQuestion(question, newCorrectIndex) {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((res) => res.json())
      .then((newQuestion) => {
        let updatedQuestions = questions.map((quiz) => {
          if (quiz.id === question.id) {
            return newQuestion;
          }
          return quiz;
        });
        setQuestions(updatedQuestions);
      });
  }

  const quizList = questions.map((question) => {
    return (
      <QuestionItem
        key={question.id}
        question={question}
        updatedQuestion={updatedQuestion}
        deleteQuestion={deleteQuestion}
      />
    );
  });

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{quizList}</ul>
    </section>
  );
}

export default QuestionList;
