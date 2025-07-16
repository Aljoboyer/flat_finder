import { COLORS } from '@/theme/colors';
import React from 'react'
import { IoChatbubblesOutline } from "react-icons/io5";

export default function NoChatSelected() {
  return (
     <div className="flex flex-col justify-center items-center flex-1 text-center p-4 ">
        <IoChatbubblesOutline color={COLORS.baseColor} size={70} className='my-4' />
        <p className='text-title md:text-lg_title text-basecolor font-semibold'>Welcome to your inbox</p>
        <p className='text-p md:text-p_lg text-gray1200 my-2'>You haven’t started any conversations yet, but when you do, you’ll find them here.</p>
    </div>
  )
}
