"use client"
import React, { useState } from "react";
import { Buttons } from "@/components/common/Buttons/Buttons";
import { COLORS } from "@/theme/colors";
import InputField from "@/components/common/Inputs/InputField";
import { useForm, Controller } from "react-hook-form";
import { authFormFields } from "@/constant/formConfigs/authFormConfigs";
import { useRouter } from 'next/navigation';
import { useLogInMutation } from "@/app/redux/features/authApi";

export default function Login() {
  const router = useRouter()
  const [useLoginHandler, { }] = useLogInMutation();
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    control,
    setError,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true)
    
  };

const newPassword = watch('newPassword');

  return (
    <div className="w-full max-w-md">

        <p className="text-title font-bold text-basecolor mb-4">Reset Password</p>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Controller
                      name="temp_password"
                      control={control}
                      rules={{
                          required: 'Enter Correct Temprorary password',
                      }}
                      render={({ field }) => (
                          <InputField
                          otherStyle={{marginTop: '14px'}}
                          label="Temporary Password" 
                          field={field}
                          field_id="temp_password"
                          errors={errors}
                          placeholder="Enter Temporary Password"
                          inputType="textfield"
                          />
                      )}
                  />
                  <Controller
                      name="newPassword"
                      control={control}
                      rules={{
                          required: 'Enter New password',
                      }}
                      render={({ field }) => (
                          <InputField
                          otherStyle={{marginTop: '14px'}}
                          label="New Password" 
                          field={field}
                          field_id="newPassword"
                          errors={errors}
                          placeholder="Enter New Password"
                          inputType="password"
                          />
                      )}
                  />
                   <Controller
                      name="newPassword2"
                      control={control}
                      rules={{
                          validate: (value) => value == newPassword || 'Re-entered password does not match the new password.'
                      }}
                      render={({ field }) => (
                          <InputField
                          otherStyle={{marginTop: '14px'}}
                          label="Re-Enter New Password" 
                          field={field}
                          field_id="newPassword2"
                          errors={errors}
                          placeholder="Re-Enter New Password"
                          inputType="password"
                          />
                      )}
                  />
            <Buttons
            isLoading={loading}
            type='submit' title="Submit" 
            bgColor={COLORS.side_yellow} textColor="black" 
            other_style={{fontWeight: '700', marginTop: '10px'}} />
        </form>
    </div>
  );
}
