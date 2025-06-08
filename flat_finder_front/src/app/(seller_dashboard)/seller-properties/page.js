"use client"

import CommonTabs from "@/components/common/CommonTabs/CommonTabs";
import { PropertiesTabData } from "@/constant/tabsdata";
import { useState } from "react";
import {  useTheme } from '@mui/material/styles';
import { useMediaQuery } from "@mui/material";
import FilterAndSearch from "@/components/common/FilterAndSearch";
import { cities } from "@/components/visitors/LandingPage/HeroSection";


export default function SellerProperties() {

   const [value, setValue] = useState(0);
  
    const handleTabChange = (event, newValue) => {
      setValue(newValue);
    };
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const islargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

    const filterFieldConfig = [
      {
        options: cities,
        textFieldLabel: 'City Name',
        inputType: 'autocomplete'
      },
      {
        options: cities,
        textFieldLabel: 'Area Name',
        inputType: 'autocomplete'
      }
    ]
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
        </div>
    </div>
  );
}
