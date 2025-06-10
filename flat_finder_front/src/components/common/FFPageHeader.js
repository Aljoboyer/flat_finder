import { useRouter } from 'next/navigation';
import React from 'react'
import { MdArrowBackIosNew } from "react-icons/md";

export default function FFPageHeader({
    pageTitle
}) {
    const router = useRouter()
  return (
    <div className='bg-white p-4 rounded-md my-4 flex flex-row items-center'>
        <MdArrowBackIosNew onClick={() => router.back()} className='cursor-pointer' size={22}/>
        <p className='text-title_sm font-bold ms-2'>{pageTitle}</p>
    </div>
  )
}
