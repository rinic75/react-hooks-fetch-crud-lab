import React from "react";

function QuestionItem({ question, handleDelete, handleUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
    method: "DELETE",
  })
    .then((r) => r.json())
    .then(() => handleDelete(id))
  }

  function handleChange(e) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex : parseInt(e.target.value)
      }),
    })
      .then((r) => r.json())
      .then((updatedQ) => handleUpdate(updatedQ));
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
        <select defaultValue={correctIndex} onChange={handleChange}>{options}</select>
      </label>
      <button onClick={handleClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
