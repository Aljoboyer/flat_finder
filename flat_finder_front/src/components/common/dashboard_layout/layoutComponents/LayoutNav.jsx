import React from 'react'
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { Avatar, Badge, Box, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { COLORS } from '@/theme/colors';
import { TbHomeSearch } from "react-icons/tb";
import ProfileManu from '@/components/common/ProfileManu/ProfileManu';
import Logout from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import NotificationMenu from '../../Notification/FFNotification';
import { Notifications } from '@mui/icons-material';
import { getLocalStorageData } from '@/utils/getLocalStorageData';
import MailIcon from '@mui/icons-material/Mail';

const manuItems = [
    {"label": "Profile", "link": "", "icon": <Avatar fontSize="small" />},
    {"label": "Logout", "link": "", "icon": <Logout fontSize="small"/>},
]

export const LayoutNav = ({handleDrawerOpen}) => {
  const router = useRouter();
  const userData = getLocalStorageData()

  return (
    <Box sx={{position:'sticky',top: '0px', width: '100%', backgroundColor: 'white', height: '70px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingX: {md: '20px'}, alignItems: 'center' ,zIndex: 1,}}>
        
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
              display: {lg: 'none'},
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

    <Box className='flex flex-row items-center'  sx={{ marginRight: '15px' }}>
        <IconButton onClick={() => {
          if(userData?.role == 'buyer'){
            router.push('/buyer-inbox')
          }
          else{
            router.push('/seller-inbox')
          }
        }}>
        <Badge badgeContent={4} color="info">
          <MailIcon sx={{fontSize: '30px'}} color="secondary"/>
        </Badge>
        </IconButton>

        <div onClick={() => {
          if(userData?.role == 'buyer'){
            router.push('/buyer-notifications')
          }else{
            router.push('/seller-notifications')
          }
        }}>
           <Badge sx={{display: {xs: 'block', md: 'none'}}} badgeContent={4} color="warning">
              <Notifications fontSize="medium" className="text-bluemain" sx={{fontSize: '30px'}} />
          </Badge>
        </div>

        <div className='hidden md:block'>
          <NotificationMenu />
        </div>

      <ProfileManu manuItems={manuItems}/>
    </Box>
  </Box>
  )
}
