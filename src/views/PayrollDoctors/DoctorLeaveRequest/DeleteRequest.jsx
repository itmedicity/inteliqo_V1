import React, { memo, useMemo, useState } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import { Box, Button, Input, Table, Textarea, Tooltip, Typography } from '@mui/joy'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { addDays, differenceInCalendarDays, eachDayOfInterval, endOfMonth, format, isValid, startOfMonth } from 'date-fns'

const DeleteRequest = () => {
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  return (
    <CustomLayout title="Delete Leave Request" displayClose={true}>
      <Box sx={{ display: 'flex', flexDirection: 'row', p: 0.5 }}>
        <Box sx={{ display: 'flex', px: 0.5, alignItems: 'center' }}>
          <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2}>
            From Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={['day']}
              inputFormat="dd-MM-yyyy"
              value={fromDate}
              size="small"
              onChange={(newValue) => setFromDate(newValue)}
              renderInput={({ inputRef, inputProps, InputProps }) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Input
                    ref={inputRef}
                    {...inputProps}
                    style={{ width: '80%' }}
                    size="sm"
                    disabled={true}
                    color="primary"
                    variant="outlined"
                  />
                  {InputProps?.endAdornment}
                </Box>
              )}
            />
          </LocalizationProvider>
        </Box>

        <Box sx={{ display: 'flex', px: 0.5, alignItems: 'center' }}>
          <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2}>
            To Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={['day']}
              inputFormat="dd-MM-yyyy"
              minDate={fromDate}
              maxDate={endOfMonth(new Date(fromDate))}
              value={toDate}
              size="small"
              onChange={(newValue) => setToDate(newValue)}
              renderInput={({ inputRef, inputProps, InputProps }) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Input
                    ref={inputRef}
                    {...inputProps}
                    style={{ width: '80%' }}
                    size="sm"
                    disabled={true}
                    color="primary"
                  />
                  {InputProps?.endAdornment}
                </Box>
              )}
            />
          </LocalizationProvider>
        </Box>
      </Box>
    </CustomLayout>
  )
}

export default DeleteRequest