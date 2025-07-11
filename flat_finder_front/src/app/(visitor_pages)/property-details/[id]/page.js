"use client"

import { useFollowCheckMutation, useFollowSellerMutation } from '@/app/redux/features/profileApi';
import { useLazyGetPropertyListQuery, useLazyGetSinglePropertyQuery } from '@/app/redux/features/propertyApi';
import { useLazyGetSingleRequestQuery, useRequestForRentMutation } from '@/app/redux/features/rentApi';
import CommonTabs from '@/components/common/CommonTabs/CommonTabs';
import FFNodata from '@/components/common/FFNodata';
import FFLoader from '@/components/common/Loaders/FFLoader';
import ApartmentCardSkeleton from '@/components/common/Loaders/PropertyCardSmallSkeleton';
import FFModal from '@/components/common/Modals/FFModal';
import ApartmentCard from '@/components/common/PropertyCard/PropertyCardSmall';
import SectionTitle from '@/components/common/SectionTitle/SectionTitle';
import CommentBox from '@/components/visitors/CommentBox/CommentBox';
import PropertyDetailsImgSlider from '@/components/visitors/Common/PropertyDetailsImgSlider'
import { Feature } from '@/components/visitors/PropertyDetails/Feature';
import OverView from '@/components/visitors/PropertyDetails/OverView';
import SellerInfoSection from '@/components/visitors/PropertyDetails/SellerInfoSection'
import { PropertyDetailsTabData } from '@/constant/tabsdata';
import { requestNote } from '@/constant/textdata';
import { getLocalStorageData } from '@/utils/getLocalStorageData';
import { errorToast, successToast } from '@/utils/toaster/toaster';
import { useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'

export default function page({params}) {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const islargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const [tabValue, setTabValue] = useState(0);
  const [propertyTrigger, { data: property }] = useLazyGetSinglePropertyQuery();
  const [propertyListTrigger, { data: propertyList,  isFetching}] = useLazyGetPropertyListQuery();
  const [requestForRent, { isLoading }] = useRequestForRentMutation();
  const [getSingleRentequest, { data: specificRentRequest}] = useLazyGetSingleRequestQuery();
  const [followCheckTrigger, {  }] = useFollowCheckMutation();
  const [followSeller, { isLoading: followLoading }] = useFollowSellerMutation();
  const [reqModalShow, setReqModalShow] = useState(false)
  const [note, setNote] = useState(requestNote);
  const userdata = getLocalStorageData()
  const [followData, setFollowData] = useState({});
  
  const { id } = params;
  
    const sellerPropertyFetch = () => {
    propertyListTrigger({ querys: `limit=${10}&page=${1}&status=active&seller=${property?.data?.seller?._id}` });
  }

   useEffect(() => {
     
     if(id){
       propertyTrigger({querys: `id=${id}`})
       getSingleRentequest({querys: `buyer=${userdata?._id}&property=${id}`})
     }
   },[id])

    const handleTabChange = (event, newValue) => {
      setTabValue(newValue)
  }

    useEffect(() => {
     if(property?.data?._id){
       sellerPropertyFetch()
     }
   },[property?.data?._id])

   const requestHandler = () => {
    setReqModalShow(true)
   }

   const requestSentHandler = async () => {
    const reqObj = {
      "property": property?.data?._id,
      "buyer": userdata?._id,
      "seller": property?.data?.seller?._id,
      "message": note,
      "status": "pending"
    }

    const reqRes = await requestForRent(reqObj)
   
    if(reqRes?.data?.msg == 'Rent request added Successfully'){
      successToast('Rent Request Sent Successfully!')
      setReqModalShow(false)
    }else{
      errorToast('Rent Request Failed!')
      setReqModalShow(false)
    }
   }

   const followCheck = async () => {
    const followCheckRes = await followCheckTrigger({
      buyer: userdata?._id,
      seller: property?.data?.seller?._id, 
      unFollow: false
    })
    
    setFollowData(followCheckRes?.data?.result)
   }
   
   useEffect(() => {
      if(userdata?.role == 'buyer' &&  property?.data?.seller?._id){
        followCheck()
      }
   },[userdata?.role,  property?.data?.seller?._id])

   const followHandler = async () => {
    const reqObj = {
      connectionRoamId: property?.data?.seller?._id,
      buyer: userdata?._id,
      seller: property?.data?.seller?._id
    }
    const followRes = await followSeller(reqObj)

    if(followRes?.data?.msg == 'Connection posted Successfully'){
      successToast('Following Successfull')
      followCheck()
    }
   }

  return (
    <div className='w-full p-2 lg:p-6'>
      {
        !property?.data ? <FFLoader/> :  
        <div className='w-full'>
              <div className=" lg:mx-auto md:mx-auto  lg:flex lg:flex-row md:flex md:flex-col sm:flex sm:flex-col px-2 md:px-4 lg:px-6 mt-4">
                <PropertyDetailsImgSlider 
                    propertyDetails={property?.data} 
                    slideImgArr={property?.data?.images} />

                <SellerInfoSection  
                specificRentRequest={specificRentRequest?.data}
                requestHandler={requestHandler} 
                propertyDetails={property?.data}  
                followHandler={followHandler}
                followLoading={followLoading}
                followData={followData}
                />

              </div>
              
              <div className='p-4 md:p-6'>
                  <div className='property_card p-6 mt-7'>
                    <CommonTabs 
                      value={tabValue}
                      handleTabChange={handleTabChange}
                      tabsData={PropertyDetailsTabData} 
                      tabWidth={islargeScreen ? '40%' : isMediumScreen ? '20%' : '50%'}
                      isPanelShow={false}
                      otherStyle={{fontSize: '16px', fontWeight: '600'}}
                      />

                      <div className='h-auto lg:h-[80vh] p-4'>
                          {
                            tabValue == 0 && <OverView overview={property?.data?.description} />
                          }
                          {
                            tabValue == 1 && <Feature property={property?.data}/>
                          }
                          {
                            tabValue == 3 && <CommentBox/>
                          }
                      </div>
                </div>
                
                <div className=' mt-13'>
                      <SectionTitle title="SIMILAR SELLER PROPERTIES" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 mt-11">
                      {
                          isFetching ? [1,2,3, 4]?.map((item) => (
                            <ApartmentCardSkeleton key={item}/>
                          )) : <>
                              {
                                propertyList?.data?.length == 0 || !propertyList?.data ? <FFNodata/> : 
                                propertyList?.data?.slice(0, 8)?.map((item) => (
                                  <ApartmentCard key={item?._id} property={item}/>
                              ))
                              }
                          </>
                          }
                  </div>
                </div>
              </div>
        </div>
      }
      <FFModal 
      open={reqModalShow} setOpen={setReqModalShow}
      note={note} setNote={setNote}
      confirmHandler={requestSentHandler}
      loading={isLoading}
      show='rentReq'
      />
    </div>
  )
}
