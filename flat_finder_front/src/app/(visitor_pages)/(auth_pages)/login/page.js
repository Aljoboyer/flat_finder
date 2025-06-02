"use client"
import React from "react";
import { Buttons } from "@/components/common/Buttons";
import { COLORS } from "@/theme/colors";
import InputField from "@/components/common/InputField";
import { useForm, Controller } from "react-hook-form";
import { authFormFields } from "@/constant/formConfigs/authFormConfigs";
import { useRouter } from 'next/navigation';

export default function Login() {
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

          <Buttons type='submit' title="Login" bgColor={COLORS.side_yellow} textColor="black" other_style={{fontWeight: '700', marginTop: '10px'}} />
      </form>

            <p className="text-sm text-center mt-4">
              New to My FlatFinder?{" "}
              <span className="font-bold text-teal-800 cursor-pointer">Create Account</span>
            </p>

            <p className="text-xs text-center mt-4 text-gray-600 mt-21">
              Signing in will use a <a className="underline text-teal-800" href="#">cookie</a>. You can review our <a className="underline text-teal-800" href="#">privacy policy</a>.
            </p>
        </div>
  );
}
