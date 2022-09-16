import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper, } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import TextInput from 'src/views/Component/TextInput';
import { axioslogin } from 'src/views/Axios/Axios';
import { ToastContainer } from 'react-toastify';
import { memo } from 'react';


const JobSummaryEmp = ({ selectDesignationName, selectedDeptName, selectDesignation, selectedDept, setJobdescView }) => {
    const [formData, setFormData] = useState({
        objective: '',
        report_dept: '',
        reportingdesignation: '',
        scope: '',
        equipment_used: '',
        workplace: ''
    })
    const { objective, report_dept, reportingdesignation, scope, equipment_used, workplace } = formData
    useEffect(() => {
        if (selectedDept !== 0 && selectDesignation !== 0) {
            const getJobSummaryEmp = async () => {
                const postData = {
                    dept_id: selectedDept,
                    designation: selectDesignation
                }
                const result = await axioslogin.post('/jobsummary/getjobsummary', postData)
                const { success, data } = result.data
                if (success === 1) {
                    const { equipment_used, objective, report_dept, reportingdesignation, scope, branch_name } = data[0]
                    const frmData = {
                        objective: objective,
                        report_dept: report_dept,
                        reportingdesignation: reportingdesignation,
                        scope: scope,
                        equipment_used: equipment_used,
                        workplace: branch_name
                    }
                    setFormData(frmData)
                }
            }
            getJobSummaryEmp()
        }
    }, [selectedDept, selectDesignation])
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
                            disabled={true}
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
                            value={selectDesignationName}
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
                            disabled={true}
                            value={selectedDeptName}
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
                        <TextInput
                            style={{ width: "100%", paddingLeft: 13 }}
                            Placeholder="Work Place"
                            disabled={true}
                            value={workplace}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%", }} >
                    <Paper square sx={{ display: "flex", flex: 2, px: 0.5, justifyContent: "center", height: 30 }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography level="body1">Reporting</Typography>
                        </CssVarsProvider>
                    </Paper>
                    <Box sx={{ flex: 2 }} >
                        <TextInput
                            style={{ width: "100%", paddingLeft: 13 }}
                            Placeholder="Work Place"
                            disabled={true}
                            value={report_dept}
                        />
                    </Box>
                    <Box sx={{ flex: 2 }} >
                        <TextInput
                            style={{ width: "100%", paddingLeft: 13 }}
                            Placeholder="Work Place"
                            disabled={true}
                            value={reportingdesignation}
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
                        <TextInput
                            style={{ width: "100%", paddingLeft: 13 }}
                            Placeholder="Description"
                            name="equipment"
                            value={equipment_used}
                            disabled={true}

                        />
                    </Box>
                </Box>
            </Paper>
        </Fragment>
    )
}

export default memo(JobSummaryEmp) 