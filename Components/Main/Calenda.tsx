'use client'

import React, { useContext, useEffect, useState } from 'react';
import { appContext } from '@/ContextApi/AppContext';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export interface CalendarProps {
  year: number;
  month: number;
}

const Calendar = ({ year, month }: CalendarProps) => {
  const { taskData, selectedDate, setSelectedDate, nextMonth, previousMonth, goToToday } = useContext(appContext);
  const [monthData, setMonthData] = useState<{ indexer: number; today: boolean }[]>([]);
  const [beginnings, setBeginnings] = useState<{ indexer: number; today: boolean }[]>([]);

  const selectedDateParts = selectedDate.split("-");
  const shortMonth = selectedDateParts.length >= 2 ? Number(selectedDateParts[1]) : 1;

  const handleDaySelect = (year: number, month: number, day: number) => {
    setSelectedDate(`${year}-${month}-${day}`);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthString = monthNames[month - 1];
  const shortMonthString = shortMonth >= 1 && shortMonth <= 12
    ? monthNames[shortMonth - 1].slice(0, 3)
    : ""; 

  const currentDate = new Date();
  const totalDaysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfTheWeek = new Date(year, month - 1, 0).getDay();

  useEffect(() => {
    setBeginnings([]);
    setMonthData([]);

    const newBeginnings: { indexer: number; today: boolean }[] = [];
    for (let index = 0; index < firstDayOfTheWeek; index++) {
      newBeginnings.push({
        indexer: index,
        today: false
      });
    }
    setBeginnings((beg) => [...newBeginnings, ...beg]);

    const newMonthData: { indexer: number; today: boolean }[] = [];
    for (let index = 0; index < totalDaysInMonth; index++) {
      const today = currentDate.getMonth() + 1 === month && currentDate.getFullYear() === year && currentDate.getDate() === (index + 1);
      newMonthData.push({
        indexer: index + 1,
        today: today
      });
    }
    setMonthData((mData) => [...mData, ...newMonthData]);
  }, [month, year]);

  return (
    <div className='flex flex-col w-11/12 rounded-lg py-4 shadow-xl'>
      <div className='flex flex-row justify-between mx-4'>
        <div onClick={previousMonth} className='cursor-pointer'>
        <FaArrowLeft />

        </div>
        <h3>{monthString} {year}</h3>
        <div onClick={nextMonth} className='cursor-pointer'>
        <FaArrowRight />

        </div>
      </div>
      <div className='flex flex-row mx-4 gap-3 mt-4 h-[2.2rem]'>
        <div className='flex-1 border border-gray-400 rounded-lg'>
          <input contentEditable={false} readOnly className='w-full h-full rounded-lg px-3 outline-none' value={`${shortMonthString} ${(selectedDate.split("-")[2])}, ${(selectedDate.split("-")[0])}`} type="text" name="" id="" />
        </div>
        <div onClick={goToToday} className='border border-gray-400 hover:bg-gray-200 flex items-center px-4 rounded-lg cursor-pointer'>
          <span>Today</span>
        </div>
      </div>
      <div className='flex flex-col mx-4 mt-4'>
        <div className='w-full min-w-full flex flex-row'>
          <div className='w-2/12 text-center'>Mo</div>
          <div className='w-2/12 text-center'>Tu</div>
          <div className='w-2/12 text-center'>We</div>
          <div className='w-2/12 text-center'>Th</div>
          <div className='w-2/12 text-center'>Fr</div>
          <div className='w-2/12 text-center'>Sa</div>
          <div className='w-2/12 text-center'>Su</div>
        </div>
        <div className='w-full min-w-full grid grid-cols-7 text-center'>
          {beginnings.map((content: any, index: number) => (
            <div key={`empty${index}`} className='h-[3rem]'></div>
          ))}
          {monthData.map((data: any) => (
            <div key={data.indexer} className={`h-[3rem] flex items-center justify-center cursor-pointer hover:bg-blue-700 hover:text-white rounded-full relative ${data.today && "bg-blue-600 text-white"}`} onClick={() => { handleDaySelect(year, month, data.indexer) }}>
              <div>{data.indexer}</div>
              {selectedDate !== `${year}-${month}-${data.indexer}` && (
                <div className="absolute fill-blue-400 bottom-0 hidden">
                  <Image src="/circleBlue.svg" height={10} width={10} alt='Logo' />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
