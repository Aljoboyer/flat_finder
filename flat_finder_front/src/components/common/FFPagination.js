import React, { useState } from 'react';
import { Pagination, Select, MenuItem, Box, Typography } from '@mui/material';
import { COLORS } from '@/theme/colors';

export default function FFPagination({
  totalPage,
  handlePageChange,
  handlePerPageChange,
  perPage
}) {
  
  return (
    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: {xs: 'wrap', md: 'nowrap'}}} gap={2}>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography sx={{color: COLORS.grey500, fontSize: '14px'}}>Items per page:</Typography>
        <Select
          value={perPage}
          onChange={handlePerPageChange}
          size="small"
        >
          {[5, 10, 20, 50].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Pagination
        count={totalPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        sx={{
          marginTop: {xs: '5px', md: '0px'},
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: `${COLORS.baseColor} !important`,
            color: `${COLORS.side_yellow} !important`,
            '&:hover': {
              backgroundColor: `${COLORS.baseColor} !important`,
            },
          },
        }}
      />
    </Box>
  );
}
