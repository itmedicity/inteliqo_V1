import { Button, CssVarsProvider, Tooltip } from '@mui/joy';
import { Box, FormControl, MenuItem, Paper, Select, TextField, } from '@mui/material';
import React, { Fragment, memo, Suspense, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import _ from 'underscore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LinearProgreeBar from 'src/views/Component/MuiCustomComponent/LinearProgreeBar';
import OneHourRequest from './CommonReqstComponent/OneHourRequest';
import OnDutyRequest from './CommonReqstComponent/OnDutyRequest';
import MissPunchrequest from './CommonReqstComponent/MissPunchrequest';
import Generalrequest from './CommonReqstComponent/Generalrequest';
import { getEmployeeApprovalLevel, getEmployeeInformation, getHodBasedDeptSectionName } from 'src/redux/actions/LeaveReqst.action';
import { ToastContainer } from 'react-toastify';
import DeptSectionSelect from '../NightOff/DeptSectionSelect';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import DeptWiseEmployeeSelect from './CommonReqstComponent/DeptWiseEmployeeSelect';
import TableViewPage from './TableViewPage';

const CommonReqstMainPage = () => {

    const dispatch = useDispatch();

    const [reqestType, setrequestType] = useState(0)//for select reqst type
    const [employee, setEmployee] = useState(0)//select employee
    const [deptSection, setDeptSection] = useState(0);//select dept section
    const [selectedEmp, setSelectedEmp] = useState(0)

    const [show, setShow] = useState(0)

    //get the employee details for taking the HOd and Incharge Details
    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { hod, incharge, em_id, em_no, em_name, sect_name, em_dept_section } = employeeProfileDetl;


    useEffect(() => {
        if (hod === 1 || incharge === 1) {
            dispatch(getEmployeeInformation(selectedEmp))
            dispatch(getHodBasedDeptSectionName(em_id));
        } else {
            dispatch(getEmployeeInformation(em_id))
        }
        dispatch(getEmployeeApprovalLevel(em_id))
    }, [em_id, dispatch, selectedEmp, hod, incharge])

    const reqstArray = [
        //{ reqNo: 1, name: 'Enable Miss Punch for OT' },
        { reqNo: 2, name: 'On Duty Request' },
        { reqNo: 3, name: 'One Hour Request' },
        //{ reqNo: 4, name: 'General Request' },
    ]

    useEffect(() => {
        if ((hod === 1 || incharge === 1) && reqestType === 4) {
            setDeptSection(em_dept_section)
            setEmployee(em_no)
            dispatch(getEmployeeInformation(em_id))
        } else {
            dispatch(getEmployeeInformation(em_id))
        }
    }, [reqestType, em_no, em_dept_section, hod, incharge, dispatch, em_id])

    const requestEntry = (e) => {
        if (hod === 0 || incharge === 0) {
            // normal employee
            if (reqestType === 0) {
                warningNofity("Request Type Not Selected")
            } else {
                if (reqestType === 1) {
                    setShow(1)
                } else if (reqestType === 2) {
                    setShow(2)
                } else if (reqestType === 3) {
                    setShow(3)
                } else if (reqestType === 4) {
                    setShow(4)
                }
            }
        } else {
            // this employee is a hod or incharge
            if (deptSection === 0) {
                warningNofity("Department Section Not Selected")
            } else if (employee === 0) {
                warningNofity("Employee Not Selected")
            } else if (reqestType === 0) {
                warningNofity("Request Type Not Selected")
            } else {
                if (reqestType === 1) {
                    setShow(1)
                } else if (reqestType === 2) {
                    setShow(2)
                } else if (reqestType === 3) {
                    setShow(3)
                } else if (reqestType === 4) {
                    setShow(4)
                }
            }
        }
    }

    return (
        <Fragment>

            <CustomLayout title="Common Request" displayClose={true} >
                <ToastContainer />
                <Box sx={{ display: 'flex', flex: 1, px: 0.8, mt: 0.3, flexDirection: 'column' }}>
                    <Paper variant='outlined' elevation={0} sx={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', p: 0.5 }}>
                        <Box sx={{ width: '24%', mt: 0.5, px: 0.3 }}>
                            <FormControl
                                fullWidth
                                size='small'   >
                                <Select
                                    value={reqestType}
                                    onChange={(e) => setrequestType(e.target.value)}
                                    size="small"
                                    fullWidth
                                    variant='outlined'
                                >
                                    <MenuItem disabled value={0} >
                                        Select Request Type
                                    </MenuItem>
                                    {
                                        reqstArray?.map((val, ind) => {
                                            return <MenuItem key={ind} value={val.reqNo}>{val.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Box>

                        {
                            (hod === 1 || incharge === 1) ?
                                <Box sx={{ width: '24%', alignItems: 'center', mt: 0.5, px: 0.3 }} >
                                    <DeptSectionSelect em_id={em_id} value={deptSection} setValue={setDeptSection} />
                                </Box>
                                : <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
                                    <TextField
                                        fullWidth
                                        id="fullWidth"
                                        size="small"
                                        value={sect_name}
                                        disabled
                                    />
                                </Box>
                        }

                        {
                            (hod === 1 || incharge === 1) ?
                                <Box sx={{ width: '24%', alignItems: 'center', mt: 0.5, px: 0.3 }} >
                                    <DeptWiseEmployeeSelect value={employee} setValue={setEmployee} deptSect={deptSection} setSelectedEmp={setSelectedEmp} />
                                </Box> :
                                <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
                                    <TextField
                                        fullWidth
                                        id="fullWidth"
                                        size="small"
                                        value={em_name}
                                        disabled
                                    />
                                </Box>
                        }
                        <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', mt: 0.5, px: 0.3 }}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                size="small"
                                disabled
                                value={(hod === 1 || incharge === 1) ? employee : em_no}
                                sx={{ display: 'flex', }}
                            />
                        </Box>
                        <Box sx={{ display: "flex", p: 0.2 }} >
                            <CssVarsProvider>
                                <Tooltip title="Show Data" followCursor placement='top' arrow >
                                    <Button
                                        aria-label="Like"
                                        variant="outlined"
                                        color="primary"
                                        onClick={requestEntry}
                                        sx={{
                                            // color: 'green',
                                        }}
                                    >
                                        <AddCircleOutlineIcon />
                                    </Button>
                                </Tooltip>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                    <Suspense fallback={<LinearProgreeBar />} >
                        {
                            show === 1 ? <MissPunchrequest /> :
                                show === 2 ? <OnDutyRequest /> :
                                    show === 3 ? <OneHourRequest /> :
                                        show === 4 ? <Generalrequest /> : null
                        }
                    </Suspense>
                    <TableViewPage show={show} />

                </Box>
            </CustomLayout>
        </Fragment>
    )
}

export default memo(CommonReqstMainPage) 