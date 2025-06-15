import { Autocomplete, TextField } from '@mui/material'
import React from 'react'
import { customStyle, selectCustomstyle } from './InputField';

export const AutoCompletes = ({
    options = [],
    label = 'Label',
    otherStyle,
    onChangeHandler,
    field_id
}) => {
  return (
    <Autocomplete
        disablePortal
        options={options}
        getOptionLabel={(option) => option.label}
        onChange={(event, newValue) => {
            onChangeHandler(field_id, newValue?.value)
        }}
    
        sx={{...otherStyle, width: '100%'}}
        renderInput={(params) =>
            <TextField
            sx={{
                    width: '100%',
                    ...customStyle,
                    ...selectCustomstyle
                }}
            {...params} label={label} />
        }
        className="w-full "
        />
  )
}
