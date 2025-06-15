"use client"
import { useLazyGetAreaNamesQuery } from '@/app/redux/features/dropDownApi'
import { useCreatePropertyMutation, useDeletePropertyImgMutation, useUpdatePropertyMutation } from '@/app/redux/features/propertyApi'
import { Buttons } from '@/components/common/Buttons/Buttons'
import FFLoader2 from '@/components/common/FFLoader-2'
import ImageUpload from '@/components/common/ImageUpload'
import InputField from '@/components/common/Inputs/InputField'
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
  const [updateProperty, { }] = useUpdatePropertyMutation();
  const [deletePropertyImg, { isLoading: deleteImgLoader, isSuccess }] = useDeletePropertyImgMutation();
  const [currentDeletingImg, setCurrentDeletingImg] = useState('')
  const [images, setImages] = useState([])
  const userData = getLocalStorageData()
  const router = useRouter()
  const [propertyFields, setPropertyFields] = useState(propertyFormFields)
  const [areaNameTrigger, { data: areaNameList}] = useLazyGetAreaNamesQuery();

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
       setLoading(true)
       if(property?._id){
         const postPropertyData = await updateProperty({...data})

          if(postPropertyData?.data?.msg == 'updated successfully'){
            setLoading(false)
            successToast('Successfully Property Updated!')
            router.push('/seller-properties')
          }
       }
       else{
          const postPropertyData = await postProperty({...data, images: images, seller: userData?._id})

          if(postPropertyData?.data?.msg == 'Poperty posted Successfully'){
            setLoading(false)
            successToast('Successfully Property Posted!')
            router.push('/seller-properties')
          }
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
      const fieldsAddedValue = propertyFormFields?.map((item) => {
        if(item?.inputType == 'select' || item?.inputType == 'autocomplete'){
          const newObj = {...item, value: property[item?.field_id]}
          return newObj
        }
        else{
          return item
        }
      })
      
      setPropertyFields(fieldsAddedValue)
    }
  },[property?._id]) 

  const {city, areaName} = getValues();

  useEffect(() => {
    if(areaNameList?.data?.length > 0 && areaNameList){
      const formatAreaNameData = areaNameList?.data?.map((item) => {
        const newObj = {"label": item?.areaName, value: item?.areaName}
        return newObj
      })
      const fieldsAddedValue = propertyFields?.map((item) => {
        if(item?.field_id == 'areaName'){
          const newObj = {...item, options: formatAreaNameData, suggestionText: ''}
          return newObj
        }
        else{
          return item
        }
      })
      setPropertyFields(fieldsAddedValue)
    }

  },[areaNameList, areaNameList?.data?.length])

  useEffect(() => {
    if(city){
      areaNameTrigger({ querys: `city=${city}` });
      setValue('areaName', '')
    }
  },[city])

  console.log('areaNameList ===>', areaNameList)
  
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
                          propertyFields?.map((fieldItem) => (
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
                                  fieldItem={fieldItem}
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
