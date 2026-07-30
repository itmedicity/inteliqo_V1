import React, { memo, useMemo, useState } from 'react'
import { Paper } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Box, Button, Input, Table, Textarea, Tooltip, Typography, Option, Select } from '@mui/joy'
import {
  addDays,
  differenceInCalendarDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  isValid,
  startOfMonth,
} from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { screenInnerHeight } from 'src/views/Constant/Constant'
import { errorNofity, succesNofity, warningNofity, infoNofity } from 'src/views/CommonCode/Commonfunc'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'
import {
  getSelectedEmpInformation,
  findBalanceCommonLeveCount,
  doctorsallLeavesConvertAnArray,
  allLeavesConvertAnArray,
} from 'src/redux/reduxFun/reduxHelperFun'
import { useSelector } from 'react-redux'
import LeaveRequestTable from 'src/views/LeaveManagement/LeavereRequsition/Func/LeaveRequestTable'
import moment from 'moment';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop'

const ExaminationLeave = () => {
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const [reson, setReason] = useState('')
  const [table, setTable] = useState([])
  const [leaveArray, setLeaveArray] = useState([])
  const [openBkDrop, setOpenBkDrop] = useState(false)
  const [requiredDate, setRequiredDate] = useState(moment(new Date()))
  const [leaveType, setleaveType] = useState(0)

  const selectedEmpInform = useSelector((state) => getSelectedEmpInformation(state))
  const { em_no, em_department, em_id, em_dept_section, actual_doj } = selectedEmpInform ?? {}

  const handleProcessLeaveRequest = async () => {
    setOpenBkDrop(true)
    if (leaveType === 0) {
      infoNofity("Select A Leave Type!")
    } else if (isValid(fromDate) && isValid(toDate) && fromDate <= toDate) {
      const requestFromDate = format(new Date(fromDate), 'yyyy-MM-dd H:m:s')
      const requestToDate = format(new Date(toDate), 'yyyy-MM-dd H:m:s')

      //TOTAL LEAVES REQUIRED COUNT
      const numberOfDays = differenceInCalendarDays(new Date(toDate), new Date(fromDate)) + 1
      //POST DATA FOR MASTER TABLE
      const postDataMasterTable = {
        leaveid: 0,
        em_id: em_id,
        em_no: em_no,
        em_department: em_department,
        em_dept_section: em_dept_section,
        leavefrom_date: requestFromDate,
        leavetodate: requestToDate,
        attendance_marking_month: format(startOfMonth(new Date(fromDate)), 'yyyy-MM-dd'),
        rejoin_date: format(addDays(new Date(toDate), 1), 'yyyy-MM-dd'),
        request_status: 1,
        resonforleave: reson,
        no_of_leave: numberOfDays,
        lvereq_desc: leaveType === 1 ? 'ACL' : leaveType === 2 ? 'EML' : null,
        duty_desc: leaveType === 1 ? 'ACL' : leaveType === 2 ? 'EML' : null
      }
      console.log(postDataMasterTable)
      const result = await axioslogin.post('/DoctorsProcess/createAccademic/request', postDataMasterTable)
      const { success, message } = result.data;
      if (success === 1) {
        succesNofity('OFF Credited SuccessFully')
        setOpenBkDrop(false)
        setFromDate(new Date())
        setToDate(new Date())
        setReason('')
      } else {
        errorNofity(`Contact IT , ${JSON.stringify(message)}`)
        setOpenBkDrop(false)
        setFromDate(new Date())
        setToDate(new Date())
        setReason('')
      }
    } else {
      warningNofity('Selected Date Is Not A Valid Date')
    }
  }

  return (
    <Paper variant="outlined" sx={{ mt: 0.5 }}>
      <CustomBackDrop open={openBkDrop} text="Your Request Is Submitting. Please Wait..." />
      <Box sx={{ display: 'flex', flexDirection: 'row', p: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', px: 0.3, flex: 1 }}>
          <Select
            defaultValue={leaveType}
            onChange={(event, newValue) => setleaveType(newValue)}
            size="md"
            sx={{ width: '100%' }}
            variant="outlined"
            color="primary"
          >
            <Option value={0} disabled>
              Select Leave Type
            </Option>
            <Option value={1}>Accademic Leave</Option>
            <Option value={2}>Exam Leave</Option>
          </Select>
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
        <Box sx={{ display: 'flex', px: 0.3, flex: 1 }}></Box>
      </Box>
      <Box sx={{ display: 'flex', p: 0.5 }}>
        <Tooltip
          title="reason"
          followCursor
          placement="top"
          arrow
          variant="outlined"
          color="success"
        >
          <Box sx={{ p: 1, flex: 1 }}>
            <Textarea
              color="primary"
              minRows={2}
              defaultValue=""
              placeholder="Leave Request Reason ..."
              size="sm"
              variant="outlined"
              onChange={(e) => setReason(e.target.value)}
            />
          </Box>
        </Tooltip>
        <Box sx={{ display: 'flex' }}>
          <Tooltip
            title="Save Request"
            variant="outlined"
            color="success"
            placement="top"
            followCursor
            arrow
          >
            <Button
              variant="outlined"
              component="label"
              size="sm"
              fullWidth
              color="primary"
              onClick={handleProcessLeaveRequest}
            >
              Save Request
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  )
}

export default ExaminationLeave
