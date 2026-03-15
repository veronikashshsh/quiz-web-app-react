import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuizEditor } from '../../../hooks/useQuizEditor';
import BtnReturnToGuest from '../../guest/components/BtnReturnToGuest';

function QuizEditor() {
  const { quizName } = useParams();
  const { quiz, addFlashcard, deleteFlashcard } = useQuizEditor(quizName);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const success = addFlashcard(question, answer);
    if (success) {
      setQuestion('');
      setAnswer('');
    }
  }

  if (!quiz) return (
    <div className="flex items-center justify-center h-screen text-gray-400 text-sm tracking-widest">
      Loading...
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <BtnReturnToGuest />
        <h1 className="mt-4 text-3xl font-bold text-gray-900 tracking-tight">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-1">
            editing
          </span>
          {quiz.name}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {quiz.flashcards.length} {quiz.flashcards.length === 1 ? 'card' : 'cards'}
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8"
      >
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Question
            </label>
            <input
              className="px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition placeholder:text-gray-300"
              placeholder="e.g. What is React?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Answer
            </label>
            <input
              className="px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition placeholder:text-gray-300"
              placeholder="e.g. A JavaScript library..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-semibold rounded-lg transition"
        >
          + Add card
        </button>
      </form>

      {/* Empty state */}
      {quiz.flashcards.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-sm border border-dashed border-gray-200 rounded-xl">
          No cards yet. Add your first one above.
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {quiz.flashcards.map((fc, i) => (
            <li
              key={i}
              className="flex items-center gap-4 px-5 py-4 bg-white border border-gray-200 rounded-xl hover:border-indigo-200 hover:shadow-sm transition"
            >
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-start gap-2.5">
                  <span className="shrink-0 w-5 h-5 rounded bg-indigo-100 text-indigo-700 text-[11px] font-bold flex items-center justify-center mt-0.5">
                    Q
                  </span>
                  <span className="text-sm text-gray-700">{fc.question}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="shrink-0 w-5 h-5 rounded bg-emerald-100 text-emerald-700 text-[11px] font-bold flex items-center justify-center mt-0.5">
                    A
                  </span>
                  <span className="text-sm text-gray-500">{fc.answer}</span>
                </div>
              </div>
              <button
                onClick={() => deleteFlashcard(i)}
                aria-label="Delete flashcard"
                className="shrink-0 w-7 h-7 rounded-md border border-red-100 text-red-400 hover:bg-red-50 hover:text-red-600 flex items-center justify-center text-lg transition"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default QuizEditor;