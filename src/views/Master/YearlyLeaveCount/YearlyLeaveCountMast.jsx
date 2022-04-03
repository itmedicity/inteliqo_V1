import { TextField, Select, MenuItem, FormControl, FormControlLabel, Checkbox, Button } from '@material-ui/core'
import React, { Fragment, memo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { useHistory } from 'react-router'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeNumber } from 'src/views/Constant/Constant'

const YearlyLeaveCountMast = () => {
    const classes = useStyles()
    const history = useHistory()

    //setting initial data
    const [formData, setformdata] = useState({
        leave_type: "",
        day_month_year: "",
        count: "",
        leave_type2: "",
        leave_type3: "",
        leave_type4: "",
        leave_type5: "",
        leave_type6: "",
        day_month_year1: "0",
        day_month_year2: "0",
        count2: "",
        day_month_year3: "0",
        count3: "",
        day_month_year4: "0",
        count4: "",
        day_month_year5: "0",
        count5: "",
        day_month_year6: "0",
        count6: "",
    })

    //setting default state
    const defaultState = {
        leave_type: "",
        day_month_year: "",
        count: "",
        leave_type2: "",
        leave_type3: "",
        leave_type4: "",
        leave_type5: "",
        leave_type6: "",
        day_month_year1: "0",
        day_month_year2: "0",
        count2: "",
        day_month_year3: "0",
        count3: "",
        day_month_year4: "0",
        count4: "",
        day_month_year5: "0",
        count5: "",
        day_month_year6: "0",
        count6: "",
    }

    //destructuring
    const { leave_type, leave_type2, leave_type3, leave_type4, leave_type5, leave_type6,
        day_month_year1, day_month_year2, day_month_year3, day_month_year4, day_month_year5, day_month_year6,
        count, count2, count3, count4, count5, count6 } = formData

    const updateyearlyleavecount = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.value : e.target.value;
        setformdata({ ...formData, [e.target.name]: value })
    }

    //post data
    const postData = {
        lvetype_slno_cl: leave_type,
        max_allowed_count_cl: count,
        month_year_cl: day_month_year1,
        lvetype_slno_sick: leave_type2,
        max_allowed_count_sick: count2,
        month_year_sick: day_month_year2,
        lvetype_slno_conference: leave_type3,
        max_allowed_count_conference: count3,
        month_year_conference: day_month_year3,
        lvetype_slno_lop: leave_type4,
        max_allowed_count_lop: count4,
        month_year_lop: day_month_year4,
        lvetype_slno_maternity: leave_type5,
        max_allowed_count_maternity: count5,
        month_year_maternity: day_month_year5,
        lvetype_slno_previlage: leave_type6,
        max_allowed_count_previlage: count6,
        month_year_previlage: day_month_year6,
        create_user: employeeNumber()

    }

    //saving yearly leave count
    const submitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin.post('/yearlyleaves', postData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
        }
        else if (success === 7) {
            warningNofity(message)
            setformdata(defaultState)
        }
        else {
            warningNofity(message)
            setformdata(defaultState)
        }
    }

    const getTableData = () => {
        history.push(`/Home/YearlyLeaveCountMastEdit/${1}`)
    }

    const toSettings = () => {
        history.push('/Home/Settings')
    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-dark pb-1 pt-1 border border-dark text-white">
                            <h5>Yearly Leave Count</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <form className={classes.root} onSubmit={submitFormData}>
                                        <div className="row">
                                            <div className="col-md-12 row ">
                                                <div className="col-md-5 col-sm-12 col-xs-1 pt-0 pt-1">
                                                    <FormControlLabel
                                                        className="pb-0 mb-0"
                                                        control={
                                                            <Checkbox
                                                                name="leave_type"
                                                                color="primary"
                                                                value={1}
                                                                className="ml-1"
                                                                onChange={(e) => updateyearlyleavecount(e)}
                                                            />
                                                        }
                                                        label="Casual Leave"
                                                    />
                                                </div>
                                                <div className="col-md-4 col-sm-12 col-xs-1 pl-0">
                                                    <FormControl
                                                        fullWidth
                                                        margin="dense"
                                                        className="mt-0 mb-1 pl-0 pt-1"
                                                    >
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="day_month_year1"
                                                            value={day_month_year1}
                                                            onChange={(e) => updateyearlyleavecount(e)}
                                                            fullWidth
                                                            variant="outlined"
                                                            className="ml-1"
                                                        >
                                                            <MenuItem value='0' disabled>
                                                                Monthly/Yearly
                                                            </MenuItem>
                                                            <MenuItem value='1' >
                                                                Monthly
                                                            </MenuItem>
                                                            <MenuItem value='2' >
                                                                Yearly
                                                            </MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                                <div className="col-md-3 col-sm-10 col-xs-1 pt-0 pt-1 pl-0 pr-0">
                                                    <TextField
                                                        label="count"
                                                        fullWidth
                                                        size="small"
                                                        autoComplete="off"
                                                        variant="outlined"
                                                        name="count"
                                                        value={count}
                                                        onChange={(e) => updateyearlyleavecount(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12 row -0">
                                                <div className="col-md-5 pt-0 pt-1">
                                                    <FormControlLabel
                                                        className="pb-0 mb-0"
                                                        control={
                                                            <Checkbox
                                                                name="leave_type2"
                                                                color="primary"
                                                                value={6}
                                                                className="ml-1"
                                                                onChange={(e) => updateyearlyleavecount(e)}
                                                            />
                                                        }
                                                        label="Sick Leave"
                                                    />
                                                </div>
                                                <div className="col-md-4 pl-0 pt-1">
                                                    <FormControl
                                                        fullWidth
                                                        margin="dense"
                                                        className="mt-1 mb-1"
                                                    >
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="day_month_year2"
                                                            value={day_month_year2}
                                                            onChange={(e) => updateyearlyleavecount(e)}
                                                            fullWidth
                                                            variant="outlined"
                                                            className="ml-1"
                                                        >
                                                            <MenuItem value='0' disabled>
                                                                Monthly/Yearly
                                                            </MenuItem>
                                                            <MenuItem value='1' >
                                                                Monthly
                                                            </MenuItem>
                                                            <MenuItem value='2' >
                                                                Yearly
                                                            </MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                                <div className="col-md-3 pt-0 pt-1 pl-0 pr-0">
                                                    <TextField
                                                        label="count"
                                                        fullWidth
                                                        size="small"
                                                        autoComplete="off"
                                                        variant="outlined"
                                                        name="count2"
                                                        value={count2}
                                                        onChange={(e) => updateyearlyleavecount(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12 row">
                                                <div className="col-md-5 pt-0 pt-1">
                                                    <FormControlLabel
                                                        className="pb-0 mb-0"
                                                        control={
                                                            <Checkbox
                                                                name="leave_type3"
                                                                color="primary"
                                                                value={7}
                                                                className="ml-1"
                                                                onChange={(e) => updateyearlyleavecount(e)}
                                                            />
                                                        }
                                                        label="Conference Leave"
                                                    />
                                                </div>
                                                <div className="col-md-4 pl-0 pt-1">
                                                    <FormControl
                                                        fullWidth
                                                        margin="dense"
                                                        className="mt-1 mb-1"
                                                    >
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="day_month_year3"
                                                            value={day_month_year3}
                                                            onChange={(e) => updateyearlyleavecount(e)}
                                                            fullWidth
                                                            variant="outlined"
                                                            className="ml-1"
                                                        >
                                                            <MenuItem value='0' disabled>
                                                                Monthly/Yearly
                                                            </MenuItem>
                                                            <MenuItem value='1' >
                                                                Monthly
                                                            </MenuItem>
                                                            <MenuItem value='2' >
                                                                Yearly
                                                            </MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                                <div className="col-md-3 pt-0 pt-1 pl-0 pr-0">
                                                    <TextField
                                                        label="count"
                                                        fullWidth
                                                        size="small"
                                                        autoComplete="off"
                                                        variant="outlined"
                                                        name="count3"
                                                        value={count3}
                                                        onChange={(e) => updateyearlyleavecount(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12 row">
                                                <div className="col-md-5 pt-0 pt-1">
                                                    <FormControlLabel
                                                        className="pb-0 mb-0"
                                                        control={
                                                            <Checkbox
                                                                name="leave_type4"
                                                                color="primary"
                                                                value={8}
                                                                className="ml-1"
                                                                onChange={(e) => updateyearlyleavecount(e)}
                                                            />
                                                        }
                                                        label="Loss Of Pay"
                                                    />
                                                </div>
                                                <div className="col-md-4 pl-0 pt-1">
                                                    <FormControl
                                                        fullWidth
                                                        margin="dense"
                                                        className="mt-1 mb-1"
                                                    >
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="day_month_year4"
                                                            value={day_month_year4}
                                                            onChange={(e) => updateyearlyleavecount(e)}
                                                            fullWidth
                                                            variant="outlined"
                                                            className="ml-1"
                                                        >
                                                            <MenuItem value='0' disabled>
                                                                Monthly/Yearly
                                                            </MenuItem>
                                                            <MenuItem value='1' >
                                                                Monthly
                                                            </MenuItem>
                                                            <MenuItem value='2' >
                                                                Yearly
                                                            </MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                                <div className="col-md-3 pt-0 pt-1 pl-0 pr-0">
                                                    <TextField
                                                        label="count"
                                                        fullWidth
                                                        size="small"
                                                        autoComplete="off"
                                                        variant="outlined"
                                                        name="count4"
                                                        value={count4}
                                                        onChange={(e) => updateyearlyleavecount(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12 row">
                                                <div className="col-md-5 pt-0 pt-1">
                                                    <FormControlLabel
                                                        className="pb-0 mb-0"
                                                        control={
                                                            <Checkbox
                                                                name="leave_type5"
                                                                color="primary"
                                                                value={9}
                                                                className="ml-1"
                                                                onChange={(e) => updateyearlyleavecount(e)}
                                                            />
                                                        }
                                                        label="Maternity Leave"
                                                    />
                                                </div>
                                                <div className="col-md-4 pl-0 pt-1">
                                                    <FormControl
                                                        fullWidth
                                                        margin="dense"
                                                        className="mt-1 mb-1"
                                                    >
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="day_month_year5"
                                                            value={day_month_year5}
                                                            onChange={(e) => updateyearlyleavecount(e)}
                                                            fullWidth
                                                            variant="outlined"
                                                            className="ml-1"
                                                        >
                                                            <MenuItem value='0' disabled>
                                                                Monthly/Yearly
                                                            </MenuItem>
                                                            <MenuItem value='1' >
                                                                Monthly
                                                            </MenuItem>
                                                            <MenuItem value='2' >
                                                                Yearly
                                                            </MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                                <div className="col-md-3 pt-0 pt-1 pl-0 pr-0">
                                                    <TextField
                                                        label="count"
                                                        fullWidth
                                                        size="small"
                                                        autoComplete="off"
                                                        variant="outlined"
                                                        name="count5"
                                                        value={count5}
                                                        onChange={(e) => updateyearlyleavecount(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12 row">
                                                <div className="col-md-5 pt-0 pt-1">
                                                    <FormControlLabel
                                                        className="pb-0 mb-0"
                                                        control={
                                                            <Checkbox
                                                                name="leave_type6"
                                                                color="primary"
                                                                value={10}
                                                                className="ml-1"
                                                                onChange={(e) => updateyearlyleavecount(e)}
                                                            />
                                                        }
                                                        label="Previlage Leave"
                                                    />
                                                </div>
                                                <div className="col-md-4 pl-0 pt-1">
                                                    <FormControl
                                                        fullWidth
                                                        margin="dense"
                                                        className="mt-1 mb-1 pt-0"
                                                    >
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="day_month_year6"
                                                            value={day_month_year6}
                                                            onChange={(e) => updateyearlyleavecount(e)}
                                                            fullWidth
                                                            variant="outlined"
                                                            className="ml-1"
                                                        >
                                                            <MenuItem value='0' disabled>
                                                                Monthly/Yearly
                                                            </MenuItem>
                                                            <MenuItem value='1' >
                                                                Monthly
                                                            </MenuItem>
                                                            <MenuItem value='2' >
                                                                Yearly
                                                            </MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                                <div className="col-md-3 pt-0 pt-1 pl-0 pr-0">
                                                    <TextField
                                                        label="count"
                                                        fullWidth
                                                        size="small"
                                                        autoComplete="off"
                                                        variant="outlined"
                                                        name="count6"
                                                        value={count6}
                                                        onChange={(e) => updateyearlyleavecount(e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row col-md-12 pt-2">
                                            <div className="col-md-3 col-sm-12 col-xs-12 pl-0">
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
                                            <div className="col-md-3 col-sm-12 col-xs-1 pl-0">
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    fullWidth
                                                    className="ml-2"
                                                    onClick={getTableData}
                                                >
                                                    Edit
                                                </Button>
                                            </div>
                                            <div className="col-md-3 col-sm-12 col-xs-1 pl-0">
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
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </Fragment >
    )
}

export default memo(YearlyLeaveCountMast)
