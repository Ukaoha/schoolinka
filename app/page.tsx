import Footer from '@/Components/Footer/Footer';
import TaskDashboard from '@/Components/Main/TaskDashbord';
import TaskSideBar from '@/Components/Main/TaskSideBar';
import Navbar from '@/Components/Navbar/Navbar'
import Pagination from '@/Components/Pagination/Pagination';

export default function Home() {
  const currentDate = new Date();
  const year = currentDate.getFullYear(); // Get the current year
  const month = currentDate.getMonth() + 1; 
  
  return (
    <main className="flex min-h-screen flex-col items-center">
    <Navbar />
    <div className='flex w-10/12 mt-8 overflow-x-hidden overflow-y-hidden'>
      <TaskDashboard />
      <TaskSideBar/>
    </div>
    <div className='flex w-10/12 mt-2 overflow-x-hidden overflow-y-hidden'>
      <Pagination/>
    </div>
    <div>
        <Footer/>
      </div>

  </main>

  )
}
