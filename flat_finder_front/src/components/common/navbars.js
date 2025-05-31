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
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FavoriteOutlined from '@mui/icons-material/FavoriteOutlined';
import { TbHomeSearch } from "react-icons/tb";
import { COLORS } from '@/theme/colors';
import { Buttons } from './Buttons';
import ProfileManu from '../buyer/ProfileManu';
import { DropDownBtn } from './DropDownBtn';
import { languages } from '@/constant/dropdownData';

const navItems = [
  'Home',
  'Find Flat'
];

const iconNavItems = [
  { label: 'Your Dashboard', icon: <DirectionsCarIcon /> },
];

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

const [drawerOpen, setDrawerOpen] = React.useState(false);


  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };


  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#fff', color: '#000', boxShadow: 'none' }}>
      <Box sx={{ borderBottom: `4px solid ${COLORS.side_yellow}` }} />
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Brand */}
       <div className='flex flex-row items-center cursor-pointer'>
         <Typography variant="h6" sx={{ fontWeight: 'bold', color: COLORS.baseColor }}>
          Flat
        </Typography>
         <TbHomeSearch color={COLORS.side_yellow} size={25} className='mx-[4px] font-bold' />
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: COLORS.baseColor }}>Finder</Typography>
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

          <Button
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
              <span className="text-link">LOGIN</span>
              <span className="divider">/</span>
              <span className="text-link">REGISTER</span>
            </Button>
              {/* <ProfileManu/> */}
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
      {!isMobile && (
        <Box sx={{ backgroundColor: COLORS.baseColor, px: 2 }}>
          <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', gap: 3 }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: '#fff', ":hover":{textDecoration: 'underline', color: COLORS.side_yellow} }}>{item}</Button>
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 3 }}>
              {iconNavItems.map(({ label, icon }) => (
                <Button key={label} sx={{ color: '#fff' }} startIcon={icon}>
                  {label}
                </Button>
              ))}
            </Box>
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
            {navItems.map((text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {iconNavItems.map(({ label, icon }) => (
              <ListItem button key={label}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
            ))}
          </List>
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
            <ListItem>
                  <Buttons title='LOGIN'/>
            </ListItem>
              <ListItem>
                <Buttons title='REGISTER'/>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
