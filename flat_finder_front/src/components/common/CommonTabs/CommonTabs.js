import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import {useTheme } from '@mui/material/styles';
import { COLORS } from '@/theme/colors';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{  width: '100%' }}>
            {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


export default function CommonTabs({tabsData, tabWidth = 'auto'}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const theme = useTheme();

  return (
    <Box>
        <Tabs sx={{width: '100%'}} 
        value={value} onChange={handleChange} 
        TabIndicatorProps={{ style: { backgroundColor: COLORS.baseColor } }}
        aria-label="icon label tabs example">
             {tabsData.map((tab, index) => (
                <Tab
                    key={index}
                    icon={tab.icon}
                    label={tab.label}
                    {...a11yProps(index)}
                     sx={{
                      width: tabWidth,
                    color: value === index ? COLORS.baseColor : 'gray', // text/icon color
                    '&.Mui-selected': {
                      color: COLORS.baseColor,
                    },
                  }}
                />
                ))}
        </Tabs>

        {tabsData.map((tab, index) => (
            <TabPanel
            key={index}
            value={value}
            index={index}
            dir={theme.direction}
            >
            {tab.content}
            </TabPanel>
        ))}
    </Box>
  );
}
