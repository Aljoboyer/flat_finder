"use client"
import * as React from 'react';
import { useEffect } from 'react';
import LayoutContainer from '@/components/common/dashboard_layout/LayoutContainer';

export default function Layout({children}) {
  
  useEffect(() => {
    const token = localStorage.getItem('pixplayToken')
    // if(!token){
    //   navigate('/login')
    // }
  },[])

  return (
    <LayoutContainer>
            {children}
    </LayoutContainer>
  );
}
