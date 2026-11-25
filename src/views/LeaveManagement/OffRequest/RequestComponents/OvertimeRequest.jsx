import { Box } from '@mui/material';
import React, { lazy, memo, Suspense, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/joy';
import { getEmployeeInformationLimited } from 'src/redux/reduxFun/reduxHelperFun';
import { getEmployeeInformation, getHodBasedDeptSectionName, getEmployeeApprovalLevel } from 'src/redux/actions/LeaveReqst.action';
import { setCommonSetting } from 'src/redux/actions/Common.Action';
import { setDept } from 'src/redux/actions/Dept.Action';
import { setdeptSection } from 'src/redux/actions/DeptSection.action';

const OtRequestTable = lazy(() => import('src/views/LeaveManagement/OverTimeRequest/OtRequestTable'));
const OtEmployeeSelection = lazy(() => import('src/views/LeaveManagement/OverTimeRequest/OtEmployeeSelection'));
const OtSubmitForm = lazy(() => import('src/views/LeaveManagement/OverTimeRequest/OtSubmitForm'));

const OvertimeRequest = () => {

    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(0);
    const [employeeData, steEmployeeData] = useState({});
    const [count, setCount] = useState(0);
    const [showTable, setShowtable] = useState(0);

    // Get the employee details for taking the HOD and Incharge Details
    const empInform = useSelector((state) => getEmployeeInformationLimited(state));
    const employeeInform = useMemo(() => empInform, [empInform]);
    const { hod, incharge, em_id } = employeeInform;

    useEffect(() => {
        dispatch(getHodBasedDeptSectionName(em_id));
        if (employeeData?.emID) {
            dispatch(getEmployeeInformation(employeeData?.emID));
            dispatch(getEmployeeApprovalLevel(employeeData?.emID));
        } else if (em_id) {
            dispatch(getEmployeeApprovalLevel(em_id));
        }
        dispatch(setCommonSetting());
        dispatch(setDept());
        dispatch(setdeptSection());
    }, [hod, incharge, em_id, dispatch, employeeData]);

    return (
        <Box sx={{ display: 'flex', flex: 1, p: 0, py: 0.5, mt: 0.3, flexDirection: 'column' }}>
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
                <OtEmployeeSelection
                    setShowForm={setShowForm}
                    steEmployeeData={steEmployeeData}
                    setShowtable={setShowtable}
                    count={count}
                />
                {
                    showForm === 1 ? (
                        <OtSubmitForm
                            employeeData={employeeData}
                            setCount={setCount}
                            setShowForm={setShowForm}
                        />
                    ) : null
                }
            </Suspense>
            {
                showTable === 1 ? (
                    <OtRequestTable
                        employeeData={employeeData}
                        count={count}
                        setCount={setCount}
                    />
                ) : null
            }
        </Box>
    );
};

export default memo(OvertimeRequest);
