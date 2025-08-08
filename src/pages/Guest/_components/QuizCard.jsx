import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function QuizCard({ cardName, successRate, onDelete }) {
   const [Rate, setRate] = useState(10);

   const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/quiz/edit/${cardName}`);
  };

  const handleStart = () => {
    navigate(`/quiz/${cardName}`);
  };

   const handleQuizRate = () => {
    setRate(

    )
  }

  return (
  <div
    className="
      card 
      border 
      p-6 
      m-4 
      rounded-lg 
      shadow-md 
      bg-white 
      w-80 
      transition-all 
      duration-300 
      ease-in-out
      hover:shadow-xl
      hover:-translate-y-1
      "
  >
    <button className='text-red-900' onClick={onDelete}> x </button>
    <h1 className="text-xl font-bold mb-3 text-[#4E5174]">
      {cardName}
    </h1>
    <p className="text-gray-600 mb-6" onChange={handleQuizRate}>
      Success rate: {Rate}%
    </p>

    <div className="flex gap-4">
      <button
        onClick={handleEdit}
        className="
          flex-1 
          bg-blue-500 
          hover:bg-blue-700 
          focus:bg-blue-700 
          text-white 
          font-semibold 
          py-2 
          rounded 
          transition-colors 
          duration-300 
          ease-in-out 
          shadow-sm 
          hover:shadow-lg
          focus:outline-none
          focus:ring-2
          focus:ring-blue-300
          "
        aria-label="Edit quiz"
      >
        Edit
      </button>

      <button
        onClick={handleStart}
        className="
          flex-1 
          bg-blue-500 
          hover:bg-blue-700 
          focus:bg-blue-700 
          text-white 
          font-semibold 
          py-2 
          rounded 
          transition-colors 
          duration-300 
          ease-in-out 
          shadow-sm 
          hover:shadow-lg
          focus:outline-none
          focus:ring-2
          focus:ring-blue-300
          "
        aria-label="Start quiz"
      >
        Start
      </button>
    </div>
  </div>
);
}

export default QuizCard