import { Autocomplete, TextField } from '@mui/material'
import React from 'react'

export const AutoCompletes = ({
    options = [],
    textFieldLabel = 'Label'
}) => {
  return (
    <Autocomplete
        disablePortal
        options={options}
        renderInput={(params) =>
            <TextField 
            sx={{
                    '& .MuiInputBase-root': {
                    height: '45px',
                    minHeight: '45px',
                    },
                    '& input': {
                    padding: '0 8px',
                    fontSize: '0.875rem',
                    },
                    '& label': {
                    fontSize: '0.75rem',
                    },
                }}
            {...params} label={textFieldLabel} />
        }
        className="w-full md:w-1/2"
        />
  )
}
