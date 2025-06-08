import { COLORS } from '@/theme/colors'
import { IconButton, InputAdornment, InputBase, Paper, TextField } from '@mui/material'
import React from 'react'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import { AutoCompletes } from './AutoComplete';

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
  inputType = 'textfield', 
  label = 'Input',
  otherStyle,
  field,
  field_id,
  errors,
  placeholder,
  options,
  textFieldLabel
}) {
   const [showPassword, setShowPassword] = React.useState(false);
 
 
  if(inputType == 'password'){
   return (
      <>
        <TextField
        {...field}
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
          { errors[field_id] && <p className='text-psm text-red-500'>{errors[field_id].message}</p>}
      </>
  )
 }
 else if(inputType == 'search'){
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: {xs: '100%', md: '36%'}, backgroundColor: COLORS.grey50 , ...otherStyle}}
    >
      <InputBase
        sx={{ ml: 1, flex: 1,  }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '10px', backgroundColor: 'white' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
 }
 else if (inputType == 'autocomplete'){
  return(
    <AutoCompletes otherStyle={otherStyle} options={options} textFieldLabel={textFieldLabel}/>
  )
 }
 else{
   return (
    <>
    <TextField
      {...field}
      placeholder={placeholder}
      fullWidth
      label={label}
      variant="outlined"
      size="small"
      sx={{...customStyle, ...otherStyle}}
    />
    { errors[field_id] && <p className='text-psm text-red-500'>{errors[field_id].message}</p>}
    </>
  )
 }
}
