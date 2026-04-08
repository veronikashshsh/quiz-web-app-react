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
    const updated = [...localQuiz.flashcards, newCard]; // Створюємо новий масив з доданою карткою

    setLocalQuiz({ ...localQuiz, flashcards: updated }); // Оновлюємо стан з новим масивом карток
    
    if(isGuest) {
      const all = JSON.parse(localStorage.getItem('quizzes')) || [];
      const newAll = all.map(q => q.name === localQuiz.name ? { ...q, flashcards: updated } : q); // Оновлюємо масив квізів в localStorage
      localStorage.setItem('quizzes', JSON.stringify(newAll));
    } else {
      await updateFlashcards(localQuiz.id, updated); // Оновлюємо дані на сервері
    }  

    return true;
  }

  async function deleteFlashcard(index) {
    const updated = localQuiz.flashcards.filter((_, i) => i !== index); // Створюємо новий масив без видаленої картки
    setLocalQuiz({ ...localQuiz, flashcards: updated }); // Оновлюємо стан з новим масивом карток

    if(isGuest) {
      const all = JSON.parse(localStorage.getItem('quizzes')) || []; // Отримуємо всі квізи з localStorage
      const newAll = all.map(q => q.name === localQuiz.name ? { ...q, flashcards: updated } : q); // Оновлюємо масив квізів в localStorage
      localStorage.setItem('quizzes', JSON.stringify(newAll)); // Зберігаємо оновлений масив квізів в localStorage
    } else {
      await updateFlashcards(localQuiz.id, updated); // Оновлюємо дані на сервері
    }

  }
   return { localQuiz, addFlashcard, deleteFlashcard };
}