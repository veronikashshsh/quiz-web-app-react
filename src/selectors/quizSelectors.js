export const getQuizzesCount = (quizzes) => quizzes.length;

export const getCardsStudied = (quizzes) => quizzes.reduce((sum, q) => 
    sum + (q.flashcards?.length || 0), 0);

export const getAverageSuccessRate = (quizzes) => {
    if(quizzes.length === 0) return null;
    const totalRate = quizzes.reduce((sum, q) => sum + (q.successRate || 0), 0);
    return (totalRate / quizzes.length).toFixed(2);
}