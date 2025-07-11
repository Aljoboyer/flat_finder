import { useLazyBuyerSavedPropertyListQuery } from '@/app/redux/features/profileApi';
import FFPagination from '@/components/common/FFPagination'
import FFTable from '@/components/common/FFTable'
import { savedListTableConfig } from '@/constant/tableConfig/savedListTableConfig';
import { getLocalStorageData } from '@/utils/getLocalStorageData'
import React, { useEffect, useState } from 'react'

export default function SavedFlatList() {
    const userData = getLocalStorageData();
    const [propertySavedList, { data: savedList, isFetching}] = useLazyBuyerSavedPropertyListQuery();
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const buyerSavedList = () => {
       propertySavedList({ querys: `limit=${perPage}&page=${page}&buyer=${userData?._id}` });
    }

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handlePerPageChange = (event) => {
        setPerPage(Number(event.target.value));
        setPage(1); 
    };
    
    useEffect(() => {
        buyerSavedList()
    },[page, perPage])
    
    const actionHandler = () => {

    }

  return (
    <div className=''>
        <p className='text-lg_title font-medium text-blackshade my-5'>My Saved Properties</p>

        <div className="my-7">
        <FFTable
        actionHandler={actionHandler}
        loading={isFetching}
        tableHeader={savedListTableConfig} 
        dataList={savedList?.data}/>
        </div>
        {
        savedList?.data?.length > 0 && <div className="flex flex-row justify-end">
        <FFPagination 
        perPage={perPage}
        handlePerPageChange={handlePerPageChange}
        handlePageChange={handlePageChange}
        totalPage={savedList?.totalPage} />
        </div>
        }
    </div>
  )
}
