import React from 'react';
import { Skeleton } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ApartmentCardSkeleton = () => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto">
      <div className="relative">
        <Skeleton variant="rectangular" height={256} width="100%" />

        <div className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded flex items-center gap-1">
          <ImageIcon fontSize="small" />
          <Skeleton variant="text" width={20} height={20} />
        </div>
      </div>

      <div className="p-4 space-y-3">
        <Skeleton variant="rectangular" width={100} height={24} className="rounded" />
        <Skeleton variant="text" width="60%" height={28} />
        <Skeleton variant="text" width="40%" height={20} />

        <div className="flex items-center gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <BedIcon fontSize="small" className="text-green-600" />
            <Skeleton variant="text" width={40} height={20} />
          </div>
          <div className="flex items-center gap-1">
            <BathtubIcon fontSize="small" className="text-green-600" />
            <Skeleton variant="text" width={40} height={20} />
          </div>
        </div>

        <div className="flex items-center text-gray-500 text-sm gap-1">
          <LocationOnIcon fontSize="small" />
          <Skeleton variant="text" width="70%" height={20} />
        </div>
      </div>
    </div>
  );
};

export default ApartmentCardSkeleton;
