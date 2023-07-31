import { Box, Checkbox, FormControlLabel, Paper, TextField } from '@mui/material'
import React, { Fragment, memo, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeNumber } from 'src/views/Constant/Constant'
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import { CssVarsProvider, Typography } from '@mui/joy'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import IconButton from '@mui/joy/IconButton'
import GradeSelectRedux from 'src/views/MuiComponents/GradeSelectRedux'

const StatutoryInformation = () => {

    const { id, no } = useParams()
    const [Esiallowed, setEsiallowed] = useState(0)//for setting employee category have esi allowed
    const [selectGrade, UpdateGrade] = useState(0)//for grade select
    const [enable, Setenable] = useState(true)//use state for enable fields on clicking edit button
    const [value, setValue] = useState(1) //use state for setting serail no for edit

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
                setEsiallowed(data[0].ecat_esi_allow === 0 ? 2 : data[0].ecat_esi_allow)
            } else {
                setEsiallowed(2)
            }
        }
        getesiallowed()
    }, [no])

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

    //postData
    const postData = useMemo(() => {
        return {
            em_no: id,
            em_id: no,
            em_pf_status: pf === false ? 0 : 1,
            em_pf_no: pfno,
            em_uan_no: uanno,
            em_esi_status: esi === false ? 0 : 1,
            em_esi_no: esino,
            em_grade: selectGrade,
            create_user: employeeNumber(),
            edit_user: employeeNumber(),
            nps: nps === false ? 0 : 1,
            npsnumber: npsnumber,
            npsamount: npsamount,
            lwf_status: lwf === false ? 0 : 1,
            lwfnumber: lwfnumber,
            lwfamount: lwfamount
        }
    }, [id, no, pf, pfno, uanno, esi, esino, selectGrade,
        nps, npsnumber, npsamount, lwf, lwfnumber, lwfamount])
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
            edit_user: employeeNumber(),
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
            create_user: employeeNumber(),
            edit_user: employeeNumber(),
        }
    }, [id, no, nps, npsnumber, npsamount, lwf, lwfnumber, lwfamount])

    const postNpsEdit = useMemo(() => {
        return {
            em_id: no,
            edit_user: employeeNumber(),
            nps: nps === false ? 0 : 1,
            npsnumber: npsnumber,
            npsamount: npsamount,
            lwf_status: lwf === false ? 0 : 1,
            lwfnumber: lwfnumber,
            lwfamount: lwfamount,
            esi_slno: value,
        }
    }, [no, nps, npsnumber, npsamount, lwf, lwfnumber, lwfamount, value])

    //saving form data
    const submitFormData = async (e) => {
        e.preventDefault()
        if (value === 0 && Esiallowed === 1) {
            const result = await axioslogin.post('/empesipf', postData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
            } else {
                errorNofity('Error Occured!!!Please Contact EDP')
            }
        } else if (value === 1 && Esiallowed === 2) {
            const result = await axioslogin.post('/empesipf/create', postNps)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
            } else {
                errorNofity('Error Occured!!!Please Contact EDP')
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
                    errorNofity('Error Occured !!! Plaese Contact EDP')
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
                    errorNofity('Error Occured !!! Plaese Contact EDP')
                }
            }
        }
    }

    return (
        <Fragment>
            <Box sx={{ width: "100%" }} >
                <Paper square elevation={2} sx={{ p: 0.5, }}>
                    <Paper square elevation={3} sx={{ display: "flex", p: 1, alignItems: "center", }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Satutory Information
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                    <Paper square elevation={3} sx={{ sp: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" } }} >
                        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, px: 0.5, }}>
                            <Box sx={{ display: "flex", flexDirection: "row", pt: 0.5 }}>
                                <Box sx={{ flex: 1 }} >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={enable}
                                                name="pf"
                                                color="primary"
                                                value={pf}
                                                checked={pf}
                                                className="ml-1"
                                                onChange={(e) => updateStatutoryInformation(e)}
                                            />
                                        }
                                        label="Provident Fund"
                                    />
                                </Box>
                                <Box sx={{ flex: 1 }} >
                                    <TextField
                                        placeholder="PF Number"
                                        disabled={enable}
                                        fullWidth
                                        id="fullWidth"
                                        size="small"
                                        value={pfno}
                                        name="pfno"
                                        onChange={(e) => updateStatutoryInformation(e)}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, pl: 0.5 }} >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={enable}
                                                name="esi"
                                                color="primary"
                                                value={esi}
                                                checked={esi}
                                                className="ml-1"
                                                onChange={(e) => updateStatutoryInformation(e)}
                                            />
                                        }
                                        label="Employee's State Insurance "
                                    />
                                </Box>
                                <Box sx={{ flex: 1, }} >
                                    <TextField
                                        placeholder="ESI Number"
                                        disabled={enable}
                                        fullWidth
                                        id="fullWidth"
                                        size="small"
                                        value={esino}
                                        name="esino"
                                        onChange={(e) => updateStatutoryInformation(e)}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", pt: 1 }}>
                                <Box sx={{ flex: 1 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" sx={{ fontWeight: 550 }}>
                                            Universal Account Number
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ flex: 1 }} >
                                    <TextField
                                        placeholder="UAN Number"
                                        disabled={enable}
                                        fullWidth
                                        id="fullWidth"
                                        size="small"
                                        value={uanno}
                                        name="uanno"
                                        onChange={(e) => updateStatutoryInformation(e)}
                                    />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" sx={{ fontWeight: 550 }} >
                                            Grade
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ flex: 1 }} >
                                    <GradeSelectRedux value={selectGrade} setValue={UpdateGrade} />
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", pt: 1 }}>
                                <Box sx={{ flex: 1 }} >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="nps"
                                                color="primary"
                                                value={nps}
                                                checked={nps}
                                                className="ml-1"
                                                onChange={(e) => updateStatutoryInformation(e)}
                                            />
                                        }
                                        label="NPS Number(PRAN)"
                                    />
                                </Box>
                                <Box sx={{ flex: 1 }} >
                                    <TextField
                                        placeholder="NPS Number"
                                        fullWidth
                                        id="fullWidth"
                                        size="small"
                                        value={npsnumber}
                                        name="npsnumber"
                                        onChange={(e) => updateStatutoryInformation(e)}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, pl: 0.5 }} >
                                    <Box sx={{ flex: 1 }}>
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" sx={{ fontWeight: 550 }}>
                                                NPS Amount
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, }} >
                                    <TextField
                                        placeholder="NPS Employee Amount"
                                        fullWidth
                                        id="fullWidth"
                                        size="small"
                                        value={npsamount}
                                        name="npsamount"
                                        onChange={(e) => updateStatutoryInformation(e)}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", pt: 1 }}>
                                <Box sx={{ flex: 1 }} >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="lwf"
                                                color="primary"
                                                value={lwf}
                                                checked={lwf}
                                                className="ml-1"
                                                onChange={(e) => updateStatutoryInformation(e)}
                                            />
                                        }
                                        label="LWF Number"
                                    />
                                </Box>
                                <Box sx={{ flex: 1 }} >
                                    <TextField
                                        placeholder="LWF Number"
                                        fullWidth
                                        id="fullWidth"
                                        size="small"
                                        value={lwfnumber}
                                        name="lwfnumber"
                                        onChange={(e) => updateStatutoryInformation(e)}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, pl: 0.5 }} >
                                    <Box sx={{ flex: 1 }}>
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" sx={{ fontWeight: 550 }}>
                                                LWF Amount
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, }} >
                                    <TextField
                                        placeholder=" LWF Amount"
                                        fullWidth
                                        id="fullWidth"
                                        size="small"
                                        value={lwfamount}
                                        name="lwfamount"
                                        onChange={(e) => updateStatutoryInformation(e)}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Paper>
                <Paper square sx={{ backgroundColor: "#F8F8F8", display: "flex", flexDirection: "row" }}>
                    <Box sx={{ display: "flex", p: 0.3 }} >
                        <CssVarsProvider>
                            <IconButton variant="outlined" size='sm' sx={theme => ({
                                color: `rgba(${theme.vars.palette.primary.mainChannel} / 0.78)`,
                            })} onClick={submitFormData} >
                                <LibraryAddCheckOutlinedIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box>
                </Paper>
            </Box>
        </Fragment>
    )
}

export default memo(StatutoryInformation)