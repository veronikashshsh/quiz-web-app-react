import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function QuizEditor() {
  const { quizName } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('quizzes')) || [];
    const found = all.find((q) => q.name === quizName);
    setQuiz(found);
  }, [quizName]);

  const addFlashcard = () => {
    if (!question || !answer) return;

    const updatedFlashcards = 
    [...quiz.flashcards, { question, answer }];
    const updatedQuiz = { ...quiz, flashcards: updatedFlashcards };

    const all = JSON.parse(localStorage.getItem('quizzes')) || [];
    const updatedAll = all.map((q) => (q.name === quiz.name ? updatedQuiz : q));
    localStorage.setItem('quizzes', JSON.stringify(updatedAll));
    setQuiz(updatedQuiz);
    setQuestion('');
    setAnswer('');
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Editing: {quiz.name}</h1>

      <div className="mb-4">
        <input
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={addFlashcard} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Flashcard
        </button>
      </div>

      <ul className="mt-4">
        {quiz.flashcards.map((fc, i) => (
          <li key={i} className="border-b py-2">
            Q: {fc.question} <br />A: {fc.answer}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizEditor;
