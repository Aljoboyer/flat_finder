"use client"
import { useState } from 'react';
import { Avatar, IconButton, TextField, Typography, Badge } from '@mui/material';
import { Send, Phone, VideoCall, Info, MoreVert, InsertEmoticon, AttachFile } from '@mui/icons-material';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const messages = [
  { from: 'them', text: 'Hey. Very Good morning. How are you?', time: '11:23 AM' },
  { from: 'me', text: 'Hi Good Morning!', time: '11:23 AM' },
  { from: 'me', text: 'Good. Thank you', time: '11:23 AM' },
  { from: 'them', text: 'I need your minute, are you available?', time: '11:23 AM' },
    { from: 'them', text: 'Hey. Very Good morning. How are you?', time: '11:23 AM' },
  { from: 'me', text: 'Hi Good Morning!', time: '11:23 AM' },
  { from: 'me', text: 'Good. Thank you', time: '11:23 AM' },
  { from: 'them', text: 'I need your minute, are you available?', time: '11:23 AM' },
    { from: 'them', text: 'Hey. Very Good morning. How are you?', time: '11:23 AM' },
  { from: 'me', text: 'Hi Good Morning!', time: '11:23 AM' },
  { from: 'me', text: 'Good. Thank you', time: '11:23 AM' },
  { from: 'them', text: 'I need your minute, are you available?', time: '11:23 AM' },
    { from: 'them', text: 'Hey. Very Good morning. How are you?', time: '11:23 AM' },
  { from: 'me', text: 'Hi Good Morning!', time: '11:23 AM' },
  { from: 'me', text: 'Good. Thank you', time: '11:23 AM' },
  { from: 'them', text: 'I need your minute, are you available?', time: '11:23 AM' },
    { from: 'them', text: 'Hey. Very Good morning. How are you?', time: '11:23 AM' },
  { from: 'me', text: 'Hi Good Morning!', time: '11:23 AM' },
  { from: 'me', text: 'Good. Thank you', time: '11:23 AM' },
  { from: 'them', text: 'I need your minute, are you available?', time: '11:23 AM' },
];

export default function ChatInbox() {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="w-full lg:w-3/4 flex flex-col bg-white">

        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar src={''} alt='Jhon Snow' />
            <div>
              <div className='flex flex-row items-center'>
                <p className='text-p md:text-p_lg font-bold text-basecolor'>Jhon Snow</p>
                <div className="w-2 h-2 bg-green-500 rounded-full ms-2" />
              </div>
              <p className='text-gray-400 font-medium text-xsm md:text-psm'>Last seen 2h ago</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* <IconButton><Phone /></IconButton>
            <IconButton><VideoCall /></IconButton>
            <IconButton><Info /></IconButton> */}
            <IconButton><MoreVert /></IconButton>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                'max-w-xs p-3 rounded-lg text-sm shadow-md',
                msg.from === 'me' ? 'bg-overlay ml-auto' : 'bg-basecolor'
              )}
            >
              <p className={`${msg.from === 'me' ? 'text-basecolor ' : 'text-side_yellow'}`}>{msg.text}</p>
              <div className={`${msg.from === 'me' ? 'text-gray-600' : 'text-white'} mt-1 text-[10px] text-right `}>{msg.time}</div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t flex items-center gap-2">
          <IconButton><InsertEmoticon /></IconButton>
          <IconButton><AttachFile /></IconButton>
          <TextField fullWidth size="small" placeholder="Type a Message" />
          <IconButton color="primary">
            <Send />
          </IconButton>
        </div>

    </div>
  );
}
