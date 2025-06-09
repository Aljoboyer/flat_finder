import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { COLORS } from '@/theme/colors';

export default function FFTable({tableHeader, dataList}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{backgroundColor: COLORS.overlay}}>
          <TableRow>
            {
              tableHeader?.map((header) => (
                <TableCell key={header?.id}>{header?.header_label}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
         <TableBody>
          {dataList?.map((row) => (
            <TableRow key={row?._id}>
              {tableHeader.map((col) => (
                <TableCell key={col.id}>
                  {row[col.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
