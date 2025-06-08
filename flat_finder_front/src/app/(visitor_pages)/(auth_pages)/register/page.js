"use client"
import React, { useState } from "react";
import CommonTabs from "@/components/common/CommonTabs/CommonTabs";
import { RegisterTabData } from "@/constant/tabsdata";

export default function Register() {
   const [value, setValue] = useState(0);
  
    const handleTabChange = (event, newValue) => {
      setValue(newValue);
    };

  return (
 <div className="w-full max-w-md">
          <h2 className="text-title font-bold text-basecolor mb-4">Create an account</h2>

          <div className="space-y-4">
            <CommonTabs 
            value={value}
            handleTabChange={handleTabChange}
            tabsData={RegisterTabData} tabWidth={'50%'} isPanelShow={true}/>

            <p className="text-xs text-center mt-4 text-gray-600 mt-4">
              Signing in will use a <a className="underline text-teal-800" href="#">cookie</a>. You can review our <a className="underline text-teal-800" href="#">privacy policy</a>.
            </p>
          </div>
        </div>
  );
}
