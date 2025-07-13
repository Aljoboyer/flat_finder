import React from 'react'
import { Avatar, TextField, Typography, Badge, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Close } from '@mui/icons-material';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const conversations = [
  { id: 1, name: 'Alene', role: 'Technical Department', time: '2h ago', unread: 2, avatar: '/avatar1.png' },
  { id: 2, name: 'Keefe', role: 'Support Executive', time: '1:20 AM', unread: 3, avatar: '/avatar2.png' },
  { id: 3, name: 'Lazaro', role: 'Resource Investigator', time: 'Yesterday', unread: 1, avatar: '/avatar3.png' },
  { id: 4, name: 'Hazle', role: 'Teamworker', time: '4/25/2021', avatar: '/avatar4.png' },
  { id: 5, name: 'Herman Essertg', role: 'Co-ordinator', time: '4/25/2021', avatar: '/avatar5.png' },
  { id: 6, name: 'Wilhelmine Durg', role: 'Monitor Evaluator', time: '4/25/2021', avatar: '/avatar6.png' },
  { id: 7, name: 'Agilulf Fuxg', role: 'Specialist', time: '4/25/2021', avatar: '/avatar7.png' },
  
];

export default function InboxSideManu({
  closeDrawer
}) {
  const router = useRouter();

  return (
       <div className="w-full p-2">
        <div className="px-4 border-b border-gray-100 mb-4">
          <div className="flex flex row justify-between gap-2 my-4">
              <div className="flex items-center gap-2">
                <Avatar src="/user.png" />
                <div>
                  <p className='text-psm md:text-p font-bold text-blackshade'>Ahan Chowdhury Tanveee</p>
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>
              </div>
              <p onClick={() => closeDrawer()} className='cursor-pointer lg:hidden'>
                <Close className=' '/>
                </p>
          </div>
          <TextField size="small" fullWidth className="mt-4" placeholder="Search Mail" />
        </div>
        <Divider/>
        {conversations.map((conv) => (
          <div className='w-full'>
            <div
              key={conv.id}
              onClick={() => {
                router.push(`/buyer-inbox/${2}`)
              }}
              className="flex justify-between items-center gap-2 p-4 cursor-pointer hover:bg-gray-100"
            >
              <div className='flex flex-row'>
                <Avatar src={conv.avatar} />
                <div className="ms-2">
                  <p className='text-p font-semibold'>{conv.name}</p>
                  <p className='text-xsm fontmedium text-gray100'>{conv.role}</p>
                </div>
              </div>

              <div className="flex flex-col ">
                {conv.unread && <Badge badgeContent={conv.unread} color="success"  />}
                <p  className='text-xsm fontmedium text-gray100 mt-4'>{conv.time}</p>
              </div>
            </div>
            <Divider/>
          </div>
        ))}
      </div>
  )
}
