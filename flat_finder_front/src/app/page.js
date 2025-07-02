'use client'

import { getLocalStorageData } from "@/utils/getLocalStorageData";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const userData = getLocalStorageData();
  const router = useRouter();

  useEffect(() => {
    if(userData?.name){
      if(userData?.role == 'seller'){
          router.push('/seller-dashboard-home')
      }else{
          router.push('/flat-finder-home')
      }
    }
    else{
      router.push('/flat-finder-home')
    }
  },[userData?.name])

  return (
    <div className="w-full h-screen bg-basecolor">
      <div className="loader"></div>
    </div>
  );
}
