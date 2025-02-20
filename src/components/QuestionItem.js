import React from "react";

function QuestionItem({ question ,handleChange,handleDel}) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDel(id) {
    deleteQuestion(id);
  }

  function handleChange(newCorrectIndex) {
    updatedQuestion(question, newCorrectIndex);
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
