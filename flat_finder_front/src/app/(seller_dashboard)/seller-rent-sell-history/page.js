"use client"
import { useLazyGetAreaNamesQuery } from '@/app/redux/features/dropDownApi'
import { useLazyGetRentBuyHistoryListQuery } from '@/app/redux/features/rentApi'
import FFPagination from '@/components/common/FFPagination'
import FFTable from '@/components/common/FFTable'
import FilterAndSearch from '@/components/common/FilterAndSearch'
import { filterFieldConfig } from '@/constant/formConfigs/filterConfig'
import { historyTableHeader, sellerHistoryTableHeader } from '@/constant/tableConfig/historyTableConfig'
import { getLocalStorageData } from '@/utils/getLocalStorageData'
import React, { useEffect, useState } from 'react'

export default function page() {
    const [getRentBuyHistory, { data: historyList, isFetching}] = useLazyGetRentBuyHistoryListQuery();
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const userData = getLocalStorageData()
    const [selectedDate, setSelectedDate] = useState(null);
    const [filterInputData, setFilterInputData] = useState([])
    const [filterObj, setFilterObj] = useState({city: '', areaName: ''})
    const [areaNameTrigger, { data: areaNameList}] = useLazyGetAreaNamesQuery();

    const fetchRentReq = () => {
      getRentBuyHistory({ querys: `limit=${perPage}&page=${page}&seller=${userData?._id}&createdAt=${selectedDate ? selectedDate?.format('YYYY-MM-DD') : ''}&city=${filterObj?.city}&areaName=${filterObj?.areaName}` });
    }

    useEffect(() => {
      if(userData?._id){
        fetchRentReq()
      }    
    },[userData?._id, page, perPage, selectedDate, filterObj?.city, filterObj?.areaName])

    const actionHandler = () => {
        
    }

    const handlePageChange = (event, value) => {
      setPage(value);
    };

    const handlePerPageChange = (event) => {
      setPerPage(Number(event.target.value));
      setPage(1); 
    };

    useEffect(() => {
      setFilterInputData(filterFieldConfig?.slice(1, 3))
    },[])

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

   const onSearchHandler = (searchVal) => {
        setSearchKey(searchVal)
        setTimeout(propertyFetch(), 1000)
    }


  useEffect(() => {
    if(filterObj?.city){
      areaNameTrigger({ querys: `cityName=${filterObj?.city}` });
      setFilterObj({...filterObj, areaName: ''})
    }
  },[filterObj?.city])
  
  useEffect(() => {
    if(areaNameList?.data?.length > 0 && areaNameList){

      const formatAreaNameData = areaNameList?.data?.map((item) => {
        const newObj = {"label": item?.areaName, value: item?.areaName}
        return newObj
      })
      
      const fieldsAddedValue = filterInputData?.map((item) => {
        if(item?.field_id == 'areaName'){
          const newObj = {...item, options: formatAreaNameData, suggestionText: ''}
          return newObj
        }
        else{
          return item
        }
      })
      setFilterInputData(fieldsAddedValue)
    }

  },[areaNameList, areaNameList?.data?.length])
  return (
     <div className="bg-overlay  p-6 rounded-t-[20px] h-screen">

          <div className="bg-white rounded-b-md p-4">
              <FilterAndSearch 
                createBtnShow={false}
                filterFieldConfig={filterInputData}
                onChangeHandler={filterChangeHandler}
                onSearchHandler={onSearchHandler}
                datePickerShow={true}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate} 
                searchInputShow={false}
            />
              <div className="my-7">
                <FFTable
                actionHandler={actionHandler}
                loading={isFetching}
                tableHeader={sellerHistoryTableHeader} 
                dataList={historyList?.data}/>
              </div>
              {
                historyList?.data?.length > 0 && <div className="flex flex-row justify-end">
                <FFPagination 
                perPage={perPage}
                handlePerPageChange={handlePerPageChange}
                handlePageChange={handlePageChange}
                totalPage={historyList?.totalPage} />
              </div>
              }
          </div>
      </div>
  )
}
