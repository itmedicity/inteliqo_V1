import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { TextField, Button } from '@mui/material'
import { getYear } from 'date-fns'
import React, { Fragment, memo, useContext, useState } from 'react'
import moment from 'moment';
import NumberFormat from 'react-number-format'
import { useHistory, useParams } from 'react-router'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import PageLayout from 'src/views/CommonCode/PageLayout'
import { employeeNumber } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import DesignationMast from 'src/views/CommonCode/DesignationMast'
import EmployeeExperienceTable from './EmployeeFileTable/EmployeeExperienceTable'

const EmployeeExperience = () => {

    const classes = useStyles()
    const { id, no } = useParams();
    const history = useHistory();
    //use state for incrementing count
    const [count, setCount] = useState(0)
    //designation select list
    const { selectDesignation,
        updateDesignation } = useContext(PayrolMasterContext)
    const reset = () => {
        updateDesignation(0)
    }
    //use States for date
    const [workstartdate, setWorkdate] = useState(new Date())
    const [workenddate, setWorkEnddate] = useState(new Date())

    //Initial State
    const [formData, setformData] = useState({
        institution_name: "",
        designation: "",
        total_year: 0,
        gross_salary: ""
    })
    //defaultState
    const defaultState = {
        institution_name: "",
        designation: "",
        total_year: 0,
        gross_salary: ""
    }
    //Destructuring
    const { institution_name, designation, total_year, gross_salary } = formData

    //setting work start Date
    const setWorkstartdate = (val) => {
        setWorkdate(val)
    }
    //setting work End Date
    const setWorkenddate = (val) => {
        setWorkEnddate(val)
    }
    //getting form data
    const updateEmployeeExpFormData = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setformData({ ...formData, [e.target.name]: value })
    }

    //for calculating total year
    const changeyear = () => {
        const startdate = getYear(workstartdate)
        const enddate = getYear(workenddate)
        const expyear = enddate - startdate
        const year = {
            institution_name: institution_name,
            designation: designation,
            total_year: expyear,
            gross_salary: gross_salary
        }
        setformData(year)
    }
    //postData
    const postData = {
        em_no: id,
        em_institution: institution_name,
        em_designation: selectDesignation,
        em_from: moment(workstartdate).format('YYYY-MM-DD'),
        em_to: moment(workenddate).format('YYYY-MM-DD'),
        em_total_year: total_year,
        em_salary: gross_salary,
        create_user: employeeNumber()
    }
    //saving formdata
    const submitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin.post('/experience', postData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            setformData(defaultState)
            setCount(count + 1)
            setWorkdate(null)
            setWorkEnddate(null)
            reset()
        }
        else {
            errorNofity('Error Occured!!!!Please Contact EDP')
        }
    }
    //redirecting to home page
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${id}/${no}`)
    }
    return (
        <Fragment>
            <PageLayout heading="Employee Experience">
                <div className="col-md-4">
                    <form className={classes.root} onSubmit={submitFormData}>
                        <div className="row">
                            <div className="col-md-12">
                                <TextField
                                    label="Institution Name"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    variant="outlined"
                                    required
                                    name="institution_name"
                                    value={institution_name}
                                    onChange={(e) => updateEmployeeExpFormData(e)}
                                />
                            </div>
                            <div className="col-md-12 pt-2 pl-3">
                                <DesignationMast />
                            </div>
                            <div className="col-md-12 pt-2">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Work Start Date"
                                        name="workstartdate"
                                        type="date"
                                        clearable
                                        value={workstartdate}
                                        onChange={(e) => {
                                            setWorkstartdate(e)
                                            changeyear()
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
                            <div className="col-md-12 pt-2">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Work End Date"
                                        name="workenddate"
                                        type="date"
                                        value={workenddate}
                                        onChange={(e) => {
                                            setWorkenddate(e)
                                            changeyear()
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
                            <div className="col-md-12 pt-2">
                                <TextField
                                    label="Total Year"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    variant="outlined"
                                    required
                                    name="total_year"
                                    value={total_year}
                                    onChange={(e) => updateEmployeeExpFormData(e)}
                                />
                            </div>
                            <div className="col-md-12 pt-2">
                                <NumberFormat
                                    customInput={TextField}
                                    label="Gross Salary"
                                    fullWidth
                                    format="#########"
                                    variant="outlined"
                                    size="small"
                                    autoComplete="off"
                                    type="text"
                                    thousandSeparator={false}
                                    allowNegative={false}
                                    name="gross_salary"
                                    value={gross_salary}
                                    onChange={(e) => updateEmployeeExpFormData(e)}
                                />
                            </div>
                            <div className="row col-md-12">
                                <div className="col-md-6 col-sm-12 col-xs-12 mb-1 pt-2 pl-2">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        fullWidth
                                        type="Submit"
                                    >
                                        Save
                                    </Button>
                                </div>
                                <div className="col-md-6 col-sm-12 col-xs-12 mb-1 pt-2 pl-2">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        fullWidth
                                        type="Submit"
                                        onClick={RedirectToProfilePage}
                                    >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-md-8">
                    <EmployeeExperienceTable update={count} />
                </div>
            </PageLayout>
        </Fragment >
    )
}

export default memo(EmployeeExperience)
