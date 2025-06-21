"use client"

import { useLazyGetPropertyListQuery } from "@/app/redux/features/propertyApi";
import FFNodata from "@/components/common/FFNodata";
import SkeletonPropertyCard from "@/components/common/Loaders/SkeletonPropertyCard";
import PropertyCard from "@/components/common/PropertyCard/PropertyCard";
import { useEffect, useState } from "react";


export default function SearchProperty() {
  const [propertyListTrigger, { data: propertyList, error, isLoading , isFetching}] = useLazyGetPropertyListQuery();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filterObj, setFilterObj] = useState({city: '', areaName: ''})
  const [searchKey, setSearchKey] = useState('')

  const propertyFetch = () => {
    propertyListTrigger({ querys: `limit=${perPage}&page=${page}&status=active&searchKey=${searchKey}&city=${filterObj?.city}&areaName=${filterObj?.areaName }` });
  }

    useEffect(() => {
      if (typeof window !== 'undefined') {
   
        propertyFetch()
      }
    }, [perPage, page]);
  
    console.log('propertyList ===>', propertyList?.data)
  return (
    <div className="w-full p-4">
        <div>
            {
            isFetching ? [1,2,3]?.map((item) => (
              <SkeletonPropertyCard key={item}/>
            )) : <>
                {
                  propertyList?.data?.length == 0 ? <FFNodata/> : 
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
