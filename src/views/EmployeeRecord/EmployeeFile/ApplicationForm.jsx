import { Card, CardHeader, Divider, IconButton } from '@mui/material'
import React, { Fragment } from 'react'
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

const ApplicationForm = () => {
    const history = useHistory()
    // get id and number of logged user
    const { id, no } = useParams()

    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${id}/${no}`)
    }
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <MyProfilePersonalInform empid={no} redirect={RedirectToProfilePage} />
        </Fragment>
    )
}

export default ApplicationForm
