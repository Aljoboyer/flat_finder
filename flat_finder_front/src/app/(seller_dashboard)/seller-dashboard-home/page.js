"use client"
import HomeIcon from "@mui/icons-material/Home";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import FFPageHeader from "@/components/common/FFPageHeader";
import DashboardCard from "@/components/seller/DasboardCard/DashboardCard";
import TagRoundedIcon from '@mui/icons-material/TagRounded';
import GroupIcon from "@mui/icons-material/Group";
import SellIcon from "@mui/icons-material/Sell";
import { useLazyGetDashboardDataCountQuery } from "@/app/redux/features/profileApi";
import { useEffect } from "react";
import { getLocalStorageData } from "@/utils/getLocalStorageData";

export default function page() {
  const [dashboardDataCount, { data: dataCount, isFetching}] = useLazyGetDashboardDataCountQuery();
  const userData = getLocalStorageData();

  useEffect(() => {
    dashboardDataCount({ querys: `seller=${userData?._id}` })
  },[userData?.role])

  console.log('dataCount', dataCount)

  return (
  <div className="bg-overlay h-screen p-6 rounded-t-[20px]">
      <FFPageHeader backBtnShow={false} pageTitle={'Dashboard'} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard 
          title="All Properties" count={dataCount?.totalProperty} 
          iconBg="bg-green-100"
          btnText="text-basecolor"
          icon={<HomeIcon className="text-basecolor" />}
          />

          <DashboardCard 
          title="Total Sold/Rented" count={dataCount?.totalSold} 
          iconBg="bg-rose-100"
          btnText="text-rose-600"
          icon={<SellIcon className="text-rose-600" />}
          />

          <DashboardCard 
          title="Property Requests" count={dataCount?.totalRequest} 
          iconBg="bg-blue-100"
          btnText="text-blue-600"
          icon={<TagRoundedIcon className="text-blue-600" />}
          />
          
          <DashboardCard 
          title="Pending Payments" count={dataCount?.totalPendingPayment} 
          iconBg="bg-yellowOverlay"
          btnText="text-yellow-600"
          icon={<HourglassEmptyIcon className="text-yellow-600" />}
          />

          <DashboardCard 
          title="Total Followers" count={dataCount?.totalFollwers} 
          iconBg="bg-purple-100"
          btnText="text-purple-600"
          icon={<GroupIcon className="text-purple-600" />}
          />
   
      </div>
    </div>
  );
}
