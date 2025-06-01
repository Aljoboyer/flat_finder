"use client"
import React from "react";
import { Buttons } from "@/components/common/Buttons";
import { COLORS } from "@/theme/colors";
import InputField from "@/components/common/InputField";

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
 <div className="w-full max-w-md">
          <h2 className="text-title font-bold text-basecolor mb-6">Create an account</h2>

          <form className="space-y-4">
            <InputField label="Email address" />
            
            <InputField label="Password" passwordInput={true} showPassword={showPassword} setShowPassword={setShowPassword} otherStyle={{marginTop: '10px'}} />
            
              <Buttons title="Register" bgColor={COLORS.side_yellow} textColor="black" other_style={{fontWeight: '700', marginTop: '10px'}} />

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <span className="font-bold text-teal-800">Sign In</span>
            </p>

            <p className="text-xs text-center mt-4 text-gray-600 mt-21">
              Signing in will use a <a className="underline text-teal-800" href="#">cookie</a>. You can review our <a className="underline text-teal-800" href="#">privacy policy</a>.
            </p>
          </form>
        </div>
  );
}
