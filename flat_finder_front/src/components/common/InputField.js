import { COLORS } from '@/theme/colors'
import { FormControl, IconButton, InputAdornment, InputBase, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material'
import React from 'react'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import { AutoCompletes } from './AutoComplete';

export const customStyle = {
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

export const selectCustomstyle = {
  '& .MuiInputBase-root': {
    height: '45px',
    minHeight: '45px',
    },
    '& input': {
    padding: '0 8px',
    fontSize: '0.875rem',
    },
    '& label': {
    fontSize: '15px',
    }
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
  onChangeHandler
}) {
   const [showPassword, setShowPassword] = React.useState(false);
 
 
  if(inputType == 'password'){
   return (
      <div className='w-full'>
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
      </div>
  )
 }
 else if(inputType == 'search'){
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: {xs: '100%', md: '36%'} , ...otherStyle}}
      elevation={1}
      variant="outlined"
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
    <div>
        <AutoCompletes field_id={field_id} onChangeHandler={onChangeHandler}  field={field} otherStyle={otherStyle} options={options} label={label}/>
        { errors && <> {errors[field_id] && <p className='text-psm text-red-500'>{errors[field_id].message}</p>}</>}
    </div>
  )
 }
 else if(inputType == 'number'){
return (
    <div className='w-full'>
        <TextField
      {...field}
      type="number"
      placeholder={placeholder}
      fullWidth
      label={label}
      variant="outlined"
      size="small"
      sx={{ ...customStyle, ...otherStyle,  }}
 
    />
   { errors[field_id] && <p className='text-psm text-red-500'>{errors[field_id].message}</p>}
  </div>
)
 }
 else if (inputType == 'select'){
  return (
  <FormControl  sx={{...customStyle, ...otherStyle, ...selectCustomstyle}} fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={label}
        value={field.value} // <- needed for react-hook-form field.onChange
        onChange={(e) => onChangeHandler(field_id, e.target.value)} 
      >
        {
          options?.map((item) => (
              <MenuItem value={item?.value}>{item?.label}</MenuItem>
          ))
        }
      
      </Select>
      { errors[field_id] && <p className='text-psm text-red-500'>{errors[field_id].message}</p>}
</FormControl>
  )
 }
 else{
   return (
    <div className='w-full'>
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
    </div>
  )
 }
}
