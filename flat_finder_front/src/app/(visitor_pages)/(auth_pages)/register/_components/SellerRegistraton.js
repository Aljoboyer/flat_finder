"use client"
import { Buttons } from '@/components/common/Buttons';
import InputField from '@/components/common/InputField'
import { authFormFields } from '@/constant/formConfigs/authFormConfigs';
import { COLORS } from '@/theme/colors';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { authErrorchecker } from '../../_helper/authErrorcheck';
import { useSignUpMutation } from '@/redux/features/authApi';

export default function SellerRegistraton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [signUpHandler, { }] = useSignUpMutation();

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true)
   
    let response = await signUpHandler({...data, 'role': 'seller'});
  
    if(response?.data?.token){
      setLoading(false)
      router.push('/flat-finder-home')
    }
    else if(response?.error?.data?.message){
      setLoading(false);

      const checkedData = authErrorchecker(response);

      setError(checkedData?.field, {...checkedData?.typeObj});
    }
    else{
      setLoading(false)
      errorToast()
    }
    
  };
    console.log("Form errors:", errors);

  return (
    <div className='mt-4'>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {
              authFormFields?.map((fieldItem) => (
                <Controller
                    key={fieldItem?.field_id}
                    name={fieldItem?.field_id}
                    control={control}
                    defaultValue=""
                    rules={{
                      ...fieldItem?.required,
                    }}
                    
                    render={({ field }) => (
                        <InputField
                        otherStyle={{marginTop: '14px'}}
                        label={fieldItem?.label} 
                        field={field}
                        field_id={fieldItem?.field_id}
                        errors={errors}
                        placeholder={fieldItem?.placeholder}
                        inputType={fieldItem?.inputType}
                        />
                    )}
                  />
              ))
            }

          <Buttons isLoading={loading} type='submit' title="Register"
           bgColor={COLORS.side_yellow} 
           textColor="black" other_style={{fontWeight: '700', marginTop: '10px'}} />

      </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <span onClick={() => router.push('/login')} className="font-bold text-teal-800 cursor-pointer">Sign In</span>
          </p>
    </div>
  )
}
