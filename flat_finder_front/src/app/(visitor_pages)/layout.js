"use client"

import { getLocalStorageData } from "@/utils/getLocalStorageData";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProfileImage } from "../redux/slices/commonSlice";
import Navbar from "@/components/common/navbars";
import FFooter from "@/components/common/FFooter";

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
        <FFooter/>
    </div>
  );
}
