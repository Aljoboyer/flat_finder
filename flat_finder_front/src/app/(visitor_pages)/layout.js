"use client"

import { Footers } from "@/components/common/Footers";
import Navbar from "@/components/common/Navbars";


export default function VisitorLayout({ children }) {
  return (
    <div className="w-full">
        <Navbar/>
        {children}
        <Footers/>
    </div>
  );
}
