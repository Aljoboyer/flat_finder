"use client"
import { useCreatePropertyMutation, useDeletePropertyImgMutation } from '@/app/redux/features/propertyApi'
import { Buttons } from '@/components/common/Buttons'
import FFLoader2 from '@/components/common/FFLoader-2'
import ImageUpload from '@/components/common/ImageUpload'
import InputField from '@/components/common/InputField'
import PropertyFormImg from '@/components/seller/propertyFormImg/PropertyFormImg'
import { propertyFormFields } from '@/constant/formConfigs/propertyFormConfigs'
import { uploadImage } from '@/helper/uploadImage'
import { COLORS } from '@/theme/colors'
import { extractImgPublicId } from '@/utils/extractImgPublicId'
import { getLocalStorageData } from '@/utils/getLocalStorageData'
import { successToast } from '@/utils/toaster/toaster'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function PropertyForm({property}) {
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
    reset,
    formState: { errors },
  } = useForm();

  
  const onSubmit = async (data) => {
   
        const postPropertyData = await postProperty({...data, images: images, seller: userData?._id})

        if(postPropertyData?.data?.msg == 'Poperty posted Successfully'){
          successToast('Successfully Property Posted!')
          router.push('/seller-properties')
        }
  }

  const imageUploadHandler = async (img) => {
    const uploadedData = await uploadImage(img, setImgLoading)
  
    setImages([...images, uploadedData?.url])
  }

  const onDeleteHandler = async (imgId) => {
    const public_id = extractImgPublicId(imgId)
   
    setCurrentDeletingImg(imgId)

    const deleteImg = await deletePropertyImg({public_id: public_id})
    
    if(deleteImg?.data?.message == 'Deleted successfully'){
      const removeDeletedImg = images?.filter((item) => item !== imgId)
    
      setImages(removeDeletedImg)
      setCurrentDeletingImg('')

    }
  }

  useEffect(() => {
    if(property?._id){
      setImages(property?.images)
       reset({
    ...property
    });
    }
  },[property?._id])

  return (
      <div className=" w-full">
          
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
                              defaultValue={fieldItem?.value}
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
