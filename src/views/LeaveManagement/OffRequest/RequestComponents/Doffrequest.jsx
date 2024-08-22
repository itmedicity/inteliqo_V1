import { CircularProgress } from '@mui/joy';
import { Box } from '@mui/material';
import React, { lazy, memo, Suspense, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCommonSetting } from 'src/redux/actions/Common.Action';
import { getEmployeeInformation, getHodBasedDeptSectionName } from 'src/redux/actions/LeaveReqst.action';
import { getEmployeeInformationLimited } from 'src/redux/reduxFun/reduxHelperFun';

const EmployeeSelection = lazy(() => import('./DoffEmployeeSelction'))
const OFFPage = lazy(() => import('src/views/LeaveManagement/OffRequest/RequestComponents/DoffSubmitForm'))

const Doffrequest = () => {

    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(0)
    const [employeeData, steEmployeeData] = useState({})

    //get the employee details for taking the HOd and Incharge Details
    const empInform = useSelector((state) => getEmployeeInformationLimited(state))
    const employeeInform = useMemo(() => empInform, [empInform])
    const { hod, incharge, em_id } = employeeInform;

    useEffect(() => {
        dispatch(getHodBasedDeptSectionName(em_id));
        dispatch(getEmployeeInformation(employeeData?.emID))
        dispatch(setCommonSetting());
    }, [hod, incharge, em_id, dispatch, employeeData])


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
                <EmployeeSelection setShowForm={setShowForm} steEmployeeData={steEmployeeData} />
                {
                    showForm === 1 ? <OFFPage /> : null
                }
            </Suspense>

        </Box>
    )
}

export default memo(Doffrequest) 