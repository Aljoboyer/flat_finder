"use client"

import React from 'react'
import { CiFacebook, CiLinkedin, CiInstagram } from "react-icons/ci";

 const FFooter = () => {
  return (
 <footer className="bg-[#F3F9F8] text-[#00594C] py-10 px-6 mt-4 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo + Social Icons */}
          <div className='xsm:mx-auto lg:mx-0'>
            <div className="flex items-center mb-4">
              <img src="/assets/logo_circle.png" alt="Foxtons" className="h-34 mr-2 rounded-full" />
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="border border-basecolor p-2 rounded-full">
                    <CiFacebook size={28}/>
              </a>
               <a href="#" className="border border-basecolor p-2 rounded-full">
                    <CiLinkedin size={28}/>
              </a>
               <a href="#" className="border border-basecolor p-2 rounded-full">
                    <CiInstagram size={28}/>
              </a>
            </div>
          </div>

          {/* About Foxtons */}
          <div  className='xsm:mx-auto lg:mx-0'>
            <h4 className="font-semibold text-basecolor mb-3 text-title_sm">About Foxtons</h4>
            <ul className="space-y-2 text-sm">
              <li className='text-psm hover:text-underline'><a href="#">About Foxtons Estate Agent</a></li>
              <li className='text-psm hover:text-underline'><a href="#">Sales jobs in London</a></li>
              <li className='text-psm hover:text-underline'><a href="#">Property Management in London</a></li>
              <li className='text-psm hover:text-underline'><a href="#">Branch Finder</a></li>
              <li className='text-psm hover:text-underline'><a href="#">News from Foxtons</a></li>
              <li className='text-psm hover:text-underline'><a href="#">Awards</a></li>
            </ul>
          </div>

          {/* Our estate agencies */}
          <div  className='xsm:mx-auto lg:mx-0'>
            <h4 className="font-semibold text-basecolor mb-3 text-title_sm">Our estate agencies</h4>
            <ul className="space-y-2 text-sm">
              <li className='text-psm hover:text-underline'><a href="#">Central London estate agents</a></li>
              <li className='text-psm hover:text-underline'><a href="#">East London estate agents</a></li>
              <li className='text-psm hover:text-underline'><a href="#">North London estate agents</a></li>
              <li className='text-psm hover:text-underline'><a href="#">South London estate agents</a></li>
              <li className='text-psm hover:text-underline'><a href="#">Surrey estate agents</a></li>
              <li className='text-psm hover:text-underline'><a href="#">West London estate agents</a></li>
            </ul>
          </div>

          {/* Property intelligence */}
          <div  className='xsm:mx-auto lg:mx-0'>
            <h4 className="font-semibold text-basecolor mb-3 text-title_sm">Property intelligence</h4>
            <ul className="space-y-2 text-sm">
              <li className='text-psm hover:text-underline'><a href="#">Area guides</a></li>
              <li className='text-psm hover:text-underline'><a href="#">House price reports</a></li>
              <li className='text-psm hover:text-underline'><a href="#">Rental reports</a></li>
              <li className='text-psm hover:text-underline'><a href="#">Home valuation service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom border */}
        <hr className="mt-10 border-t border-[#CDE5E2]" />
      </div>
    </footer>
  )
}
export default FFooter;