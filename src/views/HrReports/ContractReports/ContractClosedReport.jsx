import React, { Fragment, useState, useEffect, useCallback, useMemo, memo } from 'react'
import { useDispatch } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { ToastContainer } from 'react-toastify'
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { Box, IconButton } from '@mui/joy';
import ReportLayout from '../ReportComponent/ReportLayout';
import { Paper } from '@mui/material';
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne';
import { setDepartment } from 'src/redux/actions/Department.action';
import JoyBranchSelect from 'src/views/MuiComponents/JoyComponent/JoyBranchSelect';

const ContractClosedReport = () => {

    /** Initiliazing values */
    const [TableData, setTableData] = useState([]);
    const dispatch = useDispatch();
    const [deptName, setDepartmentName] = useState(0)
    const [deptSecName, setDepartSecName] = useState(0)
    const [branch, setBranch] = useState(0)

    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])
    /** stored department slno, department section slno, ebranch slno as postDataemp for API Call */
    const postDataemp = useMemo(() => {
        return {
            branch_slno: branch,
            dept_id: deptName,
            sect_id: deptSecName
        }
    }, [branch, deptName, deptSecName])

    /** report ag grid table heading */
    const [columnDef] = useState([
        { headerName: 'New Emp No', field: 'new_emno' },
        { headerName: 'New Doj ', field: 'NewDoj' },
        { headerName: 'Old Emp No', field: 'oldemo' },
        { headerName: 'Old Doj ', field: 'oldDoj' },
        { headerName: 'Name ', field: 'em_name' },
        { headerName: 'Branch ', field: 'branch_name' },
        { headerName: 'Dept Name ', field: 'dept_name' },
        { headerName: 'Dept Section ', field: 'sect_name' },
        { headerName: 'Designation ', field: 'desg_name' },
        { headerName: 'Category ', field: 'ecat_name' },
        { headerName: 'Retirement Date ', field: 'em_retirement_date' },
        { headerName: 'Status ', field: 'Status' },
    ])
    const BranchData = useMemo(() => {
        return {
            branch_slno: branch,
        }
    }, [branch])

    /** Selected checkbox list sumbitted,  to get corresponding data from databse */
    const getContractClosed = useCallback((e) => {
        e.preventDefault();
        /** branch wise contract closed report  */
        const getBranchContractClosed = async () => {

            const result = await axioslogin.post('/ContractReport/branchcontractclosed', BranchData)
            const { success, data } = result.data;

            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }

        /** Selected branch, department, dept section contract closed report  */
        const getContractClosedReport = async (postDataemp) => {
            const result = await axioslogin.post('/ContractReport/contractclosed', postDataemp)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        if (branch !== 0 && deptName === 0 && deptSecName === 0) {
            getBranchContractClosed(BranchData)
        }

        else if (branch !== 0 && deptName !== 0 && deptSecName !== 0) {
            getContractClosedReport(postDataemp)
        }
        else {
            warningNofity("Please Select Any Of The Item")
        }
    }, [branch, deptName, deptSecName, postDataemp, BranchData])

    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{ display: "flex", flexGrow: 1, width: "100%", }} >
                <ToastContainer />
                <ReportLayout title="Employee Contract Closed Report" displayClose={true} data={TableData} >
                    <Paper sx={{ display: 'flex', flex: 1, flexDirection: 'column', }}>

                        <Box sx={{ mt: 1, ml: 0.5, display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                            <Box sx={{ flex: 1, px: 0.5 }} >
                                <JoyBranchSelect value={branch} setValue={setBranch} />
                            </Box>
                            <Box sx={{ flex: 1, px: 0.5 }}>
                                <DepartmentDropRedx getDept={setDepartmentName} />
                            </Box>
                            <Box sx={{ flex: 1, px: 0.5 }}>
                                <DepartmentSectionRedx getSection={setDepartSecName} />
                            </Box>

                            <Box sx={{ p: 0.2 }}>

                                <IconButton variant="outlined" size='md' color="primary"
                                    onClick={getContractClosed}
                                >
                                    <PublishedWithChangesIcon />
                                </IconButton>

                            </Box>
                        </Box>
                        <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column", width: "100%" }} >
                            <CustomAgGridRptFormatOne
                                tableDataMain={TableData}
                                columnDefMain={columnDef}
                            />
                        </Paper>

                    </Paper>
                </ReportLayout>
            </Box >

        </Fragment>
    )
}

export default memo(ContractClosedReport)