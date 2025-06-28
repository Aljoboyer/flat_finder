"use client"

import { useLazyGetAreaNamesQuery } from "@/app/redux/features/dropDownApi";
import { useLazyGetPropertyListQuery } from "@/app/redux/features/propertyApi";
import { Buttons } from "@/components/common/Buttons/Buttons";
import FFDrawer from "@/components/common/FFDrawer/FFDrawer";
import FFNodata from "@/components/common/FFNodata";
import FFPagination from "@/components/common/FFPagination";
import FFRangeSlider from "@/components/common/FFRangeSlider";
import FilterAndSearch from "@/components/common/FilterAndSearch";
import SkeletonPropertyCard from "@/components/common/Loaders/SkeletonPropertyCard";
import PropertyCard from "@/components/common/PropertyCard/PropertyCard";
import { filterFieldConfig } from "@/constant/formConfigs/filterConfig";
import { COLORS } from "@/theme/colors";
import { capitalizeFirstLetter } from "@/utils/stringHelper";
import { ArrowForwardIosOutlined } from "@mui/icons-material";
import {  useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";


export default function SearchProperty() {
  const [propertyListTrigger, { data: propertyList, error, isLoading , isFetching}] = useLazyGetPropertyListQuery();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filterObj, setFilterObj] = useState({city: '', areaName: '', bedRooms: '', propertyType: '', bathRooms: '', maxSqft: '', minSqft: '',minPrice: '0', maxPrice: '10000000',  })
  const [searchKey, setSearchKey] = useState('')
  const [filterInputData, setFilterInputData] = useState([])
  const [openDrawer, setOpenDrawer] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [sqrftRange, setSqrftRange] = useState([0, 5000]);
  const [areaNameTrigger, { data: areaNameList}] = useLazyGetAreaNamesQuery();

  const searchParams = useSearchParams()
  const propertyType = searchParams.get('propertyType')

   const propertyFetch = () => {
    propertyListTrigger({ querys: `limit=${perPage}&page=${page}&status=active&searchKey=${searchKey}&city=${filterObj?.city}&areaName=${filterObj?.areaName }&minSqft=${filterObj?.minSqft}&maxSqft=${filterObj?.maxSqft}&bedRooms=${filterObj?.bedRooms}&bathRooms=${filterObj?.bathRooms}&propertyType=${filterObj?.propertyType}&minPrice=${filterObj?.minPrice}&maxPrice=${filterObj?.maxPrice}` });
  }

  const countActualPrice = (sliderValue) => {
     if (Number(sliderValue) <= 20) {
        const newVal =  Number(sliderValue) * 5000;
        return`${newVal}`; 
      } else if (Number(sliderValue) <= 40) {
        const newVal = (20 * 5000) + (Number(sliderValue) - 20) * 50000;
        return`${newVal}`; 
      } else {
        const newVal = (20 * 5000) + (20 * 50000) + (Number(sliderValue) - 40) * 400000;
        return `${newVal}`; 
      }
  }
  const priceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
      const [minSlider, maxSlider] = newValue;
      const actualMin = countActualPrice(minSlider);
      const actualMax = countActualPrice(maxSlider);

    setTimeout(() => {
      
      setFilterObj({...filterObj, minPrice: actualMin, maxPrice: actualMax})
    },1000)
  };

  const SqrftRangeChange = (event, newValue) => {
  
    setSqrftRange(newValue);
    setTimeout(() => {
      setFilterObj({...filterObj, maxSqft: newValue[1], minSqft: newValue[0]})
    },1000)
  };

  const toggleDrawer = (newOpen) =>  {
    setOpenDrawer(newOpen);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('calling')
      propertyFetch()
    }
  }, [perPage, page, filterObj?.city, filterObj?.areaName,filterObj?.bedRooms,filterObj?.propertyType, filterObj?.bathRooms, filterObj?.maxSqft, filterObj?.minSqft, filterObj?.minPrice, filterObj?.maxPrice]);

  useEffect(() => {
    setFilterInputData(filterFieldConfig)
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
   const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePerPageChange = (event) => {
    setPerPage(Number(event.target.value));
    setPage(1); 
  };

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

  useEffect(() => {
    if(propertyType && filterInputData?.length > 0){
       setFilterObj({...filterObj, propertyType: propertyType})
       const addFilterValuToInput = filterInputData?.map((item) => {
          if(item?.field_id == 'propertyType'){
            return {...item, fieldValue:{value: propertyType}}
          }else{
            return item;
          }
        })
      setFilterInputData(addFilterValuToInput)
    }
  },[propertyType, filterInputData?.length])

  return (
    <div className="w-full p-4 flex flex-col lg:flex-row justify-between h-screen">
        <div className="lg:hidden">
          <Buttons onClickHandler={() => toggleDrawer(true)} other_style={{display: 'flex', width: {xs: '100%', sm: 200}, fontWeight: 'bold'}} icon={<IoFilter className="mx-2" size={30}/>} title="Filter" bgColor={COLORS.baseColor} textColor={COLORS.side_yellow} />
        </div>

          <FFDrawer open={openDrawer} toggleDrawer={toggleDrawer}>
              <div className="property_card px-4 w-full">
                <FilterAndSearch 
                createBtnShow={false}
                filterFieldConfig={filterInputData}
                onChangeHandler={filterChangeHandler}
                searchInputShow={false}
                gridStyle='md:grid-cols-1 lg:grid-cols-1'
              />
            </div>
          </FFDrawer>
        <div className="hidden lg:block w-1/5 property_card px-4 mt-4">
            <FilterAndSearch 
            createBtnShow={false}
            filterFieldConfig={filterInputData}
            onChangeHandler={filterChangeHandler}
            searchInputShow={false}
            gridStyle='md:grid-cols-1 lg:grid-cols-1'
          />
          <FFRangeSlider title={"Set Price Range"} handleChange={priceRangeChange} step={2} isPrice={true} value={priceRange} maxValue={60}/>
          <FFRangeSlider title={"Set Size"} handleChange={SqrftRangeChange} step={50} isPrice={false} value={sqrftRange} maxValue={5000}/>
        </div>
       
       <div className="lg:w-w-4/5 w-full px-0 lg:px-4 overflow-scroll">
              <div className='bg-white p-4 rounded-md my-4 flex flex-row items-start property_card'>
                  <p className="text-p text-gray-500"><b>Showing result for </b>{capitalizeFirstLetter(filterObj?.propertyType)} </p>
                  {filterObj?.city && <p className="text-p text-gray-500"><ArrowForwardIosOutlined fontSize="40px"/> {filterObj?.city} </p>}
                  {filterObj?.areaName && <p className="text-p text-gray-500"><ArrowForwardIosOutlined fontSize="40px"/>  {filterObj?.areaName} </p>}  
            </div>
            <div className="">
                {
                isFetching ? [1,2,3]?.map((item) => (
                  <SkeletonPropertyCard key={item}/>
                )) : <>
                    {
                      propertyList?.data?.length == 0 || !propertyList?.data ? <FFNodata/> : 
                      propertyList?.data?.map((item) => (
                        <PropertyCard key={item?._id} property={item}/>
                    ))
                    }
                </>
                }
                <div className="flex flex-row justify-center my-4">
                    <FFPagination 
                    perPage={perPage}
                    handlePerPageChange={handlePerPageChange}
                    handlePageChange={handlePageChange}
                    totalPage={propertyList?.totalPage} />
                  </div>
            </div>
       </div>
    </div>
  );
}
