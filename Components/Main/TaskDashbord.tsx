'use client'
import React, { useContext, useState } from 'react'
import MonthCalender from './MonthCalender'
import TaskList from './TaskList'
import { appContext } from '@/ContextApi/AppContext' 
import AddTaskModal from '../Modals/AddTaskModal'
import EditTaskModal from '../Modals/EditTaskModal'
import ViewTaskModal from '../Modals/ViewTaskModal'

const TaskDashboard = () => {

  const {taskData, addTaskStatus, editTaskStatus, viewTaskStatus, month, year, selectedDate} = useContext(appContext)


  const [string, setString] = useState(new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 18 ? "Afternoon" : "Evening")
  return (
    <div className='flex-1 sm:h-[80vh]'>
      <div className='mb-4'>
        <h2 className='text-[1.5rem] font-bold'>{`Good ${string}!`}</h2>
        <p className='text-[1rem] text-gray-400'>You've got some task to do.</p>
      </div>
      {
      }
      <MonthCalender month={month} year={year} />
      <TaskList />
      {addTaskStatus && <AddTaskModal />}
      {editTaskStatus && <EditTaskModal />}
      {viewTaskStatus && <ViewTaskModal />}

    </div>
  )
}

export default TaskDashboard