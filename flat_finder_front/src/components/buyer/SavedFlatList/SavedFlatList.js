import { useLazyBuyerSavedPropertyListQuery } from '@/app/redux/features/profileApi';
import { useSavePropertyMutation } from '@/app/redux/features/propertyApi';
import FFPagination from '@/components/common/FFPagination'
import FFTable from '@/components/common/FFTable'
import SectionTitle from '@/components/common/SectionTitle/SectionTitle';
import { savedListTableConfig } from '@/constant/tableConfig/savedListTableConfig';
import { getLocalStorageData } from '@/utils/getLocalStorageData'
import { errorToast, successToast } from '@/utils/toaster/toaster';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function SavedFlatList() {
    const router = useRouter();
    const userData = getLocalStorageData();
    const [propertySavedList, { data: savedList, isFetching}] = useLazyBuyerSavedPropertyListQuery();
    const [saveProperty, { isLoading: saveLoading }] = useSavePropertyMutation();
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
    
    const actionHandler = async (action, id) => {
        const savedItem = savedList?.data?.find((item) => item?._id == id)

        if(action == 'view'){
            router.push(`/property-details/${savedItem?.property?._id}`)
        }else{
            const reqObj = {
                buyer: savedItem?.buyer?._id,
                property: savedItem?.property?._id,
                save:  false
            }
            const saveRes = await saveProperty(reqObj);

            if(saveRes?.data?.msg == 'Property Saved Successfully'){
                successToast('Property Saved Successfully')
            }
            else if(saveRes?.data?.msg == 'Property Unsaved Successfully'){
                successToast('Property Unsaved Successfully')
            }
            else{
                errorToast('Saving Failed')
            }
        }
    }

  return (
    <div className=''>
        <SectionTitle title="MY SAVED PROPERTIES" />

        <div className="my-7 h-screen">
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
