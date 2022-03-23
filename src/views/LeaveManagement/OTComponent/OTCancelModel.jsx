import React, { Fragment, memo, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import moment from 'moment';
import { useContext } from 'react';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { TextareaAutosize } from '@material-ui/core'
import { Button, DialogActions } from '@mui/material';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const OTCancelModel = ({ cancelopen, cancelClose, heading, slno, setCount, count }) => {
    const { employeedetails } = useContext(PayrolMasterContext)
    const { em_id } = employeedetails
    const [cancel, setCancel] = useState({
        ot_cancel_reason: ''
    })
    const { ot_cancel_reason } = cancel
    const updateCancel = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setCancel({ ...cancel, [e.target.name]: value })
    }
    const patchdata = {
        ot_status: 1,
        ot_cancel_reason: ot_cancel_reason,
        ot_cancel_date: moment(new Date()).format('YYYY-MM-DD  HH:mm:ss'),
        ot_cancel_user: em_id,
        ot_slno: slno
    }
    const restfrm = {
        ot_cancel_reason: ''
    }

    const submitCancel = async (e) => {
        e.preventDefault()
        const result1 = await axioslogin.patch('/overtimerequest/cancelot/dept', patchdata)
        const { success, message } = result1.data
        if (success === 2) {
            succesNofity(message);
            setCancel(restfrm)
            setCount(count + 1)
            cancelClose()
        } else if (success === 1) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
        }
    }

    return (
        <Fragment>
            <Dialog
                open={cancelopen}
                onClose={cancelClose}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                <DialogTitle>
                    {heading}
                </DialogTitle>
                <DialogContent sx={{
                    minWidth: 500,
                    maxWidth: 600,
                    width: 600,
                }}>
                    <div className="card">
                        <div className="card-body">
                            <div className="col-md-12 col-sm-12">
                                <div className="row g-1 pt-2">
                                    <div className="col-md-12" >
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={3}
                                            placeholder="Reason for Cancel"
                                            style={{ width: 515 }}
                                            name="ot_cancel_reason"
                                            value={ot_cancel_reason}
                                            onChange={(e) => updateCancel(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={submitCancel}>Submit</Button>
                    <Button onClick={cancelClose} color="primary" >Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    )
}

export default memo(OTCancelModel)