import { Box, Button, CssVarsProvider, Input, Typography } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import DoctorDepartment from '../DoctorDutyplan/Components/DoctorDepartment'
import DoctorDepartmentSection from '../DoctorDutyplan/Components/DoctorDepartmentSection'
import SectionBasedDoctors from '../DoctorDutyplan/Components/SectionBasedDoctors'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns'
import Preview from './Preview'
import { empdata } from './Test'

const DoctorPunchReport = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [dept, changeDept] = useState(0);
    const [section, changeSection] = useState(0);
    const [emply, getEmployee] = useState(0);
    const [tableArray, settableArray] = useState([])
    const [daysNum, setdaysNum] = useState([])
    const [daysStr, setdaysStr] = useState([])

    const punchViewFunction = useCallback(async () => {
        const getEmpData = {
            em_department: [dept],
            em_dept_section: [section],
        }
        const result1 = await axioslogin.post("/payrollprocess/getAllEmployee", getEmpData);
        const { succes, dataa: employeeData } = result1.data
        if (succes === 1) {
            const arr = employeeData?.map((val) => val.em_no)
            const postdata = {
                em_no: arr,
                from: format(startOfMonth(new Date(selectedMonth)), 'yyyy-MM-dd'),
                to: format(endOfMonth(new Date(selectedMonth)), 'yyyy-MM-dd')
            }
            const result = await axioslogin.post("/payrollprocess/getPunchmastData", postdata);
            const { success, data: punchMasteData } = result.data
            if (success === 1) {
                const dateRange = eachDayOfInterval({ start: new Date(startOfMonth(new Date(selectedMonth))), end: new Date(endOfMonth(new Date(selectedMonth))) })
                    ?.map(e => format(new Date(e), 'yyyy-MM-dd'));

                const resultss = [...new Set(punchMasteData?.map(e => e.em_no))]?.map((el) => {
                    const empArray = punchMasteData?.filter(e => e.em_no === el)
                    let emName = empArray?.find(e => e.em_no === el).em_name;
                    let emNo = empArray?.find(e => e.em_no === el).em_no;
                    let emId = empArray?.find(e => e.em_no === el).emp_id;
                    let grossSalary = empArray?.find(e => e.em_no === el).gross_salary;
                    let unauthorized = empArray?.find(e => e.em_no === el).unauthorized_absent_status;

                    return {
                        em_no: el,
                        emName: emName,
                        // dateAray: dateRange?.map(e => format(new Date(e), 'dd')),
                        // daysAry: dateRange?.map(e => format(new Date(e), 'eee')),
                        punchMaster: dateRange?.map((e) => {
                            return {
                                attDate: e,
                                duty_date: empArray?.find(em => em.duty_day === e)?.duty_date ?? e,
                                duty_status: empArray?.find(em => em.duty_day === e)?.duty_status ?? 0,
                                em_name: empArray?.find(em => em.duty_day === e)?.em_name ?? emName,
                                em_no: empArray?.find(em => em.duty_day === e)?.em_no ?? emNo,
                                emp_id: empArray?.find(em => em.duty_day === e)?.emp_id ?? emId,
                                hld_desc: empArray?.find(em => em.duty_day === e)?.hld_desc ?? null,
                                holiday_slno: empArray?.find(em => em.duty_day === e)?.holiday_slno ?? 0,
                                holiday_status: empArray?.find(em => em.duty_day === e)?.holiday_status ?? 0,
                                leave_status: empArray?.find(em => em.duty_day === e)?.leave_status ?? 0,
                                duty_desc: empArray?.find(em => em.duty_day === e)?.duty_desc ?? 'A',
                                lvereq_desc: empArray?.find(em => em.duty_day === e)?.lvereq_desc ?? 'A',
                                manual_request_flag: empArray?.find(em => em.duty_day === e)?.manual_request_flag ?? 0,
                            }
                        }),
                        totalDays: dateRange?.length,
                        totalP: empArray?.filter(el => el.lvereq_desc === "P" || el.lvereq_desc === "OHP" || el.lvereq_desc === "ODP" || el.lvereq_desc === "LC" || el.lvereq_desc === "OBS").length ?? 0,
                        totalWOFF: empArray?.filter(el => el.lvereq_desc === "WOFF").length ?? 0,
                        totalNOFF: empArray?.filter(el => el.lvereq_desc === "NOFF" || el.lvereq_desc === "DOFF").length ?? 0,
                        totalLC: empArray?.filter(el => el.lvereq_desc === "LC").length ?? 0,
                        totalHD: empArray?.filter(el => el.lvereq_desc === "CHD" || el.lvereq_desc === "HD" || el.lvereq_desc === "EGHD"
                            || el.lvereq_desc === 'HDSL' || el.lvereq_desc === 'HDCL').length ?? 0,
                        totalA: empArray?.filter(el => el.lvereq_desc === "A").length ?? 0,
                        totalLV: empArray?.filter(el => el.lvereq_desc === "COFF" || el.lvereq_desc === "CL" || el.lvereq_desc === "EL" || el.lvereq_desc === "SL").length ?? 0,
                        totalHDL: (empArray?.filter(el => el.lvereq_desc === "HCL").length ?? 0) * 1,
                        totaESI: empArray?.filter(el => el.lvereq_desc === "ESI").length ?? 0,
                        totaLWP: empArray?.filter(el => el.lvereq_desc === "LWP").length ?? 0,
                        totaH: empArray?.filter(el => el.lvereq_desc === "H").length ?? 0,
                        totaHP: grossSalary <= 25000 ? (empArray?.filter(el => el.lvereq_desc === "HP").length ?? 0) * 2 : (empArray?.filter(el => el.duty_desc === "HP").length ?? 0),
                        unauthorized: unauthorized
                    }
                })
                settableArray(resultss)
                setdaysStr(resultss?.filter(e => e.dateAray)?.find(e => e.dateAray)?.daysAry)
                setdaysNum(resultss?.filter(e => e.dateAray)?.find(e => e.dateAray)?.dateAray)
                // setOpenBkDrop(false)
            } else {
                infoNofity("No Punch Details")
                // setOpenBkDrop(false)
            }
        } else {
            warningNofity("Error While Getting Employees")
            // setOpenBkDrop(false)
        }
    }, [dept, section, selectedMonth])

    console.log(tableArray);


    return (
        <CustomLayout title="Doctor Punch View" displayClose={true} >
            <Box sx={{ width: '100%', }}>
                <Box sx={{ display: 'flex', mt: 1 }}>
                    <Box sx={{ flex: 1, px: 0.5 }} >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year', 'month']}
                                // minDate={subMonths(new Date(), 1)}
                                // maxDate={addMonths(new Date(), 1)}
                                value={selectedMonth}
                                onChange={(newValue) => {
                                    setSelectedMonth(newValue);
                                }}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                        <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <DoctorDepartment value={dept} setValue={changeDept} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <DoctorDepartmentSection value={section} setValue={changeSection} dept={dept} />
                    </Box>
                    {/* <Box sx={{ flex: 1, px: 0.5 }}>
                        <SectionBasedDoctors value={emply} setValue={getEmployee} sect={section} />
                    </Box> */}
                    <Box sx={{ mr: 1 }}>
                        <Button
                            aria-label="Like"
                            variant="outlined"
                            color="primary"
                            size='sm'
                            onClick={punchViewFunction}
                            fullWidth
                            startDecorator={<HourglassEmptyOutlinedIcon />}
                            sx={{ mx: 0.5 }}
                        >
                            Process & View
                        </Button>
                    </Box>
                </Box>
                <CssVarsProvider>
                    <Box p={1}>

                        <Preview empData={empdata} />
                    </Box>
                </CssVarsProvider>
            </Box>
        </CustomLayout>
    )
}

export default memo(DoctorPunchReport) 