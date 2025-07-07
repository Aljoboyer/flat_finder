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
import FFLoader from './Loaders/FFLoader';
import FFNodata from './FFNodata';
import ActionButton from './Buttons/ActionButton';
import FFChip from './FFChip';
import { capitalizeFirstLetter } from '@/utils/stringHelper';
import { getObjValue } from '@/utils/objectHelper';
import moment from 'moment';

export default function FFTable({tableHeader, 
    dataList, 
    loading,
    actionHandler
  }) {
  return (
    <TableContainer component={Paper}  sx={{ overflowX: 'auto' ,
       '&::-webkit-scrollbar': {
      height: '8px', // Smaller height for horizontal scrollbar
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#c1c1c1', // Scrollbar color
      borderRadius: '8px',
    }, }}>
      
      {
        loading ?  <FFLoader/> : 
      <> 
        {
         dataList?.length == 0  || !dataList ? <FFNodata/> : <Table sx={{ minWidth: 1000, tableLayout: 'fixed' }}aria-label="simple table">
        <TableHead sx={{backgroundColor: COLORS.overlay}}>
          <TableRow>
            {
              tableHeader?.map((header) => (
                <TableCell sx={{fontWeight: '700' , fontSize: '16px', textAlign: 'center', width: header?.width}} key={header?.id}>{header?.header_label}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
         <TableBody>
          {dataList?.map((row) => (
            <TableRow  key={row?._id}>
              {tableHeader.map((col) => (
                
                <TableCell key={col?.id}  sx={col?.isImageShow ? {display: 'flex', flexDirection: 'row', width: col?.width} : {textAlign: 'center', width: col?.width}} >
                  {col?.isImageShow && <Avatar sx={{marginRight: '5px'}} alt="Remy Sharp" src={row?.images ? row?.images[0] : col?.imageFieldKey ? getObjValue(row, col.imageFieldKey) : row?.property?.images[0] } />}
                  
                    <Box>
                      {col?.id == 'status' && <FFChip label={getObjValue(row, col.id)} />}
                      
                      {
                        col?.fieldType == 'date' && <p className='text-psm font-medium'>{moment(getObjValue(row, col.id)).format('DD/MM/YYYY')}</p>  
                      }
                      {
                        col?.fieldType == 'number' &&  <p className='text-psm font-medium'>{`${getObjValue(row, col.id)} ${col?.fieldType == 'number' && 'BDT'}`}</p>
                      }
                      
                      {
                        col?.fieldType == 'text' && <>
                        {
                           col?.id == 'message' ? <p className='text-psm font-medium'>{getObjValue(row, col.id)?.slice(0, 20)}... <span onClick={() => actionHandler('message', row?._id)} className='cursor-pointer text-bluemain'>View</span></p> : <p className='text-psm font-medium'>{col?.makeFirstLaterCapital ? capitalizeFirstLetter(getObjValue(row, col.id)) : getObjValue(row, col.id)}</p>
                        }
                        </> 
                      }

                       {col?.secondField && <p className='mt-2 text-gray-500 font-medium text-[12px]'>{getObjValue(row, col?.secondField)}</p>} 
                    </Box>
                      {col?.showActionbtn && <ActionButton itemId={row?._id} actionHandler={actionHandler} editBtnShow={col?.editBtnShow} tableitem={row} approveBtnShow={col?.approveBtnShow} statusBtn={col?.statusBtn} cancelBtnShow={col?.cancelBtnShow} payBtn={col.payBtn}/>}
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
