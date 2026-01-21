import React, { lazy, memo, useMemo, useState } from 'react';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import { Box, Button, Input, Table, Textarea, Tooltip, Typography } from '@mui/joy';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addDays, differenceInCalendarDays, eachDayOfInterval, endOfMonth, format, isValid, startOfMonth } from 'date-fns';
import { IconButton, Paper } from '@mui/material';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoctorLeaveTypeSelect from './DoctorLeaveTypeSelect';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';

const CoffCancelModal=lazy(()=>import('./LeaveComponents/CoffCancelModal'))

const DeleteRequest = () => {
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const [leaveType, setLeaveType] = useState(0)
  const [tableData, setTableData] = useState([])
  const [coffOpen,setCoffopen]=useState(false)
  const [coffdata,setCoffData]=useState([])

  const [columnDef] = useState([
    { headerName: 'ID#', field: 'em_no', filter: true, minWidth: 100 },
    { headerName: 'Name ', field: 'em_name', filter: true, minWidth: 200 },
    { headerName: 'Department ', field: 'dept_name', minWidth: 200, filter: true },
    { headerName: 'Section', field: 'sect_name', filter: true, minWidth: 200 },
    { headerName: 'No Of Leave', field: 'no_of_leave', filter: true, minWidth: 200 },
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

  const [columnCoff] = useState([
    { headerName: 'ID#', field: 'em_no', filter: true, minWidth: 100 },
    { headerName: 'Name ', field: 'em_name', filter: true, minWidth: 200 },
    { headerName: 'Department ', field: 'dept_name', minWidth: 200, filter: true },
    { headerName: 'Section', field: 'sect_name', filter: true, minWidth: 200 },
    { headerName: 'Duty Type', field: 'dutyTyp', filter: true, minWidth: 200 },
    {
      headerName: 'Action',
      cellRenderer: params => {

        return <IconButton onClick={() => handleCoffCancel(params)}
          sx={{ paddingY: 0.5 }} >
          <Tooltip title="Click Here to Cancel">
            <CheckCircleOutlineIcon color='primary' />
          </Tooltip>
        </IconButton>
      }
    },
  ])

  const handleClickIcon = async (params) => {
  console.log(params.data)
  }

  const handleCoffCancel=async(params)=>{
    setCoffData(params.data)
    setCoffopen(true)
  }

  const searchLeaveRequest = async () => {
    const postData = {
      fromdate: format(new Date(fromDate), 'yyyy-MM-dd'),
      todate: format(new Date(toDate), 'yyyy-MM-dd')
    }
    if (leaveType === 0) {
      warningNofity("Select Any Type of Leave Type")
    } else {
      if (leaveType === 1) {
        const result = await axioslogin.post('/DoctorsProcess/getdoctors/leaveRequest', postData)
        const { success, data } = result.data
        if (success === 1 && data?.length !== 0) {
          setTableData(data)
        } else {
          warningNofity("There Is No Leave  Request Exist In Between The Dates")
        }
      } else {
        const result = await axioslogin.post('/DoctorsProcess/coffrequest', postData)
        const { success, data } = result.data
        if (success === 1 && data?.length !== 0) {
          console.log(data);
          const newArray = data?.map((val) => {
            const obj = {
              dutyTyp: val?.duty_type === 1 ? 'Night Duty' : val?.duty_type === 2 ? 'Night Duty' : 'NIL',
              specialType: val?.special_duty_type === 1 ? 'Inside Duty' : val?.special_duty_type === 2 ? 'Inside Duty' : 'NIL'
            }
            return {
              ...obj,
              ...val
            }
          })
          setTableData(newArray)
        } else {
          warningNofity("There Is No Leave Request Exist In Between The Dates")
        }
      }
    }
  }

  return (
    <CustomLayout title="Delete Leave Request" displayClose={true}>
      <CoffCancelModal open={coffOpen} setOpen={setCoffopen} coffdata={coffdata}/>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', p: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '20%', px: 0.3 }}>
            <DoctorLeaveTypeSelect value={leaveType} setValue={setLeaveType} />
          </Box>
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
                onClick={searchLeaveRequest}
              >
                Search
              </Button>
            </Tooltip>
          </Box>
        </Box>
        <Box sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
          <CommonAgGrid
            columnDefs={leaveType === 1 ? columnDef : columnCoff}
            tableData={tableData}
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