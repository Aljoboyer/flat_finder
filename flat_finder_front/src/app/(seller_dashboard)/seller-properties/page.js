"use client"

import CommonTabs from "@/components/common/CommonTabs/CommonTabs";
import { PropertiesTabData } from "@/constant/tabsdata";
import { useState } from "react";
import {  useTheme } from '@mui/material/styles';
import { useMediaQuery } from "@mui/material";
import FilterAndSearch from "@/components/common/FilterAndSearch";
import FFTable from "@/components/common/FFTable";
import { filterFieldConfig } from "@/constant/formConfigs/filterConfig";
import Pagination from '@mui/material/Pagination';
import FFPagination from "@/components/common/FFPagination";


export default function SellerProperties() {

   const [value, setValue] = useState(0);
  
    const handleTabChange = (event, newValue) => {
      setValue(newValue);
    };
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const islargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <div className="bg-overlay h-screen p-6 rounded-t-[20px]">
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
              <FFTable/>
            </div>
            <div className="flex flex-row justify-end">
              <FFPagination/>
            </div>
        </div>
    </div>
  );
}
