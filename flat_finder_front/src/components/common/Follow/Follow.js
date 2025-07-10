import { getLocalStorageData } from '@/utils/getLocalStorageData'
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from "@mui/material";
import { Avatar } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Buttons } from '../Buttons/Buttons';
import { COLORS } from '@/theme/colors';
import { useLazyGetFollowListQuery } from '@/app/redux/features/profileApi';
import FFLoader from '../Loaders/FFLoader';
import FFNodata from '../FFNodata';

export default function Follow({}) {
  const userData = getLocalStorageData();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [followListTrigger, { data: FollowList, isFetching}] = useLazyGetFollowListQuery();

  const handleRemove = (id) => {
    console.log("Remove follower with ID:", id);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePerPageChange = (event) => {
    setPerPage(Number(event.target.value));
    setPage(1); 
  };

  useEffect(() => {
    if(userData?.role == 'buyer'){
         followListTrigger({ querys: `limit=${perPage}&page=${page}&buyer=${userData?._id}` });
    }
    else{
        followListTrigger({ querys: `limit=${perPage}&page=${page}&seller=${userData?._id}` });
    }
  },[userData?.role])

  return (
     <div className=" p-4 bg-white rounded p-0 md:p-4 lg:p-6 ">
          {
            isFetching ? <FFLoader/> : <>
              {
                FollowList?.data?.length == 0 ? <FFNodata/> : <div className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 ${userData?.role == 'buyer' ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}  gap-4`}>
        { FollowList?.data?.map((item) => (
          <Card
            key={item?._id}
            className="w-full shadow-md rounded-xl"
            sx={{
              borderRadius: "1rem",
              padding: '0px'
            }}
          >
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center space-x-4 ">
                <Avatar
                  src={userData?.role == 'buyer' ? item?.seller?.image : item?.buyer?.image}
                  alt={userData?.role == 'buyer' ? item?.seller?.name : item?.buyer?.name}
                  sx={{ width: 56, height: 56 }}
                />
                <div>
                  <h3 className="text-p_lg font-medium text-basecolor">
                    {userData?.role == 'buyer' ? item?.seller?.name : item?.buyer?.name}
                  </h3>
                  <p className="text-sm text-gray-600">{userData?.role == 'buyer' ? item?.seller?.propertyName : item?.buyer?.address?.city}</p>
                </div>
              </div>

             {
              userData?.role == 'buyer' &&  <Buttons
              title='Remove'
              bgColor='white'
              textColor={COLORS.baseColor}
              icon={<Delete color='red'/>}
              onClickHandler={() => handleRemove(item._id)}
              other_style={{width: '110px'}}
              />
             }
            </CardContent>
          </Card>
        ))}
      </div>
              }
            </>
          }
     </div>
    
  );
}
