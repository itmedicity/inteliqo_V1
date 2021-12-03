import { TextField, Select, MenuItem, FormControl, FormControlLabel, Checkbox, Button } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { useHistory } from 'react-router'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { useParams } from 'react-router'
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeNumber } from 'src/views/Constant/Constant'

const YearlyLeaveCountMastEdit = () => {
    const classes = useStyles();
    const { id } = useParams()
    const history = useHistory()

    //setting initial State
    const [formData, setformdata] = useState({
        lvetype_slno_cl: false,
        max_allowed_count_cl: "",
        month_year_cl: "0",
        lvetype_slno_sick: false,
        max_allowed_count_sick: "",
        month_year_sick: "0",
        lvetype_slno_conference: false,
        max_allowed_count_conference: "",
        month_year_conference: "0",
        lvetype_slno_lop: false,
        max_allowed_count_lop: "",
        month_year_lop: "0",
        lvetype_slno_maternity: false,
        max_allowed_count_maternity: "",
        month_year_maternity: "0",
        lvetype_slno_previlage: false,
        max_allowed_count_previlage: "",
        month_year_previlage: "0"
    })

    //destructuring
    const {
        lvetype_slno_cl,
        max_allowed_count_cl,
        month_year_cl,
        lvetype_slno_sick,
        max_allowed_count_sick,
        month_year_sick,
        lvetype_slno_conference,
        max_allowed_count_conference,
        month_year_conference,
        lvetype_slno_lop,
        max_allowed_count_lop,
        month_year_lop,
        lvetype_slno_maternity,
        max_allowed_count_maternity,
        month_year_maternity,
        lvetype_slno_previlage,
        max_allowed_count_previlage,
        month_year_previlage
    } = formData

    //setting defaultstate
    const defaultState = {
        lvetype_slno_cl: false,
        max_allowed_count_cl: "",
        month_year_cl: "0",
        lvetype_slno_sick: false,
        max_allowed_count_sick: "",
        month_year_sick: "0",
        lvetype_slno_conference: false,
        max_allowed_count_conference: "",
        month_year_conference: "0",
        lvetype_slno_lop: false,
        max_allowed_count_lop: "",
        month_year_lop: "0",
        lvetype_slno_maternity: false,
        max_allowed_count_maternity: "",
        month_year_maternity: "0",
        lvetype_slno_previlage: false,
        max_allowed_count_previlage: "",
        month_year_previlage: "0"
    }

    useEffect(() => {
        const getLeaveCountData = async () => {
            const result = await axioslogin.get(`/yearlyleaves/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const {
                    lvetype_slno_cl,
                    max_allowed_count_cl,
                    month_year_cl,
                    lvetype_slno_sick,
                    max_allowed_count_sick,
                    month_year_sick,
                    lvetype_slno_conference,
                    max_allowed_count_conference,
                    month_year_conference,
                    lvetype_slno_lop,
                    max_allowed_count_lop,
                    month_year_lop,
                    lvetype_slno_maternity,
                    max_allowed_count_maternity,
                    month_year_maternity,
                    lvetype_slno_previlage,
                    max_allowed_count_previlage,
                    month_year_previlage
                } = data[0]
                const formData = {
                    lvetype_slno_cl: lvetype_slno_cl === 1 ? true : false,
                    max_allowed_count_cl: max_allowed_count_cl,
                    month_year_cl: month_year_cl,
                    lvetype_slno_sick: lvetype_slno_sick === 6 ? true : false,
                    max_allowed_count_sick: max_allowed_count_sick,
                    month_year_sick: month_year_sick,
                    lvetype_slno_conference: lvetype_slno_conference === 7 ? true : false,
                    max_allowed_count_conference: max_allowed_count_conference,
                    month_year_conference: month_year_conference,
                    lvetype_slno_lop: lvetype_slno_lop === 8 ? true : false,
                    max_allowed_count_lop: max_allowed_count_lop,
                    month_year_lop: month_year_lop,
                    lvetype_slno_maternity: lvetype_slno_maternity === 9 ? true : false,
                    max_allowed_count_maternity: max_allowed_count_maternity,
                    month_year_maternity: month_year_maternity,
                    lvetype_slno_previlage: lvetype_slno_previlage === 10 ? true : false,
                    max_allowed_count_previlage: max_allowed_count_previlage,
                    month_year_previlage: month_year_previlage
                }
                setformdata(formData)
            }
        }
        getLeaveCountData()
    }, [id])

    const updateyearlyleavecountEdit = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setformdata({ ...formData, [e.target.name]: value })
    }

    const submitFormData = async (e) => {
        e.preventDefault();
        const updateData = {
            com_slno: id,
            lvetype_slno_cl: lvetype_slno_cl === true ? 1 : 0,
            max_allowed_count_cl: max_allowed_count_cl,
            month_year_cl: month_year_cl,
            lvetype_slno_sick: lvetype_slno_sick === true ? 6 : 0,
            max_allowed_count_sick: max_allowed_count_sick,
            month_year_sick: month_year_sick,
            lvetype_slno_conference: lvetype_slno_conference === true ? 7 : 0,
            max_allowed_count_conference: max_allowed_count_conference,
            month_year_conference: month_year_conference,
            lvetype_slno_lop: lvetype_slno_lop === true ? 8 : 0,
            max_allowed_count_lop: max_allowed_count_lop,
            month_year_lop: month_year_lop,
            lvetype_slno_maternity: lvetype_slno_maternity === true ? 9 : 0,
            max_allowed_count_maternity: max_allowed_count_maternity,
            month_year_maternity: month_year_maternity,
            lvetype_slno_previlage: lvetype_slno_previlage === true ? 10 : 0,
            max_allowed_count_previlage: max_allowed_count_previlage,
            month_year_previlage: month_year_previlage,
            edit_user: employeeNumber()
        }
        const result = await axioslogin.patch('/yearlyleaves', updateData)
        const { success, message } = result.data
        if (success === 2) {
            setformdata(defaultState)
            history.push('/Home/YearlyLeaveCount')
            succesNofity(message)
        }
        else {
            warningNofity(message)
        }
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
                                            <div className="col-md-12 col-sm-12 col-xs-12 row ">
                                                <div className="col-md-4 pt-0 pt-1">
                                                    <FormControlLabel
                                                        className="pb-0 mb-0"
                                                        control={
                                                            <Checkbox
                                                                name="lvetype_slno_cl"
                                                                color="primary"
                                                                value={lvetype_slno_cl}
                                                                disabled checked={lvetype_slno_cl}
                                                                className="ml-1"
                                                                onChange={(e) => updateyearlyleavecountEdit(e)}
                                                            />
                                                        }
                                                        label="Casual Leave"
                                                    />
                                                </div>
                                                <div className="col-md-5 pl-0">
                                                    <FormControl
                                                        fullWidth
                                                        margin="dense"
                                                        className="mt-1 mb-1 pl-0 pt-1"
                                                    >
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="month_year_cl"
                                                            value={month_year_cl}
                                                            onChange={(e) => updateyearlyleavecountEdit(e)}
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
                                                <div className="col-md-2 pt-0 pt-1 pl-0 pr-0">
                                                    <TextField
                                                        label="count"
                                                        fullWidth
                                                        size="small"
                                                        autoComplete="off"
                                                        variant="outlined"
                                                        name="max_allowed_count_cl"
                                                        value={max_allowed_count_cl}
                                                        onChange={(e) => updateyearlyleavecountEdit(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12 row">
                                                <div className="col-md-4 pt-0 pt-1">
                                                    <FormControlLabel
                                                        className="pb-0 mb-0"
                                                        control={
                                                            <Checkbox
                                                                name="lvetype_slno_sick"
                                                                color="primary"
                                                                value={lvetype_slno_sick}
                                                                disabled checked={lvetype_slno_sick}
                                                                className="ml-1"
                                                                onChange={(e) => updateyearlyleavecountEdit(e)}
                                                            />
                                                        }
                                                        label="Sick Leave"
                                                    />
                                                </div>
                                                <div className="col-md-5 pl-0 pt-1">
                                                    <FormControl
                                                        fullWidth
                                                        margin="dense"
                                                        className="mt-1 mb-1"
                                                    >
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="month_year_sick"
                                                            value={month_year_sick}
                                                            onChange={(e) => updateyearlyleavecountEdit(e)}
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
                                                <div className="col-md-2 pt-0 pt-1 pl-0 pr-0">
                                                    <TextField
                                                        label="count"
                                                        fullWidth
                                                        size="small"
                                                        autoComplete="off"
                                                        variant="outlined"
                                                        name="max_allowed_count_sick"
                                                        value={max_allowed_count_sick}
                                                        onChange={(e) => updateyearlyleavecountEdit(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12 row">
                                                <div className="col-md-4 pt-0 pt-1">
                                                    <FormControlLabel
                                                        className="pb-0 mb-0"
                                                        control={
                                                            <Checkbox
                                                                name="lvetype_slno_conference"
                                                                color="primary"
                                                                value={lvetype_slno_conference}
                                                                disabled checked={lvetype_slno_conference}
                                                                className="ml-1"
                                                                onChange={(e) => updateyearlyleavecountEdit(e)}
                                                            />
                                                        }
                                                        label="Conference Leave"
                                                    />
                                                </div>
                                                <div className="col-md-5 pl-0 pt-1">
                                                    <FormControl
                                                        fullWidth
                                                        margin="dense"
                                                        className="mt-1 mb-1"
                                                    >
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="month_year_conference"
                                                            value={month_year_conference}
                                                            onChange={(e) => updateyearlyleavecountEdit(e)}
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
                                                <div className="col-md-2 pt-0 pt-1 pl-0 pr-0">
                                                    <TextField
                                                        label="count"
                                                        fullWidth
                                                        size="small"
                                                        autoComplete="off"
                                                        variant="outlined"
                                                        name="max_allowed_count_conference"
                                                        value={max_allowed_count_conference}
                                                        onChange={(e) => updateyearlyleavecountEdit(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12 row">
                                                <div className="col-md-4 pt-0 pt-1">
                                                    <FormControlLabel
                                                        className="pb-0 mb-0"
                                                        control={
                                                            <Checkbox
                                                                name="lvetype_slno_lop"
                                                                color="primary"
                                                                value={lvetype_slno_lop}
                                                                disabled checked={lvetype_slno_lop}
                                                                className="ml-1"
                                                                onChange={(e) => updateyearlyleavecountEdit(e)}
                                                            />
                                                        }
                                                        label="Loss Of Pay"
                                                    />
                                                </div>
                                                <div className="col-md-5 pl-0 pt-1">
                                                    <FormControl
                                                        fullWidth
                                                        margin="dense"
                                                        className="mt-1 mb-1"
                                                    >
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="month_year_lop"
                                                            value={month_year_lop}
                                                            onChange={(e) => updateyearlyleavecountEdit(e)}
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
                                                <div className="col-md-2 pt-0 pt-1 pl-0 pr-0">
                                                    <TextField
                                                        label="count"
                                                        fullWidth
                                                        size="small"
                                                        autoComplete="off"
                                                        variant="outlined"
                                                        name="max_allowed_count_lop"
                                                        value={max_allowed_count_lop}
                                                        onChange={(e) => updateyearlyleavecountEdit(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12 row">
                                                <div className="col-md-4 pt-0 pt-1">
                                                    <FormControlLabel
                                                        className="pb-0 mb-0"
                                                        control={
                                                            <Checkbox
                                                                name="lvetype_slno_maternity"
                                                                color="primary"
                                                                value={lvetype_slno_maternity}
                                                                disabled checked={lvetype_slno_maternity}
                                                                className="ml-1"
                                                                onChange={(e) => updateyearlyleavecountEdit(e)}
                                                            />
                                                        }
                                                        label="Maternity Leave"
                                                    />
                                                </div>
                                                <div className="col-md-5 pl-0 pt-1">
                                                    <FormControl
                                                        fullWidth
                                                        margin="dense"
                                                        className="mt-1 mb-1"
                                                    >
                                                        <Select

                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="month_year_maternity"
                                                            value={month_year_maternity}
                                                            onChange={(e) => updateyearlyleavecountEdit(e)}
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
                                                <div className="col-md-2 pt-0 pt-1 pl-0 pr-0">
                                                    <TextField
                                                        label="count"
                                                        fullWidth
                                                        size="small"
                                                        autoComplete="off"
                                                        variant="outlined"
                                                        name="max_allowed_count_maternity"
                                                        value={max_allowed_count_maternity}
                                                        onChange={(e) => updateyearlyleavecountEdit(e)}
                                                    />

                                                </div>
                                            </div>
                                            <div className="col-md-12 row">

                                                <div className="col-md-4 pt-0 pt-1">


                                                    <FormControlLabel
                                                        className="pb-0 mb-0"
                                                        control={
                                                            <Checkbox

                                                                name="lvetype_slno_previlage"
                                                                color="primary"
                                                                value={lvetype_slno_previlage}
                                                                disabled checked={lvetype_slno_previlage}
                                                                className="ml-1"
                                                                onChange={(e) => updateyearlyleavecountEdit(e)}
                                                            />
                                                        }
                                                        label="Previlage Leave"
                                                    />
                                                </div>
                                                <div className="col-md-5 pl-0 pt-1">

                                                    <FormControl
                                                        fullWidth
                                                        margin="dense"
                                                        className="mt-1 mb-1 pt-0"

                                                    >
                                                        <Select

                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="month_year_previlage"
                                                            value={month_year_previlage}
                                                            onChange={(e) => updateyearlyleavecountEdit(e)}
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
                                                <div className="col-md-2 pt-0 pt-1 pl-0 pr-0">

                                                    <TextField
                                                        label="count"
                                                        fullWidth
                                                        size="small"
                                                        autoComplete="off"
                                                        variant="outlined"
                                                        name="max_allowed_count_previlage"
                                                        value={max_allowed_count_previlage}
                                                        onChange={(e) => updateyearlyleavecountEdit(e)}
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

export default YearlyLeaveCountMastEdit

