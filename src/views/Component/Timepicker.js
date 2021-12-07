import { LocalizationProvider, TimePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { useStyles } from '../CommonCode/MaterialStyle'

const Timepicker = (props) => {
    const classes = useStyles()
    const [value, setValue] = useState(new Date());
    const handleChange = (newValue) => {
        setValue(newValue);
    }

    return (
        < LocalizationProvider dateAdapter={AdapterDateFns} >
            <TimePicker
                onChange={(newValue) => handleChange(newValue)}
                value={value}
                InputProps={{
                    className: classes.customInputFeild
                }}
                renderInput={(params) => <TextField {...params}
                    fullWidth
                    size="small"
                    autoComplete="off"
                    variant="outlined"
                />}
            />
        </LocalizationProvider>
    )
}

export default Timepicker


