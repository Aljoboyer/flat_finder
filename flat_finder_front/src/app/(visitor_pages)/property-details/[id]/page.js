"use client"

import { useLazyGetSinglePropertyQuery } from '@/app/redux/features/propertyApi';
import CommonTabs from '@/components/common/CommonTabs/CommonTabs';
import FFLoader from '@/components/common/Loaders/FFLoader';
import PropertyDetailsImgSlider from '@/components/visitors/Common/PropertyDetailsImgSlider'
import { Feature } from '@/components/visitors/PropertyDetails/Feature';
import OverView from '@/components/visitors/PropertyDetails/OverView';
import SellerInfoSection from '@/components/visitors/PropertyDetails/SellerInfoSection'
import { PropertyDetailsTabData } from '@/constant/tabsdata';
import { useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'

export default function page({params}) {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const islargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const [tabValue, setTabValue] = useState(0);
  const [propertyTrigger, { data: property, error, isLoading , }] = useLazyGetSinglePropertyQuery();
  const { id } = params;
  
   useEffect(() => {
     if(id){
       propertyTrigger({querys: `id=${id}`})
     }
   },[id])

    const handleTabChange = (event, newValue) => {
      setTabValue(newValue)
  }
  console.log('property ==>', property)
  return (
    <div className='w-full'>
      {
        !property?.data ? <FFLoader/> :  
        <div className='w-full'>
              <div className=" lg:mx-auto md:mx-auto  lg:flex lg:flex-row md:flex md:flex-col sm:flex sm:flex-col px-2 md:px-4 lg:px-6 mt-4">
                <PropertyDetailsImgSlider 
                    propertyDetails={property?.data} 
                    slideImgArr={property?.data?.images} />

                <SellerInfoSection propertyDetails={property?.data}  />
              </div>
              
              <div className='p-4 md:p-6'>
                  <div className='property_card p-6 mt-7'>
                    <CommonTabs 
                      value={tabValue}
                      handleTabChange={handleTabChange}
                      tabsData={PropertyDetailsTabData} 
                      tabWidth={islargeScreen ? '40%' : isMediumScreen ? '20%' : '50%'}
                      isPanelShow={false}
                      otherStyle={{fontSize: '16px', fontWeight: '600'}}
                      />

                      <div className='h-[80vh] p-4'>
                          {
                            tabValue == 0 && <OverView overview={property?.data?.description} />
                          }
                          {
                            tabValue == 1 && <Feature property={property?.data}/>
                          }
                      </div>
                </div>
              </div>
        </div>
      }
    </div>
  )
}
