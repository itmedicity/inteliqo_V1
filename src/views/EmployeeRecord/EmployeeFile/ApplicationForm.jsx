// import { Card, CardHeader, Divider, IconButton } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import MyProfilePersonalInform from './EmpFileComponent/MyProfileCmp/MyProfilePersonalInform'
import { useDispatch } from 'react-redux'
import {
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
