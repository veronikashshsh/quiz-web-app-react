import React, {useState} from 'react'
import { Quiz, UserQuizAreaProps } from '../../types/quiz';
import CreateQuizModal from './CreateQuizModal';

function UserQuizArea({Rate} : UserQuizAreaProps) {
    const [showModal, setShowModal] = useState<boolean>(false);
const [quizName, setQuizName] = useState<string>('');
const [quizzes, setQuizzes] = useState<Quiz[]>([]); 

const toggleModal = () => {
  setShowModal(!showModal);
  setQuizName(''); 
};

const handleCreate = () => {
  if (quizName.trim()) {
    const newQuiz: Quiz = {
      id: Date.now().toString(),
      name: quizName.trim(),
      flashcards: [], 
    };

    setQuizzes((prevQuizzes) => [...prevQuizzes, newQuiz]);
    console.log("Creating quiz:", quizName);
    toggleModal();
  }
};

   return (
  <div className="p-8 md:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-gray-100">
      My Quizzes
    </h1>

    <button
      onClick={toggleModal}
      className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-semibold px-6 py-3 rounded-md shadow-md transition-colors duration-200 focus:outline-none"
      aria-label="Add new quiz"
    >
      Додати новий тест
    </button>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.length === 0 ? (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl">
            <p className="text-gray-400">У вас ще немає створених тестів</p>
          </div>
        ) : (
          quizzes.map((quiz) => (
            <div 
              key={quiz.id} 
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{quiz.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{quiz.flashcards.length} карток</p>
            </div>
          ))
        )}
      </div>
      <CreateQuizModal 
      isOpen={showModal}
      value={quizName}
      onChange={setQuizName}
      onClose={toggleModal}
      onConfirm={handleCreate}
    />
  </div>
);
}
export default UserQuizArea;
