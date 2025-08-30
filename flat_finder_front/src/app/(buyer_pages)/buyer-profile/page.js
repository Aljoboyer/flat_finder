"use client"
import CommonTabs from "@/components/common/CommonTabs/CommonTabs";
import { ProfileSettingsTabData } from "@/constant/tabsdata";
import {  useTheme } from '@mui/material/styles';
import { useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoShieldCheckmark } from "react-icons/io5";
import Follow from "@/components/common/Follow/Follow";

export default function ProfilePage() {
   const theme = useTheme();
   const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
   const islargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
   const [value, setValue] = useState(0);
  const [profileTabs, setProfileTabs] = useState([])
  
   const handleTabChange = (event, newValue) => {
    setValue(newValue);
   }


  useEffect(() => {
    if(ProfileSettingsTabData?.length > 0){
      setProfileTabs([...ProfileSettingsTabData,
        {
        label: 'Following',
        icon: <IoShieldCheckmark  size={22}/>,
        content: <Follow/>,}
      ])
    }
  },[])
  
  return (
    <div className='bg-overlay p-6 rounded-t-[20px] h-fit lg:h-[100vh]'>
      <CommonTabs 
          value={value}
          handleTabChange={handleTabChange}
          tabsData={profileTabs} 
          tabWidth={islargeScreen ? '10%' : isMediumScreen ? '20%' : '50%'}
          isPanelShow={true} polygonShape={true}/>
    </div>
  );
}
