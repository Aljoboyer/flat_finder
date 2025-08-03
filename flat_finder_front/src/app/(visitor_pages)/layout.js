"use client"

import { Footers } from "@/components/common/Footers";
import Navbar from "@/components/common/Navbars";
import { getLocalStorageData } from "@/utils/getLocalStorageData";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProfileImage } from "../redux/slices/commonSlice";
import { getSocket } from "@/utils/socket/socket";
import { notificationToast } from "@/utils/toaster/toaster";

export default function VisitorLayout({ children }) {
  const userData = getLocalStorageData();
  const dispatch = useDispatch()
  const socket = getSocket();

  useEffect(() => {
      if(userData?.name){
        dispatch(setProfileImage(userData?.image))
      }
    },[userData?.name])
  
    useEffect(() => {
        if(userData?.name){
          socket.on("notifyseller", (notification) => {
            notificationToast(notification)
          })

          socket.on("notifybuyer", (notification) => {
            console.log('check', notification)
            notificationToast(notification)
          })
    
          return () =>{
            socket.off("notifyseller")
            socket.off("notifybuyer")
          }
        }
      },[])

  return (
    <div className="w-full">
        <Navbar/>
        {children}
        <Footers/>
    </div>
  );
}
