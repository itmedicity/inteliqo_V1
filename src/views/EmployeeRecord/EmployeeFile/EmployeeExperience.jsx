import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { TextField } from '@mui/material'
import { getYear } from 'date-fns'
import React, { Fragment, memo, useContext, useState } from 'react'
import moment from 'moment';
import { useHistory, useParams } from 'react-router'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import PageLayout from 'src/views/CommonCode/PageLayout'
import { employeeNumber } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import DesignationMast from 'src/views/CommonCode/DesignationMast'
import EmployeeExperienceTable from './EmployeeFileTable/EmployeeExperienceTable'
import FooterSaveClosebtn from 'src/views/CommonCode/FooterSaveClosebtn'
import TextInput from 'src/views/Component/TextInput'

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
                <div className="card">
                    <form onSubmit={submitFormData}>
                        <div className="card-body">
                            <div className="row g-2">
                                <div className="col-md-5">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row g-2">
                                                <div className="col-md-12">
                                                    <TextInput
                                                        type="text"
                                                        classname="form-control form-control-sm"
                                                        Placeholder="Institution Name"
                                                        changeTextValue={(e) => updateEmployeeExpFormData(e)}
                                                        value={institution_name}
                                                        name="institution_name"
                                                    />
                                                </div>

                                                <div className="col-md-12">
                                                    <DesignationMast style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                                </div>

                                                <div className="col-md-12" >
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <DatePicker
                                                            //label="Work Start Date"
                                                            name="workstartdate"
                                                            type="date"
                                                            clearable
                                                            value={workstartdate}
                                                            onChange={(e) => {
                                                                setWorkstartdate(e)
                                                                changeyear()
                                                            }}
                                                            InputProps={{
                                                                className: classes.customInputFeild
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

                                                <div className="col-md-12" >
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <DatePicker
                                                            //label="Work End Date"
                                                            name="workenddate"
                                                            type="date"
                                                            value={workenddate}
                                                            onChange={(e) => {
                                                                setWorkenddate(e)
                                                                changeyear()
                                                            }}
                                                            InputProps={{
                                                                className: classes.customInputFeild
                                                            }}
                                                            renderInput={(params) => <TextField {...params}
                                                                fullWidth
                                                                size="small"
                                                                autoComplete="off"
                                                                variant="outlined"
                                                                className="mt-1"
                                                            />}
                                                        />
                                                    </LocalizationProvider>
                                                </div>

                                                <div className="col-md-12">
                                                    <TextInput
                                                        type="text"
                                                        classname="form-control form-control-sm"
                                                        Placeholder="Total Year"
                                                        changeTextValue={(e) => updateEmployeeExpFormData(e)}
                                                        value={total_year}
                                                        name="total_year"
                                                    />
                                                </div>

                                                <div className="col-md-12">
                                                    <TextInput
                                                        type="text"
                                                        classname="form-control form-control-sm"
                                                        Placeholder="Gross Salary"
                                                        changeTextValue={(e) => updateEmployeeExpFormData(e)}
                                                        value={gross_salary}
                                                        name="gross_salary"
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <EmployeeExperienceTable update={count} />
                                </div>
                            </div>

                        </div>
                        <div className="card-footer text-muted pl-0">
                            <FooterSaveClosebtn
                                redirect={RedirectToProfilePage}
                            />
                        </div>
                    </form>
                </div>
            </PageLayout>
        </Fragment >
    )
}

export default memo(EmployeeExperience)
