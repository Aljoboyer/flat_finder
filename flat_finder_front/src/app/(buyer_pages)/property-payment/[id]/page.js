"use client"
import React, { useEffect } from 'react'
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Checkoutform from '@/components/buyer/Checkoutform/Checkoutform';
import { Card, CardContent, Typography, Button, Divider, Box, Chip } from '@mui/material';
import { FaStripeS } from 'react-icons/fa'; // Stripe logo icon (optional)
import { MdHome } from 'react-icons/md';
import { useLazyGetSinglePropertyQuery } from '@/app/redux/features/propertyApi';
import { FaBed, FaBath } from "react-icons/fa";
import { SiStripe } from "react-icons/si";
import { MdLocationOn } from "react-icons/md";

const stripePromise =  loadStripe('pk_test_51Jw2mpBSwbB9BMbhsyE9VsMWMbgeGoz35VdXDYoB2C1QGFkx7JTaEG4FFXG3pyBkqupeooBX2z3nPu0zERZuO1Tw00ZtAW0Wtx');


export default function page({params}) {
  const { id } = params;
  const [propertyTrigger, { data: property }] = useLazyGetSinglePropertyQuery();

  useEffect(() => {
    
    if(id){
      propertyTrigger({querys: `id=${id}`})
    }
  },[id])
    
  return (
    <div className="bg-overlay  p-6 rounded-t-[20px]">
        <div className="min-h-screen w-full bg-[--color-overlay] flex items-center justify-center px-4 py-10">
      <Card
        sx={{
          maxWidth: 1000,
          width: "100%",
          borderRadius: "2xl",
          boxShadow: 6,
          overflow: "hidden",
        }}
      >
        <div className="grid md:grid-cols-2">
          {/* Left: Property Image */}
          <div className="w-full h-72 md:h-[400px]">
            <img
              src={property?.data?.images[0]}
              alt={property?.data?.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Payment Info */}
          <CardContent className="bg-white px-6 py-8 flex flex-col justify-between">
            {/* Property Info */}
            <div>
              <Chip
                label={property?.data?.propertyType}
                sx={{
                  backgroundColor: "#017163",
                  color: "#fff",
                  fontWeight: "bold",
                  mb: 1,
                }}
              />
              <Typography variant="h5" className="font-bold text-[--color-basecolor]">
                {property?.data?.title}
              </Typography>
              <Typography
                variant="body2"
                className="text-gray-600 flex items-center gap-1 mt-1"
              >
                <MdLocationOn className="text-[--color-basecolor]" />
                {property?.data?.areaName}
              </Typography>

              {/* Bedrooms and Bathrooms */}
              <div className="flex gap-4 mt-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaBed />
                  <span>{property?.data?.bedrooms} Beds</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaBath />
                  <span>{property?.data?.bathrooms} Baths</span>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between">
                  <Typography className="font-medium text-gray-700">Price:</Typography>
                  <Typography className="font-semibold text-gray-900">
                    ${property?.data?.price}
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <Typography className="font-medium text-gray-700">Advance:</Typography>
                  <Typography className="font-semibold text-[--color-basecolor]">
                    ${property?.data?.advanceMoney}
                  </Typography>
                </div>
              </div>
            </div>
      <Elements  stripe={stripePromise}>
            <Checkoutform />
        </Elements>
            {/* Stripe and Button */}
            <div className="mt-10 flex flex-col items-center justify-center">
              <Button
                variant="contained"
                size="large"
                className="w-full py-3 rounded-xl font-bold bg-[--color-basecolor] hover:bg-teal-700 text-white"
              >
                Pay with Stripe <SiStripe className="ml-2" size={20} />
              </Button>
              <Typography
                variant="caption"
                className="mt-2 text-gray-500 text-center"
              >
                Secure payment powered by Stripe
              </Typography>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
    </div>
  )
}
 