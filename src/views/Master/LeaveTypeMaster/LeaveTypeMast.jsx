import { TextField, Checkbox, FormControlLabel, Select, MenuItem, FormControl, Button } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { succesNofity } from 'src/views/CommonCode/Commonfunc'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { employeeNumber } from 'src/views/Constant/Constant'
import LeaveTypeMastTable from './LeaveTypeMastTable'

const LeaveTypeMast = () => {
    const classes = useStyles()
    const history = useHistory()



    const [count, setCount] = useState(0)
    //setting initial state
    const [formData, setformData] = useState({
        leave_type: "",
        leave_type_code: '',
        Leave_Carry_Forwad: false,
        Leave_avail_training: false,
        Leave_avail_after_training: false,
        half_day: false,
        lop: false,
        holiday: false,
        Leave: false,
        leave_policy_count: "",
        select_leave_policy: "0",
        status: false,
    })

    const { leave_type, leave_type_code, Leave_Carry_Forwad, Leave_avail_training, Leave_avail_after_training,
        half_day, lop, holiday, Leave, leave_policy_count, select_leave_policy, status } = formData




    const updateLeaveMastFormData = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setformData({ ...formData, [e.target.name]: value })



    }

    const postFormdata = {
        lvetype_desc: leave_type,
        lvetype_code: leave_type_code,
        carryforward: Leave_Carry_Forwad === false ? 0 : 1,
        avail_on_traing_probation: Leave_avail_training === false ? 0 : 1,
        avail_on_after_confirm: Leave_avail_after_training === false ? 0 : 1,
        half_day_allowed: half_day === false ? 0 : 1,
        is_lop: lop === false ? 0 : 1,
        is_holiday: holiday === false ? 0 : 1,
        is_leave: Leave === false ? 0 : 1,
        leave_credit_policy: select_leave_policy,
        leave_credit_policy_count: leave_policy_count,
        status: status === false ? 0 : 1,
        create_user: employeeNumber()

    }

    //setting default state
    const defaultState = {
        leave_type: "",
        leave_type_code: '',
        Leave_Carry_Forwad: false,
        Leave_avail_training: false,
        Leave_avail_after_training: false,
        half_day: false,
        lop: false,
        holiday: false,
        Leave: false,
        leave_policy_count: "",
        select_leave_policy: "",
        status: false,
    }

    const submitFormDataLeaveType = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/leaveType', postFormdata)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            setCount(count + 1)
            setformData(defaultState)
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
                            <form className={classes.root} onSubmit={submitFormDataLeaveType}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField
                                            label="Leave Type"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            name="leave_type"
                                            value={leave_type}
                                            onChange={(e) => updateLeaveMastFormData(e)}
                                        />

                                    </div>
                                    <div className="col-md-12 pt-2">
                                        <TextField
                                            label="Leave Type Code"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            name="leave_type_code"
                                            value={leave_type_code}
                                            onChange={(e) => updateLeaveMastFormData(e)}
                                        />

                                    </div>
                                    <div className="col-md-12 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="Leave_Carry_Forwad"
                                                    color="secondary"
                                                    value={Leave_Carry_Forwad}
                                                    checked={Leave_Carry_Forwad}
                                                    className="ml-2"
                                                    onChange={(e) => updateLeaveMastFormData(e)}
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
                                                    name="Leave_avail_training"
                                                    color="secondary"
                                                    value={Leave_avail_training}
                                                    checked={Leave_avail_training}
                                                    className="ml-2"
                                                    onChange={(e) => updateLeaveMastFormData(e)}
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
                                                    name="Leave_avail_after_training"
                                                    color="secondary"
                                                    value={Leave_avail_after_training}
                                                    checked={Leave_avail_after_training}
                                                    className="ml-2"
                                                    onChange={(e) => updateLeaveMastFormData(e)}
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
                                                    name="half_day"
                                                    color="secondary"
                                                    value={half_day}
                                                    checked={half_day}
                                                    className="ml-2"
                                                    onChange={(e) => updateLeaveMastFormData(e)}
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
                                                    name="lop"
                                                    color="secondary"
                                                    value={lop}
                                                    checked={lop}
                                                    className="ml-2"
                                                    onChange={(e) => updateLeaveMastFormData(e)}
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
                                                    name="holiday"
                                                    color="secondary"
                                                    value={holiday}
                                                    checked={holiday}
                                                    className="ml-2"
                                                    onChange={(e) => updateLeaveMastFormData(e)}
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
                                                    name="Leave"
                                                    color="secondary"
                                                    value={Leave}
                                                    checked={Leave}
                                                    className="ml-2"
                                                    onChange={(e) => updateLeaveMastFormData(e)}
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
                                                name="select_leave_policy"
                                                value={select_leave_policy}
                                                onChange={(e) => updateLeaveMastFormData(e)}
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
                                            label="Leave Policy Count"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            name="leave_policy_count"
                                            value={leave_policy_count}
                                            onChange={(e) => updateLeaveMastFormData(e)}
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
                                                    onChange={(e) => updateLeaveMastFormData(e)}
                                                />
                                            }
                                            label="Status"
                                        />
                                    </div>
                                    {/* </div> */}
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
                            <LeaveTypeMastTable update={count} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default LeaveTypeMast
