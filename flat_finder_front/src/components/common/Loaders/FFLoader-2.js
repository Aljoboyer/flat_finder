import { COLORS } from '@/theme/colors'
import { commonStyles } from '@/theme/commonStyle'
import { Box, CircularProgress } from '@mui/material'
import React from 'react'

export default function FFLoader2() {
  return (
    <Box sx={{ ...commonStyles.flexRowCenter , height: '150px', width: '100%'}}>
      <CircularProgress color="secondary" />
    </Box> 
  )
}
