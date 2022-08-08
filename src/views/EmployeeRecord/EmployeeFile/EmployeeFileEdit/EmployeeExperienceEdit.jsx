
import { format, getYear } from 'date-fns'
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
import ReactTooltip from 'react-tooltip'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { Checkbox, FormControlLabel } from '@material-ui/core';

const EmployeeExperienceEdit = () => {

    const history = useHistory()
    const classes = useStyles()
    const { slno, id, no } = useParams()
    const { selectDesignation,
        updateDesignation } = useContext(PayrolMasterContext)
    //rest context
    const reset = () => {
        updateDesignation(0)
    }
    const [totyear, settotyear] = useState(0)
    //initial state 
    const [formData, setFormData] = useState({
        institution_name: "",
        total_year: "",
        gross_salary: "",
        workstartdate: format(new Date(), "yyyy-MM-dd"),
        workenddate: format(new Date(), "yyyy-MM-dd"),
        tmch_exp: false
    })
    //defaultState
    const defaultState = {
        institution_name: "",
        designation: "",
        total_year: 0,
        gross_salary: "",
        workstartdate: format(new Date(), "yyyy-MM-dd"),
        workenddate: format(new Date(), "yyyy-MM-dd"),
        tmch_exp: false
    }

    //destructuring
    const { institution_name, workstartdate, workenddate, gross_salary, tmch_exp } = formData
    //getting data to be edited
    useEffect(() => {
        const getemployeexperience = async () => {
            const result = await axioslogin.get(`/experience/${slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const { em_institution, em_designation,
                    em_from, em_to, em_total_year, em_salary, is_tmch } = data[0]
                const frmData = {
                    institution_name: em_institution,
                    gross_salary: em_salary,
                    workstartdate: em_from,
                    workenddate: em_to,
                    tmch_exp: is_tmch
                }
                updateDesignation(em_designation)
                setFormData(frmData)
                settotyear(em_total_year)

            }
        }
        getemployeexperience()
    }, [slno, updateDesignation])

    //getting form data
    const updateEmployeeExpFormData = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
        //calculating total working year
        const startdate = getYear(new Date(workstartdate))
        const enddate = getYear(new Date(workenddate))
        const expyear = enddate - startdate
        settotyear(expyear)
    }
    //postData
    const postData = {
        em_no: id,
        em_id: no,
        emexp_slno: slno,
        em_institution: institution_name,
        tmch_exp: tmch_exp === false ? 0 : 1,
        em_designation: selectDesignation,
        em_from: moment(workstartdate).format('YYYY-MM-DD'),
        em_to: moment(workenddate).format('YYYY-MM-DD'),
        em_total_year: totyear,
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
            settotyear(0)
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
                    <form className={classes.root} onSubmit={submitFormData}>
                        <div className="card-body">
                            <div className="row g-1">
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row g-1">
                                                <div className="col-md-11">
                                                    <TextInput
                                                        type="text"
                                                        classname="form-control form-control-sm"
                                                        Placeholder="Institution Name"
                                                        changeTextValue={(e) => updateEmployeeExpFormData(e)}
                                                        value={institution_name}
                                                        name="institution_name"
                                                    />
                                                </div>
                                                <div className="col-md-1 " data-tip="Medicity Experience" data-for='toolTip1' data-place='top'>
                                                    <ReactTooltip id="toolTip1" />
                                                    <FormControlLabel
                                                        className=""
                                                        control={
                                                            <Checkbox
                                                                name="tmch_exp"
                                                                color="secondary"
                                                                value={tmch_exp}
                                                                checked={tmch_exp}
                                                                className="pl-2 pt-1 pb-1"
                                                                onChange={(e) => {
                                                                    updateEmployeeExpFormData(e)
                                                                }}
                                                            />
                                                        }
                                                    />
                                                </div>
                                                <div className="col-md-12">
                                                    <DesignationMast style={SELECT_CMP_STYLE} />
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="row g-1">
                                                        <div className="col-md-6 " data-tip="Work Start Date" data-for='toolTip1' data-place='top'>
                                                            <ReactTooltip id="toolTip1" />
                                                            <TextInput
                                                                type="date"
                                                                classname="form-control form-control-sm"
                                                                Placeholder="Start Date"
                                                                max={moment(new Date()).format('YYYY-MM-DD')}
                                                                value={workstartdate}
                                                                name="workstartdate"
                                                                changeTextValue={(e) => {
                                                                    updateEmployeeExpFormData(e)
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 " data-tip="Work End Date" data-for='toolTip1' data-place='top'>
                                                            <ReactTooltip id="toolTip1" />
                                                            <TextInput
                                                                type="date"
                                                                classname="form-control form-control-sm"
                                                                Placeholder="Start Date"
                                                                min={moment(workstartdate).format('YYYY-MM-DD')}
                                                                max={moment(new Date()).format('YYYY-MM-DD')}
                                                                value={workenddate}
                                                                name="workenddate"
                                                                changeTextValue={(e) => {
                                                                    updateEmployeeExpFormData(e)
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <TextInput
                                                        type="text"
                                                        classname="form-control form-control-sm"
                                                        Placeholder="Total Year"
                                                        value={totyear}
                                                        name="totyeartotyear"
                                                        disabled={true}
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
                                <div className="col-md-8">
                                    <EmployeeExperienceTable />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer text-muted">
                            <FooterSaveClosebtn
                                redirect={RedirectToProfilePage}
                            />
                        </div>
                    </form>
                </div >
            </PageLayout >
        </Fragment >
    )
}

export default memo(EmployeeExperienceEdit)
