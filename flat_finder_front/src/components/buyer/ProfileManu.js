import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Typography } from '@mui/material';
import { commonStyles } from '@/theme/commonStyle';
import { COLORS } from '@/theme/colors';
import { Avatar } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const manuItems = [
    {"label": "Profile", "link": "", "icon": <Avatar fontSize="small" />},
    {"label": "Logout", "link": "", "icon": <Logout fontSize="small"/>},
]

export default function ProfileManu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Profile">
          {/* <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src='' alt='Ahan' sx={{ width: 34, height: 34 , bgcolor: COLORS.baseColor}}/>
          </IconButton> */}
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
                <MenuItem sx={{...commonStyles.flexRowBetween, marginTop: '10px'}} onClick={handleClose}>
                    <Box sx={{marginRight: '10px'}}>{item?.icon}</Box> <Typography>{item?.label}</Typography>
                </MenuItem>
            ))
        }
       
      </Menu>
    </React.Fragment>
  );
}
