"use client"

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
import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";


export default function SearchProperty() {
  const [propertyListTrigger, { data: propertyList, error, isLoading , isFetching}] = useLazyGetPropertyListQuery();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filterObj, setFilterObj] = useState({city: '', areaName: ''})
  const [searchKey, setSearchKey] = useState('')
  const [filterInputData, setFilterInputData] = useState([])
  const [openDrawer, setOpenDrawer] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [sqrftRange, setSqrftRange] = useState([0, 5000]);


  const priceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const SqrftRangeChange = (event, newValue) => {
    setSqrftRange(newValue);
  };

  const toggleDrawer = (newOpen) =>  {
    setOpenDrawer(newOpen);
  };

  const propertyFetch = () => {
    propertyListTrigger({ querys: `limit=${perPage}&page=${page}&status=active&searchKey=${searchKey}&city=${filterObj?.city}&areaName=${filterObj?.areaName }&maxPrice=${priceRange[1]}&minPrice=${priceRange[0]}&minSqft=${sqrftRange[0]}&maxSqft=${sqrftRange[1]}` });
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
  
      propertyFetch()
    }
  }, [perPage, page]);

  useEffect(() => {
    setFilterInputData(filterFieldConfig)
  },[])

  const filterChangeHandler = () => {
    
  }
   const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePerPageChange = (event) => {
    setPerPage(Number(event.target.value));
    setPage(1); 
  };

  return (
    <div className="w-full p-4 flex flex-col lg:flex-row justify-between">
          <div className="lg:hidden">
            <Buttons onClickHandler={() => toggleDrawer(true)} other_style={{display: 'flex', width: 300, fontWeight: 'bold'}} icon={<IoFilter className="mx-2" size={30}/>} title="Filter" bgColor={COLORS.baseColor} textColor={COLORS.side_yellow} />
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
          <div className="hidden lg:block w-1/5 property_card px-4 mt-7">
              <FilterAndSearch 
              createBtnShow={false}
              filterFieldConfig={filterInputData}
              onChangeHandler={filterChangeHandler}
              searchInputShow={false}
              gridStyle='md:grid-cols-1 lg:grid-cols-1'
            />
            <FFRangeSlider title={"Set Price Range"} handleChange={priceRangeChange} step={1000} isPrice={true} value={priceRange} maxValue={10000000}/>
            <FFRangeSlider title={"Set Size"} handleChange={SqrftRangeChange} step={50} isPrice={false} value={sqrftRange} maxValue={5000}/>
          </div>
        <div className="lg:w-w-4/5 w-full px-0 lg:px-4">
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
  );
}
