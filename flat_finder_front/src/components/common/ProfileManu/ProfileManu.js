import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Typography } from '@mui/material';
import { commonStyles } from '@/theme/commonStyle';
import { COLORS } from '@/theme/colors';
import { Avatar } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRouter } from 'next/navigation';
import { getLocalStorageData } from '@/utils/getLocalStorageData';



export default function ProfileManu({manuItems}) {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const userData = getLocalStorageData();
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (action) => {
    setAnchorEl(null);
    if(action == 'Logout'){
      localStorage.removeItem('ff_user')
      router.push('/login')
    }
    else if(action == 'Account'){
      if(userData?.role == 'buyer'){
       router.push('/buyer-dashboard-home')
      }else{
        router.push('/seller-dashboard-home')
      }
    }
    else if(action == 'Profile'){
      if(userData?.role == 'buyer'){
       router.push('/buyer-profile')
      }else{
        router.push('/seller-profile')
      }
    }
    else if (action == 'Dasboard'){
          router.push('/seller-dashboard-home')
    }
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Profile">

          <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2, display: 'flex', alignItems: 'center', gap: '4px' }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            src=''
            alt='Ahan'
            sx={{ width: 34, height: 34, bgcolor: COLORS.baseColor }}
          />
          <KeyboardArrowDownIcon sx={{ fontSize: 20, color: COLORS.baseColor }} />
        </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {
            manuItems?.map((item) => (
                <MenuItem sx={{...commonStyles.flexRowBetween, marginTop: '10px'}} onClick={() => handleClose(item?.label)}>
                    <Box sx={{marginRight: '10px'}}>{item?.icon}</Box> <Typography>{item?.label}</Typography>
                </MenuItem>
            ))
        }
       
      </Menu>
    </React.Fragment>
  );
}
