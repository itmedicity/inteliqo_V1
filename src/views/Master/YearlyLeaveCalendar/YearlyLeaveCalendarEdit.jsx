import { Fragment, memo, useContext, useState, useEffect } from "react"
import React from 'react'
import LeaveTypeSelect from 'src/views/CommonCode/LeaveTypeSelect'
import SessionCheck from "src/views/Axios/SessionCheck"
import { ToastContainer } from "react-toastify"
import { PayrolMasterContext } from "src/Context/MasterContext"
import { DatePicker, LocalizationProvider } from "@mui/lab"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import moment from 'moment';
import { useHistory, useParams } from 'react-router'
import { useStyles } from "src/views/CommonCode/MaterialStyle"
import { Checkbox, FormControlLabel, TextField, Button } from '@material-ui/core'
import { axioslogin } from 'src/views/Axios/Axios';
import YearlyLeaveCalendarTable from "./YearlyLeaveCalendarTable"
import { isAfter } from "date-fns"
import { errorNofity, succesNofity } from "src/views/CommonCode/Commonfunc"
import { employeeNumber } from "src/views/Constant/Constant"

const YearlyLeaveCalendarEdit = () => {
    const history = useHistory()
    const classes = useStyles()
    const { id } = useParams()
    const [holidaydate, setValue] = useState(null);
    const [count, setCount] = useState(0)
    const [year, setYear] = useState();

    //setting initial state
    const [formData, setFormData] = useState({
        hld_desc: "",
        hld_date: "",
        hld_year: "",
        hld_status: false
    })

    //Destructuring
    const { hld_desc, hld_status } = formData
    const {
        selectLeaveType,
        updateLeaveType
    } = useContext(PayrolMasterContext)

    useEffect(() => {
        const getYearlyLeaveCalendardata = async () => {
            const result = await axioslogin.get(`/holidaylist/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { lvetype_slno, hld_desc,
                    hld_date, hld_year, hld_status } = data[0]
                const frmData = {
                    lvetype_slno: lvetype_slno,
                    hld_desc: hld_desc,
                    hld_year: hld_year,
                    hld_status: hld_status === 1 ? true : false
                }
                updateLeaveType(lvetype_slno)
                setValue(hld_date)
                setFormData(frmData)
                const dateholi = new Date(hld_year, 6, 2)
                setYear(dateholi)
            }
        }
        getYearlyLeaveCalendardata()
    }, [id, updateLeaveType])

    const updateYearlyLeaveCalendarEdit = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }

    //moment date
    var holidate = moment(holidaydate)
    var holiyear = moment(year).format('YYYY')

    const postData = {
        hld_desc: hld_desc,
        hld_year: holiyear,
        hld_status: hld_status === true ? 1 : 0,
        hld_date: moment(holidate).format('YYYY-MM-DD'),
        lvetype_slno: selectLeaveType,
        edit_user: employeeNumber(),
        hld_slno: id
    }

    //date comparison
    const result = isAfter(new Date(), new Date(holidate))
    //update
    const submitFormData = async (e) => {
        e.preventDefault()
        if (result === false) {
            const result = await axioslogin.patch('/holidaylist', postData)
            const { success, message } = result.data
            if (success === 2) {
                setCount(count + 1)
                setValue(null)
                setYear(null)
                history.push('/Home/YearlyLeaveCalendar')
                succesNofity(message)
            }
        }
        else {
            errorNofity('holiday Date is passed!!! Cannot Edit')
        }
    }

    //to settings
    const toSettings = () => {
        history.push('/Home/Settings')
    }

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
                                                name="hld_date"
                                                type="date"
                                                value={holidaydate}
                                                onChange={(e) => {
                                                    setValue(e)
                                                }}
                                                renderInput={(params) => <TextField {...params}
                                                    fullWidth
                                                    size="small"
                                                    variant="outlined"
                                                />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                    <div className="col-md-3 p-2">
                                        <TextField
                                            label="Calendar Leave"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            name="hld_desc"
                                            value={hld_desc}
                                            onChange={(e) => updateYearlyLeaveCalendarEdit(e)}
                                        />
                                    </div>
                                    <div className="col-md-2 pt-2">
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                views={['year']}
                                                label="Holiday Year"
                                                name="hld_year"
                                                value={year}
                                                onChange={(e) => {
                                                    setYear(e)
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
                                    <div className="col-md-1">
                                        <FormControlLabel
                                            className="pb-0 mb-0 pt-2"
                                            control={
                                                <Checkbox
                                                    name="hld_status"
                                                    color="primary"
                                                    value={hld_status}
                                                    checked={hld_status}
                                                    className="ml-1"
                                                    onChange={(e) => updateYearlyLeaveCalendarEdit(e)}
                                                />
                                            }
                                            label="Status"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <YearlyLeaveCalendarTable />
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

export default memo(YearlyLeaveCalendarEdit)
