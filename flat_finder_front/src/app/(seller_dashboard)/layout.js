"use client"
import * as React from 'react';
import LayoutContainer from '@/components/common/dashboard_layout/LayoutContainer';
import { usePathname, useRouter } from 'next/navigation';
import { getLocalStorageData } from '@/utils/getLocalStorageData';
import { useEffect } from 'react';
import { useState } from 'react';
import FFLoader from '@/components/common/Loaders/FFLoader';
import { useDispatch } from 'react-redux';
import { setProfileImage } from '../redux/slices/commonSlice';

export default function Layout({children}) {
  const userData = getLocalStorageData();
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const pathname = usePathname();
  const dispatch = useDispatch()

  useEffect(() => {
    if(userData?.name){
      dispatch(setProfileImage(userData?.image))

      if(userData?.role == 'seller'){
        router.push(pathname)
         setLoading(false)
      }else{
          router.push('/flat-finder-home')
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
