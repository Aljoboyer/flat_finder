"use client"
import InboxSideManu from '@/components/common/MessageInbox/InboxSideManu'
import React from 'react'

export default function Layout({children}) {
  return (
    <div className='bg-overlay p-6 rounded-t-[20px] '>
        <div className="flex flex-col md:flex-row h-screen w-full">
          {/* Sidebar */}
          <InboxSideManu />
    
          {/* Chat window */}
           {children}
        </div>
     </div>
  )
}
