"use client"
import { useLazyGetRentReqListQuery, useRentReqActionMutation } from '@/app/redux/features/rentApi'
import CommonTabs from '@/components/common/CommonTabs/CommonTabs'
import FFPagination from '@/components/common/FFPagination'
import FFTable from '@/components/common/FFTable'
import FilterAndSearch from '@/components/common/FilterAndSearch'
import FFModal from '@/components/common/Modals/FFModal'
import { filterFieldConfig } from '@/constant/formConfigs/filterConfig'
import { sellerRentTableHeader } from '@/constant/tableConfig/rentReqTableConfig'
import { RentRequestTabData } from '@/constant/tabsdata'
import { getLocalStorageData } from '@/utils/getLocalStorageData'
import { capitalizeFirstLetter } from '@/utils/stringHelper'
import { successToast } from '@/utils/toaster/toaster'
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
    const [filterInputData, setFilterInputData] = useState([])
    const [searchKey, setSearchKey] = useState('')
    const [filterObj, setFilterObj] = useState({city: '', areaName: ''})
    const [statusVal, setStatusVal] = useState('pending')
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [msg, setMsg] = useState('')
    const [tableHeader, setTableHeader] = useState([])
    const [selectedDate, setSelectedDate] = useState(null);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        if(newValue == 0){
          setStatusVal('pending')
          setTableHeader(sellerRentTableHeader)
        }
        else{
          setStatusVal('accepted')
          const newTableHeader = sellerRentTableHeader.slice(0, -1)

          newTableHeader.push({id: 'paymentLastDate', header_label: 'Payment EndDate', fieldType: 'text', width: '150px'},)

          setTableHeader(newTableHeader)
        }
    }
    
    const fetchRentReq = () => {
      rentReqListTrigger({ querys: `limit=${perPage}&page=${page}&status=${statusVal}&buyer=${userData?._id}&paymentLastDate=${(selectedDate && value == 1) ? selectedDate?.format('DD/MM/YYYY') : ''}&createdAt=${(selectedDate && value == 0) ? selectedDate?.format('YYYY-MM-DD') : ''}` });
    }
    
    useEffect(() => {
      if(userData?._id){
        fetchRentReq()
      }    
    },[userData?._id, page, perPage, value, selectedDate])

    const actionHandler = async (action, reqId) => {
      const rentReq = rentReqList?.data?.find((item) => item?._id === reqId)

      if(action == 'message'){
        setMsg(rentReq?.message)
        setTimeout(() => setShowMessageModal(true), 1000)
      }
      else{
      const reqObj = {
          "id": reqId,
          "property_id": rentReq?.property?._id,
          "status": action
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
      setTableHeader(sellerRentTableHeader)
      setFilterInputData(filterFieldConfig?.slice(1, 3))
    },[])

    const onSearchHandler = (searchVal) => {
        setSearchKey(searchVal)
        setTimeout(propertyFetch(), 1000)
    }
  
  const filterChangeHandler = (id, val) => {
   let value = val ? val : ''

    const addFilterValuToInput = filterInputData?.map((item) => {
        if(item?.field_id == id){
          return {...item,fieldValue:{value: value}}
        }else{
          return item;
        }
    })
    setFilterInputData(addFilterValuToInput)

  
    setFilterObj({...filterObj, [id]: value})
    
  }


  return (
     <div className="bg-overlay  p-6 rounded-t-[20px] h-screen">
              <CommonTabs 
                value={value}
                handleTabChange={handleTabChange}
                tabsData={RentRequestTabData} 
                tabWidth={islargeScreen ? '10%' : isMediumScreen ? '20%' : '50%'}
                isPanelShow={false} polygonShape={true}/>
            <div className="bg-white rounded-b-md p-4">
                 <FilterAndSearch 
                    createBtnShow={false}
                    filterFieldConfig={filterInputData}
                    onChangeHandler={filterChangeHandler}
                    onSearchHandler={onSearchHandler}
                    datePickerShow={true}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate} 
                />
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
            <FFModal 
              open={showMessageModal} 
              setOpen={setShowMessageModal}
              note={msg}
              show='message'
              sendBtnShow={false}
            />
        </div>
  )
}
