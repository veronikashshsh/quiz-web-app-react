import { useState, useEffect } from 'react';
import { updateFlashcards } from '../services/quizService';
import { Quiz } from '../types/quiz';

export function useQuizEditor(quiz: Quiz, isGuest: boolean) {
  const [localQuiz, setLocalQuiz] = useState<Quiz>(quiz);

  useEffect(() => {
    setLocalQuiz(quiz);
  }, [quiz]);

  async function addFlashcard(question: string, answer: string): Promise<boolean> {
    if(!question.trim() || !answer.trim()) return false;

    const newCard = { question:question.trim(), answer: answer.trim() };
    const updatedCards = [...localQuiz.flashcards, newCard]; 
     const updatedQuiz = { ...localQuiz, flashcards: updatedCards };

    setLocalQuiz(updatedQuiz); 
    
    if(isGuest) {
      const allQuizzes: Quiz[] = JSON.parse(localStorage.getItem('quizzes') || '[]');
      const newAll = allQuizzes.map(q => q.name === localQuiz.name ? { ...q, flashcards: updatedCards } : q); 
      localStorage.setItem('quizzes', JSON.stringify(newAll));
    } else {
        if (localQuiz.id) {
        await updateFlashcards(localQuiz.id, updatedCards);
      }
    }  

    return true;
  }

  async function deleteFlashcard(index: number): Promise<void> {
    const updatedCards = localQuiz.flashcards.filter((_, i) => i !== index); 
    const updatedQuiz = { ...localQuiz, flashcards: updatedCards };

    setLocalQuiz(updatedQuiz); 

    if (isGuest) {
      const allQuizzes: Quiz[] = JSON.parse(localStorage.getItem('quizzes') || '[]'); 
      const newAll = allQuizzes.map(q => 
        q.name === localQuiz.name ? { ...q, flashcards: updatedCards } : q
      ); 
      localStorage.setItem('quizzes', JSON.stringify(newAll)); 
    } else {
      if (localQuiz.id) {
        await updateFlashcards(localQuiz.id, updatedCards); 
      }
    }
  }

  
   return { localQuiz, addFlashcard, deleteFlashcard };
}