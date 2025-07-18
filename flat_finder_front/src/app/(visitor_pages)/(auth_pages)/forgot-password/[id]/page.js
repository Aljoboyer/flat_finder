"use client"
import React, { useState } from "react";
import { Buttons } from "@/components/common/Buttons/Buttons";
import { COLORS } from "@/theme/colors";
import InputField from "@/components/common/Inputs/InputField";
import { useForm, Controller } from "react-hook-form";
import { usePathname, useRouter } from 'next/navigation';
import { useResetPasswordMutation } from "@/app/redux/features/authApi";
import { errorToast, successToast } from "@/utils/toaster/toaster";

export default function page() {
  const router = useRouter()
  const [resetPassword, { }] = useResetPasswordMutation();
  const [loading, setLoading] = useState(false)
  const [isResetPass, setIsResetPass] = useState(false)
  const pathname = usePathname();

  const {
    handleSubmit,
    control,
    setError,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
        setLoading(true)
        const reqBody = {
            temp_password: data?.temp_password,
            newPassword: data?.newPassword,
            email: pathname?.split('/')[2]
        }
        const resetRes = await resetPassword(reqBody);
        if(resetRes?.data?.msg == "Password Reset Successfully"){
            successToast('Password Reset Successfully')
            setLoading(false)
            setIsResetPass(true)
        }
        else if(resetRes?.data?.msg == "Temporary password Incorrect"){
            setLoading(false)
            setError('temp_password', { type: "custom", message: resetRes?.data?.msg });
        }
        else{
            setLoading(false)
            errorToast('Password Reset Failed! Try Again')
        }
  };

  const newPassword = watch('newPassword');


  return (
    <div className="w-full max-w-md">

        {
            isResetPass ? <>
                <div className="p-4 bg-blue-50 border border-blue-300 rounded-md shadow-md">
                    <p className="text-greenMain font-bold">
                        Your password has been reset successfully.<span className="text-blackshade font-medium ">
                        You can now log in with your new password.
                    </span>
                    </p>
                </div>
                <Buttons
                onClickHandler={() => router.push('/login')}
                title="Go to Login" 
                bgColor={COLORS.baseColor} textColor={COLORS.side_yellow} 
                other_style={{fontWeight: '500', marginTop: '10px'}} />
            </> : <>
            
            
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
            </>
        }
    </div>
  );
}
