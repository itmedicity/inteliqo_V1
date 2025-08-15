import { Box, IconButton, CssVarsProvider, Typography, Input, Button } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import ReportLayout from '../ReportComponent/ReportLayout';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import BranchSelectRedux from 'src/views/MuiComponents/BranchSelectRedux'
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne';
import { axioslogin } from 'src/views/Axios/Axios';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';

const ActiveDoctorReport = () => {
    // const [deptName, setDepartmentName] = useState(0)
    // const [deptSecName, setDepartSecName] = useState(0)
    // const [Empno, setEmpNo] = useState({})
    const [branch, setBranch] = useState(0)

    //const [fromdate, Setfromdate] = useState(moment(new Date()));
    //const [todate, Settodate] = useState(moment(new Date()));
    const [tableData, setTableData] = useState([])
    const [openBkDrop, setOpenBkDrop] = useState(false)
    const [all, setAll] = useState(false)

    const [columnDefMain] = useState([
        { headerName: 'Emp No', field: 'em_no' },
        { headerName: 'Name ', field: 'em_name' },
        { headerName: 'Date Of Birth ', field: 'em_dob' },
        { headerName: 'Gender ', field: 'em_gender' },
        { headerName: 'Date Of Joining ', field: 'em_doj' },
        { headerName: 'Mobile No ', field: 'em_mobile' },
        { headerName: 'Mail ID', field: 'em_email' },
        { headerName: 'Branch ', field: 'branch_name' },
        { headerName: 'Dept Name ', field: 'dept_name' },
        { headerName: 'Dept Section ', field: 'sect_name' },
        { headerName: 'Institution Type ', field: 'inst_emp_type' },
        { headerName: 'Designation ', field: 'desg_name' },
        { headerName: 'Category ', field: 'ecat_name' },
        { headerName: 'Adhaar Number', field: 'em_adhar_no' },
        { headerName: 'Account Number', field: 'em_account_no' },
        { headerName: 'Passport Number', field: 'em_passport_no' },
        { headerName: 'PAN Number', field: 'em_pan_no' },
        { headerName: 'ESI Number', field: 'em_esi_no' },
        { headerName: 'PF Number', field: 'em_pf_no', minWidth: 200 },
        { headerName: 'LWF Number', field: 'lwfnumber' },
        { headerName: 'Retirement Date ', field: 'em_retirement_date' },
        { headerName: 'Address1 ', field: 'addressPresent1', minWidth: 200 },
        { headerName: 'Address2 ', field: 'addressPresent2', minWidth: 200 },
        { headerName: 'Pin', field: 'hrm_pin2' },
        { headerName: 'Gross Salary', field: 'gross_salary' },
    ])

    const getemployeedetails = useCallback(async () => {
        setOpenBkDrop(true)
        if (all === true) {
            const branch_slno = [branch]
            const result = await axioslogin.get('/ActiveEmpReport/allactive/doctors')
            const { success, data } = result.data;

            if (success === 1) {
                setTableData(data)
                setOpenBkDrop(false)
            }
            else {
                setTableData([])
                setOpenBkDrop(false)
            }
        } else {

            const branch_slno = [branch]
            const result = await axioslogin.post('/ActiveEmpReport/active/doctors', branch_slno)
            const { success, data } = result.data;

            if (success === 1) {
                setTableData(data)
                setOpenBkDrop(false)
            }
            else {
                setTableData([])
                setOpenBkDrop(false)
            }
        }

    }, [branch, all])

    return (
        <Box sx={{ display: "flex", flexGrow: 1, width: "100%", }} >
            <ToastContainer />
            <CustomBackDrop open={openBkDrop} text="Please wait !.. Processing Data... " />
            <ReportLayout title="Active Doctors Report" displayClose={true} data={tableData} >
                <Box sx={{ width: '100%', p: 0.5, display: 'flex', flexDirection: 'column' }}  >
                    <Box sx={{ width: '100%', p: 0.5, display: 'flex', flexDirection: 'row' }}  >
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
                            <BranchSelectRedux value={branch} setValue={setBranch} />
                        </Box>
                        {/* <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
                        <DeptSelectByRedux value={dept} setValue={setDept} />
                    </Box>*/}

                        {/* <DeptSecSelectByRedux dept={dept} value={deptSect} setValue={setDeptSect} /> */}
                        <Box sx={{ px: 0.3, mt: 1 }} >
                            <JoyCheckbox
                                label='All'
                                name="all"
                                checked={all}
                                onchange={(e) => setAll(e.target.checked)}
                            />
                        </Box>
                        <Box sx={{ mt: 0.5, px: 0.3 }} >
                            <Button
                                aria-label="Like"
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                    getemployeedetails()
                                }}
                                endDecorator={<Box>Search</Box>}
                            >
                                <PersonSearchIcon />
                            </Button>
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
                        </Box>
                    </Box>
                    <Box
                        sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column", width: "100%" }} >
                        <CustomAgGridRptFormatOne
                            tableDataMain={tableData}
                            columnDefMain={columnDefMain}
                        />
                    </Box>
                </Box>
            </ReportLayout >
        </Box >
    )
}

export default ActiveDoctorReport