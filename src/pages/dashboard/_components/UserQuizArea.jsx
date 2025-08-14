import React, {useState, useEffect} from 'react'

function UserQuizArea({Rate}) {

   return (
  <div className="p-8 md:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-gray-100">
      My Quizzes
    </h1>

    <button
      className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-semibold px-6 py-3 rounded-md shadow-md transition-colors duration-200 focus:outline-none"
      aria-label="Add new quiz"
    >
      Додати новий тест
    </button>

    {/* Modal Window */}
    {showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md transition-transform transform scale-100 md:scale-105">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
            Введіть назву тесту
          </h2>

          <input
            type="text"
            value={quizName}
            
            placeholder="Наприклад: English Words"
            className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            autoFocus
          />

          <div className="flex justify-end space-x-3">
            <button
              
              className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-5 py-2 rounded-md shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Скасувати
            </button>

            <button
              
              className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white px-5 py-2 rounded-md shadow-md font-semibold transition-colors duration-150 focus:outline-none"
              disabled={!quizName.trim()}
            >
              Створити
            </button>
          </div>
        </div>
      </div>
    )}

   
  </div>
);
}
export default UserQuizArea;
