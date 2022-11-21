import React, { Fragment, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { axioslogin } from 'src/views/Axios/Axios';
import { employeeNumber } from 'src/views/Constant/Constant';
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { lastDayOfYear } from 'date-fns';
import moment from 'moment';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const CustomModel = ({ open, handleClose, valuemessage, sx, Close, closeMessage, okMessage, processFunc }) => {

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona">
                <DialogContent sx={sx}>
                    <DialogContentText id="alert-dialog-slide-descriptiona">
                        {valuemessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={processFunc}
                        color="secondary" >{okMessage}</Button>
                    <Button
                        onClick={Close}
                        color="secondary" >{closeMessage}</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default CustomModel