import { appContext } from '@/ContextApi/AppContext';
import Image from 'next/image';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';

// Define an interface for a task item
interface TaskItem {
  id: number;
  date: string;
  alarmMin: number;
  time: string;
  title: string;
  completed: boolean;
}

const TaskList = () => {
  const {
    taskData,
    currentPage,
    selectedDate,
    updateTaskCompleted,
    setSelectedItem,
    setEditTaskStatus,
    setViewTaskStatus,
    setAddTaskStatus,
    setSelectedDate,
    nextMonth,
    previousMonth,
    goToToday,
  } = useContext(appContext);

  // Calculate the start and end indices for displaying tasks based on currentPage
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const displayData = taskData.slice(startIndex, endIndex);

  const getFromNow = (date: string, time: string) => {
    const targetDate = new Date(`${date} ${time}`).valueOf();
    const todayDate = new Date().valueOf();
    const remainingTime = (targetDate - todayDate) / 1000;

    if (remainingTime <= 0) {
      return "Time Elapsed";
    } else if (remainingTime < 86400) {
      return "Today";
    } else if (remainingTime < 2 * 86400) {
      return "Tomorrow";
    } else {
      return `${Math.floor(remainingTime / 86400)} Days`;
    }
  };

  const handleCompletedUpdate = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const isChecked = e.target.checked;
    updateTaskCompleted(isChecked, id);

    // Close edit, view, and add task modes
    setEditTaskStatus(false);
    setViewTaskStatus(false);
    setAddTaskStatus(false);
  };

  const setAndViewTask = (task: TaskItem) => {
    setSelectedItem(task);
    setViewTaskStatus(true);
    setEditTaskStatus(false);
    setAddTaskStatus(false);
  };

  return (
    <div>
      <div className='font-semibold'>Your Tasks</div>
      <div className='no-scroll-bar overflow-y-auto sm:h-[50vh]'>
        {displayData.map((item) => (
          <div
            key={item.id}
            onClick={() => setAndViewTask(item)}
            className='flex flex-row justify-between items-center border bg-gray-200 border-gray-400 rounded-sm mt-3 px-4 cursor-pointer hover:bg-gray-300'
          >
            <div className='flex gap-4 items-center'>
              <div className='flex relative'>
                <input
                  checked={item.completed}
                  onChange={(e) => handleCompletedUpdate(e, item.id)}
                  className='peer appearance-none relative w-4 h-4 border-[1.5px] border-gray-400 rounded-[0.25rem] bg-white checked:border-blue-700 cursor-pointer'
                  type='checkbox'
                />
                <div className='absolute h-4 w-4 justify-center items-center hidden peer-checked:flex pointer-events-none'>
                  <FaCheck className='flex fill-blue-300'/>
                </div>
              </div>
              <div>
                <div>{item.title.slice(0, 20)}{item.title.length > 20 && "..."}</div>
                <div>{item.time}</div>
              </div>
            </div>
            <span>{getFromNow(item.date, item.time)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
