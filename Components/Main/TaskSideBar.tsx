'use client'
import React, { useContext } from 'react'
import Calendar from './Calenda'
import AddTask from './AddTask'
import EditTask from './EditTask'
import ViewTask from './ViewTask'
import { appContext } from '@/ContextApi/AppContext' 
import CreateTaskBtn from './CreateTaskBtn'

const TaskSideBar = () => {

    const { taskData, year, month, addTaskStatus, viewTaskStatus, editTaskStatus } = useContext(appContext);

  return (
    <div className='hidden sm:flex w-4/12 flex-col items-end gap-10'>
        <CreateTaskBtn />
        {(!addTaskStatus && !viewTaskStatus && !editTaskStatus) && <Calendar year={year} month={month} />}
        {addTaskStatus && <AddTask />}
        {editTaskStatus && <EditTask />}
        {viewTaskStatus && <ViewTask />}
    </div>
  )
}

export default TaskSideBar