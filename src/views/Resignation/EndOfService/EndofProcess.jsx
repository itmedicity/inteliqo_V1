import React, { memo, useEffect, useMemo } from 'react'
import { Button, Checkbox, Input, Option, Select, Textarea, Typography } from '@mui/joy'
import { Box, Paper } from '@mui/material'
import { format, getDaysInMonth, startOfMonth, subDays, addDays, lastDayOfMonth, intervalToDuration, isValid, formatDuration, differenceInMinutes, isAfter } from 'date-fns'
import moment from 'moment'
import { useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { useSelector } from 'react-redux'
import _ from 'underscore'
import Files from 'react-files'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Table from '@mui/joy/Table';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { useCallback } from 'react'
import { processShiftPunchMarkingHrFunc } from 'src/views/Attendance/PunchMarkingHR/punchMarkingHrFunc'

const EndofProcess = ({ details, setFlag, setCount }) => {


    // STATE MANAGMENT START HERE
    const [files, setFiles] = useState('')
    const [exclusions, setExclusions] = useState(false)
    const [exclusionReason, setExclusionReason] = useState('')
    const [empSalary, setEmpSalary] = useState(0)
    const [earnValue, setEarnvalue] = useState(0)
    const [displayArray, setdisplayArray] = useState([])
    // const [open1, setOpen1] = useState(false);
    const [totalDays, setTotaldays] = useState(0)
    const [leaveCount, setLeaveCount] = useState(0)
    const [holidayCount, setHolidayCount] = useState(0)
    const [hdLop, setHdLop] = useState(0)
    const [lcCount, setLcCount] = useState(0)
    const [lopCount, setLopCount] = useState(0)
    const [payDays, setPayDays] = useState(0)
    const [holidayWorked, setHolidayWorked] = useState(0)
    const [attendanceProcess, setAttendnaceProcess] = useState(0)
    const [earnAmount, setEarnAmount] = useState(0)
    const [earnRemark, setEarnRemark] = useState('')
    const [earnArray, setEarnArray] = useState([])
    const [earnName, setEarnName] = useState('')
    const [npsamount, setNpsamount] = useState(0)
    const [lwfamount, setLwfAmount] = useState(0)
    const [lopamount, setlopamount] = useState(0)
    const [holidayamount, setHolidayAmount] = useState(0)
    const [extraEarn, setExtraEarn] = useState(0)
    const [extraDeduct, setExtraDeduct] = useState(0)
    const [deductionAmount, setDeductionAmount] = useState(0)
    const [netSalary, setnetSalary] = useState(0)
    const [selectedFile, setSelectedFile] = useState([])


    const [empdata, setEmpdata] = useState({
        dept_name: '',
        em_no: 0,
        em_name: '',
        request_date: '',
        em_doj: '',
        relieving_date: '',
        desg_name: '',
        gross_salary: '',
        em_id: 0,
        resignation_type: ''
    })
    const { dept_name, em_no, em_name, desg_name, gross_salary, em_id } = empdata;

    // const state = useSelector((state) => state?.getCommonSettings, _.isEqual)

    useEffect(() => {
        if (Object.keys(details).length !== 0) {
            const { dept_name, em_no, em_name, request_date, em_doj, relieving_date,
                desg_name, gross_salary, em_id, resignation_type } = details;
            const obj = {
                dept_name: dept_name,
                em_no: em_no,
                em_name: em_name,
                request_date: request_date,
                em_doj: em_doj,
                relieving_date: relieving_date,
                desg_name: desg_name,
                gross_salary: gross_salary,
                em_id: em_id,
                resignation_type: resignation_type
            }
            setEmpdata(obj)
            //  getPunchData(postdata)
        } else {
            setEmpdata({})
        }
    }, [details])

    useEffect(() => {
        const getEmpEsi = async () => {
            const result = await axioslogin.get(`/empesipf/${em_no}`)
            const { success, data } = result.data
            if (success === 1) {
                const { lwf_status, lwfamount, npsamount, nps } = data[0]
                setNpsamount(nps === 1 ? npsamount : 0)
                setLwfAmount(lwf_status === 1 ? lwfamount : 0)
            } else {
                setNpsamount(0)
                setLwfAmount(0)
            }
        }
        getEmpEsi(em_no)

        const getDeduction = async () => {

            const postData = {
                em_id: em_id
            }

            const result = await axioslogin.post('/empearndeduction/deduction', postData)
            const { success, data } = result.data;
            if (success === 1) {
                const deductValue = data?.map((val) => val.em_amount).reduce((prev, next) => Number(prev) + Number(next));
                setDeductionAmount(deductValue)
            } else {
                setDeductionAmount(0)
            }

        }

        getDeduction(em_id)
    }, [em_no, gross_salary, em_id])

    /*******************************************************************************************/

    //NEW CODE FUNCTIONS START HERE

    // DISPATCH SELECTOR
    const shiftInformation = useSelector((state) => state?.getShiftList?.shiftDetails)
    const commonstate = useSelector((state) => state?.getCommonSettings, _.isEqual)
    const commonSetting = useMemo(() => commonstate, [commonstate])

    const { week_off_day, notapplicable_shift, default_shift, noff } = commonSetting;
    const holidayList = [];

    //DATA FETCHING START HERE

    /**
     * Retrieves the gross salary of an employee based on their section ID.
     *
     * @return {Promise<void>} - A Promise that resolves when the salary is retrieved and set.
     */

    useEffect(() => {
        const getEmployeeSalary = async () => {
            const getGrossSalaryEmpWise = await axioslogin.get(`/common/getgrossSalaryByEmployeeNo/${details.sect_id}`);
            const { su, dataa } = getGrossSalaryEmpWise.data;
            if (su === 1) setEmpSalary(dataa)
        }
        getEmployeeSalary()
    }, [details.sect_id])


    // HANDLER
    const handleChange = (files) => {
        if (files.length > 1) {
            setExclusions(false)
        }
        setFiles(files[0])
        setSelectedFile(files)
    }

    /**
     * Handles file upload errors based on the error code.
     *
     * @param {Object} error - The error object containing the error code.
     * @param {File} file - The file that caused the error.
     * @return {void} No return value.
     */

    const handleError = (error, file) => {
        const { code } = error
        if (code === 1) {
            warningNofity('Upload failed. Invalid file type')
        } else if (code === 2) {
            warningNofity('Upload failed. File too large')
        } else if (code === 3) {
            warningNofity('Upload failed. File too small')
        } else {
            warningNofity('Upload failed. Maximum file count reached')
        }
    }

    const dateOfJoinDate = format(new Date(details?.em_doj), "dd-MM-yyyy")
    const resignationDate = format(new Date(details?.request_date), "dd-MM-yyyy")
    const notePeriodEndDate = format(new Date(details?.relieving_date), "dd-MM-yyyy")

    // FUNCTIONS for PROCESS THE ATTENDFANCE

    const calculateProceeAttendence = useCallback(async () => {
        setAttendnaceProcess(1)
        const today = format(new Date(), 'yyyy-MM-dd');
        const lastWorkingDay = format(new Date(details?.relieving_date), 'yyyy-MM-dd');
        const startOfMonths = format(startOfMonth(new Date(details?.relieving_date)), 'yyyy-MM-dd')

        if (today <= lastWorkingDay) {
            warningNofity('Notice Period Not Completed!')
            return
        } else {
            const postData_getPunchData = {
                preFromDate: format(subDays(new Date(startOfMonths), 2), 'yyyy-MM-dd 00:00:00'),
                preToDate: format(addDays(new Date(lastWorkingDay), 1), 'yyyy-MM-dd 23:59:59'),
                fromDate: format(new Date(startOfMonths), 'yyyy-MM-dd'),
                toDate: format(new Date(lastWorkingDay), 'yyyy-MM-dd'),
                fromDate_dutyPlan: format(new Date(startOfMonths), 'yyyy-MM-dd'),
                toDate_dutyPlan: format(new Date(lastWorkingDay), 'yyyy-MM-dd'),
                fromDate_punchMaster: format(subDays(new Date(startOfMonths), 0), 'yyyy-MM-dd'),
                toDate_punchMaster: format(new Date(lastWorkingDay), 'yyyy-MM-dd'),
                section: details.sect_id,
                empList: [em_no],
                loggedEmp: em_no,
                frDate: format(startOfMonth(new Date(details?.relieving_date)), 'yyyy-MM-dd'),
                trDate: format(lastDayOfMonth(new Date(details?.relieving_date)), 'yyyy-MM-dd'),
            }

            // // GET PUNCH DATA FROM TABLE START
            const punch_data = await axioslogin.post("/attendCal/getPunchDataEmCodeWiseDateWise/", postData_getPunchData);
            const { su, result_data } = punch_data.data;
            if (su === 1) {
                const punchaData = result_data;
                const empList = [em_no]
                // PUNCH MARKING HR PROCESS START
                const result = await processShiftPunchMarkingHrFunc(
                    postData_getPunchData,
                    punchaData,
                    empList,
                    shiftInformation,
                    commonSetting,
                    holidayList,
                    empSalary
                )
                const { status, message, errorMessage, punchMastData } = result;
                if (status === 1) {
                    const tb = punchMastData?.map((e) => {
                        const crossDay = shiftInformation?.find((shft) => shft.shft_slno === e.shift_id);
                        const crossDayStat = crossDay?.shft_cross_day ?? 0;

                        let shiftIn = `${format(new Date(e.duty_day), 'yyyy-MM-dd')} ${format(new Date(e.shift_in), 'HH:mm')}`;
                        let shiftOut = crossDayStat === 0 ? `${format(new Date(e.duty_day), 'yyyy-MM-dd')} ${format(new Date(e.shift_out), 'HH:mm')}` :
                            `${format(addDays(new Date(e.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(e.shift_out), 'HH:mm')}`;

                        // GET THE HOURS WORKED IN MINITS
                        let interVal = intervalToDuration({
                            start: isValid(new Date(e.punch_in)) ? new Date(e.punch_in) : 0,
                            end: isValid(new Date(e.punch_out)) ? new Date(e.punch_out) : 0
                        })
                        return {
                            punch_slno: e.punch_slno,
                            duty_day: e.duty_day,
                            shift_id: e.shift_id,
                            emp_id: e.emp_id,
                            em_no: e.em_no,
                            punch_in: (e.shift_id === default_shift || e.shift_id === notapplicable_shift || e.shift_id === week_off_day || e.shift_id === noff) ? crossDay?.shft_desc : e.punch_in,
                            punch_out: (e.shift_id === default_shift || e.shift_id === notapplicable_shift || e.shift_id === week_off_day || e.shift_id === noff) ? crossDay?.shft_desc : e.punch_out,
                            shift_in: (e.shift_id === default_shift || e.shift_id === notapplicable_shift || e.shift_id === week_off_day || e.shift_id === noff) ? crossDay?.shft_desc : moment(shiftIn).format('DD-MM-YYYY HH:mm'),
                            shift_out: (e.shift_id === default_shift || e.shift_id === notapplicable_shift || e.shift_id === week_off_day || e.shift_id === noff) ? crossDay?.shft_desc : moment(shiftOut).format('DD-MM-YYYY HH:mm'),
                            hrs_worked: (isValid(new Date(e.punch_in)) && e.punch_in !== null) && (isValid(new Date(e.punch_out)) && e.punch_out !== null) ?
                                formatDuration({ days: interVal.days, hours: interVal.hours, minutes: interVal.minutes }) : 0,
                            hrsWrkdInMints: (isValid(new Date(e.punch_in)) && e.punch_in !== null) && (isValid(new Date(e.punch_out)) && e.punch_out !== null) ?
                                differenceInMinutes(new Date(e.punch_out), new Date(e.punch_in)) : 0,
                            late_in: e.late_in,
                            early_out: e.early_out,
                            shiftIn: e.shift_in,
                            shiftOut: e.shift_out,
                            hideStatus: 0,
                            isWeekOff: (e.shift_id === week_off_day),
                            isNOff: e.shift_id === noff,
                            holiday_status: e.holiday_status,
                            lvereq_desc: e.lvereq_desc,
                            duty_desc: e.duty_desc,
                            leave_status: e.leave_status
                        }
                    })
                    const array = tb.sort((a, b) => new Date(a.duty_day) - new Date(b.duty_day));
                    setdisplayArray(array);

                    const totalDays = getDaysInMonth(new Date(details?.relieving_date))
                    setTotaldays(totalDays)
                    const totalLC = array?.filter(el => el.lvereq_desc === "LC").length ?? 0
                    setLcCount(totalLC)
                    const totalHD = (array?.filter(val => val.lvereq_desc === 'HD' || val.lvereq_desc === 'CHD' || val.lvereq_desc === 'EGHD' || val.lvereq_desc === 'HDSL' || val.lvereq_desc === 'HDCL')).length ?? 0
                    setHdLop(totalHD)
                    const totalLV = (array?.filter(val => val.lvereq_desc === 'SL' || val.lvereq_desc === 'CL' || val.lvereq_desc === 'COFF' || val.lvereq_desc === 'EL')).length ?? 0
                    setLeaveCount(totalLV)
                    const totalHP = (array?.filter(val => val.lvereq_desc === 'HP')).length
                    setHolidayWorked(totalHP)
                    const totalH = (array?.filter(val => val.holiday_status === 1)).length
                    setHolidayCount(totalH)

                    const workday =
                        (array?.filter(val => val.lvereq_desc === 'P' || val.lvereq_desc === 'WOFF' ||
                            val.lvereq_desc === 'COFF' || val.lvereq_desc === 'NOFF' || val.lvereq_desc === 'DOFF' ||
                            val.lvereq_desc === 'SL' || val.lvereq_desc === 'HP' ||
                            val.lvereq_desc === 'CL' || val.lvereq_desc === 'EL' ||
                            val.lvereq_desc === 'H' || val.lvereq_desc === 'OHP' ||
                            val.lvereq_desc === 'ODP' || val.lvereq_desc === 'OBS' || val.lvereq_desc === 'LC')).length ?? 0
                    const totalPayday = workday + (totalHD * 0.5)
                    setPayDays(totalPayday)
                    const totallopCount = totalDays - totalPayday;
                    setLopCount(totallopCount)
                    const lopAmount = ((gross_salary / totalDays) * totallopCount).toFixed(2)
                    setlopamount(lopAmount);
                    setHolidayAmount(((gross_salary / totalDays) * totalHP).toFixed(2))

                    const netSalary = (gross_salary / totalDays) * totalPayday
                    setnetSalary(netSalary.toFixed(2))

                    succesNofity('Punch Master Updated Successfully')
                } else {
                    warningNofity(message, errorMessage)
                }
            } else {
                warningNofity("Error getting punch Data From DB")
                // setOpenBkDrop(false)
            }
        }
    }, [details, em_no, empSalary, commonSetting, holidayList, shiftInformation, gross_salary,
        default_shift, noff, notapplicable_shift, week_off_day])

    //HANDLE SUBMIT THE RESIGNATION PROCESS 
    const handleSave = useCallback(async () => {
        const postData = {
            em_id: em_id,
            em_no: em_no,
            exclusion: exclusions === true ? 1 : 0,
            exclusion_reason: exclusionReason,
            resignation_date: format(new Date(details?.request_date), 'yyyy-MM-dd'),
            relieving_date: format(new Date(details?.relieving_date), 'yyyy-MM-dd'),
            total_days: totalDays,
            leave_count: leaveCount,
            holiday_count: holidayCount,
            halfday_count: hdLop,
            late_count: lcCount,
            lop_count: lopCount,
            holiday_worked: holidayWorked,
            total_paydays: payDays,
            lop_amount: lopamount,
            nps_amount: npsamount,
            lwf_amount: lwfamount,
            deduction_amount: deductionAmount,
            holiday_amount: holidayamount,
            extra_earnings: extraEarn,
            extra_deduction: extraDeduct,
            gross_salary: gross_salary,
            net_salary: netSalary,
            total_payableamount: netSalary
        }

        if ((files === '' || files === undefined) && exclusions === false) {
            warningNofity("Upload the file")
            return
        } else if (exclusions === true && exclusionReason === '') {
            warningNofity("Enter the reason")
            return
        } else if (isAfter(new Date(details?.relieving_date), new Date())) {
            warningNofity("Notice Period Not Yet Completed")
        } else if (attendanceProcess === 0) {
            warningNofity("Process Attendnace First!")
        } else {
            const formData = new FormData()
            formData.append('file', selectedFile[0]);
            formData.append('postData', JSON.stringify(postData));

            const result = await axioslogin.post('/Resignation/insertFinal', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            const { success, message } = result.data;
            if (success === 1) {
                // setProgress(100)
                succesNofity(message)
                setCount(Math.random())
                setFlag(0)
            } else if (success === 2) {
                warningNofity(message)
            } else if (success === 0) {
                infoNofity(message)
            } else {
                errorNofity("Error Occured!!!!! Please Contact IT")
            }
        }
    }, [files, exclusions, exclusionReason, details, em_id, totalDays, leaveCount, holidayCount, hdLop, lcCount,
        lopCount, holidayWorked, payDays, gross_salary, lopamount, lwfamount, npsamount, holidayamount, netSalary,
        deductionAmount, extraEarn, extraDeduct, attendanceProcess, selectedFile, setFlag, em_no, setCount])

    const addEarn = useCallback(() => {
        if (earnValue !== 0 && earnAmount !== 0 && earnRemark !== '') {
            const obj = {
                earnValue: earnValue,
                earnAmount: earnAmount,
                earnRemark: earnRemark,
                earnName: earnName
            }
            setEarnArray([...earnArray, obj])
            setExtraEarn(extraEarn => earnValue === 2 ? parseInt(extraEarn) + parseInt(earnAmount) : parseInt(extraEarn))
            setExtraDeduct(extraDeduct => earnValue === 3 ? parseInt(extraDeduct) + parseInt(earnAmount) : parseInt(extraDeduct))
            setEarnvalue(0)
            setEarnAmount(0)
            setEarnRemark('')
            setnetSalary(earnValue === 2 ? parseInt(netSalary) + parseInt(earnAmount) : parseInt(netSalary) - parseInt(earnAmount))

        } else {
            warningNofity("Select Complete Data")
        }
    }, [earnValue, earnAmount, earnRemark, extraEarn, gross_salary, deductionAmount,
        earnArray, earnName, extraDeduct, payDays, totalDays, netSalary,])

    return (
        <Box sx={{ width: "100%", p: 1, overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }} >
            <Paper variant='outlined' sx={{ p: 1, display: "flex", flexDirection: "column", }} >
                {/* Employee Information */}
                <Box sx={{ display: "flex", flexDirection: "column", border: "1px solid", borderColor: "grey.300", p: 1, borderRadius: 2, }} >
                    <Typography level='body-lg' fontWeight={500} fontSize='1.5rem' color='neutral' fontFamily="monospace" lineHeight={1.5} >{em_name}</Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", }} >
                        <Box sx={{ display: 'flex', flexDirection: 'column', flexBasis: '40%' }} >
                            <Typography level='body-md' color='neutral' fontFamily="monospace" lineHeight={1.2} startDecorator={'Employee ID :'} >{em_no}</Typography>
                            <Typography level='body-md' color='neutral' fontFamily="monospace" lineHeight={1.2} startDecorator={'Department :'}>{dept_name}</Typography>
                            <Typography level='body-md' color='neutral' fontFamily="monospace" lineHeight={1.2} startDecorator={'Designation :'}>{desg_name}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', flexBasis: '30%' }} >
                            <Typography level='body-md' color='neutral' fontFamily="monospace" lineHeight={1.2} startDecorator={'Date Of Joining :'}>{dateOfJoinDate}</Typography>
                            <Typography level='body-md' color='neutral' fontFamily="monospace" lineHeight={1.2} startDecorator={'Resignation Date :'}>{resignationDate}</Typography>
                            <Typography level='body-md' color='danger' fontFamily="monospace" lineHeight={1.2} startDecorator={'Notice Period End Date :'} >{notePeriodEndDate}</Typography>
                        </Box>
                    </Box>
                </Box>
                {/* Dure Clearence Details file upload */}
                <Box sx={{ display: "flex", flex: 1, px: 0.5, border: "1px solid", borderColor: "grey.300", borderRadius: 2, mt: 0.5, flexDirection: 'column' }} >
                    <Typography
                        color="neutral"
                        level="body-xs"
                        noWrap
                        sx={{ flex: 1, textAlign: 'left', color: '#8EADCD', mt: 0.5, ml: 0.5, textDecoration: 'underline' }}
                    >
                        Upload Due Clearence Documents
                    </Typography>
                    <Box sx={{ display: "flex", flex: 1, p: 1, flexDirection: "row" }}>
                        <Files
                            className='files-dropzone'
                            onChange={handleChange}
                            onError={handleError}
                            accepts={['image/png', '.pdf', 'image/jpeg', 'image/jpg']}
                            multiple={false}
                            maxFileSize={2000000}
                            minFileSize={0}
                            clickable={!exclusions}
                        >
                            <Box sx={{
                                display: 'flex', alignItems: 'center', cursor: 'pointer', border: 1, borderColor: '#8dbb8f', borderRadius: 2,
                                '&:hover': {
                                    boxShadow: '0 0 0 1px #8dbb8f',
                                }
                            }}  >
                                <DriveFolderUploadOutlinedIcon sx={{ fontSize: 35, color: '#8dbb8f', ml: 1 }} />
                                <Typography
                                    level="body-xs"
                                    textColor="var(--joy-palette-success-plainColor)"
                                    noWrap
                                    sx={{ display: "flex", flex: 1, textAlign: 'center', mx: 1.5, opacity: 0.7 }}
                                >
                                    Upload files
                                </Typography>
                            </Box>
                        </Files>
                        {/* upload file view here model with file open click here */}
                        {
                            files !== '' &&
                            <Box
                                // onClick={() => setOpen1(true)}
                                sx={{
                                    display: 'flex', justifyContent: 'center', alignItems: 'end', borderBottom: '3px solid grey', mb: 0.3, ml: 5, width: '30%',
                                    cursor: 'pointer',

                                }}
                            >
                                <PermMediaOutlinedIcon sx={{ color: 'grey' }} />
                                <Typography
                                    level="body-xs"
                                    textColor="var(--joy-palette-success-plainColor)"
                                    noWrap
                                    sx={{
                                        display: "flex", flex: 1, textAlign: 'center', mx: 1.5, opacity: 0.7,
                                        '&:hover': {
                                            opacity: 10
                                        }
                                    }}
                                >
                                    {files?.name}
                                </Typography>
                            </Box>
                        }
                        <Box sx={{ display: 'flex', flex: 1, alignItems: 'center' }} >
                            <Checkbox
                                color="danger"
                                label="exclusion for due clearence"
                                size="md"
                                variant="outlined"
                                sx={{ px: 2 }}
                                onChange={(e) => setExclusions(e.target.checked)}
                            />
                            <Textarea
                                color="danger"
                                minRows={1}
                                placeholder="reason for exclusion..."
                                disabled={!exclusions}
                                value={exclusionReason}
                                onChange={(e) => setExclusionReason(e.target.value)}
                                size="sm"
                                sx={{ display: 'flex', flex: 1, px: 2 }}
                            />
                        </Box>
                    </Box>
                </Box>
                {/* Attendance process code start here */}
                <Box sx={{ display: "flex", flex: 1, px: 0.5, border: "1px solid", borderColor: "grey.300", borderRadius: 2, mt: 0.5, flexDirection: 'column', py: 0.5 }} >
                    <Box sx={{ display: "flex", flex: 1, p: 1, flexDirection: "row", justifyContent: "left", alignItems: 'center' }}>
                        <Typography
                            level='title-sm'
                            color='neutral'
                            fontFamily="inherit"
                            startDecorator={<CalendarMonthOutlinedIcon fontSize='small' />}
                            variant='outlined'
                            sx={{ borderRadius: 5, pr: 2, py: 0.5 }}
                        >Start of Month</Typography>
                        <Typography level='title-md' color='neutral' fontFamily="monospace" sx={{ px: 1, pr: 2 }} startDecorator={':'}  > {format(startOfMonth(new Date(details?.relieving_date)), 'dd-MM-yyyy')}</Typography>
                        <Typography
                            level='title-sm'
                            color='neutral'
                            startDecorator={<CalendarMonthOutlinedIcon fontSize='small' />}
                            variant='outlined'
                            sx={{ borderRadius: 5, pr: 2, py: 0.5 }}
                        >Resignation Date</Typography>
                        <Typography level='title-md' color='neutral' fontFamily="monospace" sx={{ px: 1, pr: 2 }} startDecorator={':'} >{format(new Date(details?.relieving_date), 'dd-MM-yyyy')}</Typography>
                        <Button
                            color="primary"
                            onClick={calculateProceeAttendence}
                            size="sm"
                            variant="outlined"
                        >
                            Process Attendance Information
                        </Button>
                    </Box>
                    {/* Processed data show here */}
                    <Box sx={{ display: 'flex', p: 0.5, }} >
                        {
                            displayArray && displayArray.map((item, index) => (
                                <Box key={index} sx={{ display: 'flex', flex: 1, borderRadius: 0.5, border: 1, borderColor: 'grey.300', flexDirection: 'column', overflow: 'hidden' }} >
                                    <Typography sx={{ backgroundColor: '#EEF9FF', lineHeight: 1.1 }} variant='outlined' level='title-sm' textAlign='center' color='neutral' fontFamily="monospace">{format(new Date(item?.duty_day), 'd')}</Typography>
                                    <Typography sx={{ backgroundColor: '#EEF9FF', lineHeight: 1.1 }} variant='outlined' level='title-sm' textAlign='center' color='neutral' fontFamily="monospace">{format(new Date(item?.duty_day), 'eee')}</Typography>
                                    <Typography sx={{ backgroundColor: '#EEF9FF', lineHeight: 1.1, fontWeight: 500 }} textColor='#2a4858' variant='outlined' level='body-xs' textAlign='center' color='neutral' >{item?.duty_desc}</Typography>
                                    <Typography sx={{ backgroundColor: '#EEF9FF', lineHeight: 1.1, fontWeight: 500 }} textColor='#2a4858' variant='outlined' level='body-xs' textAlign='center' color='neutral' >{item?.lvereq_desc}</Typography>
                                </Box>
                            ))
                        }
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, border: "1px solid", borderColor: "grey.300", borderRadius: 2, mt: 0.5, flexDirection: 'column', py: 0.5 }} >
                        <Box sx={{ display: "flex", flex: 1, flexDirection: "row", justifyContent: "center", alignItems: 'center', pt: 0.5 }} >
                            <Box sx={{ flex: 1 }}>
                                <Select
                                    value={earnValue}
                                    onChange={(event, newValue) => {
                                        setEarnvalue(newValue);
                                        setEarnName(event.target.innerText)
                                    }}
                                    size='md'
                                    sx={{ width: '100%' }}
                                    variant='outlined'
                                >
                                    <Option disabled value={0}>Select Earn Type </Option>
                                    <Option value={2}>Earnings </Option>
                                    <Option value={3}>Desduction </Option>
                                </Select>
                            </Box>
                            <Box sx={{ flex: 1, px: 0.5 }}>
                                <Input fullWidth placeholder="Amount" type='number' size="sm" value={earnAmount} onChange={(e) => setEarnAmount(e.target.value)} sx={{ display: 'flex', flex: 0.5, px: 2, mr: 1 }} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Input fullWidth placeholder="Remarks" size="sm" value={earnRemark} onChange={(e) => setEarnRemark(e.target.value)} sx={{ display: 'flex', flex: 1, px: 2 }} />
                            </Box>
                            <Button
                                color="success"
                                onClick={addEarn}
                                size="sm"
                                sx={{ mx: 2, px: 1 }}
                            >
                                <LibraryAddIcon />
                            </Button>
                        </Box>
                        <Box>
                            <Table
                                aria-label="basic table"
                                size="sm"
                                sx={{ mt: 1 }}
                            >
                                <thead>
                                    <tr>
                                        <th style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%' }}>Earn / Deduction</th>
                                        <th style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%' }}>Amount</th>
                                        <th style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%' }}>remarks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        earnArray?.map((val, index) => {
                                            return <tr key={index}>
                                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%' }}>{val.earnName}</td>
                                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%' }}>{val.earnAmount}</td>
                                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%' }}>{val.earnRemark}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </Table>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flex: 1, px: 0.5, border: "1px solid", borderColor: "grey.300", borderRadius: 2, mt: 0.5, flexDirection: 'column', py: 0.5 }}>
                    <Table
                        aria-label="basic table"
                        borderAxis="both"
                        color="neutral"
                        size="sm"
                        variant="outlined"
                        sx={{ width: '100%', borderRadius: 5, overflow: 'hidden' }}
                    >
                        <tbody>
                            <tr>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%' }} >Total Days</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%', textAlign: 'center', backgroundColor: '#D5FBDD' }} >{totalDays}</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%', }} >LOP Amount</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%', textAlign: 'center', backgroundColor: '#FFE1E1' }} >{lopamount}</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '40%', backgroundColor: '#E4E5E6' }} ></td>
                            </tr>
                            <tr>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Leave count</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >{leaveCount}</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >NPS Amount</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >{npsamount}</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center' }} >Gross Salary</td>
                            </tr>
                            <tr >
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Holiday count</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#D5FBDD' }} >{holidayCount}</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >LWF Amount</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >{lwfamount}</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 900, lineHeight: 1, textAlign: 'center', backgroundColor: '#E4E5E6', color: '#060A0F' }} >{gross_salary}</td>
                            </tr>
                            <tr>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >No of HD LOP</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >{hdLop}</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Deduction Amount</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >{deductionAmount}</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center' }} >Net Salary</td>
                            </tr>
                            <tr  >
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >No of LC count</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >{lcCount}</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Holiday Amount</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#D5FBDD' }} >{holidayamount}</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 900, lineHeight: 1, textAlign: 'center', backgroundColor: '#E4E5E6', color: '#060A0F' }} >{netSalary}</td>
                            </tr>
                            <tr>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Total LOP</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >{lopCount}</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Extra Earnings</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#D5FBDD' }} >{extraEarn}</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center' }} >Total Payable Amount</td>
                            </tr>
                            <tr >
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Total Pay Days</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >{payDays}</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Extra Deduction</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >{extraDeduct}</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 900, lineHeight: 1, textAlign: 'center', backgroundColor: '#E4E5E6', color: '#060A0F' }} >{netSalary}</td>
                            </tr>
                            <tr>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Holiday worked</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#D5FBDD' }} >{holidayWorked}</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, backgroundColor: '#E4E5E6' }} ></td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, backgroundColor: '#E4E5E6' }} ></td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} ></td>
                            </tr>
                        </tbody>
                    </Table>
                </Box>
                <Box sx={{ display: "flex", flex: 1, px: 0.5, borderColor: "grey.300", borderRadius: 2, mt: 0.5, flexDirection: 'row', py: 0.5 }} >
                    <Box sx={{ flex: 1 }} ></Box>
                    <Box sx={{ flex: 1 }}>
                        <Button
                            onClick={handleSave}
                            size="sm"
                            color='danger'
                            variant="outlined"
                            fullWidth
                            sx={{ display: "flex", flex: 1 }}
                        >
                            Resignation Final Process
                        </Button>
                    </Box>
                </Box>
                {/* <Modal
                    open={open1}
                    onClose={() => setOpen1(false)}
                    sx={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}
                >
                    <ModalDialog>
                        <ModalClose />
                        <Box
                            sx={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}
                        >
                            <ImageViewer
                                fileURL={`${PUBLIC_NAS_FOLDER}/ResignationReq/${attachment}`}
                                fileType={attachment_type}
                            />,
                        </Box>
                    </ModalDialog>
                </Modal> */}
            </Paper>
        </Box>
    )
}

export default memo(EndofProcess) 