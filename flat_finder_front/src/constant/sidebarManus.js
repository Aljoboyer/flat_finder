import BusinessCenterSharpIcon from '@mui/icons-material/BusinessCenterSharp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import React from 'react';
import TagRoundedIcon from '@mui/icons-material/TagRounded';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { MdOutlineForwardToInbox } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

export const SellerSideManuList = [
    { title: 'Dashboard', link: '/seller-dashboard-home', icon: <DashboardIcon fontSize='20px'/>},
    { title: 'Properties', link: '/seller-properties', icon: <ApartmentIcon fontSize='20px'/>},
    { title: 'Rent/Sell Request', link: '/seller-rent-requests', icon: <TagRoundedIcon fontSize='20px'/>},
    { title: 'Rent/Sell Hisory', link: '/seller-rent-sell-history', icon: <BusinessCenterSharpIcon fontSize='20px'/> },
    { title: 'Inbox', link: '/seller-inbox', icon: <MdOutlineForwardToInbox fontSize='20px'/>},
    { title: 'Profile', link: '/seller-profile', icon: <CgProfile fontSize='20px'/>},
  ];

export const BuyerSideManuList = [
    { title: 'Dashboard', link: '/buyer-dashboard-home', icon: <DashboardIcon fontSize='20px'/>},
    { title: 'Your Requests', link: '/buyer-rent-requests', icon: <ApartmentIcon fontSize='20px'/>},
    { title: 'Rent/Buy Hisory', link: '/buyer-history', icon: <BusinessCenterSharpIcon fontSize='20px'/> },
    { title: 'Inbox', link: '/buyer-inbox', icon: <MdOutlineForwardToInbox fontSize='20px'/>},
    { title: 'Profile', link: '/buyer-profile', icon: <CgProfile fontSize='20px'/>},
  ];
