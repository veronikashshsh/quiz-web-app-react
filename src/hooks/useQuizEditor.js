import { useState, useEffect } from 'react';

// Одне місце для всієї роботи з localStorage
// Якщо завтра перейдеш на БД — міняєш тільки цей файл
function saveQuizzesToStorage(quizzes) {
  localStorage.setItem('quizzes', 
    JSON.stringify(quizzes));// зберігаємо масив квізів як JSON-рядок
}

function loadQuizzesFromStorage() {
  return JSON.parse(localStorage.
    getItem('quizzes')) || []; // повертаємо масив квізів або порожній масив, якщо нічого не знайдено
}

// Хук приймає назву квізу і повертає все що потрібно компоненту
// Компонент не знає про localStorage — це не його справа
export function useQuizEditor(quizName) {
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const all = loadQuizzesFromStorage();
    const found = all.find // знаходимо квіз з потрібною назвою
    ((q) => q.name === quizName);
    setQuiz(found || null);
  }, [quizName]);

  // Приватна функція — оновлює квіз в storage і в state одночасно
  // Компонент не повторює цей патерн двічі
  function persistQuiz(updatedQuiz) {
    const all = loadQuizzesFromStorage();
    const updatedAll = all.map // map замінює старий квіз на оновлений, якщо назви співпадають
    ((q) => (q.name === updatedQuiz.name ? updatedQuiz : q));
    saveQuizzesToStorage(updatedAll);
    setQuiz(updatedQuiz);
  }

  function addFlashcard(question, answer) {
    if (!question.trim() || !answer.trim()) return false; // false = не додано
    const updatedQuiz = {
      ...quiz,
      flashcards: [...quiz.flashcards, { question, answer }],
    };
    persistQuiz(updatedQuiz);
    return true; // true = успішно додано
  }

  function deleteFlashcard(indexToDelete) {
    const updatedQuiz = {
      ...quiz,
      flashcards: quiz.flashcards.filter((_, i) => i !== indexToDelete),
    };
    persistQuiz(updatedQuiz);
  }

  return { quiz, addFlashcard, deleteFlashcard };
}