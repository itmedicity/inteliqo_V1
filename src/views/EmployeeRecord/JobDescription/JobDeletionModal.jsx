import React, { Fragment, memo } from 'react'
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import DialogTitle from '@mui/material/DialogTitle';
import { Dialog } from '@mui/material';

import Box from '@mui/material/Box';
//import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const JobDeletionModal = ({ open, handleClose, DeleteValue, Close, heading }) => {

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                // keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                <DialogTitle>
                    {heading}
                </DialogTitle>
                <DialogContent sx={{
                    minWidth: 400,
                    maxWidth: 400
                }}>
                    <DialogContentText id="alert-dialog-slide-descriptiona">
                        {"Are You Sure Want To Delete?"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={DeleteValue} color="secondary" >Yes</Button>
                    <Button onClick={handleClose} color="secondary" >No</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default memo(JobDeletionModal)