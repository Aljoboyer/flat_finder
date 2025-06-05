import React from 'react'
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Brightness5OutlinedIcon from '@mui/icons-material/Brightness5Outlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import { Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { COLORS } from '@/theme/colors';

export const LayoutNav = ({handleDrawerOpen}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
  const manuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutHandler = () => {
    handleClose()
    localStorage.removeItem('pixplayToken')
  }
  return (
    <Box sx={{position:'sticky',top: '0px', width: '100%', backgroundColor: 'white', height: '90px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingX: {md: '20px'}, alignItems: 'center' ,zIndex: 1}}>
        
    <Box sx={{display: 'flex', 
      alignItems: 'center', 
      width: {xs: '100%', sm: 'mx-content', md:'100%', lg: '80%'},
      overflowX: {xs: 'initial', sm: 'auto'},
      }}>
      <Toolbar>
          <Typography 
            sx={{
          display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' },  // Ensure hidden on smaller screens, visible on larger
        }}
            variant="h6" 
            noWrap 
            component="div"
          >
            PixplaySync
          </Typography>
        <Button
            onClick={handleDrawerOpen}
            sx={{
              marginLeft: '20px',
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
            <MenuIcon color="#5e35b1"/>
        </Button>
      </Toolbar>
   
    </Box>

    <Box className='ease-in-out duration-300'  sx={{ height: '50px', width: {xs: '80px', md: '100px'},
      backgroundColor: !manuOpen ? COLORS.primaryOverlay : COLORS.side_yellow, 
      borderRadius: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingX: '10px', 
      '&:hover': {
        backgroundColor: COLORS.side_yellow,
        '& .basic-button': {
          color:  "white",  
        },
        },
        '& .basic-button': {
          color: manuOpen ?  "white" : '#1e88e5',  
        }
        }}>
     <Avatar   sx={{ width: 35, height:35 , backgroundColor: COLORS.side_yellow, }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div>
        <Button
          sx={{ minWidth: 'auto', 
            width: '40px',
            height: '30px',
          }}
          className="basic-button"
          aria-controls={manuOpen ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={manuOpen ? 'true' : undefined}
          onClick={handleClick}
        >
          <Brightness5OutlinedIcon color="#1e88e5"/>
        </Button>
        
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={manuOpen}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
         disableScrollLock={true}
          sx={{
            '& .MuiPaper-root': {
              width: '200px', 
              height: '150px',
              marginTop: '20px',
              borderRadius: '10px',
              padding: '15px'
            }
          }}
        >
          <MenuItem className='ease-in-out duration-300'  sx={{ borderRadius: '4px', height: '50px',  '&:hover': {
        backgroundColor: COLORS.overlay,
        }}} 
        onClick={handleClose}><Brightness5OutlinedIcon sx={{width: '18px', marginRight: '10px'}} color="#364152"/><p className='font-roboto font-regular text-[15px] text-[#364152]'>Account Settings</p>
        </MenuItem>

          <MenuItem className='ease-in-out duration-300'  sx={{borderRadius: '4px', height: '50px',  '&:hover': {
        backgroundColor: COLORS.overlay,
        }}} onClick={logOutHandler}><LogoutSharpIcon sx={{width: '18px', marginRight: '10px'}} color="#364152"/><p className='font-roboto font-regular text-[15px] text-[#364152]'>Logout</p></MenuItem>
        </Menu>
      </div>

    </Box>
  </Box>
  )
}
