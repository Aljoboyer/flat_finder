import React from 'react'
import InputField from "@/components/common/Inputs/InputField";
import { Buttons } from "@/components/common/Buttons/Buttons";
import { COLORS } from "@/theme/colors";
import AddHomeIcon from '@mui/icons-material/AddHome';

export default function FilterAndSearch({
    createBtnShow = true,
    filterFieldConfig,
    createHandler,
    onChangeHandler
}) {
  return (
    <div>
        <div className="flex flex-row items-center justify-between flex-wrap my-4">
            <InputField inputType="search" placeholder='Search'/>

            {
                createBtnShow && <div>
                <Buttons
                onClickHandler={createHandler}
                title="Add Property" 
                icon={<AddHomeIcon sx={{marginRight: '5px'}}/>} 
                bgColor={COLORS.baseColor} 
                textColor={COLORS.side_yellow} other_style={{paddingY: '10px', marginTop: {xs: '15px',md: '0px'}, }}/>
            </div>
            }
            
        </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {
            filterFieldConfig?.map((field) => (
                <InputField 
                otherStyle={{ marginTop: {xs: '10px', md: '0px'}}}
                label={field?.label}
                inputType={field?.inputType} options={field?.options}
                onChangeHandler={onChangeHandler}
              />
            ))
          }
        </div>
    </div>
  )
}
