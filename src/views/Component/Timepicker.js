
import { Box, Input } from '@mui/joy'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import React from 'react'
//import { useStyles } from '../CommonCode/MaterialStyle'

const Timepicker = (props) => {
    //const classes = useStyles()
    const { changetextvalue, value, mintime, maxtime, disable } = props


    return (
        < LocalizationProvider dateAdapter={AdapterDateFns} >
            <TimePicker
                ampm={false}
                minTime={mintime}
                maxTime={maxtime}
                onChange={changetextvalue}
                value={value}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', }}>

                        <Input ref={inputRef} {...inputProps} style={{ width: '100%' }} disabled={true} />

                        {InputProps?.endAdornment}
                    </Box>
                )}
                // renderInput={(params) => <TextField {...params}
                //     fullWidth
                //     size="small"
                //     autoComplete="off"
                //     variant="outlined"
                // />}
                disabled={disable}
            />
        </LocalizationProvider>
    )
}

export default Timepicker


