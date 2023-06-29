import React, { Fragment, memo, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { employeeNumber } from 'src/views/Constant/Constant';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const ModelAddFineMaster = ({ open, handleClose, upfineCount, setUpdateFine }) => {
    const [count, setcount] = useState(0);
    const [desc, setDesc] = useState({
        fine_desc: ''
    })
    const { fine_desc } = desc
    const updatefine = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.value : e.target.value;
        setDesc({ ...desc, [e.target.name]: value })
    }

    const postData = {
        fine_desc: fine_desc,
        create_user: employeeNumber()
    }

    const resetForm = {
        fine_desc: ''
    }

    //Form Submitting
    const submitQualification = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/fineded', postData)
        const { message, success } = result.data;
        if (success === 1) {
            succesNofity(message);
            setcount(count + 1)
            setDesc(resetForm);
            setUpdateFine(upfineCount + 1)
            handleClose()
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
        }
    }

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
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="fine_desc"
                            value={fine_desc}
                            onChange={(e) => updatefine(e)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={submitQualification} color="secondary" >Submit</Button>
                        <Button onClick={handleClose} color="secondary" >Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Fragment>
    )
}

export default memo(ModelAddFineMaster)
