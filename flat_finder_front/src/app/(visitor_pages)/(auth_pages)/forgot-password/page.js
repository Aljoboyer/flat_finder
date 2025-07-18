"use client"
import React, { useState } from "react";
import { Buttons } from "@/components/common/Buttons/Buttons";
import { COLORS } from "@/theme/colors";
import InputField from "@/components/common/Inputs/InputField";
import { useForm, Controller } from "react-hook-form";
import { authFormFields } from "@/constant/formConfigs/authFormConfigs";
import { useRouter } from 'next/navigation';
import { authErrorchecker } from "../_helper/authErrorcheck";
import { errorToast, successToast } from "@/utils/toaster/toaster";
import { useSendResetPassLinkMutation } from "@/app/redux/features/authApi";
import { ArrowBack } from "@mui/icons-material";

export default function Login() {
  const router = useRouter()
  const [sendResetPassLink, { }] = useSendResetPassLinkMutation();
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true)
    const sendLinkRes = await sendResetPassLink({email: data?.email});
    
    if(sendLinkRes?.data?.msg == 'Link Send Successfully'){
      setLoading(false)
      successToast('Successfully Link Sent')
    }
    else if(sendLinkRes?.data?.msg == "User Doesn't Exist with this email" ){
      setLoading(false)
      setError('email', { type: "custom", message: sendLinkRes?.data?.msg });
    }
    else{
      setLoading(false)
      errorToast('Failed To Sent Link')
    }
  };

  return (
    <div className="w-full max-w-md">
        <p onClick={() => router.push('/login')} className="text-bluemain font-semibold mb-7 cursor-pointer"><ArrowBack/> Back To Login</p>
        <p className="text-title font-bold text-basecolor mb-4">Enter Your Email Address</p>
        <p className="text-p font-medium text-blackshade mb-4">We will send a temporary password and a reset link to your email.</p>


        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                {
                authFormFields.slice(2, 3)?.map((fieldItem) => (
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
                            inputType={fieldItem?.inputType}
                            />
                        )}
                    />
                ))
                }
            <Buttons
            isLoading={loading}
            type='submit' title="Send Link" 
            bgColor={COLORS.side_yellow} textColor="black" 
            other_style={{fontWeight: '700', marginTop: '10px'}} />
        </form>
    </div>
  );
}
