import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  ///display the questions on a list
  const getQuestions = () => {
    fetch("http://localhost:4000/questions")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setQuestions(data);

        console.log(data);
      });
  };
  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />

      {page === "Form" ? (
        <QuestionForm />
      ) : (
        <QuestionList questions={questions} />
      )}
    </main>
  );
}

export default App;
