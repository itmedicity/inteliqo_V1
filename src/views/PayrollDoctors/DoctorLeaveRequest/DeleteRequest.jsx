import React, { memo, useMemo, useState } from 'react';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import { Box, Button, Input, Table, Textarea, Tooltip, Typography } from '@mui/joy';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addDays, differenceInCalendarDays, eachDayOfInterval, endOfMonth, format, isValid, startOfMonth } from 'date-fns';
import { IconButton, Paper } from '@mui/material';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const DeleteRequest = () => {
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())

  const [columnDef] = useState([
    // { headerName: 'Slno', field: 'slno', filter: true, minWidth: 100 },
    { headerName: 'ID#', field: 'emno', filter: true, minWidth: 100 },
    { headerName: 'Name ', field: 'name', filter: true, minWidth: 200 },
    { headerName: 'Department ', field: 'department', minWidth: 200, filter: true },
    { headerName: 'Section', field: 'section', filter: true, minWidth: 200 },
    { headerName: 'Leave Date', field: 'requestDate', filter: true, minWidth: 200 },
    {
      headerName: 'Action',
      cellRenderer: params => {

        return <IconButton onClick={() => handleClickIcon(params)}
          sx={{ paddingY: 0.5 }} >
          <Tooltip title="Click Here to Cancel">
            <CheckCircleOutlineIcon color='primary' />
          </Tooltip>
        </IconButton>
      }

    },
  ])

  const handleClickIcon=async(params)=>{

  }

  return (
    <CustomLayout title="Delete Leave Request" displayClose={true}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
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
          <Box sx={{ display: 'flex', }} >
            <Tooltip title="Save Request" variant="outlined" color="success" placement="top" followCursor arrow>
              <Button
                variant="outlined"
                component="label"
                size="sm"
                fullWidth
                color="primary"
              // disabled={disablesave}
              // onClick={handleProcessLeaveRequest}
              >
                Search
              </Button>
            </Tooltip>
          </Box>
        </Box>
        <Box sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
          <CommonAgGrid
            columnDefs={columnDef}
            //tableData={tableData}
            sx={{
              height: 600,
              width: "100%"
            }}
            rowHeight={30}
            headerHeight={30}
          />
        </Box>
      </Box>
    </CustomLayout>
  )
}

export default DeleteRequest