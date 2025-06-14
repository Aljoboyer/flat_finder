"use client"
import { useCreatePropertyMutation, useDeletePropertyImgMutation } from '@/app/redux/features/propertyApi'
import { Buttons } from '@/components/common/Buttons'
import FFLoader2 from '@/components/common/FFLoader-2'
import FFPageHeader from '@/components/common/FFPageHeader'
import ImageUpload from '@/components/common/ImageUpload'
import InputField from '@/components/common/InputField'
import PropertyFormImg from '@/components/seller/propertyFormImg/PropertyFormImg'
import { propertyFormFields } from '@/constant/formConfigs/propertyFormConfigs'
import { uploadImage } from '@/helper/uploadImage'
import { COLORS } from '@/theme/colors'
import { getLocalStorageData } from '@/utils/getLocalStorageData'
import { successToast } from '@/utils/toaster/toaster'
import { Box, CircularProgress, Grid } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function page() {
  const [loading, setLoading] = useState(false)
  const [imgLoading , setImgLoading] = useState(false)
  const [postProperty, { isLoading }] = useCreatePropertyMutation();
  const [deletePropertyImg, { isLoading: deleteImgLoader, isSuccess }] = useDeletePropertyImgMutation();
  const [currentDeletingImg, setCurrentDeletingImg] = useState('')
  const [images, setImages] = useState([])
  const userData = getLocalStorageData()
  const router = useRouter()

  const {
    handleSubmit,
    control,
    setError,
    setValue ,
    getValues,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
   
        const urls = images.map(item => item.url);
        const postPropertyData = await postProperty({...data, images: urls, seller: userData?._id})
        console.log('post respons ===>', postPropertyData)
        if(postPropertyData?.data?.msg == 'Poperty posted Successfully'){
          successToast('Successfully Property Posted!')
          router.push('/seller-properties')
        }
  }

  const imageUploadHandler = async (img) => {
    const uploadedData = await uploadImage(img, setImgLoading)
    console.log('check', uploadedData)
    setImages([...images, uploadedData])
  }

  const onDeleteHandler = async (imgId) => {
    setCurrentDeletingImg(imgId)
    const deleteImg = await deletePropertyImg({public_id: imgId})
    if(deleteImg?.data?.message == 'Deleted successfully'){
      const removeDeletedImg = images?.filter((item) => item?.public_id !== imgId)
      console.log('removed img', removeDeletedImg)
      setImages(removeDeletedImg)
      setCurrentDeletingImg('')

    }
  }

  return (
      <div className="bg-overlay  p-6 rounded-t-[20px] w-full">
           <FFPageHeader pageTitle="Create Property"/>
           <div className="bg-white rounded-md p-4">

            {
              imgLoading ? <FFLoader2 /> : <ImageUpload 
             
              imageUploadHandler={imageUploadHandler} 
              ImageResolution={700}
              />
            }
            
            <PropertyFormImg
              onDeleteHandler={onDeleteHandler}
              currentDeletingImg={currentDeletingImg}
              imgData={images}
              deleteLoader={deleteImgLoader}
            />

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                                  onChangeHandler={(id , value) => {
                                      if(fieldItem?.inputType == 'select' || fieldItem?.inputType == 'autocomplete'){
                                        setValue(`${id}`, value)
                                        setError(`${id}`, { type: "custom", message: "" });
                                      }
                                  } }
                                  />
                              )}
                            />
                          ))
                        }
                  </div>
                <div className='flex flex-row justify-end'>
                  <Buttons
                  isLoading={isLoading}
                  type='submit' title="Create" 
                  bgColor={COLORS.side_yellow} textColor="black" 
                  other_style={{fontWeight: '700', marginTop: '10px', width: {xs: '100%',  md: '20%'},}} />
                </div>
              </form>
           </div>
       </div>
  )
}
