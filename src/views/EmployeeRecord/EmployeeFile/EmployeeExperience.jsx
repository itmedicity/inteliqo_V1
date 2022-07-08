import { getYear } from 'date-fns'
import React, { Fragment, memo, useContext, useState } from 'react'
import moment from 'moment';
import { useHistory, useParams } from 'react-router'
import PageLayout from 'src/views/CommonCode/PageLayout'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, getDayDiffrence, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import DesignationMast from 'src/views/CommonCode/DesignationMast'
import EmployeeExperienceTable from './EmployeeFileTable/EmployeeExperienceTable'
import FooterSaveClosebtn from 'src/views/CommonCode/FooterSaveClosebtn'
import TextInput from 'src/views/Component/TextInput'
import ReactTooltip from 'react-tooltip'
import { format } from 'date-fns'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'

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
    const [totyear, settotyear] = useState(0)
    //Initial State
    const [formData, setformData] = useState({
        institution_name: "",
        gross_salary: "",
        workstartdate: format(new Date(), "yyyy-MM-dd"),
        workenddate: format(new Date(), "yyyy-MM-dd")
    })
    //defaultState
    const defaultState = {
        institution_name: "",
        gross_salary: "",
        workstartdate: format(new Date(), "yyyy-MM-dd"),
        workenddate: format(new Date(), "yyyy-MM-dd")
    }
    //Destructuring
    const { institution_name, gross_salary, workstartdate, workenddate } = formData
    //getting form data
    const updateEmployeeExpFormData = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setformData({ ...formData, [e.target.name]: value })
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
        em_institution: institution_name,
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
        const result = await axioslogin.post('/experience', postData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            setformData(defaultState)
            setCount(count + 1)
            settotyear(0)
            reset()
        }
        else if (success === 2) {
            warningNofity(message)
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
                    <form className={classes.root} onSubmit={submitFormData}>
                        <div className="card-body">
                            <div className="row g-1">
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row g-1">
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
                                                        name="totyear"
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
                                        </div >
                                    </div >
                                </div >
                                <div className="col-md-8">
                                    <EmployeeExperienceTable update={count} />
                                </div>
                            </div >

                        </div >
                        <div className="card-footer text-muted pl-0">
                            <FooterSaveClosebtn
                                redirect={RedirectToProfilePage}
                            />
                        </div>
                    </form >
                </div >
            </PageLayout >
        </Fragment >
    )
}

export default memo(EmployeeExperience)
