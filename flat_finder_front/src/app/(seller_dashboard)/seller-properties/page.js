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
import { useLazyGetAreaNamesQuery } from "@/app/redux/features/dropDownApi";


export default function SellerProperties() {
  const router = useRouter()
  const [propertyListTrigger, { data: propertyList, error, isLoading , isFetching}] = useLazyGetPropertyListQuery();
  const [updateProperty, { }] = useUpdatePropertyMutation();
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const islargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(1);
  const [areaNameTrigger, { data: areaNameList}] = useLazyGetAreaNamesQuery();

  const [perPage, setPerPage] = useState(10);
  const userData = getLocalStorageData()
  const [tableHeader, setTableHeader] = useState([])
  const [searchKey, setSearchKey] = useState('')
  const [tabValue, setTabValue] = useState('active')
  const [filterInputData, setFilterInputData] = useState([])
  const [filterObj, setFilterObj] = useState({city: '', areaName: ''})
  
  const propertyFetch = () => {
    propertyListTrigger({ querys: `limit=${perPage}&page=${page}&status=${tabValue}&seller=${userData?._id}&searchKey=${searchKey}&city=${filterObj?.city}&areaName=${filterObj?.areaName }` });
  }
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
        propertyListTrigger({ querys: `limit=${10}&page=${1}&status=inactive` });
        setTableHeader(propertyTableHeader)
        setTabValue('inactive')
    }
    else if(newValue == 2){
        propertyListTrigger({ querys: `limit=${10}&page=${1}&status=in_process` });
        setTableHeader(propertyTableHeader.slice(0, -1))
    }
    else if(newValue == 3){
        propertyListTrigger({ querys: `limit=${10}&page=${1}&status=booked` });
        setTableHeader(propertyTableHeader.slice(0, -1))
        setTabValue('booked')
    }
    else{
        propertyListTrigger({ querys: `limit=${10}&page=${1}&status=active` });
        setTableHeader(propertyTableHeader)
        setTabValue('active')
    }

  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
 
      propertyFetch()
    }
  }, [perPage, page]);

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
    if(id == 'city'){
        if(value){
          propertyListTrigger({ querys: `limit=${10}&page=${1}&status=${tabValue}&seller=${userData?._id}&searchKey=${searchKey}&city=${value}` });
        }else{
          propertyListTrigger({ querys: `limit=${10}&page=${1}&status=${tabValue}&seller=${userData?._id}&searchKey=${searchKey}` });
        }
    }
    else if (id == 'areaName'){
      if(value){
        propertyListTrigger({ querys: `limit=${10}&page=${1}&status=${tabValue}&seller=${userData?._id}&searchKey=${searchKey}&city=${filterObj?.city}&areaName=${value}` });
      }
      else{
        propertyListTrigger({ querys: `limit=${10}&page=${1}&status=${tabValue}&seller=${userData?._id}&searchKey=${searchKey}&city=${filterObj?.city}` });
      }
    }
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
      if(filterObj?.city){
        areaNameTrigger({ querys: `cityName=${filterObj?.city}` });
      }
    },[filterObj?.city])

  useEffect(() => {
    setTableHeader(propertyTableHeader)
    setFilterInputData(filterFieldConfig?.slice(1, 3))
  },[])

  const onSearchHandler = (searchVal) => {
    setSearchKey(searchVal)
    setTimeout(propertyFetch(), 1000)
  }

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
    <div className="bg-overlay  p-6 rounded-t-[20px]">
          <CommonTabs 
            value={value}
            handleTabChange={handleTabChange}
            tabsData={PropertiesTabData} 
            tabWidth={islargeScreen ? '10%' : isMediumScreen ? '20%' : '50%'}
            isPanelShow={false} polygonShape={true}/>
        <div className="bg-white rounded-b-md p-4">
          
            <FilterAndSearch 
              createHandler={() => router.push('/create-property')}
              filterFieldConfig={filterInputData}
              onChangeHandler={filterChangeHandler}
              onSearchHandler={onSearchHandler}
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
