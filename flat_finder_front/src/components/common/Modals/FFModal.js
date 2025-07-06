import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Buttons } from '../Buttons/Buttons';
import { COLORS } from '@/theme/colors';
import InputField from '../Inputs/InputField';

export default function FFModal({
  open, setOpen, 
  confirmHandler, note, setNote, 
  loading, sendBtnShow = true, modalTitle = '',
  title1 = 'Send', show
}) {

  const handleClose = () => setOpen(false);

  return (

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: 3,
            backgroundColor: 'whtie',
            border: `2px solid ${COLORS.baseColor}`,
          },
        }}
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{ pr: 5 }}
        >
         <p className='text-p_lg text-basecolor font-semibold'>{modalTitle}</p>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: COLORS.baseColor,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        {
          show == 'rentReq' && <div className='p-4 w-full md:w-[400px] lg:w-[500px]'>
            <p className='my-2 text-basecolor font-medium text-psm'>Write a note to the property owner:</p>
            <InputField
            label='Note'
            placeholder='Write a Note'
            inputType='textarea'
            field={{value: note, onChange: (e) => setNote(e.target.value)}}
            otherStyle={{backgroundColor: COLORS.overlay}}
            />
          </div>
        }
        {
          show == 'message' && <div className='p-4 w-full md:w-[400px] lg:w-[500px]'>
            <p className='my-2 text-basecolor font-medium text-p_lg'>{note}</p>
          </div>
        }

        <DialogActions sx={{ px: 3, pb: 2 }}>
            <Buttons
            bgColor={'white'}
            textColor={COLORS.baseColor}
            onClickHandler={handleClose}
            title='Cancel'
            other_style={{ border: `1px solid ${COLORS.baseColor}`, width: '150px'}}
          />

         {
          sendBtnShow && <Buttons
            bgColor={COLORS.baseColor}
            textColor={COLORS.side_yellow}
            onClickHandler={confirmHandler}
            title={title1}
            other_style={{ width: '150px'}}
            isLoading={loading}
          />
         } 
        </DialogActions>
      </Dialog>
  );
}
