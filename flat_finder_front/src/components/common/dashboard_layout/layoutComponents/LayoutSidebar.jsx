import React from 'react'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button, Divider, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { sideManuList } from '@/constant/sidebarManus';
import { COLORS } from '@/theme/colors';
import { TbHomeSearch } from "react-icons/tb";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));
  

const LayoutSidebar = ({open, handleDrawerClose}) => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg')); 
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const isXtraScreen = useMediaQuery(theme.breakpoints.up('xl'));
    const dispatch = useDispatch()
    
  return (
    <Drawer
            className='ease-in-out duration-500'
            sx={{
              width: isXtraScreen && !open ? '4%' : isXtraScreen && open ? '15%' : isLargeScreen && !open ? '5%' :  isLargeScreen && open ? '18%' : isMediumScreen ? '22%' : '5%',
              flexShrink: 0,
              marginTop:  isLargeScreen ? '80px' : '0px',
              border: 'none',
              '& .MuiDrawer-paper': {
                width: isXtraScreen && !open ? '3%' : isXtraScreen && open ? '15%' : isLargeScreen && !open ? '5%' :  isLargeScreen && open ? '18%' : isMediumScreen ? '22%' : '45%',
                // boxSizing: 'border-box',
                marginTop: isLargeScreen ? '80px' : '0px',
              border: 'none',

              },
            }}
            variant={isLargeScreen ? 'permanent' : 'temporary'} 
            anchor="left"
            open={open}
          >
            {
              !isLargeScreen && <DrawerHeader sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
               <div onClick={() => router.push('/flat-finder-home')} className='flex flex-row items-center cursor-pointer'>
                  <Typography variant="h7" sx={{ fontWeight: 'bold', color: COLORS.baseColor }}>
                    Flat
                  </Typography>
                  <TbHomeSearch color={COLORS.side_yellow} size={28} className='mx-[4px] font-bold' />
                  <Typography variant="h7" sx={{ fontWeight: 'bold', color: COLORS.baseColor }}>Finder</Typography>
                </div>
            <IconButton onClick={handleDrawerClose}>
                  <CloseIcon />
            </IconButton>
          </DrawerHeader>
            }
        
            <List sx={{paddingX: '15px', marginTop: '10px'}}>
              {
                sideManuList?.map((item) => (
                  <ListItem key={item?.title}  disablePadding>
                  <ListItemButton
                  // onClick={() => navigate(item?.link)}
                  className='ease-in-out duration-300'
                    sx={{
                    marginTop: '6px',
                      borderRadius: '8px',
                      backgroundColor: location.pathname == item?.link ? '#ede7f6' : 'white',
                      '&:hover': {
                        backgroundColor: '#ede7f6',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: '0px' }}>
                        {item.icon()}
                    </ListItemIcon>
  
                    <ListItemText
                      primary={item.title}
                      className="font-normal font-roboto"
                      sx={{ marginLeft: '16px', '& .MuiListItemText-primary': {fontSize: '14px'}}}
                    />
                  </ListItemButton>
                </ListItem>
                ))
              }
             <Divider sx={{marginY: '80px'}}/>

            </List>
            
          </Drawer>
  )
}

export default LayoutSidebar