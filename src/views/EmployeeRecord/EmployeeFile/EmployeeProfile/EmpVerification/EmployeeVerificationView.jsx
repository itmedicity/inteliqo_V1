import React, { memo, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getannualleave, getContractDetlEmp, notify, setAccademicData, setExperienceData, setPersonalData } from 'src/redux/actions/Profile.action'
import ProfileMenus from '../EmpMenus/Profile/ProfileMenus';


const EmployeeVerificationView = ({ id, no, slno, count, setCount }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPersonalData(id))
        dispatch(setAccademicData(no))
        dispatch(setExperienceData(no))
        dispatch(getannualleave(id))
        dispatch(notify(id))
        dispatch(getContractDetlEmp(id))
    }, [id, no, dispatch, count])


    return (
        <ProfileMenus count={count} setCount={setCount} slno={slno} />
    )
}

export default memo(EmployeeVerificationView)