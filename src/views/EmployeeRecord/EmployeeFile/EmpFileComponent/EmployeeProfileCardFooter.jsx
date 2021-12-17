import { CardActions, Fab, IconButton } from '@mui/material'
import React, { Fragment, memo, useState } from 'react'
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
// import ForwardToInboxSharpIcon from '@mui/icons-material/ForwardToInboxSharp';
// import NotificationImportantSharpIcon from '@mui/icons-material/NotificationImportantSharp';
import { useHistory } from 'react-router';
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';

const EmployeeProfileCardFooter = ({ id }) => {
    const history = useHistory()
    const toEmployeeList = () => {
        history.push('/Home/EmployeeFile')
    }
    const Input = styled('input')({
        display: 'none',
    });

    const [file, setFile] = useState();

    const uploadFile = async () => {
        const data = new FormData();
        data.append("em_id", id.no)
        data.append("file", file)
        console.log(id.no)
        const result = await axioslogin.post('/upload/upload', data);
        const { success, message } = result.data;
        if (success === 1) {
            succesNofity(message)
        } else {
            warningNofity('Somthing Went Wrong')
        }
    }

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
                    <label htmlFor="file">
                        <Input accept='.jpg' type="file" id="file" onChange={
                            (e) => {
                                const file = e.target.files[0]
                                setFile(file)
                            }
                        } />
                        <IconButton aria-label="upload picture" component="span" style={{ color: "white" }} >
                            <PhotoCamera />
                        </IconButton>
                    </label>
                </Fab>
                <Fab size="small" style={{ marginRight: '2rem', backgroundColor: "#ec407a", color: "white" }} onClick={uploadFile}  >
                    <FileUploadIcon />
                </Fab>
            </CardActions>
        </Fragment>
    )
}

export default memo(EmployeeProfileCardFooter)
