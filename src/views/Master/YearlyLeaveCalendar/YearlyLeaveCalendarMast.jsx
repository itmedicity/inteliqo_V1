import { Fragment, memo, useContext, useState } from "react"
import React from 'react'
import LeaveTypeSelect from 'src/views/CommonCode/LeaveTypeSelect'
import SessionCheck from "src/views/Axios/SessionCheck"
import { ToastContainer } from "react-toastify"
import { PayrolMasterContext } from "src/Context/MasterContext"
import moment from 'moment';
import { useStyles } from "src/views/CommonCode/MaterialStyle"
import { Checkbox, FormControlLabel, TextField, Button } from '@material-ui/core'
import { succesNofity, warningNofity } from "src/views/CommonCode/Commonfunc"
import { axioslogin } from "src/views/Axios/Axios"
import YearlyLeaveCalendarTable from "./YearlyLeaveCalendarTable"
import { useHistory } from "react-router"
import { employeeNumber } from "src/views/Constant/Constant"
import { lastDayOfYear, startOfYear } from "date-fns"
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const YearlyLeaveCalendarMast = () => {
    const classes = useStyles()
    const history = useHistory()
    const [count, setCount] = useState(0)
    const [holidaydate, setValue] = useState(null);
    const [year, setYear] = useState(null);
    const {
        selectLeaveType,
        updateLeaveType
    } = useContext(PayrolMasterContext)

    //setting initial state
    const [formData, setformData] = useState({
        calendar_leave: '',
        status: false
    })

    //destructuring
    const { calendar_leave, status } = formData

    const updateYearlyLeaveCalendar = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setformData({ ...formData, [e.target.name]: value })

    }

    const setHolidaydate = (val) => {
        setValue(val)
    }

    const setHolidayYear = (val) => {
        setYear(val)
    }
    const reset = () => {
        updateLeaveType(0)
    }

    //SETTING DEFAULT STATE
    const defaultState = {
        calendar_leave: '',
        status: false
    }

    //MOMENT HOLIDAY DATE
    const holiday_date = moment(holidaydate).format('YYYY-MM-DD')

    //MOMENT HOLIDAY YEAR
    const holiday_year = moment(year).format('YYYY')

    //post data
    const postdata = {
        hld_desc: calendar_leave,
        lvetype_slno: selectLeaveType,
        hld_date: holiday_date,
        hld_year: holiday_year,
        hld_status: status === false ? 0 : 1,
        create_user: employeeNumber()
    }

    const submitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin.post('/holidaylist', postdata)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            setformData(defaultState)
            setCount(count + 1)
            reset();
            setValue(null)
            setYear(null)
        }
        else {
            warningNofity(message)
        }
    }

    //to settings
    const toSettings = () => {
        history.push('/Home/Settings')
    }
    //DATEVALIDATION
    const startyear = startOfYear(new Date())
    const endofyear = lastDayOfYear(new Date())


    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Yearly Leave Calendar</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 ">
                            <form className={classes.root} onSubmit={submitFormData}>
                                <div className="col-md-12 row">
                                    <div className="col-md-3 pt-2">
                                        <LeaveTypeSelect />
                                    </div>
                                    <div className="col-md-3 pt-2">
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="Holiday Date"
                                                name="holidaydate"
                                                type="date"
                                                minDate={startyear}
                                                maxDate={endofyear}
                                                value={holidaydate}
                                                onChange={(e) => {
                                                    setHolidaydate(e)
                                                }}
                                                renderInput={(params) => <TextField {...params}
                                                    fullWidth
                                                    size="small"
                                                    autoComplete="off"
                                                    variant="outlined"
                                                />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                    <div className="col-md-3 p-2">
                                        <TextField
                                            label="Calendar Leave Name"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            name="calendar_leave"
                                            value={calendar_leave}
                                            onChange={(e) => updateYearlyLeaveCalendar(e)}
                                        />
                                    </div>
                                    <div className="col-md-2 pt-2">
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                views={['year']}
                                                label="Year"
                                                name="year"
                                                value={year}
                                                minDate={new Date()}
                                                onChange={(e) => {
                                                    setHolidayYear(e)
                                                }}
                                                renderInput={(params) => <TextField {...params}
                                                    fullWidth
                                                    size="small"
                                                    name="datepick"
                                                    autoComplete="off"
                                                    variant="outlined"
                                                    helperText={null} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                    <div className="col-md-1">
                                        <FormControlLabel
                                            className="pb-0 mb-0 pt-2"
                                            control={
                                                <Checkbox
                                                    name="status"
                                                    color="primary"
                                                    value={status}
                                                    checked={status}
                                                    className="ml-1"
                                                    onChange={(e) => updateYearlyLeaveCalendar(e)}
                                                />
                                            }
                                            label="Status"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <YearlyLeaveCalendarTable update={count} />
                                </div>
                                <div className="row col-md-12 pt-2">
                                    <div className="col-md-2 col-sm-12 col-xs-12 mb-1">
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
                                    <div className="col-md-2 col-sm-12 col-xs-1">
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
        </Fragment>
    )
}

export default memo(YearlyLeaveCalendarMast)
