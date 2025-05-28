"use client"
import { Button, Menu, MenuItem } from '@mui/material'
import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const DropDownBtn = ({manuArray = [], 
  endIcon = <ArrowDropDownIcon />, buttonTitle = 'Select', setManueData}) => {
const [anchorEl, setAnchorEl] = React.useState(null);
    
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    }
    const open = Boolean(anchorEl);
      const handleClose = () => {
        setAnchorEl(null);
      };
  return (
       <>
                <Button                  
                  endIcon={endIcon}
                  sx={{ color: '#000' }}
                  onClick={handleMenuClick}
                >
                  {buttonTitle}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'language-button',
                  }}
                >
                  {
                    manuArray?.map((item) => (
                      <MenuItem >{item?.label}</MenuItem>
                    ))
                  }
                </Menu>
              </>
  )
}