import React, { useEffect, useState } from 'react'
import {CardContent } from "@mui/material";
import { Buttons } from "@/components/common/Buttons/Buttons";
import { Upload } from "@mui/icons-material";
import { COLORS } from "@/theme/colors";
import { useForm, Controller } from "react-hook-form";
import InputField from "@/components/common/Inputs/InputField";
import { profileFormConfigs } from "@/constant/formConfigs/profileFormConfigs";
import { getLocalStorageData } from '@/utils/getLocalStorageData';

export default function Profile() {
  const [selectedImage, setSelectedImage] = useState(null);
  const userData = getLocalStorageData();
  const [profileFormFields, setProfileFormFields] = useState([])
  
  const {
    handleSubmit,
    control,
    setError,
    setValue ,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  const onSubmit = ()  => {

  }

  useEffect(() => {
    if(userData.role == 'buyer'){
      setProfileFormFields(profileFormConfigs?.slice(0, 5))
    }else{
       setProfileFormFields(profileFormConfigs)
    }
  },[userData?.role])

  return (
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded p-0 md:p-4 lg:p-6 ">
  
        <div className="w-full md:w-1/3 property_card">
          <CardContent className="flex flex-col items-center gap-4">

            <div className="rounded-full w-48 h-48 overflow-hidden">
              <img
                src={
                  selectedImage ||
                  "/assets/blank-profile.png"
                }
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-psm text-gray-500">Upload/Change Your Profile Image</p>
            <input
              accept="image/*"
              type="file"
              id="upload-avatar"
              hidden
              onChange={handleImageUpload}
            />
            <label htmlFor="upload-avatar">
              <Buttons
                icon={<Upload/>}
                title="Upload New Picture"
                bgColor={COLORS.baseColor}
                textColor={COLORS.side_yellow}
                other_style={{fontWeight: '600'}}
              />
            </label>
          </CardContent>
        </div>

        {/* Edit Account Details */}
        <div className="w-full md:w-2/3 property_card">
          <CardContent className="space-y-4">
            <h2 className="font-semibold text-title text-blackshade my-4">Update Account Details</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-4 gap-y-6" 
              onSubmit={handleSubmit(onSubmit)} noValidate>
                {
                  profileFormFields?.map((fieldItem) => (
                    <Controller
                        key={fieldItem?.field_id}
                        name={fieldItem?.field_id}
                        control={control}
                        defaultValue=""
                        rules={{
                          ...fieldItem?.required
                        }}
                        render={({ field }) => (
                            <InputField
                            otherStyle={{marginTop: '14px'}}
                            label={fieldItem?.label} 
                            field={field}
                            field_id={fieldItem?.field_id}
                            errors={errors}
                            placeholder={fieldItem?.placeholder}
                            inputType={fieldItem?.inputType}
                            fieldItem={fieldItem}
                            options={fieldItem?.options}
                            onChangeHandler={(id , value) => {
                                if(fieldItem?.inputType == 'select' || fieldItem?.inputType == 'autocomplete'){
                                  if(id == 'city'){
                                    setValue(`${id}`, value)
                                    setValue(`areaName`, '')
                                    setError(`${id}`, { type: "custom", message: "" });
                                  }else{
                                    setValue(`${id}`, value)
                                    setError(`${id}`, { type: "custom", message: "" });

                                  }
                                }
                              } }
                            />
                        )}
                      />
                  ))
                }
            </form>

               <Buttons
                title="Change Details"
                bgColor={COLORS.baseColor}
                textColor={COLORS.side_yellow}
                other_style={{fontWeight: '600', width: {xs: '100%', md: '40%', lg: '30'}}}
              />
          </CardContent>
        </div>
      </div>
  )
}
