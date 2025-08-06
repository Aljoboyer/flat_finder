"use client"

import { Footers } from "@/components/common/Footers";
import Navbar from "@/components/common/Navbars";
import { getLocalStorageData } from "@/utils/getLocalStorageData";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProfileImage } from "../redux/slices/commonSlice";

export default function VisitorLayout({ children }) {
  const userData = getLocalStorageData();
  const dispatch = useDispatch()

  useEffect(() => {
      if(userData?.name){
        dispatch(setProfileImage(userData?.image))
      }
    },[userData?.name])
  
   

  return (
    <div className="w-full">
        <Navbar/>
        {children}
        <Footers/>
    </div>
  );
}
