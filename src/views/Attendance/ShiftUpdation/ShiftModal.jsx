import React from 'react'
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { Chip, Option, Select } from '@mui/joy';
import { addDays, addHours, differenceInMinutes, format, formatDuration, intervalToDuration, isValid, subDays, subHours } from 'date-fns';
import moment from 'moment';
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useCallback } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from 'src/redux/constants/action.type';
import { memo } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import { getAttendanceCalculation, getLateInTimeIntervel } from '../PunchMarkingHR/punchMarkingHrFunc';

const ShiftModal = ({ open, setOpen, data, punchData, punchMast, setTableArray }) => {

    const dispatch = useDispatch()
    const { UPDATE_PUNCHMASTER_TABLE } = Actiontypes

    const selectedDate = format(new Date(data?.duty_day), 'yyyy-MM-dd');



    //USESTATES
    const [inTime, setInTime] = useState(null)
    const [outTime, setOutTime] = useState(null)
    const [message, setMessage] = useState(false)
    // console.log(punchData)
    // console.log(data)
    // console.log(punchMast)
    // console.log(selectedDate)

    //FETCH DATA'S
    // const punchData = useSelector((state) => state.getPunchData.punchDta)
    // const shiftData = useSelector((state) => state.getShiftData.shiftData)
    const shiftData = useSelector((state) => state?.getShiftList?.shiftDetails)
    const commonSettings = useSelector((state) => state?.getCommonSettings)


    const {
        cmmn_early_out, // Early going time interval
        cmmn_grace_period, // common grace period for late in time
        cmmn_late_in, //Maximum Late in Time for punch in after that direct HALF DAY 
        salary_above, //Salary limit for calculating the holiday double wages
        week_off_day, // week off SHIFT ID
        notapplicable_shift, //not applicable SHIFT ID
        default_shift, //default SHIFT ID
        noff // night off SHIFT ID
    } = commonSettings; //COMMON SETTING



    //FIND THE CROSS DAY
    const crossDay = shiftData?.find(shft => shft.shft_slno === data.shift_id);
    const crossDayStat = crossDay?.shft_cross_day ?? 0;

    //DISPLAY DATA'S

    let shiftIn = `${format(new Date(data.duty_day), 'yyyy-MM-dd')} ${format(new Date(data?.shiftIn), 'HH:mm')}`;
    let shiftOut = crossDayStat === 0 ? `${format(new Date(data.duty_day), 'yyyy-MM-dd')} ${format(new Date(data?.shiftOut), 'HH:mm')}` :
        `${format(addDays(new Date(data.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(data?.shiftOut), 'HH:mm')}`;

    // console.log(shiftIn, shiftOut)

    const startPunchInTime = subHours(new Date(shiftIn), 24); //last 24 hours from shift in time
    const endPunchOutTime = addHours(new Date(shiftOut), 24); //last 24 hours from shift in time

    // console.log(startPunchInTime, endPunchOutTime)

    //filter punch data based on in and out time
    const filterdPunchData = punchData
        ?.map((e) => new Date(e.punch_time))
        ?.filter((el) => startPunchInTime <= el && el <= endPunchOutTime)
        ?.map((e) => new Date(format(new Date(e), 'yyyy-MM-dd HH:mm')))
    const filterdPunchMasterData = punchMast
        ?.map((e) => [isValid(new Date(e.punch_in)) && new Date(e.punch_in), isValid(new Date(e.punch_out)) && new Date(e.punch_out)])
        ?.flat()
        ?.filter((e) => e !== false)?.filter((el) => startPunchInTime <= el && el <= endPunchOutTime)
        ?.map((e) => new Date(format(new Date(e), 'yyyy-MM-dd HH:mm')))
    //GET DUTY DAY ALREADY UPDATED PUNCH IN AND OUT FROM PUNCH MASTER TABLE
    const updatedPunchMasterDta = punchMast?.filter((e) => e.duty_day === selectedDate)
        ?.map((e) => [e.punch_in !== null && isValid(new Date(e.punch_in)) && new Date(e.punch_in), e.punch_out !== null && isValid(new Date(e.punch_out)) && new Date(e.punch_out)])


    const filterData = filterdPunchData
        // ?.filter((val) => filterdPunchMasterData?.find((e) => format(new Date(e), 'yyyy-MM-dd HH:mm') === format(new Date(val), 'yyyy-MM-dd HH:mm')) === undefined)
        ?.concat(updatedPunchMasterDta)
        ?.flat()
        ?.filter((e) => e !== false)

    // console.log(filterData)

    // let checkinStart = `${format(new Date(shiftIn), 'yyyy-MM-dd')} ${format(new Date(crossDay?.shft_chkin_start), 'HH:mm')}`;
    // let checkinEnd = `${format(new Date(shiftIn), 'yyyy-MM-dd')} ${format(new Date(crossDay?.shft_chkin_end), 'HH:mm')}`;

    // let checkOutStart = `${format(new Date(shiftOut), 'yyyy-MM-dd')} ${format(new Date(crossDay?.shft_chkout_start), 'HH:mm')}`;
    // let checkOutEnd = `${format(new Date(shiftOut), 'yyyy-MM-dd')} ${format(new Date(crossDay?.shft_chkout_end), 'HH:mm')}`;

    // const checkInTimeVale = format(new Date(checkinStart), 'HH')
    // const incheckStart = checkInTimeVale > 20
    // const checkinStartTime = `${format(subDays(new Date(data.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(checkinStart), 'HH:mm')}`

    // const checkoutTimeVale = format(new Date(checkOutStart), 'HH')
    // const outcheckStart = checkoutTimeVale > 20
    // const checkoutStartTime = `${format(subDays(new Date(data.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(checkOutStart), 'HH:mm')}`

    // const inTimeVale = format(new Date(checkinEnd), 'HH')
    // const incheck = inTimeVale < 8
    // const checkinEndTime = `${format(addDays(new Date(data.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(checkinEnd), 'HH:mm')}`


    // //punch out check out time max count 
    // const endTimeVale = format(new Date(checkOutEnd), 'HH')
    // const check = endTimeVale < 8
    // const checkOutEndTime = `${format(addDays(new Date(data.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(checkOutEnd), 'HH:mm')}`

    // const punchInData = incheck === true ? punchData?.filter(val => new Date(val.punch_time) >= new Date(checkinStart) && new Date(val.punch_time) <= new Date(checkinEndTime)) :
    //     incheckStart === true ? punchData?.filter(val => new Date(val.punch_time) >= new Date(checkinStartTime) && new Date(val.punch_time) <= new Date(checkinEnd)) :
    //         punchData?.filter(val => new Date(val.punch_time) >= new Date(checkinStart) && new Date(val.punch_time) <= new Date(checkinEnd))

    // const punchOutData = check === true ? punchData?.filter(val => new Date(val.punch_time) >= new Date(checkOutStart) && new Date(val.punch_time) <= new Date(checkOutEndTime))
    //     : outcheckStart === true ? punchData?.filter(val => new Date(val.punch_time) >= new Date(checkoutStartTime) && new Date(val.punch_time) <= new Date(checkOutEnd))
    //         : punchData?.filter(val => new Date(val.punch_time) >= new Date(checkOutStart) && new Date(val.punch_time) <= new Date(checkOutEnd))

    //UPDATE DATA TO PUNCH MASTER

    const updatePunchInOutData = useCallback(async () => {
        const punch_In = new Date(inTime);
        const punch_out = new Date(outTime);
        const shift_In = new Date(shiftIn)
        const shift_out = new Date(shiftOut)
        const holidayStatus = data?.holiday_status;
        const shiftId = data?.shift_id


        const getLateInTime = await getLateInTimeIntervel(punch_In, shift_In, punch_out, shift_out)
        // console.log(getLateInTime)

        setMessage(false)
        if (inTime === outTime) {
            setMessage(true)
            // console.log(data)
        } else {
            if (isValid(punch_In) === true && isValid(punch_out) === true) {
                // console.log(data)
                const getAttendance = await getAttendanceCalculation(
                    punch_In, shift_In, punch_out, shift_out, cmmn_grace_period, getLateInTime, holidayStatus, shiftId, default_shift, notapplicable_shift, noff, week_off_day, salary_above, cmmn_late_in
                )

                const postData = {
                    punch_in: inTime,
                    punch_out: outTime,
                    hrs_worked: getLateInTime?.hrsWorked,
                    late_in: getLateInTime?.lateIn,
                    early_out: getLateInTime?.earlyOut,
                    duty_status: getAttendance?.duty_status,
                    duty_desc: getAttendance?.duty_desc,
                    lvereq_desc: getAttendance?.lvereq_desc,
                    punch_slno: data?.punch_slno,
                }
                // console.log(postData)
                let result = await axioslogin.post("/attendCal/updatePunchMasterSingleRow", postData);
                const { success } = result.data;
                if (success === 1) {
                    setTableArray([])
                    succesNofity('Punch Data Updated')
                    setOpen(false)
                } else {
                    errorNofity('Punch Data Not Updated ! Contact HR/IT')
                    setOpen(false)
                }
                // console.log(result)



            } else {
                //one of the date or both dates are not a valid dates
            }
        }

        // console.log(shiftIn, shiftOut)
        // console.log(selectedDate)
    }, [inTime, outTime, selectedDate, shiftIn, shiftOut, data, default_shift, notapplicable_shift, noff, week_off_day, salary_above, cmmn_late_in])




    // const updatePunchInOut = useCallback(async () => {
    //     if (inTime !== null && outTime !== null) {

    //         // GET THE HOURS WORKED IN MINITS
    //         let interVal = intervalToDuration({
    //             start: isValid(new Date(inTime)) ? new Date(inTime) : 0,
    //             end: isValid(new Date(outTime)) ? new Date(outTime) : 0
    //         })

    //         //CALCULATE HOURS WORKED IN MINUTS
    //         const hoursWrkdInMinits = (isValid(new Date(data.punch_in)) && data.punch_in !== null) && (isValid(new Date(data.punch_out)) && data.punch_out !== null) ?
    //             differenceInMinutes(new Date(data.punch_out), new Date(data.punch_in)) : 0

    //         //CALCULATE EARLY AND LATE IN
    //         const CaluculateLateInOut = (isValid(new Date(shiftIn)) && isValid(new Date(shiftOut))) && (isValid(new Date(inTime)) && isValid(new Date(outTime))) ?
    //             { lateIn: differenceInMinutes(new Date(inTime), new Date(shiftIn)), earlyOut: differenceInMinutes(new Date(shiftOut), new Date(outTime)) }
    //             : { lateIn: 0, earlyOut: 0 };

    //         //CALCULATE WORKING HOURS IN WORDS FFOR DISPLAY
    //         const wrkInHrsInWord = (isValid(new Date(data.punch_in)) && data.punch_in !== null) && (isValid(new Date(data.punch_out)) && data.punch_out !== null) ?
    //             formatDuration({ hours: interVal.hours, minutes: interVal.minutes }) : 0;

    //         //POST DATA  FOR UPDATE
    //         let postData = {
    //             in: inTime,
    //             out: outTime,
    //             slno: data.punch_slno,
    //             hrsInMinuts: hoursWrkdInMinits,
    //             wrkMinitusInWord: wrkInHrsInWord,
    //             lateIn: CaluculateLateInOut.lateIn > 0 ? CaluculateLateInOut.lateIn : 0,
    //             earlyOut: CaluculateLateInOut.earlyOut > 0 ? CaluculateLateInOut.earlyOut : 0
    //         }

    //         //DISPATCH THIS DATA TO A TABLE LIST
    //         dispatch({ type: UPDATE_PUNCHMASTER_TABLE, payload: postData })

    //         //UPDATE THIS DATA TO THE DATA BASE
    //         let result = await axioslogin.post("/attendCal/inOutUpdate", postData);
    //         const { success } = result.data;
    //         if (success === 2) {
    //             succesNofity('Punch Data Updated')
    //             setOpen(false)
    //         } else {
    //             errorNofity('Punch Data Not Updated ! Contact HR/IT')
    //             setOpen(false)
    //         }

    //     } else {
    //         infoNofity("Select Both In & Out Time")
    //     }
    // }, [inTime, outTime, UPDATE_PUNCHMASTER_TABLE, data, shiftIn, shiftOut, dispatch, setOpen])


    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    width: '30%',
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                }}
            >
                <ModalClose
                    variant="outlined"
                    sx={{
                        top: 'calc(-1/4 * var(--IconButton-size))',
                        right: 'calc(-1/4 * var(--IconButton-size))',
                        boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                        borderRadius: '50%',
                        bgcolor: 'background.body',
                    }}
                />
                <Typography
                    component="h2"
                    id="modal-title"
                    level="h5"
                    textColor="inherit"
                    fontWeight="sm"
                    mb={1}
                >
                    Punch In and Punch Out Time Marking On {moment(data.duty_day).format('DD-MM-YYYY')}
                </Typography>
                {message && <Chip
                    size="sm"
                    variant="outlined"
                    color="danger"
                    startDecorator={<EmailIcon />}
                >Both the Selected times are same</Chip>}
                <Box sx={{ display: 'flex', flex: 1, py: 1 }} >
                    <Box sx={{ display: 'flex', flex: 1, alignContent: 'center' }} ><Typography textColor="text.tertiary">Punch In Time</Typography></Box>
                    <Box sx={{ flex: 2 }} >
                        <Select
                            disabled={false}
                            placeholder="Punch In....."
                            size="sm"
                            variant="outlined"
                            // value={inTime}
                            onChange={(e) => setInTime(e.target.innerText)}
                        >
                            {filterData?.map((val, idx) => <Option key={idx} value={format(new Date(val), 'yyyy-MM-dd HH:mm')} >{format(new Date(val), 'yyyy-MM-dd HH:mm')}</Option>)}
                        </Select>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flex: 1, }} >
                    <Box sx={{ flex: 1 }} ><Typography textColor="text.tertiary">Punch Out Time</Typography></Box>
                    <Box sx={{ flex: 2 }}>
                        <Select
                            disabled={false}
                            placeholder="Punch Out....."
                            size="sm"
                            variant="outlined"
                            // value={outTime}
                            onChange={(e) => setOutTime(e.target.innerText)}
                        >
                            {filterData?.map((val, idx) => <Option key={idx} value={format(new Date(val), 'yyyy-MM-dd HH:mm')} >{format(new Date(val), 'yyyy-MM-dd HH:mm')}</Option>)}
                        </Select>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flex: 1, py: 1 }} >
                    <Box sx={{ flex: 2 }} ></Box>
                    <Box sx={{ flex: 1 }}>
                        <Button fullWidth onClick={updatePunchInOutData} size="sm">Update</Button>
                    </Box>
                </Box>
            </Sheet>
        </Modal>
    )
}

export default memo(ShiftModal)