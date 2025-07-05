"use client"
import React, { useEffect, useState } from 'react'
import { CardContent } from "@mui/material";
import { Buttons } from "@/components/common/Buttons/Buttons";
import { Upload } from "@mui/icons-material";
import { COLORS } from "@/theme/colors";
import { useForm, Controller } from "react-hook-form";
import InputField from "@/components/common/Inputs/InputField";
import { profileFormConfigs } from "@/constant/formConfigs/profileFormConfigs";
import { getLocalStorageData } from '@/utils/getLocalStorageData';
import { useLazyGetAreaNamesQuery } from '@/app/redux/features/dropDownApi';
import { useUpdateProfileMutation } from '@/app/redux/features/profileApi';
import { successToast } from '@/utils/toaster/toaster';
import { uploadImage } from '@/helper/uploadImage';

 export const updateLocalStorage = (dataObj) => {
      const userDataRaw = localStorage.getItem('ff_user');
      const userDataLocal = JSON.parse(userDataRaw || '{}');
      const newData = {...userDataLocal, result: dataObj}
      localStorage.setItem('ff_user', JSON.stringify(newData))
  }

export default function Profile() {
  const [selectedImage, setSelectedImage] = useState(null);
  const userData = getLocalStorageData();
  const [profileFormFields, setProfileFormFields] = useState([])
  const [areaNameTrigger, { data: areaNameList}] = useLazyGetAreaNamesQuery();
  const [updateProfile, {  }] = useUpdateProfileMutation();
  const [imgLoading , setImgLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const {
    handleSubmit,
    control,
    setError,
    setValue ,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

 
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      const uploadedData = await uploadImage(file, setImgLoading)
      updateLocalStorage({...userData, image: uploadedData?.url})
      const profileUpdateRes = await updateProfile({_id: userData?._id, image: uploadedData?.url});
      if(profileUpdateRes?.data?.msg == 'updated successfully'){
        successToast('Successfully Profile Picture Updated!')
      }
    }
  };

  const onSubmit = async (data)  => {
    setLoading(true)
    const reqObj = {
      ...data,
      address:{
        city: data?.city,
        state: data?.areaName,
        country: 'Bangladesh'
      }
    }
    const profileUpdateRes = await updateProfile(reqObj);

    if(profileUpdateRes?.data?.msg == 'updated successfully'){
      updateLocalStorage(reqObj)
      successToast('Successfully Profile Updated!')
      setLoading(false)
    }
  }

  useEffect(() => {
    if(userData.role == 'buyer'){
      const userObj = {
        ...userData,
        city: userData?.address?.city,
        areaName: userData?.address?.state
      }
       reset({
            ...userObj
        });
      setProfileFormFields(profileFormConfigs?.slice(0, 5))
    }else{
            const userObj = {
        ...userData,
        city: userData?.address?.city,
        areaName: userData?.address?.state
      }
       reset({
            ...userObj
        });
       setProfileFormFields(profileFormConfigs)
    }
  },[userData?.role])

  useEffect(() => {
    if(profileFormFields?.length > 0){
    const fieldsAddedValue = profileFormFields?.map((item) => {
        if(item?.inputType == 'select' || item?.inputType == 'autocomplete'){
          const newObj = {...item, value: userData[item?.field_id]}
          return newObj
        }
          else{
            return item
          }
        })
      
      setProfileFormFields(fieldsAddedValue)
    }
  },[profileFormFields?.length])

    const {city} = getValues();

    useEffect(() => {
      if(city){
        areaNameTrigger({ querys: `cityName=${city}` });
      }
    },[city])

    useEffect(() => {
      if(areaNameList?.data?.length > 0 && areaNameList){
        const formatAreaNameData = areaNameList?.data?.map((item) => {
          const newObj = {"label": item?.areaName, value: item?.areaName}
          return newObj
        })
        const fieldsAddedValue = profileFormFields?.map((item) => {
          if(item?.field_id == 'areaName'){
            const newObj = {...item, options: formatAreaNameData, suggestionText: ''}
            return newObj
          }
          else{
            return item
          }
        })
        setProfileFormFields(fieldsAddedValue)
      }
  
    },[areaNameList, areaNameList?.data?.length])

  return (
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded p-0 md:p-4 lg:p-6 ">
  
        <div className="w-full md:w-1/3 property_card">
          <CardContent className="flex flex-col items-center gap-4">

            <div className="rounded-full w-48 h-48 overflow-hidden">
              <img
                src={
                  selectedImage ? selectedImage : userData?.image ? userData?.image : 
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
                component='span'
                icon={<Upload/>}
                title="Upload New Picture"
                bgColor={COLORS.baseColor}
                textColor={COLORS.side_yellow}
                other_style={{fontWeight: '600'}}
                isLoading={imgLoading}
              />
          </label>
          </CardContent>
        </div>

        {/* Edit Account Details */}
        <div className="w-full md:w-2/3 property_card">
          <CardContent className="space-y-4">
            <h2 className="font-semibold text-title text-blackshade my-4">Update Account Details</h2>
              <form  onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-4 gap-y-6">
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
                </div>
              <Buttons
                type='submit'
                title="Change Details"
                bgColor={COLORS.baseColor}
                textColor={COLORS.side_yellow}
                other_style={{fontWeight: '600', width: {xs: '100%', md: '40%', lg: '30'}, marginTop: '20px'}}
                isLoading={loading}
              />
            </form>
          </CardContent>
        </div>
      </div>
  )
}
