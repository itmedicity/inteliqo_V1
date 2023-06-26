import { differenceInMonths, differenceInYears, getYear } from 'date-fns'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import moment from 'moment';
import { useParams } from 'react-router'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import TextInput from 'src/views/Component/TextInput'
import { format } from 'date-fns'
import { Box, Checkbox, FormControlLabel, Paper } from '@mui/material';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import { CssVarsProvider, Typography } from '@mui/joy'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import IconButton from '@mui/joy/IconButton';
import { useSelector } from 'react-redux';
import DesignationSelectRedux from 'src/views/MuiComponents/DesignationSelectRedux';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import EditIcon from '@mui/icons-material/Edit';

const ExperienceDetails = () => {

    //const classes = useStyles()
    const { id, no } = useParams();
    const [count, setCount] = useState(0)//table row refreshing
    const [flag, setflag] = useState(0)//setting flag=1 for updation
    const [desg, setDesg] = useState(0)//designation 
    const [slno, setslno] = useState(0)
    const [totyear, settotyear] = useState(0)
    const [data, setData] = useState([])
    const [totmonth, setTotmonth] = useState(0)

    //Initial State
    const [formData, setformData] = useState({
        institution_name: "",
        gross_salary: "",
        workstartdate: format(new Date(), "yyyy-MM-dd"),
        workenddate: format(new Date(), "yyyy-MM-dd"),
        tmch_exp: false,
    })
    //defaultState
    const defaultState = {
        institution_name: "",
        gross_salary: "",
        workstartdate: format(new Date(), "yyyy-MM-dd"),
        workenddate: format(new Date(), "yyyy-MM-dd"),
        tmch_exp: false
    }
    //Destructuring
    const { institution_name, gross_salary, workstartdate, workenddate, tmch_exp } = formData
    //getting form data
    const updateEmployeeExpFormData = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setformData({ ...formData, [e.target.name]: value })
        const expyear = differenceInYears(new Date(workenddate), new Date(workstartdate))
        settotyear(expyear)
        const monthdiff = differenceInMonths(new Date(workenddate), new Date(workstartdate))
        const month = monthdiff % 12
        setTotmonth(month)
    }

    const empno = useSelector((state) => {
        return state.getProfileData.ProfileData[0].em_no
        //const status = state.getProfileData.lodingStatus
    })

    //postData
    const postData = useMemo(() => {
        return {
            em_no: id,
            em_id: no,
            em_institution: institution_name,
            em_designation: desg,
            em_from: moment(workstartdate).format('YYYY-MM-DD'),
            em_to: moment(workenddate).format('YYYY-MM-DD'),
            em_total_year: totyear,
            em_salary: gross_salary,
            create_user: empno,
            tmch_exp: tmch_exp === true ? 1 : 0
        }
    }, [id, no, institution_name, desg, totyear, gross_salary, tmch_exp, workenddate, workstartdate, empno])

    //function for getting selected row to edit
    const getTableData = useCallback((params) => {
        setflag(1)
        const data = params.api.getSelectedRows()
        const { em_institution, em_designation, em_from, em_to, em_total_year, em_salary, is_tmch, emexp_slno } = data[0]
        const frmData = {
            institution_name: em_institution,
            gross_salary: em_salary,
            workstartdate: em_from,
            workenddate: em_to,
            tmch_exp: is_tmch === 1 ? true : false,
        }
        setDesg(em_designation)
        setformData(frmData)
        settotyear(em_total_year)
        setslno(emexp_slno)
    }, [])

    //patchdata for updating
    const patchData = useMemo(() => {
        return {
            em_no: id,
            em_id: no,
            emexp_slno: slno,
            em_institution: institution_name,
            tmch_exp: tmch_exp === false ? 0 : 1,
            em_designation: desg,
            em_from: moment(workstartdate).format('YYYY-MM-DD'),
            em_to: moment(workenddate).format('YYYY-MM-DD'),
            em_total_year: totyear,
            em_salary: gross_salary,
            create_user: no
        }
    }, [id, no, slno, institution_name, tmch_exp, desg, workenddate, workstartdate, totyear, gross_salary])

    //saving formdata
    const submitFormData = useCallback((e) => {
        e.preventDefault()
        const submitformadata = async (postData) => {
            const result = await axioslogin.post('/experience', postData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                setformData(defaultState)
                setCount(count + 1)
                settotyear(0)
                setDesg(0)
            }
            else if (success === 2) {
                warningNofity(message)
            }
            else {
                infoNofity(message)
            }
        }
        //updating data in database
        const submitUpdateData = async (patchData) => {
            const result = await axioslogin.patch('/experience', patchData)
            const { success, message } = result.data
            if (success === 2) {
                succesNofity(message)
                setformData(defaultState)
                setCount(count + 1)
                settotyear(0)
                succesNofity(message)
            }
            else {
                infoNofity(message)
            }
        }
        if (flag === 1) {
            submitUpdateData(patchData)
        } else {
            if (workstartdate === workenddate) {
                warningNofity("Please Select Experience Year")
            } else {
                submitformadata(postData)
            }

        }
    }, [postData, patchData, flag, count])

    const [columnDef] = useState([
        { headerName: 'Emp No', field: 'em_no', wrapText: true, minWidth: 90 },
        { headerName: 'Institution ', field: 'em_institution', wrapText: true, minWidth: 400 },
        { headerName: 'Designation ', field: 'desg_name', wrapText: true, minWidth: 200 },
        { headerName: 'Start Date ', field: 'em_from', wrapText: true, minWidth: 150 },
        { headerName: 'End Date', field: 'em_to', minWidth: 150 },
        { headerName: 'Total Year', field: 'year', minWidth: 150 },
        { headerName: 'Total Month ', field: 'month', minWidth: 150 },
        { headerName: 'Total Days', field: 'day', minWidth: 150 },
        { headerName: 'Gross salary', field: 'em_salary', minWidth: 150 },
        {
            headerName: 'Edit', minWidth: 150, cellRenderer: params =>
                <EditIcon onClick={() =>
                    getTableData(params)
                }
                />
        },
    ])

    useEffect(() => {
        const getTableData = async () => {
            const results = await axioslogin.get(`/experience/select/${id}`)
            const { success, data } = results.data
            if (success === 1) {
                setData(data)
            } else if (success === 0) {
                infoNofity("No Experience Is added to This Employee")
            }
            else {
                errorNofity("Error Occured,Please Contact EDP")
            }
        }
        getTableData()
    }, [id, count])

    return (
        <Fragment>
            <Box sx={{ width: "100%", height: { xxl: 825, xl: 680, lg: 523, md: 270, sm: 270, xs: 270 }, overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }} >
                <Paper square elevation={2} sx={{ p: 0.5, }}>
                    {/* heading Section start */}
                    <Paper square elevation={3} sx={{ display: "flex", p: 1, alignItems: "center" }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Experience Information
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                    {/* headig section end */}

                    <Paper square elevation={3} sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" } }} >
                        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, px: 0.5, }}>
                            {/* first row start */}
                            <Box sx={{ display: "flex", flexDirection: "row", }}>
                                <Box sx={{ width: '20%' }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Institution Name
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: '30%' }} >
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="Institution Name"
                                        changeTextValue={(e) => updateEmployeeExpFormData(e)}
                                        value={tmch_exp === true ? "Travancore Medicity" : institution_name}
                                        name="institution_name"
                                    />
                                </Box>
                                <Box sx={{ width: '50%', pl: 5 }} >
                                    <FormControlLabel
                                        className=""
                                        control={
                                            <Checkbox
                                                name="tmch_exp"
                                                color="secondary"
                                                value={tmch_exp}
                                                checked={tmch_exp}
                                                className="pl-2 pt-1 pb-1"
                                                onChange={(e) => {
                                                    updateEmployeeExpFormData(e)
                                                }}

                                            />
                                        } label="Medicity Experience"
                                    />
                                </Box>
                            </Box>
                            {/* first row end */}

                            <Box sx={{ display: "flex", flexDirection: "row" }}>
                                <Box sx={{ width: '20%' }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Designation
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: '30%', pt: 1 }} >
                                    {/* <DesignationMast style={SELECT_CMP_STYLE} /> */}
                                    <DesignationSelectRedux value={desg} setValue={setDesg} />
                                </Box>
                                <Box sx={{ width: '20%', pl: 0.5 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Work Start Date
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: '30%' }} >
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
                                </Box>
                            </Box>
                            {/* second row start */}
                            <Box sx={{ display: "flex", flexDirection: "row", pt: 0.5 }}>
                                <Box sx={{ width: '20%', pt: 0.5, }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Work End Date
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: '30%' }} >
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
                                </Box>
                                <Box sx={{ width: '20%', pl: 0.5 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Total Year Experience
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: '30%' }} >
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="Total Year"
                                        value={totyear}
                                        name="totyear"
                                        disabled={true}
                                    />
                                </Box>
                            </Box>
                            {/* second row end */}
                            {/* third row start */}
                            <Box sx={{ display: "flex", flexDirection: "row", py: 1 }}>
                                <Box sx={{ width: '20%' }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Total Month Experience
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: '30%' }} >
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="Total Month"
                                        value={totmonth}
                                        name="totmonth"
                                        disabled={true}
                                    />
                                </Box>
                                <Box sx={{ width: '20%', pt: 0.5, pl: 0.5 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Gross Salary
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: '30%', }}>
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="Gross Salary"
                                        changeTextValue={(e) => updateEmployeeExpFormData(e)}
                                        value={gross_salary}
                                        name="gross_salary"
                                    />
                                </Box>
                            </Box>
                        </Box>
                        {/* third row end */}
                    </Paper>
                    <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                        {/* <ExperienceAgGridtable update={count} getTableData={getTableData} /> */}
                        <CommonAgGrid
                            columnDefs={columnDef}
                            tableData={data}
                            sx={{
                                height: 600,
                                width: "100%"
                            }}
                            rowHeight={30}
                            headerHeight={30} />
                    </Paper>
                </Paper>
                <Paper square sx={{ backgroundColor: "#F8F8F8", display: "flex", flexDirection: "row" }}>
                    <Box sx={{ flex: 0, p: 0.3 }} >
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

export default memo(ExperienceDetails)