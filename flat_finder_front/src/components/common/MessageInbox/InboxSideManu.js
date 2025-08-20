import React, { useEffect } from 'react'
import { Avatar, TextField, Typography, Badge, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Close } from '@mui/icons-material';
import NoChatSelected from './NoChatSelected';
import { useState } from 'react';
import { getLocalStorageData } from '@/utils/getLocalStorageData';
import { useLazyGetlAllConversationQuery } from '@/app/redux/features/msgApi';
import { getSocket } from '@/utils/socket/socket';
import { useRef } from 'react';

const conversationsD = [
  { id: 1, name: 'Alene', role: 'Technical Department', time: '2h ago', unread: 2, avatar: '/avatar1.png' },
];

export default function InboxSideManu({
  closeDrawer
}) {
  const userData = getLocalStorageData()
  const [conversations, setConversations] = useState([])
  const router = useRouter();
  const [conversationTrigger, { data: allConversation}] = useLazyGetlAllConversationQuery();
  const socket = getSocket();
  const selectedUserRef = useRef(userData?._id);

   useEffect(() => {
      if(userData?._id){
         selectedUserRef.current = userData?._id;
         conversationTrigger({ querys: `userId=${userData?._id}` })
      }
    },[userData?._id])
  
  useEffect(() => {
    if(allConversation?.conversations?.length > 0){
      setConversations(allConversation?.conversations)
    }
  },[allConversation?.conversations]);

    useEffect(() => {
        const handlePrivateMessage = (msg) => {
          const current = selectedUserRef.current;
          const isCurrentChat = msg.from === current || msg.to === current;
          
          if (isCurrentChat) {
            conversationTrigger({ querys: `userId=${userData?._id}` })
          }
        };
      
        socket.on("receiveMessage", handlePrivateMessage);
      
        return () => {
          socket.off("receiveMessage", handlePrivateMessage);
        };
      }, []);

  return (
       <div className="w-full p-2">
        <div className="px-4 border-b border-gray-100 mb-4">
          <div className="flex flex row justify-between gap-2 my-4">
              <div className="flex items-center gap-2">
                <Avatar src={userData?.image ? userData?.image : `${userData?.name}`} />
                <div>
                  <p className='text-psm md:text-p font-bold text-blackshade'>{userData?.name}</p>
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
         {
          conversations?.length > 0 ? <>
           {conversations?.map((conv) => (
          <div className='w-full inbox_sidemanue'>
            <div
              key={conv?._id}
              onClick={() => {
                if(userData?.role == 'buyer'){
                    router.push(`/buyer-inbox/${conv?.otherUser?._id}`)
                }else{
                    router.push(`/seller-inbox/${conv?.otherUser?._id}`)
                }
              }}
              className="flex justify-between items-center gap-2 p-4 cursor-pointer "
             
            >
              <div className='flex flex-row'>
                <Avatar src={conv?.otherUser?.image}  alt={conv?.otherUser?.name}/>
                <div className="ms-2">
                  <p className='text-p font-semibold'>{conv?.otherUser?.name}</p>
                  <p className='text-xsm fontmedium text-gray100'>{conv?.latestMessage?.content}</p>
                </div>
              </div>

              {/* <div className="flex flex-col ">
                {conv.unread && <Badge badgeContent={conv.unread} color="success"  />}
                <p  className='text-xsm fontmedium text-gray100 mt-4'>{conv.time}</p>
              </div> */}
            </div>
            <Divider/>
          </div>
        ))}
          </> : <NoChatSelected
        from='sidebar'
        title="No Conversations"
        subText="It all starts with hello."
        />
         }
 
      </div>
  )
}
