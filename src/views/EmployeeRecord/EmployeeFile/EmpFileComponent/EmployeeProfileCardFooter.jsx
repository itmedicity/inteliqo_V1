import { CardActions, Fab } from '@mui/material'
import React, { Fragment } from 'react'
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import ForwardToInboxSharpIcon from '@mui/icons-material/ForwardToInboxSharp';
import NotificationImportantSharpIcon from '@mui/icons-material/NotificationImportantSharp';
import { useHistory } from 'react-router';


const EmployeeProfileCardFooter = () => {
    const history = useHistory()

    const toEmployeeList = () => {
        history.push('/Home/EmployeeFile')
    }

    return (
        <Fragment>
            <CardActions className="d-sm-flex justify-content-center" >
                <Fab size="small" style={{ marginRight: '2rem' }} color="primary" onClick={toEmployeeList} >
                    <HomeSharpIcon />
                </Fab>
                <Fab size="small" style={{ marginRight: '2rem' }} color="secondary"><ForwardToInboxSharpIcon /></Fab>
                <Fab size="small" style={{ marginRight: '2rem', backgroundColor: "#ec407a", color: "white" }} ><NotificationImportantSharpIcon /></Fab>
            </CardActions>
        </Fragment>
    )
}

export default EmployeeProfileCardFooter
