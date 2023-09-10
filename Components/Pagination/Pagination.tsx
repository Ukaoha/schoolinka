'use client'

import { appContext } from '@/ContextApi/AppContext';
import Image from 'next/image';
import React, { useContext, useEffect, useMemo } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Pagination= () => {
  const { taskData, currentPage, setCurrentPage } = useContext(appContext);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(taskData.length / itemsPerPage);

  // Calculate the range of visible pagination items
  const visiblePages = useMemo(() => {
    const maxVisiblePages = 5; // Adjust the number of visible pages as needed
    const start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const end = Math.min(totalPages, start + maxVisiblePages - 1);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }, [currentPage, totalPages]);

  const handleNumberClick = (number: number) => {
    setCurrentPage(number);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    totalPages > 1 && (
      <div className='flex border-t border-solid border-b-gray-300 items-center justify-between flex-1 pt-4 h-[7vh]'>
        <div onClick={handlePreviousPage} className='flex gap-2 cursor-pointer items-center rounded-lg px-3 py-2'>
          {/* <div>
           <span><FaArrowLeft /> Previous</span> 

          </div> */}
              <div className="flex items-center">
      <span className="mr-1">
        <FaArrowLeft />
      </span>
      <span>Previous</span>
    </div>

        </div>
        <div className='flex gap-2'>
          {visiblePages.map((item) => (
            <div
              key={item}
              onClick={() => handleNumberClick(item)}
              className={`px-2 rounded-full cursor-pointer hover:bg-gray-300 ${
                currentPage === item ? 'bg-gray-200' : ''
              }`}
            >
              {item}
            </div>
          ))}
        </div>
        <div onClick={handleNextPage} className='flex gap-2 cursor-pointer items-center rounded-lg px-3 py-2'>
          <div className="flex items-center">
      <span className="mr-1">
      <span>Next</span>

      </span>
    </div>
    <FaArrowRight />

        </div>
      </div>
    )
  );
};

export default Pagination;
