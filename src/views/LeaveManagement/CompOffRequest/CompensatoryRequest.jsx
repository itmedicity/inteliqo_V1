import { Box } from '@mui/material';
import React, { lazy, memo, Suspense, useEffect, useMemo, useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import { CircularProgress, } from '@mui/joy';
import { getEmployeeInformationLimited } from 'src/redux/reduxFun/reduxHelperFun';
import { getEmployeeInformation, getHodBasedDeptSectionName } from 'src/redux/actions/LeaveReqst.action';
import { setCommonSetting } from 'src/redux/actions/Common.Action';
import { setDept } from 'src/redux/actions/Dept.Action';
import { setdeptSection } from 'src/redux/actions/DeptSection.action';
// import OffSubmitForm from './OffSubmitForm';

const CoffRequesttable = lazy(() => import('./CoffRequesttable'))
const EmployeeSelection = lazy(() => import('./EmployeeSelection'))
const OffSubmitForm = lazy(() => import('./OffSubmitForm'))

const CompensatoryRequest = () => {

    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(0)
    const [employeeData, steEmployeeData] = useState({})
    const [count, setCount] = useState(0)

    //get the employee details for taking the HOd and Incharge Details
    const empInform = useSelector((state) => getEmployeeInformationLimited(state))
    const employeeInform = useMemo(() => empInform, [empInform])
    const { hod, incharge, em_id } = employeeInform;

    useEffect(() => {
        dispatch(getHodBasedDeptSectionName(em_id));
        dispatch(getEmployeeInformation(employeeData?.emID))
        // dispatch(getEmployeeApprovalLevel(em_id))
        dispatch(setCommonSetting());
        dispatch(setDept())
        dispatch(setdeptSection())
        setCount(0)
    }, [hod, incharge, em_id, dispatch, employeeData, count])

    return (
        <CustomLayout title="Compensatory Off Request" displayClose={true} >
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
                    <EmployeeSelection setShowForm={setShowForm} steEmployeeData={steEmployeeData} />
                    {
                        showForm === 1 ? <OffSubmitForm employeeData={employeeData} setCount={setCount} /> : null
                    }
                </Suspense>
                <CoffRequesttable />
            </Box>
        </CustomLayout >
    )
}

export default memo(CompensatoryRequest) 