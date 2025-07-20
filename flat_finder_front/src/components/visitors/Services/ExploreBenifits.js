import React from 'react'
import HomeIcon from "@mui/icons-material/Home";
import { KeyOutlined } from '@mui/icons-material';

export default function ExploreBenifits() {
  return (
    <div className='p-4 md:p-7 lg:p-11 my-7'>
        <div className="max-w-3xl mx-auto mb-12">
            <h1 className="text-lg_title md:text-xl_title font-bold text-basecolor mb-6">
            Explore unique benefits in each option
            </h1>
            <p className="text-blackshade text-p_lg md:text-title_sm text-center">
          Discover the advantages of owning a property or renting as a tenant
            </p>
        </div>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto mt-4">
            <div>
                <div
                className={`rounded-full p-3 bg-green-100 flex items-center justify-center w-[40px] h-[40px]`}>
                    <HomeIcon className="text-basecolor" />
                </div>
                <p className='font-semibold text-p_lg md:text-title_sm text-blackshade my-4'>Property Owner Benefits</p>
                <li>Maximize Long-term Returns through Property Appreciation</li>
                <li>Enhanced Exposure to Qualified Audiences</li>
                <li>Reliable, Trustworthy Tenants</li>
                <li>Low Maintenance for Service Apartments</li>
                <li>Authentic Properties at Competitive Prices</li>
                <li>Trusted Partner for Buying and Selling</li>
                <li>Maximize Property Sale Value</li>
                <li>Flexible Payment Policies and Procedures</li>
            </div>
            
            <div className="overflow-hidden rounded-[40px]">
                <img
                src="/assets/homebenifits.webp"
                alt="Move-in ready"
                className="w-full object-cover"
                style={{ objectPosition: "right", aspectRatio: "1.8 / 1" }}
                />
            </div>
         </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto mt-21">
           <div className="overflow-hidden rounded-[40px]">
                <img
                src="/assets/keybenifits.webp"
                alt="Move-in ready"
                className="w-full object-cover"
                style={{ objectPosition: "right", aspectRatio: "1.8 / 1" }}
                />
            </div>
            <div>
                <div
                className={`rounded-full p-3 bg-green-100 flex items-center justify-center w-[40px] h-[40px]`}>
                    <KeyOutlined className="text-basecolor" />
                </div>
                <p className='font-semibold text-p_lg md:text-title_sm text-blackshade my-4'>Tenant Benefit</p>
                <li>Extensive Selection of High-value Properties</li>
                <li>Dedicated, Responsive Customer Support</li>
                <li>Properties Available Across Various Price Ranges</li>
                <li>Access to Premium Amenities for Serviced Apartments</li>
                <li>Ready-to-Move-in Service Apartments</li>
                <li>Minimal Legal Concerns</li>
                <li>Transparent, Hassle-free Leasing</li>
                <li>Flexible Payment Policies and Regulations</li>
            </div>
         </div>
    </div>
  )
}
