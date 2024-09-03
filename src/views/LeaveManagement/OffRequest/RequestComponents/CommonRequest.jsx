import { Box } from '@mui/system'
import React, { lazy, useState } from 'react'
import { Suspense } from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
    getEmployeeApprovalLevel,
    getHodBasedDeptSectionName
} from 'src/redux/actions/LeaveReqst.action'
import { setCommonSetting } from 'src/redux/actions/Common.Action'
import { setDept } from 'src/redux/actions/Dept.Action'
import { setdeptSection } from 'src/redux/actions/DeptSection.action'
import { getEmployeeInformationLimited } from 'src/redux/reduxFun/reduxHelperFun'
import CircularProgress from '@mui/joy/CircularProgress';

const RequestEmployee = lazy(() => import('./CommonRequestComp/EmployeeSelectionComponent'))
const OnDutyRequestCmp = lazy(() => import('src/views/LeaveManagement/CommonRequest/CommonReqstComponent/OnDutyRequest'))
const OneHourRequestCmp = lazy(() => import('src/views/LeaveManagement/CommonRequest/CommonReqstComponent/OneHourRequest'))

const CommonRequest = () => {

    const dispatch = useDispatch();

    const [requestType, setRequestType] = useState(0)
    //const [count, setCount] = useState(0)

    //get the employee details for taking the HOd and Incharge Details
    const empInform = useSelector((state) => getEmployeeInformationLimited(state))
    const employeeInform = useMemo(() => empInform, [empInform])
    const { hod, incharge, em_id, } = employeeInform;

    useEffect(() => {
        dispatch(getHodBasedDeptSectionName(em_id));
        dispatch(getEmployeeApprovalLevel(em_id))
        dispatch(setCommonSetting());
        dispatch(setDept())
        dispatch(setdeptSection())
    }, [hod, incharge, em_id, dispatch])

    return (
        <Box sx={{ display: 'flex', flex: 1, mt: 0.3, flexDirection: 'column', p: 0, py: 0.5, }}>
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
                <RequestEmployee setRequestType={setRequestType} />
                {
                    requestType === 2 ? <OnDutyRequestCmp /> :
                        requestType === 3 ? <OneHourRequestCmp /> : null
                }
            </Suspense>
        </Box>
    )
}

export default memo(CommonRequest) 