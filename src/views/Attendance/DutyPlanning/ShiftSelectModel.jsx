import { Button, Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { eachDayOfInterval } from 'date-fns';
import React, { Fragment, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import ShiftSelect from './ShiftSelect';
import moment from 'moment'
import _ from 'underscore';
import { useSelector } from 'react-redux';
const ShiftSelectModel = ({ open, handleClose, empid, startdate, enddate, setupdate }) => {
    const rage = eachDayOfInterval({ start: new Date(startdate), end: new Date(enddate) })

    const commonState = useSelector((state) => state.getCommonSettings, _.isEqual)
    const { week_off_day, notapplicable_shift } = commonState;

    //finding the dates between start date and end date
    const newDateFormat = rage.map((val) => { return { date: moment(val).format('YYYY-MM-DD'), sunday: moment(val).format('d') } })
    const weeklyoff = newDateFormat.map((val) => {
        return val.sunday === '0' ? val.date : 0
    })

    const weeklyoffDayDate = weeklyoff.filter((val) => val !== 0)

    const [shiftid, SetShiftId] = useState(0)
    const [approve, setApprove] = useState({ apprv: false })

    const { apprv } = approve

    const updateData = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setApprove({ ...approve, [e.target.name]: value })
    }

    const postData = [{
        shiftid: shiftid,
        emp_id: empid,
        startdate: startdate,
        enddate: enddate,
        notApplicable: notapplicable_shift
    }]

    //postdata for with weekly off daya - for weekly off day updation
    const postData2 = [{
        shiftid: shiftid,
        emp_id: empid,
        dutydate: weeklyoffDayDate,
        weekOffShiftId: week_off_day,
        notApplicable: notapplicable_shift
    }]

    const submitData = async (e) => {
        e.preventDefault();
        setupdate(0)
        const result = await axioslogin.patch('/plan/shiftupdate', postData)
        const { success } = result.data
        if (success === 1) {
            //updating sunday is week off if the week of sunday check box is checked
            if (apprv === true) {
                const result = await axioslogin.patch('/plan/woffupdate', postData2)
                const { success } = result.data
                if (success === 1) {
                    succesNofity("Duty Plan Updated")
                    handleClose()
                    setupdate(1)
                }
            }
            else {
                succesNofity("Duty Plan Updated")
                handleClose()
                setupdate(1)
            }
        }
        else {
            errorNofity("Error Occured!!!Please Contact EDP")
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
                    {"Shift Select"}
                </DialogTitle>
                <DialogContent>
                    <div className="card">
                        <div className="card-body">
                            <div className="row g-1">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <Typography>Shift</Typography>
                                        </div>
                                        <div className="col-md-6">
                                            <ShiftSelect SetShiftId={SetShiftId} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-5 pt-2">
                                            <Typography>Week Day-Sunday</Typography>
                                        </div>
                                        <div className="col-md-6">
                                            <FormControlLabel
                                                className="pb-0 mb-0"
                                                control={
                                                    <Checkbox
                                                        name="apprv"
                                                        color="primary"
                                                        value={apprv}
                                                        checked={apprv}
                                                        className="ml-2 "
                                                        onChange={(e) =>
                                                            updateData(e)
                                                        }
                                                    />
                                                }
                                            />
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
        </Fragment>
    )
}

export default ShiftSelectModel