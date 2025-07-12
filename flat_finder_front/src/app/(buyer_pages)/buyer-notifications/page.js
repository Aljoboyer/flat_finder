"use client"
import CommonTabs from '@/components/common/CommonTabs/CommonTabs';
import { NotificationsTabData } from '@/constant/tabsdata';
import { useMediaQuery } from '@mui/material'
import {  useTheme } from '@mui/material/styles';
import React, { useState } from 'react'

export default function page() {
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const islargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    
    const handleTabChange = (event, newValue) => {
      setValue(newValue);
    }

  return (
     <div className="bg-overlay  p-6 rounded-t-[20px] h-screen">
        <CommonTabs 
          value={value}
          handleTabChange={handleTabChange}
          tabsData={NotificationsTabData} 
          tabWidth={islargeScreen ? '10%' : isMediumScreen ? '20%' : '50%'}
          isPanelShow={false} polygonShape={true}/>
    </div>
  )
}
