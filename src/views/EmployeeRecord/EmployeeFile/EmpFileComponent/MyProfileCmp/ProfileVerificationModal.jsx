import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core'
import { Button } from '@mui/material'
import React, { Fragment } from 'react'
import { useState } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import ProfileNotverifiedModal from './ProfileNotverifiedModal';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const ProfileVerificationModal = ({ open, handleClose, modeopen, setOpen, count, setCount }) => {

    const [open1, setOpen1] = useState(false)
    const OpenNotVerified = async () => {
        setOpen1(true)
        setOpen(false)
    }
    const handlClose2 = async () => {
        setOpen1(false)
    }
    const postData = {
        verification_status: 1,
        verification_Remark: '',
        em_id: modeopen
    }
    const updateVerify = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/empmast/empmaster/updateverification', postData)
        const { success, message } = result.data
        if (success === 2) {
            succesNofity(message)
            setCount(count + 1)
            handleClose()
        }
        else {
            errorNofity("Error Occured!!!Please Contact EDP")
        }
    }
    return (
        <Fragment>
            <ProfileNotverifiedModal open1={open1} handlClose2={handlClose2}
                modeopen={modeopen} />
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                <DialogTitle>
                    {"Employee Record Verification"}
                </DialogTitle>
                <DialogContent sx={{
                    minWidth: 800,
                    maxWidth: 800,
                    width: 800,
                }}>
                    <DialogContentText id="alert-dialog-description"
                    >
                        Do you Want To Verify This Employee Record
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={updateVerify}>Verified</Button>
                    <Button autoFocus onClick={OpenNotVerified}> Not Verified</Button>

                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default ProfileVerificationModal