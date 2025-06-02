"use client"
import { Buttons } from '@/components/common/Buttons';
import InputField from '@/components/common/InputField'
import { registerFormFields } from '@/constant/formConfigs/registerFormConfigs';
import { COLORS } from '@/theme/colors';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm, Controller } from "react-hook-form";

export default function BuyerRegistraton() {
  const router = useRouter()

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    
  };
    console.log("Form errors:", errors);

  return (
    <div className='mt-4'>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {
              registerFormFields.slice(0, 3)?.map((fieldItem) => (
                <Controller
                    key={fieldItem?.field_id}
                    name={fieldItem?.field_id}
                    control={control}
                    defaultValue=""
                    rules={{
                      ...fieldItem?.required
                    }}
                    render={({ field }) => (
                        <InputField
                        otherStyle={{marginTop: '14px'}}
                        label={fieldItem?.label} 
                        field={field}
                        field_id={fieldItem?.field_id}
                        errors={errors}
                        placeholder={fieldItem?.placeholder}
                        />
                    )}
                  />
              ))
            }

          <Buttons type='submit' title="Register" bgColor={COLORS.side_yellow} textColor="black" other_style={{fontWeight: '700', marginTop: '10px'}} />
      </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <span onClick={() => router.push('/login')} className="font-bold text-teal-800 cursor-pointer">Sign In</span>
          </p>
    </div>
  )
}
