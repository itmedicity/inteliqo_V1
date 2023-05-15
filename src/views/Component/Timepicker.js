
import { TextField } from '@mui/material'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import React from 'react'
import { useStyles } from '../CommonCode/MaterialStyle'

const Timepicker = (props) => {
    const classes = useStyles()
    const { changetextvalue, value, mintime, maxtime, disable } = props


    return (
        < LocalizationProvider dateAdapter={AdapterDateFns} >
            <TimePicker
                ampm={false}
                minTime={mintime}
                maxTime={maxtime}
                onChange={changetextvalue}
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
                disabled={disable}
            />
        </LocalizationProvider>
    )
}

export default Timepicker


