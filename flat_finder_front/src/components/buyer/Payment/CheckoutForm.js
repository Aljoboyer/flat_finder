import React from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Buttons } from '@/components/common/Buttons/Buttons';
import { COLORS } from '@/theme/colors';

export default function CheckoutForm() {
     const stripe = useStripe();
  const elements = useElements();
  return (
    <form className="w-full">
        <div className="border border-gray-300 rounded-md p-4 bg-white">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#000',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                '::placeholder': {
                  color: '#999',
                },
              },
              invalid: {
                color: '#e5424d',
              },
            },
          }}
        />
      </div>
        
        <div className='my-4'>

        <Buttons
            bgColor={COLORS.baseColor}
            textColor={COLORS.side_yellow}
            // onClickHandler={confirmHandler}
            title={'Pay Now'}
            other_style={{ fontWeigth: 'bold'}}
            // isLoading={loading}
          />
                      <p className='text-psm text-gray-500 my-2 text-center'> Secure payment powered by Stripe</p>
        </div>
    </form>
  )
}
