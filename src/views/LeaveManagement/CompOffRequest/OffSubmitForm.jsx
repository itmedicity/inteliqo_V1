import { Paper } from '@mui/material'
import React, { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, CssVarsProvider, Input } from '@mui/joy';
import moment from 'moment';

const OffSubmitForm = () => {
    const [fromDate, setFromDate] = useState(moment(new Date()))
    return (
        <Paper variant='oulined' sx={{ display: 'flex' }}>
            <Box sx={{ flex: 1, px: 0.5, mt: 0.5 }} >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        views={['year', 'month']}
                        // minDate={subMonths(new Date(), 1)}
                        // maxDate={addMonths(new Date(), 1)}
                        value={fromDate}
                        size="small"
                        onChange={(newValue) => {
                            setFromDate(newValue);
                        }}
                        renderInput={({ inputRef, inputProps, InputProps }) => (
                            <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                <CssVarsProvider>
                                    <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
                                </CssVarsProvider>
                                {InputProps?.endAdornment}
                            </Box>
                        )}
                    />
                </LocalizationProvider>
            </Box>
        </Paper>
    )
}

export default OffSubmitForm