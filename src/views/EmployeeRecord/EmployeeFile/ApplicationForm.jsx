// import { Card, CardHeader, Divider, IconButton } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import MyProfilePersonalInform from './EmpFileComponent/MyProfileCmp/MyProfilePersonalInform'
import { useDispatch, useSelector } from 'react-redux'
import {
    setPersonalData,
    setAccademicData,
    setExperienceData,
    getannualleave,
    notify,
    jondescription,
    getContractDetlEmp,
    getSalaryInformation
} from '../../../redux/actions/Profile.action'

const ApplicationForm = () => {

    const history = useHistory()
    // get id and number of logged user
    const { id, no, slno } = useParams()
    console.log(id);
    console.log(no);
    console.log(slno);
    const dispath = useDispatch()
    const RedirectToProfilePage = useCallback(() => {
        if (slno === '0') {
            history.push(`/Home/Profile/${id}/${no}`)
        }
        else if (slno === '1') {
            history.push('/Home/EmployeeRecordVerification')
        }
        else if (slno === '2') {
            history.push('/Home/EmpfileFinalVerification')
        }
        else {

        }
    }, [slno, id, no])
    const designation = useSelector((state) => {
        return state.getPrifileDateEachEmp.empPersonalData.personalData.em_designation
    })
    const em_department = useSelector((state) => {
        return state.getPrifileDateEachEmp.empPersonalData.personalData.em_department
    })
    const [count, setCount] = useState(0)
    useEffect(() => {
        const postData = {
            designation: designation,
            department: em_department
        }
        const postData2 = {
            em_no: id
        }
        dispath(setPersonalData(no))
        dispath(setAccademicData(id))
        dispath(setExperienceData(id))
        dispath(getannualleave(no))
        dispath(notify(no))
        dispath(getContractDetlEmp(no))
        dispath(getSalaryInformation(postData2))
        if (designation !== 'NOT UPDATED' && em_department !== 'NOT UPDATED') {
            dispath(jondescription(postData))
        }
    }, [no, id, designation, em_department, count, dispath])

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <MyProfilePersonalInform empid={no} redirect={RedirectToProfilePage} count={count} setCount={setCount} slno={slno} />
        </Fragment>
    )
}

export default memo(ApplicationForm)
