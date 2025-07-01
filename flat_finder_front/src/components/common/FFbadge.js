import { Badge } from '@mui/material'
import React from 'react'

export default function FFbadge({
    count,
    icon
}) {
  return (
   <Badge badgeContent={count} color="primary">
       {icon}
    </Badge>
  )
}
