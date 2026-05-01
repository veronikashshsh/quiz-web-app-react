import {
  collection,
  doc,
  setDoc,
  getDocs,
  serverTimestamp,
  deleteDoc,
  updateDoc,
  getDoc
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

function waitForUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged (auth, (user) => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        reject(new Error("User not authenticated"));
      }
    });
  });
}

export async function createQuiz(name) {
  const user = await waitForUser(); 
  const ref = doc(collection(db, "users", user.uid, "quizzes"));

  await setDoc(ref, {
    name,
    successRate: 0,
    flashcards: [],
    createdAt: serverTimestamp(),
  });
}

export async function getQuizzes() {
  const user = await waitForUser();
  const ref = collection(db, "users", user.uid, "quizzes");
  const snapshot = await getDocs(ref);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function deleteQuiz(quizId) {
  const user = await waitForUser();
  const ref = doc(db, "users", user.uid, "quizzes", quizId);
  await deleteDoc(ref);
}

export async function getQuizById(quizId) {
  const user = await waitForUser(); // Чекаємо, поки користувач буде визначений
  const ref = doc(db, "users", user.uid, "quizzes", quizId);
  const snapshot = await getDoc(ref); // Отримуємо документ квізу за його ID
  if(!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() }; // Повертаємо об'єкт з id та даними квізу
}

export async function updateFlashcards(quizId, flashcards) {
  const user = await waitForUser();
  const ref = doc(db, "users", user.uid, "quizzes", quizId);
  await updateDoc(ref, { flashcards }); // Оновлюємо тільки поле flashcards, не змінюючи інші дані квізу
}

export async function calculateSuccessRate(quizId) {
  const user = await waitForUser();
  const ref = doc(db, "users", user.uid, "quizzes", quizId);
  const snapshot = await getDoc(ref);
  if(!snapshot.exists()) throw new Error("Quiz not found");
  const quizData = snapshot.data();
  const total = quizData.flashcards.length;
  const correct = quizData.flashcards.filter(card => card.isCorrect).length;
  const successRate = total > 0 ? Math.round((correct / total) * 100) : 0;
  await updateDoc(ref, { successRate });
  return successRate;
}

export async function learnQuiz(quizId, results) {
  const user = await waitForUser();
  const ref = doc(db, "users", user.uid, "quizzes", quizId);
  const snapshot = await getDoc(ref);
  if(!snapshot.exists()) throw new Error("Quiz not found");
  const quizData = snapshot.data();
  const updatedFlashcards = quizData.flashcards.map((card, index) => ({
    ...card,
    isCorrect: results[index] === true, // Оновлюємо статус відповіді для кожної картки
  }));
  await updateDoc(ref, { flashcards: updatedFlashcards });
  return calculateSuccessRate(quizId); // Після оновлення карток, перераховуємо і повертаємо новий відсоток успішності
}