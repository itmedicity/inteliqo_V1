import { Box } from '@mui/system'
import React, { lazy } from 'react'
import { Suspense } from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import {
    getEmployeeApprovalLevel, getEmployeeInformation,
    getEmpNameHodSectionBased, getHodBasedDeptSectionName
} from 'src/redux/actions/LeaveReqst.action'
import { getannualleave } from 'src/redux/actions/Profile.action'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import LinearProgreeBar from 'src/views/Component/MuiCustomComponent/LinearProgreeBar'
import _ from 'underscore'
import LeaveRequestEmployeeSelection from './LeaveRequestEmployeeSelection'
import LeaveTableContainer from './LeaveTableContainer'
import { Actiontypes } from 'src/redux/constants/action.type'
import MissPunchRequest from './MissPunchRequest/MissPunchRequest'
import CompansatoryOffMast from './CompansatoryOff/CompansatoryOffMast'

const LeaveRequestFormPage = lazy(() => import('./LeaveRequestForm'));
const HalfDayLeaveRequest = lazy(() => import('./HalfdayRequest/HaldayRequetsMainForm'))

const LeaveRequestMainCard = () => {

    const dispatch = useDispatch();
    const { LEAVE_REQ_DEFAULT } = Actiontypes;

    //get the employee details for taking the HOd and Incharge Details
    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { hod, incharge, em_id, } = employeeProfileDetl;

    const state = useSelector((state) => state.getLeaveRequestInfom.empDetl, _.isEqual);
    const { requestType } = state;

    useEffect(() => {
        if (hod === 1 || incharge === 1) {
            dispatch(getHodBasedDeptSectionName(em_id));
            dispatch(getEmpNameHodSectionBased(em_id));
        } else {
            dispatch(getannualleave(em_id))
            dispatch(getEmployeeInformation(em_id))
        }
        dispatch(getEmployeeApprovalLevel(em_id))

    }, [hod, incharge, em_id])

    useEffect(() => {
        return () => {
            dispatch({ type: LEAVE_REQ_DEFAULT })
            dispatch(getHodBasedDeptSectionName());
            dispatch(getEmpNameHodSectionBased());
            dispatch(getannualleave())
            dispatch(getEmployeeInformation())
            dispatch(getEmployeeApprovalLevel(0))
        }
    }, [])

    //Leave Request in HOD/INcharge Selected employes Empid get Reducer function
    const SelectEmp = useSelector((state) => state.leaveRequestSelectedEmployee.em_id, _.isEqual);

    return (
        <CustomLayout title="Leave Requsition" displayClose={true} >
            <ToastContainer />
            <Box sx={{ display: 'flex', flex: 1, px: 0.8, mt: 0.3, flexDirection: 'column' }}>
                <LeaveRequestEmployeeSelection />
                <Suspense fallback={<LinearProgreeBar />} >
                    {
                        requestType === 1 ? <LeaveRequestFormPage em_id={hod === 0 || incharge === 0 ? em_id : SelectEmp} /> :
                            requestType === 2 ? <HalfDayLeaveRequest em_id={hod === 0 || incharge === 0 ? em_id : SelectEmp} /> :
                                requestType === 3 ? <MissPunchRequest em_id={hod === 0 || incharge === 0 ? em_id : SelectEmp} /> :
                                    requestType === 4 ? <CompansatoryOffMast em_id={hod === 0 || incharge === 0 ? em_id : SelectEmp} /> : null
                    }
                </Suspense>
                <LeaveTableContainer />
            </Box>
        </CustomLayout>
    )
}

export default memo(LeaveRequestMainCard)