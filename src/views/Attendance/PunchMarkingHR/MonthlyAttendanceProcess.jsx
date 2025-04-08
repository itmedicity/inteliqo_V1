import React, { lazy, useEffect, useMemo } from 'react'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { setCommonSetting } from 'src/redux/actions/Common.Action';
import { setDepartment } from 'src/redux/actions/Department.action';
import { setShiftDetails } from 'src/redux/actions/Shift.Action';

const PunchMarkingHR = lazy(() => import('./PunchMarkingHR'))
const MonthlyPunchMarking = lazy(() => import('./MonthlyPunchMarking'))

const MonthlyAttendanceProcess = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCommonSetting());
        dispatch(setDepartment());
        dispatch(setShiftDetails())
    }, [dispatch])

    const state = useSelector((state) => state?.getCommonSettings)
    const commonSetting = useMemo(() => state, [state])

    const { second_plicy } = commonSetting
    return (
        <>
            <ToastContainer />
            {
                second_plicy === 1 ? <MonthlyPunchMarking /> : <PunchMarkingHR />
            }
        </>
    )
}

export default MonthlyAttendanceProcess