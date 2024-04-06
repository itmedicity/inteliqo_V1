import { Paper, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useState } from 'react'
import { useMemo } from 'react'
import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getCommonLeaveData } from 'src/redux/actions/LeaveReqst.action'
import DepartmentSection from './Func/DepartmentSection'
import EmployeeAgainSection from './Func/EmployeeAgainSection'
import LeaveRequestType from './Func/LeaveRequestType'
import { Actiontypes } from 'src/redux/constants/action.type'
import { Button, CssVarsProvider, Input, Tooltip } from '@mui/joy'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import RefreshIcon from '@mui/icons-material/Refresh';
import { lazy } from 'react'
import { Suspense } from 'react'

const HrRoleBasedDepartmentAndSection = lazy(() => import('./Func/DepartmentBasedSection'))

const LeaveRequestEmployeeSelection = () => {
    const dispatch = useDispatch();

    const { FETCH_LEAVE_REQUEST, LEAVE_REQ_DEFAULT } = Actiontypes;

    //get the employee details for taking the HOd and Incharge Details
    const employeeState = useSelector((state) => state.getProfileData.ProfileData,);
    const singleLeaveTypeFormData = useSelector((state) => state.singleLeaveRequestFormState.leaveReqState);

    const commonSettings = useSelector((state) => state?.getCommonSettings)
    const { group_slno } = commonSettings;
    console.log(group_slno)

    const singleLevFormData = useMemo(() => singleLeaveTypeFormData, [singleLeaveTypeFormData])
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);

    const { formSubmit } = singleLevFormData;
    const { hod, incharge, em_no, em_name, sect_name, em_dept_section } = employeeProfileDetl;

    const [deptSection, setDeptSection] = useState(0);
    const [employeeID, setEmployeeID] = useState(0);
    const [levReq, setLevReq] = useState(0);

    const onSubmitLeaveRequestEntry = (e) => {

        if (hod === 1 || incharge === 1) {
            // this employee is a hod or incharge
            if (deptSection === 0) {
                warningNofity("Section Not Selected")
            } else if (employeeID === 0) {
                warningNofity("Employee Not Selected")
            } else if (levReq === 0) {
                warningNofity("Request Type Not Selected")
            } else {
                let empDetl = {
                    deptSection: deptSection,
                    empNo: employeeID,
                    requestType: levReq
                }
                dispatch({ type: FETCH_LEAVE_REQUEST, payload: empDetl });
                //console.log(` emp selectio hod ${em_no} `)
                // dispatch(getCommonLeaveData(em_no));
            }

        } else {
            // normal employee
            if (levReq === 0) {
                warningNofity("Request Type Not Selected")
            } else {
                let empDetl = {
                    deptSection: em_dept_section,
                    empNo: em_no,
                    requestType: levReq
                }
                dispatch({ type: FETCH_LEAVE_REQUEST, payload: empDetl })
                dispatch(getCommonLeaveData(em_no));
            }
        }
    }

    const changeForm = () => {
        let requestType = { requestType: 0 };
        dispatch({ type: FETCH_LEAVE_REQUEST, payload: requestType })
        dispatch({ type: LEAVE_REQ_DEFAULT })
    }


    return (
        <Paper variant="outlined" sx={{ display: "flex", p: 0.3, mb: 0.5, alignItems: 'center' }} >

            <Suspense fallback={<div>Loding....</div>} >
                {true && <HrRoleBasedDepartmentAndSection />}
            </Suspense>


            {
                (hod === 1 || incharge === 1)
                    ?
                    <Box sx={{
                        display: 'flex',
                        flex: 1,
                        alignItems: 'center',
                        px: 0.3
                    }} >
                        <DepartmentSection
                            setSection={setDeptSection}
                            sectionVal={deptSection}
                            formSubmit={formSubmit}
                        />
                    </Box>
                    :
                    <Box sx={{
                        display: 'flex',
                        flex: 1,
                        alignItems: 'center',
                        px: 0.3
                    }} >
                        <Input
                            size="sm"
                            fullWidth
                            value={em_name}
                            disabled
                        />
                        {/* <TextField
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={sect_name}
                            sx={{ display: 'flex', mt: 0.5 }}
                            disabled
                        /> */}
                    </Box>
            }

            {
                (hod === 1 || incharge === 1) ?
                    <Box sx={{
                        display: 'flex',
                        flex: 1,
                        alignItems: 'center',
                        px: 0.3
                    }}>
                        <EmployeeAgainSection
                            section={deptSection}
                            setEmployeeId={setEmployeeID}
                            employeeId={employeeID}
                            formSubmit={formSubmit}
                        />
                    </Box> :
                    <Box sx={{
                        display: 'flex',
                        flex: 1,
                        alignItems: 'center',
                        px: 0.3
                    }}>
                        <Input
                            size="sm"
                            fullWidth
                            value={em_name}
                            disabled
                        />
                        {/* <TextField
                            variant="outlined"
                            fullWidth
                            value={em_name}
                            size="small"
                            sx={{ display: 'flex', mt: 0.5 }}
                            disabled
                             
                        /> */}
                    </Box>
            }
            <Box sx={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                px: 0.3
            }}>
                {/* <TextField
                    variant="outlined"
                    fullWidth
                    size="small"
                    disabled
                    value={(hod === 1 || incharge === 1) ? employeeID : em_no}
                    sx={{ display: 'flex', mt: 0.5 }}
                /> */}
                <Input
                    size="sm"
                    fullWidth
                    value={(hod === 1 || incharge === 1) ? employeeID : em_no}
                    disabled
                />
            </Box>
            <Box sx={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                px: 0.3
            }}>
                <LeaveRequestType
                    empstatus={employeeID}
                    onChange={setLevReq}
                    onChangeVal={levReq}
                />
            </Box>
            <Box sx={{ display: "flex", p: 0.2 }} >
                <CssVarsProvider>
                    <Tooltip title="Process" followCursor placement='top' arrow >
                        <Button
                            aria-label="Like"
                            variant="outlined"
                            color="primary"
                            onClick={onSubmitLeaveRequestEntry}
                            size='sm'
                        >
                            <AddCircleOutlineIcon />
                        </Button>
                    </Tooltip>
                </CssVarsProvider>
            </Box>
            <Box sx={{ display: "flex", p: 0.2 }} >
                <CssVarsProvider>
                    <Tooltip title="Clear Data" followCursor placement='top' arrow >
                        <Button
                            aria-label="Like"
                            variant="outlined"
                            color="primary"
                            onClick={() => changeForm()}
                            size='sm'
                        >
                            <RefreshIcon />
                        </Button>
                    </Tooltip>
                </CssVarsProvider>
            </Box>
        </Paper>
    )
}

export default memo(LeaveRequestEmployeeSelection)