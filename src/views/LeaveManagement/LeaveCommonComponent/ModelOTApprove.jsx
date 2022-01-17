import React, { Fragment, memo, useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextInput from 'src/views/Component/TextInput';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const ModelOTApprove = ({ open, handleClose }) => {

    const [modeldata, setModeldata] = useState({
        ot_days: '',
        over_time: '',
        ot_amount: '',
        ot_reson: ''

    })

    //Get Data
    useEffect(() => {
        const getOt = async () => {
            const result = await axioslogin.get('/overtimerequest/incharge/list')
            const { success, data } = result.data;
            if (success === 1) {
                const { ot_days, over_time, ot_amount, ot_reson } = data[0]
                const frmdata = {
                    ot_days: ot_days,
                    over_time: over_time,
                    ot_amount: ot_amount,
                    ot_reson: ot_reson
                }
                setModeldata(frmdata);
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getOt();
    }, []);


    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                <DialogTitle>{"Over Time Approval/Reject"}</DialogTitle>
                <DialogContent sx={{
                    minWidth: 300,
                    maxWidth: 600,
                    width: 600,
                }}>
                    <div className="card">
                        <div className="card-body">
                            <div className="col-md-12 col-sm-12" >
                                <div className="row g-1">
                                    <div className="col-md-4">
                                        <TextInput
                                            type="date"
                                            classname="form-control form-control-sm"
                                            Placeholder="Start Date"
                                            disabled="Disabled"
                                            value={modeldata.ot_days}
                                            name="modeldata.ot_days"
                                        />
                                    </div>
                                    <div className="col-md-4 ">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Over Time in minutes "
                                            disabled="Disabled"
                                            value={modeldata.over_time}
                                            name="modeldata.over_time"
                                        />
                                    </div>
                                    <div className="col-md-4 ">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="OT Amount "
                                            disabled="Disabled"
                                            value={modeldata.ot_amount}
                                            name="modeldata.ot_amount"
                                        />
                                    </div>
                                </div>
                                <div className="row g-1">
                                    <div className="col-md-12 pt-1">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Over Time Reason"
                                            disabled="Disabled"
                                            value={modeldata.ot_reson}
                                            name="modeldata.ot_reson"
                                        />
                                    </div>
                                </div>
                                <div className="row g-1 ">
                                    <div className="col-md-12 pt-1 pl-6">
                                        <RadioGroup row name="row-radio-buttons-group">
                                            <FormControlLabel
                                                value="approve"
                                                label="Approve"
                                                control={<Radio color="success" size="small" />}
                                            />

                                            <FormControlLabel
                                                value="reject"
                                                control={<Radio color="secondary" size="small" />}
                                                label="Reject"
                                            />
                                        </RadioGroup>
                                    </div>
                                </div>
                                <div className="row g-1">
                                    <div className="col-md-12 col-sm-12 pt-1">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder=" Reason For Cancel"
                                            fullWidth
                                        // value={}
                                        // name=""
                                        // changeTextValue={(e) => }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" >Submit</Button>
                    <Button onClick={handleClose} color="primary" >Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    )
}

export default memo(ModelOTApprove)
