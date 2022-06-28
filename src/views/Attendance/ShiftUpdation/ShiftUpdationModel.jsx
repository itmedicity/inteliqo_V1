import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import TextInput from 'src/views/Component/TextInput'
import moment from 'moment'
import PunchInSeelect from './PunchInSeelect'
import PunchOutSelect from './PunchOutSelect'
import { Button, DialogActions, Typography } from '@material-ui/core'
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'

const ShiftUpdationModel = ({ open, handleClose, dutyday, empno, setApiData }) => {
    const [punchin, setPunchIndata] = useState(0)
    const [punchout, setPunchOutdata] = useState(0)
    const [shift, setShift] = useState({
        shift_in: '',
        shift_out: '',
        punch_in: '',
        punch_out: '',
        crossday: 0
    })
    const { shift_in, shift_out, crossday, punch_in, punch_out } = shift
    const defaultState = {
        shift_in: '',
        shift_out: '',
        punch_in: '',
        punch_out: '',
        crossday: 0
    }
    const postData = {
        empno: empno,
        dutyday: dutyday
    }
    useEffect(() => {
        const getpunchDetails = async () => {
            const result = await axioslogin.post('/attendCal/attendanceshiftdetl', postData)
            const { success, data } = result.data
            if (success === 1) {
                const { shift_in, shift_out, shft_cross_day, punch_in, punch_out } = data[0]
                const frmData = {
                    shift_in: shift_in,
                    shift_out: shift_out,
                    crossday: shft_cross_day,
                    punch_in: punch_in,
                    punch_out: punch_out,
                }
                setShift(frmData)
            }
        }
        getpunchDetails()
    }, [dutyday, empno])
    const updatedData = {
        punchIn: punchin,
        punchOut: punchout,
        empno: empno,
        dutyday: dutyday

    }
    //for updating punch in and punch out
    const submitData = async (e) => {
        e.preventDefault();
        const arr = [];
        arr.push(punchin, punchout)
        const postDatapunchState = {
            punch_time: arr,
            emp_code: empno
        }
        const result = await axioslogin.patch('/attendCal', updatedData)
        const { success } = result.data
        if (success === 2) {
            const result = await axioslogin.patch('/attendCal/updateState', postDatapunchState)
            const { success } = result.data
            if (success === 2) {
                succesNofity('Punch Updated Successfully')
                setShift(defaultState)
                handleClose()
                setApiData([])
            }
        }
        else {
            errorNofity("Error Occurred!!Please Contact EDP")
        }
    }

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Shift Updation"}
                </DialogTitle>
                <DialogContent>
                    <div className="card">
                        <div className="card-body">
                            <div className="row g-1">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-2">
                                            Shift In
                                        </div>
                                        <div className="col-md-4">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Shift In"
                                                disabled="disabled"
                                                value={moment(shift_in).format('HH:00')}
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            Shift Out
                                        </div>
                                        <div className="col-md-4">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Shift In"
                                                disabled="disabled"
                                                value={moment(shift_out).format('HH:00')}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-2">
                                            Punch In
                                        </div>
                                        <div className="col-md-4">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Shift In"
                                                disabled="disabled"
                                                value={punch_in === null ? '-' : punch_in}
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            Puch Out
                                        </div>
                                        <div className="col-md-4">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Shift In"
                                                disabled="disabled"
                                                value={punch_out === null ? '-' : punch_out}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="col-md-12">
                                            <div className="row pt-2">
                                                <div className="col-md-5">
                                                    <Typography>
                                                        ChecK In
                                                    </Typography>
                                                </div>
                                                <div className="col-md-7">
                                                    <PunchInSeelect dutyday={dutyday} crossday={crossday} empno={empno} setPunchIndata={setPunchIndata} />
                                                </div>
                                            </div>
                                            <div className="row pt-2">
                                                <div className="col-md-5">
                                                    <Typography>
                                                        Check Out
                                                    </Typography>
                                                </div>
                                                <div className="col-md-7">
                                                    <PunchOutSelect dutyday={dutyday} crossday={crossday} empno={empno} setPunchOutdata={setPunchOutdata} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={submitData} autoFocus>Process</Button>
                    <Button onClick={handleClose} >Close</Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    )
}

export default ShiftUpdationModel