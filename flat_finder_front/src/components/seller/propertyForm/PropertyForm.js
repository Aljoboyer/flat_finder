"use client"
import { useLazyGetAreaNamesQuery } from '@/app/redux/features/dropDownApi'
import { useCreatePropertyMutation, useDeletePropertyImgMutation, useUpdatePropertyMutation } from '@/app/redux/features/propertyApi'
import { Buttons } from '@/components/common/Buttons/Buttons'
import FFLoader2 from '@/components/common/Loaders/FFLoader-2'
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
import { getSocket } from '@/utils/socket/socket'
import { Button } from '@mui/material'

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
  const [deleteUrls, setDeletedUrls] = useState([])
  const [imgErr, setImgErr] = useState('')
  const socket = getSocket();

  const {
    handleSubmit,
    control,
    setError,
    setValue ,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  
    const deleteImgApiCall = async (imgId) => {
      const deleteImgRes = await deletePropertyImg({public_id: imgId})
      return deleteImgRes
    }

    const onSubmit = async (data) => {

        setLoading(true)

        if(property?._id){
            if(deleteUrls?.length > 0){
              await deleteImgApiCall(deleteUrls)
            }
            if(images?.length == 0){
              setLoading(false)
              setImgErr('Add at least one image')
              return
            }
            const postPropertyData = await updateProperty({...data, images: images})

            if(postPropertyData?.data?.msg == 'updated successfully'){
              setLoading(false)
              successToast('Successfully Property Updated!')
              router.push('/seller-properties')
            }
        }
        else{
            if(deleteUrls?.length > 0){
              await deleteImgApiCall(deleteUrls)
            }
            if(images?.length == 0){
              setLoading(false)
              setImgErr('Add at least one image')
              return
            }
            const postPropertyData = await postProperty({...data, images: images, seller: userData?._id})

            if(postPropertyData?.data?.msg == 'Poperty posted Successfully'){

              const notificationObj = {
                message: `Seller ${userData?.name} Posted New Property.`,
                sender: userData?._id,
                connectionRoamId: userData?._id,
                property: postPropertyData?.data?.newProperty?._id,
                type: 'new-property'
              }
              
              socket.emit('postedproperty', notificationObj);
              
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

    const deleteImgFilterHandler = (imgId) => {
      const removeDeletedImg = images?.filter((item) => item !== imgId)
      setImages(removeDeletedImg)
    }

    const onImgDeleteHandler = async (imgId) => {
      
      deleteImgFilterHandler(imgId);
      const public_id = extractImgPublicId(imgId)
      setDeletedUrls([...deleteUrls, public_id])

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

    const {city} = getValues();

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
        areaNameTrigger({ querys: `cityName=${city}` });
      }
    },[city])
  
  return (
      <div className=" w-full">

           <div className="bg-white rounded-md p-4">

            {
              imgLoading ? <div className='w-[100px] h-[50px] mx-auto'><FFLoader2/> </div> : <ImageUpload 
              imageUploadHandler={imageUploadHandler} 
              ImageResolution={2000}
              />
            }
            <p className='my-2 text-red-600 text-p text-center'>{images.length == 0 && imgErr}</p>
            <PropertyFormImg
              onDeleteHandler={onImgDeleteHandler}
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
                <div className='flex flex-row justify-end'>
                  <Buttons
                  isLoading={loading}
                  type='submit' title={property?._id ? 'Update' : 'Post'} 
                  bgColor={COLORS.side_yellow} textColor="black" 
                  other_style={{fontWeight: '700', marginTop: '10px', width: {xs: '100%',  md: '20%'},}} />
                </div>
              </form>
           </div>
       </div>
  )
}
