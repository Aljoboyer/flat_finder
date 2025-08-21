"use client"
import { useEffect, useState } from 'react';
import { Avatar, IconButton, TextField } from '@mui/material';
import { Send, Phone, VideoCall, Info, MoreVert, InsertEmoticon, AttachFile } from '@mui/icons-material';
import FFLoader2 from '../Loaders/FFLoader-2';
import { useLazyGetSingleUserProfileQuery } from '@/app/redux/features/profileApi';
import { getLocalStorageData } from '@/utils/getLocalStorageData';
import { formatCustomDateTime } from '@/helper/customDateTimeFormatter';
import { useLazyGetlAllMessagesQuery, useSentMsgMutation } from '@/app/redux/features/msgApi';
import { getSocket } from '@/utils/socket/socket';
import { useRef } from 'react';
import TypingIndicator from '../TypingIndicator/TypingIndicator';
import SentIcon from './MessageIcons/SentIcon';
import DeliveredIcon from './MessageIcons/DeliveredIcon';
import SeenIcon from './MessageIcons/SeenIcon';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ChatInbox({id}) {
  const [messages, setMessages] = useState([]);
  const [userProfileTirgger, { data: selectedUserProfile,  isFetching}] = useLazyGetSingleUserProfileQuery();
  const [getMessagesTrigger, { data: allMessage}] = useLazyGetlAllMessagesQuery();
  const [msgSendHanlder, { }] = useSentMsgMutation();

  const [msgText, setMsgText] = useState('');
  const userData = getLocalStorageData();
  const socket = getSocket();
  const selectedUserRef = useRef(id);
  const [showTyping, setShowTyping] = useState(false)
  
  useEffect(() => {
      if(id){
          selectedUserRef.current = id;
      }
      
  }, [id]);

  const sendMessage = async () => {
    const msgObj = {
       from: userData?._id, to: id, content: msgText, time: new Date(), 
    }
    setMsgText('');
    setMessages([...messages, msgObj]);
    socket.emit('sendMessage', msgObj);
    
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

    useEffect(() => {
        const handlePrivateMessage = (msg) => {
          const current = selectedUserRef.current;
          const isCurrentChat = msg.from === current || msg.to === current;
          
          if (isCurrentChat) {
            setMessages((prev) => [...prev, msg]);
          } else {
            
            console.log("📬 Message from another user, not shown in current chat.");
          }
        };
      
        socket.on("receiveMessage", handlePrivateMessage);
      
        return () => {
          socket.off("receiveMessage", handlePrivateMessage);
        };
      }, []);

    const onBlurHandler = () => {
      const typObj = {from: userData?._id, to: id}

      socket.emit("typingoff", typObj)
    }
  
  const onChangeHandler = (value) => {
    setMsgText(value)
    const typObj = {from: userData?._id, to: id}

    socket.emit("typingon", typObj)
  }

  useEffect(() => {
    const handlePrivateTyping = (data) => {
      const current = selectedUserRef.current;
      if (data.from == current) {
        setShowTyping(true)
      } 
    };
    const handlePrivateTypingOff = (data) => {
      const current = selectedUserRef.current;
      if (data.from == current) {
        setShowTyping(false)
      } 
    };
    socket.on("typingstatuson", handlePrivateTyping);
    socket.on("typingstatusoff", handlePrivateTypingOff);

    return () => {
      socket.off('typingstatuson');
      socket.off('typingstatusoff');
    }

  },[])

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
              'max-w-xs p-3 rounded-lg text-sm shadow-md relative',
              msg.from === userData?._id ? 'bg-overlay ml-auto' : 'bg-basecolor'
            )}
          >
            {/* Message text */}
            <p className={msg.from === userData?._id ? 'text-basecolor' : 'text-side_yellow'}>
              {msg.content}
            </p>

            {/* Time + Status */}
            <div className="flex justify-end items-center gap-1 mt-1">
              <span className={`${msg.from === userData?._id ? 'text-gray-600' : 'text-white'} text-[10px]`}>
                {msg?.time ? formatCustomDateTime(msg?.time) : formatCustomDateTime(msg?.createdAt)}
              </span>

              {msg.from === userData?._id && (
                <span className="text-[12px] flex items-center">
                  {msg.status === 'sent' && (
                    <SeenIcon/>
                  )}
                  {msg.status === 'delivered' && (
                    <DeliveredIcon/>
                  )}
                    {msg.status === 'sent' && (
                     <SentIcon/>
                    )}
                
                </span>
              )}
            </div>
          </div>

          ))}
        </div>
        }
      {showTyping && <TypingIndicator/>}
        {/* Input */}
        <div className="p-4 border-t flex items-center flex-wrap md:flex-nowrap gap-2 h-fit">
          <div className='flex items-center'>
            <IconButton><InsertEmoticon /></IconButton>
             <IconButton><AttachFile /></IconButton>
          </div>
          <div className='flex items-center w-full'>
            <TextField
            onBlur={onBlurHandler}
            value={msgText}
            onChange={(e) => onChangeHandler(e.target.value)} multiline maxRows={6} fullWidth size="small" placeholder="Type a Message" />
            <IconButton onClick={() => sendMessage()} color="success">
              <Send />
            </IconButton>
          </div>
          
        </div>

    </div>
  );
}
