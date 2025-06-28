import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { COLORS } from '@/theme/colors';


export default function FFRangeSlider({
  handleChange,
  value, 
  maxValue,
  step,
  isPrice,
  title
}) {

function formatPriceValue(sliderValue) {
  if (Number(sliderValue) <= 20) {
    const newVal =  Number(sliderValue) * 5000;
     return `${newVal.toLocaleString()} BDT`; 
  } else if (Number(sliderValue) <= 40) {
    const newVal = (20 * 5000) + (Number(sliderValue) - 20) * 50000;
     return `${newVal.toLocaleString()} BDT`; 
  } else {
    const newVal = (20 * 5000) + (20 * 50000) + (Number(sliderValue) - 40) * 400000;
     return `${newVal.toLocaleString()} BDT`; 
  }
}

function formatSqrftValue(value) {
  return `${value.toLocaleString()} sqft`; 
}
  return (
    <Box sx={{ width: 300 , marginX: 2, marginTop: '20px'}}>
      <p className='mt-2 text-p font-medium'>{title}</p>
      <Slider
        getAriaLabel={() => 'Area range'}
        value={value}
        onChange={handleChange}
        max={maxValue}
        step={step}
        valueLabelDisplay="auto"
        getAriaValueText={isPrice ? formatPriceValue : formatSqrftValue}
        valueLabelFormat={isPrice ? formatPriceValue : formatSqrftValue}
        sx={{
          color: COLORS.baseColor, // change slider color
          height: 12,
          width: '260px',
          '& .MuiSlider-thumb': {
            height: 24,
            width: 24,
            backgroundColor: '#fff',
            border: '2px solid currentColor',
          },
          '& .MuiSlider-valueLabel': {
            backgroundColor: '#1976d2',
            fontSize: '15px',
            top: -10,
          },
          '& .MuiSlider-track': {
            border: 'none',
          },
          '& .MuiSlider-rail': {
            opacity: 0.3,
            backgroundColor: '#bfbfbf',
          },
        }}
      />
    </Box>
  );
}
