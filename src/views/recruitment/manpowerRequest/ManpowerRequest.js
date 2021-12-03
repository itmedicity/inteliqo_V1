import { DatePicker, LocalizationProvider } from '@mui/lab';
import React, { useState } from 'react';
import SessionCheck from 'src/views/Axios/SessionCheck';
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn';
import TextInput from 'src/views/Component/TextInput';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { useStyles } from 'src/views/CommonCode/MaterialStyle';
import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FullPageloader from 'src/components/FullPageloader';
import { Spinner } from 'react-bootstrap';

function ManpowerRequest() {

    // const [textval, setTextVal] = useState("true")

    // const submitFormData = () => {

    // }

    // const [workstartdate, setWorkdate] = useState(new Date())
    // const [workenddate, setWorkEnddate] = useState(new Date())
    // //setting work start Date
    // const setWorkstartdate = (val) => {
    //     setWorkdate(val)
    // }
    // //setting work End Date
    // const setWorkenddate = (val) => {
    //     setWorkEnddate(val)
    // }

    const classes = useStyles()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <SessionCheck />
            {/* <FullPageloader/> */}
            <Spinner />
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Open form dialog
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Subscribe</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default ManpowerRequest
