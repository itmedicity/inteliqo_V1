import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper, } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import IconButton from '@mui/joy/IconButton';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import TextInput from 'src/views/Component/TextInput';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import BranchSelect from './Jobdesccomponent/BranchSelect';
import DeptSection from './Jobdesccomponent/DeptSection';
import DesignationSelect from './Jobdesccomponent/DesignationSelect';
import WorkingHours from './Jobdesccomponent/WorkingHours';
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import { ToastContainer } from 'react-toastify';
import { getJobid } from 'src/views/Constant/Constant';

const JobSummary = ({ jobview, selectDesignationName, selectedDeptName, selectDesignation, selectedDept }) => {
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
    const [reporting, setreporting] = useState(0)
    //useState for getting  reporting Designation
    const [reportDesig, setreportDesig] = useState(0)
    //useState for getting working hours
    const [workingHours, setWorkinhHours] = useState([])
    //use State for getting formdata
    const [FormData, setFormData] = useState({
        objective: '',
        scope: '',
        equipment: ''
    })
    //de structuring
    const { objective, scope, equipment } = FormData
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
        reporting_designation: reportDesig,
        equipment_used: equipment
    }
    //saving job summary
    const sumbitJobSummary = async (e) => {
        e.preventDefault();
        if (jobview === 0) {
            infoNofity("Please Select Department And Designation")
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
                errorNofity("Error Occureed!!Please Contact EDp")
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
                    <IconButton variant="outlined" size='sm' onClick={sumbitJobSummary} >
                        <LibraryAddCheckOutlinedIcon />
                    </IconButton>
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
                            <Typography level="body1">Designation</Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 2, }} >
                        <TextInput
                            style={{ width: "100%", paddingLeft: 13 }}
                            Placeholder="Auto Select Designation From Top Menu"
                            value={jobview === 1 ? selectedDeptName : ''}
                            disabled={true}
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
                            Placeholder="Auto Select Designation From Top Menu"
                            value={jobview === 1 ? selectDesignationName : ''}
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
                            <Typography level="body1"> Working Hours</Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 2 }} >
                        {/* <SelectMult label="Select Location / Work Place" workingHours,setWorkinhHours/> */}
                        <WorkingHours label="Working Hours" value={workingHours} setValue={setWorkinhHours} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%", }} >
                    <Paper square sx={{ display: "flex", flex: 2, px: 0.5, justifyContent: "center", height: 30 }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography level="body1">Reporting</Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 2 }} >
                        <DeptSection label="Department Section" value={reporting} setValue={setreporting} />
                    </Box>
                    <Box sx={{ flex: 2 }} >
                        <DesignationSelect label="Designation" value={reportDesig} setValue={setreportDesig} />
                    </Box>
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
                            Placeholder="Description"
                            name="equipment"
                            value={equipment}
                            changeTextValue={(e) => updatejob_description(e)}
                        />
                    </Box>
                </Box>
            </Paper>
        </Fragment>
    )
}

export default JobSummary