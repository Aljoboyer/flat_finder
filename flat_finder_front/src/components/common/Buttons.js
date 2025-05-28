"use client"
import { COLORS } from '@/theme/colors'
import { Button } from '@mui/material'
import React from 'react'

export const Buttons = ({
    onClickHandler, title = 'Test', 
    bgColor = COLORS.overlay, textColor = COLORS.baseColor,
    variant = 'contained'
}) => {
  return (
    <Button onClick={onClickHandler} variant={variant} fullWidth sx={{backgroundColor: bgColor, color: textColor}}>
        {title}
    </Button>
  )
}
