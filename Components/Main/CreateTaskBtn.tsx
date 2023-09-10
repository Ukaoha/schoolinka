'use client'
import { appContext } from '@/ContextApi/AppContext';
import React, { useContext } from 'react'

const CreateTaskBtn = () => {

    const { addTaskStatus, setAddTaskStatus, setEditTaskStatus, setViewTaskStatus } = useContext(appContext);

    const AddTaskActivate = () => {
        setEditTaskStatus(() => false)
        setViewTaskStatus(() => false)
        setAddTaskStatus(() => true)
    }

  return (
    <div className='rounded-lg bg-blue-600 hover:bg-blue-700 text-white py-1 flex flex-row gap-2 items-center px-4 cursor-pointer' onClick={AddTaskActivate}>
        <span className='text-[1.5rem]'>+</span>
        <span className='text-[0.8rem]'>Create New Task</span>
    </div>
  )
}

export default CreateTaskBtn