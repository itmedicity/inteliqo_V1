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
// import LinearProgreeBar from 'src/views/Component/MuiCustomComponent/LinearProgreeBar'
import LeaveTableContainer from './LeaveTableContainer'
// import { Actiontypes } from 'src/redux/constants/action.type'
// import MissPunchRequest from './MissPunchRequest/MissPunchRequest'
// import CompansatoryOffMast from './CompansatoryOff/CompansatoryOffMast'
import { setCommonSetting } from 'src/redux/actions/Common.Action'
import { setDept } from 'src/redux/actions/Dept.Action'
import { setdeptSection } from 'src/redux/actions/DeptSection.action'
import { getEmployeeInformationLimited } from 'src/redux/reduxFun/reduxHelperFun'
import CircularProgress from '@mui/joy/CircularProgress';

const LeaveRequestEmployeeSelection = lazy(() => import('./LeaveRequestEmployeeSelection'));
const LeaveRequestFormNew = lazy(() => import('./LeaveRequestFormNew'))
const HalfDayLeaveRequest = lazy(() => import('./HalfdayRequest/HalfDayLeaveRequest'))


// const LeaveRequestFormPage = lazy(() => import('./LeaveRequestForm'));
const MissPunchRequest = lazy(() => import('./MissPunchRequest/MissPunchRequest'))
//const CompansatoryOffMast = lazy(() => import('./CompansatoryOff/CompansatoryOffMast'))


const LeaveRequestMainCard = () => {

    const dispatch = useDispatch();

    const [requestType, setRequestType] = useState(0)
    const [count, setCount] = useState(0)
    // const { LEAVE_REQ_DEFAULT } = Actiontypes;

    //get the employee details for taking the HOd and Incharge Details
    const empInform = useSelector((state) => getEmployeeInformationLimited(state))
    const employeeInform = useMemo(() => empInform, [empInform])
    const { hod, incharge, em_id, } = employeeInform;

    // console.log(empInform)


    /***************************************************************** */
    // const state = useSelector((state) => state.getLeaveRequestInfom.empDetl);
    // const { requestType } = state;

    useEffect(() => {
        // if (hod === 1 || incharge === 1) {
        //     dispatch(getHodBasedDeptSectionName(em_id));
        //     dispatch(getEmpNameHodSectionBased(em_id));
        // } else {
        //     dispatch(getannualleave(em_id))
        //     dispatch(getEmployeeInformation(em_id))
        // }
        dispatch(getHodBasedDeptSectionName(em_id));
        dispatch(getEmployeeApprovalLevel(em_id))
        dispatch(setCommonSetting());
        dispatch(setDept())
        dispatch(setdeptSection())

    }, [hod, incharge, em_id, dispatch])

    useEffect(() => {
        // return () => {
        //     dispatch({ type: LEAVE_REQ_DEFAULT })
        //     dispatch(getHodBasedDeptSectionName());
        //     dispatch(getEmpNameHodSectionBased());
        dispatch(getannualleave())
        dispatch(getEmployeeInformation())
        dispatch(getEmployeeApprovalLevel(0))
        // }
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
                            // requestType === 1 ? <LeaveRequestFormPage em_id={{}} /> : 
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