import React from 'react'

export default function OverView({overview}) {
  return (
    <div>
       <p className='text-blackshade text-title_sm font-medium'>Description</p>
       <p className='text-gray600'>{overview}</p>
    </div>
  )
}
