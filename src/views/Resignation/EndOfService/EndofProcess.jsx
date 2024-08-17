import React, { memo, useEffect, useMemo } from 'react'
import { Button, Checkbox, CssVarsProvider, Input, Option, Select, Textarea, Typography } from '@mui/joy'
import { Box, Paper } from '@mui/material'
import { differenceInDays, format, getDaysInMonth, startOfMonth, subDays, addDays, lastDayOfMonth, intervalToDuration, isValid, formatDuration, differenceInMinutes } from 'date-fns'
import moment from 'moment'
import { useState } from 'react'
import { ToWords } from 'to-words';
import { axioslogin } from 'src/views/Axios/Axios'
import { useSelector } from 'react-redux'
import _ from 'underscore'
import Files from 'react-files'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Table from '@mui/joy/Table';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { useCallback } from 'react'
import { processShiftPunchMarkingHrFunc } from 'src/views/Attendance/PunchMarkingHR/punchMarkingHrFunc'

const EndofProcess = ({ details }) => {

    console.log(details)

    const toWords = new ToWords({
        localeCode: 'en-IN',
        converterOptions: {
            currency: true,
            ignoreDecimal: false,
            ignoreZeroCurrency: false,
            doNotAddOnly: false,
            currencyOptions: { // can be used to override defaults for the selected locale
                name: 'Rupee',
                plural: 'Rupees',
                symbol: '₹',
                fractionalUnit: {
                    name: 'Paisa',
                    plural: 'Paise',
                    symbol: '',
                },
            }
        }
    });

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
    const { dept_name, em_no, em_name, request_date, em_doj, relieving_date, desg_name, gross_salary, resignation_type } = empdata;

    const [salary, setSalary] = useState(0)
    const [lop, setLop] = useState(0)
    const [calcLop, setCalcLop] = useState(0)
    const [holiday, setHoliday] = useState(0)
    const [totldays, setTotaldays] = useState(0)
    const [dutyoff, setDutyoff] = useState(0)
    const [arear, setArear] = useState(0)
    const [earnleave, setEarned] = useState(0)
    const [compoff, setCompOff] = useState(0)
    const [cautiondepo, setCautionDepo] = useState(0)
    const [kswf, setKswf] = useState(0)
    const [pf, setPf] = useState(0)
    const [esi, setEsi] = useState(0)
    const [protax, setProTax] = useState(0)

    const state = useSelector((state) => state?.getCommonSettings, _.isEqual)
    const { pf_employee, pf_employee_amount, esi_employee } = state;

    useEffect(() => {
        const getEmpEsi = async () => {
            const result = await axioslogin.get(`/empesipf/${em_no}`)
            const { success, data } = result.data
            if (success === 1) {
                const { em_pf_status, em_esi_status } = data[0]
                if (em_pf_status === 1) {
                    const value2 = Number(gross_salary) * pf_employee / 100
                    setPf(value2 < pf_employee_amount ? Math.round(value2 / 10) * 10 : pf_employee_amount)
                } else {
                    setEsi(0)
                    setPf(0)
                }
                if (em_esi_status === 1) {
                    const value = Number(gross_salary) * esi_employee / 100
                    setEsi(Math.round(value / 10) * 10)
                } else {
                    setEsi(0)
                    setPf(0)
                }
            } else {
                setEsi(0)
                setPf(0)
            }
        }
        getEmpEsi(em_no)
    }, [em_no, gross_salary, pf_employee, pf_employee_amount, esi_employee])


    useEffect(() => {
        //to get punchdata
        const getPunchData = async (postdata) => {
            const result = await axioslogin.post("/payrollprocess/punchbiId", postdata);
            const { success, data } = result.data
            if (success === 1) {
                const lossofpay = (data.filter(val => val.leave_status === 0 && val.duty_status === 0)).length
                const calculatedlop = (data.filter(val => val.duty_desc === 'A' && val.leave_status === 0)).length
                const holiday = (data.filter(val => val.holiday_status === 1)).length
                setHoliday(holiday)
                setLop(lossofpay)
                setCalcLop(calculatedlop)
                setDutyoff(0)
                setArear(0)
                setEarned(0)
                setCompOff(0)
                setCautionDepo(0)
                setKswf(0)
                setProTax(0)
            } else {
                setLop(0)
                setCalcLop(0)
                setHoliday(0)
                setDutyoff(0)
                setArear(0)
                setEarned(0)
                setCompOff(0)
                setCautionDepo(0)
                setKswf(0)
                setProTax(0)
            }
        }

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
            const wokeddays = differenceInDays(new Date(relieving_date), startOfMonth(new Date(relieving_date)))
            const days = getDaysInMonth(new Date(relieving_date));
            setTotaldays(days)
            const workedSalary = (gross_salary / days) * wokeddays
            const roundValue = Math.round(workedSalary / 10) * 10
            setSalary(roundValue)
            // const words = toWords?.convert(roundValue)
            // setSalaryInwords(words)

            const postdata = {
                emp_id: em_id,
                from: moment(startOfMonth(new Date(relieving_date))).format('YYYY-MM-DD'),
                to: relieving_date
            }
            getPunchData(postdata)
        } else {
            setEmpdata({})
            setSalary(0)
        }
    }, [details])

    const tot = (salary + dutyoff + holiday + arear + compoff + earnleave + cautiondepo) - (gross_salary + kswf + pf + esi + protax)
    var numstring = toWords?.convert(Math.abs(tot))




    /*******************************************************************************************/

    //NEW CODE FUNCTIONS START HERE

    // DISPATCH SELECTOR
    const shiftInformation = useSelector((state) => state?.getShiftList?.shiftDetails)
    const commonstate = useSelector((state) => state?.getCommonSettings, _.isEqual)
    const commonSetting = useMemo(() => commonstate, [commonstate])

    // console.log(commonSetting)
    const { group_slno, week_off_day, notapplicable_shift, default_shift, noff } = commonSetting;
    const holidayList = [];


    // STATE MANAGMENT START HERE
    const [files, setFiles] = useState('')
    const [exclusions, setExclusions] = useState(false)
    const [exclusionReason, setExclusionReason] = useState('')
    const [empSalary, setEmpSalary] = useState(0)

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

        const today = format(new Date(), 'yyyy-MM-dd');
        const lastWorkingDay = format(new Date(notePeriodEndDate), 'yyyy-MM-dd');
        const startOfMonths = format(startOfMonth(new Date()), 'yyyy-MM-dd')

        if (today <= lastWorkingDay) {
            warningNofity('Notice Period not yet over')
            return
        }

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
            frDate: format(startOfMonth(new Date(notePeriodEndDate)), 'yyyy-MM-dd'),
            trDate: format(lastDayOfMonth(new Date(notePeriodEndDate)), 'yyyy-MM-dd'),
        }

        // GET PUNCH DATA FROM TABLE START
        const punch_data = await axioslogin.post("/attendCal/getPunchDataEmCodeWiseDateWise/", postData_getPunchData);
        const { su, result_data } = punch_data.data;
        // console.log(su, result_data)
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

                // console.log(punchMastData);

                const tb = punchMastData?.map((e) => {
                    // console.log(e)
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
                // setTableArray(array)
                // setOpenBkDrop(false)
                succesNofity('Punch Master Updated Successfully')
            } else {
                // setOpenBkDrop(false)
                warningNofity(message, errorMessage)
            }
            // console.log(result)
        } else {
            warningNofity("Error getting punch Data From DB")
            // setOpenBkDrop(false)
        }





    }, [notePeriodEndDate, details])

    //HANDLE SUBMIT THE RESIGNATION PROCESS 
    const handleSave = useCallback(async () => {

        if ((files === '' || files === undefined) && exclusions === false) {
            warningNofity("Please upload the file")
            return
        }

        if (exclusions === true && exclusionReason === '') {
            warningNofity("Please enter the reason")
            return
        }


    }, [
        files,
        exclusions,
        exclusionReason
    ])

    return (
        <Box sx={{ width: "100%", p: 1 }} >
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
                        <Typography level='title-md' color='neutral' fontFamily="monospace" sx={{ px: 1, pr: 2 }} startDecorator={':'}  >12-08-2024</Typography>
                        <Typography
                            level='title-sm'
                            color='neutral'
                            startDecorator={<CalendarMonthOutlinedIcon fontSize='small' />}
                            variant='outlined'
                            sx={{ borderRadius: 5, pr: 2, py: 0.5 }}
                        >Resignation Date</Typography>
                        <Typography level='title-md' color='neutral' fontFamily="monospace" sx={{ px: 1, pr: 2 }} startDecorator={':'} >12-08-2024</Typography>
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
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((item, index) => (
                                <Box key={index} sx={{ display: 'flex', flex: 1, borderRadius: 0.5, border: 1, borderColor: 'grey.300', flexDirection: 'column', overflow: 'hidden' }} >
                                    <Typography sx={{ backgroundColor: '#EEF9FF', lineHeight: 1.1 }} variant='outlined' level='title-sm' textAlign='center' color='neutral' fontFamily="monospace">{item}</Typography>
                                    <Typography sx={{ backgroundColor: '#EEF9FF', lineHeight: 1.1 }} variant='outlined' level='title-sm' textAlign='center' color='neutral' fontFamily="monospace">Mon</Typography>
                                    <Typography sx={{ backgroundColor: '#EEF9FF', lineHeight: 1.1, fontWeight: 500 }} textColor='#2a4858' variant='outlined' level='body-xs' textAlign='center' color='neutral' >P</Typography>
                                    <Typography sx={{ backgroundColor: '#EEF9FF', lineHeight: 1.1, fontWeight: 500 }} textColor='#2a4858' variant='outlined' level='body-xs' textAlign='center' color='neutral' >WOFF</Typography>
                                </Box>
                            ))
                        }
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, border: "1px solid", borderColor: "grey.300", borderRadius: 2, mt: 0.5, flexDirection: 'column', py: 0.5 }} >
                        <Box sx={{ display: "flex", flex: 1, flexDirection: "row", justifyContent: "center", alignItems: 'center', pt: 0.5 }} >
                            <Select
                                placeholder="Extra Earnings & Deductions"
                                size="sm"
                                sx={{ display: 'flex', flex: 0.5, px: 2, mr: 1 }}
                                value={1}
                            >
                                <Option>Earnings</Option>
                                <Option>Deduction</Option>
                            </Select>
                            <Input placeholder="Amount" type='number' size="sm" sx={{ display: 'flex', flex: 0.5, px: 2, mr: 1 }} />
                            <Input placeholder="Remarks" size="sm" sx={{ display: 'flex', flex: 1, px: 2 }} />
                            <Button
                                color="success"
                                onClick={function () { }}
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
                                    <tr>
                                        <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%' }}>Frozen yoghurt</td>
                                        <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%' }}>159</td>
                                        <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%' }}>6</td>
                                    </tr>
                                    <tr>
                                        <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%' }}>Ice cream sandwich</td>
                                        <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%' }}>237</td>
                                        <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%' }}>9</td>
                                    </tr>
                                    <tr>
                                        <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%' }}>Eclair</td>
                                        <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%' }}>262</td>
                                        <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%' }}>16</td>
                                    </tr>
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
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%', textAlign: 'center', backgroundColor: '#D5FBDD' }} >31</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%', }} >LOP Amount</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%', textAlign: 'center', backgroundColor: '#FFE1E1' }} >200.00</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '40%', backgroundColor: '#E4E5E6' }} ></td>
                            </tr>
                            <tr>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Leave count</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >0</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >NPS Amount</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >250.00</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center' }} >Gross Salary</td>
                            </tr>
                            <tr >
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Holiday count</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#D5FBDD' }} >0</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >LWF Amount</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >250.00</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 900, lineHeight: 1, textAlign: 'center', backgroundColor: '#E4E5E6', color: '#060A0F' }} >350000.00</td>
                            </tr>
                            <tr>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >No of HD LOP</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >0</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Deduction Amount</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >250.00</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center' }} >Net Salary</td>
                            </tr>
                            <tr  >
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >No of LC count</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >0</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Holiday Amount</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#D5FBDD' }} >250.00</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 900, lineHeight: 1, textAlign: 'center', backgroundColor: '#E4E5E6', color: '#060A0F' }} >28000.00</td>
                            </tr>
                            <tr>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Total LOP</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >0</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Extra Earnings</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#D5FBDD' }} >250.00</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center' }} >Total Payable Amount</td>
                            </tr>
                            <tr >
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Total Pay Days</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >0</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Extra Deduction</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >250.00</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 900, lineHeight: 1, textAlign: 'center', backgroundColor: '#E4E5E6', color: '#060A0F' }} >280000.00</td>
                            </tr>
                            <tr>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Holiday worked</td>
                                <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#D5FBDD' }} >0</td>
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
            </Paper>
        </Box>
    )
}

export default memo(EndofProcess) 