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
import { getannualleave } from 'src/redux/actions/Profile.action'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import TextInput from 'src/views/Component/TextInput'
import _ from 'underscore'
import DepartmentSection from './Func/DepartmentSection'
import EmployeeAgainSection from './Func/EmployeeAgainSection'
import LeaveRequestType from './Func/LeaveRequestType'
import LeaveRequestEmployeeSelection from './LeaveRequestEmployeeSelection'
import LeaveRequestForm from './LeaveRequestForm'
import LeaveTableContainer from './LeaveTableContainer'

const LeaveRequestMainCard = () => {
    const dispatch = useDispatch();
    //get the employee details for taking the HOd and Incharge Details
    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { hod, incharge, em_id, em_name, sect_name } = employeeProfileDetl;

    const state = useSelector((state) => state.getLeaveRequestInfom.empDetl, _.isEqual);
    const { deptSection, em_no, requestType } = state;
    console.log(state)

    // const [deptSection, setDeptSection] = useState(0);
    // const [employeeID, setEmployeeID] = useState(0);

    useEffect(() => {
        if (hod === 1 || incharge === 1) {
            dispatch(getHodBasedDeptSectionName(em_id));
            dispatch(getEmpNameHodSectionBased(em_id));
        } else {
            dispatch(getannualleave(em_id))
        }
    }, [hod, incharge, em_id])

    // console.log(deptSection)

    console.log('main page render')
    return (
        <CustomLayout title="Leave Requsition" displayClose={true} >
            <ToastContainer />
            <Box sx={{ display: 'flex', flex: 1, px: 0.8, mt: 0.3, flexDirection: 'column' }}>
                <LeaveRequestEmployeeSelection />
                {
                    requestType === 1 ? <LeaveRequestForm /> :
                        requestType === 2 ? null :
                            requestType === 3 ? null :
                                requestType === 4 ? null : null
                }
                <LeaveTableContainer />
            </Box>
        </CustomLayout>
    )
}

export default memo(LeaveRequestMainCard)