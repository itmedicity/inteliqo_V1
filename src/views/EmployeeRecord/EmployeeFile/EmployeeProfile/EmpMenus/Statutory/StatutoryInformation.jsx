import { Box, Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeIdNumber } from 'src/views/Constant/Constant'
import { Button, CssVarsProvider, Tooltip, Typography } from '@mui/joy'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import JoyGradeSelect from 'src/views/MuiComponents/JoyComponent/JoyGradeSelect'
import SaveIcon from '@mui/icons-material/Save';
import { differenceInDays, differenceInMonths, endOfYear, startOfYear } from 'date-fns';

const StatutoryInformation = () => {

    const { id, no } = useParams()
    const [Esiallowed, setEsiallowed] = useState(0)//for setting employee category have esi allowed
    const [selectGrade, UpdateGrade] = useState(0)//for grade select
    const [enable, Setenable] = useState(true)//use state for enable fields on clicking edit button
    const [value, setValue] = useState(1) //use state for setting serail no for edit
    const [leaveProcessdata, setleaveProcessdata] = useState({})
    const [esidata, setEsidata] = useState({})
    const [leavecommondata, setleavecommondata] = useState({})

    //setting initial state
    const [formData, SetformData] = useState({
        pf: false,
        pfno: '',
        esi: false,
        esino: '',
        uanno: '',
        nps: false,
        npsnumber: '',
        npsamount: 0,
        lwf: false,
        lwfnumber: '',
        lwfamount: 0
    })
    const { pf, pfno, esi, esino, uanno, nps,
        npsnumber, npsamount, lwf, lwfnumber, lwfamount } = formData

    //getting data from the form
    const updateStatutoryInformation = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        SetformData({ ...formData, [e.target.name]: value })
    }

    //useEffect For Checking esi is allowed for this employee
    useEffect(() => {
        const getesiallowed = async () => {
            const result = await axioslogin.get(`/empesipf/esiallow/${no}`)
            const { success, data } = result.data
            if (success === 1) {
                setEsiallowed(data[0]?.ecat_esi_allow === 0 ? 2 : data[0]?.ecat_esi_allow)
            } else {
                setEsiallowed(2)
            }
        }
        getesiallowed()
    }, [no])

    useEffect(() => {
        const LeaveProcess = async (id) => {
            const result = await axioslogin.get(`/yearleaveprocess/leaveproccess/data/${id}`)
            const { data, success } = result.data
            if (success === 0) {
                const arr = data?.find((val) => val?.llvetype_slno === 7)
                const arr2 = data?.find((val) => val?.llvetype_slno === 6)
                setEsidata(arr2)
                const commondata = data[0]
                setleaveProcessdata(arr === undefined ? arr2 : arr)
                setleavecommondata(commondata)
            } else {
                setleaveProcessdata({})
            }
        }

        if (esi === true) {
            LeaveProcess(id)
        } else {
        }
    }, [esi, id])


    //useEffect
    useEffect(() => {
        const getpfesi = async () => {
            if (Esiallowed === 1) {
                const result = await axioslogin.get(`/empesipf/${id}`)
                const { success, data } = result.data
                if (success === 1) {
                    const { esi_slno, em_pf_status, em_pf_no, em_uan_no,
                        em_esi_status, em_esi_no, em_grade, nps, npsnumber, npsamount,
                        lwf_status, lwfnumber, lwfamount } = data[0]
                    const formData = {
                        pf: em_pf_status === 1 ? true : false,
                        pfno: em_pf_no === null ? 0 : em_pf_no,
                        uanno: em_uan_no === null ? 0 : em_uan_no,
                        esi: em_esi_status === 1 ? true : false,
                        esino: em_esi_no === null ? 0 : em_esi_no,
                        nps: nps === 1 ? true : false,
                        npsnumber: npsnumber === null ? 0 : npsnumber,
                        npsamount: npsamount === null ? 0 : npsamount,
                        lwf: lwf_status === 1 ? true : false,
                        lwfnumber: lwfnumber === null ? 0 : lwfnumber,
                        lwfamount: lwfamount === null ? 0 : lwfamount
                    }
                    UpdateGrade(em_grade === null ? 0 : em_grade)
                    SetformData(formData)
                    setValue(esi_slno)
                    Setenable(false)
                } else {
                    Setenable(false)
                    setValue(0)
                }
            }
            else if (Esiallowed === 2) {

                infoNofity("Esi Is Not Allowed For This Employee")
                const result = await axioslogin.get(`/empesipf/${id}`)
                const { success, data } = result.data
                if (success === 1) {
                    const { esi_slno, em_pf_status, em_pf_no, em_uan_no,
                        em_esi_status, em_esi_no, em_grade, nps, npsnumber,
                        npsamount, lwf_status, lwfnumber, lwfamount } = data[0]
                    const formData = {
                        pf: em_pf_status === 1 ? true : false,
                        pfno: em_pf_no === null ? 0 : em_pf_no,
                        uanno: em_uan_no === null ? 0 : em_uan_no,
                        esi: em_esi_status === 1 ? true : false,
                        esino: em_esi_no === null ? 0 : em_esi_no,
                        nps: nps === null ? false : true,
                        npsnumber: npsnumber === null ? 0 : npsnumber,
                        npsamount: npsamount === null ? 0 : npsamount,
                        lwf: lwf_status === 1 ? true : false,
                        lwfnumber: lwfnumber === null ? 0 : lwfnumber,
                        lwfamount: lwfamount === null ? 0 : lwfamount
                    }
                    UpdateGrade(em_grade === null ? 0 : em_grade)
                    SetformData(formData)
                    setValue(esi_slno)
                    //Setenable(false)
                } else {
                    //Setenable(false)
                    setValue(1)
                }
                Setenable(true)
            }
            else {
                Setenable(true)
            }
        }
        getpfesi()
    }, [id, Esiallowed])

    //editing esi pf
    const postDataEdit = useMemo(() => {
        return {
            em_id: no,
            em_pf_status: pf === false ? 0 : 1,
            em_pf_no: pfno,
            em_uan_no: uanno,
            em_esi_status: esi === false ? 0 : 1,
            em_esi_no: esino,
            em_grade: selectGrade,
            esi_slno: value,
            edit_user: employeeIdNumber(),
            nps: nps === false ? 0 : 1,
            npsnumber: npsnumber,
            npsamount: npsamount,
            lwf_status: lwf === false ? 0 : 1,
            lwfnumber: lwfnumber,
            lwfamount: lwfamount
        }
    }, [no, pf, pfno, uanno, esi, esino, selectGrade, value,
        nps, npsnumber, npsamount, lwf, lwfnumber, lwfamount])


    const postNps = useMemo(() => {
        return {
            em_no: id,
            em_id: no,
            nps: nps === false ? 0 : 1,
            npsnumber: npsnumber,
            npsamount: npsamount,
            lwf_status: lwf === false ? 0 : 1,
            lwfnumber: lwfnumber,
            lwfamount: lwfamount,
            create_user: employeeIdNumber(),
            edit_user: employeeIdNumber(),
        }
    }, [id, no, nps, npsnumber, npsamount, lwf, lwfnumber, lwfamount])

    const postNpsEdit = useMemo(() => {
        return {
            em_id: no,
            edit_user: employeeIdNumber(),
            nps: nps === false ? 0 : 1,
            npsnumber: npsnumber,
            npsamount: npsamount,
            lwf_status: lwf === false ? 0 : 1,
            lwfnumber: lwfnumber,
            lwfamount: lwfamount,
            esi_slno: value,
        }
    }, [no, nps, npsnumber, npsamount, lwf, lwfnumber, lwfamount, value])


    const inactiveEsi = useMemo(() => {
        return {
            em_id: no,
            em_pf_status: pf === false ? 0 : 1,
            em_pf_no: pfno,
            em_uan_no: uanno,
            em_esi_status: esi === false ? 0 : 1,
            em_esi_no: esino,
            em_grade: selectGrade,
            esi_slno: value,
            edit_user: employeeIdNumber(),
            nps: nps === false ? 0 : 1,
            npsnumber: npsnumber,
            npsamount: npsamount,
            lwf_status: lwf === false ? 0 : 1,
            lwfnumber: lwfnumber,
            lwfamount: lwfamount,
            inactive_status: 1
        }
    }, [no, pf, pfno, uanno, esi, esino, selectGrade, value,
        nps, npsnumber, npsamount, lwf, lwfnumber, lwfamount])

    //saving form data
    const submitFormData = useCallback(async (e) => {
        e.preventDefault()
        const postData = {
            em_no: id,
            em_id: no,
            em_pf_status: pf === false ? 0 : 1,
            em_pf_no: pfno,
            em_uan_no: uanno,
            em_esi_status: esi === false ? 0 : 1,
            em_esi_no: esino,
            em_grade: selectGrade,
            create_user: employeeIdNumber(),
            edit_user: employeeIdNumber(),
            nps: nps === false ? 0 : 1,
            npsnumber: npsnumber,
            npsamount: npsamount,
            lwf_status: lwf === false ? 0 : 1,
            lwfnumber: lwfnumber,
            lwfamount: lwfamount,
            esi_slno: value,
        }
        if (value === 0 && Esiallowed === 1) {
            console.log(leaveProcessdata);
            
            if (leaveProcessdata === undefined) {
                //probation category
                const { hrm_lv_cmn, em_no,
                    cmn_lv_allowedflag,
                    Iv_process_slno,
                    update_user,
                    em_id,
                    cmn_lv_year } = leavecommondata
                const lastYear = endOfYear(new Date())
                const daycount = differenceInDays(lastYear, new Date())
                const postdata = {
                    em_no: em_no,
                    llvetype_slno: 6,
                    cmn_lv_allowedflag,
                    cmn_lv_allowed: daycount,
                    cmn_lv_taken: 0,
                    cmn_lv_balance: daycount,
                    Iv_process_slno: Iv_process_slno,
                    update_user: employeeIdNumber(),
                    em_id: em_id,
                    cmn_lv_year: cmn_lv_year,
                    hrm_lv_cmn: hrm_lv_cmn
                }
                const result = await axioslogin.post('/empesipf', postData)
                const { success, message } = result.data
                if (success === 1) {
                    const result = await axioslogin.post('/yearleaveprocess/insert/esileave', postdata)
                    const { success, message } = result.data
                    if (success === 1) {
                        succesNofity(message)
                    } else {
                        errorNofity(message)
                    }
                } else {
                    errorNofity(message)
                }

            } else {
                const { hrm_lv_cmn, em_no,
                    cmn_lv_allowedflag,
                    Iv_process_slno,
                    update_user,
                    em_id,
                    cmn_lv_year } = leaveProcessdata
                const lastYear = endOfYear(new Date())
                const daycount = differenceInDays(lastYear, new Date())
                const postdata = {
                    em_no: em_no,
                    llvetype_slno: 6,
                    cmn_lv_allowedflag,
                    cmn_lv_allowed: daycount,
                    cmn_lv_taken: 0,
                    cmn_lv_balance: daycount,
                    Iv_process_slno: Iv_process_slno,
                    update_user: employeeIdNumber(),
                    em_id: em_id,
                    cmn_lv_year: cmn_lv_year,
                    hrm_lv_cmn: hrm_lv_cmn
                }

                const result = await axioslogin.post('/empesipf', postData)
                const { success, message } = result.data
                if (success === 1) {
                    const result = await axioslogin.patch('/yearleaveprocess/inactive/sick', postdata)
                    const { success, message } = result.data
                    if (success === 1) {
                        succesNofity(message)
                    } else {
                        errorNofity(message)
                    }
                } else {
                    errorNofity(message)
                }
            }
        } else if (value === 1 && Esiallowed === 2) {
            const result = await axioslogin.post('/empesipf/create', postNps)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
            } else {
                errorNofity(message)
            }
        } else if (esi === true && Esiallowed === 1) {
            const { hrm_lv_cmn, em_no,
                cmn_lv_allowedflag,
                Iv_process_slno,
                update_user,
                em_id,
                cmn_lv_year } = leaveProcessdata
            const lastYear = endOfYear(new Date())
            const daycount = differenceInDays(lastYear, new Date())
            const postesi = {
                em_no: em_no,
                llvetype_slno: 6,
                cmn_lv_allowedflag,
                cmn_lv_allowed: daycount,
                cmn_lv_taken: 0,
                cmn_lv_balance: daycount,
                Iv_process_slno: Iv_process_slno,
                update_user: employeeIdNumber(),
                em_id: em_id,
                cmn_lv_year: cmn_lv_year,
                hrm_lv_cmn: hrm_lv_cmn
            }
            const result = await axioslogin.post('/empesipf', postData)
            const { success, message } = result.data
            if (success === 1) {
                const result = await axioslogin.patch('/yearleaveprocess/inactive/sick', postesi)
                const { success, message } = result.data
                if (success === 1) {
                    succesNofity(message)
                } else {
                    errorNofity(message)
                }
            } else {
                errorNofity(message)
            }
        }
        else {
            if (Esiallowed === 2) {
                const result = await axioslogin.patch('/empesipf/npsupdate', postNpsEdit)
                const { success, message } = result.data
                if (success === 2) {
                    succesNofity(message)
                    Setenable(true)
                }
                else if (success === 3) {
                    warningNofity(message)
                }
                else {
                    errorNofity(message)
                }
            } else {
                const { hrm_lv_cmn, em_no,
                    cmn_lv_allowedflag,
                    Iv_process_slno,
                    update_user,
                    em_id,
                    cmn_lv_year } = esidata;
                const endMonth = endOfYear(new Date())
                const sickCount = differenceInMonths(endMonth, new Date())

                const postdata = {
                    em_no: em_no,
                    llvetype_slno: 7,
                    cmn_lv_allowedflag,
                    cmn_lv_allowed: sickCount + 1,
                    cmn_lv_taken: 0,
                    cmn_lv_balance: sickCount + 1,
                    Iv_process_slno: Iv_process_slno,
                    update_user: employeeIdNumber(),
                    em_id: em_id,
                    cmn_lv_year: cmn_lv_year,
                    hrm_lv_cmn: hrm_lv_cmn
                }
                if (esi === false) {
                    const result = await axioslogin.patch('/empesipf/inactive', inactiveEsi)
                    const { success, message } = result.data
                    if (success === 2) {
                        const result = await axioslogin.patch('/yearleaveprocess/inactive/esi', postdata)
                        const { success, message } = result.data
                        if (success === 1) {
                            succesNofity(message)
                        } else {
                            errorNofity(message)
                        }
                    }
                    else {
                        errorNofity(message)
                    }
                } else {
                    const result = await axioslogin.patch('/empesipf', postDataEdit)
                    const { success, message } = result.data
                    if (success === 2) {
                        succesNofity(message)
                        Setenable(true)
                    }
                    else if (success === 3) {
                        warningNofity(message)
                    }
                    else {
                        errorNofity(message)
                    }
                }
            }
        }
    }, [leaveProcessdata, Esiallowed, esi, value, id, no, pf, pfno, uanno, esino, selectGrade,
        nps, npsnumber, npsamount, lwf, lwfnumber, lwfamount, leavecommondata])

    return (
        <Fragment>
            <Box sx={{ width: "100%" }} >
                <Paper square elevation={2} sx={{ p: 0.5, }}>
                    <Paper variant='outlined' square elevation={0} sx={{ display: "flex", alignItems: "center", }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Satutory Information
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Tooltip title="Save" followCursor placement='top' arrow>
                            <Box sx={{ display: "flex", pr: 1 }}>
                                <CssVarsProvider>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        size="sm"
                                        color="primary"
                                        onClick={submitFormData}
                                    >
                                        <SaveIcon />
                                    </Button>
                                </CssVarsProvider>
                            </Box>
                        </Tooltip>
                    </Paper>
                    <Paper square elevation={0} sx={{ sp: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" } }} >
                        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, px: 0.5, }}>
                            <Box sx={{ display: "flex", flexDirection: "row", pt: 0.5 }}>
                                <Box sx={{ flex: 1, mt: 0.5 }} >
                                    <JoyCheckbox
                                        disabled={enable}
                                        label='Provident Fund'
                                        name="pf"
                                        checked={pf}
                                        onchange={(e) => updateStatutoryInformation(e)}
                                    />
                                </Box>
                                <Box sx={{ flex: 1 }} >
                                    <InputComponent
                                        type="text"
                                        disabled={enable}
                                        size="sm"
                                        placeholder="PF Number"
                                        name="pfno"
                                        value={pfno}
                                        onchange={(e) => updateStatutoryInformation(e)}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, mt: 0.5, ml: 0.5 }} >
                                    <JoyCheckbox
                                        disabled={enable}
                                        label="Employee's State Insurance"
                                        name="esi"
                                        checked={esi}
                                        onchange={(e) => updateStatutoryInformation(e)}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, }} >
                                    <InputComponent
                                        type="text"
                                        disabled={enable}
                                        size="sm"
                                        placeholder="ESI Number"
                                        name="esino"
                                        value={esino}
                                        onchange={(e) => updateStatutoryInformation(e)}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", pt: 0.5 }}>
                                <Box sx={{ flex: 1 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary">
                                            Universal Account Number
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ flex: 1 }} >
                                    <InputComponent
                                        type="text"
                                        disabled={enable}
                                        size="sm"
                                        placeholder="UAN Numbe"
                                        name="uanno"
                                        value={uanno}
                                        onchange={(e) => updateStatutoryInformation(e)}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, ml: 0.5, mt: 0.5 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Grade
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ flex: 1 }} >
                                    <JoyGradeSelect value={selectGrade} setValue={UpdateGrade} />
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", pt: 0.5 }}>
                                <Box sx={{ flex: 1, mt: 0.5 }} >
                                    <JoyCheckbox
                                        label="NPS Number(PRAN)"
                                        name="nps"
                                        checked={nps}
                                        onchange={(e) => updateStatutoryInformation(e)}
                                    />
                                </Box>
                                <Box sx={{ flex: 1 }} >
                                    <InputComponent
                                        type="text"
                                        size="sm"
                                        placeholder="NPS Number"
                                        name="npsnumber"
                                        value={npsnumber}
                                        onchange={(e) => updateStatutoryInformation(e)}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, pl: 0.5 }} >
                                    <Box sx={{ flex: 1 }}>
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" >
                                                NPS Amount
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, }} >
                                    <InputComponent
                                        type="text"
                                        size="sm"
                                        placeholder="NPS Employee Amount"
                                        name="npsamount"
                                        value={npsamount}
                                        onchange={(e) => updateStatutoryInformation(e)}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", pt: 0.5 }}>
                                <Box sx={{ flex: 1 }} >
                                    <JoyCheckbox
                                        label="LWF Number"
                                        name="lwf"
                                        checked={lwf}
                                        onchange={(e) => updateStatutoryInformation(e)}
                                    />
                                </Box>
                                <Box sx={{ flex: 1 }} >
                                    <InputComponent
                                        type="text"
                                        size="sm"
                                        placeholder="LWF Number"
                                        name="lwfnumber"
                                        value={lwfnumber}
                                        onchange={(e) => updateStatutoryInformation(e)}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, pl: 0.5 }} >
                                    <Box sx={{ flex: 1 }}>
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" >
                                                LWF Amount
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, }} >
                                    <InputComponent
                                        type="text"
                                        size="sm"
                                        placeholder="LWF Amount"
                                        name="lwfamount"
                                        value={lwfamount}
                                        onchange={(e) => updateStatutoryInformation(e)}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Paper>
            </Box>
        </Fragment>
    )
}

export default memo(StatutoryInformation)