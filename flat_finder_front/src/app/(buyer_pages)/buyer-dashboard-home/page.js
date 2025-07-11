"use client"
import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material';
import InputField from '@/components/common/Inputs/InputField';
import { useLazyGetAreaNamesQuery } from '@/app/redux/features/dropDownApi';
import { filterFieldConfig } from '@/constant/formConfigs/filterConfig';
import { Buttons } from '@/components/common/Buttons/Buttons';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useRouter } from 'next/navigation';
import { COLORS } from '@/theme/colors';
import { getLocalStorageData } from '@/utils/getLocalStorageData';
import SavedFlatList from '@/components/buyer/SavedFlatList/SavedFlatList';

export default function page() {
  const router = useRouter()
  const [filterInputData, setFilterInputData] = useState([])
  const [filterObj, setFilterObj] = useState({city: '', areaName: ''})
  const [areaNameTrigger, { data: areaNameList}] = useLazyGetAreaNamesQuery();
  const userData = getLocalStorageData()

    useEffect(() => {
      setFilterInputData(filterFieldConfig?.slice(1,3))
    },[])
  
      const filterChangeHandler = (id, val) => {
      let value = val ? val : ''
    
      setFilterObj({...filterObj, [id]: value})
  
      if(id == 'city' || id == 'areaName'){
          const addFilterValuToInput = filterInputData?.map((item) => {
            if(item?.field_id == id){
              return {...item,fieldValue:{value: value}}
            }else{
              return item;
            }
          })
        setFilterInputData(addFilterValuToInput)
      }
    }
  
     useEffect(() => {
        if(filterObj?.city){
          areaNameTrigger({ querys: `cityName=${filterObj?.city}` });
        }
      },[filterObj?.city])
      
      useEffect(() => {
        if(areaNameList?.data?.length > 0 && areaNameList){
    
          const formatAreaNameData = areaNameList?.data?.map((item) => {
            const newObj = {"label": item?.areaName, value: item?.areaName}
            return newObj
          })
          
          const fieldsAddedValue = filterInputData?.map((item) => {
            if(item?.field_id == 'areaName'){
              const newObj = {...item, options: formatAreaNameData, suggestionText: ''}
              return newObj
            }
            else{
              return item
            }
          })
          setFilterInputData(fieldsAddedValue)
        }
    
      },[areaNameList, areaNameList?.data?.length])
  
      const searchHandler = () => {
  
        if(filterObj?.city){
          const url = filterObj?.areaName ?  `/search-property?city=${encodeURIComponent(filterObj?.city)}&areaName=${encodeURIComponent(filterObj?.areaName)}` : `/search-property?city=${encodeURIComponent(filterObj?.city)}`
  
          router.push(url)
        }
      }
      

  return (
    <div className='bg-overlay  p-6 rounded-t-[20px]'>
      <div className="min-h-screen bg-white flex flex-col gap-6 p-6 rounded-md">
       
        <section className="bg-basecolor text-white p-6 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 transition-all">
          <div>
            <h1 className="text-lg_title font-bold">Welcome back, {userData?.name} 👋</h1>
            <p className="mt-1 text-[#fff000] text-title_sm">Ready to find your perfect flat?</p>
          </div>
          <Avatar alt={userData?.name} src={userData?.image} sx={{ width: 56, height: 56 }} />
        </section>

        <section className="bg-overlay p-6 rounded-2xl shadow-md">
          <p className='my-4 text-title font-medium text-basecolor'>Start searching for your perfect home</p>
          <div className="flex flex-col sm:flex-row gap-4 ">
              {
                filterInputData?.map((field) => (
                    <InputField
                    key={field?.field_id}
                    otherStyle={{ marginTop: {xs: '10px', md: '0px'}}}
                    label={field?.label}
                    inputType={field?.inputType} 
                    options={field?.options}
                    onChangeHandler={filterChangeHandler}
                    field={field}
                    field_id={field?.field_id}
                    fieldItem={field}
                    unSelectShow={true}
                  />
                ))
              }
          </div>
          <div className="flex justify-center mt-6">
            <Buttons 
               onClickHandler={searchHandler}
               title="Serch" 
               icon={ <SearchRoundedIcon />} 
               other_style={{width: '200px', height: '45px'}} bgColor={COLORS.baseColor} textColor="white"/>
          </div>
        </section>

        <SavedFlatList/>
        
      </div>
    </div>
  )
}
