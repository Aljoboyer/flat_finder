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
    <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col bg-gray-50">

        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar src={''} alt='Jhon Snow' />
            <div>
              <Typography variant="subtitle1">Jhon Snow</Typography>
              <Typography variant="caption" className="text-gray-500">
                Last seen 2h ago
              </Typography>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <IconButton><Phone /></IconButton>
            <IconButton><VideoCall /></IconButton>
            <IconButton><Info /></IconButton>
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
                msg.from === 'me' ? 'bg-blue-100 ml-auto' : 'bg-purple-100'
              )}
            >
              {msg.text}
              <div className="text-[10px] text-right text-gray-500 mt-1">{msg.time}</div>
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
