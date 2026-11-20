import React, { memo, useCallback, useState } from 'react'
import { Box, Button, Input, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import ReportLayout from '../ReportComponent/ReportLayout'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop'
import DoctorLeaveTypeSelect from 'src/views/PayrollDoctors/DoctorLeaveRequest/DoctorLeaveTypeSelect'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import SearchIcon from '@mui/icons-material/Search'
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne'
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { ToastContainer } from 'react-toastify'
import {
  getDoctorWiseLeaveReport,
  getDoctorWiseCoffReport,
  getDoctorWiseAccademicReport
} from 'src/views/PayrollDoctors/DoctorLeaveReport/LeaveReportDoctorFunc'

const AllDoctorsLeaveReport = () => {
  const [leaveRequest, setleaveRequest] = useState(0)
  const [value, setValue] = useState(new Date())
  const [tabledata, setTabledata] = useState([])
  const [selectedType, setSelectedType] = useState(0)
  const [openBkDrop, setOpenBkDrop] = useState(false)

  const onSearchClick = useCallback(async () => {
    if (leaveRequest === 0) {
      warningNofity('Please Select Leave Request Type')
      return
    }

    setOpenBkDrop(true)
    setSelectedType(leaveRequest)

    const postdata = {
      from_date: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
      to_date: format(endOfMonth(new Date(value)), 'yyyy-MM-dd')
    }

    if (leaveRequest === 1) {
      getDoctorWiseLeaveReport(postdata).then((values) => {
        setOpenBkDrop(false)
        const { status, data } = values
        if (status === 1) {
          setTabledata(data)
        } else {
          setTabledata([])
          infoNofity('There Is No Data To Display')
        }
      })
    } else if (leaveRequest === 2) {
      getDoctorWiseCoffReport(postdata).then((values) => {
        setOpenBkDrop(false)
        const { status, data } = values
        if (status === 1) {
          setTabledata(data)
        } else {
          setTabledata([])
          infoNofity('There Is No Data To Display')
        }
      })
    } else if (leaveRequest === 3) {
      getDoctorWiseAccademicReport(postdata).then((values) => {
        setOpenBkDrop(false)
        const { status, data } = values
        if (status === 1) {
          setTabledata(data)
        } else {
          setTabledata([])
          infoNofity('There Is No Data To Display')
        }
      })
    }
  }, [leaveRequest, value])

  const [leavecolumnDef] = useState([
    { headerName: 'Emp ID', field: 'em_no', minWidth: 100, filter: true },
    { headerName: 'Name', field: 'em_name', autoHeight: true, wrapText: true, minWidth: 180, filter: true },
    { headerName: 'Department', field: 'dept_name', wrapText: true, minWidth: 180, filter: true },
    { headerName: 'Department Section', field: 'sect_name', wrapText: true, minWidth: 180, filter: true },
    { headerName: 'Request Date', field: 'reqDate', wrapText: true, minWidth: 130 },
    { headerName: 'Leave Date', field: 'lvDate', wrapText: true, minWidth: 130 },
    { headerName: 'Leave From', field: 'lvFromDate', wrapText: true, minWidth: 130 },
    { headerName: 'Leave To', field: 'lvToDate', wrapText: true, minWidth: 130 },
    { headerName: 'Rejoin Date', field: 'rejoinDate', wrapText: true, minWidth: 130 },
    { headerName: 'Leave Type', field: 'leavetype_name', minWidth: 140 },
    { headerName: 'Leave Name', field: 'leave_name', minWidth: 140 },
    { headerName: 'No. of Days', field: 'no_of_leave', minWidth: 120 },
    { headerName: 'Reason', field: 'leave_reason', minWidth: 200 },
    { headerName: 'HOD Status', field: 'hod', minWidth: 150 },
    { headerName: 'HOD Comment', field: 'hod_approval_comment', minWidth: 150 },
    { headerName: 'DMS Status', field: 'dms', minWidth: 150 },
    { headerName: 'DMS Comment', field: 'dms_approval_comment', minWidth: 150 },
    { headerName: 'MS Status', field: 'ms', minWidth: 150 },
    { headerName: 'MS Comment', field: 'ms_approval_comment', minWidth: 150 },
    { headerName: 'Overall Status', field: 'showStatus', minWidth: 150 },
    { headerName: 'Cancel Status', field: 'cancel', minWidth: 140 },
    { headerName: 'Cancel Comment', field: 'cancelComment', minWidth: 170 },
  ])

  const [coffcolumnDef] = useState([
    { headerName: 'Emp ID', field: 'em_no', minWidth: 100, filter: true },
    { headerName: 'Name', field: 'em_name', autoHeight: true, wrapText: true, minWidth: 180, filter: true },
    { headerName: 'Department', field: 'dept_name', wrapText: true, minWidth: 180, filter: true },
    { headerName: 'Department Section', field: 'sect_name', wrapText: true, minWidth: 180, filter: true },
    { headerName: 'Request Date', field: 'reqDate', wrapText: true, minWidth: 130 },
    { headerName: 'Leave Date', field: 'lvDate', wrapText: true, minWidth: 130 },
    { headerName: 'Duty Taken Date', field: 'dutyTakenDate', wrapText: true, minWidth: 140 },
    { headerName: 'Duty Type', field: 'dutyTyp', minWidth: 130 },
    { headerName: 'Special Type', field: 'specialType', minWidth: 130 },
    { headerName: 'Shift', field: 'duty_shift', minWidth: 110 },
    { headerName: 'Reason', field: 'cf_reason', minWidth: 200 },
    { headerName: 'HOD Status', field: 'hod', minWidth: 150 },
    { headerName: 'HOD Comment', field: 'hod_approval_comment', minWidth: 150 },
    { headerName: 'DMS Status', field: 'dms', minWidth: 150 },
    { headerName: 'DMS Comment', field: 'dms_approval_comment', minWidth: 150 },
    { headerName: 'MS Status', field: 'ms', minWidth: 150 },
    { headerName: 'MS Comment', field: 'ms_approval_comment', minWidth: 150 },
    { headerName: 'Overall Status', field: 'showStatus', minWidth: 150 },
    { headerName: 'Cancel Status', field: 'cancel', minWidth: 140 },
    { headerName: 'Cancel Comment', field: 'cancelComment', minWidth: 170 },
  ])

  const [accademiccolumnDef] = useState([
    { headerName: 'Emp ID', field: 'em_no', minWidth: 100, filter: true },
    { headerName: 'Name', field: 'em_name', autoHeight: true, wrapText: true, minWidth: 180, filter: true },
    { headerName: 'Department', field: 'dept_name', wrapText: true, minWidth: 180, filter: true },
    { headerName: 'Department Section', field: 'sect_name', wrapText: true, minWidth: 180, filter: true },
    { headerName: 'Request Date', field: 'reqDate', wrapText: true, minWidth: 130 },
    { headerName: 'From Date', field: 'lvDate', wrapText: true, minWidth: 130 },
    { headerName: 'To Date', field: 'lvToDate', wrapText: true, minWidth: 130 },
    { headerName: 'Rejoin Date', field: 'rejoinDate', wrapText: true, minWidth: 130 },
    { headerName: 'No. of Days', field: 'no_of_leave', minWidth: 120 },
    { headerName: 'Reason', field: 'leave_reason', minWidth: 200 },
    { headerName: 'HOD Status', field: 'hod', minWidth: 150 },
    { headerName: 'HOD Comment', field: 'hod_approval_comment', minWidth: 150 },
    { headerName: 'DMS Status', field: 'dms', minWidth: 150 },
    { headerName: 'DMS Comment', field: 'dms_approval_comment', minWidth: 150 },
    { headerName: 'MS Status', field: 'ms', minWidth: 150 },
    { headerName: 'MS Comment', field: 'ms_approval_comment', minWidth: 150 },
    { headerName: 'Overall Status', field: 'showStatus', minWidth: 150 },
    { headerName: 'Cancel Status', field: 'cancel', minWidth: 140 },
    { headerName: 'Cancel Comment', field: 'cancelComment', minWidth: 170 },
  ])

  return (
    <ReportLayout title="All Doctors Leave Report" data={tabledata} displayClose={true}>
      <ToastContainer />
      <CustomBackDrop open={openBkDrop} text="Please wait..." />
      <Box sx={{ display: 'flex', flex: 1, px: 0.5, flexDirection: 'column' }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            p: 1,
            py: 0.8,
            gap: 2,
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Box sx={{ width: '280px' }}>
            <DoctorLeaveTypeSelect value={leaveRequest} setValue={setleaveRequest} />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography level="body-sm" sx={{ fontWeight: 600 }}>
              Select Month:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={['year', 'month']}
                value={value}
                size="sm"
                onChange={(newValue) => {
                  setValue(newValue)
                }}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Input ref={inputRef} {...inputProps} style={{ width: '160px' }} disabled={true} />
                    {InputProps?.endAdornment}
                  </Box>
                )}
              />
            </LocalizationProvider>
          </Box>

          <Box sx={{ width: '120px' }}>
            <Button
              aria-label="Search"
              variant="outlined"
              color="primary"
              onClick={onSearchClick}
              fullWidth
              startDecorator={<SearchIcon />}
            >
              Search
            </Button>
          </Box>
        </Paper>

        <Box sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: 'column', width: '100%' }}>
          <CustomAgGridRptFormatOne
            tableDataMain={tabledata}
            columnDefMain={
              selectedType === 1
                ? leavecolumnDef
                : selectedType === 2
                ? coffcolumnDef
                : selectedType === 3
                ? accademiccolumnDef
                : []
            }
          />
        </Box>
      </Box>
    </ReportLayout>
  )
}

export default memo(AllDoctorsLeaveReport)
