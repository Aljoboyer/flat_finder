import React from 'react'
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { Avatar, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { COLORS } from '@/theme/colors';
import { TbHomeSearch } from "react-icons/tb";
import ProfileManu from '@/components/common/ProfileManu/ProfileManu';
import Logout from '@mui/icons-material/Logout';

const manuItems = [
    {"label": "Profile", "link": "", "icon": <Avatar fontSize="small" />},
    {"label": "Logout", "link": "", "icon": <Logout fontSize="small"/>},
]

export const LayoutNav = ({handleDrawerOpen}) => {


  return (
    <Box sx={{position:'sticky',top: '0px', width: '100%', backgroundColor: 'white', height: '60px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingX: {md: '20px'}, alignItems: 'center' ,zIndex: 1}}>
        
    <Box sx={{display: 'flex', 
      alignItems: 'center', 
      width: {xs: '100%', sm: 'mx-content', md:'100%', lg: '80%'},
      overflowX: {xs: 'initial', sm: 'auto'},
      }}>
      <Toolbar>
          <div onClick={() => router.push('/flat-finder-home')} className='hidden md:flex flex-row items-center cursor-pointer '>
         <Typography  sx={{ fontWeight: 'bold', color: COLORS.baseColor , fontSize: {xs: '18px', md: '24px'}}}>
          Flat
        </Typography>
         <TbHomeSearch color={COLORS.side_yellow} size={28} className='mx-[4px] font-bold' />
        <Typography sx={{ fontWeight: 'bold', color: COLORS.baseColor , fontSize: {xs: '18px', md: '24px'}}}>Finder</Typography>
       </div>
        <Button
            onClick={handleDrawerOpen}
            sx={{
              marginLeft: {xsm: '0px', md: '20px'},
              backgroundColor: COLORS.overlay,
              padding: '5px',
              minWidth: 'auto', 
              width: '40px',
              height: '30px',
              '&:hover': {
                backgroundColor: COLORS.baseColor,
                width: '40px',
                height: '30px',
              },
            }}
          >
            <MenuIcon color="#fff000"/>
        </Button>
      </Toolbar>
   
    </Box>

    <Box className='ease-in-out duration-300'  sx={{ height: '50px', width: {xs: '80px', md: '100px'},
    
      borderRadius: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>

      <ProfileManu manuItems={manuItems}/>
    </Box>
  </Box>
  )
}
