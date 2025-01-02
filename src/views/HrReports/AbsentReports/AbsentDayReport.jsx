import { Box, Button, Input, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import React, { memo, useCallback, useEffect, useState } from 'react'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import ReportWithFunction from '../ReportComponent/ReportWithFunction'
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import { setDepartment } from 'src/redux/actions/Department.action'
import { useDispatch } from 'react-redux'
import SearchIcon from '@mui/icons-material/Search';
import { axioslogin } from 'src/views/Axios/Axios'
import { endOfMonth, format, isValid, startOfMonth } from 'date-fns'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'

const AbsentDayReport = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])


    const [value, setValue] = useState(new Date());
    const [all, setAll] = useState(false)
    const [deptartment, setDepart] = useState(0)
    const [section, setDepartSection] = useState(0)
    const [openBkDrop, setOpenBkDrop] = useState(false)
    const [tableData, setTableData] = useState([])
    const [click, setClick] = useState(0)

    const getEmpdata = useCallback(async () => {
        if (all === true && deptartment === 0 && section === 0) {

        } else {
            const getEmpData = {
                em_department: deptartment,
                em_dept_section: section,
            }
            const result1 = await axioslogin.post("/payrollprocess/getEmpNoDeptWise", getEmpData);
            const { succes, dataa: employeeData } = result1.data
            if (succes === 1) {
                const arr = employeeData?.map((val) => val.em_no)
                const getPunchMast_PostData = {
                    fromDate_punchMaster: isValid(new Date(value)) ? format(startOfMonth(new Date(value)), 'yyyy-MM-dd') : null,
                    toDate_punchMaster: isValid(new Date(value)) ? format(endOfMonth(new Date(value)), 'yyyy-MM-dd ') : null,
                    empList: arr,
                }
                const punch_master_data = await axioslogin.post("/attendCal/getPunchMasterDataSectionWise/", getPunchMast_PostData); //GET PUNCH MASTER DATA
                const { success, planData: punchMasterData } = punch_master_data.data;

                if (success === 1) {
                    const newArr = employeeData?.map((val) => {
                        return {
                            emno: val.em_no,
                            desg_name: val.desg_name,
                            arr: punchMasterData?.filter((i) => i.em_no === val.em_no && (i.duty_desc === 'COFF'
                                || i.duty_desc === 'CL' && i.duty_desc === 'EL' || i.duty_desc === 'SL'
                                || i.duty_desc === 'ML' || i.duty_desc === 'LWP' || i.duty_desc === 'ESI'))

                        }
                    })
                } else {

                }
            } else {
                warningNofity("No Employee Under This Department!")
            }
        }
    }, [all, deptartment, section, value])

    const toDownload = async () => {

    }
    return (
        <ReportWithFunction title="Absent Day Report" displayClose={true} download={toDownload} >
            <Box sx={{
                display: 'flex', flexDirection: 'column',
                overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
            }}>
                <Paper variant='outlined' sx={{ display: "flex", alignItems: "center", border: 0, py: 0.5, }}  >
                    <Box sx={{ mt: 1, ml: 0.5, display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', flexWrap: "wrap", gap: 0.5 }} >
                        <Box sx={{ px: 0.5, display: "flex", flexDirection: "row" }} >
                            <Typography sx={{ p: 1 }}>From:</Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['year', 'month']}
                                    // minDate={subMonths(new Date(), 1)}
                                    //maxDate={addMonths(new Date(), 1)}
                                    value={value}
                                    size="small"
                                    onChange={(newValue) => { setValue(newValue) }}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ px: 0.3, mt: 1 }} >
                            <JoyCheckbox
                                label='All'
                                name="all"
                                checked={all}
                                onchange={(e) => setAll(e.target.checked)}
                            />
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5, width: '20%', }}>
                            <DepartmentDropRedx getDept={setDepart} />
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5, width: '50%' }}>
                            <DepartmentSectionRedx getSection={setDepartSection} />
                        </Box>
                        <Box sx={{
                            display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, },
                            justifyContent: 'flex-start', pl: 0.5,
                        }} >
                            <Tooltip title="Save" followCursor placement='top' arrow >
                                <Button
                                    aria-label="Like"
                                    variant="outlined"
                                    color="primary"
                                    onClick={getEmpdata}
                                    fullWidth
                                    startDecorator={<SearchIcon />}
                                    sx={{ mx: 0.5 }}
                                >
                                    Search
                                </Button>
                            </Tooltip>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </ReportWithFunction>
    )
}

export default memo(AbsentDayReport)