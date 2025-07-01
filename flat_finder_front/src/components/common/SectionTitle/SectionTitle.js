import React from 'react'

export default function SectionTitle({title}) {
  return (
    <div className='my-4'>
        <p className='text-lg_title font-medium text-blackshade'>{title}</p>
        <div className='w-32 h-2 bg-basecolor '></div>
    </div>
  )
}
