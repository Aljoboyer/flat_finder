import { Avatar, Box, Divider } from '@mui/material'
import React, { useState } from 'react'
import { COLORS } from '@/theme/colors';
import CloseIcon from "@mui/icons-material/Close";
import { Home } from '@mui/icons-material';
import FFPagination from '../FFPagination';

export default function Notification() {
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);

    const handlePageChange = (event, value) => {
      setPage(value);
    };

    const handlePerPageChange = (event) => {
      setPerPage(Number(event.target.value));
      setPage(1); 
    };
  return (
    <div className='p-4 bg-white'>
        {
            [1,2,3,4,5,6,7,8,9].map((item) => (
                <div className='mt-2'>
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: {lg: 'space-between'},
                        borderRadius: '8px',
                        padding: '20px',
                        cursor: 'pointer',
                        ":hover":{
                            backgroundColor: COLORS.grey100
                        },
                        transition: 'ease-in-out 0.2s',
                        backgroundColor: item == 1 || item == 3 || item == 6  ? 'white' : COLORS.blueOverlay 
                    }}>
                    <div className='flex flex-row'>
                        { item == 1 || item == 3 || item == 6 ? <Avatar sizes='30px' alt='Image'/> :
                            <div className="w-10 h-10 rounded-full bg-yellowOverlay  flex items-center justify-center">
                                <Home className='text-bluemain'/>
                            </div>
                        }
                            <div className='ms-2'>
                                <p className='text-blackshade font-medium text-title_sm'>Your proposal for Experienced React Native Developer Needed for Mobile App was viewed.</p>
                                <p className='text-psm text-gray-600 my-2'>Jul 6 2025</p>
                            </div>
                        </div>
                        <div>
                            <CloseIcon className='text-bluemain' sx={{fontSize: '25px'}} />
            
                        </div>
                    </Box>
                    <Divider />
                </div>
            ))
        }
        <div className="flex flex-row justify-end mb-4 mt-7">
            <FFPagination 
            perPage={perPage}
            handlePerPageChange={handlePerPageChange}
            handlePageChange={handlePageChange}
            totalPage={3} />
        </div>
    </div>
  )
}
