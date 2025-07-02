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
import ProfileManu from '../buyer/ProfileManu';
import { getAuthToken } from '@/utils/getAuthToken';
import { AccountCircle } from '@mui/icons-material';

const navItems = [
    {label: 'Home', link: '/flat-finder-home'},
    {label: 'Flat / Apartment', link: '/search-property', stateValue:  'flat'},
    {label: 'Showroom', link: '/search-property', stateValue:  'showroom'},
    {label: 'Resturant', link: '/search-property', stateValue:  'restaurant'},
    {label: 'Office', link: '/search-property', stateValue:  'office'},
];

const iconNavItems = [
  { label: 'My Account', icon: <AccountCircle /> },
];

const Navbar = () => {
  const router = useRouter()
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isLoggedIn = getAuthToken();
  
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const pathname = usePathname();

  const navigationHanlder = (item) => {
 
    const link = item?.link ?? '/'
    const propertyType = item?.stateValue ?? ''

    const url = `${link}?propertyType=${encodeURIComponent(propertyType)}`
    router.push(url)
  }

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
              <IconButton>
                <FavoriteOutlined />
              </IconButton>
              <IconButton>
                <Notifications />
              </IconButton>
             <DropDownBtn manuArray={languages} buttonTitle='En'/>

            {
              isLoggedIn ?   <ProfileManu/> : <Button
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
                <Button onClick={() => router.push('/buyer-dashboard-home')} key={label} sx={{ color: '#fff', fontWeight: '600', ":hover":{textDecoration: 'underline', color: COLORS.side_yellow} }} startIcon={icon}>
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
          {
            isLoggedIn && <List>
            {iconNavItems.map(({ label, icon }) => (
              <ListItem button key={label}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
            ))}
          </List>
          }
          <Divider />
          <List>

            <ListItem>
              <ListItemIcon>
                <Notifications />
              </ListItemIcon>
              <ListItemText primary="Notification" />
            </ListItem>
            <ListItem>
                <DropDownBtn manuArray={languages} buttonTitle='En'/>
            </ListItem>
           {
            isLoggedIn &&  <ListItem>
               <ProfileManu/>
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
