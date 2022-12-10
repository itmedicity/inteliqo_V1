import { Paper, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { getEmpNameHodSectionBased, getHodBasedDeptSectionName } from 'src/redux/actions/LeaveReqst.action'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import TextInput from 'src/views/Component/TextInput'
import _ from 'underscore'
import DepartmentSection from './Func/DepartmentSection'
import EmployeeAgainSection from './Func/EmployeeAgainSection'
import LeaveRequestType from './Func/LeaveRequestType'
import { Actiontypes } from 'src/redux/constants/action.type'
import { Button, CssVarsProvider } from '@mui/joy'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { warningNofity } from 'src/views/CommonCode/Commonfunc'

const LeaveRequestEmployeeSelection = () => {
    const dispatch = useDispatch();

    const { FETCH_LEAVE_REQUEST } = Actiontypes;

    //get the employee details for taking the HOd and Incharge Details
    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { hod, incharge, em_id, em_no, em_name, sect_name, em_dept_section } = employeeProfileDetl;

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
                dispatch({ type: FETCH_LEAVE_REQUEST, payload: empDetl })
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
            }
        }

    }

    return (
        <Paper variant="outlined" sx={{ display: "flex", p: 0.3, mb: 0.5, alignItems: 'center', }} >
            {
                (hod === 1 || incharge === 1) ?
                    <Box sx={{
                        display: 'flex',
                        flex: 1,
                        alignItems: 'center',
                        mt: 0.5, px: 0.3
                    }} >
                        <DepartmentSection
                            setSection={setDeptSection}
                            sectionVal={deptSection}
                        />
                    </Box> :
                    <Box sx={{
                        display: 'flex',
                        flex: 1,
                        alignItems: 'center',
                        mt: 0.5, px: 0.3
                    }} >
                        <TextField
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={sect_name}
                            sx={{ display: 'flex', mt: 0.5 }}
                            disabled
                        />
                    </Box>
            }

            {
                (hod === 1 || incharge === 1) ?
                    <Box sx={{
                        display: 'flex',
                        flex: 1,
                        alignItems: 'center',
                        mt: 0.5, px: 0.3
                    }}>
                        <EmployeeAgainSection
                            section={deptSection}
                            setEmployeeId={setEmployeeID}
                            employeeId={employeeID}
                        />
                    </Box> :
                    <Box sx={{
                        display: 'flex',
                        flex: 1,
                        alignItems: 'center',
                        mt: 0.5, px: 0.3
                    }}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            value={em_name}
                            size="small"
                            sx={{ display: 'flex', mt: 0.5 }}
                            disabled
                        />
                    </Box>
            }
            <Box sx={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                mt: 0.5, px: 0.3
            }}>
                <TextField
                    variant="outlined"
                    fullWidth
                    size="small"
                    disabled
                    value={(hod === 1 || incharge === 1) ? employeeID : em_no}
                    sx={{ display: 'flex', mt: 0.5 }}
                />
            </Box>
            <Box sx={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                mt: 0.5, px: 0.3
            }}>
                <LeaveRequestType
                    empstatus={employeeID}
                    onChange={setLevReq}
                    onChangeVal={levReq}
                />
            </Box>
            <Box sx={{ display: "flex", p: 0.2 }} >
                <CssVarsProvider>
                    <Button
                        aria-label="Like"
                        variant="soft"
                        color="neutral"
                        onClick={onSubmitLeaveRequestEntry}
                        sx={{
                            color: 'green',
                        }}
                    >
                        <AddCircleOutlineIcon />
                    </Button>
                </CssVarsProvider>
            </Box>
        </Paper>
    )
}

export default LeaveRequestEmployeeSelection