import React, { useState, useEffect, useCallback } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { useHistory, useParams } from 'react-router-dom'
import { memo } from 'react'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeIdNumber } from 'src/views/Constant/Constant'
import MasterLayout from '../MasterComponents/MasterLayout'
import { Box, Button, CssVarsProvider, Grid, Tooltip, Typography } from '@mui/joy'
import JoyEmployeeTypeSelect from 'src/views/MuiComponents/JoyComponent/JoyEmployeeTypeSelect'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import SaveIcon from '@mui/icons-material/Save';
import PreviewIcon from '@mui/icons-material/Preview';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import { Paper } from '@mui/material'

const EmploymentTypeEdit = () => {

    const { id } = useParams()
    const history = useHistory();
    const [empType, setEmptype] = useState(0)
    const [cate_name, setCate_name] = useState('')
    const [lvetype_slno_cl, setlvetype_slno_cl] = useState(false)
    const [max_allowed_count_cl, setmax_allowed_count_cl] = useState('')
    const [lvetype_slno_sick, setlvetype_slno_sick] = useState(false)
    const [max_allowed_count_sick, setmax_allowed_count_sick] = useState('')
    const [lvetype_slno_conference, setlvetype_slno_conference] = useState(false)
    const [max_allowed_count_conference, setmax_allowed_count_conference] = useState('')
    const [lvetype_slno_lop, setlvetype_slno_lop] = useState(false)
    const [max_allowed_count_lop, setmax_allowed_count_lop] = useState('')
    const [lvetype_slno_maternity, setlvetype_slno_maternity] = useState(false)
    const [max_allowed_count_maternity, setmax_allowed_count_maternity] = useState('')
    const [lvetype_slno_previlage, setlvetype_slno_previlage] = useState(false)
    const [max_allowed_count_previlage, setmax_allowed_count_previlage] = useState('')
    const [cont_renw, setcont_renw] = useState(false)
    const [contract_perd, setcontract_perd] = useState('')
    const [esi_yes, setesi_yes] = useState(false)
    const [dayoff, setdayoff] = useState(false)
    const [workoff, setworkoff] = useState(false)
    const [emp_status, setemp_status] = useState(false)
    const [training, settraining] = useState(false)
    const [probation, setprobation] = useState(false)
    const [holiday, setholiday] = useState(false)
    const [probation_day_count, setprobation_day_count] = useState('')
    const [training_day_count, settraining_day_count] = useState('')
    const [slno, setSlno] = useState(0)
    const [contract_grace_period, setContractGraceperiod] = useState(0)
    const [pf, setPf] = useState(false)
    const [wwf, setWwf] = useState(false)
    const [lwf, setLwf] = useState(false)
    const [cate_doctor, setcate_doctor] = useState(false)

    const clearForm = useCallback(() => {
        setlvetype_slno_cl(false)
        setlvetype_slno_sick(false)
        setlvetype_slno_conference(false)
        setlvetype_slno_lop(false)
        setlvetype_slno_maternity(false)
        setlvetype_slno_previlage(false)
        setcont_renw(false)
        setcontract_perd('')
        setesi_yes(false)
        setdayoff(false)
        setworkoff(false)
        setemp_status(false)
        settraining(false)
        setprobation(false)
        setprobation_day_count('')
        settraining_day_count('')
        setholiday(false)
        setCate_name('')
        setContractGraceperiod(0)
        setPf(false)
        setWwf(false)
        setLwf(false)
        setcate_doctor(false)
    }, [])

    useEffect(() => {
        const getyearlysettings = async () => {
            const result = await axioslogin.get(`/empcat/${id}`)
            const { data } = result.data;
            const { ecat_name, category_slno, ecat_cl, ecat_cl_max, ecat_confere, ecat_confere_max,
                ecat_cont, ecat_cont_period, ecat_doff_allow, ecat_el, ecat_el_max, ecat_esi_allow,
                ecat_lop, ecat_lop_max, ecat_mate, ecat_mate_max, ecat_prob, ecat_prob_period, ecat_sl,
                ecat_sl_max, ecat_status, ecat_woff_allow, ecat_holiday, ecat_training, ecat_training_max,
                emp_type, cont_grace, ecate_pf, ecat_wwf, ecat_lwf, ecat_doctor } = data[0]
            setCate_name(ecat_name)
            setlvetype_slno_cl(ecat_cl === 1 ? true : false)
            setmax_allowed_count_cl(ecat_cl_max === null ? 0 : ecat_cl_max)
            setlvetype_slno_conference(ecat_confere === 1 ? true : false)
            setmax_allowed_count_conference(ecat_confere_max === null ? 0 : ecat_confere_max)
            setlvetype_slno_lop(ecat_lop === 1 ? true : false)
            setmax_allowed_count_lop(ecat_lop_max === null ? 0 : ecat_lop_max)
            setlvetype_slno_maternity(ecat_mate === 1 ? true : false)
            setmax_allowed_count_maternity(ecat_mate_max === null ? 0 : ecat_mate_max)
            setlvetype_slno_previlage(ecat_el === 1 ? true : false)
            setmax_allowed_count_previlage(ecat_el_max === null ? 0 : ecat_el_max)
            setlvetype_slno_sick(ecat_sl === 1 ? true : false)
            setmax_allowed_count_sick(ecat_sl_max === null ? 0 : ecat_sl_max)
            setEmptype(emp_type === null ? 0 : emp_type)
            setprobation_day_count(ecat_prob_period === null ? 0 : ecat_prob_period)
            settraining_day_count(ecat_training_max === null ? 0 : ecat_training_max)
            setcont_renw(ecat_cont === 1 ? true : false)
            setcontract_perd(ecat_cont_period === null ? 0 : ecat_cont_period)
            setworkoff(ecat_woff_allow === 1 ? true : false)
            setholiday(ecat_holiday === 1 ? true : false)
            setdayoff(ecat_doff_allow === 1 ? true : false)
            setesi_yes(ecat_esi_allow === 1 ? true : false)
            setemp_status(ecat_status === 1 ? true : false)
            setprobation(ecat_prob === 1 ? true : false)
            settraining(ecat_training === 1 ? true : false)
            setSlno(category_slno)
            setContractGraceperiod(cont_grace === null ? 0 : cont_grace)
            setPf(ecate_pf === 1 ? true : false)
            setWwf(ecat_wwf === 1 ? true : false)
            setLwf(ecat_lwf === 1 ? true : false)
            setcate_doctor(ecat_doctor === 1 ? true : false)
        }
        getyearlysettings();
    }, [id])


    // // for submission
    const submitEmploymentForm = useCallback(async (e) => {
        const postData = {
            ecat_name: cate_name,
            emp_type: empType,
            ecat_cl: lvetype_slno_cl === true ? 1 : 0,
            ecat_cl_max: max_allowed_count_cl,
            ecat_sl: lvetype_slno_sick === true ? 1 : 0,
            ecat_sl_max: max_allowed_count_sick,
            ecat_confere: lvetype_slno_conference === true ? 1 : 0,
            ecat_confere_max: max_allowed_count_conference,
            ecat_lop: lvetype_slno_lop === true ? 1 : 0,
            ecat_lop_max: max_allowed_count_lop,
            ecat_mate: lvetype_slno_maternity === true ? 1 : 0,
            ecat_mate_max: max_allowed_count_maternity,
            ecat_el: lvetype_slno_previlage === true ? 1 : 0,
            ecat_el_max: max_allowed_count_previlage,
            ecat_cont: cont_renw === true ? 1 : 0,
            ecat_cont_period: contract_perd,
            ecat_esi_allow: esi_yes === true ? 1 : 0,
            ecat_doff_allow: dayoff === true ? 1 : 0,
            ecat_woff_allow: workoff === true ? 1 : 0,
            ecat_status: emp_status === true ? 1 : 0,
            ecat_training: training === true ? 1 : 0,
            ecat_training_max: training_day_count,
            ecat_prob: probation === true ? 1 : 0,
            ecat_prob_period: probation_day_count,
            ecat_holiday: holiday === true ? 1 : 0,
            edit_user: employeeIdNumber(),
            cont_grace: contract_grace_period,
            ecate_pf: pf === true ? 1 : 0,
            ecat_wwf: wwf === true ? 1 : 0,
            ecat_lwf: lwf === true ? 1 : 0,
            ecat_doctor: cate_doctor === true ? 1 : 0,
            category_slno: slno
        }
        e.preventDefault();
        if (cont_renw === true && contract_perd === 0) {
            infoNofity("Select contract Period")

        } else if (training === true && training_day_count === 0) {
            infoNofity("Select Training Period")

        } else {
            const result = await axioslogin.patch('/empcat', postData);
            const { success, message } = result.data;
            if (success === 2) {
                succesNofity(message)
                clearForm()
            } else if (success === 0) {
                errorNofity(message)
            } else if (success === 2) {
                infoNofity(message)
            }
        }

    }, [empType, lvetype_slno_cl, max_allowed_count_cl, lvetype_slno_sick, max_allowed_count_sick,
        lvetype_slno_conference, max_allowed_count_conference, lvetype_slno_lop, max_allowed_count_lop,
        lvetype_slno_maternity, max_allowed_count_maternity, lvetype_slno_previlage, training, clearForm,
        max_allowed_count_previlage, cont_renw, contract_perd, esi_yes, dayoff, workoff, emp_status,
        training_day_count, probation, probation_day_count, holiday, slno, cate_name, contract_grace_period,
        pf, wwf, lwf, cate_doctor])

    // to view page 
    const viewTable = () => {
        history.push('/Home/EmploymentTypeList');
    }

    return (
        <>
            <MasterLayout title={"Employee Category"} displayClose={true}>
                <Box sx={{ width: "100%", p: 0.5 }} >
                    <Paper variant='outlined' sx={{ p: 1 }}>
                        <Grid container spacing={1}>
                            <Box sx={{ width: "100%", p: 1, display: 'flex', flexDirection: 'row', }}>
                                <Box sx={{ flex: 1 }}>
                                    <JoyEmployeeTypeSelect value={empType} setValue={setEmptype} />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <InputComponent
                                        type="text"
                                        size="sm"
                                        name="cate_name"
                                        value={cate_name}
                                        onchange={(e) => setCate_name(e.target.value)}
                                    />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ width: "100%", p: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Box sx={{ flex: 1, pt: 0.5 }}>
                                        <JoyCheckbox
                                            label='Casual Leave'
                                            name="lvetype_slno_cl"
                                            checked={lvetype_slno_cl}
                                            onchange={(e) => setlvetype_slno_cl(e.target.checked)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <InputComponent
                                            type="text"
                                            size="sm"
                                            name="max_allowed_count_cl"
                                            value={max_allowed_count_cl}
                                            onchange={(e) => setmax_allowed_count_cl(e.target.value)}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ width: "100%", p: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Box sx={{ flex: 1, pt: 0.5 }}>
                                        <JoyCheckbox
                                            label='Earn Leave'
                                            checked={lvetype_slno_previlage}
                                            name="lvetype_slno_previlage"
                                            onchange={(e) => setlvetype_slno_previlage(e.target.checked)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <InputComponent
                                            type="text"
                                            size="sm"
                                            name="max_allowed_count_previlage"
                                            value={max_allowed_count_previlage}
                                            onchange={(e) => setmax_allowed_count_previlage(e.target.value)}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ width: "100%", p: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Box sx={{ flex: 1, pt: 0.5 }}>
                                        <JoyCheckbox
                                            label='Sick Leave'
                                            checked={lvetype_slno_sick}
                                            name="lvetype_slno_sick"
                                            onchange={(e) => setlvetype_slno_sick(e.target.checked)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <InputComponent
                                            type="text"
                                            size="sm"
                                            name="max_allowed_count_sick"
                                            value={max_allowed_count_sick}
                                            onchange={(e) => setmax_allowed_count_sick(e.target.value)}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ width: "100%", p: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Box sx={{ flex: 1, pt: 0.5 }}>
                                        <JoyCheckbox
                                            label='Contract Renewal Period(Days)'
                                            disabled={empType === 2 ? false : true}
                                            checked={cont_renw}
                                            name="cont_renw"
                                            onchange={(e) => setcont_renw(e.target.checked)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <InputComponent
                                            type="text"
                                            size="sm"
                                            disabled={empType === 2 ? false : true}
                                            name="contract_perd"
                                            value={contract_perd}
                                            onchange={(e) => setcontract_perd(e.target.value)}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ width: "100%", p: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Box sx={{ flex: 1, pt: 0.5 }}>
                                        {
                                            empType === 2 ? <CssVarsProvider>
                                                <Typography textColor="text.secondary" >
                                                    Contract Renewal Grace Period
                                                </Typography>
                                            </CssVarsProvider> : null
                                        }

                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <InputComponent
                                            type="text"
                                            size="sm"
                                            disabled={empType === 2 ? false : true}
                                            name="contract_grace_period"
                                            value={contract_grace_period}
                                            onchange={(e) => setContractGraceperiod(e.target.value)}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ width: "100%", p: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Box sx={{ flex: 1, pt: 0.5 }}>
                                        <JoyCheckbox
                                            label='Maternity Leave'
                                            checked={lvetype_slno_maternity}
                                            name="lvetype_slno_maternity"
                                            onchange={(e) => setlvetype_slno_maternity(e.target.checked)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1, pt: 0.5 }}>
                                        <InputComponent
                                            type="text"
                                            size="sm"
                                            name="max_allowed_count_maternity"
                                            value={max_allowed_count_maternity}
                                            onchange={(e) => setmax_allowed_count_maternity(e.target.value)}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ width: "100%", p: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Box sx={{ flex: 1, pt: 0.5 }}>
                                        <JoyCheckbox
                                            label='Conferance Leave'
                                            checked={lvetype_slno_conference}
                                            name="lvetype_slno_conference"
                                            onchange={(e) => setlvetype_slno_conference(e.target.checked)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <InputComponent
                                            type="text"
                                            size="sm"
                                            name="max_allowed_count_conference"
                                            value={max_allowed_count_conference}
                                            onchange={(e) => setmax_allowed_count_conference(e.target.value)}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ width: "100%", p: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Box sx={{ flex: 1, pt: 0.5 }}>
                                        <JoyCheckbox
                                            label='Training'
                                            checked={training}
                                            name="training"
                                            onchange={(e) => settraining(e.target.checked)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <InputComponent
                                            type="text"
                                            size="sm"
                                            name="training_day_count"
                                            value={training_day_count}
                                            onchange={(e) => settraining_day_count(e.target.value)}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ width: "100%", p: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Box sx={{ flex: 1, pt: 0.5 }}>
                                        <JoyCheckbox
                                            label='Probation'
                                            checked={probation}
                                            name="probation"
                                            onchange={(e) => setprobation(e.target.checked)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <InputComponent
                                            type="text"
                                            size="sm"
                                            name="probation_day_count"
                                            value={probation_day_count}
                                            onchange={(e) => setprobation_day_count(e.target.value)}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ width: "100%", p: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Box sx={{ flex: 1, pt: 0.5 }}>
                                        <JoyCheckbox
                                            label='Category for Doctors'
                                            checked={cate_doctor}
                                            name="cate_doctor"
                                            onchange={(e) => setcate_doctor(e.target.checked)}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ width: "100%", p: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Box sx={{ flex: 1, pt: 0.5 }}>
                                        <JoyCheckbox
                                            label='LWP'
                                            checked={lvetype_slno_lop}
                                            name="lvetype_slno_lop"
                                            onchange={(e) => setlvetype_slno_lop(e.target.checked)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <InputComponent
                                            type="text"
                                            size="sm"
                                            name="max_allowed_count_lop"
                                            value={max_allowed_count_lop}
                                            onchange={(e) => setmax_allowed_count_lop(e.target.value)}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ width: "100%", p: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-start', pt: 0.5 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <JoyCheckbox
                                            label='Week Off'
                                            checked={workoff}
                                            name="workoff"
                                            onchange={(e) => setworkoff(e.target.checked)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <JoyCheckbox
                                            label='Holiday'
                                            checked={holiday}
                                            onchange={(e) => setholiday(e.target.checked)}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ width: "100%", p: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Box sx={{ flex: 1 }}>
                                        <JoyCheckbox
                                            label='Compansatory Off'
                                            checked={dayoff}
                                            name="dayoff"
                                            onchange={(e) => setdayoff(e.target.checked)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <JoyCheckbox
                                            label='ESI'
                                            checked={esi_yes}
                                            name="esi_yes"
                                            onchange={(e) => setesi_yes(e.target.checked)}
                                        />
                                    </Box>

                                </Box>
                                <Box sx={{ width: "100%", p: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Box sx={{ flex: 1 }}>
                                        <JoyCheckbox
                                            label='PF'
                                            checked={pf}
                                            name="pf"
                                            onchange={(e) => setPf(e.target.checked)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <JoyCheckbox
                                            label='WWF'
                                            checked={wwf}
                                            name="wwf"
                                            onchange={(e) => setWwf(e.target.checked)}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ width: "100%", p: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Box sx={{ flex: 1 }}>
                                        <JoyCheckbox
                                            label='LWF'
                                            checked={lwf}
                                            name="lwf"
                                            onchange={(e) => setLwf(e.target.checked)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <JoyCheckbox
                                            label='Status'
                                            checked={emp_status}
                                            name="emp_status"
                                            onchange={(e) => setemp_status(e.target.checked)}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Tooltip title="Save" followCursor placement='top' arrow>
                                <Box sx={{ px: 0.5, mt: 0.9 }}>
                                    <CssVarsProvider>
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            size="sm"
                                            color="primary"
                                            onClick={submitEmploymentForm}
                                        >
                                            <SaveIcon />
                                        </Button>
                                    </CssVarsProvider>
                                </Box>
                            </Tooltip>
                            <Box sx={{ px: 0.5, mt: 0.9 }}>
                                <CssVarsProvider>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        size="sm"
                                        color="primary"
                                        onClick={viewTable}
                                    >
                                        <PreviewIcon />
                                    </Button>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </MasterLayout>
        </>
    )
}

export default memo(EmploymentTypeEdit)
