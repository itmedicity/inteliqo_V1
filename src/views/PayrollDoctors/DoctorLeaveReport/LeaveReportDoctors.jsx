import React, { memo, useCallback, useState } from 'react'
import { Box, Button, Input } from '@mui/joy'
import { Paper } from '@mui/material'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import DoctorDepartment from '../DoctorDutyplan/Components/DoctorDepartment'
import DoctorDepartmentSection from '../DoctorDutyplan/Components/DoctorDepartmentSection'
import SectionBasedDoctors from '../DoctorDutyplan/Components/SectionBasedDoctors'
import DoctorLeaveTypeSelect from '../DoctorLeaveRequest/DoctorLeaveTypeSelect'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import moment from 'moment'
import { format } from 'date-fns'
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { ToastContainer } from 'react-toastify'
import {
  getDoctorWiseLeaveReport,
  getDoctorWiseCoffReport,
  getDoctorWiseAccademicReport
} from './LeaveReportDoctorFunc'

const LeaveReportDoctors = () => {
  const [dept, changeDept] = useState(0)
  const [section, changeSection] = useState(0)
  const [emply, getEmployee] = useState(0)
  const [leaveRequest, setleaveRequest] = useState(0)
  const [value, setValue] = useState(moment(new Date()))
  const [tabledata, setTabledata] = useState([])
  const [selectedType, setSelectedType] = useState(0)

  const onProcessClick = useCallback(async () => {
    if (leaveRequest === 0) {
      warningNofity('Please Select Leave Request Type')
      return
    }

    setSelectedType(leaveRequest)

    const postdata = {
      em_id: emply ? emply : null,
      dept_id: dept ? dept : null,
      dept_section: section ? section : null,
      dateyear: format(new Date(value), 'yyyy-MM-dd')
    }

    if (leaveRequest === 1) {
      getDoctorWiseLeaveReport(postdata).then((values) => {
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
        const { status, data } = values
        if (status === 1) {
          setTabledata(data)
        } else {
          setTabledata([])
          infoNofity('There Is No Data To Display')
        }
      })
    }
  }, [leaveRequest, emply, dept, section, value])

  const [leavecolumnDef] = useState([
    { headerName: 'Emp ID', field: 'em_no', minWidth: 100, filter: true },
    { headerName: 'Name', field: 'em_name', autoHeight: true, wrapText: true, minWidth: 180, filter: true },
    { headerName: 'Department', field: 'dept_name', wrapText: true, minWidth: 180 },
    { headerName: 'Department Section', field: 'sect_name', wrapText: true, minWidth: 180 },
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
    { headerName: 'Department', field: 'dept_name', wrapText: true, minWidth: 180 },
    { headerName: 'Department Section', field: 'sect_name', wrapText: true, minWidth: 180 },
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
    { headerName: 'Department', field: 'dept_name', wrapText: true, minWidth: 180 },
    { headerName: 'Department Section', field: 'sect_name', wrapText: true, minWidth: 180 },
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
    <CustomLayout title="Doctor Leave Report" displayClose={true}>
      <ToastContainer />
      <Box sx={{ display: 'flex', flex: 1, px: 0.5, flexDirection: 'column' }}>
        <Paper square elevation={0} sx={{ display: 'flex', flex: 1, px: 0.5, flexDirection: 'row', py: 0.3, gap: 1, alignItems: 'center' }}>
          <Box sx={{ flex: 1, px: 0.3 }}>
            <DoctorDepartment value={dept} setValue={changeDept} />
          </Box>
          <Box sx={{ flex: 1, px: 0.3 }}>
            <DoctorDepartmentSection value={section} setValue={changeSection} dept={dept} />
          </Box>
          <Box sx={{ flex: 1, px: 0.3 }}>
            <SectionBasedDoctors value={emply} setValue={getEmployee} sect={section} />
          </Box>
          <Box sx={{ flex: 1, px: 0.3 }}>
            <DoctorLeaveTypeSelect value={leaveRequest} setValue={setleaveRequest} />
          </Box>
          <Box sx={{ flex: 1, px: 0.3 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={['year']}
                maxDate={new Date()}
                value={value}
                size="sm"
                onChange={(newValue) => {
                  setValue(newValue)
                }}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Input ref={inputRef} {...inputProps} style={{ width: '100%' }} disabled={true} />
                    {InputProps?.endAdornment}
                  </Box>
                )}
              />
            </LocalizationProvider>
          </Box>
          <Box sx={{ display: 'flex', px: 0.5, width: '15%' }}>
            <Button
              aria-label="Process"
              variant="outlined"
              color="danger"
              onClick={onProcessClick}
              fullWidth
              startDecorator={<HourglassEmptyOutlinedIcon />}
              sx={{ mx: 0.5 }}
            >
              Process
            </Button>
          </Box>
        </Paper>

        <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: 'column' }}>
          <CommonAgGrid
            columnDefs={
              selectedType === 1
                ? leavecolumnDef
                : selectedType === 2
                ? coffcolumnDef
                : selectedType === 3
                ? accademiccolumnDef
                : []
            }
            tableData={tabledata}
            sx={{
              height: 600,
              width: '100%'
            }}
            rowHeight={30}
            headerHeight={30}
          />
        </Paper>
      </Box>
    </CustomLayout>
  )
}

export default memo(LeaveReportDoctors)
