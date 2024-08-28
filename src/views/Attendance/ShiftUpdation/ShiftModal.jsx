import React from 'react'
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { Chip, Option, Select } from '@mui/joy';
import { addDays, addHours, format, isValid, subHours } from 'date-fns';
import moment from 'moment';
import { errorNofity, succesNofity, warningNofity, } from 'src/views/CommonCode/Commonfunc';
import { useCallback } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
// import { Actiontypes } from 'src/redux/constants/action.type';
import { memo } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import { getAttendanceCalculation, getLateInTimeIntervel } from '../PunchMarkingHR/punchMarkingHrFunc';
import ReportIcon from '@mui/icons-material/Report';
import DeleteIcon from '@mui/icons-material/Delete';

const ShiftModal = ({ open, setOpen, data, punchData, punchMast, setTableArray, empSalary }) => {

    // console.log(data);

    // const dispatch = useDispatch()
    //const { UPDATE_PUNCHMASTER_TABLE } = Actiontypes

    const sortedSalaryData = empSalary?.find((e) => e.em_no === data.em_no) //SALARY DATA

    // console.log(sortedSalaryData);

    const selectedDate = format(new Date(data?.duty_day), 'yyyy-MM-dd');

    //USESTATES
    const [inTime, setInTime] = useState(null)
    const [outTime, setOutTime] = useState(null)
    const [message, setMessage] = useState(false)
    const [disable, setDisable] = useState(false)
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
        // cmmn_early_out, // Early going time interval
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

    const startPunchInTime = subHours(new Date(shiftIn), 16); //last 24 hours from shift in time
    const endPunchOutTime = addHours(new Date(shiftOut), 20); //last 24 hours from shift out time

    // console.log(startPunchInTime, endPunchOutTime)

    //filter punch data based on in and out time
    const filterdPunchData = punchData
        ?.map((e) => new Date(e.punch_time))
        ?.filter((el) => startPunchInTime <= el && el <= endPunchOutTime)
        ?.map((e) => format(new Date(e), 'yyyy-MM-dd HH:mm'))

    //FILTERD PUNCH MASTER DATA BETWEEN 24 HOURS
    const filterdPunchMasterDataAll = punchMast
        ?.map((e) => [
            (e.punch_in !== null && isValid(new Date(e.punch_in))) && new Date(e.punch_in),
            (e.punch_in !== null && isValid(new Date(e.punch_out))) && new Date(e.punch_out)
        ])
        ?.flat()
        ?.filter((e) => e !== false)?.filter((el) => startPunchInTime <= el && el <= endPunchOutTime)
        ?.map((e) => format(new Date(e), 'yyyy-MM-dd HH:mm'))

    //FILTERD PUNCH MASTER SEELCTED dATE
    const filterdPunchMasterDataSelectedDate = punchMast
        ?.filter((e) => e.duty_day === selectedDate)
        ?.map((e) => [
            (e.punch_in !== null && isValid(new Date(e.punch_in))) && new Date(e.punch_in),
            (e.punch_in !== null && isValid(new Date(e.punch_out))) && new Date(e.punch_out)
        ])
        ?.flat()
        ?.filter((e) => e !== false)?.filter((el) => startPunchInTime <= el && el <= endPunchOutTime)
        ?.map((e) => format(new Date(e), 'yyyy-MM-dd HH:mm'))

    // console.log(filterdPunchMasterDataSelectedDate)
    // FILTER AND REMOVE FROM filterdPunchData ARRAY USING THIS ARRAY filterdPunchMasterDataAll punch master in and out punch 
    const filterData = filterdPunchData?.filter((el) => !filterdPunchMasterDataAll?.includes(el))?.concat(filterdPunchMasterDataSelectedDate)
    // console.log(removedPTime)

    //GET DUTY DAY ALREADY UPDATED PUNCH IN AND OUT FROM PUNCH MASTER TABLE
    // const updatedPunchMasterDta = punchMast?.filter((e) => e.duty_day === selectedDate)
    //     ?.map((e) => [e.punch_in !== null && isValid(new Date(e.punch_in)) && new Date(e.punch_in), e.punch_out !== null && isValid(new Date(e.punch_out)) && new Date(e.punch_out)])


    // const filterData = filterdPunchData
    //     // ?.filter((val) => filterdPunchMasterData?.find((e) => format(new Date(e), 'yyyy-MM-dd HH:mm') === format(new Date(val), 'yyyy-MM-dd HH:mm')) === undefined)
    //     ?.concat(updatedPunchMasterDta)
    //     ?.flat()
    //     ?.filter((e) => e !== false)

    // console.log(filterData)

    //UPDATE DATA TO PUNCH MASTER

    const updatePunchInOutData = useCallback(async () => {
        const punch_In = new Date(inTime);
        const punch_out = new Date(outTime);
        const shift_In = new Date(shiftIn)
        const shift_out = new Date(shiftOut)
        const holidayStatus = data?.holiday_status;
        const shiftId = data?.shift_id
        const leave_status = data?.leave_status

        const getLateInTime = await getLateInTimeIntervel(punch_In, shift_In, punch_out, shift_out)
        // console.log(getLateInTime)

        setMessage(false)
        if (inTime === outTime) {
            setMessage(true)
            // console.log(data)
        } else if (leave_status === 1) {
            setDisable(true)
        }
        else {

            if (isValid(punch_In) === true && isValid(punch_out) === true) {
                // console.log(data)

                const salaryLimit = sortedSalaryData.gross_salary > salary_above ? true : false;


                const getAttendance = await getAttendanceCalculation(
                    punch_In, shift_In, punch_out, shift_out, cmmn_grace_period, getLateInTime, holidayStatus, shiftId, default_shift, notapplicable_shift, noff, week_off_day, salaryLimit, cmmn_late_in
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
                setMessage(true)
            }
        }

    }, [inTime, outTime, shiftIn, shiftOut, data, default_shift, notapplicable_shift, noff,
        week_off_day, salary_above, cmmn_late_in, cmmn_grace_period, setOpen, setTableArray,
        sortedSalaryData])

    const deletePunch = useCallback(async () => {
        if (data?.leave_status === 1) {
            warningNofity("Can't Delete Data, A Request Is Exist In This Date!")
            setOpen(false)
        } else {
            const postData = {
                punch_in: null,
                punch_out: null,
                hrs_worked: 0,
                late_in: 0,
                early_out: 0,
                duty_status: 0,
                duty_desc: 'A',
                lvereq_desc: 'A',
                punch_slno: data?.punch_slno,
            }
            let result = await axioslogin.post("/attendCal/deletePunchMasterSingleRow", postData);
            const { success } = result.data;
            if (success === 1) {
                setTableArray([])
                succesNofity('Punch Data Cleared')
                setOpen(false)
            } else {
                errorNofity('Punch Data Not Updated ! Contact HR/IT')
                setOpen(false)
            }
        }
    }, [data, setOpen, setTableArray])

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
                    fontWeight="md"
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
                {disable && <Chip
                    size="sm"
                    variant="outlined"
                    color="danger"
                    startDecorator={<ReportIcon />}
                >An approved Request is exist this Day!</Chip>}
                <Box sx={{ display: 'flex', flex: 1, py: 1 }} >
                    <Box sx={{ flex: 1 }} ><Typography textColor='danger.500'>Remove Existing Attendance</Typography></Box>
                    <Box sx={{ flex: 1 }}>
                        <Button color='danger' variant="outlined" onClick={deletePunch} size="sm">

                            <DeleteIcon />
                        </Button>
                    </Box>
                </Box>
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
                        <Button disabled={disable} fullWidth onClick={updatePunchInOutData} size="sm">Update</Button>
                    </Box>
                </Box>
            </Sheet>
        </Modal>
    )
}

export default memo(ShiftModal)