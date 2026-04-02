import {
  collection,
  doc,
  setDoc,
  getDocs,
  serverTimestamp
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

function waitForUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged (auth, (user) => {
      unsubscribe(); // відписуємось одразу після першого спрацювання
      if (user) {
        resolve(user);
      } else {
        reject(new Error("Користувач не залогінений"));
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

// Отримати всі квізи
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