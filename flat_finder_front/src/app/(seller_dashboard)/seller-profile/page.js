"use client"
import CommonTabs from "@/components/common/CommonTabs/CommonTabs";
import { ProfileSettingsTabData } from "@/constant/tabsdata";
import {  useTheme } from '@mui/material/styles';
import { useMediaQuery } from "@mui/material";
import React, { useState } from "react";

export default function ProfilePage() {
   const theme = useTheme();
   const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
   const islargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
   const [value, setValue] = useState(0);

   const handleTabChange = (event, newValue) => {
    setValue(newValue);
   }

  return (
    <div className='bg-overlay p-6 rounded-t-[20px] h-fit lg:h-[100vh]'>
      <CommonTabs 
          value={value}
          handleTabChange={handleTabChange}
          tabsData={ProfileSettingsTabData} 
          tabWidth={islargeScreen ? '10%' : isMediumScreen ? '20%' : '50%'}
          isPanelShow={true} polygonShape={true}/>
    </div>
  );
}
