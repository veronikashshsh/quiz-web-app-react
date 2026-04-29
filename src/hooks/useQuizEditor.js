import { useState, useEffect } from 'react';
import { updateFlashcards } from '../services/quizService';

export function useQuizEditor(quiz, isGuest) {
  const [localQuiz, setLocalQuiz] = useState(quiz);

  useEffect(() => {
    setLocalQuiz(quiz);
  }, [quiz]);

  async function addFlashcard(question, answer) {
    if(!question.trim() || !answer.trim()) return false;

    const newCard = { question:question.trim(), answer: answer.trim() };
    const updated = [...localQuiz.flashcards, newCard]; 

    setLocalQuiz({ ...localQuiz, flashcards: updated }); 
    
    if(isGuest) {
      const all = JSON.parse(localStorage.getItem('quizzes')) || [];
      const newAll = all.map(q => q.name === localQuiz.name ? { ...q, flashcards: updated } : q); 
      localStorage.setItem('quizzes', JSON.stringify(newAll));
    } else {
      await updateFlashcards(localQuiz.id, updated);
    }  

    return true;
  }

  async function deleteFlashcard(index) {
    const updated = localQuiz.flashcards.filter((_, i) => i !== index); 
    setLocalQuiz({ ...localQuiz, flashcards: updated }); 

    if(isGuest) {
      const all = JSON.parse(localStorage.getItem('quizzes')) || []; 
      const newAll = all.map(q => q.name === localQuiz.name ? { ...q, flashcards: updated } : q); 
      localStorage.setItem('quizzes', JSON.stringify(newAll)); 
    } else {
      await updateFlashcards(localQuiz.id, updated); 
    }

  }
   return { localQuiz, addFlashcard, deleteFlashcard };
}