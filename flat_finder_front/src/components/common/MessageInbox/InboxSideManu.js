import React from 'react'
import { Avatar, TextField, Typography, Badge } from '@mui/material';
import { useRouter } from 'next/navigation';

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

export default function InboxSideManu() {
  const router = useRouter();

  return (
       <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 overflow-y-auto bg-white">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Avatar src="/user.png" />
            <div>
              <Typography variant="subtitle1">JWT User</Typography>
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            </div>
          </div>
          <TextField size="small" fullWidth className="mt-4" placeholder="Search Mail" />
        </div>
        {conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => {
              router.push(`/buyer-inbox/${2}`)
            }}
            className={cn(
              'flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100 '
            )}
          >
            <Avatar src={conv.avatar} />
            <div className="flex-1">
              <Typography variant="subtitle2">{conv.name}</Typography>
              <Typography variant="caption" className="text-gray-500">
                {conv.role}
              </Typography>
            </div>
            <div className="flex flex-col items-end">
              <Typography variant="caption" className="text-gray-400">
                {conv.time}
              </Typography>
              {conv.unread && <Badge badgeContent={conv.unread} color="secondary" />}
            </div>
          </div>
        ))}
      </div>
  )
}
