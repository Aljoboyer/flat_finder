"use client"
import { useEffect, useState } from 'react';
import { Avatar, IconButton, TextField } from '@mui/material';
import { Send, Phone, VideoCall, Info, MoreVert, InsertEmoticon, AttachFile } from '@mui/icons-material';
import FFLoader2 from '../Loaders/FFLoader-2';
import { useLazyGetSingleUserProfileQuery } from '@/app/redux/features/profileApi';
import { getLocalStorageData } from '@/utils/getLocalStorageData';
import { formatCustomDateTime } from '@/helper/customDateTimeFormatter';
import { useLazyGetlAllMessagesQuery, useSentMsgMutation } from '@/app/redux/features/msgApi';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const messagesD = [
  { from: 'them', text: 'Hey. Very Good morning. How are you?', time: '11:23 AM' },
];

export default function ChatInbox({id}) {
  const [messages, setMessages] = useState([]);
  const [userProfileTirgger, { data: selectedUserProfile,  isFetching}] = useLazyGetSingleUserProfileQuery();
  const [getMessagesTrigger, { data: allMessage}] = useLazyGetlAllMessagesQuery();
  const [msgSendHanlder, { }] = useSentMsgMutation();

  const [msgText, setMsgText] = useState('');
  const userData = getLocalStorageData();
  
  const sendMessage = async () => {
    const msgObj = {
       from: userData?._id, to: id, content: msgText, time: new Date(), 
    }
    setMsgText('')
    setMessages([...messages, msgObj])
    const msgAdd = await msgSendHanlder(msgObj)
  }

  useEffect(() => {
    if(id){
       userProfileTirgger({ querys: `id=${id}` })
       getMessagesTrigger({ querys: `currentUser=${userData?._id}&selectedUser=${id}&limit=${30}` })
    }
  },[id])
  
  useEffect(() => {
    if(allMessage?.messages?.length > 0){
      setMessages(allMessage?.messages)
    }
  },[allMessage?.messages]);
  
  console.log('allMessage ==>', allMessage)

  return (
    <div className="w-full lg:w-3/4 flex flex-col bg-white pb-13 md:pb-0 ">

        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar src={selectedUserProfile?.data?.image} alt='Jhon Snow' />
            <div>
              <div className='flex flex-row items-center'>
                <p className='text-p md:text-p_lg font-bold text-basecolor'>{selectedUserProfile?.data?.name}</p>
                <div className="w-2 h-2 bg-green-500 rounded-full ms-2" />
              </div>
              {/* <p className='text-gray-400 font-medium text-xsm md:text-psm'>Last seen 2h ago</p> */}
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
        {
          isFetching ? <FFLoader2/> : <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages?.map((msg, i) => (
            <div
              key={i}
              className={cn(
                'max-w-xs p-3 rounded-lg text-sm shadow-md',
                msg.from === userData?._id ? 'bg-overlay ml-auto' : 'bg-basecolor'
              )}
            >
              <p className={`${msg.from === userData?._id  ? 'text-basecolor ' : 'text-side_yellow'}`}>{msg.content}</p>
              <div className={`${msg.from === userData?._id  ? 'text-gray-600' : 'text-white'} mt-1 text-[10px] text-right `}>{msg?.time ? formatCustomDateTime(msg?.time) : formatCustomDateTime(msg?.createdAt)}</div>
            </div>
          ))}
        </div>
        }

        {/* Input */}
        <div className="p-4 border-t flex items-center flex-wrap md:flex-nowrap gap-2 h-[90px]">
          <div className='flex items-center'>
            <IconButton><InsertEmoticon /></IconButton>
             <IconButton><AttachFile /></IconButton>
          </div>
          <div className='flex items-center w-full'>
            <TextField
            value={msgText}
            onChange={(e) => setMsgText(e.target.value)} multiline maxRows={6} fullWidth size="small" placeholder="Type a Message" />
            <IconButton onClick={() => sendMessage()} color="success">
              <Send />
            </IconButton>
          </div>
          
        </div>

    </div>
  );
}
