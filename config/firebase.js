// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGzZnxsrkN9tGGdZjpYBixmN8CUl17Q_c",
  authDomain: "learnapp-react-12dee.firebaseapp.com",
  projectId: "learnapp-react-12dee",
  storageBucket: "learnapp-react-12dee.firebasestorage.app",
  messagingSenderId: "289988497653",
  appId: "1:289988497653:web:cea86fd1caf40a73dab5bc",
  measurementId: "G-RD4MW79KBG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();