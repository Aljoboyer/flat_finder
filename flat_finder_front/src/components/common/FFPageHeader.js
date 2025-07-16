import { useRouter } from 'next/navigation';
import React from 'react'
import { MdArrowBackIosNew } from "react-icons/md";
import { Buttons } from './Buttons/Buttons';
import { COLORS } from '@/theme/colors';
import { Chat } from '@mui/icons-material';

export default function FFPageHeader({  
    backBtnShow = true, 
    pageTitle,
    rightBtnShow = false,
    rightBtnTitle = '',
    rightBtnClick
}) {
    const router = useRouter()
  return (
    <div className='bg-white p-4 rounded-md my-4 flex flex-row items-center'>
      {
        backBtnShow && <MdArrowBackIosNew onClick={() => router.back()} className='cursor-pointer' size={22}/>
      }
        
        <p className='text-title_sm font-bold ms-2'>{pageTitle}</p>

        <div className='lg:hidden ml-auto'>
            {
            rightBtnShow && <Buttons
            bgColor={COLORS.overlay}
            title={rightBtnTitle}
            textColor={COLORS.baseColor}
            other_style={{width: '150px', fontWeight: 'bold', marginLeft: 'auto'}}
            icon={<Chat className='me-2'/>}
            onClickHandler={rightBtnClick}
          />
          }
        </div>

    </div>
  )
}
