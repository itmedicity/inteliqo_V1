import { CardActions, Fab, IconButton } from '@mui/material'
import React, { Fragment } from 'react'
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
// import ForwardToInboxSharpIcon from '@mui/icons-material/ForwardToInboxSharp';
// import NotificationImportantSharpIcon from '@mui/icons-material/NotificationImportantSharp';
import { useHistory } from 'react-router';
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const EmployeeProfileCardFooter = () => {
    const history = useHistory()

    const toEmployeeList = () => {
        history.push('/Home/EmployeeFile')
    }
    const Input = styled('input')({
        display: 'none',
    });
    return (
        <Fragment>
            <CardActions className="d-sm-flex justify-content-center" >
                <Fab size="small" style={{ marginRight: '2rem' }} color="primary" onClick={toEmployeeList} >
                    <HomeSharpIcon />
                </Fab>
                {/* <Fab size="small" style={{ marginRight: '2rem' }} color="secondary">
                    <ForwardToInboxSharpIcon />
                </Fab>
                <Fab size="small" style={{ marginRight: '2rem', backgroundColor: "#ec407a", color: "white" }} >
                    <NotificationImportantSharpIcon />
                </Fab> */}
                <Fab size="small" style={{ marginRight: '2rem', backgroundColor: "#90caf9", color: "white" }} >
                    <label htmlFor="icon-button-file">
                        <Input accept="image/*" id="icon-button-file" type="file" />
                        <IconButton aria-label="upload picture" component="span" style={{ color: "white" }}  >
                            <PhotoCamera />
                        </IconButton>
                    </label>
                </Fab>
                <Fab size="small" style={{ marginRight: '2rem', backgroundColor: "#ec407a", color: "white" }} >
                    <FileUploadIcon />
                </Fab>
            </CardActions>
        </Fragment>
    )
}

export default EmployeeProfileCardFooter
