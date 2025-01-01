import React, { Fragment, Suspense, useCallback, useContext, useEffect, useState } from 'react'
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import SectionBsdEmployee from 'src/views/Component/ReduxComponent/SectionBsdEmployee';
import SearchIcon from '@mui/icons-material/Search';
// import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
// import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect';
// import EmployeeNameSelect from 'src/views/CommonCode/EmployeeNameSelect';
// import { MdOutlineAddCircleOutline } from 'react-icons/md'
// import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant';
// import { IconButton } from '@mui/material'
// import { useHistory } from 'react-router-dom'
// import { PayrolMasterContext } from 'src/Context/MasterContext';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
// import { LinearProgress } from '@mui/material'
import LeaveCarryRow from './LeaveCarryRow';
// import { getYear } from 'date-fns';
// import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import { Box, Button, LinearProgress, Table, Tooltip } from '@mui/joy';
import { setDepartment } from 'src/redux/actions/Department.action';
import { useDispatch } from 'react-redux';
import { Paper } from '@mui/material';
import { screenInnerHeight } from 'src/views/Constant/Constant';
import { getYear } from 'date-fns';

const LeaveCarryForwad = () => {

    const [dept, changeDept] = useState(0)
    const [deptsection, changeSection] = useState(0)
    const [emply, getEmployee] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setDepartment());
        //dispatch(setCommonSetting())
    }, [dispatch])


    // const { selectDeptSection, selectEmpName } = useContext(PayrolMasterContext);
    // const { employeedetails } = useContext(PayrolMasterContext)
    // const { em_id } = employeedetails
    // const history = useHistory();
    const [edit, setedit] = useState({
        EL: 0,
        CL: 0,
        SL: 0,
        HL: 0
    })
    const [lcmast, setLcMast] = useState({
        emp_type: 0,
        el: 0,
        cl: 0,
        sl: 0,
        hl: 0
    })

    // //getting the leave carry forwad year
    const year = getYear(new Date()) - 1
    const [emp_id, setemp_id] = useState(0)
    const [emp_tpe, setemp_type] = useState(0)
    // const [tableflag, setTableFlag] = useState(0)
    const [name, setname] = useState([])

    const getEmpdata = useCallback(async () => {
        // if ((selectEmpName === 0)) {
        //     const result = await axioslogin.get(`/common/getEmpNameCategory/${selectDeptSection}`)
        //     const { success, data } = result.data;
        //     if (success === 1) {
        //         setname(data)
        //         setTableFlag(1)
        //     }
        //     else {
        //         warningNofity("No Employee in this department")
        //         setTableFlag(0)
        //     }
        // } else 
        if (emply?.em_id !== 0 !== 0) {
            const result = await axioslogin.get(`/common/getENameLeaveCarry/${emply?.em_id}`)
            const { success, data } = result.data;
            if (success === 1) {
                console.log(data);
                setname(data)
                //setTableFlag(1)
            }
            else {
                warningNofity("No Employee in this department")
                //setTableFlag(0)
            }
        }
    }, [emply, deptsection])

    // useEffect(() => {
    //     if (selectDeptSection !== 0) {
    //         const getLeavecarryMast = async () => {
    //             const result = await axioslogin.get(`/CarryLeave/${selectDeptSection}`)
    //             const { success, data } = result.data;
    //             if (success === 1) {
    //                 const { emp_type, carry_hl, carry_cl, carry_el, carry_sl } = data[0]
    //                 const frmdata = {
    //                     emp_type: emp_type,
    //                     el: carry_el,
    //                     cl: carry_cl,
    //                     sl: carry_sl,
    //                     hl: carry_hl
    //                 }
    //                 setLcMast(frmdata)
    //             }
    //         }
    //         getLeavecarryMast();
    //     }
    //     setTableFlag(0)
    // }, [selectDeptSection])

    const postdata = {
        emp_id: emp_id,
        cl_carry: 1,
        hdl_carry: 1,
        el_carry: 1,
        sl_carry: 1,
        carry_cl: edit.CL,
        carry_hdl: edit.HL,
        carry_el: edit.EL,
        carry_sl: edit.SL,
        carry_year: year,
        //create_user: em_id
    }
    const reset = {
        EL: 0,
        CL: 0,
        SL: 0,
        HL: 0
    }

    const setCarryForwardLeave = async (e) => {
        e.preventDefault()
        const result = await axioslogin.post('/CarryLeave', postdata)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message);
            setedit(reset)
        } else if (success === 2) {
            succesNofity(message);
            setedit(reset)
        }
    }

    // const redirect = () => {
    //     history.push('/Home');
    // }

    return (
        <>
            <CustomLayout title="Annual Leave Process" displayClose={true} >
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <Box sx={{ mt: 1, ml: 0.5, display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', flexWrap: "wrap", gap: 0.5 }} >
                            <Box sx={{ flex: 1, px: 0.5 }}>
                                <DepartmentDropRedx getDept={changeDept} />
                            </Box>
                            <Box sx={{ flex: 1, px: 0.5 }}>
                                <DepartmentSectionRedx getSection={changeSection} />
                            </Box>
                            <Box sx={{ flex: 1, px: 0.5 }}>
                                <SectionBsdEmployee getEmploy={getEmployee} />
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
                        <Box sx={{}}>
                            <Paper variant="outlined"
                                sx={{
                                    maxHeight: screenInnerHeight * 40 / 100, m: 0.3,
                                    overflow: 'auto',

                                }} >
                                <Table
                                    aria-label="table with sticky header"
                                    stickyHeader
                                    // borderAxis="xBetween"
                                    color="neutral"
                                    size="sm"
                                    variant="plain"
                                >
                                    <thead>
                                        <tr>
                                            <th style={{ width: '20%', textAlign: 'center', }}>Employee ID</th>
                                            <th style={{ textAlign: 'center', }}>Employee Name</th>
                                            <th style={{ textAlign: 'center', }}>Working Days</th>
                                            <th style={{ textAlign: 'center', }}>Allowed EL</th>
                                            <th style={{ textAlign: 'center', }}>Allowed CL</th>
                                            <th style={{ textAlign: 'center', }}>Allowed HL</th>
                                            <th style={{ textAlign: 'center', }}>Process</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <Suspense fallback={<LinearProgress />} >
                                            <LeaveCarryRow name={name}
                                                setedit={setedit}
                                                edit={edit}
                                                setCarryForwardLeave={setCarryForwardLeave}
                                                setemp_id={setemp_id}
                                                setemp_type={setemp_type}
                                                emp_tpe={emp_tpe}
                                                setLcMast={setLcMast}
                                                lcmast={lcmast} />
                                        </Suspense>
                                    </tbody>
                                </Table>
                            </Paper>
                        </Box>
                    </Box>
                </Box>
            </CustomLayout>
        </>
        // <Fragment>
        //     <PageLayoutCloseOnly
        //         heading="Leave Carry Forwad"
        //         redirect={redirect}
        //     >
        //         <div className="col-md-12 mb-2">
        //             <div className="row g-2">
        //                 <div className="col-md-3">
        //                     <DepartmentSelect select="Department" style={SELECT_CMP_STYLE} />
        //                 </div>
        //                 <div className="col-md-3">
        //                     <DepartmentSectionSelect select="Department" style={SELECT_CMP_STYLE} />
        //                 </div>
        //                 <div className="col-md-3">
        //                     <EmployeeNameSelect select="Department Section" style={SELECT_CMP_STYLE} />
        //                 </div>
        //                 <div className="col-md-1 text-center">
        //                     <IconButton
        //                         aria-label="add"
        //                         style={{ padding: '0rem' }}
        //                         onClick={() => {
        //                             gettable()
        //                         }}
        //                     >
        //                         <MdOutlineAddCircleOutline className="text-info" size={30} />
        //                     </IconButton>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="col-md-12">
        //             {tableflag === 1 ?
        //                 <div className="row g-1 ">
        //                     <div className="card ">
        //                         <div className="col-md-12 pt-1">
        //                             <TableContainer sx={{ maxHeight: 500 }}>
        //                                 <Table size="small"
        //                                     stickyHeader aria-label="sticky table">
        //                                     <TableHead>
        //                                         <TableRow >
        //                                             <TableCell align="center">Employee ID</TableCell>
        //                                             <TableCell align="center">Employee Name</TableCell>
        //                                             <TableCell align="center">CL</TableCell>
        //                                             <TableCell align="center">HDL</TableCell>
        //                                             <TableCell align="center">EL</TableCell>
        //                                             <TableCell align="center">SL</TableCell>
        //                                             <TableCell align="center"></TableCell>
        //                                         </TableRow>
        //                                     </TableHead>
        //                                     <TableBody>
        //                                         <Suspense fallback={<LinearProgress />} >
        //                                             <LeaveCarryRow name={name}
        //                                                 setedit={setedit}
        //                                                 edit={edit}
        //                                                 setCarryForwardLeave={setCarryForwardLeave}
        //                                                 setemp_id={setemp_id}
        //                                                 setemp_type={setemp_type}
        //                                                 emp_tpe={emp_tpe}
        //                                                 setLcMast={setLcMast}
        //                                                 lcmast={lcmast} />
        //                                         </Suspense>
        //                                     </TableBody>
        //                                 </Table>
        //                             </TableContainer>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 : null
        //             }
        //         </div>
        //     </PageLayoutCloseOnly>
        // </Fragment >
    )
}

export default LeaveCarryForwad