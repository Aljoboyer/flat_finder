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

export default function RentRequestModal({open, setOpen}) {
  
  const [note, setNote] = useState(
    'Hi, I’m really interested in this property. Please let me know the next steps. Looking forward to your response!'
  );

  const handleClose = () => setOpen(false);

  const handleSend = () => {
    console.log('Request note sent:', note);
    handleClose();
  };

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
         <p className='text-p_lg text-basecolor font-semibold'> Send Rent Request</p>
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

        <div className='p-4 w-full md:w-[400px] lg:w-[500px]'>
          <p className='my-2 text-basecolor font-medium text-psm'>Write a note to the property owner:</p>
          <InputField
          label='Note'
          placeholder='Write a Note'
          inputType='textarea'
          field={{value: note, onChange: (e) => setNote(e.target.value)}}
          otherStyle={{backgroundColor: COLORS.overlay}}
          />
        </div>

        <DialogActions sx={{ px: 3, pb: 2 }}>
            <Buttons
            bgColor={'white'}
            textColor={COLORS.baseColor}
            onClickHandler={handleClose}
            title='Cancel'
            other_style={{ border: `1px solid ${COLORS.baseColor}`, width: '150px'}}
          />

          <Buttons
            bgColor={COLORS.baseColor}
            textColor={COLORS.side_yellow}
            onClickHandler={handleSend}
            title='Send'
            other_style={{ width: '150px'}}
          />
        </DialogActions>
      </Dialog>
  );
}
