import {
  collection,
  doc,
  setDoc,
  getDocs,
  serverTimestamp,
  deleteDoc,
  updateDoc,
  getDoc,
  DocumentData,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { Quiz, Flashcard } from "../types/quiz";

function waitForUser(): Promise<User> {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        reject(new Error("User not authenticated"));
      }
    });
  });
}

export async function createQuiz(name: string): Promise<Quiz> {
  const user = await waitForUser();
  const ref = doc(collection(db, "users", user.uid, "quizzes"));

  const newQuiz = {
    name,
    successRate: 0,
    flashcards: [] as Flashcard[],
    createdAt: serverTimestamp(),
  };

  await setDoc(ref, newQuiz);

  // повертаємо реальний id одразу, без повторного read
  return {
    id: ref.id,
    name,
    successRate: 0,
    flashcards: [],
  };
}

export async function getQuizzes(): Promise<Quiz[]> {
  const user = await waitForUser();
  const ref = collection(db, "users", user.uid, "quizzes");
  const snapshot = await getDocs(ref);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<Quiz, "id">),
  }));
}

export async function deleteQuiz(quizId: string): Promise<void> {
  const user = await waitForUser();
  const ref = doc(db, "users", user.uid, "quizzes", quizId);
  await deleteDoc(ref);
}

export async function getQuizById(quizId: string): Promise<Quiz | null> {
  const user = await waitForUser();
  const ref = doc(db, "users", user.uid, "quizzes", quizId);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...(snapshot.data() as Omit<Quiz, "id">) };
}

export async function updateFlashcards(
  quizId: string,
  flashcards: Flashcard[]
): Promise<void> {
  const user = await waitForUser();
  const ref = doc(db, "users", user.uid, "quizzes", quizId);
  await updateDoc(ref, { flashcards });
}

export async function calculateSuccessRate(quizId: string): Promise<number> {
  const user = await waitForUser();
  const ref = doc(db, "users", user.uid, "quizzes", quizId);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) throw new Error("Quiz not found");

  const quizData = snapshot.data() as DocumentData;
  const flashcards: Flashcard[] = quizData.flashcards ?? [];
  const total = flashcards.length;
  const correct = flashcards.filter((card) => card.isCorrect).length;
  const successRate = total > 0 ? Math.round((correct / total) * 100) : 0;

  await updateDoc(ref, { successRate });
  return successRate;
}

export async function learnQuiz(
  quizId: string,
  results: boolean[]
): Promise<number> {
  const user = await waitForUser();
  const ref = doc(db, "users", user.uid, "quizzes", quizId);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) throw new Error("Quiz not found");

  const quizData = snapshot.data() as DocumentData;
  const flashcards: Flashcard[] = quizData.flashcards ?? [];

  const updatedFlashcards = flashcards.map((card, index) => ({
    ...card,
    isCorrect: results[index] === true,
  }));

  await updateDoc(ref, { flashcards: updatedFlashcards });
  return calculateSuccessRate(quizId);
}