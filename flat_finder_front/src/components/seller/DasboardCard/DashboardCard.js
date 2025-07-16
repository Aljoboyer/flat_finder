import React from 'react'
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Card, CardContent, Box } from "@mui/material";

export default function DashboardCard({
    title, 
    icon,
    count,
    iconBg,
    btnText
}) {
  return (
    <Card  className="shadow-sm rounded-xl">
        <CardContent className="flex flex-col gap-3">
            <Box className="flex items-center gap-3">
            <div
                className={`rounded-full p-3 ${iconBg} flex items-center justify-center`}
            >
                {icon}
            </div>
            <p className="text-p text-blackshade font-medium">{title}</p>
            </Box>

            <p className={`text-title md:text-lg_title font-semibold text-gray-400`}>{count}</p>

            <Box className={`flex justify-end items-center ${btnText} font-medium cursor-pointer hover:underline`}>
            <span>Go to list</span>
            <ArrowForwardIosIcon className="ml-1" style={{ fontSize: 14 }} />
            </Box>
        </CardContent>
    </Card>
  )
}
