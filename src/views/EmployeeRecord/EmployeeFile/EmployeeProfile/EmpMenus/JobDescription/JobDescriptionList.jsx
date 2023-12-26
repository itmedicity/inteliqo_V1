import { CssVarsProvider } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import { Box, CircularProgress, Paper } from '@mui/material';
import React, { Fragment, Suspense, useMemo, useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';
import { setJobSummary } from 'src/redux/actions/JobDescription.Action';
import { axioslogin } from 'src/views/Axios/Axios';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';

const Progress = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }} >
            <CircularProgress color="secondary" size={30} />
        </Box>)
};

const JobDescriptionList = ({ flag, setflag, id }) => {

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
        sect: '',
        date: '',
        revisiondate: '',
        docno: 0
    })
    const { objective, scope, branch_name, working_hour, reporting_dept,
        equipment_used, desig, dept, sect } = summary

    const [generic, setGeneric] = useState({
        experience_year: '',
        age_from: 0,
        age_to: 0,
        is_female: '',
        is_male: ''
    })
    const { experience_year, is_female, is_male, age_from, age_to } = generic

    //redux data from login employee details via profile. 
    const getempData = useSelector((state) => {
        return state.getPrifileDateEachEmp.empPersonalData.personalData
    })

    //dispatch from data job description table
    useEffect(() => {
        dispatch(setJobSummary(id))
    }, [dispatch, id])

    //useMemo for data coming from employee profile
    const checkData = useMemo(() => {
        return {
            designation: getempData.em_designation,
            dept_id: getempData.em_department,
            sect_id: getempData.em_dept_section
        }
    }, [getempData.em_designation, getempData.em_department, getempData.em_dept_section])

    useEffect(() => {
        if (checkData !== 0) {
            const getId = async (checkData) => {
                const result = await axioslogin.post('/jobsummary/check', checkData)
                const { data, success } = result.data
                if (success === 1) {
                    const { summary_slno } = data[0]
                    dispatch(setJobSummary(summary_slno))
                }
            }
            getId(checkData)
        }
    }, [checkData, dispatch])

    const newState = useSelector((state) => {
        return {
            jobDuties: state.getJobSummary.jobDuties.jobDutiesList,
            jobCompetency: state.getJobSummary.jobCompetency.jobCompetencyList,
            jobGeneric: state.getJobSummary.jobGeneric.jobGenericList,
            jobPerformance: state.getJobSummary.jobPerformance.jobPerformanceList,
            jobQualification: state.getJobSummary.jobQualification.jobQualificationList,
            jobSummary: state.getJobSummary.jobSummary.jobSummaryList
        }
    })
    const { jobDuties, jobCompetency, jobGeneric, jobPerformance, jobQualification, jobSummary } = newState;

    const jsummary = useMemo(() => jobSummary, [jobSummary])
    const jDuty = useMemo(() => jobDuties, [jobDuties])
    const jCompetency = useMemo(() => jobCompetency, [jobCompetency])
    const jPerformance = useMemo(() => jobPerformance, [jobPerformance])
    const jGeneric = useMemo(() => jobGeneric, [jobGeneric])
    const jQualify = useMemo(() => jobQualification, [jobQualification])



    //destructuring job summary 
    useEffect(() => {
        if (jsummary.length !== 0) {
            const { objective, scope, branch_name, working_hour,
                reporting_dept, equipment_used, desig, dept,
                sect, Docno, date, edit_date } = jsummary[0];

            const summary = {
                objective: objective === null ? 'Not Updated' : objective,
                scope: scope === null ? 'Not Updated' : scope,
                branch_name: branch_name === null ? 'Not Updated' : branch_name,
                working_hour: working_hour === null ? 'Not Updated' : working_hour.slice(1, -1),
                reporting_dept: reporting_dept === null ? 'Not updated' : reporting_dept,
                equipment_used: equipment_used === null ? 'Not updated' : equipment_used,
                desig: desig === null ? 'Not Updated' : desig,
                dept: dept === null ? 'Not Updated' : dept,
                sect: sect === null ? 'Not Updated' : sect,
                date: date == null ? 'NIL' : date,
                revisiondate: edit_date === null ? 'NIL' : edit_date,
                docno: Docno === null ? 'NIL' : Docno
            }
            setSummary(summary)
        }
        return () => {
            setSummary()
        }
    }, [jsummary])

    useEffect(() => {
        if (jGeneric.length !== 0) {
            const { experience_year, is_female, is_male, age_from, age_to } = jGeneric[0]
            const generic = {
                experience_year: experience_year === 0 ? 'Not Updated' : experience_year,
                is_female: is_female === 0 ? 0 : 'Female',
                is_male: is_male === 0 ? 0 : 'Male',
                age_from: age_from === 0 ? 0 : age_from,
                age_to: age_to === 0 ? 0 : age_to,
            }
            setGeneric(generic)
        }
        return () => {
            setGeneric()
        }
    }, [jGeneric])

    const ViewPage = async () => {
        setflag(0)
    }


    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{
                width: "100%",
                //height: { xxl: 925, xl: 800, lg: 523, md: 270, sm: 270, xs: 270 },
                overflow: 'auto',
                '::-webkit-scrollbar': { display: "none" },
            }} >
                {/* Main Heading Section Box */}

                <Paper square variant="outlined" sx={{ p: 0.5, display: "flex", flexDirection: "row", }}   >
                    <Box sx={{ flex: 1, textAlign: 'center', fontWeight: 600, pt: 0.5 }} >
                        <CssVarsProvider>
                            <Typography startDecorator={<DragIndicatorOutlinedIcon />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                JOB DESCRIPTION - {flag === 1 ? desig.toUpperCase() : getempData.desg_name.toUpperCase()}
                            </Typography>
                        </CssVarsProvider>
                        {/* <CssVarsProvider>
                            <Typography textColor="text.secondary">
                                
                            </Typography>
                        </CssVarsProvider> */}
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
                        jDuty && jDuty.map((val) => {
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
                        jPerformance && jPerformance.map((val) => {
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
                                <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "60%", height: 'auto', flexDirection: 'column' }} >
                                    {
                                        val.kpi.split(",") && val.kpi.split(",").map((id) => {
                                            return <Box key={id}>
                                                <CssVarsProvider >
                                                    <Typography textColor="text.secondary">
                                                        -{id}
                                                    </Typography>
                                                </CssVarsProvider>
                                            </Box>
                                        })
                                    }
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
                        jCompetency && jCompetency.map((val) => {
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
                                <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "70%", height: 'auto', flexDirection: 'column' }} >

                                    {
                                        val.competency_desc.split(",") && val.competency_desc.split(",").map((id) => {
                                            return <Box key={id}>
                                                <CssVarsProvider >
                                                    <Typography textColor="text.secondary">
                                                        -{id}
                                                    </Typography>
                                                </CssVarsProvider>
                                            </Box>
                                        })
                                    }

                                    {/* <CssVarsProvider>
                                        <Typography textColor="text.secondary">
                                            {val.competency_desc}
                                        </Typography>
                                    </CssVarsProvider> */}
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
                            jQualify && jQualify.map((val) => {
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
            </Box >
        </Fragment >
    )
}

export default JobDescriptionList