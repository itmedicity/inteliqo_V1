import React, { Fragment, memo, useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextInput from 'src/views/Component/TextInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import { axioslogin } from 'src/views/Axios/Axios';
import { useContext } from 'react';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { FormControl, MenuItem, Select, TextareaAutosize, Typography } from '@material-ui/core'
import { Button, Checkbox, DialogActions } from '@mui/material';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import OTRemarkCompnt from '../OTComponent/OTRemarkCompnt';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const ModelHRApproval = ({ open, handleClose, otno, setCount, count }) => {
    const { employeedetails } = useContext(PayrolMasterContext)
    const { em_id } = employeedetails
    const [otAdd, setOtAdd] = useState({
        totalot: ''
    })
    const [newottime, setnewottime] = useState({
        over_time: 0,
    })
    const [modeldata, setModeldata] = useState({
        ot_days: '',
        overtime: '',
        ot_reson: '',
        ot_inch_status: '',
        ot_inch_remark: '',
        ot_hod_status: '',
        ot_hod_remark: '',
        ot_ceo_status: '',
        ot_ceo_remark: '',
        emp_id: '',
        inchargeAuth: '',
        hodAuth: '',
        ceoAuth: ''
    })
    const [hr, sethr] = useState({
        ot_type: '0',
        approve: false,
        reject: false,
        ot_hr_remark: ''
    })
    const { ot_type, approve, reject, ot_hr_remark } = hr
    const updatehrApproval = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        sethr({ ...hr, [e.target.name]: value })
    }

    //Get Data
    useEffect(() => {
        const getOt = async () => {
            const result = await axioslogin.get(`/overtimerequest/hr/list/${otno}`)
            const { success, data } = result.data;
            if (success === 1) {
                const { ot_coff_type, ot_days, over_time, ot_reson, ot_inch_remark, ot_hod_remark, emp_id,
                    ot_inch_status, ot_hod_status, ot_ceo_status, ot_ceo_remark, ot_hr_status, ot_hr_remark,
                    ot_inch_require, ot_hod_require, ot_ceo_require } = data[0]
                if (ot_hr_status !== 0) {
                    const frmdata = {
                        ot_days: ot_days,
                        overtime: over_time,
                        ot_reson: ot_reson,
                        ot_inch_status: ot_inch_status,
                        ot_inch_remark: ot_inch_remark,
                        ot_hod_status: ot_hod_status,
                        ot_hod_remark: ot_hod_remark,
                        ot_ceo_status: ot_ceo_status,
                        ot_ceo_remark: ot_ceo_remark,
                        emp_id: emp_id,
                        inchargeAuth: ot_inch_require,
                        hodAuth: ot_hod_require,
                        ceoAuth: ot_ceo_require
                    }
                    const hr = {
                        ot_type: ot_coff_type,
                        ot_hr_remark: ot_hr_remark,
                        approve: ot_hr_status === 1 ? true : false,
                        reject: ot_hr_status === 2 ? true : false,
                    }
                    const frm = {
                        over_time: over_time
                    }
                    const frmot = {
                        totalot: over_time
                    }
                    setOtAdd(frmot)
                    setnewottime(frm)
                    setModeldata(frmdata);
                    sethr(hr)
                } else {
                    const frmdata = {
                        ot_days: ot_days,
                        overtime: over_time,
                        ot_reson: ot_reson,
                        ot_inch_status: ot_inch_status,
                        ot_inch_remark: ot_inch_remark,
                        ot_hod_status: ot_hod_status,
                        ot_hod_remark: ot_hod_remark,
                        ot_ceo_status: ot_ceo_status,
                        ot_ceo_remark: ot_ceo_remark,
                        emp_id: emp_id,
                        inchargeAuth: ot_inch_require,
                        hodAuth: ot_hod_require,
                        ceoAuth: ot_ceo_require
                    }
                    const hr = {
                        ot_type: ot_coff_type,
                        ot_hr_remark: '',
                        approve: false,
                        reject: false,
                    }
                    const frm = {
                        over_time: over_time
                    }
                    const frmot = {
                        totalot: over_time
                    }
                    setOtAdd(frmot)
                    setnewottime(frm)
                    setModeldata(frmdata);
                    sethr(hr)
                }
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getOt();
    }, [otno]);

    const patchData = {
        ot_hr_status: approve === true ? 1 : reject === true ? 2 : 0,
        ot_hr_remark: ot_hr_remark,
        ot_hr_user: em_id,
        ot_coff_type: ot_type,
        ot_new_time: otAdd.totalot,
        emp_id: modeldata.emp_id,
        ot_status: reject === true ? 2 : 0,
        ot_slno: otno
    }
    const resetotadd = {
        totalot: ''
    }
    const resetnewot = {
        over_time: ''
    }
    const resetmodel = {
        ot_days: '',
        overtime: '',
        ot_reson: '',
        ot_inch_status: '',
        ot_inch_remark: '',
        ot_hod_status: '',
        ot_hod_remark: '',
        ot_ceo_status: '',
        ot_ceo_remark: '',
        emp_id: '',
        inchargeAuth: '',
        hodAuth: '',
        ceoAuth: ''
    }
    const resethr = {
        ot_type: '',
        approve: false,
        reject: false,
        ot_inch_remark: ''
    }

    const submithr = async (e) => {
        e.preventDefault()
        const result = await axioslogin.patch('/overtimerequest/hrapprove', patchData)
        const { success, message } = result.data
        if (success === 2) {
            succesNofity(message);
            setCount(count + 1)
            sethr(resethr)
            setModeldata(resetmodel)
            setnewottime(resetnewot)
            setOtAdd(resetotadd)
            handleClose()
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
                    {"Over Time HR Approval/Reject"}
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
                                            value={newottime.over_time}
                                        />
                                    </div>
                                </div>
                                {<OTRemarkCompnt heading={'Over Time Reason'} remarks={modeldata.ot_reson} />}
                                {modeldata.ot_inch_status === 1 ? <OTRemarkCompnt
                                    heading={'Incharge Remarks'}
                                    status={modeldata.ot_inch_status}
                                    remarks={modeldata.ot_inch_remark}
                                /> : null}
                                {modeldata.ot_hod_status === 1 ? <OTRemarkCompnt
                                    heading={'HOD Remarks'}
                                    status={modeldata.ot_hod_status}
                                    remarks={modeldata.ot_hod_remark}
                                /> : null}
                                {modeldata.ot_ceo_status === 1 ? <OTRemarkCompnt
                                    heading={'CEO Remarks'}
                                    status={modeldata.ot_ceo_status}
                                    remarks={modeldata.ot_ceo_remark}
                                /> : null}
                                <div className="col-md-12">
                                    <div className="row g-3">
                                        <div className="col-md-5">
                                            <FormControl
                                                fullWidth
                                                margin="dense"
                                            >
                                                <Select
                                                    name="ot_type"
                                                    fullWidth
                                                    variant="outlined"
                                                    className="ml-1"
                                                    defaultValue={0}
                                                    value={ot_type}
                                                    // onChange={(e) => {
                                                    //     updatehrApproval(e)
                                                    //     updatechageottype(e.target.value)
                                                    //     checkOT(e.target.value)
                                                    // }
                                                    //}
                                                    style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                                >
                                                    <MenuItem value='0'>Select OT Type</MenuItem>
                                                    <MenuItem value='1'>Compensatory Off</MenuItem>
                                                    <MenuItem value='2'>Over Time</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="col-md-1"></div>
                                        <div className="col-md-3">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="approve"
                                                        color="primary"
                                                        value={approve}
                                                        checked={approve}
                                                        disabled={reject === true ? true : false}
                                                        className="ml-2 "
                                                        onChange={(e) =>
                                                            updatehrApproval(e)
                                                        }
                                                    />
                                                }
                                                label="Approve"
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="reject"
                                                        color="primary"
                                                        value={reject}
                                                        checked={reject}
                                                        disabled={approve === true ? true : false}
                                                        className="ml-2 "
                                                        onChange={(e) =>
                                                            updatehrApproval(e)
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
                                            placeholder="hr Remarks"
                                            style={{ width: 514 }}
                                            name="ot_hr_remark"
                                            value={ot_hr_remark}
                                            onChange={(e) => updatehrApproval(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={submithr}>Submit</Button>
                    <Button onClick={handleClose} color="primary" >Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    )
}

export default memo(ModelHRApproval)
