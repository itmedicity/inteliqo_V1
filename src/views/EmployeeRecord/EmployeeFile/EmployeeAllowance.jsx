import React, { Fragment } from 'react'
import { useHistory } from 'react-router'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import './EmpStyle.css'

const EmployeeAllowance = () => {
    const history = useHistory()
    const classes = useStyles();
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${4516}/${4516}`)
    }
    return (
        <Fragment>
            <PageLayoutSave heading="Earnings - Deducation"
                redirect={RedirectToProfilePage} >

            </PageLayoutSave>
        </Fragment>
    )
}

export default EmployeeAllowance

