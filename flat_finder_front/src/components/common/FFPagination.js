import { COLORS } from '@/theme/colors'
import { Pagination } from '@mui/material'
import React from 'react'

export default function FFPagination() {
  return (
    <Pagination 
    sx={{

    '& .Mui-selected': {
      backgroundColor: COLORS.baseColor, // your custom color
      color: COLORS.side_yellow,
      '&:hover': {
        backgroundColor: COLORS.baseColor,
      },
    },
  }}
    count={10} variant="outlined" shape="rounded" />
  )
}
