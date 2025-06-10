import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { COLORS } from '@/theme/colors';
import { Avatar, Box, Chip } from '@mui/material';
import FFLoader from './FFLoader';
import FFNodata from './FFNodata';
import ActionButton from './ActionButton';
import FFChip from './FFChip';

export default function FFTable({tableHeader, dataList, loading}) {
  return (
    <TableContainer component={Paper}>
      
      {
        loading ?  <FFLoader/> : 
      <> 
        {
         dataList?.length == 0  || !dataList ? <FFNodata/> : <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{backgroundColor: COLORS.overlay}}>
          <TableRow>
            {
              tableHeader?.map((header) => (
                <TableCell sx={{fontWeight: '700' , fontSize: '16px', textAlign: 'center'}} key={header?.id}>{header?.header_label}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
         <TableBody>
          {dataList?.map((row) => (
            <TableRow key={row?._id}>
              {tableHeader.map((col) => (
                
                <TableCell  sx={col?.isImageShow ? {display: 'flex', flexDirection: 'row', } : {textAlign: 'center'}} key={col.id}>
                  {col?.isImageShow && <Avatar sx={{marginRight: '5px'}} alt="Remy Sharp" src={row?.images[0]} />}
                  
                    <Box>
                      {col?.id == 'status' ? <FFChip label={row[col.id] } /> : <p className=''>{ row[col.id]}</p>}
                        
                        <p className='mt-2 text-gray-500 font-medium text-[12px]'>{row[col.secondField]}</p>
                    </Box>
                      {col?.showActionbtn && <ActionButton editBtnShow={col?.edit}/>}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
        }
      </>
      }
    </TableContainer>
  );
}
