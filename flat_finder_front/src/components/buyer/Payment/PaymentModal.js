import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { COLORS } from '@/theme/colors';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CardContent, Chip } from '@mui/material';
import { MdLocationOn } from "react-icons/md";
import { Buttons } from '@/components/common/Buttons/Buttons';
import { capitalizeFirstLetter } from '@/utils/stringHelper';
import CheckoutForm from './CheckoutForm';

const stripePromise =  loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentModal({
  open, setOpen, 
  confirmHandler, 
  loading,
  property
}) {

  const handleClose = () => setOpen(false);
 
  return (

      <Dialog
        
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          sx: {
            maxWidth: '900px',
            width: '90%',
            borderRadius: 3,
            backgroundColor: 'whtie',
            border: `2px solid ${COLORS.baseColor}`,
          },
        }}
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{ pr: 5 }}
        >
         <p className='text-p_lg text-basecolor font-semibold'>Payment</p>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: COLORS.baseColor,
              background: COLORS.overlay
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <div className="grid md:grid-cols-2 m-4">
          <div className="w-full h-[200px] md:h-[450px] property_card">
            <img
              src={property?.property?.images[0]}
              alt={property?.property?.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Payment Info */}
          <div className="bg-white px-6 py-8 flex flex-col justify-between property_card">
            {/* Property Info */}
            <div>
              <Chip
                label={capitalizeFirstLetter(property?.property?.propertyType)}
                sx={{
                  backgroundColor: COLORS.overlay,
                  color: COLORS.baseColor,
                  fontWeight: "bold",
                  mb: 1,
                }}
              />
              
              <p className='text-basecolor font-bold text-p_lg'>{property?.property?.title} </p>

              <div className='flex flex-row items-center my-2'>
                <MdLocationOn className="text-basecolor" />
                <p className='text-blackshade text-p font-medium'>{property?.property?.city}, {property?.property?.areaName}</p>
              </div>

              {/* Pricing Section */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between">
                  <p className='text-blackshade text-p_lg font-semibold'>Price:</p>
                  <p className='text-blackshade text-p font-semibold'>{property?.property?.price} BDT</p>
                </div>
                <div className="flex justify-between">
                  <p className='text-blackshade text-p_lg font-semibold'>Advance Payment:</p>
                  <p className='text-bluemain text-p font-semibold'>{property?.property?.advanceMoney} BDT</p>
                </div>
              </div>
            </div>
            
            <Elements  stripe={stripePromise}>
                <CheckoutForm property={property} handleClose={handleClose}/>
            </Elements>
        
          </div>
        </div>

        <DialogActions sx={{ px: 3, pb: 2 ,}}>

        </DialogActions>
      </Dialog>
  );
}
