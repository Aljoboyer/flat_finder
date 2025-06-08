import BusinessCenterSharpIcon from '@mui/icons-material/BusinessCenterSharp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import React from 'react';
import TagRoundedIcon from '@mui/icons-material/TagRounded';
import ApartmentIcon from '@mui/icons-material/Apartment';

export const sideManuList = [
    { title: 'Dashboard', link: '/seller-dashboard-home', icon: <DashboardIcon fontSize='20px'/>},
    { title: 'Properties', link: '/seller-properties', icon: <ApartmentIcon fontSize='20px'/>},
    { title: 'Rent Request', link: '', icon: <TagRoundedIcon fontSize='20px'/>},
    { title: 'Rental Hisory', link: '', icon: <BusinessCenterSharpIcon fontSize='20px'/> },
  ];
