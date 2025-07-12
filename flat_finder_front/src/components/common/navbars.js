"use client"
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Notifications from '@mui/icons-material/Notifications';
import FavoriteOutlined from '@mui/icons-material/FavoriteOutlined';
import { TbHomeSearch } from "react-icons/tb";
import { COLORS } from '@/theme/colors';
import { Buttons } from './Buttons/Buttons';
import { DropDownBtn } from './Buttons/DropDownBtn';
import { languages } from '@/constant/dropdownData';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import ProfileManu from './ProfileManu/ProfileManu';
import { getAuthToken } from '@/utils/getAuthToken';
import { AccountCircle, Logout } from '@mui/icons-material';
import { getLocalStorageData } from '@/utils/getLocalStorageData';
import NotificationMenu from './Notification/FFNotification';

const navItems = [
    {label: 'Home', link: '/flat-finder-home'},
    {label: 'Flat / Apartment', link: '/search-property', stateValue:  'flat'},
    {label: 'Showroom', link: '/search-property', stateValue:  'showroom'},
    {label: 'Resturant', link: '/search-property', stateValue:  'restaurant'},
    {label: 'Office', link: '/search-property', stateValue:  'office'},
];

const Navbar = () => {
  const router = useRouter()
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isLoggedIn = getAuthToken();
  const userData = getLocalStorageData()
 const pathname = usePathname();
 
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

 

  const navigationHanlder = (item) => {
 
    const link = item?.link ?? '/'
    const propertyType = item?.stateValue ?? ''

    const url = `${link}?propertyType=${encodeURIComponent(propertyType)}`
    router.push(url)
  }

  const manuItems = [
    {"label": `${userData?.role == 'buyer' ? 'Account' : 'Dasboard'}`, "link": "", "icon": <Avatar fontSize="small" />},
    {"label": "Logout", "link": "", "icon": <Logout fontSize="small"/>},
  ]
  
  const iconNavItems = [
    { label: `${userData?.role == 'buyer' ? 'My Account' : 'Dasboard'}`, icon: <AccountCircle /> },
  ];

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#fff', color: '#000', boxShadow: 'none' }}>
      <Box sx={{ borderBottom: `4px solid ${COLORS.side_yellow}` }} />

      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Brand */}
       <div onClick={() => router.push('/flat-finder-home')} className='flex flex-row items-center cursor-pointer'>
         <Typography variant="h5" sx={{ fontWeight: 'bold', color: COLORS.baseColor }}>
          Flat
        </Typography>
         <TbHomeSearch color={COLORS.side_yellow} size={28} className='mx-[4px] font-bold' />
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: COLORS.baseColor }}>Finder</Typography>
       </div>


        {/* Right Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {!isMobile && (
            <>
              {
                userData?.role == 'buyer' && <IconButton onClick={() => router.push('/buyer-dashboard-home')}>
                <FavoriteOutlined className='text-basecolor'/>
              </IconButton>
              }
              
              <NotificationMenu />

             <DropDownBtn manuArray={languages} buttonTitle='En'/>

            {
              isLoggedIn ?   <ProfileManu manuItems={manuItems}/> : <Button
              variant="contained"
              sx={{
                backgroundColor: COLORS.overlay,
                color: COLORS.baseColor,
                display: 'flex',
                alignItems: 'center',
                '& .text-link': {
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                },
                '& .divider': {
                  mx: 1,
                },
              }}
            >
              <span onClick={() => router.push('/login')} className="text-link">LOGIN</span>
              <span className="divider">/</span>
              <span onClick={() => router.push('/register')} className="text-link">REGISTER</span>
            </Button>
            }
            
            </>
          )}
          {isMobile && (
            <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Desktop Navigation */}
      {(!isMobile && pathname !== '/login' && pathname !== '/register') && (
        <Box sx={{ backgroundColor: COLORS.baseColor, px: 2 }}>
          <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', gap: 3 }}>
              {navItems.map((item) => (
                <Button onClick={() => navigationHanlder(item)} key={item?.label} sx={{ color: '#fff', fontWeight: '600', ":hover":{textDecoration: 'underline', color: COLORS.side_yellow} }}>{item?.label}</Button>
              ))}
            </Box>
              {
                isLoggedIn &&  <Box sx={{ display: 'flex', gap: 3 }}>
              {iconNavItems.map(({ label, icon }) => (
                <Button onClick={() => {
                  if(userData?.role  == 'buyer'){
                    router.push('/buyer-dashboard-home')
                  }else{
                    router.push('/seller-dashboard-home')
                  }
                }} key={label} sx={{ color: '#fff', fontWeight: '600', ":hover":{textDecoration: 'underline', color: COLORS.side_yellow} }} startIcon={icon}>
                  {label}
                </Button>
              ))}
            </Box>
              }
          </Toolbar>
        </Box>
      )}

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          // onClick={toggleDrawer(false)}
          // onKeyDown={toggleDrawer(false)}
        >
          <List>
            {navItems.map((item) => (
              <ListItem  button key={item?.label}>
                <ListItemText onClick={() =>{
                   navigationHanlder(item)
                   setDrawerOpen(false)
                }} primary={item?.label} />
              </ListItem>
            ))}
          </List>
          <Divider />
            <ListItem>
                <DropDownBtn manuArray={languages} buttonTitle='En'/>
            </ListItem>

          {
            isLoggedIn && <List>
            {iconNavItems.map(({ label, icon }) => (
              <ListItem button key={label}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText onClick={() => {
                  if(userData?.role  == 'buyer'){
                    router.push('/buyer-dashboard-home')
                  }else{
                    router.push('/seller-dashboard-home')
                  }
                }} primary={label} />
              </ListItem>
            ))}
          </List>
          }
          <Divider />
          <List>

            <ListItem>
              <ListItemIcon>
                 <Badge badgeContent={4} color="warning">
                  <Notifications fontSize="medium" className="text-bluemain" />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Notification" />
            </ListItem>

           {
            isLoggedIn &&          <ListItem>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
           }
           {
            !isLoggedIn &&  <ListItem>
                  <Buttons onClickHandler={() => {
                    setDrawerOpen(false)
                    router.push('/login')
                  }} title='LOGIN'/>
            </ListItem>
           }
             {
              !isLoggedIn &&  <ListItem>
                <Buttons onClickHandler={() => {
                  setDrawerOpen(false)
                  router.push('/register')
                }} title='REGISTER'/>
            </ListItem>
             }
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
