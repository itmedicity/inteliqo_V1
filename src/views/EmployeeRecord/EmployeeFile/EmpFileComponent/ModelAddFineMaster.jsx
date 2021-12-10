import React, { Fragment } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});



const ModelAddFineMaster = ({ open, handleClose }) => {
    return (
        <Fragment>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-describedby="alert-dialog-slide-descriptiona"

                >
                    {/* <DialogTitle>{"Fines || Other Deducation Master"}</DialogTitle> */}
                    <DialogContent sx={{
                        minWidth: 600,
                        maxWidth: 600
                    }}>
                        <DialogContentText id="alert-dialog-slide-descriptiona">
                            Fines || Other Deducation Master
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary" >Submit</Button>
                        <Button onClick={handleClose} color="secondary" >Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Fragment>
    )
}

export default ModelAddFineMaster
