"use client"

export default function AuthLayout({ children }) {
  return (
     <div className="h-screen flex flex-col md:flex-row">
      {/* Left Section (Text + Chair) - Hidden on small screens */}
      <div className="hidden md:flex md:w-1/2 text-white flex-col justify-center items-start px-10 auth_info_box">
        <img src="/assets/website_logo.png" alt="Foxtons Logo" className="mb-6 h-38" />
        <div className="text-side_yellow text-xl_title font-bold leading-tight mb-4">
          <p>INSIGHT.</p>
          <p>INFORMATION.</p>
          <p>CONTROL.</p>
          <p>WHEREVER</p>
          <p>YOU ARE.</p>
        </div>
        <p className="text-white text-title font-medium mt-4 max-w-md">
          Stay on top of what's happening with your property.
        </p>
      </div>

      {/* Right Section (Form) */}
      <div className="flex h-full w-full md:w-1/2 bg-overlay justify-center items-center p-8">
            {children}
      </div>
    </div>
  );
}
