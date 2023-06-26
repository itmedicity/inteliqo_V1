import React, { useEffect, useMemo } from 'react'
import { memo } from 'react'
import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import TextField from '@mui/material/TextField'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment from 'moment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux'
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux'
import { useReducer } from 'react'
import { lastDayOfMonth } from 'date-fns/esm'
import { useDispatch, useSelector } from 'react-redux'
import { CssVarsProvider, Button, Tooltip } from '@mui/joy'
import SaveIcon from '@mui/icons-material/Save';
import UploadIcon from '@mui/icons-material/Upload';
import {
    dutyPlanInitialState,
    dutyPlanReducer,
    planInitialState,
    getEmployeeDetlDutyPlanBased,
} from 'src/views/Attendance/DutyPlan/DutyPlanFun/DutyPlanFun'
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import * as XLSX from 'xlsx'
import { useState } from 'react'
import { Actiontypes } from 'src/redux/constants/action.type'
import _ from 'underscore'
import { setCommonSetting } from 'src/redux/actions/Common.Action'
import { axioslogin } from 'src/views/Axios/Axios'
import { ToastContainer } from 'react-toastify'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExporttoExcel } from './ExportToExcel'

const UpdationTopCard = () => {

    // const [excelData,setExcelData]=useState(null)
    const [excelFile, setExcelFile] = useState(null);
    const [Detldata, setDetlData] = useState([])

    const reduxDispatch = useDispatch()
    const { GET_EXCEL_DATA } = Actiontypes;

    const { FROM_DATE, TO_DATE, DEPT_NAME, DEPT_SEC_NAME } = planInitialState

    const setDepartment = (deptSlno) => dispatch({ type: DEPT_NAME, deptSlno })
    const setDepartSecName = (deptSecSlno) => dispatch({ type: DEPT_SEC_NAME, deptSecSlno })

    const [planState, dispatch] = useReducer(dutyPlanReducer, dutyPlanInitialState)
    const { fromDate, toDate, deptName, deptSecName } = planState
    const calanderMaxDate = lastDayOfMonth(new Date(fromDate))

    useEffect(() => {
        // common settings
        reduxDispatch(setCommonSetting());
    }, [reduxDispatch])

    //Common settings
    const commonState = useSelector((state) => state.getCommonSettings, _.isEqual);

    const commonSettings = useMemo(() => commonState, [commonState]);

    const fileType = ['application/vnd.ms-excel'];
    const uploadFile = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    //   setExcelFile(e.target.result);
                    let exceldata = e.target.result
                    if (exceldata !== null) {
                        const workbook = XLSX.read(exceldata, { type: 'buffer' });
                        const worksheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[worksheetName];
                        const data = XLSX.utils.sheet_to_json(worksheet);
                        setExcelFile(data);
                    }
                }

            } else {
                warningNofity("Please Select Only Excel Files!!!")
            }
        }
        else {
            infoNofity('Please Select File!')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (deptName === 0 || deptSecName === 0) {
            infoNofity('Select The Department || Department Section Feild');
        }
        else if (moment(toDate) > moment(calanderMaxDate)) {
            infoNofity('Select the Correct From || To || Both Dates')
        } else {
            if (excelFile !== null) {
                const postData = {
                    em_department: deptName,
                    em_dept_section: deptSecName,
                }
                //getting employee details
                getEmployeeDetlDutyPlanBased(postData).then((emplyDataArray) => {
                    const { status, data } = emplyDataArray;
                    if (status === 1) {
                        //comparing excel file data with database employee list
                        const array = excelFile && excelFile.map((val) => {
                            const arr = data.find((value) => value.em_no === val.EmployeeNo)
                            return {
                                ...val, salary: arr?.gross_salary ?? 0, em_id: arr?.em_id ?? 0
                            }
                        })
                        let a = array.map((val) => {
                            if (val.salary < commonSettings.salary_above) {
                                //calculation for employee working day
                                let total_pay_day = val.CalculatedWorked + val.off + val.holiday + val.holidayworked + val.Leave - val.lwp - val.lop
                                const obj = {
                                    total_p_day: total_pay_day
                                }
                                return {
                                    ...val, ...obj
                                }

                            } else {
                                let total_pay_day = val.CalculatedWorked + val.off + val.holiday + val.Leave - val.lwp - val.lop
                                const obj = {
                                    total_p_day: total_pay_day
                                }
                                return {
                                    ...val, ...obj
                                }
                            }
                        })
                        setDetlData(a)
                        reduxDispatch({ type: GET_EXCEL_DATA, payload: a, status: false })
                    }
                })
            }
            else {
                reduxDispatch({ type: GET_EXCEL_DATA, payload: [], status: false })
            }
        }
    }
    const onClickSave = async (e) => {
        const array1 = Detldata && Detldata.map((val, index) => {
            const obje = {
                em_no: val.EmployeeNo,
                em_id: val.em_id,
                dept_id: deptName,
                sect_id: deptSecName,
                attendance_marking_month: fromDate,
                attnd_mark_startdate: fromDate,
                attnd_mark_enddate: toDate,
                total_working_days: val.Total,
                tot_days_present: val.Worked,
                calculated_worked: val.CalculatedWorked,
                off_days: val.off,
                total_leave: val.Leave,
                total_lwp: val.lwp,
                total_lop: val.lop,
                calculated_lop: val.Calculatedlop,
                total_days: val.total_p_day,
                total_holidays: val.holiday,
                holiday_worked: val.holidayworked,
                process_status: 1
            }
            return obje
        })
        const checkData = {
            attendance_marking_month: fromDate
        }

        const dutyLock = array1 && array1.map((val, index) => {
            const obje = {
                em_no: val.em_no,
                from: fromDate,
                to: toDate
            }
            return obje
        })
        const result = await axioslogin.post("/payrollprocess/check/dateexist", checkData)
        const { success } = result.data
        if (success === 1) {
            infoNofity("Attendance is already processed for this month!")
        } else {
            const result = await axioslogin.post("/payrollprocess/create/manual", array1)
            const { success, message } = result.data
            if (success === 1) {
                const result1 = await axioslogin.patch("/payrollprocess/dutyPlanLock", dutyLock)
                const { success } = result1.data
                if (success === 1) {
                    succesNofity("Attendance Marking Done")
                }
                else {
                    errorNofity("Error occure in duty plan lock")
                }
            } else {
                errorNofity(message)
            }
        }
    }

    //to download excel format
    const downloadFormat = async () => {
        const fileName = "Excelformat"
        ExporttoExcel(fileName)
    }

    return (
        <Paper
            square
            variant="outlined"
            sx={{ display: 'flex', flex: 1, flexDirection: 'row', p: 0.5, alignItems: 'center', mb: 0.5 }}
        >
            <ToastContainer />
            {/* <CustomBackDrop open={open} /> */}
            <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }} >
                <Box sx={{ display: 'flex', mt: 0.5, px: 0.3, }} >
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            views={['day']}
                            // maxDate={moment(calanderMaxDate)}
                            inputFormat="DD-MM-YYYY"
                            value={fromDate}
                            onChange={(date) =>
                                dispatch({ type: FROM_DATE, from: moment(date).format('YYYY-MM-DD') })
                            }
                            renderInput={(params) => (
                                <TextField {...params} helperText={null} size="small" sx={{ display: 'flex' }} />
                            )}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ display: 'flex', mt: 0.5, px: 0.3, }}  >
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            views={['day']}
                            minDate={moment(fromDate)}
                            maxDate={moment(calanderMaxDate)}
                            inputFormat="DD-MM-YYYY"
                            value={toDate}
                            onChange={(date) =>
                                dispatch({ type: TO_DATE, to: moment(date).format('YYYY-MM-DD') })
                            }
                            renderInput={(params) => (
                                <TextField {...params} helperText={null} size="small" sx={{ display: 'flex' }} />
                            )}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ display: 'flex', mt: 0.5, px: 0.3, }} >
                    <DeptSelectByRedux setValue={setDepartment} value={deptName} />
                </Box>
                <Box sx={{ display: 'flex', mt: 0.5, px: 0.3, }} >
                    <DeptSecSelectByRedux dept={deptName} setValue={setDepartSecName} value={deptSecName} />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 1, }, justifyContent: 'flex-start' }} >
                <CssVarsProvider>
                    <Tooltip title="Download Excel Format" followCursor placement='top' arrow >
                        <Box sx={{ p: 0.2 }}>
                            <Button aria-label="Like" variant="outlined" color="neutral"
                                onClick={downloadFormat}
                                sx={{ color: '#90caf9' }} >
                                <FileDownloadIcon />
                            </Button>
                        </Box>
                    </Tooltip>
                    <Box sx={{ pl: 0.2, pt: 1 }} >
                        <input type='file' onChange={uploadFile} required></input>
                        <input type='file' style={{ display: 'none' }}></input>
                    </Box>
                    <Tooltip title="Upload Excel" followCursor placement='top' arrow >
                        <Box sx={{ p: 0.2 }}>
                            <Button aria-label="Like" variant="outlined" color="neutral"
                                onClick={handleSubmit}
                                sx={{ color: '#90caf9' }} >
                                <UploadIcon />
                            </Button>
                        </Box>
                    </Tooltip>
                    <Tooltip title="Save" followCursor placement='top' arrow >
                        <Box sx={{ p: 0.2 }}>
                            <Button aria-label="Like" variant="outlined" color="neutral"
                                onClick={onClickSave}
                                sx={{ color: '#81c784' }}>
                                <SaveIcon />
                            </Button>
                        </Box>
                    </Tooltip>
                </CssVarsProvider>
            </Box>
        </Paper>
    )
}

export default memo(UpdationTopCard)