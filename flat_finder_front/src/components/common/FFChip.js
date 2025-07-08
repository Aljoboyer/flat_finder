import { COLORS } from '@/theme/colors'
import { capitalizeFirstLetter } from '@/utils/stringHelper'
import { Chip } from '@mui/material'
import React from 'react'

export default function FFChip({label}) {
  return (
    <Chip sx={label == 'active' ||  label == 'accepted' ? {backgroundColor: COLORS.successOverlay, color: COLORS.greenMain} : label == 'in_process' || label == 'pending' ? {backgroundColor: COLORS.blueOverlay, color: COLORS.bluemain} : label == 'inactive' ? {backgroundColor: COLORS.inActiveOverlay, color: COLORS.inActive} : {backgroundColor: COLORS.yellowOverlay, color: 'black'}} 
    
    label={label == 'in_process' ? 'In Progress' : label == 'inactive' ? 'In Active' : capitalizeFirstLetter(label) } />
  )
}
