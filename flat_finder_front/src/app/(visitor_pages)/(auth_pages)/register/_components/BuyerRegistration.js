"use client"
import InputField from '@/components/common/InputField'
import React from 'react'

export default function BuyerRegistraton() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div>
        <InputField label="Email address" />
        <InputField label="Password" 
        passwordInput={true} 
        showPassword={showPassword} 
        setShowPassword={setShowPassword} otherStyle={{marginTop: '10px'}} />
    </div>
  )
}
