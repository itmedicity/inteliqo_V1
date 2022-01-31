import React, { Fragment, memo, useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextInput from 'src/views/Component/TextInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import { axioslogin } from 'src/views/Axios/Axios';
import { TextareaAutosize, Typography } from '@material-ui/core'
import { Button, Checkbox, DialogActions } from '@mui/material';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const ModelCEOApproval = ({ open, handleClose, otno, setCount, count }) => {
    const [modeldata, setModeldata] = useState({
        ot_days: '',
        over_time: '',
        ot_reson: ''
    })
    //Get Data
    useEffect(() => {
        const getOt = async () => {
            const result = await axioslogin.get(`/overtimerequest/ceo/list/${otno}`)
            const { success, data } = result.data;
            if (success === 1) {
                const { ot_days, over_time, ot_reson } = data[0]
                const frmdata = {
                    ot_days: ot_days,
                    over_time: over_time,
                    ot_reson: ot_reson
                }
                setModeldata(frmdata);
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getOt();
    }, [otno, count]);

    const [ceo, setceo] = useState({
        approve: false,
        reject: false,
        ot_ceo_remark: ''

    })
    const { approve, reject, ot_ceo_remark } = ceo
    const updateCeoApproval = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setceo({ ...ceo, [e.target.name]: value })
    }
    const patchData = {
        ot_ceo_status: approve === true ? 1 : reject === true ? 2 : 0,
        ot_ceo_remark: ot_ceo_remark,
        ot_slno: otno
    }
    const resetfrm = {
        approve: false,
        reject: false,
        ot_ceo_remark: ''
    }

    const submitCeo = async (e) => {
        e.preventDefault()
        const result = await axioslogin.patch('/overtimerequest/ceoapprove', patchData)
        const { success, message } = result.data
        if (success === 2) {
            succesNofity(message)
            setCount(count + 1)
            setceo(resetfrm)
            handleClose()
        }
        else {
            errorNofity(message)
        }
    }

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                <DialogTitle>
                    {"Over Time CEO Approval/Reject"}
                </DialogTitle>
                <DialogContent sx={{
                    minWidth: 500,
                    maxWidth: 600,
                    width: 600,
                }}>
                    <div className="card">
                        <div className="card-body">
                            <div className="col-md-12 col-sm-12">
                                <div className="row g-1">
                                    <div className="col-md-5 pt-1" >
                                        <Typography>Over Time Date</Typography>
                                    </div>
                                    <div className="col-md-7" >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Over Time Date"
                                            fullWidth
                                            disabled="Disabled"
                                            value={modeldata.ot_days}
                                        />
                                    </div>
                                </div>
                                <div className="row g-1 pt-2">
                                    <div className="col-md-5 pt-1" >
                                        <Typography>Time in Minutes</Typography>
                                    </div>
                                    <div className="col-md-7" >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Time in Minutes"
                                            fullWidth
                                            disabled="Disabled"
                                            value={modeldata.over_time}
                                        />
                                    </div>
                                </div>
                                <div className="row g-1 pt-2">
                                    <div className="col-md-12" >
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={3}
                                            placeholder="Over Time Reason"
                                            style={{ width: 514 }}
                                            disabled={true}
                                            value={modeldata.ot_reson}
                                        />
                                    </div>
                                </div>
                                <div className="row g-1">
                                    <div className="d-flex justify-content-center">
                                        <div className="col-md-4"></div>
                                        <div className="col-md-4">
                                            <FormControlLabel
                                                className="pb-0 mb-0"
                                                control={
                                                    <Checkbox
                                                        name="approve"
                                                        color="primary"
                                                        value={approve}
                                                        checked={approve}
                                                        disabled={reject === true ? true : false}
                                                        className="ml-2 "
                                                        onChange={(e) =>
                                                            updateCeoApproval(e)
                                                        }
                                                    />
                                                }
                                                label="Approve"
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <FormControlLabel
                                                className="pb-0 mb-0"
                                                control={
                                                    <Checkbox
                                                        name="reject"
                                                        color="primary"
                                                        value={reject}
                                                        checked={reject}
                                                        disabled={approve === true ? true : false}
                                                        className="ml-2 "
                                                        onChange={(e) =>
                                                            updateCeoApproval(e)
                                                        }
                                                    />
                                                }
                                                label="Reject"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-1 pt-2">
                                    <div className="col-md-12" >
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={3}
                                            placeholder="CEO Remarks"
                                            style={{ width: 514 }}
                                            name="ot_ceo_remark"
                                            value={ot_ceo_remark}
                                            onChange={(e) => updateCeoApproval(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={submitCeo}>Submit</Button>
                    <Button onClick={handleClose} color="primary" >Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    )
}

export default memo(ModelCEOApproval)
