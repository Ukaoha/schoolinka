import React, { useContext, useState } from 'react';
import Button from '../Main/Button';
import { appContext } from '@/ContextApi/AppContext';
import { FaBell, FaCalendar, FaClock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


const AddTaskModal = () => {
  const { setAddTaskStatus, setEditTaskStatus, setViewTaskStatus, goToToday, createTask, selectedDate } = useContext(appContext);

  const [alarm, setAlarm] = useState(true);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('11:00');

  const CloseAddTaskActivate = () => {
    setEditTaskStatus(() => false);
    setViewTaskStatus(() => false);
    setAddTaskStatus(() => false);
  };

  const removeAlarm = () => {
    setAlarm(() => false);
  };

  const makeTask = () => {
    createTask({
      title,
      date: selectedDate,
      time,
      alarmMin: alarm ? 10 : 0,
      completed: false,
    });
    toast.success('Task edited successfully', {
        position: toast.POSITION.TOP_RIGHT, 
        autoClose: 2000, 
      });

    setTimeout(() => {
      setAddTaskStatus(() => false);
    }, 1000);
  };

  // Generate an array of time options for the entire day
  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 10) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      const timeOption = `${formattedHour}:${formattedMinute}`;
      timeOptions.push(timeOption);
    }
  }

  return (
    <div className='flex lg:hidden justify-center fixed h-[100vh] left-0 top-0 w-full'>
      <div className='h-full w-full relative bg-black opacity-10'>
        {/* ... */}
      </div>
      <div className='flex justify-center absolute h-[60vh] left-0 bottom-0 w-full bg-white rounded-t-[3rem]'>
        <div className='flex flex-col w-11/12 rounded-lg py-4 shadow-xl'>
          <div className='flex flex-row justify-between mx-4'>
            <h3>Add Task</h3>
            <span onClick={CloseAddTaskActivate} className='text-[1.5rem] rotate-45 cursor-pointer'>+</span>
          </div>
          <div className='mt-2 mx-4 overflow-hidden'>
            <textarea onChange={(e) => setTitle(e.target.value)} name='' placeholder='Go to gym' id='' className='w-full h-[8rem] rounded-lg bg-gray-200 border border-gray-400 resize-none outline-none p-2 no-scroll-bar'></textarea>
          </div>
          <div className='mx-4 mt-4 flex flex-col gap-2'>
            <div className='flex flex-row justify-between'>
              <div onClick={goToToday} className='cursor-pointer hover:bg-gray-200 p-2 border border-gray-400 gap-2 rounded-lg py-1 px-2 flex'>
                <FaCalendar className='flex fill-blue-300' />
                <span>Today</span>
              </div>
              <div className='flex gap-1 border border-gray-400 py-1 rounded-lg px-2 cursor-pointer bg-white'>
                <FaClock className='flex fill-blue-300' />
                <select onChange={(e) => setTime(e.target.value)} name='' id='' defaultValue={'11:00'} className='native-appearance-none outline-none no-scroll-bar cursor-pointer'>
                  {timeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {alarm && (
              <div className='flex flex-row justify-between'>
                <span className='flex gap-2'>
                  <FaBell className='flex fill-blue-300' />
                  <span>10 minutes before</span>
                </span>
                <span onClick={removeAlarm} className='text-[1rem] rotate-45 cursor-pointer'>+</span>
              </div>
            )}
          </div>
          <div className='flex flex-row mx-4 justify-between mt-8 gap-4'>
            <Button
              title='Cancel'
              color='bg-white'
              text='text-gray-800'
              border='border'
              borderColor='border-gray-600'
            //   hoverColor='bg-gray-200'
              action={CloseAddTaskActivate}
            />
            <Button title='Save' action={makeTask} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
