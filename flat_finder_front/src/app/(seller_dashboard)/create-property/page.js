"use client"
import FFPageHeader from '@/components/common/FFPageHeader'
import PropertyForm from '@/components/seller/propertyForm/PropertyForm'
import React, { useState } from 'react'


export default function page() {
  
  return (
      <div className="bg-overlay  p-6 rounded-t-[20px] w-full">
          <FFPageHeader pageTitle="Create Property"/>
          <PropertyForm/>
       </div>
  )
}
