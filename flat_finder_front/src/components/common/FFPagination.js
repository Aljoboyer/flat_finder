import React, { useState } from 'react';
import { Pagination, Select, MenuItem, Box, Typography } from '@mui/material';
import { COLORS } from '@/theme/colors';

export default function FFPagination() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const totalItems = 100; 

  const pageCount = Math.ceil(totalItems / perPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    console.log('Selected page:', value);
  };

  const handlePerPageChange = (event) => {
    setPerPage(Number(event.target.value));
    setPage(1); // Reset to first page when perPage changes
    console.log('Items per page:', event.target.value);
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: {xs: 'wrap', md: 'nowrap'}}} gap={2}>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography>Items per page:</Typography>
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
        count={pageCount}
        page={page}
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
