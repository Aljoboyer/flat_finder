"use client"
import React from "react";
import { Buttons } from "@/components/common/Buttons";
import { COLORS } from "@/theme/colors";
import CommonTabs from "@/components/common/CommonTabs/CommonTabs";
import { RegisterTabData } from "@/constant/tabsdata";

export default function Register() {

  return (
 <div className="w-full max-w-md">
          <h2 className="text-title font-bold text-basecolor mb-6">Create an account</h2>

          <div className="space-y-4">
            <CommonTabs tabsData={RegisterTabData} tabWidth={'50%'} isPanelShow={true}/>

            <p className="text-xs text-center mt-4 text-gray-600 mt-21">
              Signing in will use a <a className="underline text-teal-800" href="#">cookie</a>. You can review our <a className="underline text-teal-800" href="#">privacy policy</a>.
            </p>
          </div>
        </div>
  );
}
