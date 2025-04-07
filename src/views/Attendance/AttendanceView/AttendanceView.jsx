import React, { Fragment, memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getHolidayList } from 'src/redux/actions/LeaveProcess.action';
import { setCommonSetting } from 'src/redux/actions/Common.Action';
import { setShiftDetails } from 'src/redux/actions/Shift.Action';
import { setDepartment } from 'src/redux/actions/Department.action';
import { setDeptWiseSection } from 'src/redux/actions/DepartmentSection.Action'
import { setDept } from 'src/redux/actions/Dept.Action'
import { getCommonSettings, getEmployeeInformationLimited } from 'src/redux/reduxFun/reduxHelperFun';
import { lazy } from 'react';

const EmployeeCmpnt = lazy(() => import('./EmployeeCompnt'));
const AllView = lazy(() => import('./AllView'))
const InchargeHodCompnt = lazy(() => import('./InchargeHodCompnt'))

const AttendanceView = () => {

    const reduxDispatch = useDispatch()

    useEffect(() => {
        // Dispatch an action to fetch the list of holidays from the Redux store.
        reduxDispatch(getHolidayList());

        // Dispatch an action to set common settings in the Redux store.
        reduxDispatch(setCommonSetting());

        // Dispatch an action to set shift details in the Redux store.
        reduxDispatch(setShiftDetails());

        // Dispatch an action to set department data in the Redux store.
        reduxDispatch(setDepartment());

        // Dispatch an action to set department-wise section data in the Redux store.
        reduxDispatch(setDeptWiseSection());

        // Dispatch an action to set department data in the Redux store (again, potentially related to the previous one).
        reduxDispatch(setDept());
    }, [reduxDispatch]); // The effect will run when the 'reduxDispatch' function reference changes.


    // Access the employee information from the Redux store using useSelector
    const empInformation = useSelector((state) => getEmployeeInformationLimited(state))
    // Memoize the employee information to avoid unnecessary recalculations/re-renders
    const empInformationFromRedux = useMemo(() => empInformation, [empInformation])
    // Destructure specific properties (hod, incharge, and groupmenu) from the memoized employee information
    const { hod, incharge, groupmenu } = empInformationFromRedux;
    // Access the common settings from the Redux store using useSelector based on the groupmenu value
    const getcommonSettings = useSelector((state) => getCommonSettings(state, groupmenu))
    // Memoize the common settings to avoid unnecessary recalculations/re-renders
    const groupStatus = useMemo(() => getcommonSettings, [getcommonSettings])

    return (
        <Fragment>
            {
                ((hod === 1 || incharge === 1) && groupStatus === true) ? <AllView /> :
                    ((hod === 1 || incharge === 1) && groupStatus === false) ? <InchargeHodCompnt /> : <EmployeeCmpnt />
            }
        </Fragment>
    )
}

export default memo(AttendanceView) 