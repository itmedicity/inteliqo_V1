import { TextareaAutosize } from '@material-ui/core'
import { addDays } from 'date-fns/esm'
import moment from 'moment'
import React, { Fragment, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import BrnachMastSelection from 'src/views/CommonCode/BrnachMastSelection'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import DesignationMast from 'src/views/CommonCode/DesignationMast'
import EmployeeCategory from 'src/views/CommonCode/EmployeeCategory'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import TextInput from 'src/views/Component/TextInput'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'

const Hrm_Alert = () => {
    const { selectBranchMast, updateBranchSelected,
        selectDeptSection, updateDepartmentSection,
        selectedDept, updateSelected,
        selectDesignation, updateDesignation,
        getemployeecategory, udateemployeecategory } = useContext(PayrolMasterContext);
    const history = useHistory()
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
    const [formData, setFormData] = useState({
        alertexprdays: '',
        alert: ''
    })
    const defaultState = {
        alertexprdays: '',
        alert: ''
    }
    const { alertexprdays, alert } = formData
    const updateAlert = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }
    const postData = {
        alert_branch: selectBranchMast,
        alert_department: selectedDept,
        aler_deptsec: selectDeptSection,
        emp_category: getemployeecategory,
        designation: selectDesignation,
        alert: alert,
        alert_expr_date: moment(addDays(new Date(), alertexprdays)).format('YYYY-MM-DD'),
        create_date: moment(new Date()).format('YYYY-MM-DD'),
    }
    //save
    const submitFormData = async () => {
        if (alertexprdays !== '') {
            const result = await axioslogin.post('/hrmAlert', postData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                setFormData(defaultState)
                updateBranchSelected(0)
                updateDepartmentSection(0)
                updateSelected(0)
                updateDesignation(0)
                udateemployeecategory(0)
            }
            else if (success === 2) {
                warningNofity(message)
            }
            else {
                errorNofity("Error Occured!!!Please Contact EDP")
            }
        }
        else {
            warningNofity("Alert Expiry Days Is Null")
        }

    }
    return (
        <Fragment>
            <PageLayoutSave
                heading="Alert"
                redirect={RedirectToProfilePage}
                submit={submitFormData}
            >
                <form>
                    <div className="col-md-12">
                        <div className="row g-1">
                            <div className="col-md-4">
                                <div className="row g-1">
                                    <div className="col-md-12">
                                        <BrnachMastSelection style={SELECT_CMP_STYLE} />
                                    </div>
                                </div>
                                <div className="row g-1">
                                    <div className="col-md-12">
                                        <DepartmentSelect style={SELECT_CMP_STYLE} />
                                    </div>
                                </div>
                                <div className="row g-1">
                                    <div className="col-md-12">
                                        <DepartmentSectionSelect style={SELECT_CMP_STYLE} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="row g-1">
                                    <div className="col-md-12">
                                        <EmployeeCategory style={SELECT_CMP_STYLE} />
                                    </div>
                                </div>
                                <div className="row g-1">
                                    <div className="col-md-12">
                                        <DesignationMast style={SELECT_CMP_STYLE} />
                                    </div>
                                </div>
                                <div className="row g-1">
                                    <div className="col-md-12">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Alert Expiry Days"
                                            name="alertexprdays"
                                            value={alertexprdays}
                                            changeTextValue={(e) => updateAlert(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    minRows={3}
                                    placeholder="Alert"
                                    style={{ width: 520, height: 100 }}
                                    name="alert"
                                    value={alert}
                                    onChange={(e) => updateAlert(e)}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </PageLayoutSave>
        </Fragment>
    )
}

export default Hrm_Alert