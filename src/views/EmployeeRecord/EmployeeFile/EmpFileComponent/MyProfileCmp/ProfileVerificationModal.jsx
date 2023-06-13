// import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material'
import { Button } from '@mui/material'
import React, { Fragment } from 'react'
import { useState } from 'react';
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import ProfileNotverifiedModal from './ProfileNotverifiedModal';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const ProfileVerificationModal = ({ open, handleClose, modeopen, setOpen, count, setCount, slno }) => {

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
        verification_Remark: "verified",
        em_id: modeopen
    }

    const updateVerify = async (e) => {
        e.preventDefault();
        if (slno === 1) {
            const result = await axioslogin.patch('/empVerification', postData)
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
        else {
            const result = await axioslogin.patch('/empVerification/secondverification', postData)
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

    }
    return (
        <Fragment>
            <ToastContainer />
            {open1 === true ? <ProfileNotverifiedModal open1={open1} handlClose2={handlClose2}
                modeopen={modeopen} slno={slno} count={count} setCount={setCount} /> : null}

            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                fullWidth
                maxWidth='sm'
            >
                <DialogTitle>
                    {"Employee File Verification"}
                </DialogTitle>
                <DialogContent id="alert-dialog-slide-descriptiona"
                    sx={{
                        width: '100%',
                        height: 100
                    }}>
                    <DialogContentText id="alert-dialog-slide-descriptiona">
                        Do You Want To Verify This Employee File
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={updateVerify}>Verify</Button>
                    <Button color="secondary" onClick={OpenNotVerified}> Not Verify</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default ProfileVerificationModal