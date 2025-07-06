"use client"
import React from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

export default function Checkoutform() {
  return (
    <div>
        <CardElement
            options={{
            style: {
                base: {
                fontSize: '20px',
                color: 'black',
                '::placeholder': {
                    color: 'black',
                },
                },
                invalid: {
                color: '#9e2146',
                },
            },
            }}
        />
    </div>
  )
}
