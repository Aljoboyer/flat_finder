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
import { useLazyGetPropertyListQuery } from "@/app/redux/features/propertyApi";
import { propertyTableHeader } from "@/constant/tableConfig/propertyTableConfig";


export default function SellerProperties() {
  const [propertyTrigger, { data: propertyList, error, isLoading , isFetching}] = useLazyGetPropertyListQuery();
  
   const [value, setValue] = useState(0);
  
    const handleTabChange = (event, newValue) => {
      setValue(newValue);
    };
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const islargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    
useEffect(() => {
  if (typeof window !== 'undefined') {
    propertyTrigger({ querys: `limit=${10}&page=${1}` });
  }
}, []);

   console.log('propertyList ==>', propertyList, isFetching, isLoading)

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
              filterFieldConfig={filterFieldConfig}
            />
            <div className="my-7">
              <FFTable 
              loading={isFetching}
              tableHeader={propertyTableHeader} 
              dataList={propertyList?.data}/>
            </div>
            {
              propertyList?.data?.length > 0 && <div className="flex flex-row justify-end">
              <FFPagination totalPage={propertyList?.totalPage} />
            </div>
            }
        </div>
    </div>
  );
}
