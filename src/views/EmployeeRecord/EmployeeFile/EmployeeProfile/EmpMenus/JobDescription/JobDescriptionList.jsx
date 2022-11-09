import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, CircularProgress, Paper } from '@mui/material'
import React, { Fragment, Suspense, useMemo, } from 'react'
//import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect';
//import IconButton from '@mui/joy/IconButton';
//import CloseIcon from '@mui/icons-material/Close';
//import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
//import ViewCompactAltOutlinedIcon from '@mui/icons-material/ViewCompactAltOutlined';
//import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
//import DesignationMast from 'src/views/CommonCode/DesignationMast';
//import { PayrolMasterContext } from 'src/Context/MasterContext';
//import { infoNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { useSelector } from 'react-redux';
//import TextInput from 'src/views/Component/TextInput';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
//import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';
//import { useHistory } from 'react-router-dom';
import { setJobSummary } from 'src/redux/actions/JobDescription.Action';
import { setJobDuties } from 'src/redux/actions/JobDuties.Action';
import { setJobPerformance } from 'src/redux/actions/JobPerformance.Action';
import { setJobCompetency } from 'src/redux/actions/JobCompetency.Action';
import { setJobQualification } from 'src/redux/actions/JobQualifi.Action';
import { setJobGeneric } from 'src/redux/actions/JobGeneric.Action';

// const JobSummary = React.lazy(() => import('src/views/EmployeeRecord/EmployeeFile/JobDescEmpComponent/JobSummaryEmp'));
// const DutyRespos = React.lazy(() => import('src/views/EmployeeRecord/EmployeeFile/JobDescEmpComponent/DutiesEmp'));
// // const Performance = React.lazy(() => import('./JobDescEmpComponent/Jobperformance'));
// const Generic = React.lazy(() => import('src/views/EmployeeRecord/EmployeeFile/JobDescEmpComponent/JobGenericEmp'));
// const Performance = React.lazy(() => import('src/views/EmployeeRecord/EmployeeFile/JobDescEmpComponent/Jobperformance'));
// const Competency = React.lazy(() => import('src/views/EmployeeRecord/EmployeeFile/JobDescEmpComponent/JobCompetency'))

const Progress = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }} >
            <CircularProgress color="secondary" size={30} />
        </Box>)
};

const JobDescriptionList = ({ dept_id, designation, flag, sect_id, deptname, desgname, setflag }) => {

    //const history = useHistory()
    const dispatch = useDispatch();
    const [summary, setSummary] = useState({
        objective: '',
        scope: '',
        branch_name: '',
        working_hour: '',
        reporting_dept: '',
        equipment_used: '',
        desig: '',
        dept: '',
        sect: ''
    })
    const { objective, scope, branch_name, working_hour, reporting_dept, equipment_used, desig, dept, sect } = summary

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

    //useMemo for data coming from employee profile
    const checkData2 = useMemo(() => {
        return {
            designation: getempData.em_designation,
            dept_id: getempData.em_department,
            sect_id: getempData.em_dept_section
        }
    }, [getempData.em_designation, getempData.em_department, getempData.em_dept_section])

    useEffect(() => {
        if (flag === 1) {
            //dispatch for job description view, when job description table preview click
            dispatch(setJobSummary(checkData1))
            dispatch(setJobDuties(checkData1))
            dispatch(setJobPerformance(checkData1))
            dispatch(setJobCompetency(checkData1))
            dispatch(setJobQualification(checkData1))
            dispatch(setJobGeneric(checkData1))
        }
        else {
            dispatch(setJobSummary(checkData2))
            dispatch(setJobDuties(checkData2))
            dispatch(setJobPerformance(checkData2))
            dispatch(setJobCompetency(checkData2))
            dispatch(setJobQualification(checkData2))
            dispatch(setJobGeneric(checkData2))
        }
        return () => {
            dispatch(setJobSummary())
            dispatch(setJobDuties())
            dispatch(setJobPerformance())
            dispatch(setJobCompetency())
            dispatch(setJobQualification())
            dispatch(setJobGeneric())
        }
    }, [dispatch, flag, checkData1, checkData2])

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
        if (jobSummary.length !== 0) {
            const { objective, scope, branch_name, working_hour, reporting_dept, equipment_used, desig, dept, sect } = jobSummary[0];
            const summary = {
                objective: objective === null ? 'Not Updated' : objective,
                scope: scope === null ? 'Not Updated' : scope,
                branch_name: branch_name === null ? 'Not Updated' : branch_name,
                working_hour: working_hour === null ? 'Not Updated' : working_hour.slice(1, -1),
                reporting_dept: reporting_dept === null ? 'Not updated' : reporting_dept,
                equipment_used: equipment_used === null ? 'Not updated' : equipment_used,
                desig: desig === null ? 'Not Updated' : desig,
                dept: dept === null ? 'Not Updated' : dept,
                sect: sect === null ? 'Not Updated' : sect
            }
            setSummary(summary)
        }
        return () => {
            setSummary()
        }
    }, [jobSummary.length])

    useEffect(() => {
        if (jobGeneric.length !== 0) {
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
        return () => {
            setGeneric()
        }
    }, [jobGeneric.length])

    useEffect(() => {
        if (jobQualification.length !== 0) {
            setQualification(jobQualification)
        }
        return () => {
            setQualification()
        }

    }, [jobQualification.length])

    const ViewPage = async () => {
        setflag(0)
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
                    <Box borderRight={1} borderBottom={1} borderLeft={1} sx={{ p: 1, display: "flex", fontWeight: 500, width: "25%", height: 'auto' }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                Scope
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "75%", height: 'auto' }} >
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
                {/* Department Section*/}
                <Box sx={{ display: "flex", flexDirection: "row", px: 1 }}>
                    <Box borderRight={1} borderBottom={1} borderLeft={1} sx={{ p: 1, display: "flex", fontWeight: 500, width: "25%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                Department section
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "75%", height: 35 }} >
                        <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                {sect}
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
                <Suspense fallback={<Progress />} >
                    {
                        jobDuties && jobDuties.map((val) => {
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
                </Suspense>


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
                <Suspense fallback={<Progress />} >
                    {
                        jobPerformance && jobPerformance.map((val) => {
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
                </Suspense>

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
                <Suspense fallback={<Progress />} >
                    {
                        jobCompetency && jobCompetency.map((val) => {
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
                </Suspense>

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
                    <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "75%", height: 35, }} >
                        {
                            qualification && qualification.map((val) => {
                                return <Box sx={{ display: 'flex' }} key={val.qualification_slno}>
                                    <Box sx={{ textTransform: "capitalize", }}>
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary">
                                                {val.spec_desc.toLowerCase()} In {val.cour_desc.toLowerCase()},
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
                                {
                                    is_male === 0 && is_female !== 0 ? 'Female' : null || is_male !== 0 && is_female !== 0 ? `Male / Female` : null || is_male !== 0 && is_female === 0 ? 'Male' : null
                                }
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