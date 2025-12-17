import React, { memo, useMemo, useState } from 'react'
import { Paper } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Box, Button, Input, Table, Textarea, Tooltip, Typography } from '@mui/joy'
import { addDays, differenceInCalendarDays, eachDayOfInterval, endOfMonth, format, isValid, startOfMonth } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { screenInnerHeight } from 'src/views/Constant/Constant'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'
import { allLeavesConvertAnArray, getSelectedEmpInformation, findBalanceCommonLeveCount } from 'src/redux/reduxFun/reduxHelperFun'
import { useSelector } from 'react-redux'
import LeaveRequestTable from 'src/views/LeaveManagement/LeavereRequsition/Func/LeaveRequestTable'

const LeaveSelectComponent = ({ emply }) => {
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const [reson, setReason] = useState('')
  const [table, setTable] = useState([])
  const [leaveArray, setLeaveArray] = useState([])

  const selectedEmpInform = useSelector((state) => getSelectedEmpInformation(state))
  const { em_no, em_department, em_id, em_dept_section, actual_doj } = selectedEmpInform ?? {};

  const allLeavesArray = useSelector((state) => allLeavesConvertAnArray(state, actual_doj))
  const filterdArray = useMemo(() => allLeavesArray, [allLeavesArray]);

  //FIND COMMON LEAVE BALANCE COUNT EM_NO WISE
  const findBalanceCountCmnLeave = useSelector((state) => findBalanceCommonLeveCount(state))
  const comnLeaveBalCount = useMemo(() => findBalanceCountCmnLeave, [findBalanceCountCmnLeave])

  const handleChangeLeaveProcess = async () => {
    if (isValid(fromDate) && isValid(toDate) && fromDate <= toDate) {
      const dateDiffrence = eachDayOfInterval({
        start: new Date(fromDate),
        end: new Date(toDate),
      })

      //dataes difference count for checking the the duyt plan is done or not
      const differenceCountFromToDate =
        differenceInCalendarDays(new Date(toDate), new Date(fromDate)) + 1

      const postData = {
        start_date: format(new Date(fromDate), 'yyyy-MM-dd'),
        end_date: format(new Date(toDate), 'yyyy-MM-dd'),
        empData: [emply],
      }
      //CHECKING FOR PUNCH MARKING HR -> YES/NO
      const result = await axioslogin.post('/DoctorsProcess/getData', postData)
      const { success, data } = result.data

      if (success === 1 && data.length === differenceCountFromToDate) {
        //DUTY PLAN IS PLANNED FOR THE SELECTED DATE

        //FOR LISTING THE SELECTED DATE IN THE SCREEN
        const modifiedTable = dateDiffrence?.map((e) => {
          return {
            date: e,
            leavetype: 0,
            leaveTypeName: '',
            selectedLveSlno: 0,
            selectedLveName: '',
            selectedLvType: '',
            count: 0,
            commonLeave: 0,
            commonLeaveSlno: 0,
          }
        })
        setTable(modifiedTable)
        const { status, data } = filterdArray
        status === true && data?.length > 0 && setLeaveArray(data)

      } else {
        warningNofity('Duty Plan Not Done Against This Department! ')
        return
      }
    } else {
      warningNofity('Selected Date Is Not A Valid Date')
    }
  }

  const handleProcessLeaveRequest = async () => {

    //FIRST CHECK THE ALL LEAVE ARE ENTERD IN THE CORRECTED DATE
    const nulCheckForEnterdLeaves = table?.filter((e) => e.leavetype === 0 || e.selectedLveSlno === 0)?.length;
    if (table?.length === 0 || nulCheckForEnterdLeaves !== 0) {
      warningNofity("Requested Leave Data Not Enterd Correctly ,Please Check")
    } else {
      //LEAVE TYPES
      /***
       * ESI -> 6
       * LWP -> 5
       * ML -> 2
       * SL -> 7
       */
      const commonLeave = [6, 5, 2]
      // FILTER AND REMOVE THE COMMON LEAVES
      const commonLeaveFilterArray = table?.filter((e) => !commonLeave?.includes(e.leavetype))?.map((el) => { return { type: el.leavetype, typeslno: el.selectedLveSlno } })
      const allLeavetypes = [...new Set(commonLeaveFilterArray?.map((e) => e.type))]
      // FIND THE DUPLICATE LEAVES 
      const checkDuplicateLeaves = allLeavetypes?.map((el) => {
        return {
          type: el,
          status: commonLeaveFilterArray?.filter((e) => e.type === el)?.map(e => e.typeslno).length === [...new Set(commonLeaveFilterArray?.filter((e) => e.type === el)?.map(e => e.typeslno))].length
        }
      })?.find((e) => e.status === false)

      //DUPLICATE CHECKING RESULTS
      if (checkDuplicateLeaves === undefined) {
        //REQUEST SEND TO DATABASE FOR SAVING

        const requestFromDate = format(new Date(fromDate), 'yyyy-MM-dd H:m:s');
        const requestToDate = format(new Date(toDate), 'yyyy-MM-dd H:m:s');

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
          attendance_marking_month: format(startOfMonth(new Date(fromDate)), "yyyy-MM-dd"),
          rejoin_date: format(addDays(new Date(toDate), 1), "yyyy-MM-dd"),
          request_status: 1,
          resonforleave: reson,
          no_of_leave: numberOfDays
        }

        //POST DATA FOR DETAILS TABLE
        const postDataForDetlTable = table?.map((e) => {
          return {
            leaveid: 0,
            lveDate: format(new Date(e.date), 'yyyy-MM-dd HH:mm:ss'),
            leave_processid: e.commonLeave === 0 ? e.selectedLveSlno : e.commonLeaveSlno, //LEAVE SLNO FROM LEAVES TABLE  //leave_processid
            leave_typeid: e.leavetype, // LEAVE TYPE SLNO // leave_typeid
            status: 1,
            leavetype_name: e.selectedLvType, //leavetype_name
            leave_name: e.selectedLveName, //leave_name
            leaveCount: e.count, // no of days
            empNo: em_no,
            singleleave: 1,
            lvereq_desc: e.selectedLvType,
            duty_desc:e.selectedLvType,
            emno:em_no,
            leave_dates:format(new Date(e.date), 'yyyy-MM-dd')
          }
        })
        //POST DATA TO BACKEND 

        const findNotMoreThanBalaLve = commonLeave?.map((type) => {
          return type === 7 ? {
            type: 7,
            leaveCount: postDataForDetlTable?.filter((e) => e.leave_typeid === 7)?.map(e => e.leaveCount)?.reduce((acc, curr) => acc + curr, 0)
          } : {
            type: type,
            leaveCount: postDataForDetlTable?.filter((e) => e.leave_typeid === type).length
          }
        })?.filter(e => e.leaveCount !== 0)?.map((el) => comnLeaveBalCount?.find((val) => val.type === el.type)?.balance - el.leaveCount < 0)?.filter(e => e === true).length

        if (reson === '') {
          warningNofity("The explanation must consist of more than 10 characters.")
        } else {
          if (findNotMoreThanBalaLve === 0) {
            const modifiedLveReq = {
              masterPostData: postDataMasterTable,
              detlPostSata: postDataForDetlTable
            }
            const submitLeaveRequet = await  axioslogin.post('/LeaveRequest/insert/doctorleave', modifiedLveReq);
            const { success, message } = submitLeaveRequet.data;
            if (success === 1) {
              succesNofity("Leave request submited Successfully");
              setTable([])
              setReason('')
              setFromDate(new Date())
              setToDate(new Date())
            } else {
              errorNofity(message)
              setTable([])
              setReason('')
              setFromDate(new Date())
              setToDate(new Date())
            }
          } else {
            warningNofity("One of the selected common leave counts is greater than the credited count.")
          }
        }
      } else {
        // YES DUPLICATE LEAVE FOUND ERROR THROW
        warningNofity("Please Check Selected Leaves , No Leaves Selected OR Duplicate Leaves Found !!!")
      }
    }
  }
  return (
    <Paper variant="outlined" sx={{ mt: 0.5 }}>
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
        <Box sx={{ display: 'flex', flex: 1, px: 0.3, pl: 5, gap: 2 }}>
          <Tooltip
            title="Click Here to Add Leaves"
            followCursor
            placement="top"
            arrow
            variant="outlined"
            color="success"
          >
            <Button
              aria-label="Like"
              variant="outlined"
              color="success"
              onClick={handleChangeLeaveProcess}
              size="sm"
              endDecorator={<Box>Add Leaves</Box>}
            >
              <ExitToAppOutlinedIcon fontSize="large" />
            </Button>
          </Tooltip>
        </Box>
      </Box>
      <Paper
        variant="outlined"
        sx={{ maxHeight: (screenInnerHeight * 40) / 100, p: 1, m: 0.3, overflow: 'auto' }}
      >
        <Table
          aria-label="basic table"
          color="neutral"
          size="sm"
          variant="plain"
        >
          <thead>
            <tr>
              <th style={{ width: '20%' }}>Requested Leave Date</th>
              <th>Leave Type</th>
              <th>Selected Leaves</th>
            </tr>
          </thead>
          <tbody>
            {table &&
              table?.map((e, idx) => (
                <LeaveRequestTable
                  key={idx}
                  value={e}
                  leaveArray={leaveArray}
                  seletedLveDates={table}
                />
              ))}
          </tbody>
        </Table>
      </Paper>
      <Box sx={{ display: 'flex', p: 0.5 }}>
        <Tooltip title="reason" followCursor placement='top' arrow variant='outlined' color='success'  >
          <Box sx={{ p: 1, flex: 1 }} >
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
        <Box sx={{ display: 'flex', }} >
          <Tooltip title="Save Request" variant="outlined" color="success" placement="top" followCursor arrow>
            <Button
              variant="outlined"
              component="label"
              size="sm"
              fullWidth
              color="primary"
              // disabled={disablesave}
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

export default memo(LeaveSelectComponent)
