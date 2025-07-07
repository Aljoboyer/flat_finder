import * as React from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ClearIcon from '@mui/icons-material/Clear';
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers';

const CustomDatePicker = ({
    selectedDate, setSelectedDate
}) => {


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <DesktopDatePicker
          label="Select Date"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          slotProps={{
            textField: {
              
              variant: 'outlined',
              sx: {
                
                width: {xs: '100%', md: '100%', lg: '100%'},
                '& label.Mui-focused': {
                  color: '#017163',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#017163',
                  },
                  '&:hover fieldset': {
                    borderColor: '#017163',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#017163',
                  },
                },
              },
            },
          }}
        />
        {selectedDate && (
          <IconButton
            onClick={() => setSelectedDate(null)}
            sx={{
              height: '25px',
              width: '25px',
              bgcolor: '#fff000',
              color: '#017163',
              '&:hover': {
                bgcolor: '#017163',
                color: '#fff000',
              },
              border: '1px solid #017163',
            }}
          >
            <ClearIcon />
          </IconButton>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
