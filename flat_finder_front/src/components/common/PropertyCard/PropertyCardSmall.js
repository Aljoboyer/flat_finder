import React, { useState } from 'react';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import ImageIcon from '@mui/icons-material/Image';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { capitalizeFirstLetter } from '@/utils/stringHelper';
import { useRouter } from 'next/navigation';
import FavoriteOutlined from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Buttons } from '../Buttons/Buttons';
import { COLORS } from '@/theme/colors';
import { errorToast, successToast } from '@/utils/toaster/toaster';
import { useSavePropertyMutation } from '@/app/redux/features/propertyApi';
import { getLocalStorageData } from '@/utils/getLocalStorageData';
import { isPropertySaved } from '@/helper/savePropertyCheck';

const ApartmentCard = ({property, savedList}) => {
  const [savePropertyHanlder, {  }] = useSavePropertyMutation();
  const router = useRouter();
  const userData = getLocalStorageData();
   const [savingPropertyId, setSavingPropertyId] = useState('')

  const propertySaveHandler = async (e, saveProperty, action) => {
      e.stopPropagation();
      setSavingPropertyId(saveProperty?._id)
      const reqObj = {
        seller: saveProperty?.seller?._id,
        buyer: userData?._id,
        property: saveProperty?._id,
        save: action == 'save' ? true : false
      }
      const saveRes = await savePropertyHanlder(reqObj);

      if(saveRes?.data?.msg == 'Property Saved Successfully'){
         setSavingPropertyId('')
        successToast('Property Saved Successfully')
      }
      else if(saveRes?.data?.msg == 'Property Unsaved Successfully'){
         setSavingPropertyId('')
        successToast('Property Unsaved Successfully')
      }
      else{
         setSavingPropertyId('')
        errorToast('Saving Failed')
      }

  }

  return (
    <div onClick={() => router.push(`/property-details/${property?._id}`)} className="rounded-2xl overflow-hidden shadow-md w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto cursor-pointer">
      <div className="relative">
        <img
          src={property?.images[0]} 
          alt="Apartment"
          className="w-full h-64 object-contain"
        />
        <div className="absolute top-2 left-2 bg-blue-800 text-white text-xs font-semibold px-2 py-1 rounded">
          FOR RENT
        </div>
        <div className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded">
          <ImageIcon fontSize="small" />
          <span className="text-sm ml-1">{property?.images?.length}</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <span className="inline-block bg-gray-200 text-gray-600 text-psm px-2 py-1 rounded">
          {capitalizeFirstLetter(property?.propertyType)}
        </span>

        <p className="text-p_lg font-bold text-gray-800">{property?.title}</p>
        
        <div className="text-p text-gray-600 font-medium">{property?.price} BDT <span className=" text-psm ">{`${property?.purpose == 'rent' ? '/Month' : ''}`}</span> | {property?.flatMeasurement} sqft</div>

        <div className="flex items-center gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <BedIcon fontSize="small" className="text-basecolor" />
            {property?.bedRooms} Bed
          </div>
          <div className="flex items-center gap-1">
            <BathtubIcon fontSize="small" className="text-basecolor" />
            {property?.bathrooms} Bath
          </div>
        </div>

        <div className='flex flex-row justify-between'>
            <div className="flex items-center text-gray-500 text-sm gap-1">
            <LocationOnIcon fontSize="small" />
            {property?.city}, {property?.areaName}
          </div>
          {
              userData?.role == 'buyer' && <Buttons 
              onClickHandler={(e) => {
              if(isPropertySaved(savedList, property?._id)){
                propertySaveHandler(e,property, 'unsave')
              }else{
                propertySaveHandler(e,property, 'save')
              }
            }}
            icon={isPropertySaved(savedList, property?._id) ? <FavoriteOutlined/> : <FavoriteBorderIcon/>}
            bgColor={isPropertySaved(savedList, property?._id) ? COLORS.side_yellow : COLORS.overlay} 
            textColor={COLORS.baseColor} 
            other_style={{ width: '20px', fontWeight: "bold", fontSize: '12px'}}
            isLoading={savingPropertyId == property?._id ? true : false}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;
