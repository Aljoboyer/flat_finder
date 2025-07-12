'use client';
import { useState } from "react";
import { IconButton, Badge, Avatar, Divider } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import { Home } from "@mui/icons-material";
import { COLORS } from "@/theme/colors";
import { useRouter } from "next/navigation";
import { getLocalStorageData } from "@/utils/getLocalStorageData";

const notificationsMock = [
  {
    id: 1,
    title: "John Doe",
    message: "It is a long established fact that a reader will be distracted",
    time: "2 min ago",
    avatar: "https://i.pravatar.cc/40?img=1",
    unread: false,
  },
  {
    id: 2,
    title: "Store Verification Done",
    message: "We have successfully received your request.",
    time: "2 min ago",
    icon: <Home className="text-basecolor"/>,
    unread: false,
  },
  {
    id: 3,
    title: "Check Your Mail.",
    message: "All done! Now check your inbox as you’re in for a sweet treat!",
    time: "2 min ago",
    icon: <Home className="text-basecolor"/>,
    unread: true,
  },
    {
    id: 4,
    title: "John Doe",
    message: "It is a long established fact that a reader will be distracted",
    time: "2 min ago",
    avatar: "https://i.pravatar.cc/40?img=1",
    unread: true,
  },
  {
    id: 5,
    title: "Store Verification Done",
    message: "We have successfully received your request.",
    time: "2 min ago",
    icon: "🏬",
    unread: false,
  },
  {
    id: 6,
    title: "Check Your Mail.",
    message: "All done! Now check your inbox as you’re in for a sweet treat!",
    time: "2 min ago",
    icon: "📬",
    unread: false,
  },
    {
    id: 7,
    title: "John Doe",
    message: "It is a long established fact that a reader will be distracted",
    time: "2 min ago",
    avatar: "https://i.pravatar.cc/40?img=1",
    unread: true,
  },
  {
    id: 8,
    title: "Store Verification Done",
    message: "We have successfully received your request.",
    time: "2 min ago",
    icon: "🏬",
    unread: true,
  },
  {
    id: 9,
    title: "Check Your Mail.",
    message: "All done! Now check your inbox as you’re in for a sweet treat!",
    time: "2 min ago",
    icon: "📬",
    unread: false,
  },
];

export default function NotificationMenu() {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(notificationsMock);
  const userData = getLocalStorageData();

  const toggleMenu = () => setOpen((prev) => !prev);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="relative">
      <IconButton onClick={toggleMenu}>
        <Badge badgeContent={notifications.length} color="warning">
          <NotificationsIcon fontSize="medium" className="text-bluemain" />
        </Badge>
      </IconButton>

      {open && (
        <div className="absolute right-0 mt-2 w-[360px] bg-white shadow-xl rounded-xl z-50">

          <div className="flex items-center justify-between p-4 border-b">
            <p className="text-p_lg text-blackshade font-semibold">All Notification<span className="bg-successOverlay text-blackshade text-psm font-bold px-2 py-0.5 rounded-full ms-2">
              {notifications.length.toString().padStart(2, "0")}
            </span></p>
             <button
             onClick={toggleMenu}
              className="text-basecolor cursor-pointer"
              >
              <CloseIcon fontSize="small" />
              </button>
          </div>

          <div className="max-h-[400px] overflow-y-auto custom-scroll">
            {notificationsMock.map((item) => (
              <div>
                    <div
                    key={item.id}
                    className={`relative p-4 ${
                    item.unread ? "bg-[#e3f2fd]" : ""
                    }`}
                >
                    <button
                    onClick={() => removeNotification(item.id)}
                    className="absolute top-0 right-2 text-basecolor cursor-pointer"
                    >
                    <CloseIcon fontSize="small" />
                    </button>

                    <div className="flex gap-3 items-start">
                    {item.avatar ? (
                        <Avatar src={item.avatar} alt={item.title} />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-yellowOverlay  flex items-center justify-center">
                        {item.icon}
                        </div>
                    )}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                        <p className="font-medium text-blackshade text-p">{item.title}</p>
                        <span className="text-[12px] text-gray-400">{item.time}</span>
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
