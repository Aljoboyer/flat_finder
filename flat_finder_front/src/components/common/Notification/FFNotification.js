'use client';
import { useState } from "react";
import { IconButton, Badge, Avatar, Divider } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import { Circle, Home, HomeFilled } from "@mui/icons-material";
import { COLORS } from "@/theme/colors";
import { useRouter } from "next/navigation";
import { getLocalStorageData } from "@/utils/getLocalStorageData";
import { formatCustomDateTime } from "@/helper/customDateTimeFormatter";
import { useUpdateNotificationMutation } from "@/app/redux/features/notificationApi";
import FFLoader2 from "../Loaders/FFLoader-2";



export default function NotificationMenu({notificationsData}) {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(notificationsData?.data);
  const userData = getLocalStorageData();
  const [updateNotification ] = useUpdateNotificationMutation();
  const [deleteNotifyId, setDeleteNotifyId] = useState('')
  
  const toggleMenu = () => setOpen((prev) => !prev);

  const removeNotification = async (e , item) => {
    e.stopPropagation();
      setDeleteNotifyId(item?._id)
      await updateNotification({notifyId: item?._id, updateType: 'delete'})
      setDeleteNotifyId('')
  };

  const notificationClickHandler = async (e, item) => {
    e.stopPropagation();
     toggleMenu()
      if(item?.type == "new-comment"){
        await updateNotification({notifyId: item?._id, updateType: 'update'})
        router.push(`/property-details/${item?.property}`)
      }
       if(item?.type == "rent-request-accepted" || item?.type == "rent-request-rejected"){
        await updateNotification({notifyId: item?._id, updateType: 'update'})
        router.push(`/buyer-rent-requests`)
      }
      if(item?.type == 'user-connected'){
        await updateNotification({notifyId: item?._id, updateType: 'update'})
        router.push(`/seller-profile`)
      }
  }

  return (
    <div className="relative">
      <IconButton onClick={toggleMenu}>
        <Badge badgeContent={notificationsData?.totalUnread} color="warning">
          <NotificationsIcon fontSize="medium" className="text-bluemain" sx={{fontSize: '30px'}} />
        </Badge>
      </IconButton>

      {open && (
        <div className="absolute right-0 mt-2 w-[360px] bg-white shadow-xl rounded-xl z-50">

          <div className="flex items-center justify-between p-4 border-b">
            <p className="text-p_lg text-blackshade font-semibold">All Notification<span className="bg-successOverlay text-blackshade text-psm font-bold px-2 py-0.5 rounded-full ms-2">
              {notificationsData?.data?.length.toString().padStart(2, "0")}
            </span></p>
             <button
             onClick={toggleMenu}
              className="text-basecolor cursor-pointer"
              >
              <CloseIcon fontSize="small" />
              </button>
          </div>

          <div className="max-h-[400px] overflow-y-auto custom-scroll">
            {notificationsData?.data?.map((item) => (
              <div onClick={(e) => notificationClickHandler(e, item)} className="cursor-pointer">
                    <div
                    key={item.id}
                    className={`relative p-4 ${
                    !item.isRead ? "bg-[#e3f2fd]" : ""
                    }`}
                >

                  {
                    deleteNotifyId == item?._id ?  <button
                    className="absolute top-0 right-2 text-basecolor cursor-pointer"
                    >
                        <Circle fontSize="small" />
                    </button> :    <button
                    onClick={(e) => removeNotification(e, item)}
                    className="absolute top-0 right-2 text-basecolor cursor-pointer"
                    >
                    <CloseIcon fontSize="small" />
                    </button>
                  }
                 

                    <div className="flex gap-3 items-start">
                    {item.avatar ? (
                        <Avatar src={item.avatar} alt={item.title} />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-yellowOverlay  flex items-center justify-center">
                        <HomeFilled/>
                        </div>
                    )}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                        <p className="font-medium text-blackshade text-p">{item.type == 'new-comment' ? 'Comment' : item.type == 'rent-request' ? 'Rent Request' :  item.type == 'rent-request-accepted' ? 'Rent Request Accepted' : item.type == 'rent-request-rejected' ? 'Rent Request Rejected' : item.type == 'user-connected' ? 'Follow' : ''}</p>
                        <span className="text-[12px] text-gray-400">{formatCustomDateTime(item.createdAt)}</span>
                        </div>
                        <p className="text-psm text-gray-600">{item.message}</p>
                    </div>
                    </div>
                  
                </div>
                  <Divider/>
              </div>
            ))}
          </div>

          <div className="text-center p-3">
            <button 
            onClick={() => {
              toggleMenu()
              if(userData.role == 'buyer'){
                router.push('/buyer-notifications')
              }else{
                router.push('/seller-notifications')
              }
            }}
            className="w-full text-blue-800 hover:underline text-p font-medium cursor-pointer">
                View All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
