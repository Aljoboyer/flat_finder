import { AutoCompletes } from '@/components/common/AutoComplete'
import { Buttons } from '@/components/common/Buttons'
import React from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { COLORS } from "@/theme/colors";
import { cities } from '@/constant/dropdownData';

export const HeroSection = () => {
  return (
 <div className="h-screen  w-full landing_hero_section pt-4 xsm:p-4">
        <div className="bg-white lg:w-2/3 xl:w-1/2 lg:ml-7 p-7 lg:p-11 form_box ">
            <div>
                <h1 className="md:text-xxl_title xsm:text-lg_title font-medium text-basecolor leading-snug">Feel at home, <br/> free to roam</h1>
                <p className="my-4">Experience the home that moves with you for a month, a year, or longer with a global network of designer, furnished apartments.</p>
            </div>
            <div className="  flex flex-col md:flex-row items-center gap-4 mt-4 w-full max-w-2xl header_form p-[15px]">
              <AutoCompletes options={cities} label='City'/>
              <AutoCompletes options={cities} label='Area Name'/>

              <Buttons title="Serch" icon={ <SearchRoundedIcon />} other_style={{width: '200px', height: '45px'}} bgColor={COLORS.baseColor} textColor="white"/>
            </div>
        </div>
    </div>
  )
}
