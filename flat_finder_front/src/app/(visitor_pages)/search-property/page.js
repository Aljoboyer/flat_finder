"use client"

import PropertyCard from "@/components/common/PropertyCard/PropertyCard";


export default function SearchProperty() {


  return (
    <div className="w-full p-4">
        {
          [1,2,3,4,5,]?.map((item) => (
            <PropertyCard/>
          ))
        }
    </div>
  );
}
