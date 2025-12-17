import { Box, Input, Option, Select, Typography, Tooltip, Button, Textarea } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { infoNofity, warningNofity, succesNofity, errorNofity } from 'src/views/CommonCode/Commonfunc';
import { addDays, format, differenceInMinutes, subHours, addHours } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios';
import { getSelectedEmpInformation } from 'src/redux/reduxFun/reduxHelperFun';
import { useSelector } from 'react-redux'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';

const COFFSelectComponent = () => {

  const [openBkDrop, setOpenBkDrop] = useState(false)
  const [dutyday, setDutyday] = useState(0)
  const [specialdutyType, setSpecialdutyType] = useState(0)

  const [fromDate, setFromDate] = useState(moment(new Date()))
  const [planSlno, setPlanSlno] = useState(0)
  const [requiredDate, setRequiredDate] = useState(moment(new Date()))
  const [reson, setReason] = useState('')
  const [shiftDesc, setShiftDesc] = useState('Data Not Found');

  const [disableCheck, setDisableCheck] = useState(true)
  const [shiftId, setShiftId] = useState(0)

  const selectedEmpInform = useSelector((state) => getSelectedEmpInformation(state))
  const { em_no, em_id, em_department, em_dept_section } = selectedEmpInform ?? {};

  const handleDuty = async (newValue) => {
    setDisableCheck(false)
    setDutyday(newValue)
    setFromDate(new Date())
    setShiftDesc('')
    setRequiredDate(new Date())
  }

  const handleChangeDate = async (date) => {
    setFromDate(date)
    const postData = {
      startDate: format(new Date(date), 'yyyy-MM-dd'),
      em_id: em_id
    }
    const result = await axioslogin.post('/DoctorsProcess/selectedDateshift/', postData);
    const { success, data } = result.data;
    if (success === 1) {
      const { plan_slno, shft_desc, night_off_flag, coff_flag, shift_id, shft_cross_day,
        shft_chkin_time, shft_chkout_time
      } = data[0];
      if (coff_flag === 1) {
        infoNofity("This Date Is Already Used For COFF Request")
        setFromDate(moment(new Date()))
      } else if (night_off_flag === 0) {
        infoNofity("This Shift Must Be Night Shift!")
      } else {
        setShiftId(shift_id)
        setShiftDesc(shft_desc)

        const inTime = format(new Date(shft_chkin_time), 'HH:mm');
        const chekIn = `${format(new Date(date), 'yyyy-MM-dd')} ${inTime}`;
        const chekOut = shft_cross_day === 0 ? `${format(new Date(date), 'yyyy-MM-dd')} ${format(new Date(shft_chkout_time), 'HH:mm')}` :
          `${format(addDays(new Date(date), 1), 'yyyy-MM-dd')} ${format(new Date(shft_chkout_time), 'HH:mm')}`;

        const postDataForpunchMaster = {
          date1: format(subHours(new Date(chekIn), 6), 'yyyy-MM-dd HH:mm:ss'),
          date2: format(addHours(new Date(chekOut), 6), 'yyyy-MM-dd HH:mm:ss'),
          em_no: String(em_no)
        }

        const result = await axioslogin.post('/overtimerequest/punchdatabydate/', postDataForpunchMaster)
        const { success, data, message } = result.data;

        if (success === 1) {
          succesNofity('Done , Select The Punching Info')
          setDisableCheck(false)
          setPlanSlno(plan_slno)
        } else if (success === 0) {
          //no record
          warningNofity('Punching Data Not Found')
          setDisableCheck(true)
        } else {
          // error
          errorNofity(message)
          setDisableCheck(true)
        }
      }
    } else {
      warningNofity("Duty Not Planned For the Selected Date")
      setPlanSlno(0)
      // setShiftId(0)
    }
  }

  const SubmitDoffRequest = async () => {
    if (reson === '') {
      setOpenBkDrop(false)
      warningNofity("Add Reason!")
    } if (dutyday === 2 && specialdutyType === 0) {
      infoNofity("Please Select Special Duty Type")
    } else {
      setOpenBkDrop(true)
      const postData = {
        duty_type: dutyday,
        special_duty_type: specialdutyType,
        em_id: em_id,
        em_no: em_no,
        em_department: em_department,
        em_dept_section: em_dept_section,
        shift_id: 1,
        cf_reason: reson,
        leave_date:format(new Date(requiredDate), 'yyyy-MM-dd'),
        duty_taken_date:format(new Date(fromDate), 'yyyy-MM-dd'),
        duty_shift:shiftId
      }

      const result = await axioslogin.post('/DoctorsProcess/insert/coff', postData)
      const { success, message } = result.data;
      if (success === 2) {
        succesNofity('C-OFF Credited SuccessFully')
        setOpenBkDrop(false)
        setRequiredDate(new Date())
        setSpecialdutyType(0)
        setDutyday(0)
      } else {
        errorNofity(`Contact IT , ${JSON.stringify(message)}`)
        setOpenBkDrop(false)
        setRequiredDate(new Date())
        setSpecialdutyType(0)
        setDutyday(0)
      }
    }
  }

  return (
    <Paper variant="outlined" sx={{ mt: 0.5 }}>
      <CustomBackDrop open={openBkDrop} text="Please wait !. Submitting DOFF Request" />
      <Box sx={{ display: 'flex', flexDirection: 'row', p: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', px: 0.3, flex: 1 }}>
          <Select
            defaultValue={dutyday}
            onChange={(event, newValue) => handleDuty(newValue)}
            size="md"
            sx={{ width: '100%' }}
            variant="outlined"
            color="primary"
          >
            <Option value={0} disabled>
              Duty Day Type
            </Option>
            <Option value={1}>Night Duty</Option>
            <Option value={2}>Special Duty</Option>
          </Select>
        </Box>
        {
          dutyday === 2 ? <Box sx={{ display: 'flex', alignItems: 'center', px: 0.3, flex: 1 }}><Select
            defaultValue={specialdutyType}
            onChange={(event, newValue) => { setSpecialdutyType(newValue) }}
            size="md"
            sx={{ width: '100%' }}
            variant="outlined"
            color="primary"
          >
            <Option value={0} disabled>
              Special Duty Type
            </Option>
            <Option value={1}>Inside Duty</Option>
            <Option value={2}>OutSide Duty</Option>
          </Select></Box> : null
        }
        <Box sx={{ display: 'flex', px: 0.5, alignItems: 'center', flex: 1 }} >
          <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >Duty Date</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={['day']}
              inputFormat="dd-MM-yyyy"
              value={fromDate}
              size="small"
              onChange={handleChangeDate}
              renderInput={({ inputRef, inputProps, InputProps }) => (
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                  <Input ref={inputRef} {...inputProps} disabled={true} />
                  {InputProps?.endAdornment}
                </Box>
              )}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ flex: 1, px: 0.5, mt: 0.5 }} >
          <Input
            size="md"
            fullWidth
            variant="outlined"
            value={shiftDesc}
            disabled
          />
        </Box>

      </Box>
      {/* <Box sx={{ display: 'flex', flexDirection: 'row', p: 0.5 }}>
        <Box sx={{ display: "flex", mx: 2, alignItems: 'center', }} >
          <Checkbox
            label={`Check In`}
            variant="outlined"
            color='danger'
            size="lg"
            disabled={disableCheck}
            onChange={(e) => handleChangeCheckInCheck(e)}
            checked={checkinBox}
          />
        </Box>
        <Box sx={{ display: 'flex', flex: 1, p: 0.2, }} >
          <Select
            value={punchInTime}
            onChange={(event, newValue) => {
              setPunchInTime(newValue);
            }}
            sx={{ width: '100%' }}
            size='md'
            variant='outlined'
            disabled={disableIn}
          >
            <Option disabled value={0}>Select Check In Time</Option>
            {
              punchDetl?.map((val, index) => {
                return <Option key={index} value={val.punch_time}>{val.punch_time}</Option>
              })
            }
          </Select>
        </Box>
        <Box sx={{ display: "flex", mx: 2, alignItems: 'center', }} >
          <Checkbox
            label={`Check Out`}
            variant="outlined"
            color='danger'
            size="lg"
            disabled={disableCheck}
            onChange={(e) => handleChangeCheckOutCheck(e)}
            checked={checkoutBox}
          />

        </Box>
        <Box sx={{ display: 'flex', flex: 1, p: 0.2, }} >
          <Select
            value={punchOutTime}
            onChange={(event, newValue) => {
              setPunchOutTime(newValue);
            }}
            sx={{ width: '100%' }}
            size='md'
            variant='outlined'
            disabled={disableOut}
          >
            <Option disabled value={0}>Select Check Out Time</Option>
            {
              punchDetl?.map((val, index) => {
                return <Option key={index} value={val.punch_time}>{val.punch_time}</Option>
              })
            }
          </Select>
        </Box>
        <Box sx={{ px: 0.5, mt: 0.5 }}>
          <Tooltip title="Process" followCursor placement='top' arrow variant='outlined' color='success'  >
            <Button
              aria-label="Like"
              variant="outlined"
              color="success"
              onClick={processPunchData}
              size='sm'
              sx={{ width: '100%' }}
              endDecorator={<Box>Process</Box>}
            >
              <ExitToAppOutlinedIcon fontSize='medium' />
            </Button>
          </Tooltip>
        </Box>
      </Box> */}
      <Box sx={{ display: "flex", flex: 1, px: 0.5, alignItems: 'center', }} >
        <Box sx={{ display: 'flex', px: 0.5, alignItems: 'center' }} >
          <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >OFF Required Date</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={['day']}
              inputFormat="dd-MM-yyyy"
              value={requiredDate}
              minDate={new Date(fromDate)}
              maxDate={addDays(new Date(fromDate), 30)}
              size="small"
              disabled={disableCheck}
              onChange={(newValue) => {
                setRequiredDate(newValue);
              }}
              renderInput={({ inputRef, inputProps, InputProps }) => (
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                  <Input ref={inputRef} {...inputProps} disabled={true} />
                  {InputProps?.endAdornment}
                </Box>
              )}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ px: 0.5, mt: 0.5, flex: 1 }}>
          <Tooltip title="reason" followCursor placement='top' arrow variant='outlined' color='success'  >
            <Box sx={{ p: 1 }} >
              <Textarea
                color="warning"
                defaultValue=''
                placeholder="COFF Request Reason ..."
                size="md"
                variant="outlined"
                disabled={disableCheck}
                onChange={(e) => setReason(e.target.value)}
              />
            </Box>
          </Tooltip>
        </Box>
        <Box sx={{ display: 'flex', }} >
          <Tooltip title="Save Compansatory Off Request" variant="outlined" color="success" placement="top" followCursor arrow>
            <Button
              variant="outlined"
              component="label"
              size="sm"
              fullWidth
              color="primary"
              disabled={disableCheck}
              onClick={SubmitDoffRequest}
            >
              Save Request
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  )
}

export default memo(COFFSelectComponent) 
