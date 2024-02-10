import { Box, IconButton, Tooltip, Typography } from '@mui/joy'
import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { Paper, } from '@mui/material';
import { useDispatch } from 'react-redux'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { addDays, format } from 'date-fns';
import moment from 'moment';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import { pdfdownlod } from './PunchReport'
import { setDepartment } from 'src/redux/actions/Department.action';
import { axioslogin } from 'src/views/Axios/Axios';
import DasboardCustomLayout from 'src/views/MuiComponents/DasboardCustomLayout'
import JoyDepartment from 'src/views/MuiComponents/JoyComponent/JoyDepartment';
import JoyDepartmentSection from 'src/views/MuiComponents/JoyComponent/JoyDepartmentSection';
import { getDepartmentSection } from 'src/redux/actions/Common.Action';


const PunchTable = lazy(() => import('./PunchTable'))

const EmpPunchReport = () => {
    const [dept, setDept] = useState(0)
    const [deptSect, setDepartSection] = useState(0)
    const [Empno, setEmpNo] = useState(0)
    const [fromdate, Setfromdate] = useState('')
    const [todate, Settodate] = useState('')
    const [tableData, setTableData] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setDepartment());

        if (dept !== 0) {
            dispatch(getDepartmentSection(dept))
        }
    }, [dispatch, dept])

    const postData = useMemo(() => {
        return {
            empno: Empno,
            fromdate: (moment(fromdate).format("YYYY-MM-DD")),
            todate: (moment(todate).format("YYYY-MM-DD 23:59:59"))
        }
    }, [Empno, fromdate, todate])

    const postDataDep = useMemo(() => {
        return {
            deptno: dept,
            deptsec: deptSect,
            fromdate: (moment(fromdate).format("YYYY-MM-DD")),
            todate: (moment(todate).format("YYYY-MM-DD 23:59:59"))
        }
    }, [dept, deptSect, fromdate, todate])

    const getData = useCallback(async (e) => {
        e.preventDefault();
        if (Empno !== 0 && fromdate !== '' && todate !== '') {
            const result = await axioslogin.post(`/ReligionReport/punchReport`, postData)
            const { data: firstApiData, success } = result.data
            if (success === 1) {
                setDept(0)
                setDepartSection(0)
                setEmpNo(0)
                Setfromdate('')
                Settodate('')
                const result = await axioslogin.post(`/ReligionReport/punchReportmaster`, postData)
                const { data, success } = result.data
                if (success === 1) {
                    const setData = data?.map((data) => {
                        let shiftIn = `${format(new Date(data.duty_day), 'yyyy-MM-dd')} ${format(new Date(data.shift_in), 'HH:mm')}`;
                        let shiftOut = data.shft_cross_day === 0 ? `${format(new Date(data.duty_day), 'yyyy-MM-dd')} ${format(new Date(data.shift_out), 'HH:mm')}` :
                            `${format(addDays(new Date(data.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(data.shift_out), 'HH:mm')}`;
                        return {

                            dept_name: data?.dept_name,
                            duty_day: data?.duty_day,
                            em_name: data?.em_name,
                            em_no: data?.em_no,
                            sect_name: data?.sect_name,
                            shft_cross_day: data?.shft_cross_day,
                            shift_id: data?.shift_id,
                            shift_in: shiftIn,
                            shift_out: shiftOut

                        }
                    })

                    const updatedSecondApiData = setData.map(data => {
                        const correspondingFirstData = firstApiData.filter(firstApiData => {
                            return (
                                parseInt(firstApiData.emp_code) === data.em_no &&
                                new Date(firstApiData.punch_time).toDateString() === new Date(data.duty_day).toDateString()
                            );
                        });
                        return {
                            ...data,
                            new_field: correspondingFirstData.map(data => data.punch_time)
                        };
                    });

                    setTableData(updatedSecondApiData)

                }
            }
        }
        else if (dept !== 0 && deptSect !== 0 && fromdate !== '' && todate !== '') {
            const result = await axioslogin.post(`/ReligionReport/punchReportdep`, postDataDep)
            const { data: firstApiData, success } = result.data
            if (success === 1) {
                setDept(0)
                setDepartSection(0)
                setEmpNo(0)
                Setfromdate('')
                Settodate('')
                const result = await axioslogin.post(`/ReligionReport/punchReportmasterdep`, postDataDep)
                const { data, success } = result.data
                if (success === 1) {
                    const setData = data?.map((data) => {
                        let shiftIn = `${format(new Date(data.duty_day), 'yyyy-MM-dd')} ${format(new Date(data.shift_in), 'HH:mm')}`;
                        let shiftOut = data.shft_cross_day === 0 ? `${format(new Date(data.duty_day), 'yyyy-MM-dd')} ${format(new Date(data.shift_out), 'HH:mm')}` :
                            `${format(addDays(new Date(data.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(data.shift_out), 'HH:mm')}`;
                        return {

                            dept_name: data?.dept_name,
                            duty_day: data?.duty_day,
                            em_name: data?.em_name,
                            em_no: data?.em_no,
                            sect_name: data?.sect_name,
                            shft_cross_day: data?.shft_cross_day,
                            shift_id: data?.shift_id,
                            shift_in: shiftIn,
                            shift_out: shiftOut

                        }
                    })


                    const updatedSecondApiData = setData.map(data => {
                        const correspondingFirstData = firstApiData.filter(firstApiData => {
                            return (
                                parseInt(firstApiData.emp_code) === data.em_no &&
                                new Date(firstApiData.punch_time).toDateString() === new Date(data.duty_day).toDateString()
                            );
                        });
                        return {
                            ...data,
                            new_field: correspondingFirstData.map(data => data.punch_time)
                        };
                    });
                    setTableData(updatedSecondApiData)

                }
            }

        }
        else {
            setDept(0)
            setDepartSection(0)
            setEmpNo(0)
            setTableData([])
            warningNofity("Please Enter from date and to date")
        }
    }, [Empno, fromdate, todate, postData, postDataDep, dept, deptSect])

    const handleIconClick = useCallback(() => {
        if (tableData.length > 0) {
            pdfdownlod(tableData)
        } else {
            warningNofity("no data to show")
        }

    }, [tableData])


    return (
        <Box sx={{ display: "flex", flexGrow: 1, width: "100%", }} >
            <ToastContainer />
            <DasboardCustomLayout title="Employee Wise Punching Reports" displayClose={true} >
                <Paper sx={{ display: 'flex', flex: 1, flexDirection: 'column', }}>

                    <Box sx={{ mt: 1, ml: 0.5, display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <JoyDepartment deptValue={dept} getDept={setDept} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <JoyDepartmentSection sectValues={deptSect} getSection={setDepartSection} dept={dept} />
                        </Box>

                        <Tooltip title="Employee Number" followCursor placement='top' arrow>
                            <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }}>
                                <InputComponent
                                    type="number"
                                    size="sm"
                                    placeholder="Employee Number"
                                    name="Empno"
                                    value={Empno}
                                    onchange={(e) => setEmpNo(e.target.value)}
                                />
                            </Box>
                        </Tooltip>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, display: "flex", flexDirection: "row", }} >
                            <Typography sx={{ p: 1 }}>From:</Typography>
                            <InputComponent
                                type="date"
                                size="sm"
                                placeholder="From Date"
                                name="Fromdate"
                                value={fromdate}
                                onchange={(e) => Setfromdate(e.target.value)}
                            />
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, display: "flex", flexDirection: "row", }} >
                            <Typography sx={{ p: 1 }}>To:</Typography>
                            <InputComponent
                                type="date"
                                size="sm"
                                placeholder="ToDate"
                                name="Todate"
                                value={todate}
                                onchange={(e) => Settodate(e.target.value)}
                            />

                        </Box>

                        <Box sx={{ ml: 1 }}>
                            <IconButton variant="outlined" size='lg' color="primary" onClick={getData} >
                                <PublishedWithChangesIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ ml: 1 }}>
                            <IconButton variant="outlined" size='lg' color="primary" onClick={handleIconClick} >
                                <DownloadForOfflineIcon />
                            </IconButton>
                        </Box>

                    </Box>

                    <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column", height: window.innerHeight - 170, overflow: 'auto' }} >
                        <PunchTable tableData={tableData} />

                    </Paper>

                </Paper>
            </DasboardCustomLayout>
        </Box >
    )
}

export default memo(EmpPunchReport)