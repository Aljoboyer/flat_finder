"use client"
import { useLazyGetRentReqListQuery } from '@/app/redux/features/rentApi'
import CommonTabs from '@/components/common/CommonTabs/CommonTabs'
import FFPagination from '@/components/common/FFPagination'
import FFTable from '@/components/common/FFTable'
import { rentReqTableHeader } from '@/constant/tableConfig/rentReqTableConfig'
import { RentRequestTabData } from '@/constant/tabsdata'
import { getLocalStorageData } from '@/utils/getLocalStorageData'
import { useMediaQuery } from '@mui/material'
import {  useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react'

export default function page() {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const islargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const [rentReqListTrigger, { data: rentReqList, error, isLoading , isFetching}] = useLazyGetRentReqListQuery();
    const [value, setValue] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const userData = getLocalStorageData()

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    }
    
    const fetchRentReq = () => {
      rentReqListTrigger({ querys: `limit=${perPage}&page=${page}&status=pending&buyer=${userData?._id}` });
    }
    useEffect(() => {
      if(userData?._id){
        fetchRentReq()
      }    
    },[userData?._id])

    const actionHandler = () => {

    }

    console.log('rentReqList ===>' , rentReqList?.data)

  return (
     <div className="bg-overlay  p-6 rounded-t-[20px]">
              <CommonTabs 
                value={value}
                handleTabChange={handleTabChange}
                tabsData={RentRequestTabData} 
                tabWidth={islargeScreen ? '10%' : isMediumScreen ? '20%' : '50%'}
                isPanelShow={false} polygonShape={true}/>
            <div className="bg-white rounded-b-md p-4">
                <div className="my-7">
                  <FFTable
                  actionHandler={actionHandler}
                  loading={isFetching}
                  tableHeader={rentReqTableHeader} 
                  dataList={rentReqList?.data}/>
                </div>
                {/* {
                  propertyList?.data?.length > 0 && <div className="flex flex-row justify-end">
                  <FFPagination 
                  perPage={perPage}
                  handlePerPageChange={handlePerPageChange}
                  handlePageChange={handlePageChange}
                  totalPage={propertyList?.totalPage} />
                </div>
                } */}
            </div>
        </div>
  )
}
