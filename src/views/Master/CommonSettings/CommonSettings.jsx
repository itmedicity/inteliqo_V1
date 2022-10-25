import { Typography } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import PageLayoutProcess from 'src/views/CommonCode/PageLayoutProcess'
import TextInput from 'src/views/Component/TextInput'
import { axioslogin } from 'src/views/Axios/Axios'
import { useContext } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import ShiftSelectByRedux from 'src/views/MuiComponents/ShiftSelectByRedux'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'

const CommonSettings = () => {
    const history = useHistory()
    const { employeedetails } = useContext(PayrolMasterContext)
    const { em_id } = employeedetails
    const [value, setValue] = useState(0)
    const [defshift, setDefShift] = useState(0)
    const [notappshift, setnoappshift] = useState(0)
    const [workoff, setworkoff] = useState(0)
    const [FormData, setFormData] = useState({
        slno: '',
        commn_grace: '',
        commn_latein: '',
        commn_earlyout: '',
        commn_latein_grace: '',
        commn_earlyout_grace: '',
        carry_hl: false,
        carry_cl: false,
        carry_el: false,
        carry_sl: false,
        min_salary: '',
        max_salary: '',
        pf_age: '',
        pf_employee: '',
        pf_employer: '',
        esi_limit: '',
        esi_employee: '',
        esi_employer: '',
        verification_level: 0
    })
    const { slno, commn_grace, commn_latein, commn_earlyout, commn_latein_grace, commn_earlyout_grace,
        carry_hl, carry_el, carry_cl, carry_sl, esi_employer, esi_employee, esi_limit, pf_employer, min_salary,
        pf_employee, pf_age, max_salary, verification_level } = FormData

    //getting form data
    const updateCommonSettings = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...FormData, [e.target.name]: value })
    }
    //setting data to form
    useEffect(() => {
        const getCommonSettings = async () => {
            const result = await axioslogin.get('/commonsettings')
            const { success, data } = result.data
            if (success === 1) {
                const { setting_slno, cmmn_grace_period, cmmn_late_in, cmmn_early_out, cmmn_early_out_grace,
                    cmmn_late_in_grace, carry_hl, carry_el, carry_cl, carry_sl, esi_employer, esi_employee, esi_limit,
                    pf_employer, min_salary, pf_age, pf_employee, max_salary, verification_level, default_shift, notapplicable_shift, week_off_day } = data[0]

                const frmData = {
                    slno: setting_slno,
                    commn_grace: cmmn_grace_period,
                    commn_latein: cmmn_late_in,
                    commn_earlyout: cmmn_early_out,
                    commn_latein_grace: cmmn_late_in_grace,
                    commn_earlyout_grace: cmmn_early_out_grace,
                    carry_hl: carry_hl === 1 ? true : false,
                    carry_cl: carry_cl === 1 ? true : false,
                    carry_el: carry_el === 1 ? true : false,
                    carry_sl: carry_sl === 1 ? true : false,
                    min_salary: min_salary,
                    max_salary: max_salary,
                    pf_age: pf_age,
                    pf_employee: pf_employee,
                    pf_employer: pf_employer,
                    esi_limit: esi_limit,
                    esi_employee: esi_employee,
                    esi_employer: esi_employer,
                    verification_level: verification_level,
                }
                setFormData(frmData)
                setDefShift(default_shift === null ? 0 : default_shift)
                setnoappshift(notapplicable_shift === null ? 0 : notapplicable_shift)
                setworkoff(week_off_day === null ? 0 : week_off_day)
                setValue(1)
            }
            else if (success === 0) {
                setValue(0)
            }
            else {
                errorNofity("Error Occurred!!!Please Contact EDP")
            }
        }
        getCommonSettings()
    }, [])

    //data to save
    const postData = {
        cmmn_grace_period: commn_grace,
        cmmn_late_in: commn_latein,
        cmmn_early_out: commn_earlyout,
        cmmn_late_in_grace: commn_latein_grace,
        cmmn_early_out_grace: commn_earlyout_grace,
        carry_hl: carry_hl === true ? 1 : 0,
        carry_cl: carry_cl === true ? 1 : 0,
        carry_el: carry_el === true ? 1 : 0,
        carry_sl: carry_sl === true ? 1 : 0,
        min_salary: min_salary,
        max_salary: max_salary,
        pf_age: pf_age,
        pf_employee: pf_employee,
        pf_employer: pf_employer,
        esi_limit: esi_limit,
        esi_employee: esi_employee,
        esi_employer: esi_employer,
        creat_user: em_id,
        verification_level: verification_level,
        default_shift: defshift,
        notapplicable_shift: notappshift,
        week_off_day: workoff

    }
    //data to edit
    const postDataEdit = {
        cmmn_grace_period: commn_grace,
        cmmn_late_in: commn_latein,
        cmmn_early_out: commn_earlyout,
        cmmn_late_in_grace: commn_latein_grace,
        cmmn_early_out_grace: commn_earlyout_grace,
        carry_hl: carry_hl === true ? 1 : 0,
        carry_cl: carry_cl === true ? 1 : 0,
        carry_el: carry_el === true ? 1 : 0,
        carry_sl: carry_sl === true ? 1 : 0,
        min_salary: min_salary,
        max_salary: max_salary,
        pf_age: pf_age,
        pf_employee: pf_employee,
        pf_employer: pf_employer,
        esi_limit: esi_limit,
        esi_employee: esi_employee,
        esi_employer: esi_employer,
        update_user: em_id,
        setting_slno: slno,
        verification_level: verification_level,
        default_shift: defshift,
        notapplicable_shift: notappshift,
        week_off_day: workoff
    }

    //save
    const submitFormData = async (e) => {
        e.preventDefault();
        if (value === 0) {
            const result = await axioslogin.post('/commonsettings', postData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
            }
            else if (success === 2) {
                warningNofity(message)
            }
            else {
                errorNofity("Error Occured!!!!! Please Contact EDP")
            }
        }
        else if (value === 1) {
            const result = await axioslogin.patch('/commonsettings', postDataEdit)
            const { success, message } = result.data
            if (success === 2) {
                succesNofity(message)
            }
            else if (success === 1) {
                warningNofity(message)
            }
            else {
                errorNofity("Error Occured!!!!! Please Contact EDP")
            }
        }
        else {

        }
    }
    const RedirectToprofilePage = () => {
        history.push(`/Home/Settings`)
    }
    return (
        <Fragment>
            <PageLayoutProcess
                heading="Common Settings"
                submit={submitFormData}
                redirect={RedirectToprofilePage}
            >
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-5">
                            <div className="card">
                                <div className="card-header pb-0 border  text-black">
                                    <h6>Common Setting</h6>
                                </div>
                                <div className="card-body">
                                    <div className="col-md-12">
                                        <div className="row g-2 pt-2">
                                            <div className="col-md-2"></div>
                                            <div className="col-md-4 pt-1">
                                                <Typography>Common Grace Period:</Typography>
                                            </div>
                                            <div className="col-md-2">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder=""
                                                    name="commn_grace"
                                                    value={commn_grace}
                                                    changeTextValue={(e) => updateCommonSettings(e)}
                                                />
                                            </div>
                                            <div className="col-md-4 pt-1">
                                                <Typography>In Minutes</Typography>
                                            </div>
                                        </div>
                                        <div className="row g-2 pt-2">
                                            <div className="col-md-2"></div>
                                            <div className="col-md-4 pt-1">
                                                <Typography>Common Late In</Typography>
                                            </div>
                                            <div className="col-md-2">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder=""
                                                    name="commn_latein"
                                                    value={commn_latein}
                                                    changeTextValue={(e) => updateCommonSettings(e)}
                                                />
                                            </div>
                                            <div className="col-md-4 pt-1">
                                                <Typography>In Minutes</Typography>
                                            </div>
                                        </div>
                                        <div className="row g-2 pt-2">
                                            <div className="col-md-2"></div>
                                            <div className="col-md-4 pt-1">
                                                <Typography>Common Early Out</Typography>
                                            </div>
                                            <div className="col-md-2">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder=""
                                                    name="commn_earlyout"
                                                    value={commn_earlyout}
                                                    changeTextValue={(e) => updateCommonSettings(e)}
                                                />
                                            </div>
                                            <div className="col-md-4 pt-1">
                                                <Typography>In Minutes</Typography>
                                            </div>
                                        </div>
                                        <div className="row g-2 pt-2">
                                            <div className="col-md-2"></div>
                                            <div className="col-md-4 pt-1">
                                                <Typography>Late In Grace Period</Typography>
                                            </div>
                                            <div className="col-md-2">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder=""
                                                    name="commn_latein_grace"
                                                    value={commn_latein_grace}
                                                    changeTextValue={(e) => updateCommonSettings(e)}
                                                />
                                            </div>
                                            <div className="col-md-4 pt-1">
                                                <Typography>In Minutes</Typography>
                                            </div>
                                        </div>
                                        <div className="row g-2 pt-2">
                                            <div className="col-md-2"></div>
                                            <div className="col-md-4 pt-1">
                                                <Typography>Early Out Grace Period</Typography>
                                            </div>
                                            <div className="col-md-2">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder=""
                                                    name="commn_earlyout_grace"
                                                    value={commn_earlyout_grace}
                                                    changeTextValue={(e) => updateCommonSettings(e)}
                                                />
                                            </div>
                                            <div className="col-md-4 pt-1">
                                                <Typography>In Minutes</Typography>
                                            </div>
                                        </div>
                                        <div className="row g-2 pt-2">
                                            <div className="col-md-2"></div>
                                            <div className="col-md-4 pt-1">
                                                <Typography>Verification Level</Typography>
                                            </div>
                                            <div className="col-md-2">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder=""
                                                    name="verification_level"
                                                    value={verification_level}
                                                    changeTextValue={(e) => updateCommonSettings(e)}
                                                />
                                            </div>
                                            <div className="col-md-4 pt-1">
                                                <Typography>In Numbers</Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Carry forward setting design */}
                        <div className="col-md-5">
                            <div className="card">
                                <div className="card-header pb-0 border  text-black">
                                    <h6>CarryForward Leave Setting</h6>
                                </div>
                                <div className="card-body">
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <FormControlLabel
                                                    className="pb-0 mb-0"
                                                    control={
                                                        <Checkbox
                                                            name="carry_hl"
                                                            color="primary"
                                                            value={carry_hl}
                                                            checked={carry_hl}
                                                            className="ml-2"
                                                            onChange={(e) => updateCommonSettings(e)}
                                                        />
                                                    }
                                                    label="National Holiday"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <FormControlLabel
                                                    className="pb-0 mb-0"
                                                    control={
                                                        <Checkbox
                                                            name="carry_cl"
                                                            color="primary"
                                                            value={carry_cl}
                                                            checked={carry_cl}
                                                            className="ml-2"
                                                            onChange={(e) => updateCommonSettings(e)}
                                                        />
                                                    }
                                                    label="Casual Leave"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <FormControlLabel
                                                    className="pb-0 mb-0"
                                                    control={
                                                        <Checkbox
                                                            name="carry_el"
                                                            color="primary"
                                                            value={carry_el}
                                                            checked={carry_el}
                                                            className="ml-2"
                                                            onChange={(e) => updateCommonSettings(e)}
                                                        />
                                                    }
                                                    label="Earn Leave"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <FormControlLabel
                                                    className="pb-0 mb-0"
                                                    control={
                                                        <Checkbox
                                                            name="carry_sl"
                                                            color="primary"
                                                            value={carry_sl}
                                                            checked={carry_sl}
                                                            className="ml-2"
                                                            onChange={(e) => updateCommonSettings(e)}
                                                        />
                                                    }
                                                    label="Sick Leave"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* PF setting design */}
                        <div className="col-md-12 pt-3" >
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div className="col-md-5">
                                    <div className="card">
                                        <div className="card-header pb-0 border  text-black">
                                            <h6>PF Setting</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-1"></div>
                                                    <div className="col-md-3 pt-1">
                                                        <Typography>Salary Limit</Typography>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <TextInput
                                                            type="text"
                                                            classname="form-control form-control-sm"
                                                            Placeholder=""
                                                            name="min_salary"
                                                            value={min_salary}
                                                            changeTextValue={(e) => updateCommonSettings(e)}
                                                        />
                                                    </div>
                                                    <div className="col-md-1 pt-1">
                                                        <Typography>---</Typography>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <TextInput
                                                            type="text"
                                                            classname="form-control form-control-sm"
                                                            Placeholder=""
                                                            name="max_salary"
                                                            value={max_salary}
                                                            changeTextValue={(e) => updateCommonSettings(e)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 pt-2">
                                                <div className="row">
                                                    <div className="col-md-1"></div>
                                                    <div className="col-md-3 pt-1">
                                                        <Typography>PF Age Limit</Typography>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <TextInput
                                                            type="text"
                                                            classname="form-control form-control-sm"
                                                            Placeholder=""
                                                            name="pf_age"
                                                            value={pf_age}
                                                            changeTextValue={(e) => updateCommonSettings(e)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 pt-2">
                                                <div className="row">
                                                    <div className="col-md-1"></div>
                                                    <div className="col-md-3 pt-1">
                                                        <Typography>PF % Employee</Typography>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <TextInput
                                                            type="text"
                                                            classname="form-control form-control-sm"
                                                            Placeholder=""
                                                            name="pf_employee"
                                                            value={pf_employee}
                                                            changeTextValue={(e) => updateCommonSettings(e)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 pt-2">
                                                <div className="row">
                                                    <div className="col-md-1"></div>
                                                    <div className="col-md-3 pt-1">
                                                        <Typography>PF % Employer</Typography>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <TextInput
                                                            type="text"
                                                            classname="form-control form-control-sm"
                                                            Placeholder=""
                                                            name="pf_employer"
                                                            value={pf_employer}
                                                            changeTextValue={(e) => updateCommonSettings(e)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ESI setting design */}
                                <div className="col-md-5">
                                    <div className="card">
                                        <div className="card-header pb-0 border  text-black">
                                            <h6>ESI Setting</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-1"></div>
                                                    <div className="col-md-3 pt-1">
                                                        <Typography>ESI Limit</Typography>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <TextInput
                                                            type="text"
                                                            classname="form-control form-control-sm"
                                                            Placeholder=""
                                                            name="esi_limit"
                                                            value={esi_limit}
                                                            changeTextValue={(e) => updateCommonSettings(e)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 pt-2">
                                                <div className="row">
                                                    <div className="col-md-1"></div>
                                                    <div className="col-md-3 pt-1">
                                                        <Typography>ESI % Employee</Typography>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <TextInput
                                                            type="text"
                                                            classname="form-control form-control-sm"
                                                            Placeholder=""
                                                            name="esi_employee"
                                                            value={esi_employee}
                                                            changeTextValue={(e) => updateCommonSettings(e)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 pt-2">
                                                <div className="row">
                                                    <div className="col-md-1"></div>
                                                    <div className="col-md-3 pt-1">
                                                        <Typography>ESI % Employer</Typography>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <TextInput
                                                            type="text"
                                                            classname="form-control form-control-sm"
                                                            Placeholder=""
                                                            name="esi_employer"
                                                            value={esi_employer}
                                                            changeTextValue={(e) => updateCommonSettings(e)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shift Setting */}

                        <div className="col-md-12 pt-3" >
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div className="col-md-5">
                                    <div className="card">
                                        <div className="card-header pb-0 border  text-black">
                                            <h6>Shift Setting</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-1"></div>
                                                    <div className="col-md-3 pt-1">
                                                        <Typography>Default Shift</Typography>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <ShiftSelectByRedux style={SELECT_CMP_STYLE} value={defshift} setValue={setDefShift} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 pt-2">
                                                <div className="row">
                                                    <div className="col-md-1"></div>
                                                    <div className="col-md-3 pt-1">
                                                        <Typography>Not Applicable</Typography>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <ShiftSelectByRedux style={SELECT_CMP_STYLE} value={notappshift} setValue={setnoappshift} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 pt-2">
                                                <div className="row">
                                                    <div className="col-md-1"></div>
                                                    <div className="col-md-3 pt-1">
                                                        <Typography>Work OFF</Typography>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <ShiftSelectByRedux style={SELECT_CMP_STYLE} value={workoff} setValue={setworkoff} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </PageLayoutProcess>
        </Fragment >
    )
}

export default CommonSettings