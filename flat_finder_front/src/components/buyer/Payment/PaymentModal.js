import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { COLORS } from '@/theme/colors';
import Checkoutform from '../Checkoutform/Checkoutform';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CardContent, Chip } from '@mui/material';
import { MdLocationOn } from "react-icons/md";
import { Buttons } from '@/components/common/Buttons/Buttons';
import { capitalizeFirstLetter } from '@/utils/stringHelper';

const stripePromise =  loadStripe('pk_test_51Jw2mpBSwbB9BMbhsyE9VsMWMbgeGoz35VdXDYoB2C1QGFkx7JTaEG4FFXG3pyBkqupeooBX2z3nPu0zERZuO1Tw00ZtAW0Wtx');

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

        <div className="grid md:grid-cols-2">
          <div className="w-full h-[200px] md:h-[400px]">
            <img
              src={property?.images[0]}
              alt={property?.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Payment Info */}
          <CardContent className="bg-white px-6 py-8 flex flex-col justify-between">
            {/* Property Info */}
            <div>
              <Chip
                label={capitalizeFirstLetter(property?.propertyType)}
                sx={{
                  backgroundColor: COLORS.overlay,
                  color: COLORS.baseColor,
                  fontWeight: "bold",
                  mb: 1,
                }}
              />
              
              <p className='text-basecolor font-semibold text-title'>{property?.title}</p>

              <div className='flex flex-row items-center my-2'>
                <MdLocationOn className="text-basecolor" />
                <p className='text-blackshade text-p font-medium'>{property?.areaName}</p>
              </div>

              {/* Pricing Section */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between">
                  <p className='text-blackshade text-p_lg font-semibold'>Price:</p>
                  <p className='text-blackshade text-p font-semibold'>{property?.price} BDT</p>
                </div>
                <div className="flex justify-between">
                  <p className='text-blackshade text-p_lg font-semibold'>Advance Payment:</p>
                  <p className='text-bluemain text-p font-semibold'>{property?.advanceMoney} BDT</p>
                </div>
              </div>
            </div>

            <Elements  stripe={stripePromise}>
                <Checkoutform />
            </Elements>

            
            <p className='text-psm text-gray-500 text-center'> Secure payment powered by Stripe</p>
          </CardContent>
        </div>

        <DialogActions sx={{ px: 3, pb: 2 }}>
            <Buttons
            bgColor={'white'}
            textColor={COLORS.baseColor}
            onClickHandler={handleClose}
            title='Cancel'
            other_style={{ border: `1px solid ${COLORS.baseColor}`, width: '150px'}}
          />

        <Buttons
            bgColor={COLORS.baseColor}
            textColor={COLORS.side_yellow}
            // onClickHandler={confirmHandler}
            title={'Pay Now'}
            other_style={{ width: '150px'}}
            isLoading={loading}
          />
        </DialogActions>
      </Dialog>
  );
}
