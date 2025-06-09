import { COLORS } from '@/theme/colors'
import { Pagination } from '@mui/material'
import React from 'react'

export default function FFPagination() {
  return (
 <Pagination
  sx={{
    '& .MuiPaginationItem-root.Mui-selected': {
      backgroundColor: `${COLORS.baseColor} !important`,
      color: `${COLORS.side_yellow} !important`,
      '&:hover': {
        backgroundColor: `${COLORS.baseColor} !important`,
      },
    },
  }}
  count={10}
  variant="outlined"
  shape="rounded"
/>

  )
}
