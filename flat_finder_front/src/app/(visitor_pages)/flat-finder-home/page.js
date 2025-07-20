"use client"

import { setProfileImage } from "@/app/redux/slices/commonSlice";
import FutureSection from "@/components/visitors/LandingPage/FutureSection";
import { HeroSection } from "@/components/visitors/LandingPage/HeroSection";
import RecentProperties from "@/components/visitors/LandingPage/RecentProperties";
import PropertyCards from "@/components/visitors/LandingPage/InforSection";
import { getLocalStorageData } from "@/utils/getLocalStorageData";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ShowUpPage from "@/components/visitors/LandingPage/ShowUpSection";

export default function LandingHome() {
  const dispatch = useDispatch()
  const userData = getLocalStorageData()

  useEffect(() => {
    if(userData?.image){
      dispatch(setProfileImage(userData?.image))
    }
  },[userData?.image])

  return (
    <div className="w-full">
        <HeroSection/>
        <FutureSection/>
        <RecentProperties/>
        <ShowUpPage/>
        <PropertyCards/>
    </div>
  );
}
