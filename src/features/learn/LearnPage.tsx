import NavBar from "../../components/General/NavBar"
import QuizArea from "../../components/Learn/QuizArea"

const LearnPage = () => {
  return (
    <div className='flex h-screen bg-gray-100'>
        <NavBar />
        <div className='flex-1 p-2'>
       <QuizArea isGuest={false}/>
       </div>
    </div>
  )
}

export default LearnPage