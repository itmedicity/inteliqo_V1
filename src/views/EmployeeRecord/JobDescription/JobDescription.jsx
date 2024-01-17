import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, CircularProgress, Paper, Tooltip } from '@mui/material'
import React, { Suspense, memo, useCallback, useEffect, useMemo } from 'react'
import IconButton from '@mui/joy/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import Competency from './Competency';
import { axioslogin } from 'src/views/Axios/Axios';
import { useDispatch } from 'react-redux';
import { setDepartment } from 'src/redux/actions/Department.action';
import SummarizeIcon from '@mui/icons-material/Summarize';
import JoyDeptWithName from 'src/views/MuiComponents/JoyComponent/JoyDeptWithName';
import JoyDeptSectWithName from 'src/views/MuiComponents/JoyComponent/JoyDeptSectWithName';
import JoyDesgWithName from 'src/views/MuiComponents/JoyComponent/JoyDesgWithName';

const JobSummary = React.lazy(() => import('./JobSummary'));
// const DutyRespos = React.lazy(() => import('./DutyRespos'));
const DutyRespos = React.lazy(() => import('./DutyResponsWithAgGrid'));
//const Performance = React.lazy(() => import('./Performance'));
const Performance = React.lazy(() => import('./PerformanceWithAgGrid'))
const Competency = React.lazy(() => import('./CompetencyWithAgGrid'))
const Generic = React.lazy(() => import('./Generic'));
const Skill = React.lazy(() => import('./SkillsWithAgGrid'))

const Progress = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }} >
            <CircularProgress color="secondary" size={30} />
        </Box>)
};

const JobDescription = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])

    const [dept, setDept] = useState(0)
    const [deptSect, setDeptSect] = useState(0)
    const [desg, setDesg] = useState(0)
    const [deptName, setDeptName] = useState('')
    const [sectName, setSectName] = useState('')
    const [desgName, setDesgName] = useState('')
    const [jobview, setjobview] = useState(0)//use sate job description view
    const [jobedit, setjobEdit] = useState(0)


    const Redirect = useCallback(async () => {
        history.push(`/Home`)
    }, [history])

    /** checkdata for checking department , dept section and designation */
    const checkData = useMemo(() => {
        return {
            designation: desg,
            dept_id: dept,
            sect_id: deptSect
        }
    }, [desg, dept, deptSect])
    /** checking department , dept section and designation already exist in jobsummary database table */
    const addtojobSummary = useCallback(async () => {
        if (desg !== 0 && dept !== 0 && deptSect !== 0) {
            const result = await axioslogin.post('/jobsummary/check', checkData)
            const { data, success } = result.data
            if (success === 1) {
                const { summary_slno } = data[0]
                infoNofity("Job Description Already Added for This Designation and Department")
                setjobEdit(summary_slno)
            }
            else {
                setjobview(1)
                setjobEdit(0)
            }
        } else {
            infoNofity("Choose All Option")
        }

    }, [desg, dept, deptSect, checkData])

    const ViewPage = useCallback(async () => {
        history.push(`/Home/JobDescriptionViewTable`)
    }, [history])

    return (
        <Box sx={{ display: "flex", flexGrow: 1, width: "100%" }} >
            <ToastContainer />
            <Paper sx={{ display: 'flex', flex: 1, height: window.innerHeight - 85, flexDirection: 'column', }}>
                <Box sx={{ width: "100%", overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }}>
                    <Paper square elevation={1} sx={{ display: "flex", alignItems: "center", }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Job Description
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Tooltip title="Job Description View" followCursor placement='top' arrow >
                            <Box sx={{ pl: 0.5, mt: 0.5 }}>
                                <CssVarsProvider>
                                    <IconButton variant="outlined" size='xs' color="primary" onClick={ViewPage}>
                                        <SummarizeIcon />
                                    </IconButton>
                                </CssVarsProvider>
                            </Box>
                        </Tooltip>
                        <Box sx={{ pl: 0.5, mt: 0.5 }}>
                            <CssVarsProvider>
                                <IconButton variant="outlined" size='xs' color="danger" onClick={Redirect}>
                                    <CloseIcon />
                                </IconButton>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                    {/* Depertment Selection Box */}
                    <Paper square variant='outlined' sx={{
                        p: 0.5,
                        mt: 0.5,
                        display: 'flex',
                        alignItems: "center",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                        // backgroundColor: "lightcyan"
                    }} >
                        <Box sx={{ flex: 1, px: 0.5 }} >
                            <JoyDeptWithName deptValue={dept} getDept={setDept} setDeptName={setDeptName} />
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5 }} >
                            <JoyDeptSectWithName sectValues={deptSect} getSection={setDeptSect} setSectName={setSectName} />
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5 }}  >
                            <JoyDesgWithName desgValue={desg} getDesg={setDesg} setDesgName={setDesgName} />
                        </Box>
                        <Box sx={{ flex: 0, px: 0.5 }} >
                            <IconButton variant="outlined" size='sm' onClick={addtojobSummary} sx={{ color: 'green' }}>
                                <AddToPhotosIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                    {/* Job Summary */}
                    <Suspense fallback={<Progress />} >
                        <JobSummary
                            jobview={jobview}
                            jobedit={jobedit}
                            selectedDept={dept}
                            selectDeptSection={deptSect}
                            selectDesignation={desg}
                            selectedDeptName={deptName}
                            deptsectName={sectName}
                            selectDesignationName={desgName}
                        />
                    </Suspense>
                    {/* Dutieds And Responsibilities */}
                    <Suspense fallback={<Progress />} >
                        <DutyRespos
                            selectDesignation={desg}
                            selectedDept={dept}
                            jobedit={jobedit}
                            selectDeptSection={deptSect}
                            setjobEdit={setjobEdit}
                        />

                    </Suspense>
                    {/* Skills */}
                    <Suspense fallback={<Progress />} >
                        <Skill
                            selectedDept={dept}
                            selectDeptSection={deptSect}
                            selectDesignation={desg}
                            jobedit={jobedit}

                        />
                    </Suspense>
                    {/* Job Specification : Performance */}
                    <Suspense fallback={<Progress />} >
                        <Performance
                            selectedDept={dept}
                            selectDeptSection={deptSect}
                            selectDesignation={desg}
                            jobedit={jobedit}
                        />
                    </Suspense>
                    <Suspense fallback={<Progress />} >
                        <Competency
                            selectedDept={dept}
                            selectDeptSection={deptSect}
                            selectDesignation={desg}
                            jobedit={jobedit}
                        />
                    </Suspense>
                    {/* Generic */}
                    <Suspense fallback={<Progress />} >
                        <Generic
                            selectedDept={dept}
                            selectDeptSection={deptSect}
                            selectDesignation={desg}
                            jobedit={jobedit}
                        />
                    </Suspense>
                </Box>
            </Paper >
        </Box>
    )
}

export default memo(JobDescription)