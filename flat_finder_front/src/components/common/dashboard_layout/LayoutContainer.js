"use client"
import * as React from 'react';
import {useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { LayoutNav } from './layoutComponents/LayoutNav';
import LayoutSidebar from './layoutComponents/LayoutSidebar';

export default function LayoutContainer({children}) {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg')); 

    const [open, setOpen] = React.useState(isLargeScreen);
  
    React.useEffect(() => {
      setOpen(isLargeScreen); // Automatically set drawer open for large screens
    }, [isLargeScreen]);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('pixplayToken')
    // if(!token){
    //   navigate('/login')
    // }
  },[])

  return (
    <Box sx={{width: '100%' ,position: 'relative'}}>
      {/* <CssBaseline /> */}
      <LayoutNav handleDrawerOpen={handleDrawerOpen} />
      <Box sx={{width: '100%',  display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>

          <LayoutSidebar open={open} handleDrawerClose={handleDrawerClose}/>

          <Box className='ease-in-out duration-500' sx={{width: open && isLargeScreen ? '85%' : '100%', marginX: 'auto',}}>
              {/* <DrawerHeader /> */}
            {children}
          </Box>
      </Box>
    </Box>
  );
}
