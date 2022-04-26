import { Card, CardHeader, Divider, IconButton } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import EmployeeProfileCard from './EmpFileComponent/EmployeeProfileCard'
import EmployeeProfileCardFooter from './EmpFileComponent/EmployeeProfileCardFooter'
import EmployeeProfileCardMenuList from './EmpFileComponent/EmployeeProfileCardMenuList'
import MyProfilePersonalInform from './EmpFileComponent/MyProfileCmp/MyProfilePersonalInform'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClearIcon from '@mui/icons-material/Clear';
import MyProfileExpQualify from './EmpFileComponent/MyProfileCmp/MyProfileExpQualify'
import { useDispatch } from 'react-redux'
import {
    setProfileData,
    setPersonalData,
    setAccademicData,
    setExperienceData,
    getannualleave,
    notify
} from '../../../redux/actions/Profile.action'

const ApplicationForm = () => {
    const history = useHistory()
    // get id and number of logged user
    const { id, no } = useParams()
    const dispath = useDispatch()

    const RedirectToProfilePage = useCallback(() => {
        history.push(`/Home/Profile/${id}/${no}`)
    })

    useEffect(() => {
        dispath(setPersonalData(no))
        dispath(setAccademicData(id))
        dispath(setExperienceData(id))
        dispath(getannualleave(no))
        dispath(notify(no))
    }, [no, id])

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <MyProfilePersonalInform empid={no} redirect={RedirectToProfilePage} />
        </Fragment>
    )
}

export default memo(ApplicationForm)
