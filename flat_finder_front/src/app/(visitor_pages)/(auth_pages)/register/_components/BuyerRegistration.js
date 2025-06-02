"use client"
import { Buttons } from '@/components/common/Buttons';
import InputField from '@/components/common/InputField'
import { registerFormFields } from '@/constant/formConfigs/registerFormConfigs';
import { COLORS } from '@/theme/colors';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm, Controller } from "react-hook-form";

export default function BuyerRegistraton() {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter()

  const {
    handleSubmit,
    control,
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
              registerFormFields?.map((fieldItem) => (
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

        
        <InputField label="Password" 
        passwordInput={true} 
        showPassword={showPassword} 
        setShowPassword={setShowPassword} otherStyle={{marginTop: '10px'}} />
    </div>
  )
}
