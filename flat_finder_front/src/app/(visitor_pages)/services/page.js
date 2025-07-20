"use client"

import ServiceSection from "@/components/visitors/Services/ServiceSection"

export default function page() {
  return (
    <div className='w-full'>
        <div className="bg-basecolor p-7 my-7">
            <p className="text-lg_title md:text-xl_title font-bold text-side_yellow text-center">Services</p>
            <p className="text-p md:text-p_lg  text-white text-center">Home/Services</p>
        </div>
        <ServiceSection/>
    </div>
  )
}
