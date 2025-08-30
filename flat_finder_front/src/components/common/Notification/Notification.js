import { Avatar, Box, Divider } from '@mui/material'
import React, { useState } from 'react'
import { COLORS } from '@/theme/colors';
import CloseIcon from "@mui/icons-material/Close";
import { Circle, Home } from '@mui/icons-material';
import FFPagination from '../FFPagination';
import { formatCustomDateTime } from '@/helper/customDateTimeFormatter';
import { useUpdateNotificationMutation } from '@/app/redux/features/notificationApi';
import { useRouter } from 'next/navigation';

export default function Notification({notifications,handlePerPageChange, handlePageChange, totalPage, perPage}) {

    const [updateNotification ] = useUpdateNotificationMutation();
    const [deleteNotifyId, setDeleteNotifyId] = useState('')
    const router = useRouter();
   
 const removeNotification = async (e , item) => {
    e.stopPropagation();
      setDeleteNotifyId(item?._id)
      await updateNotification({notifyId: item?._id, updateType: 'delete'})
      setDeleteNotifyId('')
  };

  const notificationClickHandler = async (e, item) => {
    e.stopPropagation();
      if(item?.type == "new-comment"){
        await updateNotification({notifyId: item?._id, updateType: 'update'})
        router.push(`/property-details/${item?.property}`)
      }
  }

  return (
    <div className='p-4 bg-white'>
        {
            notifications?.map((item) => (
                <div  onClick={(e) => notificationClickHandler(e, item)} className='mt-2'>
                    <Box
                    
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: {lg: 'space-between'},
                        borderRadius: '8px',
                        padding: '20px',
                        cursor: 'pointer',
                        ":hover":{
                            backgroundColor: COLORS.grey100
                        },
                        transition: 'ease-in-out 0.2s',
                        backgroundColor: item?.isRead  ? 'white' : COLORS.blueOverlay 
                    }}>
                    <div className='flex flex-row'>
                        { item?.type == 'user-connected' ? <Avatar sizes='30px' alt='Image'/> :
                            <div className="w-10 h-10 rounded-full bg-yellowOverlay  flex items-center justify-center">
                                <Home className='text-bluemain' />
                            </div>
                        }
                            <div className='ms-2'>
                                <p className='text-blackshade font-medium text-psm md:title_sm '>{item?.message}</p>
                                <p className='text-psm text-gray-600 my-2'>{formatCustomDateTime(item.createdAt)}</p>
                            </div>
                        </div>
                        <div onClick={(e) => removeNotification(e, item)}>
                            {
                                deleteNotifyId == item?._id ? <Circle sx={{fontSize: '25px'}} /> : <CloseIcon onCl className='text-bluemain' sx={{fontSize: '25px'}} />
                            }
                        </div>
                    </Box>
                    <Divider />
                </div>
            ))
        }
        <div className="flex flex-row justify-end mb-4 mt-7">
            <FFPagination 
            perPage={perPage}
            handlePerPageChange={handlePerPageChange}
            handlePageChange={handlePageChange}
            totalPage={totalPage} />
        </div>
    </div>
  )
}
