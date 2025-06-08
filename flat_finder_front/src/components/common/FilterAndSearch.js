import React from 'react'
import InputField from "@/components/common/InputField";
import { Buttons } from "@/components/common/Buttons";
import { COLORS } from "@/theme/colors";
import AddHomeIcon from '@mui/icons-material/AddHome';
import { Box } from '@mui/material';

export default function FilterAndSearch({
    createBtnShow = true,
    filterFieldConfig
}) {
  return (
    <div>
        <div className="flex flex-row items-center justify-between flex-wrap my-4">
            <InputField inputType="search" placeholder='Search'/>

            {
                createBtnShow && <div>
                <Buttons title="Add Property" 
                icon={<AddHomeIcon sx={{marginRight: '5px'}}/>} 
                bgColor={COLORS.baseColor} 
                textColor={COLORS.side_yellow} other_style={{paddingY: '10px', marginTop: {xs: '15px',md: '0px'}, }}/>
            </div>
            }
            
        </div>

        <div className='flex flex-row items-center flex-wrap'>
          {
            filterFieldConfig?.map((field) => (
              <Box sx={{width: {xs: '100%', md: '40%'}}}>
                <InputField 
                otherStyle={{width: {xs: '100%', md: '90%'}, marginTop: {xs: '10px', md: '0px'}}}
              textFieldLabel={field?.textFieldLabel}
              inputType={field?.inputType} options={field?.options}
              />
              </Box>
            ))
          }
        </div>
    </div>
  )
}
