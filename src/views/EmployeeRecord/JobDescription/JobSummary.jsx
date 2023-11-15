import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper, } from '@mui/material'
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import IconButton from '@mui/joy/IconButton';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import TextInput from 'src/views/Component/TextInput';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import BranchSelect from './Jobdesccomponent/BranchSelect';
// import WorkingHours from './Jobdesccomponent/WorkingHours';
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import { ToastContainer } from 'react-toastify';
import { getJobid } from 'src/views/Constant/Constant';
import { memo } from 'react';

const JobSummary = ({ jobedit, deptsectName, jobview, selectDesignationName, selectedDeptName, selectDesignation, selectedDept, selectDeptSection }) => {

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
    //useState for getting  reporting dept section
    //const [reporting, setreporting] = useState(0)
    //useState for getting  reporting Designation
    //const [reportDesig, setreportDesig] = useState(0)
    //useState for getting working hours
    // const [workingHours, setWorkinhHours] = useState(0)
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
        }
        else {
            setFormData(defaultState)
        }

    }, [jobedit, defaultState])


    useEffect(() => {
        if (selectDesignation !== 0) {
            setFormData(defaultState)
        }
    }, [selectDesignation, defaultState])

    //function for getting from Data
    const updatejob_description = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...FormData, [e.target.name]: value })
    }
    //post data
    const postData = {
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
    //post data for edit
    const postDataEdit = {
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

    //saving job summary
    const sumbitJobSummary = async (e) => {
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
    }

    return (
        <Fragment>
            <ToastContainer />
            {/* Job Summary Description */}
            <Box sx={{ p: 1, display: "flex" }} >
                <CssVarsProvider>
                    <Typography
                        startDecorator={<DragIndicatorOutlinedIcon color='success' />}
                        level="body2"
                        sx={{ flex: 2 }}
                    >
                        Job Summary
                    </Typography>
                </CssVarsProvider>
                <Box sx={{ flex: 0 }} >
                    <CssVarsProvider>
                        <IconButton variant="outlined" size='sm' onClick={sumbitJobSummary} sx={{ color: 'green' }}>
                            <LibraryAddCheckOutlinedIcon />
                        </IconButton>
                    </CssVarsProvider>
                </Box>
            </Box>

            {/* Job Summary Box */}
            <Paper square elevation={3} sx={{ p: 1, display: "flex", flexDirection: "column" }} >
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
                        <TextInput
                            style={{ width: "100%", paddingLeft: 13 }}
                            name="objective"
                            value={objective}
                            changeTextValue={(e) => updatejob_description(e)}
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
                        <TextInput
                            style={{ width: "100%", paddingLeft: 13 }}
                            name="scope"
                            value={scope}
                            changeTextValue={(e) => updatejob_description(e)}
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
                        <TextInput
                            style={{ width: "100%", paddingLeft: 13 }}
                            Placeholder="Auto Select Department From Top Menu"
                            value={jobview === 1 || jobedit > 0 ? selectedDeptName : ''}
                            disabled={true}
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
                        <TextInput
                            style={{ width: "100%", paddingLeft: 13 }}
                            Placeholder="Auto Select Department From Top Menu"
                            value={jobview === 1 || jobedit > 0 ? deptsectName : ''}
                            disabled={true}
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
                        <TextInput
                            style={{ width: "100%", paddingLeft: 13 }}
                            Placeholder="Auto Select Designation From Top Menu"
                            value={jobview === 1 || jobedit > 0 ? selectDesignationName : ''}
                            disabled={true}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%", }} >
                    <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center", height: 30 }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography level="body1">Location /Work Place</Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 2 }} >
                        <BranchSelect label={"Select Work Place"} value={workPlace} setValue={setWorkPlace} />
                    </Box>
                </Box>

                <Box sx={{ display: "flex", width: "100%", }} >
                    <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center", height: 30 }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography level="body1">Reporting</Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 2, }} >
                        <TextInput
                            style={{ width: "100%", paddingLeft: 13 }}
                            //Placeholder="Description"
                            name="reporting"
                            value={reporting}
                            changeTextValue={(e) => updatejob_description(e)}
                        />
                    </Box>

                    {/* <Box sx={{ flex: 2 }} >
                        <DeptSection label="Department Section" value={reporting} setValue={setreporting} />
                    </Box>
                    <Box sx={{ flex: 2 }} >
                        <DesignationSelect label="Designation" value={reportDesig} setValue={setreportDesig} />
                    </Box> */}
                </Box>
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center" }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography level="body1" >Equipment To Be Used</Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 2, }} >
                        <TextInput
                            style={{ width: "100%", paddingLeft: 13 }}
                            //Placeholder="Description"
                            name="equipment"
                            value={equipment}
                            changeTextValue={(e) => updatejob_description(e)}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: "flex", width: "100%", }} >
                    <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center", height: 30 }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography level="body1"> Working Hours</Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 2 }} >
                        {/* <SelectMult label="Select Location / Work Place" workingHours,setWorkinhHours/> */}
                        {/* <WorkingHours label="Working Hours" value={workingHours} setValue={setWorkinhHours} /> */}
                        <TextInput
                            style={{ width: "100%", paddingLeft: 13 }}
                            name="workingHours"
                            value={workingHours}
                            changeTextValue={(e) => updatejob_description(e)}
                        />

                    </Box>
                </Box>
            </Paper>
        </Fragment>
    )
}

export default memo(JobSummary) 