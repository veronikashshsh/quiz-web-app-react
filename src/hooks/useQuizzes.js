import { useEffect, useState } from "react";
import { createQuiz, getQuizzes } from "../services/quizService";



export function useQuizzes(isGuest) {
    const [quizzes, setQuizzes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(isGuest) {
            loadFromLocalStorage();
        } else {
            loadFromFirebase();
        }
}, [isGuest]);

function loadFromLocalStorage() {
    try {
        const item = localStorage.getItem('quizzes');
        if (item && item !== 'undefined') {
            const parsed = JSON.parse(item);
            if (Array.isArray(parsed)) {
                setQuizzes(parsed);
            }
        }
    } catch (error) {
        console.error('Error reading quizzes from localStorage:', error);
        setQuizzes([]);
    }
}


async function loadFromFirebase() {
    setIsLoading(true);
    setError(null);
    try {
        const data = await getQuizzes();
        setQuizzes(data);
    } catch (err) {
        console.error("Error while loading quizzes", err);
        setError("Failed to load quizzes. Please try again.");
    } finally {
        setIsLoading(false);
    }
}

async function addQuiz(name) {
    if(isGuest) {
        const newQuiz = { name, successRate: 0, flashcards: [] };
        const updated = [...quizzes, newQuiz];
        setQuizzes(updated);
        localStorage.setItem('quizzes', JSON.stringify(updated));
    } else {
        try {
            await createQuiz(name);
            await loadFromFirebase();
        } catch (err) {
            console.error("Error while creating quiz", err);
            setError("Failed to create quiz. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }
}

async function deleteQuiz(quizId, index) {
    if(isGuest) {
        const updated = quizzes.filter((_, i) => i !== index);
        setQuizzes(updated);
        localStorage.setItem('quizzes', JSON.stringify(updated));
    } else {
        setIsLoading(true);
        try{
            await deleteQuiz(quizId);
            await loadFromFirebase();
        } catch (err) {
            console.error("Error while deleting quiz", err);
            setError("Failed to delete quiz. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }
}

return { quizzes, isLoading, error, addQuiz, deleteQuiz, quizzesCount: quizzes.length };

}
