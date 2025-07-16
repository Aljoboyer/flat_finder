"use client"
import FFDrawer from '@/components/common/FFDrawer/FFDrawer'
import FFPageHeader from '@/components/common/FFPageHeader';
import InboxSideManu from '@/components/common/MessageInbox/InboxSideManu'
import React, { useState } from 'react'

export default function Layout({children}) {
  const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = (newOpen) =>  {
      console.log('clicked')
    setOpenDrawer(newOpen);
  };

  return (
    <div className='bg-overlay p-6 rounded-t-[20px] '>

      <FFPageHeader 
      rightBtnTitle='Chat List'
      rightBtnClick={toggleDrawer}
      pageTitle="Chat" 
      rightBtnShow={true}/>

        <div className="flex flex-col md:flex-row h-screen w-full">
          {/* Sidebar */}
          <div className='hidden lg:block w-full  lg:w-1/4 border-r border-gray-200 overflow-y-auto bg-white chat_sidebar'>
              <InboxSideManu />
          </div>
          
          <FFDrawer open={openDrawer} toggleDrawer={toggleDrawer}>
              <div className='w-full border-r border-gray-200 overflow-y-auto bg-white'>
                <InboxSideManu closeDrawer={toggleDrawer}/>
            </div>
          </FFDrawer>

          {/* Chat window */}
           {children}
        </div>
     </div>
  )
}
