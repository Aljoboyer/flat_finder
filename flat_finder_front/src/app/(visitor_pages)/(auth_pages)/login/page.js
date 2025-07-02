"use client"
import React, { useState } from "react";
import { Buttons } from "@/components/common/Buttons/Buttons";
import { COLORS } from "@/theme/colors";
import InputField from "@/components/common/Inputs/InputField";
import { useForm, Controller } from "react-hook-form";
import { authFormFields } from "@/constant/formConfigs/authFormConfigs";
import { useRouter } from 'next/navigation';
import { authErrorchecker } from "../_helper/authErrorcheck";
import { errorToast } from "@/utils/toaster/toaster";
import { useLogInMutation } from "@/app/redux/features/authApi";

export default function Login() {
  const router = useRouter()
  const [useLoginHandler, { }] = useLogInMutation();
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true)
    let response = await useLoginHandler(data);
    
    if(response?.data?.token){
   
      localStorage.setItem('ff_user', JSON.stringify(response.data))
      setLoading(false)
      if(response?.data?.result?.role == 'buyer'){
          router.push('/flat-finder-home')
      }
      else{
        router.push('/seller-dashboard-home')
      }
      
    }
    else if(response?.error?.data?.message){
        setLoading(false)
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
 <div className="w-full max-w-md">
          <h2 className="text-title font-bold text-basecolor mb-4">Sign in</h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            {
              authFormFields.slice(2, 4)?.map((fieldItem) => (
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

            <div className="flex justify-between items-center">
              {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Stay signed in" /> */}
              <a href="#" className="text-basecolor font-semibold text-psm mt-2">Forgot Password?</a>
            </div>

          <Buttons
           isLoading={loading}
           type='submit' title="Login" 
           bgColor={COLORS.side_yellow} textColor="black" 
           other_style={{fontWeight: '700', marginTop: '10px'}} />
      </form>

            <p className="text-sm text-center mt-4">
              New to My FlatFinder?{" "}
              <span onClick={() => router.push('/register')} className="font-bold text-teal-800 cursor-pointer">Create Account</span>
            </p>

            <p className="text-xs text-center mt-4 text-gray-600 mt-21">
              Signing in will use a <a className="underline text-teal-800" href="#">cookie</a>. You can review our <a className="underline text-teal-800" href="#">privacy policy</a>.
            </p>
        </div>
  );
}
