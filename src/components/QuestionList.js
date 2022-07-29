import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])
  
  useEffect(()=> {
    fetch("http://localhost:4000/questions")
    .then(r=>r.json())
    .then(questions => setQuestions(questions))
  },[])

  function handleDelete(deletedId) {
    const updatedQuestions = questions.filter(question => question.id !== deletedId)
    setQuestions(updatedQuestions)
  }

  function handleUpdate(updatedQuestion) {
    const updatedQuestions = questions.map(question => {
      if(question.id === updatedQuestion.id) {
        return updatedQuestion
      } else {
        return question
      }
    })
    setQuestions(updatedQuestions)
  }

  const questionsItem = questions.map(quest => {
    return <QuestionItem 
            key={quest.id} 
            question={quest}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate} />
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionsItem}</ul>
    </section>
  );
}

export default QuestionList;
