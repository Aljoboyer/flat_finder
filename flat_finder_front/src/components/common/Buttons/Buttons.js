"use client"
import { COLORS } from '@/theme/colors'
import { Button } from '@mui/material'
import React from 'react'

export const Buttons = ({
    onClickHandler, title = '', 
    bgColor = COLORS.overlay, textColor = COLORS.baseColor,
    variant = 'contained',
    icon = '',
    other_style = {},
    type = '',
    isLoading,
    component= '',
    disabled = false
}) => {

  return (
    <Button
    disabled={disabled}
    component={component}
     loading={isLoading}
     type={type}
     onClick={onClickHandler} 
     variant={variant} 
     fullWidth sx={{...other_style , backgroundColor: bgColor, color: textColor, }}>
      {icon && icon}
        {title}
    </Button>
  )
}
