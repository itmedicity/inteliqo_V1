import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper, } from '@mui/material'
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import IconButton from '@mui/joy/IconButton';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
// import WorkingHours from './Jobdesccomponent/WorkingHours';
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import { ToastContainer } from 'react-toastify';
import { getJobid } from 'src/views/Constant/Constant';
import { memo } from 'react';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import JoyBranchSelect from 'src/views/MuiComponents/JoyComponent/JoyBranchSelect'

const JobSummary = ({ jobedit, deptsectName, jobview, selectDesignationName,
    selectedDeptName, selectDesignation, selectedDept, selectDeptSection }) => {

    const [jobid, setJobid] = useState(0)
    //get job id
    useEffect(() => {
        getJobid().then((val) => {
            const jobid = val;
            setJobid(jobid)
        })
    }, [])

    //useState for Getting work place
    const [workPlace, setWorkPlace] = useState(0)
    //use State for getting formdata
    const [FormData, setFormData] = useState({
        objective: '',
        scope: '',
        equipment: '',
        workingHours: '',
        reporting: ''
    })
    //destructuring
    const { objective, scope, equipment, workingHours, reporting } = FormData

    const defaultState = useMemo(() => {
        return {
            objective: '',
            scope: '',
            equipment: '',
            workingHours: '',
            reporting: ''
        }
    }, [])

    //use effect for getting job summary details to edit
    useEffect(() => {
        if (jobedit > 0) {
            const getjobSummary = async () => {
                const result = await axioslogin.get(`/jobsummary/getjobSummary/${jobedit}`)
                const { success, data } = result.data
                if (success === 1) {
                    const { equipment_used, objective, reporting_dept,
                        scope, work_place, working_hour } = data[0]
                    const frmdata = {
                        objective: objective,
                        scope: scope,
                        equipment: equipment_used,
                        workingHours: working_hour.slice(1, -1),
                        reporting: reporting_dept
                    }
                    setFormData(frmdata)
                    //setWorkinhHours([working_hour])
                    setWorkPlace(work_place)
                    //setreporting(reporting_dept)
                    //setreportDesig(reporting_designation)
                }
            }
            getjobSummary()
        } else {
            setFormData(defaultState)
        }

    }, [jobedit, defaultState])


    useEffect(() => {
        if (selectDesignation !== 0) {
            setFormData(defaultState)
        }
    }, [selectDesignation, defaultState])

    //function for getting from Data
    const updatejob_description = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...FormData, [e.target.name]: value })
    }, [FormData])

    //post data
    const postData = useMemo(() => {
        return {
            summary_slno: jobid,
            dept_id: selectedDept,
            designation: selectDesignation,
            objective: objective,
            scope: scope,
            work_place: workPlace,
            working_hour: workingHours,
            reporting_dept: reporting,
            //reporting_designation: reportDesig,
            equipment_used: equipment,
            sect_id: selectDeptSection
        }
    }, [jobid, selectedDept, selectDesignation, objective, scope, workPlace, workingHours,
        reporting, equipment, selectDeptSection])
    //post data for edit
    const postDataEdit = useMemo(() => {
        return {
            summary_slno: jobedit,
            dept_id: selectedDept,
            designation: selectDesignation,
            objective: objective,
            scope: scope,
            work_place: workPlace,
            working_hour: workingHours,
            reporting_dept: reporting,
            //reporting_designation: reportDesig,
            equipment_used: equipment,
            sect_id: selectDeptSection
        }
    }, [jobedit, selectedDept, selectDesignation, objective, scope, workPlace, workingHours,
        reporting, equipment, selectDeptSection])

    //saving job summary
    const sumbitJobSummary = useCallback(async (e) => {
        e.preventDefault();
        if (jobview === 0 && jobedit === 0) {
            infoNofity("Please Select Department And Designation")
        }
        else if (jobedit > 0) {
            const result = await axioslogin.patch('/jobsummary/updatejobsummary', postDataEdit)
            const { success, message } = result.data
            if (success === 2) {
                succesNofity(message)
            }
            else {
                errorNofity(message)
            }
        }
        else {
            const result = await axioslogin.post('/jobsummary', postData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
            }
            else if (success === 7) {
                warningNofity(message)
            }
            else {
                errorNofity(message)
            }
        }
    }, [jobview, jobedit, postDataEdit, postData])

    return (
        <Fragment>
            <ToastContainer />
            {/* Job Summary Description */}
            <Paper square elevation={1} sx={{ display: "flex", alignItems: "center", }}  >
                <Box sx={{ flex: 1 }} >
                    <CssVarsProvider>
                        <Typography startDecorator={<DragIndicatorOutlinedIcon />} textColor="neutral.400" sx={{ display: 'flex', }} >
                            Job Summary
                        </Typography>
                    </CssVarsProvider>
                </Box>
                <Box sx={{ flex: 0, px: 0.5 }} >
                    <IconButton variant="outlined" size='sm' onClick={sumbitJobSummary} sx={{ color: 'green' }}>
                        <LibraryAddCheckOutlinedIcon />
                    </IconButton>
                </Box>
            </Paper>
            {/* Job Summary Box */}
            <Paper square variant='outlined' sx={{ display: "flex", flexDirection: "column" }} >
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Paper square sx={{
                        display: "flex",
                        flex: 1,
                        px: 0.5,
                        justifyContent: "center"
                    }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography level="body1"> Objectives</Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 2, }} >
                        <InputComponent
                            type="text"
                            size="sm"
                            name="objective"
                            value={objective}
                            onchange={(e) => updatejob_description(e)}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center" }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography level="body1" > Scope</Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 2, }} >
                        <InputComponent
                            type="text"
                            size="sm"
                            name="scope"
                            value={scope}
                            onchange={(e) => updatejob_description(e)}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center" }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography level="body1">Department</Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 2, }} >
                        <InputComponent
                            type="text"
                            size="sm"
                            placeholder="Auto Select Department From Top Menu"
                            disabled={true}
                            value={jobview === 1 || jobedit > 0 ? selectedDeptName : ''}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center" }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography level="body1">Department Section</Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 2, }} >
                        <InputComponent
                            type="text"
                            size="sm"
                            placeholder="Auto Select Department Section From Top Menu"
                            disabled={true}
                            value={jobview === 1 || jobedit > 0 ? deptsectName : ''}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center" }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography level="body1">Designation</Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 2, }} >
                        <InputComponent
                            type="text"
                            size="sm"
                            placeholder="Auto Select Designation From Top Menu"
                            disabled={true}
                            value={jobview === 1 || jobedit > 0 ? selectDesignationName : ''}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%", }} >
                    <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center" }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography level="body1">Location /Work Place</Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 2 }} >
                        <JoyBranchSelect value={workPlace} setValue={setWorkPlace} />
                        {/* <BranchSelect label={"Select Work Place"} value={workPlace} setValue={setWorkPlace} /> */}
                    </Box>
                </Box>

                <Box sx={{ display: "flex", width: "100%", }} >
                    <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center" }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography level="body1">Reporting</Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 2, }} >
                        <InputComponent
                            type="text"
                            size="sm"
                            name="reporting"
                            value={reporting}
                            onchange={(e) => updatejob_description(e)}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center" }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography level="body1" >Equipment To Be Used</Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 2, }} >
                        <InputComponent
                            type="text"
                            size="sm"
                            name="equipment"
                            value={equipment}
                            onchange={(e) => updatejob_description(e)}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: "flex", width: "100%", }} >
                    <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center" }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography level="body1"> Working Hours</Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 2 }} >
                        <InputComponent
                            type="text"
                            size="sm"
                            name="workingHours"
                            value={workingHours}
                            onchange={(e) => updatejob_description(e)}
                        />
                    </Box>
                </Box>
            </Paper>
        </Fragment >
    )
}

export default memo(JobSummary) 