import { Button, CssVarsProvider, Typography } from '@mui/joy'
import { Box, Paper } from '@mui/material'
import { differenceInDays, getDaysInMonth, startOfMonth, subDays } from 'date-fns'
import moment from 'moment'
import React, { memo, useEffect, } from 'react'
import { useState } from 'react'
import { ToWords } from 'to-words';
import { axioslogin } from 'src/views/Axios/Axios'
import { useSelector } from 'react-redux'
import _ from 'underscore'
import Files from 'react-files'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const EndofProcess = ({ details }) => {
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
    const { dept_name, em_no, em_name, request_date, em_doj, relieving_date,
        desg_name, gross_salary, resignation_type } = empdata;

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


    //NEW CODE FUNCTIONS START HERE
    const [files, setFiles] = useState('')
    const handleChange = (files) => {
        setFiles(files)
    }

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
                            <Typography level='body-md' color='neutral' fontFamily="monospace" lineHeight={1.2} startDecorator={'Date Of Joining :'}>12-02-2024</Typography>
                            <Typography level='body-md' color='neutral' fontFamily="monospace" lineHeight={1.2} startDecorator={'Resignation Date :'}>12-02-2024</Typography>
                            <Typography level='body-md' color='neutral' fontFamily="monospace" lineHeight={1.2} startDecorator={'Notice Period End Date :'}>12-02-2024</Typography>
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
                            clickable
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
                            true === true &&
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
                                    File name here
                                </Typography>
                            </Box>
                        }
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
                            onClick={function () { }}
                            size="sm"
                            variant="outlined"
                        >
                            Process Attendance Information
                        </Button>
                    </Box>
                    <Box>
                        dsfsdf
                    </Box>
                </Box>
            </Paper>



            <Paper elevation={0} variant='outlined' square sx={{ px: 3, display: "flex", flexDirection: "column" }} >
                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500, }}>
                    <CssVarsProvider>
                        <Typography level="body1" sx={{ textDecoration: 'underline' }}> DETAILS OF DAYS WORKED</Typography>
                    </CssVarsProvider>
                </Box>
            </Paper>
            <Paper elevation={0} variant='outlined' square sx={{ px: 3, display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}>
                        <CssVarsProvider>
                            <Typography level="body1">Total No of days</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                        <CssVarsProvider>
                            <Typography level="body1"> {differenceInDays(new Date(relieving_date), startOfMonth(new Date(relieving_date)))}</Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}>
                        <CssVarsProvider>
                            <Typography level="body1">Less: LOP & HLP</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                        <CssVarsProvider>
                            <Typography level="body1"> {lop}</Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}>
                        <CssVarsProvider>
                            <Typography level="body1">Calculated LOP</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                        <CssVarsProvider>
                            <Typography level="body1"> {calcLop}</Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}>
                        <CssVarsProvider>
                            <Typography level="body1">No of days worked</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                        <CssVarsProvider>
                            <Typography level="body1"> {differenceInDays(new Date(relieving_date), startOfMonth(new Date(relieving_date)))}</Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>
            </Paper>
            <Paper square elevation={0} sx={{ px: 3, mt: 1, display: "flex", flexDirection: "column" }} >
                <Box border={0.5} sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ flex: 1 }}>
                        <Box borderBottom={0.5} borderRight={0.5} sx={{ fontWeight: 500, }}>
                            EARNINGS
                        </Box>
                        <Box borderRight={0.5} sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}>
                                <CssVarsProvider>
                                    <Typography level="body1"></Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500, }} >
                                <CssVarsProvider>
                                    <Typography level="body1">No of days </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> </Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box borderRight={0.5} sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}>
                                <CssVarsProvider>
                                    <Typography level="body1">Salary Due</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> {differenceInDays(new Date(relieving_date), startOfMonth(new Date(relieving_date)))}</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> {salary}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box borderRight={0.5} sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}>
                                <CssVarsProvider>
                                    <Typography level="body1">Duty Off</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1">0</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> {dutyoff}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box borderRight={0.5} sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}>
                                <CssVarsProvider>
                                    <Typography level="body1">Holiday Wages</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1">0</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> {holiday}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box borderRight={0.5} sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}>
                                <CssVarsProvider>
                                    <Typography level="body1">Arear</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1">0</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> {arear}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box borderRight={0.5} sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}>
                                <CssVarsProvider>
                                    <Typography level="body1">Comp Off</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1">0</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> {compoff}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box borderRight={0.5} sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}>
                                <CssVarsProvider>
                                    <Typography level="body1">Earned leave</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> 0</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> {earnleave}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box borderRight={0.5} sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}>
                                <CssVarsProvider>
                                    <Typography level="body1">Caution Deposit</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> 0</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> {cautiondepo}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Box borderBottom={0.5} sx={{ fontWeight: 500, }}>
                            DEDUCTIONS
                        </Box>
                        <Box sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}>
                                <CssVarsProvider>
                                    <Typography level="body1"></Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500, }} >
                                <CssVarsProvider>
                                    <Typography level="body1">No of days </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> </Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}>
                                <CssVarsProvider>
                                    <Typography level="body1">Notice Pay</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1">{resignation_type === '2' ? totldays : 0}</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1">  {resignation_type === '2' ? gross_salary : 0}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}>
                                <CssVarsProvider>
                                    <Typography level="body1">KSWF</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> 0</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> {kswf}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}>
                                <CssVarsProvider>
                                    <Typography level="body1">PF</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> 0</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> {pf}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}>
                                <CssVarsProvider>
                                    <Typography level="body1">ESI</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> 0</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> {esi}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", width: "100%" }} >
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }}>
                                <CssVarsProvider>
                                    <Typography level="body1">Prof. Tax</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> 0</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                <CssVarsProvider>
                                    <Typography level="body1">{protax}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                    <Box borderBottom={0.5} borderLeft={0.5} borderRight={0.5} sx={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }} >
                            <CssVarsProvider>
                                <Typography level="body1"> TOTAL EARNINGS</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "right" }} >
                            <CssVarsProvider>
                                <Typography level="body1"> {salary + dutyoff + holiday + arear + compoff + earnleave + cautiondepo}</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box borderBottom={0.5} borderRight={0.5} sx={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }} >
                            <CssVarsProvider>
                                <Typography level="body1"> TOTAL DEDUCTIONS</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "right" }} >
                            <CssVarsProvider>
                                <Typography level="body1"> {resignation_type === '2' ? gross_salary + kswf + pf + esi + protax : kswf + pf + esi + protax}</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                    <Box borderBottom={0.5} borderLeft={0.5} sx={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }} >
                            <CssVarsProvider>
                                <Typography level="body1">.</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box borderBottom={0.5} borderRight={0.5} sx={{ flex: 3, display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontStyle: "oblique", }} >
                            <CssVarsProvider>
                                <Typography level="body1">. </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                    <Box borderBottom={0.5} borderLeft={0.5} borderRight={0.5} sx={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "right", }} >
                            <CssVarsProvider>
                                <Typography level="body1">{tot < 0 ? 'NET AMOUNT PAYABALE' : 'NET AMOUNT RECEIVABLE'}</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box borderBottom={0.5} borderRight={0.5} sx={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }} >
                            <CssVarsProvider>
                                <Typography level="body1">RS {(salary + dutyoff + holiday + arear + compoff + earnleave + cautiondepo) - (gross_salary + kswf + pf + esi + protax)}</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                    <Box borderBottom={0.5} borderLeft={0.5} borderRight={0.5} sx={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", }} >
                            <CssVarsProvider>
                                <Typography level="body1"> In Words</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box borderBottom={0.5} borderRight={0.5} sx={{ flex: 3, display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontStyle: "oblique", }} >
                            <CssVarsProvider>
                                <Typography level="body1"> {numstring}</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default memo(EndofProcess) 