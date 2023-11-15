import { Box, Checkbox, FormControl, FormControlLabel, MenuItem, Paper, Select } from '@mui/material'
import React, { Fragment, memo, useState } from 'react'
import TextInput from 'src/views/Component/TextInput'
import { axioslogin } from 'src/views/Axios/Axios'
import { useContext } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ShiftSelectByRedux from 'src/views/MuiComponents/ShiftSelectByRedux'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import LeaveTypeMultipeSelect from 'src/views/MuiComponents/LeaveTypeMultipeSelect'
import { CssVarsProvider, Typography } from '@mui/joy'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import IconButton from '@mui/joy/IconButton'
import { ToastContainer } from 'react-toastify'
import CloseIcon from '@mui/icons-material/Close';

const CommonSettingNew = () => {

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
        verification_level: 0,
        salary_above: '',
        pf_employee_amount: '',
        pf_employer_amount: '',
        noff_count: 0,
        onHourRq_no: 0,
        max_late_day_count: 0
    })

    const {
        slno, commn_grace, commn_latein, commn_earlyout, commn_latein_grace, commn_earlyout_grace,
        carry_hl, carry_el, carry_cl, carry_sl, esi_employer, esi_employee, esi_limit, pf_employer, min_salary,
        pf_employee, pf_age, max_salary, verification_level, salary_above,
        pf_employee_amount, pf_employer_amount, noff_count, onHourRq_no, max_late_day_count
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
                    areartype, max_late_day_count } = data[0]


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
                    max_late_day_count: max_late_day_count

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
            }
            else if (success === 0) {
                setValue(0)
            }
            else {
                errorNofity("Error Occurred!!!Please Contact EDP")
            }
        }
        getCommonSettings()
    }, [count])

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
        week_off_day: workoff,
        leavetype_multiple: levaetype,
        salary_above: salary_above,
        pf_employee_amount: pf_employee_amount,
        pf_employer_amount: pf_employer_amount,
        noff_count: noff_count,
        onehour_rqst_count: onHourRq_no,
        areartype: areartype,
        max_late_day_count: max_late_day_count
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
        max_late_day_count: max_late_day_count

    }

    //save
    const submitFormData = async (e) => {
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
                errorNofity("Error Occured!!!!! Please Contact EDP")
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
                errorNofity("Error Occured!!!!! Please Contact EDP")
            }
        }
    }

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
                                    <CssVarsProvider>
                                        <Typography textColor="neutral.400" sx={{ display: 'flex', }} >
                                            Common Settings
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", pr: 1 }}>
                                    <CssVarsProvider>
                                        <IconButton
                                            variant="outlined"
                                            size='xs'
                                            color="danger"
                                            onClick={RedirectToprofilePage}
                                            sx={{ color: '#ef5350' }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </CssVarsProvider>
                                </Box>
                            </Paper>
                        </Box>
                    </Paper>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ width: '50%' }}>
                            <Paper square variant="outlined" sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" } }} >
                                <Paper variant="outlined" sx={{ width: '100%', pl: 0.5 }}>
                                    <CssVarsProvider>
                                        <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}> Common Settings</Typography>
                                    </CssVarsProvider>
                                </Paper>

                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <CssVarsProvider>
                                            <Typography level="body1"> Common Grace Period</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder=""
                                            name="commn_grace"
                                            value={commn_grace}
                                            changeTextValue={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1"> In Minutes</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <CssVarsProvider>
                                            <Typography level="body1"> Max. Late In</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder=""
                                            name="commn_latein"
                                            value={commn_latein}
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
                                            <Typography level="body1">Max. Early Out</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder=""
                                            name="commn_earlyout"
                                            value={commn_earlyout}
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
                                            <Typography level="body1">Max. Late Day Count</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder=""
                                            name="max_late_day_count"
                                            value={max_late_day_count}
                                            changeTextValue={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1">days</Typography>
                                        </CssVarsProvider>
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
                                        <CssVarsProvider>
                                            <Typography level="body1">Employee Verification Level</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder=""
                                            name="verification_level"
                                            value={verification_level}
                                            changeTextValue={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1">In Numbers</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <CssVarsProvider>
                                            <Typography level="body1">Holiday Salary Setting</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder=""
                                            name="salary_above"
                                            value={salary_above}
                                            changeTextValue={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }}  >
                                        <CssVarsProvider>
                                            <Typography level="body1">In Rupees</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>

                        <Box sx={{ width: '50%', pl: 1 }}>
                            <Paper square variant="outlined" sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" } }} >
                                <Paper variant="outlined" sx={{ width: '100%', pl: 0.5 }}>
                                    <CssVarsProvider>
                                        <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}> CarryForward Leave Setting</Typography>
                                    </CssVarsProvider>
                                </Paper>

                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
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
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
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
                                    </Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
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
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
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
                                    </Box>
                                </Box>
                            </Paper>
                            <Paper square variant="outlined" sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" } }} >
                                <Paper variant="outlined" sx={{ width: '100%', pl: 0.5 }}>
                                    <CssVarsProvider>
                                        <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>ESI Setting</Typography>
                                    </CssVarsProvider>
                                </Paper>

                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10, mt: 0.5 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <CssVarsProvider>
                                            <Typography level="body1"> ESI Limit</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder=""
                                            name="esi_limit"
                                            value={esi_limit}
                                            changeTextValue={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <CssVarsProvider>
                                            <Typography level="body1">ESI % Employee</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder=""
                                            name="esi_employee"
                                            value={esi_employee}
                                            changeTextValue={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                </Box>

                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <CssVarsProvider>
                                            <Typography level="body1">ESI % Employer</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder=""
                                            name="esi_employer"
                                            value={esi_employer}
                                            changeTextValue={(e) => updateCommonSettings(e)}
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
                                    <CssVarsProvider>
                                        <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>PF Setting</Typography>
                                    </CssVarsProvider>
                                </Paper>

                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10, mt: 0.5 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <CssVarsProvider>
                                            <Typography level="body1"> Salary Limit</Typography>
                                        </CssVarsProvider>
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
                                        <CssVarsProvider>
                                            <Typography level="body1">-----</Typography>
                                        </CssVarsProvider>
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
                                        <CssVarsProvider>
                                            <Typography level="body1">PF Age Limit</Typography>
                                        </CssVarsProvider>
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
                                        <CssVarsProvider>
                                            <Typography level="body1">PF % Employee</Typography>
                                        </CssVarsProvider>
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
                                        <CssVarsProvider>
                                            <Typography level="body1">PF Employee Amount</Typography>
                                        </CssVarsProvider>
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
                                        <CssVarsProvider>
                                            <Typography level="body1">PF % Employer</Typography>
                                        </CssVarsProvider>
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
                                        <CssVarsProvider>
                                            <Typography level="body1">PF Employer Amount</Typography>
                                        </CssVarsProvider>
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
                                    <CssVarsProvider>
                                        <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>Allowed Half Day Leave Type</Typography>
                                    </CssVarsProvider>
                                </Paper>

                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10, mt: 0.5 }}>
                                    <Box sx={{ width: '30%', px: 0.5 }} >
                                        <CssVarsProvider>
                                            <Typography level="body1">Leave Type</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ width: '70%', px: 0.5, pt: 0.5 }} >
                                        <LeaveTypeMultipeSelect value={levaetype} setValue={setLeaveType} />
                                    </Box>
                                </Box>
                            </Paper>
                            <Paper square variant="outlined" sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" } }} >
                                <Paper variant="outlined" sx={{ width: '100%', pl: 0.5 }}>
                                    <CssVarsProvider>
                                        <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}> One Hour Request Count Setting</Typography>
                                    </CssVarsProvider>
                                </Paper>

                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10, mt: 0.5 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <CssVarsProvider>
                                            <Typography level="body1">No. of One Hour Request/month</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder=""
                                            name="onHourRq_no"
                                            value={onHourRq_no}
                                            changeTextValue={(e) => updateCommonSettings(e)}
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
                                    <CssVarsProvider>
                                        <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>Shift Setting</Typography>
                                    </CssVarsProvider>
                                </Paper>

                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10, mt: 0.5 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <CssVarsProvider>
                                            <Typography level="body1"> Default Shift</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <ShiftSelectByRedux style={SELECT_CMP_STYLE} value={defshift} setValue={setDefShift} />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <CssVarsProvider>
                                            <Typography level="body1">Not Applicable</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <ShiftSelectByRedux style={SELECT_CMP_STYLE} value={notappshift} setValue={setnoappshift} />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <CssVarsProvider>
                                            <Typography level="body1">Week OFF</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <ShiftSelectByRedux style={SELECT_CMP_STYLE} value={workoff} setValue={setworkoff} />
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>

                        <Box sx={{ width: '50%', pl: 1 }}>
                            <Paper square variant="outlined" sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" } }} >
                                <Paper variant="outlined" sx={{ width: '100%', pl: 0.5 }}>
                                    <CssVarsProvider>
                                        <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>NOFF Count Setting</Typography>
                                    </CssVarsProvider>
                                </Paper>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10, mt: 0.5 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <CssVarsProvider>
                                            <Typography level="body1"> Min Days Of NOFF</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder=""
                                            name="noff_count"
                                            value={noff_count}
                                            changeTextValue={(e) => updateCommonSettings(e)}
                                        />
                                    </Box>
                                </Box>
                            </Paper>
                            <Paper square variant="outlined" sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" } }} >
                                <Paper variant="outlined" sx={{ width: '100%', pl: 0.5 }}>
                                    <CssVarsProvider>
                                        <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>Arear Setting</Typography>
                                    </CssVarsProvider>
                                </Paper>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', px: 10, mt: 0.5 }}>
                                    <Box sx={{ flex: 1, px: 0.5 }} >
                                        <CssVarsProvider>
                                            <Typography level="body1"> Arear Type</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{ flex: 1, px: 0.5, pt: 0.5 }} >
                                        <FormControl fullWidth size="small"  >
                                            <Select
                                                value={areartype}
                                                onChange={(e) => setAreartype(e.target.value)}
                                                size="small"
                                                fullWidth
                                                variant='outlined'
                                                sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                                            >
                                                <MenuItem value={0} disabled >Select Earn Type</MenuItem>
                                                {
                                                    earntype && earntype.map((val, index) => {
                                                        return <MenuItem key={index} value={val.erning_type_id}>{val.earning_type_name}</MenuItem>
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                    </Box>
                </Paper>
                <Paper square sx={{ backgroundColor: "#F8F8F8", display: "flex", flexDirection: "row" }}>
                    <Box sx={{ flex: 0, pl: 2 }} >
                        <CssVarsProvider>
                            <IconButton variant="outlined" size='sm' onClick={submitFormData}>
                                <LibraryAddCheckOutlinedIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box>
                </Paper>
            </Box>
        </Fragment>
    )
}

export default memo(CommonSettingNew) 