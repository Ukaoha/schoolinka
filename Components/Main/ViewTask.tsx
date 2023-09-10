'use client'
import React, { useContext, useState } from 'react'
import Button from '@/Components/Main/Button'
import { appContext } from '@/ContextApi/AppContext';
import Image from 'next/image';
import { FaCalendar, FaClock } from 'react-icons/fa';

const ViewTask = () => {
    const { taskData, currentPage, setCurrentPage, setAddTaskStatus, setEditTaskStatus, setViewTaskStatus, goToToday, deleteTask, selectedItem, } = useContext(appContext);
    

    const CloseViewTaskActivate = () => {
        setEditTaskStatus(() => false)
        setViewTaskStatus(() => false)
        setAddTaskStatus(() => false)
    }

    const goToEdit = () => {
        setViewTaskStatus(() => false)
        setAddTaskStatus(() => false)
        setEditTaskStatus(() => true)
    }

    const removeTask = () => {
        const remaindant = taskData.length % 10
        const possiblePages = Math.floor(taskData.length / 10)
        if (remaindant == 1 && currentPage > possiblePages) {
            deleteTask(selectedItem?.id)
            setCurrentPage((prev) => prev - 1)
        } else {
            deleteTask(selectedItem?.id)
        }
        setTimeout(() => {
            setViewTaskStatus(() => false)
        }, 1000);
    }

  return (
    <div className='flex flex-col w-11/12 rounded-lg py-4 shadow-xl'>
        <div className='flex flex-row justify-between mx-4'>
            <h3></h3>
            <span onClick={CloseViewTaskActivate} className='text-[1.5rem] rotate-45 cursor-pointer'>+</span>
        </div>
        <div className='mt-2 mx-4 overflow-hidden'>
            <h3>{`${selectedItem.title}`}</h3>
        </div>
        <div className='mx-4 mt-8 flex flex-col gap-2'>
            <div className='flex flex-row justify-between'>
                <div onClick={goToToday} className='gap-2 rounded-lg py-1 flex cursor-pointer'>
                    <FaCalendar className='flex fill-blue-300' />
                                        <span>{selectedItem.date}</span>
                </div>
            </div>
            <div className='flex flex-row justify-between'>
                <span className='flex gap-2'>
                <FaClock className='flex fill-blue-300' />

                    <span>{selectedItem.time}</span>
                </span>
            </div>
        </div>
        <div className='flex flex-row mx-4 justify-between mt-8 gap-4'>
            <Button 
            title='Delete'
            color='bg-white'
            text='text-gray-800'
            border='border'
            borderColor='border-gray-600'
            action={removeTask}
            />
            <Button 
            title='Edit'
            action={goToEdit}
            />
        </div>
    </div>
  )
}

export default ViewTask