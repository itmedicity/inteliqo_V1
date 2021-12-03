import React, { Fragment } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ModalOne = ({ open, handleClose }) => {
    return (
        <Fragment>
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Caution</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Proceed With Your Screat Code for updating the Wages information into the Employee Record.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Please Enter Your Secreat code"
                            type="password"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Fragment>
    )
}

export default ModalOne
