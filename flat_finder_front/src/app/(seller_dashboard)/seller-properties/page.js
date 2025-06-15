"use client"

import CommonTabs from "@/components/common/CommonTabs/CommonTabs";
import { PropertiesTabData } from "@/constant/tabsdata";
import { useEffect, useState } from "react";
import {  useTheme } from '@mui/material/styles';
import { useMediaQuery } from "@mui/material";
import FilterAndSearch from "@/components/common/FilterAndSearch";
import FFTable from "@/components/common/FFTable";
import { filterFieldConfig } from "@/constant/formConfigs/filterConfig";
import FFPagination from "@/components/common/FFPagination";
import { useLazyGetPropertyListQuery, useUpdatePropertyMutation } from "@/app/redux/features/propertyApi";
import { propertyTableHeader } from "@/constant/tableConfig/propertyTableConfig";
import { useRouter } from "next/navigation";
import { getLocalStorageData } from "@/utils/getLocalStorageData";


export default function SellerProperties() {
  const router = useRouter()
  const [propertyListTrigger, { data: propertyList, error, isLoading , isFetching}] = useLazyGetPropertyListQuery();
  const [updateProperty, { }] = useUpdatePropertyMutation();
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const islargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(1);
  
  const [perPage, setPerPage] = useState(10);
  const userData = getLocalStorageData()
  const [tableHeader, setTableHeader] = useState([])

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePerPageChange = (event) => {
    setPerPage(Number(event.target.value));
    setPage(1); 
  };
  
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    if(newValue == 1){
        propertyListTrigger({ querys: `limit=${perPage}&page=${page}&status=inactive` });
        setTableHeader(propertyTableHeader)
    }
    else if(newValue == 2){
        propertyListTrigger({ querys: `limit=${perPage}&page=${page}&status=in_process` });
        setTableHeader(propertyTableHeader.slice(0, -1))
    }
    else if(newValue == 1){
        propertyListTrigger({ querys: `limit=${perPage}&page=${page}&status=booked` });
        setTableHeader(propertyTableHeader.slice(0, -1))
    }
    else{
        propertyListTrigger({ querys: `limit=${perPage}&page=${page}&status=active` });
        setTableHeader(propertyTableHeader)
    }

  };

    
    useEffect(() => {
      if (typeof window !== 'undefined') {
        
        propertyListTrigger({ querys: `limit=${perPage}&page=${page}&status=active&seller=${userData?._id}` });
      }
    }, [perPage, page]);

    const filterChangeHandler = () => {

    }
    const actionHandler = async (action,itemId) => {
      if(action == 'edit'){
        router.push(`/edit-property/${itemId}`)
      }
      else if(action == 'active' || action == 'inactive'){
        const updatePropertyRes = await updateProperty({_id: itemId, status: action})
        console.log("updatePropertyRes", updatePropertyRes)
      }
    }

    useEffect(() => {
      setTableHeader(propertyTableHeader)
    },[])

  return (
    <div className="bg-overlay  p-6 rounded-t-[20px]">
          <CommonTabs 
            value={value}
            handleTabChange={handleTabChange}
            tabsData={PropertiesTabData} 
            tabWidth={islargeScreen ? 'perPage%' : isMediumScreen ? '20%' : '50%'}
            isPanelShow={false} polygonShape={true}/>
        <div className="bg-white rounded-b-md p-4">
          
            <FilterAndSearch 
              createHandler={() => router.push('/create-property')}
              filterFieldConfig={filterFieldConfig}
              onChangeHandler={filterChangeHandler}
            />
            <div className="my-7">
              <FFTable
              actionHandler={actionHandler}
              loading={isFetching}
              tableHeader={tableHeader} 
              dataList={propertyList?.data}/>
            </div>
            {
              propertyList?.data?.length > 0 && <div className="flex flex-row justify-end">
              <FFPagination 
              perPage={perPage}
              handlePerPageChange={handlePerPageChange}
              handlePageChange={handlePageChange}
              totalPage={propertyList?.totalPage} />
            </div>
            }
        </div>
    </div>
  );
}
