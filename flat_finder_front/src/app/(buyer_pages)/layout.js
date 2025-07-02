"use client"
import * as React from 'react';
import LayoutContainer from '@/components/common/dashboard_layout/LayoutContainer';
import { getLocalStorageData } from '@/utils/getLocalStorageData';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import FFLoader from '@/components/common/Loaders/FFLoader';

export default function Layout({children}) {
  const userData = getLocalStorageData();
  const router = useRouter();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(userData?.name){
      if(userData?.role == 'buyer'){
          router.push('/buyer-dashboard-home')
          setLoading(false)
      }else{
          router.push('/seller-dashboard-home')
          setLoading(false)
      }
    }
    else{
      router.push('/login')
      setLoading(false)
    }
  },[userData?.name])

  return (
    <LayoutContainer>
            {loading ? <FFLoader/> : children}
    </LayoutContainer>
  );
}
