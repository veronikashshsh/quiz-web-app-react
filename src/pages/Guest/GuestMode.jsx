import Header from '../mainPage/_components/Header'
import QuizArea from './_components/QuizArea';
import BtnToMain from '../_components/BtnToMain';

function GuestMode() {
    
  return (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
    <Header />

    <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 md:gap-0 m-6 md:m-10 px-4 md:px-0">
      
      <BtnToMain />

      <div className="flex flex-col items-center md:items-start space-y-1 max-w-xl text-center md:text-left">
        <h3 className="text-lg font-semibold">
          You are in Guest Mode
        </h3>
        <h4 className="text-sm text-gray-600 dark:text-gray-400">
          To save all your progress create an account
        </h4>
      </div>
    </div>
   <hr className="border-t border-gray-600 my-4" />


    {/* Основна зона з вікториною */}
    <div className="flex-grow px-4 md:px-10">
      <QuizArea />
    </div>
  </div>
)
}

export default GuestMode