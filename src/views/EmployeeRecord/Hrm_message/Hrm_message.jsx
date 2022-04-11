import { TextareaAutosize } from '@material-ui/core'
import React, { Fragment, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import EmployeeNameSelect from 'src/views/CommonCode/EmployeeNameSelect'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import TextInput from 'src/views/Component/TextInput'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import moment from 'moment'
import { addDays } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'

const Hrm_message = () => {
    const history = useHistory()
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
    const { selectDeptSection, updateDepartmentSection,
        selectedDept, updateSelected,
        selectEmpName, updateSelectEmpName
    } = useContext(PayrolMasterContext);
    const [formData, setFormData] = useState({
        msgexprdays: '',
        Message: ''
    })
    const defaultState = {
        msgexprdays: '',
        Message: ''
    }
    const { msgexprdays, Message } = formData
    const updateMessage = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }
    const postData = {
        message_dept: selectedDept,
        message_deptsec: selectDeptSection,
        emp_id: selectEmpName,
        message: Message,
        created_date: moment(new Date()).format('YYYY-MM-DD'),
        expr_date: moment(addDays(new Date(), msgexprdays)).format('YYYY-MM-DD'),
    }
    //save
    const submitFormData = async () => {
        if (msgexprdays !== '') {
            const result = await axioslogin.post('/hrmMessage', postData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                setFormData(defaultState)
                updateDepartmentSection(0)
                updateSelected(0)
                updateSelectEmpName(0)
            }
            else if (success === 2) {
                warningNofity(message)
            }
            else {
                errorNofity("Error Occured!!!Please Contact EDP")
            }
        }
        else {
            warningNofity("Message Expiry Days Is Null")
        }

    }
    return (
        <Fragment>
            <PageLayoutSave
                heading="Message"
                redirect={RedirectToProfilePage}
                submit={submitFormData}
            >
                <form>
                    <div className="col-md-12">
                        <div className="row g-1">
                            <div className="col-md-4">
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
                                        <EmployeeNameSelect style={SELECT_CMP_STYLE} />
                                    </div>
                                </div>
                                <div className="row g-1">
                                    <div className="col-md-12">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Message Expiry Days"
                                            name="msgexprdays"
                                            value={msgexprdays}
                                            changeTextValue={(e) => updateMessage(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    minRows={3}
                                    placeholder="Message"
                                    style={{ width: 520, height: 100 }}
                                    name="Message"
                                    value={Message}
                                    onChange={(e) => updateMessage(e)}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </PageLayoutSave>
        </Fragment>
    )
}

export default Hrm_message