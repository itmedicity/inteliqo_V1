import { Checkbox, FormControlLabel } from '@material-ui/core'
import { useStyles } from '@material-ui/pickers/views/Calendar/Day'
import { Box, Paper } from '@mui/material'
import React, { Fragment, memo, useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import GradeSelect from 'src/views/CommonCode/GradeSelect'
import TextInput from 'src/views/Component/TextInput'
import { employeeNumber } from 'src/views/Constant/Constant'
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { CssVarsProvider, Typography } from '@mui/joy'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import IconButton from '@mui/joy/IconButton'


const StatutoryInformation = () => {

    const classes = useStyles()
    const history = useHistory()
    const { id, no } = useParams()
    const [Esiallowed, setEsiallowed] = useState(0)
    //setting initial state
    const [formData, SetformData] = useState({
        pf: false,
        pfno: '',
        esi: false,
        esino: '',
        uanno: '',
    })
    //destructuring
    const { pf, pfno, esi, esino, uanno } = formData
    //grade select list
    const { selectGrade, UpdateGrade } = useContext(PayrolMasterContext)
    //getting data from the form
    const updateStatutoryInformation = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        SetformData({ ...formData, [e.target.name]: value })
    }
    //use state for enable fields on clicking edit button
    const [enable, Setenable] = useState(true)
    //use state for setting serail no for edit
    const [value, setValue] = useState(1)
    //useEffect For Checking esi is allowed for this employee
    useEffect(() => {
        const getesiallowed = async () => {
            const result = await axioslogin.get(`/empesipf/esiallow/${no}`)
            const { success, data } = result.data
            if (success === 1) {
                setEsiallowed(data[0].ecat_esi_allow === 0 ? 2 : data[0].ecat_esi_allow)
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
                    const { esi_slno, em_pf_status, em_pf_no, em_uan_no, em_esi_status, em_esi_no, em_grade } =
                        data[0]
                    const formData = {
                        pf: em_pf_status === 1 ? true : false,
                        pfno: em_pf_no,
                        uanno: em_uan_no,
                        esi: em_esi_status === 1 ? true : false,
                        esino: em_esi_no,
                    }
                    UpdateGrade(em_grade)
                    SetformData(formData)
                    setValue(esi_slno)
                } else {
                    Setenable(false)
                    setValue(0)
                }
            }
            else if (Esiallowed === 2) {
                infoNofity("Esi Is Not Allowed For This Employee")
                Setenable(true)
            }
            else {
                Setenable(true)
            }
        }
        getpfesi()
    }, [UpdateGrade, id, Esiallowed])

    const reset = () => {
        Setenable(false)
    }
    //postData
    const postData = {
        em_no: id,
        em_id: no,
        em_pf_status: pf === false ? 0 : 1,
        em_pf_no: pfno,
        em_uan_no: uanno,
        em_esi_status: esi === false ? 0 : 1,
        em_esi_no: esino,
        em_grade: selectGrade,
        create_user: employeeNumber(),
    }
    //editing esi pf
    const postDataEdit = {
        em_id: no,
        em_pf_status: pf === false ? 0 : 1,
        em_pf_no: pfno,
        em_uan_no: uanno,
        em_esi_status: esi === false ? 0 : 1,
        em_esi_no: esino,
        em_grade: selectGrade,
        esi_slno: value,
        edit_user: employeeNumber(),
    }

    //saving form data
    const submitFormData = async (e) => {
        e.preventDefault()
        if (value === 0) {
            const result = await axioslogin.post('/empesipf', postData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
            } else {
                errorNofity('Error Occured!!!Please Contact EDP')
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

    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${id}/${no}`)
    }

    return (
        <Fragment>
            <Box sx={{ width: "100%" }} >
                <Paper square elevation={2} sx={{ p: 0.5, }}>
                    <Paper square elevation={3} sx={{
                        display: "flex",
                        p: 1,
                        alignItems: "center",
                    }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} level="h6" >
                                    Statutory Information
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                    <Paper square elevation={3} sx={{
                        p: 0.5,
                        mt: 0.5,
                        display: 'flex',
                        alignItems: "center",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                        // backgroundColor: "lightcyan"
                    }} >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1, px: 0.5,
                        }}>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                px: 20
                            }}>
                                <Box sx={{ flex: 1, pt: 0.5 }} >
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
                                        label="PF"
                                    />
                                </Box>
                                <Box sx={{ flex: 1 }} >
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="PF Number"
                                        changeTextValue={(e) => updateStatutoryInformation(e)}
                                        value={pfno}
                                        disabled={enable}
                                        name="pfno"
                                    />
                                </Box>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                px: 20
                            }}>
                                <Box sx={{ flex: 1, }} >
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
                                        label="ESI"
                                    />
                                </Box>
                                <Box sx={{ flex: 1, }} >
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="ESI Number"
                                        changeTextValue={(e) => updateStatutoryInformation(e)}
                                        value={esino}
                                        disabled={enable}
                                        name="esino"
                                    />
                                </Box>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                px: 20
                            }}>
                                <Box sx={{ flex: 1, }} >
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="UAN Number"
                                        changeTextValue={(e) => updateStatutoryInformation(e)}
                                        value={uanno}
                                        disabled={enable}
                                        name="uanno"
                                    />
                                </Box>
                                <Box sx={{ flex: 1, pt: 0.5, pl: 0.5 }} >
                                    <GradeSelect
                                        style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                        disable={enable}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Paper>
                <Paper square sx={{
                    backgroundColor: "#F8F8F8",
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <Box sx={{ display: "flex", pl: 1 }} >
                        <CssVarsProvider>
                            <IconButton variant="outlined" size='sm' sx={theme => ({
                                color: `rgba(${theme.vars.palette.primary.mainChannel} / 0.78)`,
                            })} onClick={submitFormData} >
                                <LibraryAddCheckOutlinedIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box>
                    {/* <Box sx={{ display: "flex", pl: 0.5 }} >
                        <CssVarsProvider>
                            <IconButton variant="outlined" size='sm' sx={theme => ({
                                color: `rgba(${theme.vars.palette.primary.mainChannel} / 0.78)`,
                            })} onClick={RedirectToProfilePage}>
                                <CloseIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box> */}
                </Paper>
            </Box>
        </Fragment>
    )
}

export default memo(StatutoryInformation)