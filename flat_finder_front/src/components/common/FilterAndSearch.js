import React from 'react'
import InputField from "@/components/common/Inputs/InputField";
import { Buttons } from "@/components/common/Buttons/Buttons";
import { COLORS } from "@/theme/colors";
import AddHomeIcon from '@mui/icons-material/AddHome';
import CustomDatePicker from './FFDatePicker/FFDatePicker';

export default function FilterAndSearch({
    createBtnShow = true,
    filterFieldConfig,
    createHandler,
    onChangeHandler,
    onSearchHandler,
    searchInputShow = true,
    gridStyle = 'md:grid-cols-3',
    datePickerShow = false,
    selectedDate, setSelectedDate,
}) {
  return (
    <div>
        <div className="flex flex-row items-center justify-between flex-wrap my-4">
            {searchInputShow && <InputField onChangeHandler={onSearchHandler} inputType="search" placeholder='Search property id'/>}

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
            {
              datePickerShow && <div className='mt-4 md:mt-0 w-full md:w-fit'>
                <CustomDatePicker selectedDate={selectedDate} 
                setSelectedDate={setSelectedDate}  />
              </div>
            }
        </div>
        
        {
          filterFieldConfig && <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridStyle} gap-4`}>
          {
            filterFieldConfig?.map((field) => (
              <InputField 
                key={field?.field_id}
                otherStyle={{ marginTop: {xs: '10px', md: '0px'}}}
                label={field?.label}
                inputType={field?.inputType} 
                options={field?.options}
                onChangeHandler={onChangeHandler}
                field={field.fieldValue}
                field_id={field?.field_id}
                fieldItem={field}
                unSelectShow={true}
              />
            ))
          }
        </div>
        }

    </div>
  )
}
