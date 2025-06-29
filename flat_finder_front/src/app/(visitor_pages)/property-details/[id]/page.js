"use client"

import { useLazyGetSinglePropertyQuery } from '@/app/redux/features/propertyApi';
import PropertyDetailsImgSlider from '@/components/visitors/Common/PropertyDetailsImgSlider'
import SellerInfoSection from '@/components/visitors/PropertyDetails/SellerInfoSection'
import React, { useEffect, useState } from 'react'

export default function page({params}) {
   const [propertyTrigger, { data: property, error, isLoading , }] = useLazyGetSinglePropertyQuery();
   const { id } = params;
  
   useEffect(() => {
     if(id){
       propertyTrigger({querys: `id=${id}`})
     }
   },[id])

   console.log('property', property)
  return (
    <div className='w-full'>
      {
        property?.data &&         <div className=" lg:mx-auto md:mx-auto  lg:flex lg:flex-row md:flex md:flex-col sm:flex sm:flex-col px-2 md:px-4 lg:px-4 mt-4">
            
               <PropertyDetailsImgSlider propertyDetails={property?.data} slideImgArr={property?.data?.images} />
            <SellerInfoSection propertyDetails={property?.data}  />
        </div>
      }

    </div>
  )
}
