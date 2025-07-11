"use client"
import { useLazyGetRentBuyHistoryListQuery } from '@/app/redux/features/rentApi'
import FFPagination from '@/components/common/FFPagination'
import FFTable from '@/components/common/FFTable'
import FilterAndSearch from '@/components/common/FilterAndSearch'
import { buyerHistoryTableHeader } from '@/constant/tableConfig/historyTableConfig'
import { getLocalStorageData } from '@/utils/getLocalStorageData'
import React, { useEffect, useState } from 'react'

export default function page() {
    const [getRentBuyHistory, { data: historyList, isFetching}] = useLazyGetRentBuyHistoryListQuery();
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const userData = getLocalStorageData()
    const [selectedDate, setSelectedDate] = useState(null);

    const fetchRentReq = () => {
      getRentBuyHistory({ querys: `limit=${perPage}&page=${page}&buyer=${userData?._id}&createdAt=${selectedDate ? selectedDate?.format('YYYY-MM-DD') : ''}` });
    }

    useEffect(() => {
      if(userData?._id){
        fetchRentReq()
      }    
    },[userData?._id, page, perPage, selectedDate])

    const actionHandler = () => {
        
    }

    const handlePageChange = (event, value) => {
      setPage(value);
    };

    const handlePerPageChange = (event) => {
      setPerPage(Number(event.target.value));
      setPage(1); 
    };

  return (
     <div className="bg-overlay  p-6 rounded-t-[20px] h-screen">

          <div className="bg-white rounded-b-md p-4">
             <FilterAndSearch 
                searchInputShow={false}
                createBtnShow={false}
                datePickerShow={true}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate} 
              />
              <div className="my-7">
                <FFTable
                actionHandler={actionHandler}
                loading={isFetching}
                tableHeader={buyerHistoryTableHeader} 
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
