'use client'

import React, { useContext, useEffect, useState } from 'react';
import { appContext } from '@/ContextApi/AppContext';

export interface DaysGroupProps {
  title?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
  text?: string;
  action?(): void;
  border?: string;
  borderColor?: string;
  month: number;
  year: number;
}

interface DayInfo {
  year: number;
  month: number;
  day: number;
  dayOfWeek: string;
}

const MonthCalender = ({ month, year }: DaysGroupProps) => {
  const { selectedDate, setSelectedDate } = useContext(appContext);
  const [daysInfo, setDaysInfo] = useState<DayInfo[]>([]);

  const handleDaySelect = (year: number, month: number, day: number) => {
    setSelectedDate(`${year}-${month}-${day}`);
  };

  useEffect(() => {
    const selectedDay = Number(selectedDate.split("-")[2]);
    const daysInMonth = new Date(year, month, 0).getDate();
    const daysBefore = Math.min(selectedDay - 1, 5);
    const daysAfter = Math.min(daysInMonth - selectedDay, 5);

    const getDayInfo = (offset: number) => {
      const newDate = new Date(year, month - 1, selectedDay + offset);
      return {
        year: newDate.getFullYear(),
        month: newDate.getMonth() + 1,
        day: newDate.getDate(),
        dayOfWeek: newDate.toLocaleDateString('en-US', { weekday: 'short' }),
      };
    };

    const previousDays = Array.from({ length: daysBefore }, (_, index) =>
      getDayInfo(-daysBefore + index)
    );

    const selectedDayInfo = getDayInfo(0);

    const nextDays = Array.from({ length: daysAfter }, (_, index) =>
      getDayInfo(index + 1)
    );

    setDaysInfo([...previousDays, selectedDayInfo, ...nextDays]);
  }, [selectedDate, month, year]);

  return (
    <div className='mb-4'>
      <div className='mb-4 font-semibold'>{new Date(year, month - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
      <div className='mt-3 flex gap-3'>
        {daysInfo.map((day) => (
          <div
            key={day.day}
            onClick={() => handleDaySelect(day.year, day.month, day.day)}
            className={`flex flex-col items-center border border-gray-400 rounded-lg justify-between px-4 py-2 gap-2 cursor-pointer min-w-[4rem] hover:bg-blue-700 hover:text-white ${
              day.year === year && day.month === month && day.day === Number(selectedDate.split("-")[2]) ? 'bg-blue-600 text-white' : ''
            }`}
          >
            <span>{day.dayOfWeek}</span>
            <span>{day.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthCalender;
