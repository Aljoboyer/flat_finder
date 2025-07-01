import React from 'react';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import ImageIcon from '@mui/icons-material/Image';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { capitalizeFirstLetter } from '@/utils/stringHelper';
import { useRouter } from 'next/navigation';

const ApartmentCard = ({property}) => {
  const router = useRouter();

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
        
        <div className="text-p text-gray-600 font-medium">{property?.price} BDT | {property?.flatMeasurement} sqft</div>

        <div className="flex items-center gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <BedIcon fontSize="small" className="text-basecolor" />
            3 Bed
          </div>
          <div className="flex items-center gap-1">
            <BathtubIcon fontSize="small" className="text-basecolor" />
            3 Bath
          </div>
        </div>

        <div className="flex items-center text-gray-500 text-sm gap-1">
          <LocationOnIcon fontSize="small" />
          {property?.city}, {property?.areaName}
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;
