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
  Menu,
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Notifications from '@mui/icons-material/Notifications';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { TbHomeSearch } from "react-icons/tb";
import { COLORS } from '@/theme/colors';

const navItems = [
  'HOLIDAYS',
  'HOTEL',
  'SUPER DEALS',
  'CATEGORIES',
  'LAST-MINUTE DEALS',
];

const iconNavItems = [
  { label: 'RENT A CAR', icon: <DirectionsCarIcon /> },
  { label: 'TRANSFERS', icon: <AirportShuttleIcon /> },
];

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [drawerOpen, setDrawerOpen] = React.useState(false);
const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
      const handleClose = () => {
        setAnchorEl(null);
      };
        const toggleDrawer = (open) => () => {
          setDrawerOpen(open);
        };
      const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#fff', color: '#000', boxShadow: 'none' }}>
      <Box sx={{ borderBottom: `4px solid ${COLORS.side_yellow}` }} />
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Brand */}
       <div className='flex flex-row items-center '>
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
                <FavoriteBorderIcon />
              </IconButton>
              <IconButton>
                <Notifications />
              </IconButton>
              <>
                <Button
                  endIcon={<ArrowDropDownIcon />}
                  sx={{ color: '#000' }}
                  onClick={handleMenuClick}
                >
                  EN
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'language-button',
                  }}
                >
                  <MenuItem >English</MenuItem>
                  <MenuItem >French</MenuItem>
                  <MenuItem >Bangla</MenuItem>
                </Menu>
              </>

              <Button variant="contained" sx={{ backgroundColor: COLORS.baseColor, color: '#fff' }}>
                LOGIN
              </Button>
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
                <Button key={item} sx={{ color: '#fff' }}>{item}</Button>
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
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
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
                <FavoriteBorderIcon />
              </ListItemIcon>
              <ListItemText primary="Favorites" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Notifications />
              </ListItemIcon>
              <ListItemText primary="Help" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Language: EN" />
            </ListItem>
            <ListItem>
              <Button variant="contained" fullWidth sx={{ backgroundColor: COLORS.baseColor, color: '#fff' }}>
                LOGIN
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
