import { COLORS } from '@/theme/colors'
import { Chip } from '@mui/material'
import React from 'react'

export default function FFChip({label}) {
  return (
    <Chip sx={label == 'active' ? {backgroundColor: COLORS.successOverlay, color: COLORS.greenMain} : label == 'in_process' ? {backgroundColor: COLORS.blueOverlay, color: COLORS.bluemain} : {backgroundColor: COLORS.yellowOverlay, color: COLORS.side_yellow}} label={label == 'in_process' ? 'In Progress' : label == 'active' ? 'Active' : ''} />
  )
}
