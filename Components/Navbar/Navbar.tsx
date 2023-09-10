'use client'

import Link from "next/link";
import React from "react";
import { FaCog } from 'react-icons/fa';
import { MdNotifications } from 'react-icons/md';

const Navbar = () => {
  return (
    <div className='w-full h-12 p-2 border-b border-solid border-b-gray-300'>
      <nav className='sm:flex hidden flex-row w-10/12 justify-between items-center mx-auto h-full'>
        <div className='flex gap-4 items-center'>
          <Link href={'/'}>Todo</Link>
        </div>
        <div className='flex items-center gap-3'>
          <FaCog />
          <MdNotifications />

          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img src={"/profile.jpg"} alt='Profile' className="w-full h-full object-cover" />
          </div>
        </div>
      </nav>
      <nav className='sm:hidden flex flex-row w-10/12 justify-between items-center mx-auto h-full'>
        <div className='flex gap-4 items-center'>
          <Link href={'/'}></Link>
        </div>
        <div className='flex items-center gap-3'>
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={"/next.svg"} alt='Profile' className="w-full h-full object-cover" />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
