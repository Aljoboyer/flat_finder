"use client"

import Navbar from "@/components/common/Navbars";


export default function VisitorLayout({ children }) {
  return (
    <div className="w-full">
        <Navbar/>
        {children}
    </div>
  );
}
