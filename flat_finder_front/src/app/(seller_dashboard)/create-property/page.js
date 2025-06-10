"use client"
import { Buttons } from '@/components/common/Buttons'
import FFPageHeader from '@/components/common/FFPageHeader'
import InputField from '@/components/common/InputField'
import { propertyFormFields } from '@/constant/formConfigs/propertyFormConfigs'
import { COLORS } from '@/theme/colors'
import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function page() {
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('hello ', data)
  }

  return (
      <div className="bg-overlay  p-6 rounded-t-[20px] w-full">
           <FFPageHeader pageTitle="Create Property"/>
           <div className="bg-white rounded-md p-4">
                  <form className="space-y-4" onSubmit={handleSubmit()} noValidate>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {
                                propertyFormFields.map((fieldItem) => (
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
                                          options={fieldItem?.options}
                                          />
                                      )}
                                    />
                                ))
                              }
                          </div>
            
                     <div className='flex flex-row justify-end'>
                       <Buttons
                        isLoading={loading}
                        type='submit' title="Create" 
                        bgColor={COLORS.side_yellow} textColor="black" 
                        other_style={{fontWeight: '700', marginTop: '10px', width: {xs: '100%',  md: '20%'},}} />
                      </div>
                  </form>
           </div>
       </div>
  )
}
