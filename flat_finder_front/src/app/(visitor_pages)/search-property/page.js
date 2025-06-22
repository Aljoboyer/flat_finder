"use client"

import { useLazyGetPropertyListQuery } from "@/app/redux/features/propertyApi";
import FFNodata from "@/components/common/FFNodata";
import FilterAndSearch from "@/components/common/FilterAndSearch";
import SkeletonPropertyCard from "@/components/common/Loaders/SkeletonPropertyCard";
import PropertyCard from "@/components/common/PropertyCard/PropertyCard";
import { filterFieldConfig } from "@/constant/formConfigs/filterConfig";
import { useEffect, useState } from "react";


export default function SearchProperty() {
  const [propertyListTrigger, { data: propertyList, error, isLoading , isFetching}] = useLazyGetPropertyListQuery();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filterObj, setFilterObj] = useState({city: '', areaName: ''})
  const [searchKey, setSearchKey] = useState('')
  const [filterInputData, setFilterInputData] = useState([])
  
  const propertyFetch = () => {
    propertyListTrigger({ querys: `limit=${perPage}&page=${page}&status=active&searchKey=${searchKey}&city=${filterObj?.city}&areaName=${filterObj?.areaName }` });
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

  return (
    <div className="w-full p-4">
          <FilterAndSearch 
            createBtnShow={false}
            filterFieldConfig={filterInputData}
            onChangeHandler={filterChangeHandler}
            searchInputShow={false}
            gridStyle='md:grid-cols-3 lg:grid-cols-4'
          />
        <div>
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
        </div>
    </div>
  );
}
