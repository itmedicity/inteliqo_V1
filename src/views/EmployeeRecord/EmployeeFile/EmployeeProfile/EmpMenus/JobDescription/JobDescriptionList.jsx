import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, CircularProgress, Paper } from '@mui/material'
import React, { Fragment, Suspense, useMemo, } from 'react'
//import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect';
//import IconButton from '@mui/joy/IconButton';
//import CloseIcon from '@mui/icons-material/Close';
//import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
//import ViewCompactAltOutlinedIcon from '@mui/icons-material/ViewCompactAltOutlined';
//import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
//import DesignationMast from 'src/views/CommonCode/DesignationMast';
//import { PayrolMasterContext } from 'src/Context/MasterContext';
//import { infoNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { useSelector } from 'react-redux';
//import TextInput from 'src/views/Component/TextInput';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setPersonalData } from 'src/redux/actions/Profile.action';
//import { useHistory } from 'react-router-dom';
import { axioslogin } from 'src/views/Axios/Axios';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';
import { useHistory } from 'react-router-dom';
import { setJobSummary } from 'src/redux/actions/JobDescription.Action';
import { setJobDuties } from 'src/redux/actions/JobDuties.Action';
import { setJobPerformance } from 'src/redux/actions/JobPerformance.Action';
import { setJobCompetency } from 'src/redux/actions/JobCompetency.Action';
import { setJobQualification } from 'src/redux/actions/JobQualifi.Action';
import { setJobGeneric } from 'src/redux/actions/JobGeneric.Action';

const JobSummary = React.lazy(() => import('src/views/EmployeeRecord/EmployeeFile/JobDescEmpComponent/JobSummaryEmp'));
const DutyRespos = React.lazy(() => import('src/views/EmployeeRecord/EmployeeFile/JobDescEmpComponent/DutiesEmp'));
// const Performance = React.lazy(() => import('./JobDescEmpComponent/Jobperformance'));
const Generic = React.lazy(() => import('src/views/EmployeeRecord/EmployeeFile/JobDescEmpComponent/JobGenericEmp'));
const Performance = React.lazy(() => import('src/views/EmployeeRecord/EmployeeFile/JobDescEmpComponent/Jobperformance'));
const Competency = React.lazy(() => import('src/views/EmployeeRecord/EmployeeFile/JobDescEmpComponent/JobCompetency'))

const Progress = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }} >
            <CircularProgress color="secondary" size={30} />
        </Box>)
};

const JobDescriptionList = ({ dept_id, designation, flag, sect_id, deptname, desgname }) => {

    const [jobdescview, setJobdescView] = useState(0)
    const [tableview, settableview] = useState(0)
    const history = useHistory()
    const dispatch = useDispatch();
    const [summary, setSummary] = useState({
        objective: '',
        scope: '',
        branch_name: '',
        working_hour: '',
        reporting_dept: '',
        equipment_used: '',
        desig: '',
        dept: ''
    })
    const { objective, scope, branch_name, working_hour, reporting_dept, equipment_used, desig, dept } = summary

    const [generic, setGeneric] = useState({
        experience_year: '',
        age_from: '',
        age_to: '',
        is_female: '',
        is_male: ''
    })
    const { experience_year, is_female, is_male, age_from, age_to } = generic
    const [qualification, setQualification] = useState(0)

    // useEffect(() => {
    //     dispatch(setPersonalData(no))
    // }, [no, dispatch])
    const getempData = useSelector((state) => {
        return state.getPrifileDateEachEmp.empPersonalData.personalData
    })

    //useMemo for data coming from job description table
    const checkData1 = useMemo(() => {
        return {
            designation: designation,
            dept_id: dept_id,
            sect_id: sect_id
        }
    }, [designation, dept_id, sect_id])

    // const checkData2 = useMemo(() => {
    //     return {
    //         designation: getempData.em_designation,
    //         dept_id: getempData.em_department,
    //         sect_id: getempData.em_dept_section
    //     }
    // },[])

    // useEffect(() => {
    //     const checkJobDesc = async (checkData2) => {
    //         const result = await axioslogin.post('/jobsummary/check', checkData2)
    //         const { success } = result.data
    //         if (success === 1) {
    //             setJobdescView(1)
    //         }
    //         else {
    //             setJobdescView(0)
    //         }
    //     }
    //     // const checkJobDescTableView = async (checkData1) => {
    //     //     const result = await axioslogin.post('/jobsummary/check', checkData1)
    //     //     const { success } = result.data
    //     //     if (success === 1) {
    //     //         settableview(1)
    //     //     }
    //     //     else {
    //     //         settableview(0)
    //     //     }
    //     // }
    //     // if (flag === 1) {
    //     //     //checkJobDescTableView(checkData1)
    //     // }
    //     // else {
    //     checkJobDesc(checkData2)
    //     // }

    // }, [getempData.em_designation, getempData.em_department, getempData.em_dept_section, flag, dept_id, designation, checkData1, checkData2])

    useEffect(() => {
        dispatch(setJobSummary(checkData1))
        dispatch(setJobDuties(checkData1))
        dispatch(setJobPerformance(checkData1))
        dispatch(setJobCompetency(checkData1))
        dispatch(setJobQualification(checkData1))
        dispatch(setJobGeneric(checkData1))
        return () => {
            dispatch(setJobSummary())
            dispatch(setJobDuties())
            dispatch(setJobPerformance())
            dispatch(setJobCompetency())
            dispatch(setJobQualification())
            dispatch(setJobGeneric())
        }
    }, [dispatch])

    const state = useSelector((state) => {
        return {
            jobSummary: state.getJobSummary.jobSummaryList || 0,
            jobDuties: state.getJobDuties.jobDutiesList || 0,
            jobPerformance: state.getJobPerformance.jobPerformanceList || 0,
            jobCompetency: state.getJobCompetency.jobCompetencyList || 0,
            jobQualification: state.getJobQualification.jobQualificationList || 0,
            jobGeneric: state.getJobGenric.jobGenericList || 0
        }
    })

    const { jobSummary, jobDuties, jobPerformance, jobCompetency, jobQualification, jobGeneric } = state

    useEffect(() => {
        if (jobSummary.length !== 0 && jobGeneric.length !== 0) {
            const { objective, scope, branch_name, working_hour, reporting_dept, equipment_used, desig, dept } = jobSummary[0];
            const summary = {
                objective: objective === null ? 'Not Updated' : objective,
                scope: scope === null ? 'Not Updated' : scope,
                branch_name: branch_name === null ? 'Not Updated' : branch_name,
                working_hour: working_hour === null ? 'Not Updated' : working_hour.slice(1, -1),
                reporting_dept: reporting_dept === null ? 'Not updated' : reporting_dept,
                equipment_used: equipment_used === null ? 'Not updated' : equipment_used,
                desig: desig === null ? 'Not Updated' : desig,
                dept: dept === null ? 'Not Updated' : dept
            }
            setSummary(summary)
            const { experience_year, is_female, is_male, age_from, age_to } = jobGeneric[0]
            const generic = {
                experience_year: experience_year === 0 ? 'Not Updated' : experience_year,
                is_female: is_female === 0 ? 0 : is_female,
                is_male: is_male === 0 ? 0 : is_male,
                age_from: age_from === 0 ? 0 : age_from,
                age_to: age_to === 0 ? 0 : age_to,
            }
            setGeneric(generic)
        }
    }, [jobSummary, jobGeneric])

    useEffect(() => {
        if (jobQualification.length !== 0) {
            setQualification(jobQualification)
        }
        return () => {
            setQualification()
        }

    }, [jobQualification])

    const ViewPage = async () => {
        history.push(`/Home/JobDescription`)
    }

    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{
                width: "100%",
                //height: { xxl: 900, xl: 680, lg: 523, md: 270, sm: 270, xs: 270 },
                overflow: 'auto',
                '::-webkit-scrollbar': { display: "none" },
            }} >
                {/* Main Heading Section Box */}

                <Paper square variant="outlined" sx={{ p: 0.5, display: "flex", flexDirection: "row", }}   >
                    <Box sx={{ flex: 1, textAlign: 'center', fontWeight: 600, pt: 0.5 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                JOB DESCRIPTION - {flag === 1 ? desgname : getempData.desg_name}
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    {/* Close icon for return to Job Description Page  */}
                    {
                        flag === 1 ? <Box sx={{}}>
                            <CssVarsProvider>
                                <IconButton variant="outlined" size='sm' color="danger" onClick={ViewPage}>
                                    <CloseIcon color='info' />
                                </IconButton>
                            </CssVarsProvider>
                        </Box> : null
                    }
                </Paper>

                <Box sx={{ p: 1, display: "flex", fontWeight: 500 }} >
                    <CssVarsProvider>
                        <Typography textColor="text.secondary">
                            Job Summary
                        </Typography>
                    </CssVarsProvider>
                </Box>
                {/* Objectives */}
                <Box sx={{ display: "flex", flexDirection: "row", px: 1, }}>
                    <Box border={1} sx={{ p: 1, display: "flex", fontWeight: 500, width: "25%", height: 'auto' }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                Objectives
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "75%", height: 'auto' }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                {objective}
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>
                {/* Scope */}
                <Box sx={{ display: "flex", flexDirection: "row", px: 1 }}>
                    <Box borderRight={1} borderBottom={1} borderLeft={1} sx={{ p: 1, display: "flex", fontWeight: 500, width: "25%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                Scope
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "75%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                {scope}
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>
                {/* Designation */}
                <Box sx={{ display: "flex", flexDirection: "row", px: 1 }}>
                    <Box borderRight={1} borderBottom={1} borderLeft={1} sx={{ p: 1, display: "flex", fontWeight: 500, width: "25%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                Designation
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "75%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                {desig}
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>
                {/* Department */}
                <Box sx={{ display: "flex", flexDirection: "row", px: 1 }}>
                    <Box borderRight={1} borderBottom={1} borderLeft={1} sx={{ p: 1, display: "flex", fontWeight: 500, width: "25%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                Department
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "75%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                {dept}
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>
                {/* Location/WorkPlace */}
                <Box sx={{ display: "flex", flexDirection: "row", px: 1 }}>
                    <Box borderRight={1} borderBottom={1} borderLeft={1} sx={{ p: 1, display: "flex", fontWeight: 500, width: "25%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                Location/WorkPlace
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "75%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                {branch_name}
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>
                {/* Working Hours */}
                <Box sx={{ display: "flex", flexDirection: "row", px: 1 }}>
                    <Box borderRight={1} borderBottom={1} borderLeft={1} sx={{ p: 1, display: "flex", fontWeight: 500, width: "25%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                Working Hours
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "75%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                {working_hour}
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>
                {/* Reporting */}
                <Box sx={{ display: "flex", flexDirection: "row", px: 1 }}>
                    <Box borderRight={1} borderBottom={1} borderLeft={1} sx={{ p: 1, display: "flex", fontWeight: 500, width: "25%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                Reporting
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "75%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                {reporting_dept}
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>
                {/* Equipments to be used */}
                <Box sx={{ display: "flex", flexDirection: "row", px: 1 }}>
                    <Box borderRight={1} borderBottom={1} borderLeft={1} sx={{ p: 1, display: "flex", fontWeight: 500, width: "25%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                Equipments to be used
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "75%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                {equipment_used}
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>

                {/* Duties & Responsibilties */}
                <Box sx={{ p: 1, display: "flex", fontWeight: 500 }} >
                    <CssVarsProvider>
                        <Typography textColor="text.secondary">
                            Duties & Responsibilties
                        </Typography>
                    </CssVarsProvider>
                </Box>

                {/* <Box sx={{ display: "flex", flexDirection: "row", px: 1, }}>
                    <Box border={1} sx={{ p: 1, display: "flex", justifyContent: "center", width: "5%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                Slno
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", justifyContent: "center", width: "95%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                Duties
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                </Box> */}
                {
                    jobDuties.map((val) => {
                        return <Box sx={{ display: "flex", flexDirection: "row", px: 1, }}
                            key={val.duties_slno}>
                            <Box sx={{ p: 1, display: "flex", justifyContent: "center", width: "5%", height: 'auto' }} >
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary">
                                        {val.slno}
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ p: 1, display: "flex", width: "95%", height: 'auto' }} >
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary">
                                        {val.duties_and_resp}
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                    })
                }

                {/* Job Specification : Performance  */}
                < Box sx={{ p: 1, display: "flex", fontWeight: 500 }} >
                    <CssVarsProvider>
                        <Typography textColor="text.secondary">
                            Job Specification : Performance
                        </Typography>
                    </CssVarsProvider>
                </Box >
                {/* Performance Heading */}
                <Box sx={{ display: "flex", flexDirection: "row", px: 1, }}>
                    <Box border={1} sx={{ p: 1, display: "flex", justifyContent: "center", width: "5%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                Slno
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", justifyContent: "center", width: "25%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                Key Result Areas
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", justifyContent: "center", width: "60%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                Key Performance Indicators
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", justifyContent: "center", width: "10%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                KPI Score
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>

                {
                    jobPerformance.map((val) => {
                        return <Box sx={{ display: "flex", flexDirection: "row", px: 1, }}
                            key={val.specification_slno}>
                            <Box borderRight={1} borderBottom={1} borderLeft={1} sx={{ p: 1, display: "flex", width: "5%", height: 'auto' }} >
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary">
                                        {val.slno}
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "25%", height: 'auto' }} >
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary">
                                        {val.kra_desc}
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "60%", height: 'auto' }} >
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary">
                                        {val.kpi}
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "10%", height: 'auto', justifyContent: 'center' }} >
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary">
                                        {val.kpi_score}
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                    })
                }

                {/* Job Specification : Competency */}

                <Box sx={{ p: 1, display: "flex", fontWeight: 500 }} >
                    <CssVarsProvider>
                        <Typography textColor="text.secondary">
                            Job Specification : Competency
                        </Typography>
                    </CssVarsProvider>
                </Box>
                {/* Competency Heading */}
                <Box sx={{ display: "flex", flexDirection: "row", px: 1, }}>
                    <Box border={1} sx={{ p: 1, display: "flex", justifyContent: "center", width: "5%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                Slno
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", justifyContent: "center", width: "25%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                Key Result Areas
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", justifyContent: "center", width: "70%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                Competency
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>
                {
                    jobCompetency.map((val) => {
                        return <Box sx={{ display: "flex", flexDirection: "row", px: 1, }}
                            key={val.competency_slno}>
                            <Box borderRight={1} borderBottom={1} borderLeft={1} sx={{ p: 1, display: "flex", width: "5%", height: 'auto' }} >
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary">
                                        {val.slno}
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "25%", height: 'auto' }} >
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary">
                                        {val.kra_desc}
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "70%", height: 'auto' }} >
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary">
                                        {val.competency_desc}
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                    })
                }


                {/* Job Specification : Generic */}

                <Box sx={{ p: 1, display: "flex", fontWeight: 500 }} >
                    <CssVarsProvider>
                        <Typography textColor="text.secondary">
                            Job Specification : Generic
                        </Typography>
                    </CssVarsProvider>
                </Box>
                {/* Experience */}
                <Box sx={{ display: "flex", flexDirection: "row", px: 1, }}>
                    <Box border={1} sx={{ p: 1, display: "flex", width: "25%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                Experience
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "75%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                {experience_year} Years
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>
                {/* Qualification */}
                <Box sx={{ display: "flex", flexDirection: "row", px: 1 }}>
                    <Box borderRight={1} borderBottom={1} borderLeft={1} sx={{ p: 1, display: "flex", width: "25%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                Qualification
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "75%", height: 35 }} >
                        {
                            qualification && qualification.map((val) => {
                                return <Box sx={{ display: 'flex' }} key={val.qualification_slno}>
                                    <Box>
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary">
                                                {val.spec_desc} IN {val.cour_desc},
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                            })
                        }

                    </Box>
                </Box>
                {/* Age */}
                <Box sx={{ display: "flex", flexDirection: "row", px: 1 }}>
                    <Box borderRight={1} borderBottom={1} borderLeft={1} sx={{ p: 1, display: "flex", width: "25%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                Age
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "75%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                {age_from === 0 ? 'Not Update' : age_from} - {age_to === 0 ? 'Not update' : age_to}
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>
                {/* Gender */}
                <Box sx={{ display: "flex", flexDirection: "row", px: 1 }}>
                    <Box borderRight={1} borderBottom={1} borderLeft={1} sx={{ p: 1, display: "flex", width: "25%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                Gender
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "75%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                {is_male === 0 ? null : 'Male'} {is_female === 0 ? null : 'Female'}
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>

                {/* Job Summary */}
                {/* {
                    jobdescview > 0 ?
                        <Suspense fallback={<Progress />} >
                            <JobSummary
                                selectDesignation={getempData.em_designation}
                                selectedDept={getempData.em_department}
                                selectDesignationName={getempData.desg_name}
                                selectedDeptName={getempData.dept_name}
                                setJobdescView={setJobdescView}
                                selectDeptSection={getempData.em_dept_section}
                            />
                        </Suspense>

                        : flag === 1 ?
                            <Suspense fallback={<Progress />} >
                                <JobSummary
                                    selectDesignation={designation}
                                    selectedDept={dept_id}
                                    selectDesignationName={desgname}
                                    selectedDeptName={deptname}
                                    //setJobdescView={setJobdescView}
                                    selectDeptSection={sect_id}
                                />
                            </Suspense> : null
                } */}
                {/* Duties And Responsiblities */}
                {/* {
                    flag === 1 ?
                        <Suspense fallback={<Progress />} >
                            <DutyRespos
                                selectDesignation={designation}
                                selectedDept={dept_id}
                            />
                        </Suspense> :
                        <Suspense fallback={<Progress />} >
                            <DutyRespos
                                selectDesignation={getempData.em_designation}
                                selectedDept={getempData.em_department}
                            />
                        </Suspense>
                } */}

                {/* Job Specification : Performance  */}
                {/* {
                    flag === 1 ?
                        <Suspense fallback={<Progress />} >
                            <Performance
                                selectDesignation={designation}
                                selectedDept={dept_id}
                            />
                        </Suspense> :
                        <Suspense fallback={<Progress />} >
                            <Performance
                                selectDesignation={getempData.em_designation}
                                selectedDept={getempData.em_department}
                            />
                        </Suspense>
                } */}

                {/* Job Specification : Competency */}
                {/* {

                    flag === 1 ?
                        <Suspense fallback={<Progress />} >
                            <Competency
                                selectDesignation={designation}
                                selectedDept={dept_id}
                            />
                        </Suspense>
                        : <Suspense fallback={<Progress />} >
                            <Competency
                                selectDesignation={getempData.em_designation}
                                selectedDept={getempData.em_department}
                            />
                        </Suspense>
                } */}

                {/* Generic */}
                {/* {
                    flag === 1 ?
                        <Suspense fallback={<Progress />} >
                            <Generic
                                selectDesignation={designation}
                                selectedDept={dept_id}
                            />
                        </Suspense>
                        : <Suspense fallback={<Progress />} >
                            <Generic
                                selectDesignation={getempData.em_designation}
                                selectedDept={getempData.em_department}
                            />
                        </Suspense>
                } */}

            </Box >
        </Fragment >
    )
}

export default JobDescriptionList