import { Box } from '@mui/system'
import React, { lazy, useState } from 'react'
import { Suspense } from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import {
    getEmployeeApprovalLevel, getEmployeeInformation,
    getHodBasedDeptSectionName
} from 'src/redux/actions/LeaveReqst.action'
import { getannualleave } from 'src/redux/actions/Profile.action'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import LeaveTableContainer from './LeaveTableContainer'
import { setCommonSetting } from 'src/redux/actions/Common.Action'
import { setDept } from 'src/redux/actions/Dept.Action'
import { setdeptSection } from 'src/redux/actions/DeptSection.action'
import { getEmployeeInformationLimited } from 'src/redux/reduxFun/reduxHelperFun'
import CircularProgress from '@mui/joy/CircularProgress';

const LeaveRequestEmployeeSelection = lazy(() => import('./LeaveRequestEmployeeSelection'));
const LeaveRequestFormNew = lazy(() => import('./LeaveRequestFormNew'))
const HalfDayLeaveRequest = lazy(() => import('./HalfdayRequest/HalfDayLeaveRequest'))
const MissPunchRequest = lazy(() => import('./MissPunchRequest/MissPunchRequest'))

const LeaveRequestMainCard = () => {

    const dispatch = useDispatch();

    const [requestType, setRequestType] = useState(0)
    const [count, setCount] = useState(0)

    //get the employee details for taking the HOd and Incharge Details
    const empInform = useSelector((state) => getEmployeeInformationLimited(state))
    const employeeInform = useMemo(() => empInform, [empInform])
    const { hod, incharge, em_id, } = employeeInform;

    /***************************************************************** */

    useEffect(() => {
        dispatch(getHodBasedDeptSectionName(em_id));
        dispatch(getEmployeeApprovalLevel(em_id))
        dispatch(setCommonSetting());
        dispatch(setDept())
        dispatch(setdeptSection())

    }, [hod, incharge, em_id, dispatch])

    useEffect(() => {
        dispatch(getannualleave())
        dispatch(getEmployeeInformation())
        dispatch(getEmployeeApprovalLevel(0))
    }, [dispatch])

    //Leave Request in HOD/INcharge Selected employes Empid get Reducer function
    // const SelectEmp = useSelector((state) => state.leaveRequestSelectedEmployee.em_id, _.isEqual);

    return (
        <CustomLayout title="Leave Requsition" displayClose={true} >
            <ToastContainer />
            <Box sx={{ display: 'flex', flex: 1, px: 0.8, mt: 0.3, flexDirection: 'column' }}>
                <Suspense fallback={
                    <Box sx={{ display: 'flex', flex: 1, zIndex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress
                            color="danger"
                            size="md"
                            value={20}
                            variant="outlined"
                        />
                    </Box>
                }>
                    <LeaveRequestEmployeeSelection setRequestType={setRequestType} />
                    {
                        requestType === 1 ? <LeaveRequestFormNew setRequestType={setRequestType} /> :
                            requestType === 2 ? <HalfDayLeaveRequest setRequestType={setRequestType} setCount={setCount} /> :
                                requestType === 3 ? <MissPunchRequest setRequestType={setRequestType} setCount={setCount} /> : null
                    }
                </Suspense>
                <LeaveTableContainer count={count} setCount={setCount} />
            </Box>
        </CustomLayout>
    )
}

export default memo(LeaveRequestMainCard)