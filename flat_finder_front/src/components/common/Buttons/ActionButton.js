import { Button } from '@mui/material'
import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { COLORS } from '@/theme/colors';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { FiSlash } from "react-icons/fi";
import { getLocalStorageData } from '@/utils/getLocalStorageData';
import { Buttons } from './Buttons';
import { useRouter } from 'next/navigation';

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
    tableitem,
    cancelBtnShow,
    payBtn = false,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const manuOpen = Boolean(anchorEl);
  const userData = getLocalStorageData();
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <div>

       {
        payBtn ?  <Buttons
          onClickHandler={() => router.push(`/property-payment/${tableitem?.property?._id}`)}
          bgColor={COLORS.side_yellow}
          textColor={COLORS.baseColor}
          other_style={{width: '60px', fontWeight: '700'}}
          title='Pay'
        /> :  <Button
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
       }
        
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
                approveBtnShow && <ActionManuItem 
                clickHandler={() => actionHandler('accepted', itemId)}
                title="Accept" icon={<FaRegEdit className='mr-2'/>}/>
            }
            {
                statusBtn && <ActionManuItem clickHandler={() => {
                  const actionName = tableitem?.status == 'active' ? "inactive" : "active"
                  actionHandler(actionName, itemId)
                }} title={tableitem?.status == 'active' ? "In Active" : "Active"} icon={<FiSlash className='mr-2'/>}/>
            }

            {
               cancelBtnShow && <ActionManuItem clickHandler={() => {
                  const actionName = (tableitem?.status == 'pending') && (userData?._id == tableitem?.buyer?._id )  ? "cancel" : "rejected"
                  actionHandler(actionName, itemId)
                }} title={(tableitem?.status == 'pending') && (userData?._id == tableitem?.buyer?._id )  ? "Cancel" : "Reject"} icon={<FiSlash className='mr-2'/>}/>
            }

        </Menu>
      </div>
  )
}
