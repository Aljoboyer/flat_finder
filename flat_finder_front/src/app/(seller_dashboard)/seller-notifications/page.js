"use client"
import { useLazyGetNotificationListQuery } from '@/app/redux/features/notificationApi';
import CommonTabs from '@/components/common/CommonTabs/CommonTabs';
import FFNodata from '@/components/common/FFNodata';
import FFLoader from '@/components/common/Loaders/FFLoader';
import Notification from '@/components/common/Notification/Notification';
import { NotificationsTabData } from '@/constant/tabsdata';
import { getLocalStorageData } from '@/utils/getLocalStorageData';
import { useMediaQuery } from '@mui/material'
import {  useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react'

export default function page() {
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const islargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const userData = getLocalStorageData()
    const [notificationTrigger, { data: notifications , isFetching}] = useLazyGetNotificationListQuery();
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);

    const handleTabChange = (event, newValue) => {
      setValue(newValue);
      if(newValue == 1){
        notificationTrigger({ querys: `limit=${perPage}&page=${page}&receiver=${userData?._id}&isRead=${true}` });
      }
      else if (newValue == 2){
          notificationTrigger({ querys: `limit=${perPage}&page=${page}&receiver=${userData?._id}&isRead=${false}` });
      }
      else{
          notificationTrigger({ querys: `limit=${perPage}&page=${page}&receiver=${userData?._id}` });
      }

    }

    useEffect(() => {
        if(userData?.name){
          notificationTrigger({ querys: `limit=${perPage}&page=${page}&receiver=${userData?._id}` });
        }
        },[userData?.name, perPage, page])

    const handlePageChange = (event, value) => {
      setPage(value);
    };

    const handlePerPageChange = (event) => {
      setPerPage(Number(event.target.value));
      setPage(1); 
    };

  return (
     <div className="bg-overlay  p-6 rounded-t-[20px] ">
        <CommonTabs 
          value={value}
          handleTabChange={handleTabChange}
          tabsData={NotificationsTabData} 
          tabWidth={islargeScreen ? '10%' : isMediumScreen ? '20%' : '50%'}
          isPanelShow={false} polygonShape={true}/>
          
          {
            isFetching ? <FFLoader/> : <>
            {
              notifications?.data?.length > 0 ? <Notification
          totalPage={notifications?.totalData}
          handlePerPageChange={handlePerPageChange}
          handlePageChange={handlePageChange}
          notifications={notifications?.data}
          perPage={perPage}
          /> : <FFNodata/>
            }
            </>
          }
    </div>
  )
}
