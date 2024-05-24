import { Box, Paper, } from '@mui/material'
import React, { Fragment, memo, useCallback, useMemo, useState } from 'react'
import TextInput from 'src/views/Component/TextInput'
import { axioslogin } from 'src/views/Axios/Axios'
import { useContext } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ShiftSelectByRedux from 'src/views/MuiComponents/ShiftSelectByRedux'
import LeaveTypeMultipeSelect from 'src/views/MuiComponents/LeaveTypeMultipeSelect'
import { CssVarsProvider, Option, Select, Typography } from '@mui/joy'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import IconButton from '@mui/joy/IconButton'
import { ToastContainer } from 'react-toastify'
import CloseIcon from '@mui/icons-material/Close';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import GroupMultiSelect from './GroupMultiSelect'

const CommonSettingNew = () => {

    const history = useHistory()
    const { employeedetails } = useContext(PayrolMasterContext)
    const { em_id } = employeedetails
    const [value, setValue] = useState(0)
    const [defshift, setDefShift] = useState(0)
    const [notappshift, setnoappshift] = useState(0)
    const [workoff, setworkoff] = useState(0)
    const [noff, setNoff] = useState(0)
    const [group_slno, setGroup_Slno] = useState([])
    const [training_group_slno, setTraining_Group_Slno] = useState([])
    const [eoff, setEoff] = useState(0)
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
        verification_level: 0,
        salary_above: '',
        pf_employee_amount: '',
        pf_employer_amount: '',
        noff_count: 0,
        onHourRq_no: 0,
        max_late_day_count: 0,
        leave_count: 0,
        noff_selct_day_count: 0,
        comp_day_count: 0,
        comp_hour_count: 0,
        holiday_policy_count: 0,
        weekoff_policy_max_count: 0,
        weekoff_policy_min_count: 0,
        coff_min_working_hour: 0
    })

    const {
        slno, commn_grace, commn_latein, commn_earlyout, commn_latein_grace, commn_earlyout_grace,
        carry_hl, carry_el, carry_cl, carry_sl, esi_employer, esi_employee, esi_limit, pf_employer,
        min_salary, coff_min_working_hour,
        pf_employee, pf_age, max_salary, verification_level, salary_above, leave_count,
        pf_employee_amount, pf_employer_amount, noff_count, onHourRq_no, max_late_day_count,
        noff_selct_day_count, comp_day_count, comp_hour_count, holiday_policy_count, weekoff_policy_max_count,
        weekoff_policy_min_count
    } = FormData

    const [levaetype, setLeaveType] = useState([])
    const [count, setCount] = useState(0)
    const [areartype, setAreartype] = useState(0)
    const [earntype, setEarnType] = useState([])

    useEffect(() => {
        const getemptypedata = async () => {
            const result = await axioslogin.get('/Earntype')
            const { success, data } = result.data;
            if (success === 1) {
                setEarnType(data)
            } else {
                setEarnType([])
            }
        }
        getemptypedata()
    }, []);

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
                    pf_employer, min_salary, pf_age, pf_employee, max_salary, verification_level, default_shift, notapplicable_shift,
                    week_off_day, leavetype_multiple, salary_above, pf_employee_amount, pf_employer_amount, noff_count, onehour_rqst_count,
                    areartype, max_late_day_count, leave_count, noff_selct_day_count, noff, group_slno, eoff, comp_day_count,
                    comp_hour_count, training_mastergroup, holiday_policy_count, weekoff_policy_max_count,
                    weekoff_policy_min_count, coff_min_working_hour } = data[0]

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
                    salary_above: salary_above,
                    pf_employee_amount: pf_employee_amount,
                    pf_employer_amount: pf_employer_amount,
                    noff_count: noff_count,
                    onHourRq_no: onehour_rqst_count,
                    areartype: areartype,
                    max_late_day_count: max_late_day_count,
                    leave_count: leave_count,
                    noff_selct_day_count: noff_selct_day_count,
                    comp_day_count: comp_day_count,
                    comp_hour_count: comp_hour_count,
                    holiday_policy_count: holiday_policy_count,
                    weekoff_policy_max_count: weekoff_policy_max_count,
                    weekoff_policy_min_count: weekoff_policy_min_count,
                    coff_min_working_hour: coff_min_working_hour === null ? 0 : coff_min_working_hour
                }
                const obj = JSON.parse(leavetype_multiple)
                setLeaveType(obj === null ? [] : obj)
                setFormData(frmData)
                setDefShift(default_shift === null ? 0 : default_shift)
                setnoappshift(notapplicable_shift === null ? 0 : notapplicable_shift)
                setworkoff(week_off_day === null ? 0 : week_off_day)
                setValue(1)
                setCount(0)
                setAreartype(areartype === null ? 0 : areartype)
                const arr = JSON.parse(group_slno)
                setGroup_Slno(obj === null ? [] : arr)
                const training = JSON.parse(training_mastergroup)
                setTraining_Group_Slno(training === null ? [] : training)
                setNoff(noff)
                setEoff(eoff)
            }
            else if (success === 0) {
                setValue(0)
            }
            else {
                errorNofity("Error Occurred!!!Please Contact IT")
            }
        }
        getCommonSettings()
    }, [count])

    //data to save
    const postData = useMemo(() => {
        return {
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
            week_off_day: workoff,
            leavetype_multiple: levaetype,
            salary_above: salary_above,
            pf_employee_amount: pf_employee_amount,
            pf_employer_amount: pf_employer_amount,
            noff_count: noff_count,
            onehour_rqst_count: onHourRq_no,
            areartype: areartype,
            max_late_day_count: max_late_day_count,
            leave_count: leave_count,
            noff_selct_day_count: noff_selct_day_count,
            noff: noff,
            group_slno: group_slno,
            eoff: eoff,
            comp_day_count: comp_day_count,
            comp_hour_count: comp_hour_count,
            holiday_policy_count: holiday_policy_count,
            weekoff_policy_max_count: weekoff_policy_max_count,
            weekoff_policy_min_count: weekoff_policy_min_count,
            coff_min_working_hour: coff_min_working_hour,
            training_mastergroup: training_group_slno
        }
    }, [commn_grace, commn_latein, commn_earlyout, commn_latein_grace, commn_earlyout_grace,
        carry_hl, carry_el, carry_cl, carry_sl, esi_employer, esi_employee, esi_limit, pf_employer,
        min_salary, coff_min_working_hour, pf_employee, pf_age, max_salary, verification_level,
        salary_above, leave_count, pf_employee_amount, pf_employer_amount, noff_count, onHourRq_no,
        max_late_day_count, noff_selct_day_count, comp_day_count, comp_hour_count, holiday_policy_count,
        weekoff_policy_max_count, weekoff_policy_min_count, areartype, defshift, em_id, eoff, group_slno,
        levaetype, noff, notappshift, workoff, training_group_slno])

    //data to edit
    const postDataEdit = useMemo(() => {
        return {
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
            verification_level: verification_level,
            default_shift: defshift,
            notapplicable_shift: notappshift,
            week_off_day: workoff,
            leavetype_multiple: levaetype,
            salary_above: salary_above,
            pf_employee_amount: pf_employee_amount,
            pf_employer_amount: pf_employer_amount,
            setting_slno: slno,
            noff_count: noff_count,
            onehour_rqst_count: onHourRq_no,
            areartype: areartype,
            max_late_day_count: max_late_day_count,
            leave_count: leave_count,
            noff_selct_day_count: noff_selct_day_count,
            noff: noff,
            group_slno: group_slno,
            eoff: eoff,
            comp_day_count: comp_day_count,
            comp_hour_count: comp_hour_count,
            holiday_policy_count: holiday_policy_count,
            weekoff_policy_max_count: weekoff_policy_max_count,
            weekoff_policy_min_count: weekoff_policy_min_count,
            coff_min_working_hour: coff_min_working_hour,
            training_mastergroup: training_group_slno
        }
    }, [slno, commn_grace, commn_latein, commn_earlyout, commn_latein_grace, commn_earlyout_grace,
        carry_hl, carry_el, carry_cl, carry_sl, esi_employer, esi_employee, esi_limit, pf_employer,
        min_salary, coff_min_working_hour, pf_employee, pf_age, max_salary, verification_level,
        salary_above, leave_count, pf_employee_amount, pf_employer_amount, noff_count, onHourRq_no,
        max_late_day_count, noff_selct_day_count, comp_day_count, comp_hour_count, holiday_policy_count,
        weekoff_policy_max_count, weekoff_policy_min_count, areartype, defshift, em_id, eoff, group_slno,
        levaetype, noff, notappshift, workoff, training_group_slno])




    //save
    const submitFormData = useCallback(async (e) => {
        e.preventDefault();
        if (value === 0) {
            const result = await axioslogin.post('/commonsettings', postData)
            const { success, message } = result.data
            if (success === 1) {
                warningNofity(message)
                setLeaveType([])
            }
            else if (success === 2) {
                succesNofity(message)
                setCount(count + 1)
            }
            else {
                errorNofity(message)
            }
        }
        else {
            const result = await axioslogin.patch('/commonsettings', postDataEdit)
            const { success, message } = result.data
            if (success === 2) {
                succesNofity(message)
                setLeaveType([])
                setCount(count + 1)
            }
            else if (success === 1) {
                warningNofity(message)
            }
            else {
                errorNofity(message)
            }
        }
    }, [postData, postDataEdit, count, value])

    const RedirectToprofilePage = () => {
        history.push(`/Home/Settings`)
    }
    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{ width: "100%" }} >
                <Paper square elevation={2} sx={{ p: 0.5, }}>
                    <Paper square sx={{ display: "flex", height: 30, flexDirection: 'column' }}>
                        <Box sx={{ display: "flex", flex: 1, height: 30, }} >
                            <Paper square sx={{ display: "flex", flex: 1, height: 30, alignItems: 'center', justifyContent: "space-between" }} >
                                <Box sx={{ display: "flex" }}>
                                    <DragIndicatorOutlinedIcon />
                                    <Typography textColor="neutral.400" sx={{ display: 'flex', }} >
                                        Common Settings
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pr: 1 }}>
                                    <IconButton
                                        variant="outlined"
                                        size='xs'
                                        color="danger"
                                        onClick={RedirectToprofilePage}
                                        sx={{ color: '#ef5350' }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            </Paper>
                        </Box>
                    </Paper>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ width: '50%' }}>
                            <Paper square variant="outlined" sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" } }} >
                                <Paper variant="outlined" sx={{ width: '100%', pl: 0.5 }}>
                                    <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}> Common Settings</Typography>
                                </Paper>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1"> Common Grace Period</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <InputComponent
                                            placeholder={''}
                                            type="text"
                                            size="sm"
                                            name="commn_grace"
                                            value={commn_grace}
                                            onchange={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }}  >
                                        <Typography level="body1"> In Minutes</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1"> Max. Late In</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <InputComponent
                                            placeholder={''}
                                            type="text"
                                            size="sm"
                                            name="commn_latein"
                                            value={commn_latein}
                                            onchange={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }}  >
                                        <Typography level="body1">In Minutes</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1">Max. Early Out</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <InputComponent
                                            placeholder={''}
                                            type="text"
                                            size="sm"
                                            name="commn_earlyout"
                                            value={commn_earlyout}
                                            onchange={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }}  >
                                        <Typography level="body1">In Minutes</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1">Max. Late Day Count</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <InputComponent
                                            placeholder={''}
                                            type="text"
                                            size="sm"
                                            name="max_late_day_count"
                                            value={max_late_day_count}
                                            onchange={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }}  >
                                        <Typography level="body1">days</Typography>
                                    </Box>
                                </Box>

                                {/* <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <CssVarsProvider>
                                            <Typography level="body1">Late In Grace Period</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder=""
                                            name="commn_latein_grace"
                                            value={commn_latein_grace}
                                            changeTextValue={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1">In Minutes</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>

                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <CssVarsProvider>
                                            <Typography level="body1">Early Out Grace Period</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder=""
                                            name="commn_earlyout_grace"
                                            value={commn_earlyout_grace}
                                            changeTextValue={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1">In Minutes</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box> */}

                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1">Employee Verification Level</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <InputComponent
                                            placeholder={''}
                                            type="text"
                                            size="sm"
                                            name="verification_level"
                                            value={verification_level}
                                            onchange={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }}  >
                                        <Typography level="body1">In Numbers</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1">Holiday Salary Setting</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <InputComponent
                                            placeholder={''}
                                            type="text"
                                            size="sm"
                                            name="salary_above"
                                            value={salary_above}
                                            onchange={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }}  >
                                        <Typography level="body1">In Rupees</Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                        <Box sx={{ width: '50%', pl: 1 }}>
                            <Paper square variant="outlined" sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" } }} >
                                <Paper variant="outlined" sx={{ width: '100%', pl: 0.5 }}>
                                    <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}> CarryForward Leave Setting</Typography>
                                </Paper>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5, mt: 1 }} >
                                        <JoyCheckbox
                                            label='National Holiday'
                                            checked={carry_hl}
                                            name="carry_hl"
                                            onchange={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5, mt: 1 }} >
                                        <JoyCheckbox
                                            label='Casual Leave'
                                            checked={carry_cl}
                                            name="carry_cl"
                                            onchange={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <JoyCheckbox
                                            label='Earn Leave'
                                            checked={carry_el}
                                            name="carry_el"
                                            onchange={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <JoyCheckbox
                                            label='Sick Leave'
                                            checked={carry_sl}
                                            name="carry_sl"
                                            onchange={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                </Box>
                            </Paper>
                            <Paper square variant="outlined" sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" } }} >
                                <Paper variant="outlined" sx={{ width: '100%', pl: 0.5 }}>
                                    <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>ESI Setting</Typography>
                                </Paper>

                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10, mt: 0.5 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1"> ESI Limit</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <InputComponent
                                            placeholder={''}
                                            type="text"
                                            size="sm"
                                            name="esi_limit"
                                            value={esi_limit}
                                            onchange={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1">ESI % Employee</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <InputComponent
                                            placeholder={''}
                                            type="text"
                                            size="sm"
                                            name="esi_employee"
                                            value={esi_employee}
                                            onchange={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1">ESI % Employer</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <InputComponent
                                            placeholder={''}
                                            type="text"
                                            size="sm"
                                            name="esi_employer"
                                            value={esi_employer}
                                            onchange={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ width: '50%' }}>
                            <Paper square variant="outlined" sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" } }} >
                                <Paper variant="outlined" sx={{ width: '100%', pl: 0.5 }}>
                                    <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>PF Setting</Typography>
                                </Paper>

                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10, mt: 0.5 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1"> Salary Limit</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder=""
                                            name="min_salary"
                                            value={min_salary}
                                            changeTextValue={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }}  >
                                        <Typography level="body1">-----</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder=""
                                            name="max_salary"
                                            value={max_salary}
                                            changeTextValue={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1">PF Age Limit</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder=""
                                            name="pf_age"
                                            value={pf_age}
                                            changeTextValue={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }}  >
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }}  >
                                    </Box>
                                </Box>

                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1">PF % Employee</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder=""
                                            name="pf_employee"
                                            value={pf_employee}
                                            changeTextValue={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }}  >
                                        <Typography level="body1">PF Employee Amount</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }}  >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder=""
                                            name="pf_employee_amount"
                                            value={pf_employee_amount}
                                            changeTextValue={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                </Box>

                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1">PF % Employer</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder=""
                                            name="pf_employer"
                                            value={pf_employer}
                                            changeTextValue={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }}  >
                                        <Typography level="body1">PF Employer Amount</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }}  >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder=""
                                            name="pf_employer_amount"
                                            value={pf_employer_amount}
                                            changeTextValue={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>

                        <Box sx={{ width: '50%', pl: 1, }}>
                            <Paper square variant="outlined" sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" } }} >
                                <Paper variant="outlined" sx={{ width: '100%', pl: 0.5 }}>
                                    <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>Allowed Half Day Leave Type</Typography>
                                </Paper>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10, mt: 0.5 }}>
                                    <Box sx={{ width: '30%', px: 0.5 }} >
                                        <Typography level="body1">Leave Type</Typography>
                                    </Box>
                                    <Box sx={{ width: '70%', px: 0.5, pt: 0.5 }} >
                                        <LeaveTypeMultipeSelect value={levaetype} setValue={setLeaveType} />
                                    </Box>
                                </Box>
                            </Paper>
                            <Paper square variant="outlined" sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" } }} >
                                <Paper variant="outlined" sx={{ width: '100%', pl: 0.5 }}>
                                    <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}> One Hour Request Count Setting</Typography>
                                </Paper>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10, mt: 0.5 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1">No. of One Hour Request/month</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <InputComponent
                                            placeholder={''}
                                            type="text"
                                            size="sm"
                                            name="onHourRq_no"
                                            value={onHourRq_no}
                                            onchange={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                    </Box>

                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ width: '50%' }}>
                            <Paper square variant="outlined" sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" } }} >
                                <Paper variant="outlined" sx={{ width: '100%', pl: 0.5 }}>
                                    <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>Shift Setting</Typography>
                                </Paper>

                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10, mt: 0.5 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1"> Default Shift</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <ShiftSelectByRedux value={defshift} setValue={setDefShift} />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1">Not Applicable</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <ShiftSelectByRedux value={notappshift} setValue={setnoappshift} />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1">Week OFF</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <ShiftSelectByRedux value={workoff} setValue={setworkoff} />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1">Night OFF</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <ShiftSelectByRedux value={noff} setValue={setNoff} />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1">Extra OFF</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <ShiftSelectByRedux value={eoff} setValue={setEoff} />
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>

                        <Box sx={{ width: '50%', pl: 1 }}>
                            <Paper square variant="outlined" sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" } }} >
                                <Paper variant="outlined" sx={{ width: '100%', pl: 0.5 }}>
                                    <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>NOFF Count Setting</Typography>
                                </Paper>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10, mt: 0.5 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1">Max Select NOFF Days</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <InputComponent
                                            placeholder={''}
                                            type="text"
                                            size="sm"
                                            name="noff_selct_day_count"
                                            value={noff_selct_day_count}
                                            onchange={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10, mt: 0.5 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1"> Min Days Of NOFF</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <InputComponent
                                            placeholder={''}
                                            type="text"
                                            size="sm"
                                            name="noff_count"
                                            value={noff_count}
                                            onchange={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                </Box>

                            </Paper>
                            <Paper square variant="outlined" sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" } }} >
                                <Paper variant="outlined" sx={{ width: '100%', pl: 0.5 }}>
                                    <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>Arear Setting</Typography>
                                </Paper>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10, mt: 0.5 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1"> Arear Type</Typography>
                                    </Box>

                                    <Box sx={{ flex: 1, px: 0.5, pt: 0.5 }} >
                                        <Select
                                            value={areartype}
                                            onChange={(event, newValue) => {
                                                setAreartype(newValue);
                                            }}
                                            size='md'
                                            variant='outlined'
                                        >
                                            <Option disabled value={0}> Select Earn Type</Option>
                                            {
                                                earntype?.map((val, index) => {
                                                    return <Option key={index} value={val.erning_type_id}>{val.earning_type_name}</Option>
                                                })
                                            }
                                        </Select>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ width: '50%', }}>
                            <Paper square variant="outlined" sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" } }} >
                                <Paper variant="outlined" sx={{ width: '100%', pl: 0.5 }}>
                                    <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>Leave Request Count Setting</Typography>
                                </Paper>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10, mt: 0.5 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1">Leave Count</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <InputComponent
                                            placeholder={''}
                                            type="text"
                                            size="sm"
                                            name="leave_count"
                                            value={leave_count}
                                            onchange={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                        <Box sx={{ width: '50%' }}>
                            <Paper square variant="outlined" sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" } }} >
                                <Paper variant="outlined" sx={{ width: '100%', pl: 0.5 }}>
                                    <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>Master Group Setting</Typography>
                                </Paper>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10, mt: 0.5 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1">Master Group</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <GroupMultiSelect value={group_slno} setValue={setGroup_Slno} />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10, mt: 0.5 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <CssVarsProvider>
                                            <Typography level="body1">Training Master Group</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <GroupMultiSelect value={training_group_slno} setValue={setTraining_Group_Slno} />
                                    </Box>


                                </Box>
                            </Paper>
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ width: '50%', }}>
                            <Paper square variant="outlined" sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" } }} >
                                <Paper variant="outlined" sx={{ width: '100%', pl: 0.5 }}>
                                    <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>Compensatory Off Day Limit</Typography>
                                </Paper>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10, mt: 0.5 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1">Day Count</Typography>
                                    </Box>

                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <InputComponent
                                            placeholder={''}
                                            type="text"
                                            size="sm"
                                            name="comp_day_count"
                                            value={comp_day_count}
                                            onchange={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10, mt: 0.5 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1">Select Hour Count Limit</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <InputComponent
                                            placeholder={''}
                                            type="text"
                                            size="sm"
                                            name="comp_hour_count"
                                            value={comp_hour_count}
                                            onchange={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10, mt: 0.5 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1">Minimum Working Hour</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <InputComponent
                                            placeholder={''}
                                            type="text"
                                            size="sm"
                                            name="coff_min_working_hour"
                                            value={coff_min_working_hour}
                                            onchange={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                        <Box sx={{ width: '50%' }}>
                            <Paper square variant="outlined" sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" } }} >
                                <Paper variant="outlined" sx={{ width: '100%', pl: 0.5 }}>
                                    <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>Attendnace Setting</Typography>
                                </Paper>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10, mt: 0.5 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1">Week Off Policy Max Count</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <InputComponent
                                            placeholder={''}
                                            type="text"
                                            size="sm"
                                            name="weekoff_policy_max_count"
                                            value={weekoff_policy_max_count}
                                            onchange={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10, mt: 0.5 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1"> Week Off Policy Min Count</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <InputComponent
                                            placeholder={''}
                                            type="text"
                                            size="sm"
                                            name="weekoff_policy_min_count"
                                            value={weekoff_policy_min_count}
                                            onchange={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10, mt: 0.5 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <Typography level="body1"> Holiday Policy Count</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <InputComponent
                                            placeholder={''}
                                            type="text"
                                            size="sm"
                                            name="holiday_policy_count"
                                            value={holiday_policy_count}
                                            onchange={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                    </Box>
                </Paper >
                <Paper square sx={{ backgroundColor: "#F8F8F8", display: "flex", flexDirection: "row" }}>
                    <Box sx={{ flex: 0, pl: 2 }} >
                        <CssVarsProvider>
                            <IconButton variant="outlined" size='sm' onClick={submitFormData}>
                                <LibraryAddCheckOutlinedIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box>
                </Paper>
            </Box >
        </Fragment >
    )
}

export default memo(CommonSettingNew) 