import NoChatSelected from '@/components/common/MessageInbox/NoChatSelected'
import React from 'react'

export default function page() {
  return (
     <div className="w-full  lg:w-3/4 flex flex-col bg-white ">
        <NoChatSelected
         title="Welcome to your inbox"
        subText="You haven’t started any conversations yet, but when you do, you’ll find them here."
        />
     </div>
  )
}
