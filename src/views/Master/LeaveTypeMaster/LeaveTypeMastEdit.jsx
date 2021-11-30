import { TextField, Checkbox, FormControlLabel, Select, MenuItem, FormControl, Button } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import LeaveTypeMastTable from './LeaveTypeMastTable'

const LeaveTypeMastEdit = () => {


    const history = useHistory()
    const classes = useStyles();
    const { id } = useParams();

    const [disable, setDisabled] = useState("")//for setting disabled
    const [formData, setFormData] = useState({
        lvetype_desc: "",
        lvetype_code: "",
        carryforward: false,
        avail_on_traing_probation: false,
        avail_on_after_confirm: false,
        half_day_allowed: false,
        leave_credit_policy: "",
        leave_credit_policy_count: "",
        status: false,
        is_lop: false,
        is_holiday: false,
        is_leave: false

    })

    const defaultState = {
        lvetype_desc: "",
        lvetype_code: "",
        carryforward: false,
        avail_on_traing_probation: false,
        avail_on_after_confirm: false,
        half_day_allowed: false,
        leave_credit_policy: "0",
        leave_credit_policy_count: "",
        status: false,
        is_lop: false,
        is_holiday: false,
        is_leave: false
    }

    //de structuring
    const { lvetype_desc, lvetype_code, carryforward,
        avail_on_traing_probation, avail_on_after_confirm, half_day_allowed,
        leave_credit_policy, leave_credit_policy_count, status, is_lop,
        is_holiday, is_leave } = formData


    useEffect(() => {
        const getLeaveTypeMasterData = async () => {
            const result = await axioslogin.get(`/leaveType/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { lvetype_desc, lvetype_code, carryforward,
                    avail_on_traing_probation, avail_on_after_confirm, half_day_allowed,
                    leave_credit_policy, leave_credit_policy_count, status, is_lop,
                    is_holiday, is_leave } = data[0]

                const formData = {
                    lvetype_slno: id,
                    lvetype_desc: lvetype_desc,
                    lvetype_code: lvetype_code,
                    carryforward: carryforward === 1 ? true : false,
                    avail_on_traing_probation: avail_on_traing_probation === 1 ? true : false,
                    avail_on_after_confirm: avail_on_after_confirm === 1 ? true : false,
                    half_day_allowed: half_day_allowed === 1 ? true : false,
                    leave_credit_policy: leave_credit_policy,
                    leave_credit_policy_count: leave_credit_policy_count,
                    status: status === 1 ? true : false,
                    is_lop: is_lop === 1 ? true : false,
                    is_holiday: is_holiday === 1 ? true : false,
                    is_leave: is_leave === 1 ? true : false

                }
                setFormData(formData)
            }
        }
        getLeaveTypeMasterData()
    }, [id])
    //update Edit Details

    const updateLeaveMastEditFormData = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })

        if (e.target.name === 'select_leave_policy' && value === '4') {
            setDisabled('disabled')
        }
        else {
            setDisabled('')
        }

    }


    const submitLeaveTypeEditFormData = async (e) => {
        e.preventDefault();
        const updateData = {
            lvetype_slno: id,
            lvetype_desc: lvetype_desc,
            lvetype_code: lvetype_code,
            carryforward: carryforward === true ? 1 : 0,
            avail_on_traing_probation: avail_on_traing_probation === true ? 1 : 0,
            avail_on_after_confirm: avail_on_after_confirm === true ? 1 : 0,
            half_day_allowed: half_day_allowed === true ? 1 : 0,
            leave_credit_policy: leave_credit_policy,
            leave_credit_policy_count: leave_credit_policy_count,
            status: status === true ? 1 : 0,
            is_lop: is_lop === true ? 1 : 0,
            is_holiday: is_holiday === true ? 1 : 0,
            is_leave: is_leave === true ? 1 : 0,
        }

        const result = await axioslogin.patch('/leaveType', updateData)
        const { success, message } = result.data
        if (success === 2) {
            succesNofity(message)
            setFormData(defaultState)
        }
        else {
            errorNofity("Error Occured!!!!Please Contact EDP")
        }
    }


    const toSettings = () => {
        history.push('/Home/Settings')
    }


    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Leave Type Master</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classes.root} onSubmit={submitLeaveTypeEditFormData} >
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField
                                            disabled
                                            label="Leave Type"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            name="lvetype_desc"
                                            value={lvetype_desc}
                                            onChange={(e) => updateLeaveMastEditFormData(e)}
                                        />

                                    </div>
                                    <div className="col-md-12 pt-2">
                                        <TextField
                                            disabled
                                            label="Leave Type Code"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            name="lvetype_code"
                                            value={lvetype_code}
                                            onChange={(e) => updateLeaveMastEditFormData(e)}
                                        />

                                    </div>
                                    <div className="col-md-12 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="carryforward"
                                                    color="secondary"
                                                    value={carryforward}
                                                    checked={carryforward}
                                                    className="ml-2"
                                                    onChange={(e) => updateLeaveMastEditFormData(e)}
                                                />
                                            }
                                            label="Leave Carry Forwad"
                                        />
                                    </div>
                                    <div className="col-md-12 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="avail_on_traing_probation"
                                                    color="secondary"
                                                    value={avail_on_traing_probation}
                                                    checked={avail_on_traing_probation}
                                                    className="ml-2"
                                                    onChange={(e) => updateLeaveMastEditFormData(e)}
                                                />
                                            }
                                            label="Avail on Training/probation Probation Period"
                                        />
                                    </div>
                                    <div className="col-md-12 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="avail_on_after_confirm"
                                                    color="secondary"
                                                    value={avail_on_after_confirm}
                                                    checked={avail_on_after_confirm}
                                                    className="ml-2"
                                                    onChange={(e) => updateLeaveMastEditFormData(e)}
                                                />
                                            }
                                            label="Avail On After Training/Training Confirmation"
                                        />
                                    </div>
                                    <div className="col-md-12 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="half_day_allowed"
                                                    color="secondary"
                                                    value={half_day_allowed}
                                                    checked={half_day_allowed}
                                                    className="ml-2"
                                                    onChange={(e) => updateLeaveMastEditFormData(e)}
                                                />
                                            }
                                            label="Half Day Allowed"
                                        />
                                    </div>

                                    <div className="col-md-12">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="is_lop"
                                                    color="secondary"
                                                    value={is_lop}
                                                    checked={is_lop}
                                                    className="ml-2"
                                                    onChange={(e) => updateLeaveMastEditFormData(e)}
                                                />
                                            }
                                            label="Lop"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="is_holiday"
                                                    color="secondary"
                                                    value={is_holiday}
                                                    checked={is_holiday}
                                                    className="ml-2"
                                                    onChange={(e) => updateLeaveMastEditFormData(e)}
                                                />
                                            }
                                            label="Holi Day"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="is_leave"
                                                    color="secondary"
                                                    value={is_leave}
                                                    checked={is_leave}
                                                    className="ml-2"
                                                    onChange={(e) => updateLeaveMastEditFormData(e)}
                                                />
                                            }
                                            label="Leave"
                                        />
                                    </div>
                                    <div className="col-md-12 pb-0 mb-0">
                                        <FormControl
                                            fullWidth
                                            margin="dense"
                                            className="mt-1 mb-1"
                                        >
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="leave_credit_policy"
                                                value={leave_credit_policy}
                                                onChange={(e) => updateLeaveMastEditFormData(e)}
                                                fullWidth
                                                variant="outlined"
                                                className="ml-1"
                                            >
                                                <MenuItem value='0' disabled>
                                                    Select Leave Credit Policy
                                                </MenuItem>
                                                <MenuItem value='1' >
                                                    Day
                                                </MenuItem>
                                                <MenuItem value='2' >
                                                    Monthly
                                                </MenuItem>
                                                <MenuItem value='3' >
                                                    Yearly
                                                </MenuItem>
                                                <MenuItem value='4' >
                                                    Based On Leave
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-12 pb-0 mb-0">
                                        <TextField
                                            label="Count"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            disabled={disable}
                                            name="leave_credit_policy_count"
                                            value={leave_credit_policy_count}
                                            onChange={(e) => updateLeaveMastEditFormData(e)}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="status"
                                                    color="secondary"
                                                    value={status}
                                                    checked={status}
                                                    className="ml-2"
                                                    onChange={(e) => updateLeaveMastEditFormData(e)}
                                                />
                                            }
                                            label="Status"
                                        />

                                    </div>
                                    <div className="row col-md-12 pb-0 mb-0 pt-3 pl-0">
                                        <div className="col-md-6 col-sm-12 col-xs-12 mb-1">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                fullWidth
                                                type="Submit"
                                                className="ml-2"
                                            >
                                                Save
                                            </Button>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-1">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                fullWidth
                                                className="ml-2"
                                                onClick={toSettings}
                                            >
                                                Close
                                            </Button>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                        <div className="col-md-8">
                            <LeaveTypeMastTable />
                        </div>
                    </div>
                </div>
            </div >
        </Fragment >
    )
}

export default LeaveTypeMastEdit
