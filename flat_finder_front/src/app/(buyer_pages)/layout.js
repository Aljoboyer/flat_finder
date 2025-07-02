"use client"
import * as React from 'react';
import LayoutContainer from '@/components/common/dashboard_layout/LayoutContainer';

export default function Layout({children}) {

  return (
    <LayoutContainer>
            {children}
    </LayoutContainer>
  );
}
