import { COLORS } from '@/theme/colors';
import React from 'react'
import { IoChatbubblesOutline } from "react-icons/io5";

export default function NoChatSelected({
  from ,
  title,
  subText
}) {
  return (
     <div className="flex flex-col justify-center items-center flex-1 text-center p-4 ">
        {
          from == 'sidebar' ? <IoChatbubblesOutline color={COLORS.baseColor} size={60} className='my-4' /> : <div className='h-[200px] w-[200px]'><img src='/assets/emtyInbox.png' className='h-full w-full contain-cover'/></div>
        }
        <p className='text-title md:text-lg_title text-basecolor font-semibold'>{title}</p>
        <p className='text-p md:text-p_lg text-gray1200 my-2'>{subText}</p>
    </div>
  )
}
