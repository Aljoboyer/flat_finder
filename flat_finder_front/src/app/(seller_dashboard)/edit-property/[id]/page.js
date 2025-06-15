"use client"
import { useLazyGetSinglePropertyQuery } from '@/app/redux/features/propertyApi';
import FFLoader from '@/components/common/FFLoader';
import FFPageHeader from '@/components/common/FFPageHeader';
import PropertyForm from '@/components/seller/propertyForm/PropertyForm'
import React, { useEffect, useState } from 'react'


export default function page({params}) {
  const [propertyTrigger, { data: property, error, isLoading , isFetching}] = useLazyGetSinglePropertyQuery();
  const { id } = params;
 
  useEffect(() => {
    if(id){
      propertyTrigger({querys: `id=${id}`})
    }
  },[id])

  return (
      <div className="bg-overlay  p-6 rounded-t-[20px] w-full">
         <FFPageHeader pageTitle="Update Property"/>
          {
            isLoading ? <FFLoader/> : <PropertyForm property={property?.data} />
          }
       </div>
  )
}
