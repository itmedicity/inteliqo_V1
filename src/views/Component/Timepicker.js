import { LocalizationProvider, TimePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { TextField } from '@mui/material'
import React from 'react'
import { useStyles } from '../CommonCode/MaterialStyle'

const Timepicker = (props) => {
    const classes = useStyles()
    const { changetextvalue, value, mintime, maxtime } = props

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
            />
        </LocalizationProvider>
    )
}

export default Timepicker


