'use client'

import React, { useContext, useState, useEffect } from 'react';
import Button from './Button';
import { appContext } from '@/ContextApi/AppContext';
import Image from 'next/image';
import { FaBell, FaCalendar, FaClock } from 'react-icons/fa';

const EditTask = () => {
    const {
        setAddTaskStatus,
        setEditTaskStatus,
        setViewTaskStatus,
        goToToday,
        updateTask,
        selectedDate,
        selectedItem,
    } = useContext(appContext);

    const [alarm, setAlarm] = useState(true);
    const [title, setTitle] = useState(
        selectedItem.id !== 999999999 && selectedItem?.title || ''
    );
    const [time, setTime] = useState('11:00');

    useEffect(() => {
        if (selectedItem.id === 999999999) {
            setTitle('');
            setTime('11:00');
        }
    }, [selectedItem]);

    const closeTaskEditor = () => {
        setViewTaskStatus(false);
        setAddTaskStatus(false);
        setEditTaskStatus(false);
    };

    const removeAlarm = () => {
        setAlarm(false);
    };

    const handleSaveTask = () => {
        updateTask({
            id: selectedItem.id,
            title,
            date: selectedDate,
            time,
            alarmMin: alarm ? 10 : 0,
            completed: false,
        });

        setTimeout(() => {
            setEditTaskStatus(false);
        }, 1000);
    };

    const generateTimeOptions = () => {
        const timeOptions = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 10) {
                const formattedHour = hour.toString().padStart(2, '0');
                const formattedMinute = minute.toString().padStart(2, '0');
                const timeOption = `${formattedHour}:${formattedMinute}`;
                timeOptions.push(timeOption);
            }
        }
        return timeOptions;
    };

    const timeOptions = generateTimeOptions();

    return (
        <div className='flex flex-col w-11/12 rounded-lg py-4 shadow-xl'>
            <div className='flex flex-row justify-between mx-4'>
                <h3>Edit Task</h3>
                <span
                    onClick={closeTaskEditor}
                    className='text-[1.5rem] rotate-45 cursor-pointer'
                >
                    +
                </span>
            </div>
            <div className='mt-2 mx-4 overflow-hidden'>
                <textarea
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Go to gym'
                    className='w-full h-[8rem] rounded-lg bg-gray-200 border border-gray-400 resize-none outline-none p-2 no-scroll-bar'
                ></textarea>
            </div>
            <div className='mx-4 mt-4 flex flex-col gap-2'>
                <div className='flex flex-row justify-between'>
                    <div
                        onClick={goToToday}
                        className='border border-gray-400 gap-2 rounded-lg py-1 px-2 flex cursor-pointer'
                    >
                        <FaCalendar className='flex fill-blue-300'/>
                        <span>Today</span>
                    </div>
                    <div className='flex gap-1 border border-gray-400 py-1 rounded-lg px-2 cursor-pointer bg-white'>
                        <FaClock className='flex fill-blue-300'/>
                        <select
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            defaultValue={"11:00"}
                            className='native-appearance-none outline-none no-scroll-bar cursor-pointer'
                        >
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
                        <span
                            onClick={removeAlarm}
                            className='text-[1rem] rotate-45 cursor-pointer'
                        >
                            +
                        </span>
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
                    action={closeTaskEditor}
                />
                <Button title='Save' action={handleSaveTask} />
            </div>
        </div>
    );
};

export default EditTask;
