import BusinessCenterSharpIcon from '@mui/icons-material/BusinessCenterSharp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import React from 'react';
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';
import TagRoundedIcon from '@mui/icons-material/TagRounded';

export const sideManuList = [
    { title: 'Dashboard', link: '/DashboardHome', icon: () => React.createElement(DashboardIcon, { sx: { fontSize: '16px' } }) }, 
    { title: 'Asset', link: '/asset', icon: () => React.createElement(BusinessCenterSharpIcon, { sx: { fontSize: '16px' } }) },
    { title: 'Find', link: '', icon: () => React.createElement(FindInPageRoundedIcon, { sx: { fontSize: '16px' } }) },
    { title: 'Tags', link: '', icon: () => React.createElement(TagRoundedIcon, { sx: { fontSize: '16px' } }) },
  ];
