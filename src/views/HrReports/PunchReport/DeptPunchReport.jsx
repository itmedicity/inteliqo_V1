import React, { Fragment, useState, useCallback, memo } from 'react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { ToastContainer } from 'react-toastify'
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import ReportLayout from '../ReportComponent/ReportLayout';
import { Paper, TextField } from '@mui/material';
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux'
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux'
import { Box, Button, CssVarsProvider, } from '@mui/joy';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { employeePunch } from './Function';
import { getEmployeeDetlDutyPlanBased } from 'src/views/Attendance/DutyPlan/DutyPlanFun/DutyPlanFun';
import { format } from 'date-fns';
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne';


const DeptPunchReport = () => {

    const [dept, setDepartment] = useState(0)
    const [deptSect, setDepartSection] = useState(0)
    const [dutydate, setDutyDate] = useState(moment(new Date()))
    const [tableData, setTableData] = useState([])

    const [column] = useState([
        { headerName: 'ID', field: 'em_no' },
        { headerName: 'Name ', field: 'em_name' },
        { headerName: 'Dept Name ', field: 'dept_name', minWidth: 250 },
        { headerName: 'Dept Section ', field: 'sect_name', minWidth: 250 },
        { headerName: 'Shift In ', field: 'shift_in' },
        { headerName: 'Shift Out ', field: 'shift_out' },
        { headerName: 'Punch In ', field: 'punch_in' },
        { headerName: 'Punch Out ', field: 'punch_out' },
    ])

    const getData = useCallback(async (e) => {

        if (dept === 0 || deptSect === 0) {
            warningNofity('Check The Department || Department Section Feild');

        } else {
            const getEmpData = {
                em_department: dept,
                em_dept_section: deptSect,
            }
            getEmployeeDetlDutyPlanBased(getEmpData).then((emplyDataArray) => {
                const { status, data } = emplyDataArray;
                if (status === 1) {
                    const arr = data?.map((val) => {
                        return val.em_id
                    })
                    const postdata = {
                        emp_id: arr,
                        from: moment(dutydate).format('YYYY-MM-DD'),
                        to: moment(dutydate).format('YYYY-MM-DD')
                    }
                    employeePunch(postdata).then((dataObj) => {
                        const { status, punchdata } = dataObj
                        if (status === 1) {
                            const combinedArray = punchdata.reduce((result, item1) => {
                                const matchingItem2 = data.find((item2) => item2.em_id === item1.emp_id);
                                if (matchingItem2) {
                                    // Merge properties from both objects
                                    result.push({ ...item1, ...matchingItem2 });
                                } else {
                                    // If there's no matching item in array2, add item1 as is
                                    result.push(item1);
                                }

                                return result;
                            }, []);

                            const arr = combinedArray.map((val) => {
                                const obj = {
                                    em_no: val.em_no,
                                    em_name: val.em_name,
                                    dept_name: val.dept_name,
                                    sect_name: val.sect_name,
                                    shift_in: format(new Date(val.shift_in), 'HH:mm'),
                                    shift_out: format(new Date(val.shift_out), 'HH:mm'),
                                    punch_in: val.punch_in !== null ? format(new Date(val.punch_in), 'HH:mm') : 'NIL',
                                    punch_out: val.punch_out !== null ? format(new Date(val.punch_out), 'HH:mm') : 'NIL',
                                }
                                return obj;
                            })

                            setTableData(arr);
                        } else {
                            warningNofity("Duty Plan Not Done for this Department!!")
                        }
                    })
                } else {
                    warningNofity("No Employees Under This Department!!")
                }
            })
        }

    }, [dept, deptSect, dutydate])


    return (
        <Fragment>
            <ToastContainer />
            <ReportLayout title="Employee Punch Report" data={tableData} displayClose={true} >
                <Paper sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Box sx={{ flex: 1, mt: 1, px: 0.3, }} >
                            <DeptSelectByRedux setValue={setDepartment} value={dept} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 1, px: 0.3, }} >
                            <DeptSecSelectByRedux dept={dept} setValue={setDepartSection} value={deptSect} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 1, px: 0.3, }} >
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                    views={['day']}
                                    inputFormat="DD-MM-YYYY"
                                    value={dutydate}
                                    onChange={setDutyDate}
                                    renderInput={(params) => (
                                        <TextField {...params} helperText={null} size="small" sx={{ display: 'flex' }} />
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{
                            display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 1, }, mt: 0.5,
                            justifyContent: 'flex-start'
                        }} >
                            <CssVarsProvider>
                                <Box sx={{ p: 0.2 }} >
                                    <Button aria-label="Like" variant="outlined" color="neutral" onClick={getData} sx={{
                                        color: '#90caf9'
                                    }} >
                                        <PublishedWithChangesIcon />
                                    </Button>
                                </Box>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Paper
                        square
                        elevation={0}
                        sx={{
                            p: 1, mt: 0.5,
                            display: 'flex',
                            backgroundColor: '#f0f3f5',
                            flexDirection: "column",
                        }} >
                        <CustomAgGridRptFormatOne
                            tableDataMain={tableData}
                            columnDefMain={column}
                        />
                    </Paper>
                </Paper>
            </ReportLayout>
        </Fragment>
    )
}

export default memo(DeptPunchReport) 