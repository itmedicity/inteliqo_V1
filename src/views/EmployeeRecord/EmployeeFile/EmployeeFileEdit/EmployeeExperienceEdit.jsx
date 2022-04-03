import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { TextField } from '@mui/material'
import { getYear } from 'date-fns'
import React, { Fragment, memo, useContext, useEffect, useState } from 'react'
import moment from 'moment';
import { useHistory, useParams } from 'react-router'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import PageLayout from 'src/views/CommonCode/PageLayout'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import DesignationMast from 'src/views/CommonCode/DesignationMast'
import EmployeeExperienceTable from '../EmployeeFileTable/EmployeeExperienceTable'
import TextInput from 'src/views/Component/TextInput'
import FooterSaveClosebtn from 'src/views/CommonCode/FooterSaveClosebtn'

const EmployeeExperienceEdit = () => {

    const history = useHistory()
    const classes = useStyles()
    const { slno, id, no } = useParams()
    //use States for date
    const [workstartdate, setWorkdate] = useState(new Date())
    const [workenddate, setWorkEnddate] = useState(new Date())
    const { selectDesignation,
        updateDesignation } = useContext(PayrolMasterContext)
    //setting work start Date
    const setWorkstartdate = (val) => {
        setWorkdate(val)
    }
    //setting work End Date
    const setWorkenddate = (val) => {
        setWorkEnddate(val)
    }
    //rest context
    const reset = () => {
        updateDesignation(0)
    }
    //initial state 
    const [formData, setFormData] = useState({
        institution_name: "",
        total_year: "",
        gross_salary: ""
    })
    //defaultState
    const defaultState = {
        institution_name: "",
        designation: "",
        total_year: 0,
        gross_salary: ""
    }

    //destructuring
    const { institution_name, total_year, gross_salary } = formData
    //getting data to be edited
    useEffect(() => {
        const getemployeexperience = async () => {
            const result = await axioslogin.get(`/experience/${slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const { em_institution, em_designation,
                    em_from, em_to, em_total_year, em_salary } = data[0]
                const frmData = {
                    institution_name: em_institution,
                    total_year: em_total_year,
                    gross_salary: em_salary
                }
                updateDesignation(em_designation)
                setWorkdate(em_from)
                setWorkEnddate(em_to)
                setFormData(frmData)

            }
        }
        getemployeexperience()
    }, [slno, updateDesignation])

    //for calculating total year
    const changeyear = () => {
        const startdate = getYear(new Date(workstartdate))
        const enddate = getYear(new Date(workenddate))
        const expyear = enddate - startdate
        const year = {
            institution_name: institution_name,
            total_year: expyear,
            gross_salary: gross_salary
        }
        setFormData(year)
    }

    //getting form data
    const updateEmployeeExpFormData = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }
    //postData
    const postData = {
        em_no: id,
        em_id: no,
        emexp_slno: slno,
        em_institution: institution_name,
        em_designation: selectDesignation,
        em_from: moment(workstartdate).format('YYYY-MM-DD'),
        em_to: moment(workenddate).format('YYYY-MM-DD'),
        em_total_year: total_year,
        em_salary: gross_salary,
        create_user: no
    }

    //saving formdata
    const submitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin.patch('/experience', postData)
        const { success, message } = result.data
        if (success === 2) {
            succesNofity(message)
            setFormData(defaultState)
            setWorkdate(new Date())
            setWorkEnddate(new Date())
            history.push(`/Home/EmployeeExperience/${id}/${no}`)
            succesNofity(message)
            reset()
        }
        else {
            errorNofity('Error Occured!!!Please Contact EDP')
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
                    <div className="card-body">
                        <div className="row g-1">
                            <div className="col-md-4">
                                <form className={classes.root} onSubmit={submitFormData}>
                                    <div className="row">
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
                                        <div className="col-md-12 pt-2 pl-3">
                                            <DesignationMast style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                        </div>
                                        <div className="col-md-12 pt-1" style={{
                                            paddingLeft: '0.5rem', paddingRight: '-0.1rem'

                                        }} >
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    //label="Work Start Date"
                                                    name="workstartdate"
                                                    maxDate={new Date()}
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
                                        <div className="col-md-12 pt-1" style={{
                                            paddingLeft: '0.5rem', paddingRight: '-0.1rem'
                                        }} >
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    //label="Work End Date"
                                                    name="workenddate"
                                                    minDate={new Date(workstartdate)}
                                                    maxDate={new Date()}
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
                                                    />}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                        <div className="col-md-12 pt-1 pl-0 pb-2">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Total Year"
                                                changeTextValue={(e) => updateEmployeeExpFormData(e)}
                                                value={total_year}
                                                name="total_year"
                                            />
                                        </div>

                                        <div className="card-footer text-muted">
                                            <FooterSaveClosebtn
                                                redirect={RedirectToProfilePage}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-8">
                                <EmployeeExperienceTable />
                            </div>

                        </div>
                    </div>
                </div>
            </PageLayout>
        </Fragment>
    )
}

export default memo(EmployeeExperienceEdit)
