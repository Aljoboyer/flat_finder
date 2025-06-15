import { Button } from '@mui/material'
import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { COLORS } from '@/theme/colors';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { FiSlash } from "react-icons/fi";

const ActionManuItem = ({title, icon, clickHandler}) => {
  return (
     <MenuItem onClick={clickHandler} className='ease-in-out duration-300'  sx={{borderRadius: '4px', height: '50px',  '&:hover': {
        backgroundColor: COLORS.overlay,}}}>
          {icon}
          <p className='font-roboto font-regular text-[14px] text-[#364152]'>{title}</p>
          
      </MenuItem>
  )
}

export default function ActionButton({
    editBtnShow,
    approveBtnShow,
    itemId,
    actionHandler,
    statusBtn,
    tableitem
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const manuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <div>
        <Button
          sx={{ 
            width: '35px',
            height: '35px',
          }}
          className="basic-button"
          aria-controls={manuOpen ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={manuOpen ? 'true' : undefined}
          onClick={handleClick}
        >
          <BsThreeDotsVertical size={20} color="#017163"/>
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
              width: 'auto', 
              height: 'fit',
             
              borderRadius: '10px',
              padding: '5px'
            }
          }}
        >
            {
                editBtnShow && <ActionManuItem clickHandler={() => actionHandler('edit', itemId)} title="Edit" icon={<FaRegEdit className='mr-2'/>}/>
            }
     
            {
                approveBtnShow && <ActionManuItem  title="Approve" icon={<FaRegEdit className='mr-2'/>}/>
            }
            {
                statusBtn && <ActionManuItem clickHandler={() => {
                  const actionName = tableitem?.status == 'active' ? "inactive" : "active"
                  actionHandler(actionName, itemId)
                }} title={tableitem?.status == 'active' ? "In Active" : "Active"} icon={<FiSlash className='mr-2'/>}/>
            }
          
        </Menu>
      </div>
  )
}
