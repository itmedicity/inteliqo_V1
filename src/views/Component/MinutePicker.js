import { LocalizationProvider, TimePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { TextField } from '@mui/material'
import React from 'react'
import { useStyles } from '../CommonCode/MaterialStyle'

const MinutePicker = (props) => {
    const { value, changeMinuteValue } = props;
    const classes = useStyles()
    return (
        < LocalizationProvider dateAdapter={AdapterDateFns} >

            <TimePicker
                ampmInClock
                views={['minutes']}
                inputFormat="mm"
                mask="__"
                value={value}
                onChange={changeMinuteValue}
                InputProps={{
                    className: classes.customInputFeild
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    )
}

export default MinutePicker


