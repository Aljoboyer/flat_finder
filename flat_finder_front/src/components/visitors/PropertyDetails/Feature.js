import { labelMap, propertyFeaturesList } from '@/constant/propertyFeatures';
import React from 'react'

export const Feature = ({property}) => {
  
    const filteredFeatures = propertyFeaturesList?.reduce((acc, item) => {
        const key = labelMap[item.label];
        const value = property[key];

        const shouldInclude =
        (typeof value === 'string' && value.trim() !== '') ||
        (typeof value === 'boolean' && value === true) ||
        (typeof value === 'number' && value > 0);

        if (shouldInclude) {
        if (item.label === 'Bedrooms') {
            acc.push({
            label: `${value} Bedrooms`,
            icon: item.icon
            });
        } else if (item.label === 'Bathrooms') {
            acc.push({
            label: `${value} Bathrooms`,
            icon: item.icon
            });
        } else if (item.label === 'Balcony') {
            acc.push({
            label: `${value} Balcony`,
            icon: item.icon
            });
        } else if (item.label === 'Floor area (sqft)') {
            acc.push({
            label: `Floor area (sqft) ${value}`,
            icon: item.icon
            });
        } else if (item.label === 'Floor No') {
            acc.push({
            label: `Floor No ${value}`,
            icon: item.icon
            });
        } else {
            acc.push({
            label: item.label,
            icon: item.icon
            });
        }
    }

    return acc;
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
    {filteredFeatures?.map((item) => (
        <div key={item.label} className="flex flex-col items-center justify-center p-4 rounded-lg shadow-sm bg-white">
        {item.icon}
        <p className="text-p_lg font-medium text-blackshade mt-2 text-center">
            {item.label}
        </p>
        </div>
    ))}
    </div>

  )
}
