import { LocalizationProvider, TimePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { useStyles } from '../CommonCode/MaterialStyle'

const MinutePicker = (props) => {
    const classes = useStyles()
    const [minutes, setMinutes] = useState(new Date());


    return (
        < LocalizationProvider dateAdapter={AdapterDateFns} >

            <TimePicker
                ampmInClock
                views={['minutes']}
                inputFormat="mm"
                mask="__"
                value={minutes}
                onChange={(newValue) => {
                    setMinutes(newValue);
                }}
                InputProps={{
                    className: classes.customInputFeild
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    )
}

export default MinutePicker


