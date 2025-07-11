import { getLocalStorageData } from '@/utils/getLocalStorageData'
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from "@mui/material";
import { Avatar } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Buttons } from '../Buttons/Buttons';
import { COLORS } from '@/theme/colors';
import { useFollowCheckMutation, useLazyGetFollowListQuery, useUnFollowSellerMutation } from '@/app/redux/features/profileApi';
import FFLoader from '../Loaders/FFLoader';
import FFNodata from '../FFNodata';
import FFPagination from '../FFPagination';
import FFLoader2 from '../Loaders/FFLoader-2';
import { errorToast, successToast } from '@/utils/toaster/toaster';

export default function Follow({}) {
  const userData = getLocalStorageData();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [followListTrigger, { data: FollowList, isFetching}] = useLazyGetFollowListQuery();
  const [unFollowTrigger, { isLoading }] = useUnFollowSellerMutation();
  const [unFollowId, setUnfollowId] = useState('')

  const handleRemove = async(id) => {
    setUnfollowId(id)
    const unFollowRes = await unFollowTrigger({
      id: id,
    })
    if(unFollowRes?.data?.msg == 'Unfollowed Succussfully'){
      successToast('Unfollowed Succussfully')
      setUnfollowId(id)
    }
    else{
      errorToast('Unfollowed Failed')
    }
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
              userData?.role == 'buyer' &&  <>
                  {
                    (item?._id == unFollowId && isLoading ) ? <div className='w-[100px] h-[50px]'><FFLoader2/> </div>: <Buttons
              title='Unfollow'
              bgColor='white'
              textColor={COLORS.bluemain}
              icon={<Delete />}
              onClickHandler={() => handleRemove(item._id)}
              other_style={{width: '120px', fontWeight: '600'}}
              />
                  }
              </>
             }
            </CardContent>
          </Card>
        ))}
      </div>
              }
            </>
          }
                  {
          FollowList?.data?.length > 0 && <div className="flex flex-row justify-end">
          <FFPagination 
          perPage={perPage}
          handlePerPageChange={handlePerPageChange}
          handlePageChange={handlePageChange}
          totalPage={FollowList?.totalPage} />
        </div>
        }
     </div>
    
  );
}
