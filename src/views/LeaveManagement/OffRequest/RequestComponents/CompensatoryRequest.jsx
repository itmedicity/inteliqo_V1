import { Box } from '@mui/material';
import React, { lazy, memo, Suspense, useEffect, useMemo, useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, } from '@mui/joy';
import { getEmployeeInformationLimited } from 'src/redux/reduxFun/reduxHelperFun';
import { getEmployeeInformation, getHodBasedDeptSectionName } from 'src/redux/actions/LeaveReqst.action';
import { setCommonSetting } from 'src/redux/actions/Common.Action';
import { setDept } from 'src/redux/actions/Dept.Action';
import { setdeptSection } from 'src/redux/actions/DeptSection.action';

const CoffRequesttable = lazy(() => import('src/views/LeaveManagement/CompOffRequest/CoffRequesttable'))
const EmployeeSelection = lazy(() => import('src/views/LeaveManagement/CompOffRequest/EmployeeSelection'))
const OffSubmitForm = lazy(() => import('src/views/LeaveManagement/CompOffRequest/OffSubmitForm'))

const CompensatoryRequest = () => {

    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(0)
    const [employeeData, steEmployeeData] = useState({})
    const [count, setCount] = useState(0)
    const [showTable, setShowtable] = useState([])

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
        <Box sx={{ display: 'flex', flex: 1, p: 0, py: 0.5, mt: 0.3, flexDirection: 'column', }}>
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
                <EmployeeSelection setShowForm={setShowForm} steEmployeeData={steEmployeeData} setShowtable={setShowtable} count={count} />
                {
                    showForm === 1 ? <OffSubmitForm employeeData={employeeData} setCount={setCount} setShowForm={setShowForm} /> : null
                }
            </Suspense>
            {
                showTable === 1 ? <CoffRequesttable /> : null
            }

        </Box>
    )
}

export default memo(CompensatoryRequest) 