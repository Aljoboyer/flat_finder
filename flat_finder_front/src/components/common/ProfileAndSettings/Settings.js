"use client"
import { settingsFormConfigs } from '@/constant/formConfigs/profileFormConfigs'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import InputField from '../Inputs/InputField';
import { CardContent } from '@mui/material';
import { Buttons } from '../Buttons/Buttons';
import { COLORS } from '@/theme/colors';
import { useChangePasswordMutation } from '@/app/redux/features/profileApi';
import { getLocalStorageData } from '@/utils/getLocalStorageData';
import { successToast } from '@/utils/toaster/toaster';
import { updateLocalStorage } from './Profile';

export default function Settings() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const userData = getLocalStorageData();

  const {
      handleSubmit,
      control,
      setError,
      reset,
      watch,
      formState: { errors },
    } = useForm();

const newPassword = watch('newPassword');

  const onSubmit = async (data)  => {
    const reqObj = {
      _id: userData?._id,
      password: userData?.password,
      newPassword: data?.newPassword,
      oldPassword: data?.password
    }
    const resData = await changePassword(reqObj);
    if(resData?.data?.msg == 'Your current password is incorrect.'){
       setError('password', { type: "custom", message: 'Your current password is incorrect.' });
    }
    else{
      successToast('Successfully password changed !')
      updateLocalStorage({...userData, password: resData?.data?.newPassword})
      reset()
    }

  }

  return (
   <div className="w-full md:w-2/3 property_card bg-white">
          <CardContent className="space-y-4">
            <h2 className="font-semibold text-title text-blackshade my-4">Update Account Settings</h2>
              <form 
              onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-x-4 gap-y-6" >
                    {
                    settingsFormConfigs?.map((fieldItem) => (
                      <Controller
                          key={fieldItem?.field_id}
                          name={fieldItem?.field_id}
                          control={control}
                          defaultValue=""
                          rules={{
                            ...fieldItem?.required,
                            ...(fieldItem?.field_id == 'newPassword_2' && {validate: (value) => value == newPassword || 'Re-entered password does not match the new password.'})
                            
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
                            
                              />
                          )}
                        />
                    ))
                  }
                </div>
              <Buttons
                type='submit'
                title="Change Password"
                bgColor={COLORS.baseColor}
                textColor={COLORS.side_yellow}
                other_style={{fontWeight: '600', width: {xs: '100%', md: '40%', lg: '30'}, marginTop: '20px'}}
                isLoading={isLoading}
              />

            </form>

          </CardContent>
        </div>
  )
}
