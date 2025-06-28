import { AutoCompletes } from '@/components/common/Inputs/AutoComplete'
import { Buttons } from '@/components/common/Buttons/Buttons'
import React, { useEffect, useState } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { COLORS } from "@/theme/colors";
import { cities } from '@/constant/dropdownData';
import InputField from '@/components/common/Inputs/InputField';
import { filterFieldConfig } from '@/constant/formConfigs/filterConfig';
import { useLazyGetAreaNamesQuery } from '@/app/redux/features/dropDownApi';
import { useRouter } from 'next/navigation';

export const HeroSection = () => {
  const router = useRouter()
  const [filterInputData, setFilterInputData] = useState([])
  const [filterObj, setFilterObj] = useState({city: '', areaName: ''})
  const [areaNameTrigger, { data: areaNameList}] = useLazyGetAreaNamesQuery();

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
 <div className="h-screen  w-full landing_hero_section pt-4 xsm:p-4">
        <div className="bg-white lg:w-2/3 xl:w-1/2 lg:ml-7 p-7 lg:p-11 form_box ">
            <div>
                <h1 className="md:text-xxl_title xsm:text-lg_title font-medium text-basecolor leading-snug">Feel at home, <br/> free to roam</h1>
                <p className="my-4">Experience the home that moves with you for a month, a year, or longer with a global network of designer, furnished apartments.</p>
            </div>
            <div className="  flex flex-col md:flex-row gap-4 mt-4 w-full max-w-2xl header_form p-[15px]">

              {
                filterInputData?.map((field) => (
                    <InputField 
                    key={field?.field_id}
                    otherStyle={{ marginTop: {xs: '10px', md: '0px'}}}
                    label={field?.label}
                    inputType={field?.inputType} 
                    options={field?.options}
                    onChangeHandler={filterChangeHandler}
                    field={field.fieldValue}
                    field_id={field?.field_id}
                    fieldItem={field}
                    unSelectShow={true}
                  />
                ))
              }

              <Buttons 
               onClickHandler={searchHandler}
               title="Serch" 
               icon={ <SearchRoundedIcon />} 
               other_style={{width: '200px', height: '45px'}} bgColor={COLORS.baseColor} textColor="white"/>
            </div>
        </div>
    </div>
  )
}
