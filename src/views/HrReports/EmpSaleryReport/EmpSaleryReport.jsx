import { Box, IconButton, Tooltip } from '@mui/joy'
import React, { useCallback, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import ReportLayout from '../ReportComponent/ReportLayout';
import { Paper } from '@mui/material';
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne';
import SectionBsdEmployee from 'src/views/Component/ReduxComponent/SectionBsdEmployee';
import { useDispatch } from 'react-redux';
import { setDepartment } from 'src/redux/actions/Department.action';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';

const EmpSaleryReport = () => {
    const [deptName, setDepartmentName] = useState(0)
    const [deptSecName, setDepartSecName] = useState(0)
    const [emply, getEmployee] = useState({});
    const [Empno, setEmpNo] = useState(0)
    const { em_no } = emply
    const [Data, setData] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])

    const getEmployeeList = useCallback(async (e) => {
        e.preventDefault();
        if (deptName !== 0 && deptSecName !== 0 && emply?.em_id === 0) {
            warningNofity("Please Select Employee")
        } else if (deptName !== 0 && deptSecName !== 0 && emply?.em_id !== 0) {
            const result = await axioslogin.get(`/empearndeduction/${em_no}`)
            const { success, data } = result.data;
            if (success === 1) {
                setData(data);
            }
            else if (success === 0) {
                infoNofity("No data Found")
                setData([])
            }
        }
        else {
            const result = await axioslogin.get(`/empearndeduction/${Empno}`)
            const { success, data } = result.data;
            if (success === 1) {
                setData(data);
            }
            else if (success === 0) {
                setData([])
                infoNofity("No data Found")
            }
        }
    }, [Empno, deptName, deptSecName, emply, em_no])
    const [columnDef] = useState([
        { headerName: 'Sl.No', field: 'slno', minWidth: 200, filter: true },
        { headerName: 'Wage Description', field: 'earnded_name', autoHeight: true, wrapText: true, minWidth: 550, filter: true },
        { headerName: 'Wage Type', field: 'earning_type_name', wrapText: true, minWidth: 550 },
        { headerName: 'Amount', field: 'em_amount', wrapText: true, minWidth: 310 }

    ])
    return (
        <Box sx={{ display: "flex", flexGrow: 1, width: "100%", }} >
            <ToastContainer />
            <ReportLayout title="Salary Reports" displayClose={true} data={Data} >
                <Paper sx={{ display: 'flex', flex: 1, flexDirection: 'column', }}>

                    <Box sx={{ mt: 1, ml: 0.5, display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Box sx={{ flex: 1, px: 0.5 }}>
                            <DepartmentDropRedx getDept={setDepartmentName} />
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5 }}>
                            <DepartmentSectionRedx getSection={setDepartSecName} />
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5 }}>
                            <SectionBsdEmployee getEmploy={getEmployee} />
                        </Box>
                        <Tooltip title="Employee Number" followCursor placement='top' arrow>
                            <Box sx={{ flex: 1, px: 0.5, }}>
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
                        <Box sx={{ px: 0.2 }}>

                            <IconButton variant="outlined" size='md' color="primary"
                                onClick={getEmployeeList}
                            >
                                <PublishedWithChangesIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column", width: "100%" }} >
                        <CustomAgGridRptFormatOne
                            tableDataMain={Data}
                            columnDefMain={columnDef}
                        />
                    </Paper>

                </Paper>
            </ReportLayout>
        </Box >
    )
}

export default EmpSaleryReport