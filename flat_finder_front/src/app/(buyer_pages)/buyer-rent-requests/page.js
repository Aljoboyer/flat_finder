"use client"
import { useLazyGetRentReqListQuery, useRentReqActionMutation } from '@/app/redux/features/rentApi'
import PaymentModal from '@/components/buyer/Payment/PaymentModal'
import CommonTabs from '@/components/common/CommonTabs/CommonTabs'
import FFPagination from '@/components/common/FFPagination'
import FFTable from '@/components/common/FFTable'
import { buyerRentTableHeader, tableHeaderActionObj } from '@/constant/tableConfig/rentReqTableConfig'
import { RentRequestTabData } from '@/constant/tabsdata'
import { getLocalStorageData } from '@/utils/getLocalStorageData'
import { capitalizeFirstLetter } from '@/utils/stringHelper'
import { useMediaQuery } from '@mui/material'
import {  useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react'

export default function page() {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const islargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const [rentReqListTrigger, { data: rentReqList, isFetching}] = useLazyGetRentReqListQuery();
    const [rentReqAction ] = useRentReqActionMutation();
    const [value, setValue] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const userData = getLocalStorageData()
    const [statusVal, setStatusVal] = useState('pending')
    const [tableHeader, setTableHeader] = useState([])
    const [PaymentModalShow, setPaymentModalShow] = useState(false)
    const [propertyToPay, setPropertyToPay] = useState(null)
    
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        if(newValue == 0){
          setStatusVal('pending')
          setTableHeader(buyerRentTableHeader)
        }
        else{
          setStatusVal('accepted')
          const sliceTableHeader = buyerRentTableHeader.slice(0, -1)
          
          const newTableHeader = [...sliceTableHeader, 
            {id: 'paymentLastDate', header_label: 'Payment EndDate', fieldType: 'date', width: '150px'},
            {...tableHeaderActionObj, payBtn: true, width: '150px'}
          ] 

          setTableHeader(newTableHeader)
        }
    }
    
    const fetchRentReq = () => {
      rentReqListTrigger({ querys: `limit=${perPage}&page=${page}&status=${statusVal}&buyer=${userData?._id}` });
    }

    useEffect(() => {
      if(userData?._id){
        fetchRentReq()
      }    
    },[userData?._id, page, perPage, statusVal])

    const actionHandler = async (action, reqId) => {
      const rentReq = rentReqList?.data?.find((item) => item?._id === reqId)
   
      if(action == 'payment'){
        setPropertyToPay(rentReq)
        setTimeout(() => setPaymentModalShow(true), 1000)
      }
      else{      
        const reqObj = {
            "id": reqId,
            "property_id": rentReq?.property?._id,
            "status": 'canceled'
        }
        
        const actionres = await rentReqAction(reqObj)

        if(actionres?.data?.msg){
          successToast(`Request ${capitalizeFirstLetter(action)} Successfully!`)
        }
      }
    }

    const handlePageChange = (event, value) => {
      setPage(value);
    };

    const handlePerPageChange = (event) => {
      setPerPage(Number(event.target.value));
      setPage(1); 
    };

    useEffect(() => {
      setTableHeader(buyerRentTableHeader)
    },[])
    

  return (
     <div className="bg-overlay  p-6 rounded-t-[20px] h-screen">
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
                tableHeader={tableHeader} 
                dataList={rentReqList?.data}/>
              </div>
              {
                rentReqList?.data?.length > 0 && <div className="flex flex-row justify-end">
                <FFPagination 
                perPage={perPage}
                handlePerPageChange={handlePerPageChange}
                handlePageChange={handlePageChange}
                totalPage={rentReqList?.totalPage} />
              </div>
              }
          </div>
          <PaymentModal
          open={PaymentModalShow}
          setOpen={setPaymentModalShow}
          property={propertyToPay}
          />
      </div>
  )
}
