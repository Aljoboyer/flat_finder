"use client"
import  React, { useState } from 'react';
import {useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { LayoutNav } from './layoutComponents/LayoutNav';
import LayoutSidebar from './layoutComponents/LayoutSidebar';
import { getLocalStorageData } from '@/utils/getLocalStorageData';
import { BuyerSideManuList, SellerSideManuList } from '@/constant/sidebarManus';

export default function LayoutContainer({children}) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg')); 

  const [open, setOpen] = React.useState(isLargeScreen);
  const userData = getLocalStorageData()
  const [sideManuList, setSideManuList] = useState([]);

  React.useEffect(() => {
    setOpen(isLargeScreen);
  }, [isLargeScreen]);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if(userData?.role){
      if(userData?.role === "buyer"){
        setSideManuList(BuyerSideManuList)
      }
      else{
        setSideManuList(SellerSideManuList)
      }
    }
  },[userData?.role])

  return (
    <Box sx={{width: '100%' ,position: 'relative',}}>
      <LayoutNav handleDrawerOpen={handleDrawerOpen} />
      <Box sx={{width: '100%',  display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>

          <LayoutSidebar sideManuList={sideManuList} open={open} handleDrawerClose={handleDrawerClose}/>

          <Box className='ease-in-out duration-500' sx={{width: open && isLargeScreen ? '85%' : '100%', marginX: 'auto',}}>
            {children}
          </Box>
      </Box>
    </Box>
  );
}
