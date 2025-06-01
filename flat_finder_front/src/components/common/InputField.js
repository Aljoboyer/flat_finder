import { COLORS } from '@/theme/colors'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { Visibility, VisibilityOff } from "@mui/icons-material";

const customStyle = {
        backgroundColor: "white",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#ccc", // default border
          },
          "&:hover fieldset": {
            borderColor: COLORS.baseColor,
          },
          "&.Mui-focused fieldset": {
            borderColor: COLORS.baseColor,
          },
        },
        "& .MuiInputLabel-root": {
          color: "gray", // default label color
        },
        "& label.Mui-focused": {
          color: COLORS.baseColor,
        },
}
      
export default function InputField({
  passwordInput = false, 
  label = 'Input',
  showPassword,
  setShowPassword,
  otherStyle
}) {
 
 
  if(passwordInput){
   return (
   <TextField
    fullWidth
    label="Password"
    variant="outlined"
    type={showPassword ? "text" : "password"}
    size="small"
    sx={{...otherStyle, ...customStyle}}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
  )
 }
 else{
   return (
  <TextField
      fullWidth
      label={label}
      variant="outlined"
      size="small"
      sx={{...customStyle}}
    />
  )
 }
}
