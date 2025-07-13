"use client"
import { useState } from 'react';
import { Avatar, IconButton, TextField, Typography, Badge } from '@mui/material';
import { Send, Phone, VideoCall, Info, MoreVert, InsertEmoticon, AttachFile } from '@mui/icons-material';

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
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Sidebar */}
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
            onClick={() => setSelectedChat(conv)}
            className={cn(
              'flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100',
              selectedChat?.id === conv.id && 'bg-gray-100'
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

      {/* Chat window */}
      <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col bg-gray-50">
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar src={selectedChat.avatar} />
                <div>
                  <Typography variant="subtitle1">{selectedChat.name}</Typography>
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
          </>
        ) : (
          <div className="flex flex-col justify-center items-center flex-1 text-center px-4">
            <Typography variant="h6" className="text-gray-500 mb-2">
              Ah, a fresh new inbox
            </Typography>
            <Typography variant="body2" className="text-gray-400">
              You haven’t started any conversations yet, but when you do, you’ll find them here.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
