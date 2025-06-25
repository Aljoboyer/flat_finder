import { Drawer } from '@mui/material'
import React from 'react'

export default function FFDrawer({
    open,
    toggleDrawer,
    children
}) {
    
  return (
    <Drawer sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }} open={open} onClose={() => toggleDrawer(false)}>
        {children}
    </Drawer>
  )
}
