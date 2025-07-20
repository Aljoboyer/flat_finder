import { COLORS } from '@/theme/colors'
import { Card } from '@mui/material'
import React from 'react'

const ServiceCard = ({icon, title, subText}) => {
    return (
        <Card sx={{backgroundColor: COLORS.overlay, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <img src={icon} height={50} width={50}/>
            <p className='text-title_sm md:text-title text-basecolor font-semibold my-2'>{title}</p>
            <p className='text-xsm md:text-p text-basecolor font-medium text-center'>{subText}</p>
        </Card>
    )
}

export default function ServiceSection() {
  return (
    <div className='bg-overlay px-4 md:px-11 py-11'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            <ServiceCard
            icon="/assets/rent_service.svg"
            title="Rent"
            subText="Customer satisfaction is our top priority. Happy clients with the best real estate options in Bangladesh are our key to success."
            />
             <ServiceCard
            icon="/assets/buy_service.svg"
            title="Buy"
            subText="Excellence in customer service is our pride. Trust us as your premier real estate service provider in Bangladesh."
            />
             <ServiceCard
            icon="/assets/sell_sevice.svg"
            title="Sell"
            subText="Stand out with our vast property selection, professional team, exclusive listings, and prime locations."
            />
         </div>   
    </div>
  )
}
