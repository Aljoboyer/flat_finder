import { Button } from '@mui/material'
import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { COLORS } from '@/theme/colors';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";

export default function ActionButton({
    editBtnShow,
    approveBtnShow,
    itemId,
    editHandler
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
              width: '100px', 
              height: 'fit',
             
              borderRadius: '10px',
              padding: '5px'
            }
          }}
        >
            {
                editBtnShow &&      <MenuItem  className='ease-in-out duration-300'  sx={{ borderRadius: '4px', height: '50px',  '&:hover': {
                backgroundColor: COLORS.overlay,}}} 
                onClick={() => editHandler(itemId)}
            >
                <FaRegEdit className='mr-2'/>
            <p className='font-roboto font-regular text-[14px] text-[#364152]'>Edit</p>
        </MenuItem>
            }
     
        
        {
            approveBtnShow && <MenuItem className='ease-in-out duration-300'  sx={{borderRadius: '4px', height: '50px',  '&:hover': {
        backgroundColor: COLORS.overlay,
        }}} 
        
            ><p className='font-roboto font-regular text-[14px] text-[#364152]'>Approve</p></MenuItem>
        }

          
        </Menu>
      </div>
  )
}
